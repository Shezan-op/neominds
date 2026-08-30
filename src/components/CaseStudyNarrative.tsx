"use client";

import React, { useState, useEffect, useRef } from "react";
import { SCROLL_STACK_CASE_STUDIES } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TravelingLine } from "./motion/TravelingLine";
import { trackEvent } from "@/lib/analytics";

interface CaseStudyNarrativeProps {
  onOpenContact?: () => void;
}

export function CaseStudyNarrative({ onOpenContact }: CaseStudyNarrativeProps = {}) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [phase, setPhase] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const lastIdxRef = useRef<number>(0);
  const lastPhaseRef = useRef<number>(1);

  const studies = SCROLL_STACK_CASE_STUDIES;

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
          end: `+=${studies.length * 350}`,
          pin: pinContainer,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.2,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * studies.length),
              studies.length - 1
            );

            if (index !== lastIdxRef.current) {
              lastIdxRef.current = index;
              setActiveIdx(index);
              trackEvent({
                action: "case_narrative_step",
                category: "case_study_inspection",
                label: studies[index]?.client || `Case Study ${index + 1}`,
              });
            }

            const currentPhase = Math.min(
              Math.floor((progress * studies.length - index) * 3) + 1,
              3
            );

            if (currentPhase !== lastPhaseRef.current) {
              lastPhaseRef.current = currentPhase;
              setPhase(currentPhase);
            }
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [studies.length, studies]);

  const activeStudy = studies[activeIdx] || studies[0];

  return (
    <section
      ref={sectionRef}
      id="case-narrative"
      className="relative bg-[#FAF9F6] text-[#121316] select-none"
    >
      <div
        ref={pinContainerRef}
        className="min-h-screen flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full will-change-transform"
      >
        {/* Section Header */}
        <div>
          <div className="pt-2 pb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#121316]">
              Detailed Case Studies
            </h2>
            <div className="flex items-center gap-2">
              {studies.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3 py-1.5 text-xs font-bold font-sans transition-all cursor-pointer min-h-[36px] ${
                    activeIdx === idx
                      ? "bg-[#1E5FD8] text-white"
                      : "bg-transparent border border-[#E6E6E8] text-[#7C7D82] hover:text-[#121316]"
                  }`}
                  data-cursor
                  data-cursor-text="SWITCH"
                >
                  {s.client}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ZERO CARDS: Pure Open Typography Storytelling */}
        <div className="relative my-auto py-6">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div
              className={`flex-1 pb-2.5 border-b-2 transition-all duration-300 ${
                phase >= 1 ? "border-[#1E5FD8] text-[#121316]" : "border-[#E6E6E8] text-[#A0A1A6]"
              }`}
            >
              <span className="text-xs sm:text-sm font-bold">The Problem</span>
            </div>

            <div
              className={`flex-1 pb-2.5 border-b-2 transition-all duration-300 ${
                phase >= 2 ? "border-[#1E5FD8] text-[#121316]" : "border-[#E6E6E8] text-[#A0A1A6]"
              }`}
            >
              <span className="text-xs sm:text-sm font-bold">What We Built</span>
            </div>

            <div
              className={`flex-1 pb-2.5 border-b-2 transition-all duration-300 ${
                phase >= 3 ? "border-[#1E5FD8] text-[#121316]" : "border-[#E6E6E8] text-[#A0A1A6]"
              }`}
            >
              <span className="text-xs sm:text-sm font-bold">The Result</span>
            </div>
          </div>

          {/* Dynamic Open Stage Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Title & Industry */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-semibold text-[#1E5FD8] uppercase tracking-wider block font-sans">
                {activeStudy.client}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121316] leading-tight">
                {activeStudy.title}
              </h3>
              <p className="text-xs text-[#7C7D82] font-sans pt-1">
                Industry: {activeStudy.industry}
              </p>
            </div>

            {/* Right Open Typography Flow (ZERO CARDS, ZERO BADGES) */}
            <div className="lg:col-span-8 space-y-6 lg:pl-6">
              {phase === 1 && (
                <div className="space-y-3 py-2 border-l-2 border-[#1E5FD8] pl-6">
                  <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block font-sans">
                    The Challenge
                  </span>
                  <p className="text-lg sm:text-2xl font-serif text-[#121316] leading-relaxed">
                    {activeStudy.challenge}
                  </p>
                </div>
              )}

              {phase === 2 && (
                <div className="space-y-4 py-2 border-l-2 border-[#1E5FD8] pl-6">
                  <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block font-sans">
                    The Engineering Solution
                  </span>
                  <p className="text-lg sm:text-2xl font-serif text-[#121316] leading-relaxed">
                    {activeStudy.solution}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeStudy.tags.map((t, i) => (
                      <span key={i} className="text-xs bg-[#EDF4FF] text-[#1E5FD8] px-3 py-1 font-medium font-sans border border-[#1E5FD8]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {phase === 3 && (
                <div className="space-y-4 py-2 border-l-2 border-[#1E5FD8] pl-6">
                  <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block font-sans">
                    Verified Results
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    {activeStudy.metrics.map((m, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1E5FD8] block">
                          {m.stat}
                        </span>
                        <span className="text-xs sm:text-sm text-[#4A4B50] font-sans block leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <TravelingLine className="mt-4" />
      </div>
    </section>
  );
}
