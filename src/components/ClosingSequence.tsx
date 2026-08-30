"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ClosingSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const buildings = buildingsRef.current;
    const text = textRef.current;

    if (!container || !buildings || !text) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Fluid scroll scrub without locking or pinning the viewport
      gsap.fromTo(
        buildings,
        { scale: 1.4, yPercent: -4 },
        {
          scale: 1,
          yPercent: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        text,
        { opacity: 0, scale: 1.8, filter: "blur(12px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] sm:h-[85vh] min-h-[500px] z-40 bg-[#0F52BA] overflow-hidden select-none"
    >
      {/* 
        ======================================================================
        LAYER 1: SOLID BRAND BLUE BACKGROUND
        ======================================================================
      */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 48%, #1E6BE6 0%, #1657C6 45%, #0F49AF 80%, #0A3B94 100%)",
        }}
      />

      {/* 
        ======================================================================
        LAYER 2: BUILDINGS (opening.png)
        ======================================================================
      */}
      <div
        ref={buildingsRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div className="relative w-full h-full max-w-[100vw] max-h-[100vh]">
          <Image
            src="/opening.png"
            alt="Architectural Skyscraper Canyon Closing"
            fill
            priority
            unoptimized
            className="object-cover object-center w-full h-full pointer-events-none"
          />
        </div>
      </div>

      {/* 
        ======================================================================
        LAYER 3: NEOMINDS TEXT
        ======================================================================
      */}
      <div
        ref={textRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <span
          className="font-serif font-bold tracking-tight text-center select-none"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(3.5rem, 8.5vw, 9.5rem)",
            textShadow: "0 4px 30px rgba(10, 30, 80, 0.4)",
            letterSpacing: "-0.03em",
          }}
        >
          Neominds
        </span>
      </div>
    </div>
  );
}
