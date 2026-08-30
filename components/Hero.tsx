"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Zap, Navigation, Battery, Cpu } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background glow blobs - Removed for clean Canvas network */}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
                Currently building NAVi
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-mono tracking-[0.25em] text-[#B8C0CC] uppercase mb-3 font-semibold"
            >
              Software Developer <span className="text-accent">•</span> Builder <span className="text-accent">•</span> AI Enthusiast
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-serif text-primary tracking-wide leading-[0.95] mb-6 uppercase"
            >
              Hey, I'm Anand.<br />
              I build <br />
              <span className="text-accent font-bold">
                digital
              </span> <br />
              products.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-secondary leading-relaxed mb-8 max-w-xl font-sans font-light"
            >
              B.Tech CSE student focused on building practical software products using modern development technologies, AI pipelines, and mobile platforms.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScroll("#projects")}
                className="group flex items-center justify-center gap-2 bg-primary hover:bg-[#D4D4D4] text-black font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all duration-300 w-full sm:w-auto"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScroll("#contact")}
                className="group flex items-center justify-center gap-2 border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-accent/5 text-white hover:text-accent font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                Let's Connect
                <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
              </button>
            </motion.div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 flex justify-center items-center relative mt-16 lg:mt-0 select-none">
            
            {/* Spider Visual Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[440px] flex justify-center items-center"
            >
              
              {/* Main Spider Image (blended with multiply to keep original black-and-red details) */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/spider.png"
                  alt="Cinematic Web-weaving Spider Illustration"
                  fill
                  className="object-contain mix-blend-multiply contrast-[1.1]"
                  priority
                />
              </div>

              {/* Web Edge 1: Top-Left Anchor */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 -left-12 sm:-left-16 flex items-center gap-1.5"
              >
                <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-[#E8E8E8] bg-[#03050a]/90 px-2 py-0.5 rounded border border-accent/20">
                  BUILD TO LAST
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              </motion.div>

              {/* Web Edge 2: Top-Right Anchor */}
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-2 -right-12 sm:-right-16 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-[#E8E8E8] bg-[#03050a]/90 px-2 py-0.5 rounded border border-accent/20">
                  CODE IS THE LAW
                </span>
              </motion.div>

              {/* Web Edge 3: Bottom Hanging Anchor */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
              >
                <span className="h-5 w-[1px] bg-gradient-to-b from-accent to-transparent" />
                <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-[#E8E8E8] bg-[#03050a]/90 px-2 py-0.5 rounded border border-accent/20 whitespace-nowrap">
                  PERSIST THROUGH COMPLEXITY
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
