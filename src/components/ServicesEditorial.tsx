"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle2, Terminal } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export function ServicesEditorial() {
  // Active expanded item index (defaults to 0 or null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIdx(expandedIdx === index ? null : index);
  };

  return (
    <section id="services" className="relative bg-[#FAF9F6] text-[#121316] overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32 border-b border-[#E6E6E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Reduced Size & Clean Hierarchy) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
            Engineering Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#121316] leading-tight tracking-tight">
            Comprehensive technical services for modern enterprises.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4B50] font-sans leading-relaxed">
            Full-lifecycle software engineering, practical autonomous AI systems, and cloud architecture built to run with zero downtime.
          </p>
        </motion.div>

        {/* Centered Capabilities List with Inline Expandable Cards */}
        <div className="divide-y divide-[#E6E6E8] border-t border-b border-[#E6E6E8] bg-[#FAF9F6]">
          {SERVICES_DATA.map((service, index) => {
            const serviceNumber = (index + 1).toString().padStart(2, "0");
            const isExpanded = expandedIdx === index;

            return (
              <motion.div
                key={service.slug}
                layout
                className="transition-colors duration-200"
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(index)}
                  className={`w-full flex items-center justify-between py-5 sm:py-6 px-4 sm:px-6 text-left transition-all cursor-pointer select-none ${
                    isExpanded ? "bg-[#FFFFFF]" : "hover:bg-[#F3F2EE]"
                  }`}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isExpanded ? "text-[#1E5FD8]" : "text-[#7C7D82]"
                      }`}
                    >
                      {serviceNumber}
                    </span>
                    <div>
                      <h3
                        className={`text-lg sm:text-xl md:text-2xl font-serif font-bold transition-colors ${
                          isExpanded ? "text-[#1E5FD8]" : "text-[#121316]"
                        }`}
                      >
                        {service.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-xs text-[#4A4B50] font-sans line-clamp-1 mt-0.5 max-w-xl hidden sm:block">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Toggle Indicator */}
                  <div
                    className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      isExpanded
                        ? "bg-[#1E5FD8] border-[#1E5FD8] text-white rotate-180"
                        : "bg-[#FFFFFF] border-[#E6E6E8] text-[#7C7D82] rotate-0"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* INLINE EXPANDED CARD IN THE MIDDLE */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-[#FFFFFF] border-t border-[#E6E6E8]"
                    >
                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Summary Block */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-3.5 h-3.5 text-[#1E5FD8]" />
                            <span className="text-[10px] font-mono font-bold text-[#1E5FD8] uppercase tracking-wider">
                              SYSTEM SPECIFICATION // {service.title}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                            {service.heroDescription}
                          </p>
                        </div>

                        {/* Deliverables List */}
                        {service.deliverables.length > 0 && (
                          <div className="p-4 bg-[#FAF9F6] border border-[#E6E6E8] space-y-2 rounded-none">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#121316] font-bold block mb-1">
                              Core Deliverables & Outcomes
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.deliverables.map((item, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="flex items-start gap-2 text-xs text-[#121316] font-sans"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5FD8] flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action CTA */}
                        <div className="pt-1 flex items-center justify-between flex-wrap gap-4">
                          <span className="text-[11px] font-mono text-[#7C7D82]">
                            100% Deterministic Engineering • Full Code Ownership
                          </span>

                          <Link
                            href={`/services/${service.slug}`}
                            className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5 flex items-center gap-2 text-white rounded-none cursor-pointer"
                          >
                            <span>View {service.title} Spec</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
