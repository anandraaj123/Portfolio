"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    // Smooth scroll to section
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 px-4 md:py-4" : "py-6 px-4 md:px-8"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl transition-all duration-300 ${
            scrolled
              ? "rounded-full border border-white/10 bg-[#0d111c]/75 backdrop-blur-md px-6 py-2 shadow-lg shadow-black/20"
              : "bg-transparent px-4 py-1"
          } flex items-center justify-between`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="font-serif text-lg font-bold tracking-wider text-slate-100 hover:text-accent transition-colors"
          >
            Anand
          </a>

          {/* Desktop & Mobile Links */}
          <nav className="flex items-center gap-3 sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-slate-400 hover:text-white uppercase transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Spidey AI Trigger Button */}
          <button
            onClick={() => {
              const triggerBtn = document.querySelector(".ai-trigger-button") as HTMLButtonElement;
              if (triggerBtn) {
                triggerBtn.click();
              }
            }}
            className="hidden md:flex group items-center gap-1 text-xs font-mono tracking-wider font-semibold border border-primary/40 text-primary hover:text-white hover:bg-primary/20 hover:border-primary/80 transition-all duration-300 px-4 py-2 rounded-full cursor-pointer"
          >
            Ask Spidey
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.header>
    </>
  );
}
