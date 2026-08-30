import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import { faq } from "@/data/faq";

// Simple in-memory rate limiting map for local/single-server deployment
const chatRateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkChatRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const clientData = chatRateLimitMap.get(ip);

  if (!clientData) {
    chatRateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - clientData.lastReset > windowMs) {
    chatRateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  clientData.count += 1;
  if (clientData.count > limit) {
    return true;
  }

  return false;
}

// Fallback logic for local development if GEMINI_API_KEY is not defined
function getLocalMockResponse(message: string): string {
  const query = message.toLowerCase().trim();
  if (query.includes("navi") || query.includes("ev") || query.includes("navigation")) {
    return "NAVi is Anand's flagship project: an AI/ML Based Intelligent EV Navigation & Route Optimization System. The system models battery drainage by analyzing elevation changes, speed limits, and traffic, then automatically plans route stops at charging stations to minimize travel time and eliminate range anxiety.";
  }
  if (query.includes("skills") || query.includes("tech") || query.includes("languages") || query.includes("stack")) {
    return "Anand's primary tech stack is:\n\n" +
           "• Programming: Java, Python\n" +
           "• Mobile & Frontend: React, React Native, Next.js, HTML, CSS\n" +
           "• Backend: Node.js, REST APIs, Firebase, Firestore\n" +
           "• Database: SQL, Data Structures & Algorithms\n" +
           "• AI / ML: Machine Learning, AI APIs, LLM Applications, AI Agents\n" +
           "• Tools: Git, GitHub, VS Code";
  }
  if (query.includes("who is") || query.includes("anand") || query.includes("about") || query.includes("profile")) {
    return "Anand Kumar is a 3rd-year B.Tech Computer Science and Engineering student. He is a software developer, and AI & Mobile Application Builder, focusing on creating real, practical software applications that bridge code, AI models, and modern UX.";
  }
  if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("connect")) {
    return "You can reach out to Anand directly at anandkumar.work@gmail.com, connect with him via LinkedIn, or check out his GitHub at https://github.com/anandraaj123.";
  }
  return "I don't have that information. Anand's portfolio only covers his core engineering skills, academic studies, NAVi flagship project, and contact info.";
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // Rate limit: Max 12 requests per minute per IP
    if (checkChatRateLimit(ip, 12, 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a moment." },
        { status: 429 }
      );
    }

    const { message, history } = await req.json().catch(() => ({}));

    // Request Validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message is too long (maximum 2000 characters)" }, { status: 400 });
    }

    // Build the system prompt using split database files
    const systemInstruction = `
You are Spidey, the personal AI assistant for Anand Kumar, a Software Developer and AI/Mobile Application Builder. Your role is to answer questions about Anand based strictly on his portfolio details.

Here is the verified portfolio database:

[PROFILE SUMMARY]
Name: ${profile.name}
Title: ${profile.title}
Summary: ${profile.profileSummary}
About: ${profile.aboutText}
Currently Exploring: ${profile.currentlyExploring.join(", ")}
Contact Info: Email: ${profile.contact.email}, GitHub: ${profile.contact.github}, LinkedIn: ${profile.contact.linkedin}

[GREETINGS]
You are allowed to respond to general friendly greetings (e.g., hello, hi, hey, how's it going, good morning, thanks). When greeted, respond with: "Hello! I am Spidey, Anand's AI assistant. I can answer questions about his skills, education, flagship project NAVi, and contact details. What would you like to know?"

[TECHNICAL SKILLS]
${skills.map(cat => `${cat.title}: ${cat.skills.join(", ")}`).join("\n")}

[PROJECTS]
${projects.map(proj => `
- Name: ${proj.name}
  Tagline: ${proj.tagline}
  Category: ${proj.category}
  Description: ${proj.description}
  Tech Stack: ${proj.tech.join(", ")}
  GitHub: ${proj.githubUrl}
  Flagship Project: ${proj.isFlagship ? "Yes" : "No"}
  Problem Solved: ${proj.problem || "N/A"}
  Solution details: ${proj.solution || "N/A"}
  Status: ${proj.status || "N/A"}
`).join("\n")}

[EDUCATION & EXPERIENCE TIMELINE]
${education.map(item => `
- Period: ${item.period}
  Title: ${item.title}
  Subtitle: ${item.subtitle}
  Description: ${item.description}
`).join("\n")}

[FAQ DATASET]
${faq.map(item => `
Q: ${item.question}
A: ${item.answer}
`).join("\n")}

[STRICT INSTRUCTIONS]
1. Rely ONLY on the information provided above.
2. Handle friendly greetings (like 'hi', 'hello', 'hey', 'how are you', etc.) politely and professionally, introducing yourself as Anand's AI assistant.
3. If the user asks about ANYTHING else that is unrelated to Anand's portfolio (e.g. general knowledge, writing code/scripts, mathematical queries, translating, explaining general concepts, writing essays, or acting as a general-purpose AI assistant), you MUST politely refuse and state: "I am only programmed to answer questions about Anand Kumar's portfolio, skills, projects, and contact details. Let me know if you would like to know about NAVi or his engineering background!"
4. Never execute, compile, generate, or answer general programming assistance requests (like 'write a sorting algorithm in Python', 'explain closures in JavaScript'). Strictly redirect the user to ask about Anand's work.
5. DO NOT make up, extrapolate, or invent any facts, achievements, dates, work histories, downloads, stars, metrics, companies, or details.
6. Keep your responses concise, professional, helpful, and friendly.
`;

    // 1. Prioritize Groq API if available
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey && !groqKey.includes("your_")) {
      try {
        const formattedHistory = (history || [])
          .filter((msg: any) => msg.role !== "system" && msg.content && msg.id !== "welcome")
          .map((msg: any) => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.content,
          }));

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "groq/compound",
            messages: [
              { role: "system", content: systemInstruction },
              ...formattedHistory,
              { role: "user", content: message }
            ],
            temperature: 0.2,
            max_tokens: 1024,
          }),
        });

        const data = await response.json();
        if (response.ok && data.choices?.[0]?.message?.content) {
          return NextResponse.json({ response: data.choices[0].message.content });
        }
        
        console.error("Groq API error response:", data);
      } catch (err) {
        console.error("Groq API Execution Error, falling back to Gemini:", err);
      }
    }

    // 2. Fallback to Gemini if configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && !geminiKey.includes("your_") && !geminiKey.includes("your_gemini_api_key_here")) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction,
        });

        const formattedHistory = (history || [])
          .filter((msg: any) => msg.role !== "system" && msg.content && msg.id !== "welcome")
          .map((msg: any) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          }));

        const chatSession = model.startChat({
          history: formattedHistory,
        });

        const result = await chatSession.sendMessage(message);
        const textResponse = result.response.text();
        return NextResponse.json({ response: textResponse });
      } catch (err) {
        console.error("Gemini API Execution Error:", err);
      }
    }

    // 3. Fallback to local simulated mock response
    console.warn("All live LLM API keys failed or are missing. Using local simulated responses.");
    const mockReply = getLocalMockResponse(message);
    return NextResponse.json({ response: mockReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
