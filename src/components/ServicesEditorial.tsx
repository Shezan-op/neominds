"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Terminal } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { BorderGlow } from "@/components/ui/BorderGlow";

export function ServicesEditorial() {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  const activeService = SERVICES_DATA[hoveredIdx] || SERVICES_DATA[0];

  return (
    <section id="services" className="relative bg-[#FAF9F6] text-[#121316] overflow-hidden pt-28 pb-28 sm:pt-36 sm:pb-36 border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
            Engineering Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#121316] leading-[1.08] tracking-tight">
            Comprehensive technical services for modern enterprises.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#4A4B50] font-sans leading-relaxed">
            Full-lifecycle engineering, practical autonomous AI systems, and enterprise architecture built to run with zero downtime.
          </p>
        </motion.div>

        {/* Dynamic Split Layout: Interactive Services Table on Left + Live Architecture Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Service Line Items */}
          <div className="lg:col-span-7 divide-y divide-[#E6E6E8] border-t border-b border-[#E6E6E8]">
            {SERVICES_DATA.map((service, index) => {
              const serviceNumber = (index + 1).toString().padStart(2, "0");
              const isHovered = hoveredIdx === index;

              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => setHoveredIdx(index)}
                  className={`group transition-all duration-200 cursor-pointer ${
                    isHovered ? "bg-[#FFFFFF]" : "hover:bg-[#F3F2EE]"
                  }`}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between py-6 sm:py-7 px-4 sm:px-6"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className={`text-xs font-mono font-bold transition-colors ${
                          isHovered ? "text-[#1E5FD8]" : "text-[#7C7D82]"
                        }`}
                      >
                        {serviceNumber}
                      </span>
                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-serif transition-colors ${
                            isHovered ? "text-[#1E5FD8]" : "text-[#121316]"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#4A4B50] font-sans line-clamp-1 mt-1 max-w-md hidden sm:block">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        isHovered
                          ? "bg-[#1E5FD8] border-[#1E5FD8] text-white rotate-0"
                          : "bg-[#FFFFFF] border-[#E6E6E8] text-[#7C7D82] -rotate-45"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Live Architecture Inspector */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <BorderGlow
              backgroundColor="#FFFFFF"
              borderRadius={0}
              glowColor="217 91 60"
              colors={["#10316B", "#1E5FD8", "#60A5FA"]}
              glowRadius={20}
              glowIntensity={0.4}
              className="p-6 sm:p-8 border border-[#E6E6E8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-none"
            >
              <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#1E5FD8]" />
                  <span className="text-[11px] font-mono text-[#121316] uppercase tracking-wider font-semibold">
                    Blueprint Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#1E5FD8] bg-[#EDF4FF] border border-[#1E5FD8]/30 px-2.5 py-0.5 rounded-none">
                  LIVE TELEMETRY
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block">
                      Target System
                    </span>
                    <h4 className="text-2xl font-serif text-[#121316] mt-1">
                      {activeService.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed mt-2">
                      {activeService.heroDescription}
                    </p>
                  </div>

                  {/* Deliverables Preview */}
                  {activeService.deliverables.length > 0 && (
                    <div className="p-4 bg-[#FAF9F6] border border-[#E6E6E8] space-y-2 rounded-none">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#121316] font-bold block">
                        Core Deliverables
                      </span>
                      {activeService.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs text-[#121316]"
                        >
                          <span className="w-1.5 h-1.5 bg-[#1E5FD8] rounded-none" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Link CTA */}
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-3 flex items-center justify-center gap-2 text-white rounded-none"
                  >
                    <span>View {activeService.title} Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
