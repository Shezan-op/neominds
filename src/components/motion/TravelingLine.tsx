"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TravelingLineProps {
  className?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
  color?: string;
}

export function TravelingLine({
  className = "",
  triggerRef,
  color = "#1E5FD8",
}: TravelingLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    const container = containerRef.current;
    const trigger = triggerRef?.current || container;
    if (!line || !trigger || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(line, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[1px] overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className="w-full h-full will-change-transform shadow-[0_0_8px_rgba(30,95,216,0.5)]"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
