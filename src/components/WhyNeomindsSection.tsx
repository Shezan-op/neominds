"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Shield, Zap, Terminal } from "lucide-react";
import { WHY_NEOMINDS_POINTS } from "@/lib/data";

export function WhyNeomindsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Narrative & Operational Benchmarks */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div>
              <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
                Engineered for Reliability
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
                Why companies choose Neominds over traditional agencies.
              </h2>
              <p className="mt-4 text-base text-[#4A4B50] font-sans leading-relaxed">
                We remove non-technical account managers, speculative tech trends, and bloated overhead. You work directly with engineers building production systems.
              </p>
            </div>

            {/* Operating Benchmarks with Clean Hairline Borders */}
            <div className="pt-6 border-t border-[#E6E6E8] space-y-3.5 font-sans">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7C7D82] block mb-2">
                Operational Guarantees
              </span>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#121316]">
                <Zap className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span>14-day average sprint delivery cadence</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#121316]">
                <Shield className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span>100% intellectual property & code ownership</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#121316]">
                <Terminal className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span>Direct Slack / GitHub channel with senior architects</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Numbered Accordion Rows */}
          <div className="lg:col-span-7 divide-y divide-[#E6E6E8] border-t border-b border-[#E6E6E8]">
            {WHY_NEOMINDS_POINTS.map((point, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={point.number}
                  className={`transition-all duration-200 ${
                    isOpen ? "bg-[#FFFFFF]" : "hover:bg-[#F7F6F2]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between py-6 sm:py-7 px-4 sm:px-6 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 pr-4">
                      <span className="text-xs font-mono font-bold text-[#1E5FD8]">
                        {point.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif text-[#121316]">
                        {point.title}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 border flex items-center justify-center transition-all duration-200 flex-shrink-0 rounded-none ${
                        isOpen
                          ? "bg-[#1E5FD8] border-[#1E5FD8] text-white"
                          : "bg-[#FFFFFF] border-[#E6E6E8] text-[#7C7D82]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-1 text-sm text-[#4A4B50] font-sans leading-relaxed pl-12 sm:pl-16 max-w-xl">
                          {point.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
