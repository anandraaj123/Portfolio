import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import EngineeringMindset from "@/components/EngineeringMindset";
import Experience from "@/components/Experience";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIWidget from "@/components/AIWidget";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#03050a]">
      {/* Z-INDEX 0: Spider-web background image */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[#03050a]"
        style={{
          backgroundImage: `url('/images/image_bright.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Z-INDEX 1: Dark gradient / readability overlay */}
      <div 
        className="fixed inset-0 bg-[#03050a]/65 pointer-events-none z-10"
      />

      <Navbar />

      {/* Z-INDEX 2: Content wrapper */}
      <div className="relative z-20">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <EngineeringMindset />
        <Experience />
        <GithubActivity />
        <Contact />
        <Footer />
      </div>

      <AIWidget />
    </main>
  );
}
