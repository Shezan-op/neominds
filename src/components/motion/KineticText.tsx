"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface KineticTextProps {
  text: string;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
  opacity?: number;
}

export function KineticText({
  text,
  direction = "left",
  speed = 1,
  className = "",
  triggerRef,
  opacity = 0.08,
}: KineticTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const container = containerRef.current;
    const trigger = triggerRef?.current || container;
    if (!track || !trigger || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(track, { xPercent: 0 });
      return;
    }

    const distance = 18 * speed;
    const startX = direction === "left" ? 5 : -distance;
    const endX = direction === "left" ? -distance : 5;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: startX },
        {
          xPercent: endX,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [direction, speed, triggerRef]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden pointer-events-none select-none w-full ${className}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="whitespace-nowrap font-serif font-black tracking-tighter uppercase will-change-transform leading-none"
        style={{ opacity }}
      >
        {text}&nbsp;&nbsp;•&nbsp;&nbsp;{text}&nbsp;&nbsp;•&nbsp;&nbsp;{text}
      </div>
    </div>
  );
}
