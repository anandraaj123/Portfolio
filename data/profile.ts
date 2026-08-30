export interface Profile {
  name: string;
  title: string;
  profileSummary: string;
  aboutText: string;
  aboutPillars: { num: string; title: string; description: string }[];
  currentlyExploring: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export const profile: Profile = {
  name: "Anand Kumar",
  title: "Software Developer / AI & Mobile Application Builder",
  profileSummary: "B.Tech CSE student focused on building practical software products using modern development technologies, AI pipelines, and mobile platforms.",
  aboutText: "I am a software developer who enjoys turning complex ideas into practical, high-performance software. By bridging the gap between algorithmic thinking and responsive user experiences, I build solutions that solve real-world problems. Currently in my 3rd year of Computer Science Engineering, I focus on combining mobile development, backend APIs, and machine learning models into unified products.",
  aboutPillars: [
    {
      num: "01",
      title: "BUILD",
      description: "Turning concepts into robust, working applications that scale."
    },
    {
      num: "02",
      title: "LEARN",
      description: "Constantly exploring software design patterns, AI workflows, and modern stacks."
    },
    {
      num: "03",
      title: "SOLVE",
      description: "Deconstructing complex system bottlenecks into elegant, simple interfaces."
    }
  ],
  currentlyExploring: [
    "Software Engineering",
    "AI-powered applications",
    "Mobile development (React Native)",
    "Backend/API design",
    "SQL & Data Structures/Algorithms (DSA)"
  ],
  contact: {
    email: "connect2anandkr@gmail.com",
    github: "https://github.com/anandraaj123",
    linkedin: "https://www.linkedin.com/in/connect-to-anand/"
  }
};
