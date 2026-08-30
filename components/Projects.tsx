"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolio";
import { Github, ExternalLink, ArrowRight, Zap, AlertTriangle, CheckCircle2, Map } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const flagship = portfolioData.projects.find(p => p.isFlagship);
  const secondaryProjects = portfolioData.projects.filter(p => !p.isFlagship);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0d111c]/30">
      {/* Background glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-accent"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-secondary uppercase font-bold">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide uppercase">
            A few things I've been building.
          </h2>
        </div>

        {/* Flagship Hero Project: NAVi */}
        {flagship && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full glass-panel rounded-3xl border border-white/5 bg-[#0d111c]/50 p-6 md:p-10 mb-16 relative overflow-hidden group"
          >
            {/* Ambient Background Gradient for Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
              
              {/* Left Side: Product Description & Stack */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  
                  {/* Category Pill & Title */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold tracking-wider bg-accent/15 text-accent border border-accent/25 uppercase">
                      Flagship Project
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {flagship.category}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-serif text-primary tracking-wide mb-2 uppercase">
                    {flagship.name}
                  </h3>
                  
                  <p className="text-xs font-mono text-accent uppercase tracking-widest font-semibold mb-6">
                    {flagship.tagline}
                  </p>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                    {flagship.description}
                  </p>

                  {/* Problem & Solution Split Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-white/5 pt-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" /> The Problem
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {flagship.problem}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" /> The Solution
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {flagship.solution}
                      </p>
                    </div>
                  </div>

                  {/* Status Box */}
                  <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Current Engineering Status
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {flagship.status}
                    </p>
                  </div>
                </div>

                {/* Tech Chips & CTAs */}
                <div>
                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {flagship.tech.map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider bg-white/5 text-slate-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-4">
                    <a
                      href={flagship.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium text-xs px-5 py-3 rounded-xl transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                    {flagship.liveUrl ? (
                      <a
                        href={flagship.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-primary hover:text-white text-xs font-mono tracking-wider font-semibold transition-colors"
                      >
                        Launch Mockup <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Deployment Pending Android Build
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Side: Abstract EV Mockup */}
              <div className="lg:col-span-5 flex items-center justify-center relative min-h-[300px] lg:min-h-0 bg-[#0d111c]/80 rounded-2xl border border-white/5 overflow-hidden p-6">
                
                {/* SVG EV Interactive Map Mockup */}
                <div className="w-full max-w-[280px] aspect-[9/16] relative flex flex-col justify-between p-4 glass-panel border border-white/10 rounded-3xl shadow-xl shadow-black/40 overflow-hidden">
                  
                  {/* Glowing map lines background */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <svg width="100%" height="100%" viewBox="0 0 200 350" fill="none">
                      <path d="M10 20 H190 V330 H10 Z" stroke="#1e293b" strokeWidth="1" />
                      <path d="M10 100 H190" stroke="#1e293b" strokeWidth="1" />
                      <path d="M10 240 H190" stroke="#1e293b" strokeWidth="1" />
                      <path d="M80 20 V330" stroke="#1e293b" strokeWidth="1" />
                      <path d="M150 20 V330" stroke="#1e293b" strokeWidth="1" />
                      
                      {/* Active Route */}
                      <path 
                        d="M 40 300 Q 60 220 120 220 T 160 80" 
                        stroke="#c5a880" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        fill="none" 
                        className="route-line"
                      />
                      
                      {/* Charging Station pin */}
                      <circle cx="120" cy="220" r="5" fill="#10b981" className="animate-ping" />
                      <circle cx="120" cy="220" r="3.5" fill="#10b981" />
                      
                      {/* Destination point */}
                      <circle cx="160" cy="80" r="4" fill="#a39076" />
                      
                      {/* Car Position */}
                      <circle cx="40" cy="300" r="4" fill="#c5a880" />
                    </svg>
                  </div>

                  {/* EV Dashboard UI layout */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-1">
                        <Map className="w-3 h-3 text-primary animate-pulse" />
                        <span className="text-[8px] font-mono text-slate-300 font-bold">NAVi EV MAP</span>
                      </div>
                      <span className="text-[7px] font-mono text-accent bg-accent/20 px-1 py-0.5 rounded">GPS OK</span>
                    </div>

                    {/* Middle Card overlays */}
                    <div className="space-y-2">
                      
                      {/* Battery Badge */}
                      <div className="glass-panel p-2 rounded-lg border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-[7px] font-mono text-slate-400">SOC PREDICTION</div>
                          <div className="text-xs font-bold text-white">78% Remaining</div>
                        </div>
                        <Zap className="w-3.5 h-3.5 text-accent animate-pulse" />
                      </div>

                      {/* Route Info Badge */}
                      <div className="glass-panel p-2 rounded-lg border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-[7px] font-mono text-slate-400">OPTIMAL RANGE</div>
                          <div className="text-xs font-bold text-white">286 km remaining</div>
                        </div>
                      </div>

                    </div>

                    {/* Footer AI Assist Card */}
                    <div className="glass-panel p-2.5 rounded-xl border border-white/15 bg-gradient-to-r from-primary/10 to-secondary/10">
                      <div className="text-[6.5px] font-mono text-primary tracking-wider uppercase font-bold mb-1">
                        ✦ AI OPTIMIZER
                      </div>
                      <p className="text-[8px] text-slate-300 leading-tight">
                        Charge stop recommended in 42km at ChargeGrid Node (Optimal Speed: 80km/h).
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* Secondary Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {secondaryProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className={`glass-panel rounded-2xl border transition-all duration-300 bg-[#0c0e14]/40 hover:bg-[#0c0e14]/60 relative overflow-hidden flex flex-col justify-between min-h-[420px] group ${
                hoveredProjectId === project.id 
                  ? "border-accent/30 shadow-[0_8px_30px_rgba(185,28,28,0.04)]" 
                  : "border-white/5"
              }`}
            >
              {/* Optional Project Image */}
              {project.image && (
                <div className="relative h-44 w-full overflow-hidden border-b border-white/5 bg-[#03050a]/60 select-none">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Header label & action link */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                      {project.category}
                    </span>
                    
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label={`Open live preview for ${project.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Project Title */}
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-1.5 group/title">
                    {project.name}
                    <ArrowRight className={`w-3.5 h-3.5 text-accent transition-transform duration-300 ${
                      hoveredProjectId === project.id ? "translate-x-1" : ""
                    }`} />
                  </h4>

                  {/* Tagline */}
                  <p className="text-[10px] font-mono text-accent uppercase tracking-wider mb-3">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech and Link Footer */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-slate-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 hover:text-accent text-xs font-mono transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
