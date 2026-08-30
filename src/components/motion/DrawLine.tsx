"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DrawLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  duration?: number;
  delay?: number;
  triggerHook?: string;
  scrub?: boolean | number;
}

export function DrawLine({
  orientation = "horizontal",
  className = "",
  color = "#E6E6E8",
  duration = 0.9,
  delay = 0,
  triggerHook = "top 92%",
  scrub = false,
}: DrawLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = lineRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(el, { scaleX: 1, scaleY: 1 });
      return;
    }

    const isH = orientation === "horizontal";

    const ctx = gsap.context(() => {
      gsap.set(el, {
        scaleX: isH ? 0 : 1,
        scaleY: isH ? 1 : 0,
        transformOrigin: isH ? "left center" : "top center",
        willChange: "transform",
      });

      if (scrub) {
        gsap.to(el, {
          scaleX: 1,
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            end: "bottom 70%",
            scrub: scrub === true ? 1 : scrub,
          },
        });
      } else {
        gsap.to(el, {
          scaleX: 1,
          scaleY: 1,
          duration,
          delay,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [orientation, duration, delay, triggerHook, scrub]);

  return (
    <div
      ref={lineRef}
      className={`pointer-events-none ${
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full"
      } ${className}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}
