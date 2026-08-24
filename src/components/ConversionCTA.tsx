"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Clock, FileCode } from "lucide-react";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface ConversionCTAProps {
  onOpenContact: () => void;
}

export function ConversionCTA({ onOpenContact }: ConversionCTAProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BorderGlow
          backgroundColor="#FFFFFF"
          borderRadius={4}
          glowColor="20 100 50"
          colors={["#FF5200", "#FF7A33", "#FFA07A"]}
          edgeSensitivity={20}
          glowRadius={36}
          glowIntensity={1.0}
          className="p-8 sm:p-14 lg:p-20 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F6] border border-[#E6E6E8] rounded-sm mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5200] font-sans">
                Next Steps
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#121316] leading-tight">
              Ready to eliminate operational bottlenecks with custom software?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#4A4B50] font-sans leading-relaxed">
              Schedule a 15-minute technical discovery call with our engineering leads. We will review your bottlenecks, evaluate feasibility, and present an actionable implementation plan.
            </p>

            {/* CTA Button */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-sm uppercase tracking-wider font-bold px-8 py-4 shadow-sm"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Credibility Guarantees */}
            <div className="mt-12 pt-8 border-t border-[#E6E6E8] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#7C7D82] font-sans">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF5200] flex-shrink-0" />
                <span>14-day average sprint delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#FF5200] flex-shrink-0" />
                <span>100% source code handover</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF5200] flex-shrink-0" />
                <span>Zero vendor lock-in or royalties</span>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
