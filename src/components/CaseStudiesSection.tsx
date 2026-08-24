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

  return (
    <section id="case-studies" className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Proven Outcomes
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            Selected case studies in custom engineering.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            Detailed breakdowns of how our custom software and AI systems solved critical operational bottlenecks.
          </p>
        </motion.div>

        {/* Editorial Case Studies List */}
        <div className="space-y-10 sm:space-y-14">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <BorderGlow
                backgroundColor="#FFFFFF"
                borderRadius={4}
                glowColor="20 100 50"
                colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                edgeSensitivity={25}
                glowRadius={30}
                className="p-6 sm:p-10 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] pb-6 mb-8 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center text-[#121316]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                        Case Study 0{idx + 1}
                      </span>
                      <span className="text-sm font-sans font-bold text-[#121316]">
                        {study.client}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-sans text-[#7C7D82] px-2.5 py-1 bg-[#FAF9F6] border border-[#E6E6E8] rounded-sm">
                      {study.industry}
                    </span>
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-sans text-[#4A4B50] px-2.5 py-1 bg-[#FAF9F6] border border-[#E6E6E8] rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#121316] mb-8 leading-tight">
                  {study.title}
                </h3>

                {/* Three-Column Problem & Solution Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-[#E6E6E8] pb-8 mb-8">
                  {/* Challenge */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7C7D82] block">
                      The Problem
                    </span>
                    <p className="text-sm text-[#4A4B50] font-sans leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution & What Neominds Built */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7C7D82] block">
                      What Neominds Built
                    </span>
                    <p className="text-sm text-[#4A4B50] font-sans leading-relaxed">
                      {study.whatWeBuilt}
                    </p>
                  </div>

                  {/* Business Outcome */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7C7D82] block">
                      Business Outcome
                    </span>
                    <p className="text-sm text-[#121316] font-sans font-medium leading-relaxed">
                      {study.outcome}
                    </p>
                  </div>
                </div>

                {/* Metrics Row & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
                    {study.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="text-2xl sm:text-3xl font-serif text-[#121316] block">
                          {m.stat}
                        </span>
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7C7D82]">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStudy(study)}
                    className="btn-secondary text-xs uppercase tracking-wider font-bold px-5 py-2.5"
                  >
                    <span>View Case Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <BorderGlow
                backgroundColor="#FFFFFF"
                borderRadius={6}
                glowColor="20 100 50"
                colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                glowRadius={35}
                className="p-6 sm:p-10 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-6 right-6 p-2 text-[#7C7D82] hover:text-[#121316] rounded-sm focus:outline-none z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider">
                    {selectedStudy.client} • {selectedStudy.industry}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] mt-2 leading-tight">
                    {selectedStudy.title}
                  </h3>
                </div>

                <div className="space-y-6 text-sm text-[#4A4B50] font-sans leading-relaxed border-t border-b border-[#E6E6E8] py-6 my-6">
                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1">
                      The Challenge
                    </h4>
                    <p>{selectedStudy.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1">
                      The Technical Solution
                    </h4>
                    <p>{selectedStudy.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1">
                      System Architecture Built
                    </h4>
                    <p>{selectedStudy.whatWeBuilt}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1">
                      Commercial Outcome
                    </h4>
                    <p className="text-[#121316] font-medium">{selectedStudy.outcome}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(null)}
                    className="text-xs font-semibold text-[#7C7D82] hover:text-[#121316]"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudy(null);
                      onOpenContact();
                    }}
                    className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5"
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
