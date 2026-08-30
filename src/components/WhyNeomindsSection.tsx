"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Shield, Zap, MessageSquare } from "lucide-react";
import { WHY_NEOMINDS_POINTS } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTransition } from "./motion/SectionTransition";
import { DrawLine } from "./motion/DrawLine";

const DIALOGUE_FOCUS_WORDS = [
  "instead of slow agencies.",
  "with zero middlemen.",
  "with 100% code ownership.",
  "that runs smoothly for years.",
  "with clear, honest pricing.",
];

export function WhyNeomindsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeDialogueIdx, setActiveDialogueIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftHeadingRef = useRef<HTMLDivElement>(null);
  const dialogueWordRef = useRef<HTMLSpanElement>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
    setActiveDialogueIdx(idx);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const reasonCards = section.querySelectorAll(".why-reason-item");
    const triggers: ScrollTrigger[] = [];

    reasonCards.forEach((card, i) => {
      const t = ScrollTrigger.create({
        trigger: card,
        start: "top 65%",
        end: "bottom 65%",
        onEnter: () => {
          setActiveDialogueIdx(i);
          setOpenIndex(i);
        },
        onEnterBack: () => {
          setActiveDialogueIdx(i);
          setOpenIndex(i);
        },
      });
      triggers.push(t);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const el = dialogueWordRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeDialogueIdx]);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="py-16 sm:py-28 bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTransition
          number="05"
          label="Why Choose Neominds"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div ref={leftHeadingRef} className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight font-bold">
                Why companies build with us{" "}
                <span
                  ref={dialogueWordRef}
                  className="text-[#1E5FD8] block mt-1"
                >
                  {DIALOGUE_FOCUS_WORDS[activeDialogueIdx] || DIALOGUE_FOCUS_WORDS[0]}
                </span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#4A4B50] font-sans leading-relaxed">
                We remove the headaches of traditional software development. You talk directly with the developers writing your code, see working updates every two weeks, and own everything we build.
              </p>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-[#E6E6E8] space-y-3.5 font-sans">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C7D82] block mb-2">
                What We Guarantee:
              </span>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#121316]">
                <Zap className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span>Working software updates every 14 days</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#121316]">
                <Shield className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span>100% intellectual property & code ownership</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#121316]">
                <MessageSquare className="w-4 h-4 text-[#1E5FD8] flex-shrink-0" />
                <span>Direct Slack and email chat with your engineers</span>
              </div>
            </div>
          </div>

          {/* Right Column: ZERO CARDS - Pure Open Typography Rows */}
          <div className="lg:col-span-7">
            <DrawLine orientation="horizontal" color="#E6E6E8" />

            <div className="divide-y divide-[#E6E6E8]">
              {WHY_NEOMINDS_POINTS.map((point, idx) => {
                const isOpen = openIndex === idx;
                const isActive = activeDialogueIdx === idx;

                return (
                  <div
                    key={point.number}
                    className="why-reason-item transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="w-full flex items-center justify-between py-6 sm:py-8 px-2 sm:px-4 text-left cursor-pointer focus:outline-none min-h-[48px]"
                      aria-expanded={isOpen}
                      data-cursor
                      data-cursor-text={isOpen ? "CLOSE" : "REASON"}
                    >
                      <div className="flex items-center gap-4 sm:gap-6 pr-4">
                        <span
                          className={`text-xs font-bold transition-colors font-sans ${
                            isActive || isOpen ? "text-[#1E5FD8]" : "text-[#7C7D82]"
                          }`}
                        >
                          {point.number}
                        </span>
                        <h3
                          className={`text-xl sm:text-2xl font-serif font-bold transition-colors ${
                            isActive || isOpen ? "text-[#1E5FD8]" : "text-[#121316]"
                          }`}
                        >
                          {point.title}
                        </h3>
                      </div>

                      <div
                        className={`w-8 h-8 flex items-center justify-center border transition-colors flex-shrink-0 ${
                          isOpen
                            ? "bg-[#1E5FD8] border-[#1E5FD8] text-white"
                            : "border-[#E6E6E8] text-[#7C7D82]"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-2 sm:px-4 pb-6 sm:pb-8 pt-0 text-base text-[#4A4B50] font-sans leading-relaxed">
                            {point.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <DrawLine orientation="horizontal" color="#E6E6E8" />
          </div>
        </div>
      </div>
    </section>
  );
}
