"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Play, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 bg-[#FAF9F6] border-b border-[#E6E6E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start space-y-6"
          >
            {/* Eyebrow / Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A4B50] font-sans">
                AI and Technology Solutions
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif text-[#121316] tracking-tight leading-[1.08] text-balance">
              We build software and AI systems that solve real business problems.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#4A4B50] font-sans font-normal leading-relaxed text-balance">
              A serious technical partner for companies that need practical AI solutions, custom web applications, automated workflows, and robust software engineering.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3.5 shadow-sm"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="btn-secondary text-xs uppercase tracking-wider font-bold px-6 py-3.5"
              >
                <span>Explore Services</span>
                <ArrowDown className="w-4 h-4 text-[#7C7D82]" />
              </a>
            </div>

            {/* Key Micro-Bullet Indicators */}
            <div className="pt-4 border-t border-[#E6E6E8] flex flex-wrap items-center gap-6 text-xs text-[#7C7D82] font-sans">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5200]" />
                <span>Production-Ready Systems</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5200]" />
                <span>100% Code Ownership</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 16:9 Clean Canvas Placeholder Directly in Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative w-full aspect-video rounded-sm bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between p-5 sm:p-7 group transition-all duration-300 hover:border-[#D2D2D6]">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                </div>
                <span className="text-[11px] font-mono text-[#7C7D82] uppercase tracking-wider">
                  16:9 Video & Visual Space
                </span>
                <div className="w-8 h-1.5 rounded-sm bg-[#FAF9F6]" />
              </div>

              {/* Central Visual Placeholder Area */}
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-8">
                <div className="w-12 h-12 rounded-sm bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center text-[#FF5200] mb-3 group-hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                <span className="text-sm font-semibold text-[#121316] font-sans">
                  16:9 Hero Visual / Video Space
                </span>
                <span className="text-xs text-[#7C7D82] mt-1 max-w-xs font-sans">
                  Reserved for high-fidelity product demo or technical architecture video.
                </span>
              </div>

              {/* Bottom Status Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E6E6E8] text-[11px] text-[#7C7D82] font-mono">
                <span>Neominds Architecture Engine</span>
                <span className="text-[#FF5200] font-semibold">16:9 Canvas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
