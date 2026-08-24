"use client";

import React from "react";
import { ArrowRight, AlertCircle, Sparkles, CheckCircle2, PhoneCall } from "lucide-react";
import { SCROLL_STACK_CARDS } from "@/lib/data";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface ScrollStackSectionProps {
  onOpenContact: () => void;
}

export function ScrollStackSection({ onOpenContact }: ScrollStackSectionProps) {
  const getCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return <AlertCircle className="w-5 h-5 text-[#FF5200]" />;
      case 1:
        return <Sparkles className="w-5 h-5 text-[#FF5200]" />;
      case 2:
        return <CheckCircle2 className="w-5 h-5 text-[#FF5200]" />;
      case 3:
        return <PhoneCall className="w-5 h-5 text-[#FF5200]" />;
      default:
        return null;
    }
  };

  return (
    <section id="workflow" className="relative py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-full mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A4B50] font-sans">
              Strategic Workflow
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            How we partner with your business from diagnosis to deployment.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans leading-relaxed">
            A structured framework designed to identify operational bottlenecks and engineer robust software solutions.
          </p>
        </div>

        {/* Scroll Stack Container: Sticky Stacking Cards with Smooth Spacing */}
        <div className="relative space-y-12 sm:space-y-16 pb-12">
          {SCROLL_STACK_CARDS.map((card, idx) => {
            // Smooth cascading top offset
            const stickyTop = 100 + idx * 24;

            return (
              <div
                key={card.id}
                style={{ top: `${stickyTop}px` }}
                className="sticky will-change-transform"
              >
                <BorderGlow
                  backgroundColor="#FFFFFF"
                  borderRadius={16}
                  glowColor="20 100 50"
                  colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                  edgeSensitivity={25}
                  glowRadius={36}
                  glowIntensity={1.0}
                  className="p-6 sm:p-10 lg:p-12 shadow-[0_-4px_30px_rgba(0,0,0,0.03),0_12px_40px_rgba(0,0,0,0.06)] border border-[#E6E6E8] transition-shadow duration-300"
                >
                  {/* Card Top Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] pb-6 mb-8 gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center flex-shrink-0">
                        {getCardIcon(idx)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider">
                          Phase {card.stepNumber}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] leading-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4A4B50] self-start sm:self-auto bg-[#FAF9F6] px-3.5 py-1.5 border border-[#E6E6E8] rounded-full">
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="text-base text-[#4A4B50] font-sans leading-relaxed mb-8 max-w-3xl">
                    {card.description}
                  </p>

                  {/* Card Points Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {card.points.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E6E6E8] flex flex-col justify-between transition-colors hover:bg-[#F3F2EE]"
                      >
                        <h4 className="text-base font-sans font-bold text-[#121316] mb-2">
                          {point.headline}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                          {point.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Card 4 CTA Action */}
                  {card.ctaText && (
                    <div className="mt-8 pt-6 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm text-[#4A4B50] font-sans">
                        Direct consultation with a senior engineer. No obligation.
                      </span>
                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-full w-full sm:w-auto flex items-center justify-center gap-2"
                      >
                        <span>{card.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </BorderGlow>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
