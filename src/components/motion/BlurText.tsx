"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BlurTextProps {
  text: string;
  mode?: "word" | "line" | "char";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  scrub?: boolean | number;
  triggerHook?: string;
  once?: boolean;
}

export function BlurText({
  text,
  mode = "word",
  as: Component = "span",
  className = "",
  delay = 0,
  stagger,
  duration = 0.8,
  scrub = false,
  triggerHook = "top 88%",
  once = true,
}: BlurTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  // Split text into tokens based on mode
  const getTokens = () => {
    if (mode === "char") {
      return text.split("");
    }
    if (mode === "line") {
      return text.split("\n");
    }
    // Default: word split preserving spaces
    return text.split(" ");
  };

  const tokens = getTokens();
  const defaultStagger =
    stagger !== undefined
      ? stagger
      : mode === "char"
      ? 0.02
      : mode === "line"
      ? 0.12
      : 0.045;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(el.querySelectorAll(".blur-token"), {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      });
      return;
    }

    const tokenEls = el.querySelectorAll(".blur-token");

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(tokenEls, {
        opacity: 0,
        filter: "blur(12px)",
        y: 18,
        willChange: "transform, opacity, filter",
      });

      if (scrub) {
        gsap.to(tokenEls, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: defaultStagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            end: "bottom 60%",
            scrub: scrub === true ? 1 : scrub,
          },
        });
      } else {
        gsap.to(tokenEls, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration,
          delay,
          stagger: defaultStagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: triggerHook,
            once,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [mode, delay, defaultStagger, duration, scrub, triggerHook, once]);

  const Tag = Component as React.ElementType;

  return (
    <Tag ref={containerRef} className={`inline-block ${className}`}>
      {tokens.map((token, i) => (
        <span
          key={i}
          className="blur-token inline-block"
          style={{ whiteSpace: mode === "char" ? "pre" : "normal" }}
        >
          {token}
          {mode === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
