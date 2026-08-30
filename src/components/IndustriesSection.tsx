"use client";

import React, { useState, useEffect, useRef } from "react";
import { INDUSTRIES_DATA } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharacterAssemble } from "./motion/CharacterAssemble";
import { TravelingLine } from "./motion/TravelingLine";
import { trackEvent } from "@/lib/analytics";

export function IndustriesSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [gridBroken, setGridBroken] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const lastIdxRef = useRef<number>(0);

  const totalIndustries = INDUSTRIES_DATA.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalIndustries * 320}`,
          pin: pinContainer,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.2,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * totalIndustries),
              totalIndustries - 1
            );

            if (index !== lastIdxRef.current) {
              lastIdxRef.current = index;
              setActiveIdx(index);
              trackEvent({
                action: "industry_field_focus",
                category: "industry_inspection",
                label: INDUSTRIES_DATA[index]?.name || `Industry ${index + 1}`,
              });
            }

            const shouldBreak = (progress >= 0.25 && progress <= 0.4) || (progress >= 0.7 && progress <= 0.85);
            setGridBroken(shouldBreak);
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [totalIndustries]);

  const activeIndustry = INDUSTRIES_DATA[activeIdx] || INDUSTRIES_DATA[0];

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative bg-[#FAF9F6] text-[#121316] select-none"
    >
      <div
        ref={pinContainerRef}
        className="min-h-screen flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full will-change-transform"
      >
        {/* Section Header */}
        <div>
          <div className="pt-2 pb-5 flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E6E6E8]">
            <CharacterAssemble
              text="INDUSTRIES"
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-[#121316] font-serif"
            />
          </div>
        </div>

        {/* ZERO CARDS: Typographic Focus Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-4">
          {/* Left Column: Vertical List with Displacement Physics */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const isActive = activeIdx === idx;
              const distance = Math.abs(activeIdx - idx);
              const pushX = isActive ? 12 : distance === 1 ? -6 : -14;
              const opacity = isActive ? 1 : Math.max(0.2, 0.7 - distance * 0.2);

              return (
                <div
                  key={ind.id}
                  onClick={() => setActiveIdx(idx)}
                  className="cursor-pointer group transition-all duration-300 select-none py-1"
                  style={{
                    transform: `translateX(${pushX}px)`,
                    opacity,
                  }}
                  data-cursor
                  data-cursor-text="FOCUS"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span
                      className={`font-serif font-bold uppercase tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-2xl sm:text-4xl lg:text-5xl text-[#121316]"
                          : "text-lg sm:text-2xl text-[#8C8D92] group-hover:text-[#4A4B50]"
                      }`}
                    >
                      {ind.name}
                    </span>
                  </div>

                  {isActive && (
                    <div className="w-20 h-[2px] bg-[#1E5FD8] mt-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Industry Open Dossier (ZERO CARDS, ZERO BADGES) */}
          <div className="lg:col-span-5 border-l border-[#E6E6E8] pl-6 sm:pl-8 lg:pl-10 space-y-5">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121316] leading-tight">
                {activeIndustry.tagline}
              </h3>

              <p className="text-sm sm:text-base text-[#4A4B50] font-sans leading-relaxed pt-1">
                {activeIndustry.description}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="pt-3 border-t border-[#E6E6E8] space-y-2 font-sans">
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
            <div className="pt-3 border-t border-[#E6E6E8] flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1E5FD8]">
                {activeIndustry.metricStat}
              </span>
              <span className="text-xs sm:text-sm text-[#7C7D82] font-sans font-medium">
                {activeIndustry.metricLabel}
              </span>
            </div>
          </div>
        </div>

        <TravelingLine className="mt-4" />
      </div>
    </section>
  );
}
