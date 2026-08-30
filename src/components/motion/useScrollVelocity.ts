"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useScrollVelocity(sensitivity = 1) {
  const [velocity, setVelocity] = useState(0);
  const [normalizedVelocity, setNormalizedVelocity] = useState(0);
  const rawVelocityRef = useRef(0);
  const smoothVelocityRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let lenisInstance = window.__lenis;

    const updateLenisRef = () => {
      lenisInstance = window.__lenis;
    };

    const checkInterval = setInterval(() => {
      if (window.__lenis && !lenisInstance) {
        updateLenisRef();
      }
    }, 200);

    const tickerCallback = () => {
      const v = window.__lenis?.velocity || 0;
      rawVelocityRef.current = v;
      // Smooth out velocity with exponential moving average
      smoothVelocityRef.current += (v - smoothVelocityRef.current) * 0.15;

      const norm = Math.max(-1, Math.min(1, (smoothVelocityRef.current / 30) * sensitivity));
      setVelocity(smoothVelocityRef.current);
      setNormalizedVelocity(norm);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      clearInterval(checkInterval);
      gsap.ticker.remove(tickerCallback);
    };
  }, [sensitivity]);

  return { velocity, normalizedVelocity };
}
