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
    <section id="services" className="relative bg-[#090A0D] text-[#FFFFFF] overflow-hidden pt-28 pb-28 sm:pt-36 sm:pb-36 border-t border-b border-[#222530]">
      {/* 1. Smooth Top Crossover Light-to-Dark Gradient Boundary */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FAF9F6]/10 to-transparent pointer-events-none" />

      {/* Subtle background ambient orange radial glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#FF5200]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF5200]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dark Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#14161D] border border-[#2D313F] rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFFFFF] font-sans">
              Core Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#FFFFFF] leading-[1.08] tracking-tight">
            Comprehensive technical services for modern enterprises.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#E2E5EE] font-sans leading-relaxed">
            Full-lifecycle engineering, practical autonomous AI systems, and enterprise architecture built to run with zero downtime.
          </p>
        </motion.div>

        {/* Dynamic Split Layout: Interactive Services Table on Left + Live Architecture Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Service Line Items */}
          <div className="lg:col-span-7 divide-y divide-[#222530] border-t border-b border-[#222530]">
            {SERVICES_DATA.map((service, index) => {
              const serviceNumber = (index + 1).toString().padStart(2, "0");
              const isHovered = hoveredIdx === index;

              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => setHoveredIdx(index)}
                  className={`group transition-all duration-200 cursor-pointer ${
                    isHovered ? "bg-[#14161F]" : "hover:bg-[#101217]"
                  }`}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between py-6 sm:py-7 px-4 sm:px-6"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className={`text-xs font-mono font-bold transition-colors ${
                          isHovered ? "text-[#FF5200]" : "text-[#A0A4B8]"
                        }`}
                      >
                        {serviceNumber}
                      </span>
                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-serif transition-colors ${
                            isHovered ? "text-[#FF5200]" : "text-[#FFFFFF]"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#CBD0DE] font-sans line-clamp-1 mt-1 max-w-md hidden sm:block">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        isHovered
                          ? "bg-[#FF5200] border-[#FF5200] text-white rotate-0"
                          : "bg-[#181A24] border-[#2D313F] text-[#FFFFFF] -rotate-45"
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
              backgroundColor="#101217"
              borderRadius={12}
              glowColor="20 100 50"
              colors={["#FF5200", "#FF7A33", "#FFA07A"]}
              glowRadius={36}
              glowIntensity={1.2}
              className="p-6 sm:p-8 border border-[#2D313F] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#2D313F] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FF5200]" />
                  <span className="text-[11px] font-mono text-[#FFFFFF] uppercase tracking-wider font-semibold">
                    Blueprint Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#FF5200] bg-[#FF5200]/15 border border-[#FF5200]/40 px-2.5 py-0.5 rounded-full">
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
                    <span className="text-[10px] font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                      Target System
                    </span>
                    <h4 className="text-2xl font-serif text-[#FFFFFF] mt-1">
                      {activeService.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#E2E5EE] font-sans leading-relaxed mt-2">
                      {activeService.heroDescription}
                    </p>
                  </div>

                  {/* Deliverables Preview */}
                  {activeService.deliverables.length > 0 && (
                    <div className="p-4 rounded-lg bg-[#161822] border border-[#2D313F] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFFFFF] font-bold block">
                        Core Deliverables
                      </span>
                      {activeService.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs text-[#FFFFFF]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200]" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Link CTA */}
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-white"
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
