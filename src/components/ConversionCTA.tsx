"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck, Clock, FileCode } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/analytics";

interface ConversionCTAProps {
  onOpenContact: () => void;
}

export function ConversionCTA({ onOpenContact }: ConversionCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineReadyRef = useRef<HTMLDivElement>(null);
  const lineEliminateRef = useRef<HTMLDivElement>(null);
  const lineOperationalRef = useRef<HTMLDivElement>(null);
  const lineBottlenecksRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const readyEl = lineReadyRef.current;
    const elimEl = lineEliminateRef.current;
    const operEl = lineOperationalRef.current;
    const bottleEl = lineBottlenecksRef.current;
    const descEl = descriptionRef.current;
    const btnEl = buttonAreaRef.current;
    if (!section || !readyEl || !elimEl || !operEl || !bottleEl || !descEl || !btnEl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(
        readyEl,
        { opacity: 0, filter: "blur(18px)", y: 15 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.55, ease: "power2.out" }
      )
        .fromTo(
          elimEl,
          { opacity: 0, letterSpacing: "0.22em", scaleX: 1.08 },
          { opacity: 1, letterSpacing: "0.02em", scaleX: 1, duration: 0.65, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          operEl,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" },
          "-=0.2"
        )
        .fromTo(
          bottleEl,
          { opacity: 0, clipPath: "inset(100% 0 0 0)", y: 20 },
          { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          descEl,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.15"
        )
        .fromTo(
          btnEl,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
          "-=0.1"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-36 bg-[#000000] text-[#FFFFFF] overflow-hidden border-t border-[#1E293B] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl py-6 sm:py-10">
          {/* Giant Typographic Headline */}
          <div className="space-y-1 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-tight leading-[1.05] uppercase">
            <div ref={lineReadyRef} className="will-change-transform">
              READY TO
            </div>

            <div
              ref={lineEliminateRef}
              className="text-[#60A5FA] will-change-transform block"
            >
              BUILD YOUR
            </div>

            <div
              ref={lineOperationalRef}
              className="text-white will-change-transform block"
            >
              NEXT BIG
            </div>

            <div
              ref={lineBottlenecksRef}
              className="text-[#60A5FA] will-change-transform block"
            >
              PROJECT?
            </div>
          </div>

          <p
            ref={descriptionRef}
            className="mt-8 text-base sm:text-lg text-[#D0D6E6] font-sans leading-relaxed max-w-2xl"
          >
            Let&apos;s talk for 15 minutes. Tell us what you want to build, and we will show you the cleanest, fastest way to get it done with zero fluff.
          </p>

          {/* Action Bar & Credibility Guarantees */}
          <div ref={buttonAreaRef} className="space-y-12">
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  trackEvent({ action: "click_cta_discuss", category: "cta", label: "CTA Discuss Button" });
                  onOpenContact();
                }}
                className="btn-primary text-xs uppercase tracking-wider font-bold px-9 py-4 shadow-xl cursor-pointer flex items-center gap-2.5 group active:scale-98 text-white min-h-[44px]"
                data-cursor
                data-cursor-text="TALK"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">14-day sprint updates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCode className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">100% code ownership</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                <span className="text-[#FFFFFF] font-medium">Zero vendor lock-in fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
