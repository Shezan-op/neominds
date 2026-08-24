"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, X } from "lucide-react";
import { CASE_STUDIES, CaseStudy } from "@/lib/data";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface CaseStudiesSectionProps {
  onOpenContact: () => void;
}

export function CaseStudiesSection({ onOpenContact }: CaseStudiesSectionProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);

  const activeCase = CASE_STUDIES[activeCaseIdx] || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-24 sm:py-32 bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A4B50] font-sans">
              Proven Deployments
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            Selected case studies in custom engineering.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            How our custom software architectures and deterministic AI systems unlocked enterprise scale.
          </p>
        </motion.div>

        {/* Case Studies Interactive Showcase (Tabs + Deep Breakdown) */}
        <div className="space-y-8">
          {/* Project Selector Pills */}
          <div className="flex flex-wrap gap-2.5 border-b border-[#E6E6E8] pb-4">
            {CASE_STUDIES.map((study, idx) => (
              <button
                key={study.id}
                type="button"
                onClick={() => setActiveCaseIdx(idx)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
                  activeCaseIdx === idx
                    ? "bg-[#FF5200] text-white shadow-md"
                    : "bg-[#FFFFFF] text-[#4A4B50] hover:bg-[#F3F2EE] border border-[#E6E6E8]"
                }`}
              >
                <span>{study.client}</span>
                <span className="ml-2 font-mono text-[10px] opacity-80">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Active Case Study Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <BorderGlow
                backgroundColor="#FFFFFF"
                borderRadius={16}
                glowColor="20 100 50"
                colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                edgeSensitivity={25}
                glowRadius={36}
                glowIntensity={1.0}
                className="p-8 sm:p-12 border border-[#E6E6E8] shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-8"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] pb-6 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center text-[#FF5200]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                        {activeCase.industry}
                      </span>
                      <span className="text-xl font-serif text-[#121316]">
                        {activeCase.client}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-sans text-[#4A4B50] px-3 py-1 bg-[#FAF9F6] border border-[#E6E6E8] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#121316] leading-tight max-w-4xl">
                  {activeCase.title}
                </h3>

                {/* 3-Column Problem / Built / Outcome Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                  <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E6E6E8] space-y-2">
                    <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                      The Operational Problem
                    </span>
                    <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                      {activeCase.challenge}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E6E6E8] space-y-2">
                    <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                      What Neominds Engineered
                    </span>
                    <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                      {activeCase.whatWeBuilt}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E6E6E8] space-y-2">
                    <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                      Commercial Return
                    </span>
                    <p className="text-xs sm:text-sm text-[#121316] font-sans font-semibold leading-relaxed">
                      {activeCase.outcome}
                    </p>
                  </div>
                </div>

                {/* Metrics + Action */}
                <div className="pt-6 border-t border-[#E6E6E8] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="grid grid-cols-3 gap-6 sm:gap-10">
                    {activeCase.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="text-2xl sm:text-3xl font-serif text-[#121316] block">
                          {m.stat}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C7D82]">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStudy(activeCase)}
                    className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inspect Full Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BorderGlow>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <BorderGlow
                backgroundColor="#FFFFFF"
                borderRadius={16}
                glowColor="20 100 50"
                colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                glowRadius={36}
                className="p-6 sm:p-10 shadow-2xl border border-[#E6E6E8] text-[#121316]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-6 right-6 p-2 text-[#7C7D82] hover:text-[#121316] rounded-full bg-[#FAF9F6] border border-[#E6E6E8] focus:outline-none z-10 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider">
                    {selectedStudy.client} • {selectedStudy.industry}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] mt-2 leading-tight">
                    {selectedStudy.title}
                  </h3>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed border-t border-b border-[#E6E6E8] py-6 my-6">
                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                      The Operational Bottleneck
                    </h4>
                    <p>{selectedStudy.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                      The Technical Solution
                    </h4>
                    <p>{selectedStudy.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                      System Architecture Built
                    </h4>
                    <p>{selectedStudy.whatWeBuilt}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#FF5200] text-xs uppercase tracking-wider mb-1 font-sans">
                      Commercial Return
                    </h4>
                    <p className="text-[#121316] font-semibold">{selectedStudy.outcome}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(null)}
                    className="text-xs font-semibold text-[#7C7D82] hover:text-[#121316] cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudy(null);
                      onOpenContact();
                    }}
                    className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded-full cursor-pointer"
                  >
                    <span>Build a Similar System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
