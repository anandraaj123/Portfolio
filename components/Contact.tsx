"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = profile.contact.email;

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent flex items-center justify-center">
      {/* Background visual details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 text-center">
        
        {/* Subtle Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            Get in touch
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-serif text-primary mb-6 leading-none uppercase"
        >
          Have an idea <br />
          <span className="text-accent font-bold uppercase">
            worth building?
          </span>
        </motion.h2>

        {/* Supporting Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed"
        >
          Let's turn it into something real. Drop me an email or connect through professional networks.
        </motion.p>

        {/* Actions Button Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          {/* Email button */}
          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm px-6 py-4 rounded-xl hover:bg-slate-200 transition-all duration-300 w-full sm:w-auto h-12 select-none"
            style={{ minWidth: "150px" }}
          >
            <Mail className="w-4 h-4 text-black" />
            Email Me
          </a>

          {/* Copy Email Button */}
          <button
            onClick={copyEmailToClipboard}
            className="flex items-center justify-center gap-2.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-5 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto h-12"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-accent animate-scale" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                Copy Email
              </>
            )}
          </button>

          {/* LinkedIn Button */}
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-5 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto h-12"
          >
            <Linkedin className="w-4 h-4 text-slate-400" />
            LinkedIn
          </a>

          {/* Github Button */}
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-5 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto h-12"
          >
            <Github className="w-4 h-4 text-slate-400" />
            GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
