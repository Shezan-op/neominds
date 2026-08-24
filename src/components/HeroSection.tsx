"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ShieldCheck, Sparkles, Send } from "lucide-react";
import { BorderGlow } from "@/components/ui/BorderGlow";

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
  const [quickEmail, setQuickEmail] = useState("");

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

    // Perfectly centered horizontally & slightly anchored for hero composition
    const shiftX = (canvasWidth - renderWidth) * 0.5;
    const shiftY = (canvasHeight - renderHeight) * 0.4;

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

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenContact();
  };

  return (
    <section className="relative w-full min-h-screen bg-[#07080A] text-[#FFFFFF] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-10 z-1 select-none border-b border-[#222530]">
      {/* 1. Giant Background Typographic Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <span className="text-[16vw] sm:text-[18vw] font-serif font-bold tracking-tighter text-white/[0.04] uppercase leading-none block select-none">
          NEOMINDS
        </span>
      </div>

      {/* 2. Ambient Orange Radial Glow behind Robot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#FF5200]/25 via-[#FF5200]/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* 3. Full-Screen Interactive 60FPS Robot Frame Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-1 block"
      />

      {/* Subtle vignette border gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/60 pointer-events-none z-2" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07080A] to-transparent pointer-events-none z-2" />

      {/* Top Meta Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#CBD0DE] pt-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] animate-pulse" />
          <span>AI & ENTERPRISE SOFTWARE SYSTEMS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#A0A4B8]">
          <span>99.98% SLA</span>
          <span>•</span>
          <span className="text-white font-bold">100+ DEPLOYED SYSTEMS</span>
        </div>
      </div>

      {/* Bottom Main Content Rows */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-auto pt-24 sm:pt-32">
        {/* Left Column: Bold Metric Headline & Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#14161F]/90 backdrop-blur-md border border-[#2D313F] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5200]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFFFFF] font-sans">
              Production AI & Custom Engineering
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#FFFFFF] tracking-tight leading-[1.04]">
            Helped Launch <br />
            <span className="font-mono text-[#FF5200] font-bold">&gt;100+</span> Enterprise Systems.
          </h1>

          <p className="text-sm sm:text-base text-[#CBD0DE] font-sans leading-relaxed max-w-md">
            We engineer deterministic AI workflows, scalable backend architectures, and enterprise software built to run with zero downtime.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={onOpenContact}
              className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3.5 rounded-full shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <a
              href="#services"
              className="px-6 py-3.5 rounded-full bg-[#14161F]/90 hover:bg-[#1C1F2B] border border-[#2D313F] text-xs font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-2"
            >
              <span>Explore Specs</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#A0A4B8]" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Editorial Overview & Interactive Contact Widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-6"
        >
          {/* Editorial Description */}
          <div className="max-w-sm lg:text-right space-y-2">
            <p className="text-xs sm:text-sm text-[#CBD0DE] font-sans leading-relaxed">
              Neominds is an applied technical partner. From custom LLM tool-calling pipelines to distributed relational models, we eliminate operational bottlenecks.
            </p>
            <a
              href="#workflow"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF5200] hover:underline"
            >
              <span>See how we engineer</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Floating Contact Widget Card with BorderGlow */}
          <div className="w-full max-w-sm">
            <BorderGlow
              backgroundColor="#101217"
              borderRadius={16}
              glowColor="20 100 50"
              colors={["#FF5200", "#FF7A33", "#FFA07A"]}
              edgeSensitivity={25}
              glowRadius={36}
              glowIntensity={1.2}
              className="p-5 sm:p-6 border border-[#2D313F] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#2D313F] pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#FF5200] font-bold uppercase tracking-wider block">
                    Engineering Consultation
                  </span>
                  <span className="text-sm font-serif text-white">
                    Contact by Briefing
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF5200] animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-[#FF5200]">ONLINE</span>
                </div>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    placeholder="Enter work email for spec..."
                    className="w-full bg-[#181A24] border border-[#2D313F] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#7C7D82] focus:outline-none focus:border-[#FF5200] font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#FF5200] hover:bg-[#E04800] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#A0A4B8] font-mono">
                  <span>14-day sprint handover</span>
                  <span className="text-white font-bold">100% Client IP</span>
                </div>
              </form>
            </BorderGlow>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
