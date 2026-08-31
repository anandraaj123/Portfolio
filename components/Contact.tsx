"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  const emailAddress = profile.contact.email;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("All fields are required.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000); // Reset status after 5s
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
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
          Let's turn it into something real. Drop me an email, connect through professional networks, or send a direct message below.
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

        {/* Direct Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-xl mx-auto text-left"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#0d111c]/60 backdrop-blur-md relative overflow-hidden">
            <h3 className="text-xl font-serif text-slate-100 mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></span>
              Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-all duration-300 disabled:opacity-50 text-sm font-sans"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-all duration-300 disabled:opacity-50 text-sm font-sans"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, ideas, or questions..."
                  rows={4}
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-all duration-300 disabled:opacity-50 text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 px-6 rounded-xl bg-white text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Notifications */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono text-center"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-mono text-center"
                >
                  ⚠ {errorMessage}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
