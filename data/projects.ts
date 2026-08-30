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

export const projects: Project[] = [
  {
    id: "navi",
    name: "NAVi",
    tagline: "AI/ML Based Intelligent EV Navigation & Route Optimization System",
    description: "An intelligent EV navigation application designed to recommend optimal routes by modeling real-time battery status, charging stations, topography, and consumption patterns.",
    longDescription: "EV navigation is broken when standard routing algorithms treat electric cars like traditional combustion vehicles. NAVi solves this by using AI models to continuously analyze external conditions, vehicle health, and charging networks to eliminate range anxiety entirely.",
    problem: "Traditional maps recommend the fastest route based solely on distance and traffic, ignoring crucial EV metrics. Drivers face range anxiety due to unpredictable battery drain from elevation changes, speed limits, headwind, and inaccurate estimate times of charger occupancy.",
    solution: "NAVi integrates an AI-driven energy prediction engine that dynamically simulates battery consumption across route segments. It automatically schedules optimized charging stops at compatible chargers, choosing the fastest charging speed while keeping travel time minimal.",
    status: "Core routing algorithms and state-of-charge (SoC) predictors developed in Python. UI built as a cross-platform React Native app with Firebase managing real-time charging status.",
    tech: ["React Native", "Firebase", "AI/ML", "Maps APIs", "Python", "REST APIs"],
    githubUrl: "https://github.com/anandkumar/navi-ev-navigator",
    liveUrl: undefined,
    isFlagship: true,
    category: "AI & Mobile Application"
  }
];
