"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WordMorphProps {
  prefix?: string;
  words?: string[];
  className?: string;
}

export function WordMorph({
  prefix = "WE BUILD SOFTWARE THAT",
  words = ["GROWS.", "ADAPTS.", "SCALES.", "DELIVERS."],
  className = "",
}: WordMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            Math.floor(progress * words.length),
            words.length - 1
          );
          setActiveWordIdx(idx);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [words.length]);

  const currentWord = words[activeWordIdx];

  return (
    <div
      ref={containerRef}
      className={`py-12 sm:py-16 text-center select-none ${className}`}
    >
      <div className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#121316]">
        <span>{prefix} </span>
        <span className="text-[#1E5FD8] underline decoration-[#1E5FD8]/40 underline-offset-8 transition-all duration-300 inline-block min-w-[160px] sm:min-w-[240px] text-left">
          {currentWord}
        </span>
      </div>
    </div>
  );
}
