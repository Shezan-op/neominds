"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/data";
import { BorderGlow } from "@/components/ui/BorderGlow";

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Client Feedback
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            Direct feedback from engineering and operational leaders.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            Verified experiences from teams running Neominds systems in daily production.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <BorderGlow
              key={test.id}
              backgroundColor="#FFFFFF"
              borderRadius={4}
              glowColor="20 100 50"
              colors={["#FF5200", "#FF7A33", "#FFA07A"]}
              edgeSensitivity={30}
              glowRadius={28}
              fillOpacity={0.2}
              className="p-6 sm:p-8 flex flex-col justify-between"
            >
              {/* Quote */}
              <div className="space-y-4">
                <span className="text-3xl font-serif text-[#FF5200] leading-none block">
                  “
                </span>
                <p className="text-base text-[#121316] font-serif leading-relaxed italic">
                  {test.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-[#E6E6E8]">
                <span className="text-sm font-sans font-bold text-[#121316] block">
                  {test.author}
                </span>
                <span className="text-xs text-[#7C7D82] font-sans block mt-0.5">
                  {test.role}, {test.company}
                </span>
                <span className="text-[11px] font-mono text-[#FF5200] uppercase tracking-wider block mt-2">
                  {test.serviceUsed}
                </span>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
