"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextMaskProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  className?: string;
  triggerHook?: string;
  scrub?: boolean | number;
}

export function TextMask({
  children,
  direction = "up",
  duration = 0.9,
  delay = 0,
  className = "",
  triggerHook = "top 88%",
  scrub = false,
}: TextMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(inner, { y: 0, x: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      let initialVars: gsap.TweenVars = {};
      let targetVars: gsap.TweenVars = {};

      if (direction === "up") {
        initialVars = { yPercent: 110, opacity: 0.2 };
        targetVars = { yPercent: 0, opacity: 1 };
      } else if (direction === "down") {
        initialVars = { yPercent: -110, opacity: 0.2 };
        targetVars = { yPercent: 0, opacity: 1 };
      } else if (direction === "left") {
        initialVars = { xPercent: 110, opacity: 0.2 };
        targetVars = { xPercent: 0, opacity: 1 };
      } else {
        initialVars = { xPercent: -110, opacity: 0.2 };
        targetVars = { xPercent: 0, opacity: 1 };
      }

      gsap.set(inner, { ...initialVars, willChange: "transform, opacity" });

      if (scrub) {
        gsap.to(inner, {
          ...targetVars,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: triggerHook,
            end: "bottom 60%",
            scrub: scrub === true ? 1 : scrub,
          },
        });
      } else {
        gsap.to(inner, {
          ...targetVars,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: triggerHook,
            once: true,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [direction, duration, delay, triggerHook, scrub]);

  return (
    <div ref={containerRef} className={`overflow-hidden inline-block ${className}`}>
      <div ref={innerRef} className="inline-block">
        {children}
      </div>
    </div>
  );
}
