"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { HelpCircle, Layers, Code, ShieldAlert, RefreshCw } from "lucide-react";

export default function EngineeringMindset() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getStepIcon = (num: string) => {
    switch (num) {
      case "01":
        return <HelpCircle className="w-5 h-5" />;
      case "02":
        return <Layers className="w-5 h-5" />;
      case "03":
        return <Code className="w-5 h-5" />;
      case "04":
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <RefreshCw className="w-5 h-5" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />
      
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-accent"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-secondary uppercase font-bold">
              Engineering Mindset
            </span>
            <span className="h-[1px] w-6 bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide uppercase">
            How I Build Products
          </h2>
          <p className="text-slate-400 text-sm max-w-md mt-3">
            My structured development cycle ensures clean architecture, solid UX, and reliable iterations.
          </p>
        </div>

        {/* Timeline Flow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4 mt-8"
        >
          {/* Connecting line on desktop */}
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-gradient-to-r from-primary/30 via-indigo-500/30 to-secondary/30 -translate-y-1/2 z-0 hidden lg:block pointer-events-none" />

          {portfolioData.mindsetSteps.map((step, idx) => {
            const isHovered = activeStep === idx;
            
            return (
              <motion.div
                key={step.num}
                variants={stepVariants}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className="relative lg:w-[19%] z-10 flex flex-col items-center lg:items-start text-center lg:text-left group"
              >
                {/* Step Connector Line on mobile */}
                {idx < portfolioData.mindsetSteps.length - 1 && (
                  <div className="absolute top-16 bottom-0 left-[26px] w-[1px] bg-white/10 z-0 lg:hidden pointer-events-none" />
                )}

                {/* Step Header Block */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0 w-full mb-4">
                  {/* Step bubble */}
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl border z-10 transition-all duration-300 ${
                    isHovered 
                      ? "border-primary bg-primary/20 text-white scale-110 shadow-lg shadow-primary/25"
                      : "border-white/10 bg-[#0d111c]/80 text-slate-400"
                  }`}>
                    {getStepIcon(step.num)}
                    
                    {/* Tiny index bubble */}
                    <div className="absolute -top-1.5 -right-1.5 bg-[#1e293b] border border-white/10 text-[8px] font-mono text-slate-400 px-1 rounded-md">
                      {step.num}
                    </div>
                  </div>
                  
                  <h3 className={`text-base font-bold transition-all duration-300 lg:mt-4 ${
                    isHovered ? "text-white translate-x-1 lg:translate-x-0 lg:translate-y-0.5" : "text-slate-300"
                  }`}>
                    {step.title}
                  </h3>
                </div>

                {/* Step Description */}
                <div className="pl-16 lg:pl-0">
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
