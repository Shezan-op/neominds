"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
}

const TOTAL_FRAMES = 124;

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(10);
  const targetFrameRef = useRef<number>(10);
  const animationFrameRef = useRef<number>(0);
  const [framesLoaded, setFramesLoaded] = useState(false);

  // Preload all 124 frames in memory for instantaneous 60fps playback
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = i.toString().padStart(3, "0");
      const img = new Image();
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 10) {
          setFramesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Render current frame to canvas with centered aspect ratio containment
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Calculate aspect ratio cover positioning
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;

    // Perfectly center the robot horizontally & elevate slightly for lower text area
    const shiftX = (canvasWidth - renderWidth) * 0.5;
    const shiftY = (canvasHeight - renderHeight) * 0.25;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, shiftX, shiftY, renderWidth, renderHeight);
  }, []);

  // Resize canvas for sharp rendering on high-DPI screens
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      renderFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame, framesLoaded]);

  // Mouse movement listener to map cursor position to robot look frames
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));

      let target = 10;
      if (normalizedX < 0.48) {
        // Left side: map normalizedX (0.48 -> 0) to frames (10 -> 69)
        const t = (0.48 - normalizedX) / 0.48;
        target = 10 + t * (69 - 10);
      } else if (normalizedX > 0.52) {
        // Right side: map normalizedX (0.52 -> 1.0) to frames (77 -> 124)
        const t = (normalizedX - 0.52) / 0.48;
        target = 77 + t * (124 - 77);
      } else {
        // Center neutral: frames 70-76
        const t = (normalizedX - 0.48) / 0.04;
        target = 70 + t * (76 - 70);
      }

      targetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, target));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 60FPS RAF loop with smooth lerp easing
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current = current + diff * 0.14;
        renderFrame(Math.round(currentFrameRef.current));
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [renderFrame]);

  return (
    <section className="relative w-full min-h-screen bg-[#07080A] text-[#FFFFFF] overflow-hidden flex flex-col justify-end pb-12 sm:pb-16 px-5 sm:px-8 md:px-12 lg:px-16 z-1 select-none border-b border-[#222530]">
      {/* LAYER 1: 60FPS Cursor-Tracked Robot Frame Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
      />

      {/* LAYER 2: Subtle Black Gradient Overlay (Top is transparent, bottom is solid black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07080A]/40 to-[#07080A] pointer-events-none z-1" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#07080A] via-[#07080A]/95 to-transparent pointer-events-none z-1" />

      {/* LAYER 3: Clean Foreground Text Structured across the Black Gradient Base */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4 sm:space-y-5"
        >
          {/* Top category badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#14161F]/90 backdrop-blur-md border border-[#2D313F] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5200]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFFFFF] font-sans">
              Production AI & Custom Engineering
            </span>
          </div>

          {/* Line 1: Bold Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FFFFFF] tracking-tight leading-[1.06]">
            Helped Launch <span className="font-mono text-[#FF5200] font-bold">&gt;100+</span> Enterprise Systems.
          </h1>

          {/* Line 2: Middle Subtitle Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#CBD0DE] font-sans leading-relaxed max-w-2xl">
            We engineer deterministic AI workflows, scalable backend architectures, and enterprise software built to run with zero downtime.
          </p>

          {/* Line 3: Bottom Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={onOpenContact}
              className="btn-primary text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <a
              href="#services"
              className="px-6 py-3.5 rounded-full bg-[#14161F]/90 hover:bg-[#1C1F2B] border border-[#2D313F] text-xs font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Specs</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#A0A4B8]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
