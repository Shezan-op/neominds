"use client";

import React, { useState } from "react";
import { INDUSTRIES_DATA } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { CharacterAssemble } from "./motion/CharacterAssemble";
import { DrawLine } from "./motion/DrawLine";
import { trackEvent } from "@/lib/analytics";

export function IndustriesSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeIndustry = INDUSTRIES_DATA[activeIdx] || INDUSTRIES_DATA[0];

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    trackEvent({
      action: "industry_select",
      category: "industry_inspection",
      label: INDUSTRIES_DATA[idx]?.name || `Industry ${idx + 1}`,
    });
  };

  return (
    <section
      id="industries"
      className="py-16 sm:py-28 bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pt-2 pb-6 border-b border-[#E6E6E8] mb-10 sm:mb-14">
          <CharacterAssemble
            text="INDUSTRIES"
            as="h2"
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-[#121316] font-serif"
          />
        </div>

        {/* ZERO CARDS: Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Industry Selector List */}
          <div className="lg:col-span-6 space-y-2 sm:space-y-3">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const isActive = activeIdx === idx;

              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="w-full text-left cursor-pointer group transition-all duration-200 select-none py-2 block min-h-[44px]"
                  data-cursor
                  data-cursor-text="EXPLORE"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-serif font-bold uppercase tracking-tight transition-all duration-200 ${
                        isActive
                          ? "text-2xl sm:text-3xl lg:text-4xl text-[#121316] translate-x-3"
                          : "text-lg sm:text-2xl text-[#8C8D92] group-hover:text-[#4A4B50] translate-x-0"
                      }`}
                    >
                      {ind.name}
                    </span>

                    {isActive && (
                      <span className="w-8 h-[2px] bg-[#1E5FD8] hidden sm:block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Industry Details */}
          <div className="lg:col-span-6 lg:border-l lg:border-[#E6E6E8] lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121316] leading-tight">
                    {activeIndustry.tagline}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4A4B50] font-sans leading-relaxed pt-2">
                    {activeIndustry.description}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="pt-4 border-t border-[#E6E6E8] space-y-2 font-sans">
                  <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block mb-1">
                    What We Build For This Industry:
                  </span>
                  {activeIndustry.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#121316]"
                    >
                      <span className="text-[#1E5FD8] font-bold text-xs">✓</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Proven Stat Result */}
                <div className="pt-4 border-t border-[#E6E6E8] flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1E5FD8]">
                    {activeIndustry.metricStat}
                  </span>
                  <span className="text-xs sm:text-sm text-[#7C7D82] font-sans font-medium">
                    {activeIndustry.metricLabel}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <DrawLine orientation="horizontal" color="#E6E6E8" className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
