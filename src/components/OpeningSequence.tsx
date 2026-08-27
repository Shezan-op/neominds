"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface OpeningSequenceProps {
  onComplete?: () => void;
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [isActive, setIsActive] = useState(true);
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
  const isTransitioningRef = useRef(false);

  // Render / update scene elements based on progress (0.0 to 1.0)
  const updateScene = (p: number) => {
    const buildings = buildingsRef.current;
    const text = textRef.current;
    const fog1 = fogLayer1Ref.current;
    const fog2 = fogLayer2Ref.current;
    const fog3 = fogLayer3Ref.current;
    const overlay = atmosphericFlashRef.current;
    const container = containerRef.current;

    // 0.0 -> 0.70: Camera zoom upward into canyon
    const zoomProgress = Math.min(p / 0.72, 1);
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

      // Text passes behind camera (p = 0.35 -> 0.60)
      if (p < 0.35) {
        gsap.set(text, { opacity: 1, filter: "blur(0px)" });
      } else if (p < 0.60) {
        const fadeP = (p - 0.35) / 0.25;
        gsap.set(text, {
          opacity: 1 - fadeP,
          filter: `blur(${fadeP * 8}px)`,
        });
      } else {
        gsap.set(text, { opacity: 0 });
      }
    }

    // 0.50 -> 0.75: Atmospheric fog ingress
    if (fog1) {
      const fog1P = Math.max(0, Math.min((p - 0.45) / 0.25, 1));
      gsap.set(fog1, {
        opacity: fog1P * 0.75,
        scale: 0.8 + fog1P * 0.6,
        yPercent: 20 - fog1P * 30,
      });
    }

    if (fog2) {
      const fog2P = Math.max(0, Math.min((p - 0.50) / 0.25, 1));
      gsap.set(fog2, {
        opacity: fog2P * 0.85,
        scale: 0.9 + fog2P * 0.6,
        yPercent: -15 + fog2P * 25,
      });
    }

    if (fog3) {
      const fog3P = Math.max(0, Math.min((p - 0.58) / 0.22, 1));
      gsap.set(fog3, {
        opacity: fog3P * 0.95,
        scale: 0.7 + fog3P * 0.9,
      });
    }

    // 0.75 -> 1.0: Seamless dissolve revealing top of Hero Section
    if (overlay && container) {
      if (p < 0.75) {
        gsap.set(container, { opacity: 1, pointerEvents: "auto" });
        gsap.set(overlay, { opacity: 0 });
      } else {
        const dissolveP = (p - 0.75) / 0.25;
        const easeDissolve = gsap.parseEase("power2.inOut")(dissolveP);
        gsap.set(overlay, { opacity: easeDissolve });
        gsap.set(container, { opacity: Math.max(0, 1 - easeDissolve) });
      }
    }
  };

  useEffect(() => {
    let animId: number;

    // RAF loop for smooth interpolation
    const renderLoop = () => {
      const diff = targetProgressRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0005) {
        progressRef.current += diff * 0.1; // Fast, responsive interpolation
        updateScene(progressRef.current);
      }

      // Check if opening sequence has fully dissolved into homepage
      if (progressRef.current >= 0.95 && isActive && !isTransitioningRef.current) {
        isTransitioningRef.current = true;
        setIsActive(false);

        if (containerRef.current) {
          gsap.set(containerRef.current, { opacity: 0, pointerEvents: "none" });
        }

        // Instant unlock: enable body and start Lenis immediately
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        if (window.__lenis) {
          window.__lenis.start();
        }

        ScrollTrigger.refresh();
        if (onComplete) onComplete();
        isTransitioningRef.current = false;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Initial lock while active
    if (isActive) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      if (window.__lenis) {
        window.__lenis.stop();
      }

      // Wheel handler while active
      const handleWheelActive = (e: WheelEvent) => {
        // If we are at the end, let the wheel event pass through to scroll homepage!
        if (targetProgressRef.current >= 0.95 && e.deltaY > 0) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        const delta = e.deltaY;
        const step = (delta / 800) * 1.0; // Responsive, punchy scroll pacing
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + step)
        );
      };

      // Touch handler while active
      let touchStartY = 0;
      const handleTouchStartActive = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchMoveActive = (e: TouchEvent) => {
        if (targetProgressRef.current >= 0.95 && touchStartY - e.touches[0].clientY > 0) {
          return;
        }

        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        touchStartY = currentY;

        e.preventDefault();
        e.stopPropagation();
        const step = (deltaY / 600) * 1.0;
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + step)
        );
      };

      window.addEventListener("wheel", handleWheelActive, { passive: false, capture: true });
      window.addEventListener("touchstart", handleTouchStartActive, { passive: true });
      window.addEventListener("touchmove", handleTouchMoveActive, { passive: false, capture: true });

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("wheel", handleWheelActive, { capture: true });
        window.removeEventListener("touchstart", handleTouchStartActive);
        window.removeEventListener("touchmove", handleTouchMoveActive, { capture: true });
      };
    } else {
      // WHEN INACTIVE (Browsing homepage normally):
      // Only reactivate if user scrolls UP past the very top (scrollY <= 0)
      const handleWindowWheel = (e: WheelEvent) => {
        const currentScroll = window.scrollY || window.pageYOffset;
        if (currentScroll <= 0 && e.deltaY < -30) {
          e.preventDefault();

          setIsActive(true);
          document.body.style.overflow = "hidden";
          document.documentElement.style.overflow = "hidden";

          if (window.__lenis) {
            window.__lenis.stop();
          }

          progressRef.current = 0.92;
          targetProgressRef.current = Math.max(
            0,
            0.92 + (e.deltaY / 800) * 1.0
          );

          if (containerRef.current) {
            gsap.set(containerRef.current, { pointerEvents: "auto" });
          }
        }
      };

      let touchStartY = 0;
      const handleWindowTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleWindowTouchMove = (e: TouchEvent) => {
        const currentScroll = window.scrollY || window.pageYOffset;
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY; // negative when pulling down (scrolling up)
        touchStartY = currentY;

        if (currentScroll <= 0 && deltaY < -30) {
          e.preventDefault();

          setIsActive(true);
          document.body.style.overflow = "hidden";
          document.documentElement.style.overflow = "hidden";

          if (window.__lenis) {
            window.__lenis.stop();
          }

          progressRef.current = 0.92;
          targetProgressRef.current = Math.max(0, 0.92 + (deltaY / 600) * 1.0);

          if (containerRef.current) {
            gsap.set(containerRef.current, { pointerEvents: "auto" });
          }
        }
      };

      window.addEventListener("wheel", handleWindowWheel, { passive: false });
      window.addEventListener("touchstart", handleWindowTouchStart, { passive: true });
      window.addEventListener("touchmove", handleWindowTouchMove, { passive: false });

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("wheel", handleWindowWheel);
        window.removeEventListener("touchstart", handleWindowTouchStart);
        window.removeEventListener("touchmove", handleWindowTouchMove);
      };
    }
  }, [isActive, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-screen z-50 overflow-hidden select-none bg-[#0F52BA] transition-opacity duration-200 ${
        isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
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
