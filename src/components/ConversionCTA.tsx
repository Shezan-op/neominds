"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Clock, FileCode } from "lucide-react";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface ConversionCTAProps {
  onOpenContact: () => void;
}

export function ConversionCTA({ onOpenContact }: ConversionCTAProps) {
  return (
    <section className="relative py-28 sm:py-36 bg-[#07080A] text-[#FFFFFF] overflow-hidden border-t border-[#222530]">
      {/* 1. Smooth Crossover Gradient from Light FAQ into Dark Conversion */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FAF9F6]/10 to-transparent pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FF5200]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BorderGlow
          backgroundColor="#0D0F14"
          borderRadius={20}
          glowColor="20 100 50"
          colors={["#FF5200", "#FF7A33", "#FFA07A"]}
          edgeSensitivity={25}
          glowRadius={40}
          glowIntensity={1.2}
          className="p-8 sm:p-14 lg:p-20 shadow-2xl border border-[#2D313F]"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#161822] border border-[#2D313F] rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5200] font-sans">
                Next Steps • Engineering Consultation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#FFFFFF] leading-tight">
              Ready to eliminate operational bottlenecks with custom software?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#E2E5EE] font-sans leading-relaxed">
              Schedule a 15-minute technical discovery call with our engineering leads. We will review your bottlenecks, evaluate feasibility, and present an actionable implementation plan.
            </p>

            {/* CTA Button */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-sm uppercase tracking-wider font-bold px-8 py-4 rounded-full shadow-lg"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Credibility Guarantees */}
            <div className="mt-12 pt-8 border-t border-[#2D313F] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF5200] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">14-day average sprint delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCode className="w-4 h-4 text-[#FF5200] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">100% source code handover</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5200] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">Zero vendor lock-in or royalties</span>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
