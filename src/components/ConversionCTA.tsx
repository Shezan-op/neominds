"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Clock, FileCode } from "lucide-react";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface ConversionCTAProps {
  onOpenContact: () => void;
}

export function ConversionCTA({ onOpenContact }: ConversionCTAProps) {
  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#07080A] text-[#FFFFFF] overflow-hidden border-t border-[#222530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BorderGlow
          backgroundColor="#0D0F14"
          borderRadius={0}
          glowColor="217 91 60"
          colors={["#10316B", "#1E5FD8", "#60A5FA"]}
          edgeSensitivity={25}
          glowRadius={24}
          glowIntensity={0.45}
          className="p-8 sm:p-14 lg:p-20 shadow-2xl border border-[#2D313F] rounded-none"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#FFFFFF] leading-tight">
              Ready to eliminate operational bottlenecks with custom software?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#E2E5EE] font-sans leading-relaxed">
              Schedule a 15-minute technical discovery call with our engineering leads. We will review your bottlenecks, evaluate feasibility, and present an actionable implementation plan.
            </p>

            {/* CTA Button with Sharp Corners */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-sm uppercase tracking-wider font-bold px-8 py-4 shadow-lg rounded-none"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Credibility Guarantees */}
            <div className="mt-12 pt-8 border-t border-[#2D313F] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">14-day average sprint delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCode className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">100% source code handover</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">Zero vendor lock-in or royalties</span>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
