"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawLine } from "./DrawLine";

interface SectionTransitionProps {
  number: string;
  label: string;
  statusText?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function SectionTransition({
  number,
  label,
  theme = "light",
  className = "",
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const isDark = theme === "dark";
  const numColor = isDark ? "#60A5FA" : "#1E5FD8";
  const textColor = isDark ? "#FFFFFF" : "#121316";
  const lineColor = isDark ? "rgba(255, 255, 255, 0.12)" : "#E6E6E8";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const num = numberRef.current;
    const lab = labelRef.current;
    if (!container || !num || !lab) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        num,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 92%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        lab,
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`w-full py-3 mb-6 select-none ${className}`}>
      <div className="flex items-center justify-between pb-2.5">
        <div className="flex items-center gap-2.5">
          <span
            ref={numberRef}
            className="text-xs font-bold tracking-wider"
            style={{ color: numColor }}
          >
            {number}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
            {label}
          </span>
        </div>
      </div>
      <DrawLine color={lineColor} />
    </div>
  );
}
