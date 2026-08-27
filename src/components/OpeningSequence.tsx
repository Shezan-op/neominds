"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function OpeningSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fogLayer1Ref = useRef<HTMLDivElement>(null);
  const fogLayer2Ref = useRef<HTMLDivElement>(null);
  const fogLayer3Ref = useRef<HTMLDivElement>(null);
  const atmosphericFlashRef = useRef<HTMLDivElement>(null);

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
      const atmosphericOverlay = atmosphericFlashRef.current;

      if (!container || !pin || !buildings || !text) return;

      // Master Scroll-Driven Cinematic Camera Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3200", // Deliberate, smooth scroll distance
          pin: pin,
          scrub: 1.2, // Balanced, cinematic momentum
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial States
      gsap.set(buildings, {
        scale: 1,
        yPercent: 0,
        transformOrigin: "50% 46%",
        force3D: true,
      });

      gsap.set(text, {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      if (fog1) gsap.set(fog1, { opacity: 0, scale: 0.8, yPercent: 20 });
      if (fog2) gsap.set(fog2, { opacity: 0, scale: 0.9, yPercent: -15 });
      if (fog3) gsap.set(fog3, { opacity: 0, scale: 0.7 });
      if (atmosphericOverlay) gsap.set(atmosphericOverlay, { opacity: 0 });

      // PHASE 1: 0% -> 60% (Cinematic Camera Travelling Upward into Sky Canyon)
      tl.to(
        buildings,
        {
          scale: 2.75, // Deep upward magnification into canyon
          yPercent: -6, // Camera tilting/moving upward
          ease: "power1.inOut",
          duration: 6,
        },
        0
      )
        .to(
          text,
          {
            scale: 3.6, // Text scales naturally with 3D scene
            yPercent: -8,
            ease: "power1.inOut",
            duration: 6,
          },
          0
        )
        .to(
          text,
          {
            opacity: 0,
            filter: "blur(8px)",
            ease: "power2.in",
            duration: 2.2,
          },
          3.8 // Text smoothly passes behind the camera
        );

      // PHASE 2: 60% -> 78% (Atmospheric Fog Ingress)
      if (fog1) {
        tl.to(
          fog1,
          {
            opacity: 0.75,
            scale: 1.4,
            yPercent: -10,
            ease: "power1.out",
            duration: 2.2,
          },
          5.6
        );
      }

      if (fog2) {
        tl.to(
          fog2,
          {
            opacity: 0.85,
            scale: 1.5,
            yPercent: 10,
            ease: "power1.out",
            duration: 2.2,
          },
          6.0
        );
      }

      if (fog3) {
        tl.to(
          fog3,
          {
            opacity: 0.95,
            scale: 1.6,
            ease: "power2.inOut",
            duration: 1.8,
          },
          6.8
        );
      }

      // PHASE 3: 78% -> 92% (Seamless Cloud Dissolve Revealing Full Hero Section)
      if (atmosphericOverlay) {
        tl.to(
          atmosphericOverlay,
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: 1.6,
          },
          7.2
        );
      }

      tl.to(
        pin,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.8,
        },
        7.6
      );

      // PHASE 4: 92% -> 100% (Clear Buffer Zone where Hero Section is 100% visible & stationary)
      tl.to(
        {},
        {
          duration: 1.5, // Generous stationary buffer allowing the user to read the top hero headline
        },
        8.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full z-40 bg-[#1255C8]"
      style={{ height: "420vh" }}
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
              alt="Architectural Skyscraper Canyon"
              fill
              priority
              unoptimized
              className="object-cover object-center w-full h-full pointer-events-none"
            />
          </div>
        </div>

        {/* 
          ======================================================================
          LAYER 3: NEOMINDS TEXT (PURE WHITE)
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

        {/* 
          ======================================================================
          LAYER 4: PROGRAMMATIC ATMOSPHERIC CLOUD / FOG LAYERS (85% TRANSITION)
          ======================================================================
        */}
        {/* Fog Mist Volume 1 */}
        <div
          ref={fogLayer1Ref}
          className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] pointer-events-none z-30 opacity-0"
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
          className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] pointer-events-none z-30 opacity-0"
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
          className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(250, 249, 246, 0.98) 0%, rgba(235, 244, 255, 0.85) 50%, rgba(199, 223, 254, 0.4) 80%, transparent 100%)",
            backdropFilter: "blur(24px)",
            filter: "blur(30px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Atmospheric Fade for Seamless Hand-off to Hero */}
        <div
          ref={atmosphericFlashRef}
          className="absolute inset-0 w-full h-full bg-[#050E24] pointer-events-none z-40 opacity-0"
          style={{ willChange: "opacity" }}
        />
      </div>
    </div>
  );
}
