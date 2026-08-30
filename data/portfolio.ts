import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import { education } from "./education";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  status?: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  isFlagship?: boolean;
  category: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface MindsetStep {
  num: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  isCurrent?: boolean;
}

export const portfolioData = {
  name: profile.name,
  title: profile.title,
  profileSummary: profile.profileSummary,
  aboutText: profile.aboutText,
  aboutPillars: profile.aboutPillars,
  currentlyExploring: profile.currentlyExploring,
  projects,
  skills,
  mindsetSteps: [
    {
      num: "01",
      title: "UNDERSTAND",
      description: "Deep dive into the core problem statement, defining requirements before writing a single line of code."
    },
    {
      num: "02",
      title: "DESIGN",
      description: "Map out the user flows and system architecture to keep interactions simple and performance predictable."
    },
    {
      num: "03",
      title: "BUILD",
      description: "Develop using clean, modular React components, standard type-safety, and optimal data schemas."
    },
    {
      num: "04",
      title: "TEST",
      description: "Verify edge cases, stress-test responsive layout breakpoints, and analyze animation frame rates."
    },
    {
      num: "05",
      title: "ITERATE",
      description: "Collect telemetry, review usability issues, and continuously refine performance and visual polish."
    }
  ] as MindsetStep[],
  experience: education
};
