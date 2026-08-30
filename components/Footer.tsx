"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  const currentYear = 2026; // Set as requested

  return (
    <footer className="border-t border-white/5 py-12 bg-transparent relative z-10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-mono text-sm font-bold text-white tracking-wider">
            ANAND KUMAR
          </span>
          <span className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">
            Software Developer • Builder • Learner
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-600 font-mono">
          &copy; {currentYear} Anand Kumar. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Email Address"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
