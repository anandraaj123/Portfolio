"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Sparkles, Terminal } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0d111c]/30">
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Core Editorial */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-accent"></span>
              <span className="text-xs font-mono tracking-[0.2em] text-secondary uppercase font-bold">
                A Little About Me
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif text-primary tracking-wide leading-none mb-6 uppercase"
            >
              I enjoy turning ideas into <br />
              <span className="text-accent font-bold uppercase">
                usable products.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-sm md:text-base leading-relaxed mb-8"
            >
              {portfolioData.aboutText}
            </motion.p>

            {/* Currently Exploring Widget */}
            <motion.div
              variants={itemVariants}
              className="w-full glass-panel rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-2 mb-4 text-xs font-mono tracking-wider text-slate-300 font-semibold">
                <Terminal className="w-4 h-4 text-primary" />
                CURRENTLY EXPLORING
              </div>
              <ul className="space-y-3">
                {portfolioData.currentlyExploring.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Pillars cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {portfolioData.aboutPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.2)" }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
              >
                {/* Visual glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-row lg:flex-row items-start gap-4">
                  {/* Number bubble */}
                  <div className="font-mono text-2xl font-black text-primary/30 group-hover:text-primary transition-colors">
                    {pillar.num}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-mono tracking-widest text-slate-200 uppercase font-bold mb-2 flex items-center gap-1.5">
                      {pillar.title}
                      {idx === 0 && <Sparkles className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
