import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { education } from "@/data/education";

/**
 * Intelligent local fallback & default question-answering engine for Spidey AI.
 * Handles greetings, bio, skills, flagship project NAVi, education, hiring, contact,
 * workflow, Hinglish queries, and casual conversational prompts when external AI APIs
 * are offline, unconfigured, or rate-limited.
 */
export function getChatFallbackResponse(inputMessage: string): string {
  if (!inputMessage || !inputMessage.trim()) {
    return "Hi! I'm Spidey, Anand's AI assistant. Ask me anything about his projects, skills, education, or how to contact him!";
  }

  const query = inputMessage.toLowerCase().trim();

  // 1. GREETINGS & CASUAL HELLOS (English + Hinglish/Hindi)
  const isGreeting =
    /^(hi|hello|hey|heyy|heya|yo|hola|namaste|namaskar|sup|wassup|howdy)(\s|$|[!?.])/i.test(query) ||
    query.includes("good morning") ||
    query.includes("good afternoon") ||
    query.includes("good evening") ||
    query.includes("kaise ho") ||
    query.includes("kya haal") ||
    query.includes("kaisa hai") ||
    query.includes("kya chal raha");

  if (isGreeting) {
    if (query.includes("kaise ho") || query.includes("kya haal") || query.includes("kaisa hai")) {
      return "Main badhiya hoon! 👋 I'm Spidey, Anand Kumar's AI assistant. Aap Anand ke projects (jaise NAVi), technical skills, education ya contact details ke baare me kuch bhi pooch sakte hain. Main kaise madad karu?";
    }
    return "Hello! 👋 I'm Spidey, Anand's personal AI portfolio assistant.\n\nI can answer anything about Anand's:\n• 🚀 Flagship Project (NAVi EV Navigator)\n• 💻 Tech Stack & Programming Skills\n• 🎓 Education & Background (B.Tech CSE)\n• 💼 Why you should hire him & work opportunities\n• 📬 Contact Info & Socials\n\nWhat would you like to explore?";
  }

  // 2. ASSISTANT IDENTITY / WHO ARE YOU
  if (
    query.includes("who are you") ||
    query.includes("what is your name") ||
    query.includes("tum kaun ho") ||
    query.includes("tera naam kya hai") ||
    query.includes("who made you") ||
    query.includes("who built you") ||
    query.includes("who created you")
  ) {
    return "I am Spidey 🕷️, the AI assistant crafted for Anand Kumar's developer portfolio. I'm here to give you instant, accurate answers about Anand's software development work, machine learning projects, skills, and background.";
  }

  // 3. HELP / WHAT CAN YOU DO / COMMANDS
  if (
    query === "help" ||
    query.includes("what can you do") ||
    query.includes("how can you help") ||
    query.includes("kya kar sakte ho") ||
    query.includes("commands") ||
    query.includes("menu")
  ) {
    return "Here are some top questions you can ask me:\n\n" +
           "1. 'Tell me about Anand Kumar'\n" +
           "2. 'What is NAVi and how does it work?'\n" +
           "3. 'What are Anand's core skills and tech stack?'\n" +
           "4. 'Why should I hire Anand?'\n" +
           "5. 'What is Anand's education and degree?'\n" +
           "6. 'What is his engineering mindset/workflow?'\n" +
           "7. 'How can I contact Anand directly?'";
  }

  // 4. ABOUT ANAND / BIO / INTRO
  if (
    query.includes("who is anand") ||
    query.includes("about anand") ||
    query.includes("tell me about anand") ||
    query.includes("anand kaun hai") ||
    query.includes("anand ke baare me") ||
    query.includes("introduce anand") ||
    query.includes("tell me about yourself") ||
    query.includes("who is the developer") ||
    query.includes("creator") ||
    query.includes("owner") ||
    query.includes("bio") ||
    query.includes("profile")
  ) {
    return `**Anand Kumar** is a 3rd-year B.Tech Computer Science & Engineering student, Software Developer, and AI & Mobile Application Builder.\n\n` +
           `He specializes in bridging the gap between algorithmic code, machine learning pipelines, and responsive user experiences. He builds practical, real-world software across React Native, Next.js, Python, Java, and Firebase.\n\n` +
           `His mission is simple: **Understand deeply, Design cleanly, Build reliably, and Solve real problems.**`;
  }

  // 5. FLAGSHIP PROJECT: NAVi (EV Navigator)
  if (
    query.includes("navi") ||
    query.includes("ev navigation") ||
    query.includes("electric vehicle") ||
    query.includes("route optimization") ||
    query.includes("battery drain") ||
    query.includes("charger") ||
    query.includes("range anxiety")
  ) {
    const navi = projects.find((p) => p.id === "navi") || projects[0];
    return `⚡ **NAVi - AI/ML Intelligent EV Navigation & Route Optimization System** (Flagship Project)\n\n` +
           `• **The Problem**: Standard map tools treat EVs like petrol cars, causing severe "range anxiety" from unexpected battery drain (due to hills, speed, traffic) and uncertain charger availability.\n\n` +
           `• **The Solution**: NAVi predicts real-time battery consumption segment-by-segment using machine learning. It automatically suggests optimal charging stops to minimize overall journey time and prevent stranding.\n\n` +
           `• **Tech Stack**: React Native, Python (ML / Routing Scripts), Firebase Firestore, Maps APIs, REST APIs.\n\n` +
           `• **GitHub Repository**: ${navi.githubUrl}`;
  }

  // 6. ALL PROJECTS / PORTFOLIO WORK
  if (
    query.includes("projects") ||
    query.includes("project") ||
    query.includes("what did anand build") ||
    query.includes("what does anand build") ||
    query.includes("apps") ||
    query.includes("work") ||
    query.includes("kya banaya") ||
    query.includes("show me projects")
  ) {
    const projectList = projects.map(p => `• **${p.name}** (${p.category}): ${p.tagline} [Stack: ${p.tech.join(", ")}]`).join("\n");
    return `Here are Anand's featured projects:\n\n${projectList}\n\n🌟 **Flagship Highlight**: NAVi — an AI-powered EV navigation platform that solves battery range anxiety with real-time ML consumption models.`;
  }

  // 7. SPECIFIC SKILL CATEGORIES
  // Python / Machine Learning
  if (
    query.includes("python") ||
    query.includes("machine learning") ||
    query.includes("ml") ||
    query.includes("ai") ||
    query.includes("artificial intelligence") ||
    query.includes("llm") ||
    query.includes("agent")
  ) {
    return "🧠 **AI & Python Skills**:\n\n" +
           "Anand is experienced in Python for Machine Learning workflows, State-of-Charge (SoC) energy modeling in NAVi, LLM integration, and AI APIs. He explores modern AI Agent frameworks and practical intelligent software applications.";
  }

  // Java / DSA / OOP
  if (
    query.includes("java") ||
    query.includes("dsa") ||
    query.includes("data structure") ||
    query.includes("algorithm") ||
    query.includes("oop")
  ) {
    return "☕ **Java & Core CS Principles**:\n\n" +
           "Anand uses Java for strong Object-Oriented Programming (OOP) foundations and practicing Data Structures & Algorithms (DSA), ensuring memory-efficient logic and solid software design.";
  }

  // React / React Native / Next.js / Mobile / Frontend
  if (
    query.includes("react") ||
    query.includes("react native") ||
    query.includes("next.js") ||
    query.includes("nextjs") ||
    query.includes("frontend") ||
    query.includes("mobile") ||
    query.includes("ui") ||
    query.includes("ux") ||
    query.includes("css") ||
    query.includes("tailwind")
  ) {
    return "📱 **Frontend & Mobile Development**:\n\n" +
           "• **Mobile**: React Native for cross-platform iOS/Android development (built NAVi EV app UI).\n" +
           "• **Web Frontend**: React, Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.\n" +
           "• Focuses on fluid micro-interactions, responsive design, and accessible UI engineering.";
  }

  // Backend / Node.js / Firebase / SQL / Database
  if (
    query.includes("backend") ||
    query.includes("node") ||
    query.includes("firebase") ||
    query.includes("firestore") ||
    query.includes("sql") ||
    query.includes("database") ||
    query.includes("api") ||
    query.includes("rest")
  ) {
    return "🗄️ **Backend & Databases**:\n\n" +
           "• **Backend**: Node.js, Next.js Route Handlers, RESTful API architecture.\n" +
           "• **Databases**: Firebase Firestore (real-time document stores) and Relational SQL.\n" +
           "• Implements secure serverless handlers, rate-limiting, and validation schemas.";
  }

  // GENERAL SKILLS / TECH STACK
  if (
    query.includes("skills") ||
    query.includes("tech stack") ||
    query.includes("languages") ||
    query.includes("stack") ||
    query.includes("technologies") ||
    query.includes("tools") ||
    query.includes("kya aata hai")
  ) {
    const formattedSkills = skills
      .map(cat => `• **${cat.title}**: ${cat.skills.join(", ")}`)
      .join("\n");

    return `💻 **Anand's Technical Skills & Stack**:\n\n${formattedSkills}\n\nHe combines these to build complete, full-stack mobile and web products with embedded AI intelligence.`;
  }

  // 8. EDUCATION & DEGREE & COLLEGE
  if (
    query.includes("education") ||
    query.includes("college") ||
    query.includes("university") ||
    query.includes("degree") ||
    query.includes("btech") ||
    query.includes("b.tech") ||
    query.includes("cse") ||
    query.includes("study") ||
    query.includes("studies") ||
    query.includes("semester") ||
    query.includes("year") ||
    query.includes("undergraduate") ||
    query.includes("padhai")
  ) {
    return "🎓 **Education & Academic Background**:\n\n" +
           "• **Degree**: B.Tech in Computer Science & Engineering (CSE)\n" +
           "• **Status**: 3rd Year Undergraduate (2024 - Present)\n" +
           "• **Focus Areas**: Core Computer Science principles, Data Structures & Algorithms, Database Management Systems, Operating Systems, Machine Learning, and Full-Stack Engineering.";
  }

  // 9. EXPERIENCE & TIMELINE
  if (
    query.includes("experience") ||
    query.includes("timeline") ||
    query.includes("work history") ||
    query.includes("career") ||
    query.includes("journey")
  ) {
    const timeline = education
      .map(item => `• **${item.period}** | ${item.title} (${item.subtitle}): ${item.description}`)
      .join("\n\n");
    return `⏳ **Anand's Timeline & Experience**:\n\n${timeline}`;
  }

  // 10. WHY HIRE ANAND / STRENGTHS / OPPORTUNITIES / INTERNSHIPS
  if (
    query.includes("why hire") ||
    query.includes("hire anand") ||
    query.includes("why should i hire") ||
    query.includes("strengths") ||
    query.includes("job") ||
    query.includes("internship") ||
    query.includes("intern") ||
    query.includes("freelance") ||
    query.includes("hire") ||
    query.includes("available") ||
    query.includes("kya hire kar sakte")
  ) {
    return "💼 **Why Hire Anand Kumar?**\n\n" +
           "1. **Product-First Builder**: Instead of just doing basic tutorials, he builds functional end-to-end applications (like the NAVi AI EV Navigator).\n" +
           "2. **Versatile Stack**: Proficient across Python, Java, React Native, Next.js, and Cloud services (Firebase).\n" +
           "3. **Strong Engineering Mindset**: Follows structured engineering (Understand ➔ Design ➔ Build ➔ Test ➔ Iterate).\n" +
           "4. **Fast Learner & Adaptable**: Constantly exploring modern AI pipelines, API design, and system architecture.\n\n" +
           `Anand is open to Software Engineering, Full-Stack, Frontend, Mobile, and AI internship & job opportunities. Reach out via email at **${profile.contact.email}**!`;
  }

  // 11. ENGINEERING MINDSET & WORKFLOW
  if (
    query.includes("mindset") ||
    query.includes("workflow") ||
    query.includes("process") ||
    query.includes("methodology") ||
    query.includes("how he works") ||
    query.includes("approach") ||
    query.includes("philosophy")
  ) {
    return "⚙️ **Anand's 5-Step Engineering Mindset**:\n\n" +
           "1. **01 UNDERSTAND**: Deep dive into core problem statements before writing a single line of code.\n" +
           "2. **02 DESIGN**: Map out intuitive user flows and predictable architecture.\n" +
           "3. **03 BUILD**: Write clean, modular, and type-safe React / Python components.\n" +
           "4. **04 TEST**: Stress-test edge cases, responsiveness, and API latencies.\n" +
           "5. **05 ITERATE**: Continuously polish usability and performance based on real feedback.";
  }

  // 12. WHAT IS HE EXPLORING / CURRENT FOCUS
  if (
    query.includes("currently") ||
    query.includes("exploring") ||
    query.includes("learning") ||
    query.includes("working on") ||
    query.includes("current focus")
  ) {
    const list = profile.currentlyExploring.map(item => `• ${item}`).join("\n");
    return `🔭 **What Anand is Currently Focused On & Exploring**:\n\n${list}\n\nHe is actively building NAVi, refining battery prediction models, and building high-performance modern web apps!`;
  }

  // 13. CONTACT / EMAIL / LINKEDIN / GITHUB / RESUME / REACH OUT
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("connect") ||
    query.includes("message") ||
    query.includes("linkedin") ||
    query.includes("github") ||
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("phone") ||
    query.includes("baat kaise kare") ||
    query.includes("sampark")
  ) {
    return `📬 **Connect with Anand Kumar**:\n\n` +
           `• **Email**: [${profile.contact.email}](mailto:${profile.contact.email})\n` +
           `• **LinkedIn**: [LinkedIn Profile](${profile.contact.linkedin})\n` +
           `• **GitHub**: [github.com/anandraaj123](${profile.contact.github})\n\n` +
           `You can also send a direct message using the Contact Form right here on the portfolio!`;
  }

  // 14. GITHUB / SOURCE CODE
  if (
    query.includes("github") ||
    query.includes("source code") ||
    query.includes("repo") ||
    query.includes("git")
  ) {
    return `🐙 Anand's open-source work and repositories are hosted on GitHub:\n\n` +
           `👉 **[https://github.com/anandraaj123](${profile.contact.github})**\n\n` +
           `Check out his repositories including NAVi, full-stack projects, and code experiments!`;
  }

  // 15. THANKS / APPRECIATION (English + Hindi)
  if (
    query.includes("thank") ||
    query.includes("thx") ||
    query.includes("shukriya") ||
    query.includes("dhanyawad") ||
    query.includes("awesome") ||
    query.includes("great") ||
    query.includes("nice") ||
    query.includes("cool") ||
    query.includes("badiya")
  ) {
    return "You're very welcome! 😊 Feel free to ask if you have more questions about Anand's work or want to reach out to him directly.";
  }

  // 16. FAREWELL / GOODBYE
  if (
    query.includes("bye") ||
    query.includes("goodbye") ||
    query.includes("see you") ||
    query.includes("tata") ||
    query.includes("alvida")
  ) {
    return "Goodbye! 👋 Have a great day! If you need to contact Anand later, you can reach him at " + profile.contact.email + ".";
  }

  // 17. POLITE FALLBACK & GUIDED REDIRECTION
  return (
    "I'm Spidey, Anand Kumar's portfolio assistant! 🕷️\n\n" +
    "I am specialized in answering questions about Anand's work. You can ask me:\n" +
    "• *'Tell me about NAVi (EV Navigation project)'*\n" +
    "• *'What are Anand's top skills?'*\n" +
    "• *'Why should I hire Anand?'*\n" +
    "• *'What is Anand's education and degree?'*\n" +
    "• *'How can I get in touch with Anand?'*\n\n" +
    "What would you like to know?"
  );
}
