"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mounted = true;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (mounted && !hasMoved) {
        setHasMoved(true);
      }

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      if (!target || !mounted) return;

      const interactive = target.closest(
        'a, button, [data-cursor], input, select, textarea, [role="button"]'
      ) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute("data-cursor-text") || "";
        setCursorText(customText);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.22);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.22);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      mounted = false;
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [hasMoved]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ease-out ${
          cursorText
            ? "px-2.5 py-1 bg-[#1E5FD8] text-white shadow-lg border border-white/20"
            : isHovered
            ? "w-7 h-7 bg-[#1E5FD8]/20 border border-[#1E5FD8] rounded-full scale-110"
            : "w-2.5 h-2.5 bg-[#1E5FD8] rounded-full shadow-xs"
        }`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono font-bold tracking-wider uppercase text-white whitespace-nowrap"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
