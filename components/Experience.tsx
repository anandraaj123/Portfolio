"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Calendar, BookOpen, GraduationCap, ChevronRight } from "lucide-react";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const learningAreas = [
    { title: "Software Engineering", description: "Architecting software end-to-end focusing on UX, speed, and API contracts." },
    { title: "SQL & Relational Databases", description: "Writing structured queries, modeling relations, and analyzing database normalizations." },
    { title: "Data Structures & Algorithms", description: "Analyzing time complexity and implementing optimal graph, tree, and search patterns." },
    { title: "AI-Powered Applications", description: "Integrating LLM embeddings, local model caches, and orchestrating API agents." },
    { title: "Full-Stack Development", description: "Unifying Next.js web systems and React Native mobile clients with real-time backends." }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0d111c]/30">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-accent"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-secondary uppercase font-bold">
              Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide uppercase">
            Academic & Build Timeline
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:col-span-7 relative pl-8 border-l border-white/10 space-y-12"
          >
            {portfolioData.experience.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline node marker */}
                <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#080b12] z-10 transition-colors duration-300 ${
                  item.isCurrent ? "border-primary text-primary" : "border-slate-600 text-slate-500"
                }`}>
                  {item.title.includes("B.TECH") ? <GraduationCap className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                </div>

                {/* Timeline date/period */}
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-bold mb-2 uppercase px-2 py-0.5 rounded ${
                  item.isCurrent ? "text-primary bg-primary/10 border border-primary/20" : "text-slate-400 bg-white/5 border border-white/5"
                }`}>
                  {item.period}
                </div>

                {/* Card details */}
                <div>
                  <h3 className="text-lg font-serif text-slate-100 italic">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold mt-1 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Active Learning Areas */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#0d111c]/60">
              
              <div className="flex items-center gap-2 mb-6 text-sm font-mono tracking-wider text-slate-300 font-bold border-b border-white/5 pb-4">
                <BookOpen className="w-4 h-4 text-primary" />
                ACTIVE CURRICULUM
              </div>

              <div className="space-y-6">
                {learningAreas.map((area, idx) => (
                  <div key={idx} className="group flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                        {area.title}
                      </h4>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
