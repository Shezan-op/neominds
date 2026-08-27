"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevQuote = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextQuote = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIdx];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
              What engineering leaders say about Neominds.
            </h2>
          </div>

          {/* Carousel Arrows with Sharp Corners */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevQuote}
              className="w-10 h-10 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] hover:bg-[#1E5FD8] hover:border-[#1E5FD8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs rounded-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextQuote}
              className="w-10 h-10 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] hover:bg-[#1E5FD8] hover:border-[#1E5FD8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs rounded-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Editorial Quote Showcase with Sharp Corners */}
        <div className="p-8 sm:p-14 lg:p-16 bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative rounded-none">
          <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-[#1E5FD8]/15 absolute top-8 right-8 sm:top-12 sm:right-12 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#121316] leading-relaxed max-w-4xl italic">
                “{activeTestimonial.quote}”
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E6E6E8] pt-6 gap-4 font-sans">
                <div>
                  <span className="text-base font-bold text-[#121316] block">
                    {activeTestimonial.author}
                  </span>
                  <span className="text-xs text-[#7C7D82] block mt-0.5">
                    {activeTestimonial.role} • {activeTestimonial.company}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-bold text-[#1E5FD8] uppercase tracking-wider bg-[#EDF4FF] border border-[#1E5FD8]/25 px-3 py-1 self-start sm:self-auto rounded-none">
                  {activeTestimonial.serviceUsed}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
