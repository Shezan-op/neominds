"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis with exact Ballance physics
    const lenis = new Lenis({
      lerp: 0.1, // Exact Ballance linear interpolation rate
      smoothWheel: true,
      syncTouch: false, // Never hijack native touch momentum on mobile
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    // 2. Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Drive Lenis through GSAP ticker for 60fps locked coordination
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Anchor Link Hijacker
    const handleAnchorClick = (e: MouseEvent, targetHref: string) => {
      e.preventDefault();
      if (lenis && targetHref) {
        lenis.scrollTo(targetHref, { offset: -20, lerp: 0.1 });
      }
    };

    const anchorLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const listeners: { anchor: HTMLAnchorElement; listener: (e: MouseEvent) => void }[] = [];

    anchorLinks.forEach((anchor) => {
      const targetHref = anchor.getAttribute("href");
      if (targetHref && targetHref !== "#") {
        const listener = (e: MouseEvent) => handleAnchorClick(e, targetHref);
        anchor.addEventListener("click", listener);
        listeners.push({ anchor, listener });
      }
    });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener("load", handleLoad);
      lenis.destroy();
      lenisRef.current = null;
      listeners.forEach(({ anchor, listener }) => {
        anchor.removeEventListener("click", listener);
      });
    };
  }, []);

  return <>{children}</>;
}
