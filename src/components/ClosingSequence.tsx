"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ClosingSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fogLayer1Ref = useRef<HTMLDivElement>(null);
  const fogLayer2Ref = useRef<HTMLDivElement>(null);
  const fogLayer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const pin = pinRef.current;
      const buildings = buildingsRef.current;
      const text = textRef.current;
      const fog1 = fogLayer1Ref.current;
      const fog2 = fogLayer2Ref.current;
      const fog3 = fogLayer3Ref.current;

      if (!container || !pin || !buildings || !text) return;

      // Master Scroll-Driven Closing Camera Timeline (Zoom Out from Deep Sky back to Full Canyon)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3800", // Smooth, deliberate scroll distance matching the opening
          pin: pin,
          scrub: 1.5, // Luxurious, cinematic momentum
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial State: Starting inside the deep sky canyon / cloud layer (Zoomed In)
      gsap.set(buildings, {
        scale: 2.75,
        yPercent: -6,
        transformOrigin: "50% 46%",
        force3D: true,
      });

      gsap.set(text, {
        scale: 3.6,
        opacity: 0,
        yPercent: -8,
        filter: "blur(8px)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      if (fog1) gsap.set(fog1, { opacity: 0.85, scale: 1.4, yPercent: -10 });
      if (fog2) gsap.set(fog2, { opacity: 0.9, scale: 1.5, yPercent: 10 });
      if (fog3) gsap.set(fog3, { opacity: 0.95, scale: 1.6 });

      // PHASE 1: 0% -> 30% (Cloud Fog Layer Disperses)
      if (fog3) {
        tl.to(
          fog3,
          {
            opacity: 0,
            scale: 1.2,
            ease: "power2.out",
            duration: 2.5,
          },
          0
        );
      }

      if (fog2) {
        tl.to(
          fog2,
          {
            opacity: 0,
            scale: 1.1,
            ease: "power2.out",
            duration: 3.0,
          },
          0.8
        );
      }

      if (fog1) {
        tl.to(
          fog1,
          {
            opacity: 0,
            scale: 1.0,
            ease: "power2.out",
            duration: 3.2,
          },
          1.2
        );
      }

      // PHASE 2: 20% -> 100% (Camera Descends / Zooms OUT back to ground vantage)
      tl.to(
        buildings,
        {
          scale: 1, // Full canyon restored
          yPercent: 0,
          ease: "power2.inOut",
          duration: 7,
        },
        1.5
      )
        .to(
          text,
          {
            scale: 1, // Text returns to natural size
            yPercent: 0,
            ease: "power2.inOut",
            duration: 7,
          },
          1.5
        )
        .to(
          text,
          {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 3.5,
          },
          3.0 // Text emerges crisply in the central sky gap
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full z-40 bg-[#1255C8]"
      style={{ height: "460vh" }}
    >
      {/* Pinned 100vh Scene Viewport */}
      <div
        ref={pinRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none select-none"
        style={{ willChange: "transform, opacity" }}
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
          LAYER 3: NEOMINDS TEXT (EXPLICIT PURE WHITE COLOR)
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
              color: "#FFFFFF", // Pure Crisp White
              fontSize: "clamp(3.5rem, 8.5vw, 9.5rem)",
              textShadow: "0 4px 30px rgba(10, 30, 80, 0.4)",
              letterSpacing: "-0.03em",
            }}
          >
            Neominds
          </span>
        </div>

        {/* 
          ======================================================================
          LAYER 4: PROGRAMMATIC ATMOSPHERIC CLOUD / FOG LAYERS (DISSOLVING OUT)
          ======================================================================
        */}
        {/* Fog Mist Volume 1 */}
        <div
          ref={fogLayer1Ref}
          className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] pointer-events-none z-30 opacity-85"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(250, 249, 246, 0.9) 0%, rgba(220, 235, 255, 0.65) 40%, rgba(147, 197, 253, 0.3) 65%, transparent 85%)",
            filter: "blur(40px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Fog Mist Volume 2 */}
        <div
          ref={fogLayer2Ref}
          className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] pointer-events-none z-30 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(250, 249, 246, 0.95) 0%, rgba(199, 223, 254, 0.7) 45%, rgba(96, 165, 250, 0.35) 70%, transparent 90%)",
            filter: "blur(50px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Fog Mist Volume 3 */}
        <div
          ref={fogLayer3Ref}
          className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-95"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(250, 249, 246, 0.98) 0%, rgba(235, 244, 255, 0.85) 50%, rgba(199, 223, 254, 0.4) 80%, transparent 100%)",
            backdropFilter: "blur(24px)",
            filter: "blur(30px)",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
}
