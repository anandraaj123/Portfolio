"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code, Layers, Database, Cpu, Wrench } from "lucide-react";

export default function Skills() {
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case "PROGRAMMING":
        return <Code className="w-4 h-4 text-primary" />;
      case "FRONTEND & MOBILE":
        return <Layers className="w-4 h-4 text-secondary" />;
      case "BACKEND & SERVICES":
      case "DATABASE & CORE":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "AI / ML":
        return <Cpu className="w-4 h-4 text-primary" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0d111c]/25">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-accent"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-secondary uppercase font-bold">
              Capabilities
            </span>
            <span className="h-[1px] w-6 bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide uppercase">
            Technical Ecosystem
          </h2>
          <p className="text-slate-400 text-sm max-w-md mt-3">
            A curated suite of programming languages, tools, and engineering frameworks I use to bring products to life.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioData.skills.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              onMouseEnter={() => setActiveHoverCategory(category.title)}
              onMouseLeave={() => setActiveHoverCategory(null)}
              className={`glass-panel p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                activeHoverCategory === category.title
                  ? "border-primary/30 bg-[#0d111c]/60 shadow-[0_8px_30px_rgba(197,168,128,0.04)]"
                  : "border-white/5 bg-[#0d111c]/30"
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/5">
                  {getCategoryIcon(category.title)}
                  <h3 className="text-xs font-mono tracking-widest font-bold text-slate-300 uppercase">
                    {category.title}
                  </h3>
                </div>

                {/* Chips Container */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e293b]/40 text-slate-300 border border-white/5 hover:border-primary/40 hover:text-white cursor-default transition-all duration-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
