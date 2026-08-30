"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TextCollision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftWordRef = useRef<HTMLDivElement>(null);
  const rightWordRef = useRef<HTMLDivElement>(null);
  const centerBridgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const leftWord = leftWordRef.current;
    const rightWord = rightWordRef.current;
    const bridge = centerBridgeRef.current;
    if (!container || !leftWord || !rightWord || !bridge) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set([leftWord, rightWord], { x: 0, opacity: 1 });
      gsap.set(bridge, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      // 1. Left phrase moves from left (-50%), Right phrase moves from right (+50%)
      tl.fromTo(
        leftWord,
        { xPercent: -50, opacity: 0.2, filter: "blur(8px)" },
        { xPercent: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" },
        0
      )
        .fromTo(
          rightWord,
          { xPercent: 50, opacity: 0.2, filter: "blur(8px)" },
          { xPercent: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" },
          0
        )
        // 2. Center connector "that" resolves into focus as they meet
        .fromTo(
          bridge,
          { scale: 0.6, opacity: 0, filter: "blur(12px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", ease: "power2.out" },
          0.3
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-16 sm:py-24 overflow-hidden select-none w-full flex flex-col items-center justify-center text-center"
      aria-hidden="true"
    >
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 font-serif font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[88px] tracking-tight leading-none uppercase text-[#121316]">
        <div ref={leftWordRef} className="will-change-transform">
          SYSTEMS
        </div>

        <span
          ref={centerBridgeRef}
          className="text-xs sm:text-sm md:text-base font-sans font-bold text-[#1E5FD8] tracking-wider px-2.5 sm:px-3 py-1 border border-[#1E5FD8]/30 bg-[#EDF4FF] will-change-transform lowercase"
        >
          that
        </span>

        <div ref={rightWordRef} className="text-[#1E5FD8] will-change-transform">
          SCALE
        </div>
      </div>
      <p className="mt-4 text-xs font-sans text-[#7C7D82] tracking-wide">
        Clean code built to grow with your business
      </p>
    </div>
  );
}
