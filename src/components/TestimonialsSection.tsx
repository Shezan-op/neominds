"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { DrawLine } from "./motion/DrawLine";

export function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevQuote = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextQuote = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIdx];

  const splitQuoteIntoLines = (text: string) => {
    const sentences = text.split(/(?<=[.?!])\s+/);
    if (sentences.length >= 2) {
      return sentences;
    }
    const words = text.split(" ");
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  };

  const lines = splitQuoteIntoLines(activeTestimonial.quote);

  return (
    <section className="py-16 sm:py-28 bg-[#FAF9F6] border-b border-[#E6E6E8] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#121316] leading-tight">
              What our clients say about us.
            </h2>
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevQuote}
              className="w-11 h-11 min-h-[44px] min-w-[44px] bg-transparent border border-[#E6E6E8] text-[#121316] hover:bg-[#1E5FD8] hover:border-[#1E5FD8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs rounded-none"
              aria-label="Previous testimonial"
              data-cursor
              data-cursor-text="PREV"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextQuote}
              className="w-11 h-11 min-h-[44px] min-w-[44px] bg-transparent border border-[#E6E6E8] text-[#121316] hover:bg-[#1E5FD8] hover:border-[#1E5FD8] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs rounded-none"
              aria-label="Next testimonial"
              data-cursor
              data-cursor-text="NEXT"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ZERO CARDS: Full Open Typography Editorial Quote Layout */}
        <div className="relative">
          <DrawLine orientation="horizontal" color="#E6E6E8" />

          <div className="py-10 sm:py-16 relative overflow-hidden">
            <Quote className="w-20 h-20 sm:w-32 sm:h-32 text-[#1E5FD8]/10 absolute top-4 right-4 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                className="space-y-8"
              >
                <div className="space-y-3 font-serif text-2xl sm:text-3xl lg:text-4xl text-[#121316] leading-relaxed max-w-4xl italic">
                  {lines.map((line, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.p
                        key={`${activeTestimonial.id}-line-${idx}`}
                        initial={{
                          opacity: 0,
                          y: isEven ? -20 : 20,
                          filter: "blur(4px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          y: isEven ? 20 : -20,
                          filter: "blur(4px)",
                        }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="block"
                      >
                        {idx === 0 ? `“${line}` : line}
                        {idx === lines.length - 1 ? "”" : ""}
                      </motion.p>
                    );
                  })}
                </div>

                {/* Author & Service Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E6E6E8] pt-6 gap-4 font-sans"
                >
                  <div>
                    <span className="text-base sm:text-lg font-bold text-[#121316] block font-serif">
                      {activeTestimonial.author}
                    </span>
                    <span className="text-xs sm:text-sm text-[#7C7D82] block mt-0.5">
                      {activeTestimonial.role} • {activeTestimonial.company}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-[#7C7D82] self-start sm:self-auto">
                    {activeTestimonial.serviceUsed}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <DrawLine orientation="horizontal" color="#E6E6E8" />
        </div>
      </div>
    </section>
  );
}
