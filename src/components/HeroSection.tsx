"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Activity, ShieldCheck } from "lucide-react";

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

  // Preload all 124 frames in memory for instant 60fps playback
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = i.toString().padStart(3, "0");
      const img = new Image();
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 15) {
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

  // Render current frame to canvas with crisp containment
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

    const shiftX = (canvasWidth - renderWidth) * 0.5;
    const shiftY = (canvasHeight - renderHeight) * 0.5;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, shiftX, shiftY, renderWidth, renderHeight);
  }, []);

  // Resize canvas for sharp rendering on retina screens
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

  // 60FPS RAF loop with smooth lerp interpolation
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
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#FAF9F6] border-b border-[#E6E6E8] overflow-hidden min-h-[90vh] flex items-center">
      {/* Subtle ambient light gradient in hero background */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#FF5200]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Premium Neominds Editorial Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start space-y-6"
          >
            {/* Category Beacon */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E6E6E8] rounded-full shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5200] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5200]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A4B50] font-sans">
                AI & Software Engineering Systems
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif text-[#121316] tracking-tight leading-[1.08] text-balance">
              We build software and AI systems that solve real business problems.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#4A4B50] font-sans font-normal leading-relaxed text-balance">
              A serious technical partner for companies that need practical AI automations, custom enterprise software, and scalable backend infrastructure without speculative fluff.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3.5 rounded-full shadow-sm group"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="#services"
                className="btn-secondary text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-full"
              >
                <span>Explore Capabilities</span>
                <ArrowDown className="w-4 h-4 text-[#7C7D82]" />
              </a>
            </div>

            {/* Telemetry Micro-Badges */}
            <div className="pt-5 border-t border-[#E6E6E8] flex flex-wrap items-center gap-6 text-xs text-[#7C7D82] font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF5200]" />
                <span className="font-medium text-[#121316]">100% Client IP Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF5200]" />
                <span className="font-medium text-[#121316]">Production SLA Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Interactive Robot Space (Cursor-Tracked) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_16px_48px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Status Header Badge */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E6E6E8] text-[11px] font-mono text-[#4A4B50]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] animate-pulse" />
                  <span>A.R.I.A • REAL-TIME GAZE TRACKER</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  LIVE
                </span>
              </div>

              {/* Robot Frame Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover block"
              />

              {/* Bottom Telemetry Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-[#7C7D82] bg-white/85 backdrop-blur-md px-3 py-1 rounded-lg border border-[#E6E6E8] pointer-events-none">
                <span>Move cursor left / right to steer</span>
                <span className="text-[#FF5200] font-semibold">60 FPS Hardware Render</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
