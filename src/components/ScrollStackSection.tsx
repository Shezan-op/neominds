"use client";

import React from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, PhoneCall } from "lucide-react";
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
    <section className="relative py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Strategic Workflow
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            How we partner with your business from diagnosis to deployment.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            A structured framework designed to identify operational bottlenecks and engineer robust software solutions.
          </p>
        </div>

        {/* Scroll Stack Container */}
        <div className="relative space-y-8 sm:space-y-12">
          {SCROLL_STACK_CARDS.map((card, idx) => {
            // Calculate sticky top offset for stacking effect
            const stickyTop = 100 + idx * 24;

            return (
              <div
                key={card.id}
                style={{ top: `${stickyTop}px` }}
                className="sticky"
              >
                <BorderGlow
                  backgroundColor="#FFFFFF"
                  borderRadius={4}
                  glowColor="20 100 50"
                  colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                  edgeSensitivity={25}
                  glowRadius={32}
                  glowIntensity={1.0}
                  className="p-6 sm:p-10 lg:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                >
                  {/* Card Top Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] pb-6 mb-8 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-sm bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center flex-shrink-0">
                        {getCardIcon(idx)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider">
                          Phase {card.stepNumber}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#121316] leading-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#7C7D82] self-start sm:self-auto bg-[#FAF9F6] px-3 py-1 border border-[#E6E6E8] rounded-sm">
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="text-base text-[#4A4B50] font-sans leading-relaxed mb-8 max-w-3xl">
                    {card.description}
                  </p>

                  {/* Card Points Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {card.points.map((point, pIdx) => (
                      <BorderGlow
                        key={pIdx}
                        backgroundColor="#FAF9F6"
                        borderRadius={3}
                        glowColor="20 100 50"
                        glowRadius={20}
                        edgeSensitivity={30}
                        fillOpacity={0.15}
                        className="p-5 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-base font-sans font-bold text-[#121316] mb-2">
                            {point.headline}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                            {point.detail}
                          </p>
                        </div>
                      </BorderGlow>
                    ))}
                  </div>

                  {/* Card 4 CTA Action */}
                  {card.ctaText && (
                    <div className="mt-8 pt-6 border-t border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm text-[#7C7D82] font-sans">
                        Direct consultation with a senior engineer. No obligation.
                      </span>
                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3 w-full sm:w-auto"
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
