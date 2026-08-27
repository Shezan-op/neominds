"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface OpeningSequenceProps {
  onComplete?: () => void;
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buildingsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fogLayer1Ref = useRef<HTMLDivElement>(null);
  const fogLayer2Ref = useRef<HTMLDivElement>(null);
  const fogLayer3Ref = useRef<HTMLDivElement>(null);
  const atmosphericFlashRef = useRef<HTMLDivElement>(null);

  // Virtual progress tracking for smooth scroll-driven camera
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    if (isCompleted) return;

    // 1. Completely lock background homepage at y = 0
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Stop Lenis while opening sequence plays
    const pauseLenis = () => {
      if (window.__lenis) {
        window.__lenis.stop();
        window.__lenis.scrollTo(0, { immediate: true });
      }
    };
    pauseLenis();
    const lenisCheckInterval = setInterval(pauseLenis, 50);

    const buildings = buildingsRef.current;
    const text = textRef.current;
    const fog1 = fogLayer1Ref.current;
    const fog2 = fogLayer2Ref.current;
    const fog3 = fogLayer3Ref.current;
    const overlay = atmosphericFlashRef.current;

    // Initial visual state
    if (buildings) {
      gsap.set(buildings, { scale: 1, yPercent: 0, transformOrigin: "50% 46%", force3D: true });
    }
    if (text) {
      gsap.set(text, { scale: 1, opacity: 1, yPercent: 0, filter: "blur(0px)", transformOrigin: "50% 50%", force3D: true });
    }
    if (fog1) gsap.set(fog1, { opacity: 0, scale: 0.8, yPercent: 20 });
    if (fog2) gsap.set(fog2, { opacity: 0, scale: 0.9, yPercent: -15 });
    if (fog3) gsap.set(fog3, { opacity: 0, scale: 0.7 });
    if (overlay) gsap.set(overlay, { opacity: 0 });

    const updateScene = (p: number) => {
      // 0.0 -> 0.72: Camera zoom upward into canyon
      const zoomProgress = Math.min(p / 0.75, 1);
      const easeZoom = gsap.parseEase("power1.inOut")(zoomProgress);

      if (buildings) {
        gsap.set(buildings, {
          scale: 1 + easeZoom * 1.75, // 1.0 -> 2.75
          yPercent: -easeZoom * 6,
        });
      }

      if (text) {
        gsap.set(text, {
          scale: 1 + easeZoom * 2.6, // 1.0 -> 3.6
          yPercent: -easeZoom * 8,
        });

        // Text passes behind camera (p = 0.40 -> 0.65)
        if (p < 0.40) {
          gsap.set(text, { opacity: 1, filter: "blur(0px)" });
        } else if (p < 0.65) {
          const fadeP = (p - 0.40) / 0.25;
          gsap.set(text, {
            opacity: 1 - fadeP,
            filter: `blur(${fadeP * 8}px)`,
          });
        } else {
          gsap.set(text, { opacity: 0 });
        }
      }

      // 0.55 -> 0.82: Atmospheric fog ingress
      if (fog1) {
        const fog1P = Math.max(0, Math.min((p - 0.50) / 0.25, 1));
        gsap.set(fog1, {
          opacity: fog1P * 0.75,
          scale: 0.8 + fog1P * 0.6,
          yPercent: 20 - fog1P * 30,
        });
      }

      if (fog2) {
        const fog2P = Math.max(0, Math.min((p - 0.55) / 0.25, 1));
        gsap.set(fog2, {
          opacity: fog2P * 0.85,
          scale: 0.9 + fog2P * 0.6,
          yPercent: -15 + fog2P * 25,
        });
      }

      if (fog3) {
        const fog3P = Math.max(0, Math.min((p - 0.65) / 0.22, 1));
        gsap.set(fog3, {
          opacity: fog3P * 0.95,
          scale: 0.7 + fog3P * 0.9,
        });
      }

      // 0.80 -> 1.0: Seamless dissolve revealing top of Hero Section
      if (overlay && containerRef.current) {
        if (p < 0.80) {
          gsap.set(containerRef.current, { opacity: 1 });
          gsap.set(overlay, { opacity: 0 });
        } else {
          const dissolveP = (p - 0.80) / 0.20;
          const easeDissolve = gsap.parseEase("power2.inOut")(dissolveP);
          gsap.set(overlay, { opacity: easeDissolve });
          gsap.set(containerRef.current, { opacity: 1 - easeDissolve });
        }
      }
    };

    // RAF smooth interpolation loop
    let animId: number;
    const renderLoop = () => {
      const diff = targetProgressRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0005) {
        progressRef.current += diff * 0.07; // Smooth deliberate momentum
        updateScene(progressRef.current);
      }

      // Check if reached completion threshold
      if (progressRef.current >= 0.99 && !isCompleted) {
        clearInterval(lenisCheckInterval);
        setIsCompleted(true);

        // Unlock page and restart Lenis at exact y = 0
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.scrollTo(0, 0);

        if (window.__lenis) {
          window.__lenis.start();
          window.__lenis.scrollTo(0, { immediate: true });
        }

        ScrollTrigger.refresh();

        if (onComplete) onComplete();
        return;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Wheel event handler: controls opening progress only, homepage stays at y=0
    const handleWheel = (e: WheelEvent) => {
      if (isCompleted) return;
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      const step = (delta / 1600) * 0.75;

      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + step)
      );
    };

    // Touch event handler for mobile/trackpad gestures
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isCompleted) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      e.preventDefault();
      e.stopPropagation();
      const step = (deltaY / 1000) * 0.75;
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + step)
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });

    return () => {
      clearInterval(lenisCheckInterval);
      cancelAnimationFrame(animId);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isCompleted, onComplete]);

  if (isCompleted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen z-50 overflow-hidden pointer-events-auto select-none bg-[#0F52BA]"
      style={{ willChange: "opacity" }}
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
        LAYER 4: PROGRAMMATIC ATMOSPHERIC CLOUD / FOG LAYERS
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

      {/* Atmospheric Dissolve Overlay */}
      <div
        ref={atmosphericFlashRef}
        className="absolute inset-0 w-full h-full bg-[#050E24] pointer-events-none z-40 opacity-0"
        style={{ willChange: "opacity" }}
      />
    </div>
  );
}
