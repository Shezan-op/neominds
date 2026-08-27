"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NUMBER_CHANGER_STATS } from "@/lib/data";
import { CheckCircle2, TrendingUp, Users, Award } from "lucide-react";

export function NumberChangerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Animated counter state
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    projects: 0,
    team: 0,
    experience: 0,
  });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800; // ms
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.round(ease * 100),
        team: Math.round(ease * 25),
        experience: Math.round(ease * 6),
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView]);

  const getStatIcon = (id: string) => {
    switch (id) {
      case "projects":
        return <TrendingUp className="w-4 h-4 text-[#1E5FD8]" />;
      case "team":
        return <Users className="w-4 h-4 text-[#1E5FD8]" />;
      case "experience":
        return <Award className="w-4 h-4 text-[#1E5FD8]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#1E5FD8]" />;
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
              Telemetry & Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
              Verified numbers across our engineering operations.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4B50] font-sans max-w-sm">
            Deterministic delivery metrics audited across all active client repositories and deployments.
          </p>
        </div>

        {/* Clean Editorial 3-Column Layout with Hairline Dividers (No Heavy Boxy Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6E6E8] border-t border-b border-[#E6E6E8]">
          {NUMBER_CHANGER_STATS.map((stat, idx) => {
            const currentCount =
              stat.id === "projects"
                ? counts.projects
                : stat.id === "team"
                ? counts.team
                : counts.experience;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="py-8 md:py-10 px-0 md:px-8 lg:px-10 first:pl-0 last:pr-0 flex flex-col justify-between"
              >
                <div>
                  {/* Metric Step Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      {getStatIcon(stat.id)}
                      <span className="text-[11px] font-mono font-bold text-[#7C7D82] uppercase tracking-wider">
                        METRIC 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Large Numbers with Serif Styling */}
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#121316] tracking-tight tabular-nums font-normal">
                      {currentCount}
                    </span>
                    <span className="text-3xl sm:text-4xl font-serif text-[#1E5FD8] font-normal">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Stat Title */}
                  <h3 className="text-xl font-serif text-[#121316] mt-2 mb-2">
                    {stat.label}
                  </h3>

                  {/* Subtext description */}
                  <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-6 pt-4 border-t border-[#E6E6E8]/70 flex items-center gap-2 text-[11px] text-[#7C7D82] font-mono">
                  <span className="w-1.5 h-1.5 bg-[#1E5FD8] rounded-none" />
                  <span>{stat.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
