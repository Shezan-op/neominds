"use client";

import React, { useState } from "react";
import { ArrowRight, Building2, TrendingUp, X } from "lucide-react";
import { SCROLL_STACK_CASE_STUDIES, ScrollStackCaseStudy } from "@/lib/data";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollStackSectionProps {
  onOpenContact: () => void;
}

export function ScrollStackSection({ onOpenContact }: ScrollStackSectionProps) {
  const [selectedStudy, setSelectedStudy] = useState<ScrollStackCaseStudy | null>(null);

  return (
    <section id="case-stack" className="relative py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
            Selected Work & Production Deployments
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            Case studies in enterprise AI & custom engineering.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans leading-relaxed">
            Examine four mission-critical software systems we built to automate workflows and accelerate enterprise revenue.
          </p>
        </div>

        {/* Scroll Stack Container: 4 Sticky Stacking Case Study Cards */}
        <div className="relative space-y-12 sm:space-y-16 pb-12">
          {SCROLL_STACK_CASE_STUDIES.map((study, idx) => {
            // Smooth cascading top offset for sticky stacking effect
            const stickyTop = 96 + idx * 24;

            return (
              <div
                key={study.id}
                style={{ top: `${stickyTop}px` }}
                className="sticky will-change-transform"
              >
                <BorderGlow
                  backgroundColor="#FFFFFF"
                  borderRadius={0}
                  glowColor="217 91 60"
                  colors={["#10316B", "#1E5FD8", "#60A5FA"]}
                  edgeSensitivity={25}
                  glowRadius={36}
                  glowIntensity={1.0}
                  className="p-6 sm:p-10 lg:p-12 shadow-[0_-4px_30px_rgba(0,0,0,0.03),0_12px_40px_rgba(0,0,0,0.06)] border border-[#E6E6E8] transition-shadow duration-300 rounded-none"
                >
                  {/* Card Top Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] pb-6 mb-8 gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center flex-shrink-0 text-[#1E5FD8] rounded-none">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider">
                          CASE STUDY {study.stepNumber} // {study.industry}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] leading-tight mt-0.5">
                          {study.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#121316] self-start sm:self-auto bg-[#FAF9F6] px-3.5 py-1.5 border border-[#E6E6E8] rounded-none">
                      {study.client}
                    </span>
                  </div>

                  {/* Card Short Description */}
                  <p className="text-base sm:text-lg text-[#4A4B50] font-sans leading-relaxed mb-8 max-w-4xl">
                    {study.shortDescription}
                  </p>

                  {/* 3 Metric Badges Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
                    {study.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-5 bg-[#FAF9F6] border border-[#E6E6E8] flex flex-col justify-between rounded-none"
                      >
                        <span className="text-2xl sm:text-3xl font-serif text-[#121316] block">
                          {metric.stat}
                        </span>
                        <span className="text-[11px] font-mono text-[#7C7D82] uppercase tracking-wider block mt-1">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Action Footer */}
                  <div className="mt-8 pt-6 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-[#4A4B50] px-3 py-1 bg-[#FAF9F6] border border-[#E6E6E8] rounded-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-none w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Case Study Modal */}
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
                borderRadius={0}
                glowColor="217 91 60"
                colors={["#10316B", "#1E5FD8", "#60A5FA"]}
                glowRadius={36}
                className="p-6 sm:p-10 shadow-2xl border border-[#E6E6E8] text-[#121316] rounded-none"
              >
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-6 right-6 p-2 text-[#7C7D82] hover:text-[#121316] bg-[#FAF9F6] border border-[#E6E6E8] focus:outline-none z-10 cursor-pointer rounded-none"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider">
                    {selectedStudy.client} • {selectedStudy.industry}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] mt-2 leading-tight">
                    {selectedStudy.title}
                  </h3>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed border-t border-b border-[#E6E6E8] py-6 my-6">
                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                      The Operational Challenge
                    </h4>
                    <p>{selectedStudy.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                      The Engineering Solution
                    </h4>
                    <p>{selectedStudy.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                      System Architecture Delivered
                    </h4>
                    <p>{selectedStudy.whatWeBuilt}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1E5FD8] text-xs uppercase tracking-wider mb-1 font-sans">
                      Commercial Return
                    </h4>
                    <p className="text-[#121316] font-semibold">{selectedStudy.outcome}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(null)}
                    className="text-xs font-semibold text-[#7C7D82] hover:text-[#121316] cursor-pointer rounded-none"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudy(null);
                      onOpenContact();
                    }}
                    className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5 cursor-pointer rounded-none"
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
