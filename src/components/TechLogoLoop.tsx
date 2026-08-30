"use client";

import React, { useEffect, useRef, useState } from "react";
import { TECH_LOGO_ITEMS } from "@/lib/data";
import { useScrollVelocity } from "./motion/useScrollVelocity";

export function TechLogoLoop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedVelocity } = useScrollVelocity(1.8);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Triple items for seamless loop
  const marqueeItems = [...TECH_LOGO_ITEMS, ...TECH_LOGO_ITEMS, ...TECH_LOGO_ITEMS];

  const posRef = useRef(0);
  const baseSpeed = 0.6; // pixels per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number;

    const animate = () => {
      // Accelerate or decelerate with Lenis scroll velocity
      const velocityOffset = normalizedVelocity * 3.5;
      posRef.current -= baseSpeed + velocityOffset;

      // Wrap-around math (track is 3 sets of items, wrap at 1/3 width)
      const oneThirdWidth = track.scrollWidth / 3;
      if (oneThirdWidth > 0) {
        if (posRef.current <= -oneThirdWidth) {
          posRef.current += oneThirdWidth;
        } else if (posRef.current > 0) {
          posRef.current -= oneThirdWidth;
        }
      }

      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;

      // Apply subtle proximity wave across nearby logos
      if (pointerPosRef.current && isHovered) {
        const logoElements = track.querySelectorAll<HTMLElement>(".logo-marquee-item");
        const cursorX = pointerPosRef.current.x;

        logoElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const dist = Math.abs(cursorX - centerX);
          const maxDist = 180;

          if (dist < maxDist) {
            const factor = Math.cos((dist / maxDist) * (Math.PI / 2));
            const scale = 1.0 + factor * 0.06;
            const letterSpacing = `${factor * 0.05}em`;
            const scaleX = 1.0 - factor * 0.04;

            el.style.transform = `scale(${scale}) scaleX(${scaleX})`;
            el.style.letterSpacing = letterSpacing;
            el.style.borderColor = "#1E5FD8";
          } else {
            el.style.transform = "scale(1) scaleX(1)";
            el.style.letterSpacing = "normal";
            el.style.borderColor = "#E6E6E8";
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [normalizedVelocity, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    pointerPosRef.current = { x: e.clientX, y: e.clientY };
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    pointerPosRef.current = null;
    setIsHovered(false);

    // Reset styles on leave
    if (trackRef.current) {
      const logoElements = trackRef.current.querySelectorAll<HTMLElement>(".logo-marquee-item");
      logoElements.forEach((el) => {
        el.style.transform = "scale(1) scaleX(1)";
        el.style.letterSpacing = "normal";
        el.style.borderColor = "#E6E6E8";
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-10 sm:py-14 bg-[#FAF9F6] border-b border-[#E6E6E8] overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7C7D82]">
            Tools & Technologies We Build With
          </span>
          <span className="text-xs text-[#1E5FD8] font-medium hidden sm:inline-block">
            Modern, battle-tested frameworks
          </span>
        </div>
      </div>

      {/* Infinite Horizontal Track with Wave Physics */}
      <div className="relative w-full overflow-hidden flex items-center py-2">
        {/* Soft edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 whitespace-nowrap will-change-transform py-1"
          style={{ willChange: "transform" }}
        >
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="logo-marquee-item flex items-center gap-3 px-5 py-3 bg-[#FFFFFF] border border-[#E6E6E8] shadow-xs flex-shrink-0 transition-colors duration-150 will-change-transform"
              data-cursor
              data-cursor-text={tech.category.split(" ")[0].toUpperCase()}
            >
              <span className="w-1.5 h-1.5 bg-[#1E5FD8] rounded-full flex-shrink-0" />
              <div>
                <span className="font-serif font-bold text-sm text-[#121316] tracking-tight block">
                  {tech.name}
                </span>
                <span className="text-[10px] text-[#7C7D82] uppercase tracking-wider block font-sans">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
