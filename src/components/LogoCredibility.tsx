"use client";

import React from "react";
import { LOGO_ITEMS } from "@/lib/data";

export function LogoCredibility() {
  return (
    <section className="py-10 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Section Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Engineered With Modern Infrastructure
            </span>
            <div className="hidden md:block w-8 h-px bg-[#E6E6E8]" />
          </div>

          {/* Technology Marks List */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3">
            {LOGO_ITEMS.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 text-xs font-medium text-[#4A4B50] hover:text-[#121316] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6E6E8]" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
