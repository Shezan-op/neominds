"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StretchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  maxTracking?: string;
  maxScaleX?: number;
  triggerHook?: string;
}

export function StretchText({
  text,
  as: Component = "div",
  className = "",
  maxTracking = "0.15em",
  maxScaleX = 1.06,
  triggerHook = "top 90%",
}: StretchTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = textRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: triggerHook,
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Sequence: Normal -> Expand -> Settle
      tl.fromTo(
        el,
        { letterSpacing: "-0.04em", scaleX: 0.96, transformOrigin: "center center" },
        { letterSpacing: maxTracking, scaleX: maxScaleX, ease: "power1.inOut" }
      ).to(el, {
        letterSpacing: "0.01em",
        scaleX: 1.0,
        ease: "power1.out",
      });
    }, el);

    return () => ctx.revert();
  }, [maxTracking, maxScaleX, triggerHook]);

  const Tag = Component as React.ElementType;

  return (
    <Tag
      ref={textRef}
      className={`inline-block will-change-transform font-serif ${className}`}
    >
      {text}
    </Tag>
  );
}
