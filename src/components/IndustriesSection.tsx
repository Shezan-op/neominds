"use client";

import React, { useRef } from "react";
import { INDUSTRIES_DATA } from "@/lib/data";
import { ChevronLeft, ChevronRight, CheckCircle2, Layers } from "lucide-react";

export function IndustriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section id="industries" className="py-24 sm:py-32 bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
              Domain Expertise & Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
              Industries we are serving with custom software.
            </h2>
            <p className="mt-4 text-base text-[#4A4B50] font-sans leading-relaxed">
              Tailored software architectures and deterministic AI workflows purpose-built for specific commercial dynamics.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-10 h-10 min-h-[44px] min-w-[44px] bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] hover:bg-[#1E5FD8] hover:border-[#1E5FD8] hover:text-white flex items-center justify-center transition-colors cursor-pointer rounded-none shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-10 h-10 min-h-[44px] min-w-[44px] bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] hover:bg-[#1E5FD8] hover:border-[#1E5FD8] hover:text-white flex items-center justify-center transition-colors cursor-pointer rounded-none shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Architectural Sector Track (Sleek, minimal, hairline dividers) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {INDUSTRIES_DATA.map((industry) => (
            <div
              key={industry.id}
              className="w-[320px] sm:w-[380px] lg:w-[420px] flex-shrink-0 snap-start bg-[#FFFFFF] border-t-2 border-t-[#1E5FD8] border-x border-b border-[#E6E6E8] hover:border-[#1E5FD8]/50 shadow-xs hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all p-6 sm:p-8 flex flex-col justify-between rounded-none"
            >
              <div>
                {/* Sector Number & Badge */}
                <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                  <div className="flex items-center gap-2 text-[#1E5FD8]">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      SECTOR {industry.code}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C7D82] font-semibold bg-[#FAF9F6] border border-[#E6E6E8] px-2 py-0.5 rounded-none">
                    ACTIVE
                  </span>
                </div>

                {/* Name & Tagline */}
                <h3 className="text-2xl font-serif text-[#121316] leading-tight mb-1">
                  {industry.name}
                </h3>
                <p className="text-xs font-mono text-[#1E5FD8] font-semibold uppercase tracking-wider mb-4">
                  {industry.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed mb-6">
                  {industry.description}
                </p>

                {/* Capabilities */}
                <div className="space-y-2.5 pt-4 border-t border-[#E6E6E8] mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#121316] font-bold block">
                    Core Systems Delivered:
                  </span>
                  {industry.capabilities.map((cap, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-start gap-2 text-xs text-[#4A4B50] font-sans"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5FD8] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric Footnote */}
              <div className="p-3.5 bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-between rounded-none">
                <div>
                  <span className="text-xl font-serif text-[#121316] font-bold block leading-none">
                    {industry.metricStat}
                  </span>
                  <span className="text-[10px] font-mono text-[#7C7D82] uppercase tracking-wider block mt-1">
                    {industry.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
