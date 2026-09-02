import { profile } from "./profile";

export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    question: "Who is Anand Kumar?",
    answer: "Anand Kumar is a 3rd-year B.Tech Computer Science and Engineering student. He is a software developer and AI & Mobile Application Builder, focusing on bridging the gap between clean code, AI models, and real-world products."
  },
  {
    question: "What is NAVi?",
    answer: "NAVi is Anand's flagship project: an AI/ML Based Intelligent EV Navigation & Route Optimization System. It uses machine learning models to analyze parameters like battery state-of-charge, topographic elevation changes, speed profiles, and real-time traffic to calculate energy consumption and plan optimal routes with charger stops."
  },
  {
    question: "What are Anand's core skills and technologies?",
    answer: "Anand's core tech stack spans Programming (Java, Python), Frontend & Mobile (React, React Native, Next.js, HTML, CSS, Tailwind CSS), Backend & Cloud (Node.js, REST APIs, Firebase, Firestore), Databases & Core (SQL, Data Structures & Algorithms), AI/ML (Machine Learning, AI APIs, LLM applications, AI Agents), and Tools (Git, GitHub, VS Code)."
  },
  {
    question: "Why should I hire Anand?",
    answer: "Anand has a strong engineering mindset: he deeply analyzes requirements, designs clean flows, builds modular code, and tests rigorously. He works across Java, Python, React Native, Next.js, and Firebase, building real products instead of just theoretical homework. He is adaptable, fast-learning, and product-focused."
  },
  {
    question: "What is Anand's academic background and education?",
    answer: "Anand is an undergraduate 3rd-year student pursuing a B.Tech in Computer Science and Engineering (2024 - Present), with strong academic coursework in Data Structures, Database Systems, Operating Systems, and Machine Learning."
  },
  {
    question: "What is Anand currently working on?",
    answer: "He is actively developing NAVi (refining routing algorithms and energy model predictions in Python/React Native) and focusing on continuous learning in full-stack engineering and AI agent workflows."
  },
  {
    question: "How can I contact Anand?",
    answer: `You can email him directly at ${profile.contact.email}, connect with him on LinkedIn at ${profile.contact.linkedin}, or view his GitHub repositories at ${profile.contact.github}.`
  },
  {
    question: "What is Anand's engineering mindset / development workflow?",
    answer: "Anand follows a 5-step engineering process: 1. UNDERSTAND (deep-dive requirements), 2. DESIGN (architect user flows and state), 3. BUILD (modular, type-safe components), 4. TEST (edge cases and performance), 5. ITERATE (telemetry and continuous polish)."
  }
];
