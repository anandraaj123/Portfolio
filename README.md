# ⚡ Anand Kumar — Personal Portfolio & AI Assistant

A modern, high-performance, and interactive developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features an integrated **AI Chat Assistant** powered by multi-provider LLMs (Google Gemini, Groq, and Vercel AI Gateway) and a serverless **Firebase Firestore** contact management system.

---

## 🌟 Key Features

- **🚀 Sleek Dark UI & Glassmorphism**: Tailored cyber-modern aesthetic with background particle networks, ambient glows, and smooth Framer Motion animations.
- **🤖 Intelligent Portfolio AI Assistant**: Floating interactive AI widget capable of answering questions about Anand's background, skills, projects, and experience with fallback support across Gemini, Groq, and Vercel AI Gateway.
- **📁 Flagship Projects Showcase**: In-depth project cards with architecture breakdowns, problem/solution highlights, technology tags, and modal views.
- **🛠️ Categorized Skills Matrix**: Interactive skill grid spanning Languages, Frontend/Mobile, Backend, Databases, and AI/ML toolchains.
- **🧠 Engineering Mindset & 5-Step Process**: Interactive breakdown of engineering philosophy (*Understand → Design → Build → Test → Iterate*).
- **📬 Serverless Contact Form**: Direct integration with Firebase Admin SDK and Cloud Firestore, complemented by celebration confetti on submission.
- **📈 GitHub Activity Visualizer**: Real-time integration showcasing commit activity and repository contributions.
- **📱 Fully Responsive**: Optimized across desktop, tablet, and mobile displays with accessible semantic HTML and fast Core Web Vitals.

---

## 🛠️ Tech Stack

### **Frontend & UI**
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Backend & APIs**
- **Serverless API Routes**: Next.js Route Handlers (`/api/chat`, `/api/contact`)
- **AI / LLM Integration**: Google Generative AI (`@google/generative-ai`), Groq SDK, Vercel AI Gateway
- **Database**: [Firebase Cloud Firestore](https://firebase.google.com/products/firestore) (via `firebase-admin`)
- **Telemetry**: OpenTelemetry API

---

## 📂 Project Structure

```text
Portfolio/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # AI assistant API handler (Gemini / Groq / Vercel AI)
│   │   └── contact/route.ts   # Contact form submission to Firebase Firestore
│   ├── globals.css            # Global CSS & custom utility classes
│   ├── layout.tsx             # Root layout & metadata
│   └── page.tsx               # Main portfolio landing page
├── components/
│   ├── AIWidget.tsx           # Interactive AI Chatbot floating assistant
│   ├── About.tsx              # About Anand & Core Pillars
│   ├── BackgroundNetwork.tsx  # Dynamic background canvas animations
│   ├── Contact.tsx            # Contact form with Firebase validation
│   ├── EngineeringMindset.tsx # 5-step engineering approach
│   ├── Experience.tsx         # Education & journey timeline
│   ├── Footer.tsx             # Footer & social links
│   ├── GithubActivity.tsx     # GitHub activity viewer
│   ├── Hero.tsx               # Hero section with terminal & badges
│   ├── Navbar.tsx             # Responsive glassmorphic navigation bar
│   ├── Projects.tsx           # Interactive flagship projects section
│   └── Skills.tsx             # Categorized technical skills matrix
├── data/
│   ├── education.ts           # Education & milestones data
│   ├── portfolio.ts           # Aggregated portfolio dataset
│   ├── profile.ts             # Profile information & social links
│   ├── projects.ts            # Detailed project showcases (NAVi, etc.)
│   └── skills.ts              # Technical skills lists
├── lib/
│   └── firebase.ts            # Firebase Admin SDK initialization
├── public/                    # Static assets & images
├── services/
│   └── aiService.ts           # Client-side AI interaction helpers
├── .env.local.example         # Example environment configuration
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/anandraaj123/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:

```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key

# Groq Cloud API Key (Fallback AI)
GROQ_API_KEY=your_groq_api_key

# Vercel AI Gateway Configs (Optional)
VERCEL_AI_API_KEY=your_vercel_ai_api_key
VERCEL_AI_MODEL=openai/gpt-4o-mini

# Firebase Admin SDK Credentials (Firestore Contact Messages)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio live.

---

## 🚢 Building & Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
The easiest way to deploy this portfolio is using the [Vercel Platform](https://vercel.com/new):
1. Push your repository to GitHub.
2. Import your repository on Vercel.
3. Add the environment variables configured in `.env.local`.
4. Deploy! 🚀

---

## 📬 Contact & Connect

- **Author**: Anand Kumar
- **Email**: [connect2anandkr@gmail.com](mailto:connect2anandkr@gmail.com)
- **LinkedIn**: [linkedin.com/in/connect-to-anand](https://www.linkedin.com/in/connect-to-anand/)
- **GitHub**: [@anandraaj123](https://github.com/anandraaj123)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
