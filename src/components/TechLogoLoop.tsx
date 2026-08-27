"use client";

import React from "react";
import { TECH_LOGO_ITEMS } from "@/lib/data";

export function TechLogoLoop() {
  // Duplicate array twice to ensure seamless infinite scroll loop
  const marqueeItems = [...TECH_LOGO_ITEMS, ...TECH_LOGO_ITEMS, ...TECH_LOGO_ITEMS];

  return (
    <section className="py-12 bg-[#FAF9F6] border-b border-[#E6E6E8] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7C7D82]">
            Core Technology Stack & Partner Infrastructure
          </span>
          <span className="text-[10px] font-mono text-[#1E5FD8] uppercase tracking-wider font-semibold hidden sm:inline-block">
            PRODUCTION VERIFIED
          </span>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right subtle gradient masks for smooth fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee whitespace-nowrap will-change-transform py-2">
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-5 py-3 bg-[#FFFFFF] border border-[#E6E6E8] shadow-xs flex-shrink-0 rounded-none"
            >
              <span className="w-1.5 h-1.5 bg-[#1E5FD8] rounded-none" />
              <div className="flex flex-col">
                <span className="text-xs font-sans font-bold text-[#121316] tracking-tight">
                  {tech.name}
                </span>
                <span className="text-[9px] font-mono text-[#7C7D82] uppercase tracking-wider">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
