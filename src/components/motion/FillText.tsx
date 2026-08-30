"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FillTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  startColor?: string;
  fillColor?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  highlightWords?: string[];
  highlightColor?: string;
}

export function FillText({
  text,
  as: Component = "span",
  className = "",
  startColor = "rgba(18, 19, 22, 0.22)",
  fillColor = "#121316",
  start = "top 85%",
  end = "bottom 50%",
  scrub = 0.5,
  highlightWords = [],
  highlightColor = "#1E5FD8",
}: FillTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordSpans = el.querySelectorAll(".fill-word-fill");

    if (reduceMotion) {
      gsap.set(wordSpans, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial masked state
      gsap.set(wordSpans, {
        clipPath: "inset(0% 100% 0% 0%)",
        willChange: "clip-path",
      });

      gsap.to(wordSpans, {
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: scrub === true ? 1 : scrub,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text, start, end, scrub]);

  const Tag = Component as React.ElementType;

  return (
    <Tag ref={containerRef} className={`relative inline-block ${className}`}>
      {words.map((word, i) => {
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/gi, "")
        );
        const finalColor = isHighlighted ? highlightColor : fillColor;

        return (
          <span key={i} className="relative inline-block mr-[0.28em] last:mr-0">
            {/* Base / Muted outline state */}
            <span style={{ color: startColor }} className="select-none">
              {word}
            </span>

            {/* Active filled layer (progressively unmasked via clip-path) */}
            <span
              className="fill-word-fill absolute inset-0 pointer-events-none"
              style={{ color: finalColor }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
