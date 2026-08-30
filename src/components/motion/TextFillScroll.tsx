"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextFillScrollProps {
  text: string;
  className?: string;
  fillColor?: string;
  baseColor?: string;
}

export function TextFillScroll({
  text,
  className = "",
  fillColor = "#121316",
  baseColor = "#C4C5CA",
}: TextFillScrollProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const words = el.querySelectorAll(".text-fill-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: baseColor, opacity: 0.35 },
        {
          color: fillColor,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, fillColor, baseColor]);

  const words = text.split(" ");

  return (
    <h2
      ref={containerRef}
      className={`font-serif leading-tight select-none ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="text-fill-word inline-block mr-[0.28em] will-change-transform"
          style={{ color: baseColor, opacity: 0.35 }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}
