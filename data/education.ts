export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  isCurrent?: boolean;
}

export const education: TimelineItem[] = [
  {
    period: "2024 - PRESENT",
    title: "B.TECH COMPUTER SCIENCE & ENGINEERING",
    subtitle: "3rd Year Undergraduate",
    description: "Focusing on Core Computer Science principles, Database Management Systems, Operating Systems, and Machine Learning.",
    isCurrent: true
  },
  {
    period: "2024 - PRESENT",
    title: "CONTINUOUS LEARNING IN PUBLIC",
    subtitle: "Focusing on Full-Stack Engineering",
    description: "Developing custom portfolio works, practicing Data Structures & Algorithms, designing REST APIs, and training offline models."
  },
  {
    period: "2026 - PRESENT",
    title: "CURRENTLY BUILDING NAVI",
    subtitle: "AI/ML EV Navigator",
    description: "Researching battery consumption models, coding the React Native client, and optimizing routing scripts.",
    isCurrent: true
  }
];
