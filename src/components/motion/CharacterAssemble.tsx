"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CharacterAssembleProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "span";
  className?: string;
  spreadDistance?: number;
  triggerHook?: string;
  scrub?: boolean | number;
}

export function CharacterAssemble({
  text,
  as: Component = "h2",
  className = "",
  spreadDistance = 45,
  triggerHook = "top 85%",
  scrub = 0.8,
}: CharacterAssembleProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const chars = text.split("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const charEls = el.querySelectorAll(".assemble-char");

    if (reduceMotion) {
      gsap.set(charEls, { x: 0, opacity: 1, filter: "blur(0px)" });
      return;
    }

    const mid = (chars.length - 1) / 2;

    const ctx = gsap.context(() => {
      charEls.forEach((charEl, idx) => {
        const offsetDirection = idx < mid ? -1 : 1;
        const distFromMid = Math.abs(idx - mid);
        const startX = offsetDirection * distFromMid * (spreadDistance / chars.length) * 2.5;

        gsap.fromTo(
          charEl,
          {
            x: startX,
            opacity: 0.15,
            filter: "blur(8px)",
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: triggerHook,
              end: "bottom 45%",
              scrub: scrub === true ? 1 : scrub,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [text, spreadDistance, triggerHook, scrub, chars.length]);

  const Tag = Component as React.ElementType;

  return (
    <Tag ref={containerRef} className={`inline-block font-serif select-none will-change-transform ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="assemble-char inline-block will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
