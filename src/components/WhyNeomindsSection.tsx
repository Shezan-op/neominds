"use client";

import React from "react";
import { WHY_NEOMINDS_POINTS } from "@/lib/data";

export function WhyNeomindsSection() {
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Our Differentiators
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            Why companies choose Neominds for serious technical execution.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            We focus on reliability, clear business logic, and high-performance software delivery.
          </p>
        </div>

        {/* 5 Focused Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_NEOMINDS_POINTS.map((point) => (
            <div
              key={point.number}
              className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm p-6 sm:p-8 flex flex-col justify-between hover:border-[#D2D2D6] transition-colors"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#FF5200] block mb-4">
                  {point.number}
                </span>
                <h3 className="text-xl font-serif text-[#121316] mb-3 leading-snug">
                  {point.title}
                </h3>
                <p className="text-sm text-[#4A4B50] font-sans leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
