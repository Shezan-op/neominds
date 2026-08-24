"use client";

import React from "react";
import { ABOUT_NEOMINDS } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about-us" className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
                About Neominds
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
              {ABOUT_NEOMINDS.headline}
            </h2>

            <div className="space-y-4 pt-4 text-base text-[#4A4B50] font-sans leading-relaxed">
              {ABOUT_NEOMINDS.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Key Operating Standards & Metrics */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm p-6 sm:p-10 space-y-8">
            <h3 className="text-xl font-serif text-[#121316] pb-4 border-b border-[#E6E6E8]">
              Operating Benchmarks
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {ABOUT_NEOMINDS.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-serif text-[#121316] block">
                    {stat.value}
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#7C7D82] block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E6E6E8] text-xs text-[#7C7D82] font-sans leading-relaxed">
              Neominds operates globally, partnering with enterprises and growth-stage companies across North America, Europe, and Asia-Pacific.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
