"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Github, GitPullRequest, GitFork, Star } from "lucide-react";

export default function GithubActivity() {
  // Generate simulated grid contributions data
  const gridData = useMemo(() => {
    const cols = 40; // Render 40 weeks to fit nicely across devices
    const rows = 7;
    const colors = [
      "bg-slate-800/40 border-transparent", // Level 0: Empty
      "bg-[#0e4429]/70 border-[#0e4429]",   // Level 1: Low
      "bg-[#006d32]/70 border-[#006d32]",   // Level 2: Med-Low
      "bg-[#26a641]/80 border-[#26a641]",   // Level 3: Med-High
      "bg-[#39d353] border-[#39d353]",      // Level 4: High
    ];

    const data: number[][] = [];
    for (let c = 0; c < cols; c++) {
      const col: number[] = [];
      for (let r = 0; r < rows; r++) {
        // Create an organic looking pattern of commits (high focus around midweeks, sparse at ends)
        const rand = Math.random();
        let level = 0;
        if (rand > 0.85) level = 4;
        else if (rand > 0.65) level = 3;
        else if (rand > 0.4) level = 2;
        else if (rand > 0.15) level = 1;
        col.push(level);
      }
      data.push(col);
    }
    return { data, colors };
  }, []);

  const stats = [
    { label: "Public Repos", value: "14", icon: <GitFork className="w-3.5 h-3.5" /> },
    { label: "Total Commits", value: "782", icon: <GitPullRequest className="w-3.5 h-3.5" /> },
    { label: "GitHub Stars", value: "27", icon: <Star className="w-3.5 h-3.5" /> }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-accent"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-secondary uppercase font-bold">
              Activity
            </span>
            <span className="h-[1px] w-6 bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide uppercase">
            Build in Public
          </h2>
          <p className="text-slate-400 text-sm max-w-md mt-3">
            Tracing my daily engineering velocity and repository metrics.
          </p>
        </div>

        {/* Board Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full glass-panel rounded-3xl border border-white/5 bg-[#0d111c]/30 p-6 md:p-8"
        >
          {/* Top Panel: Github profile snippet */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-white">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  github.com/anandkumar
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  anand-kumar • B.Tech CSE Developer
                </p>
              </div>
            </div>

            {/* Stat Row */}
            <div className="flex items-center gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <span className="text-slate-500 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1">
                    {stat.icon}
                    {stat.label}
                  </span>
                  <span className="text-lg font-extrabold text-white mt-1">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Scroll Wrapper */}
          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[620px] flex flex-col items-start">
              
              {/* Contribution Grid */}
              <div className="flex gap-1">
                {gridData.data.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1">
                    {col.map((level, rowIdx) => (
                      <div
                        key={rowIdx}
                        className={`w-3.5 h-3.5 rounded-sm border transition-all duration-300 hover:scale-110 cursor-pointer ${
                          gridData.colors[level]
                        }`}
                        title={`Activity level: ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Grid Legend */}
              <div className="flex items-center justify-between w-full mt-4 text-[10px] font-mono text-slate-400">
                <div>782 contributions in the last year</div>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-800/40" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
                  <span>More</span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
