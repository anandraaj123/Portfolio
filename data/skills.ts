export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    title: "PROGRAMMING",
    skills: ["Java", "Python"]
  },
  {
    title: "FRONTEND & MOBILE",
    skills: ["React", "React Native", "Next.js", "HTML", "CSS"]
  },
  {
    title: "BACKEND & SERVICES",
    skills: ["Node.js", "REST APIs", "Firebase", "Firestore"]
  },
  {
    title: "DATABASE & CORE",
    skills: ["SQL", "Data Structures", "Algorithms"]
  },
  {
    title: "AI / ML",
    skills: ["Machine Learning", "AI APIs", "LLM Applications", "AI Agents"]
  },
  {
    title: "TOOLS",
    skills: ["Git", "GitHub", "VS Code"]
  }
];
