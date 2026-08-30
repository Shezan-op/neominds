"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SCROLL_STACK_CASE_STUDIES, ScrollStackCaseStudy } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurText } from "./motion/BlurText";

interface RobotCaseStudiesShowcaseProps {
  onOpenContact: () => void;
}

const TOTAL_FRAMES = 124;

export function RobotCaseStudiesShowcase({ onOpenContact }: RobotCaseStudiesShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(73);
  const targetFrameRef = useRef<number>(73);
  const animationFrameRef = useRef<number>(0);
  const [framesLoaded, setFramesLoaded] = useState(false);

  // Status Indicator state: "○" -> "◌" -> "●"
  const [systemStatus, setSystemStatus] = useState<"○" | "◌" | "●">("○");

  // Active side tracking: "left" | "right" | "center"
  const [activeSide, setActiveSide] = useState<"left" | "right" | "center">("center");

  // Left side study index: alternates between 0 (Apex) and 2 (Nexus)
  const [leftStudyIdx, setLeftStudyIdx] = useState<number>(0);
  // Right side study index: alternates between 1 (Vanguard) and 3 (OmniRetail)
  const [rightStudyIdx, setRightStudyIdx] = useState<number>(1);

  // Visit counters for automatic alternating progression
  const leftVisitsRef = useRef<number>(0);
  const rightVisitsRef = useRef<number>(0);
  const lastSideRef = useRef<"left" | "right" | "center">("center");

  // Touch gesture support for mobile
  const touchStartXRef = useRef<number>(0);

  // Mobile active study index (0 to 3)
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number>(0);

  // Deep inspection modal study
  const [selectedStudy, setSelectedStudy] = useState<ScrollStackCaseStudy | null>(null);

  const studies = SCROLL_STACK_CASE_STUDIES;
  const leftStudy = studies[leftStudyIdx] || studies[0];
  const rightStudy = studies[rightStudyIdx] || studies[1];
  const mobileStudy = studies[mobileActiveIdx] || studies[0];

  // Preload all 124 frames in memory for smooth 60fps canvas rendering
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = i.toString().padStart(3, "0");
      const img = new Image();
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount >= 1) {
          setFramesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
      imagesRef.current = [];
    };
  }, []);

  // Technical systems activation sequence on scroll entry
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    let isMounted = true;
    let t1: NodeJS.Timeout | null = null;
    let t2: NodeJS.Timeout | null = null;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          if (!isMounted) return;
          setSystemStatus("○");
          t1 = setTimeout(() => {
            if (isMounted) setSystemStatus("◌");
          }, 400);
          t2 = setTimeout(() => {
            if (isMounted) setSystemStatus("●");
          }, 900);
        },
      });
    }, section);

    return () => {
      isMounted = false;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  // Draw current frame on canvas
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawH = rect.height;
      drawW = drawH * imgRatio;
      drawX = (rect.width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = rect.width;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (rect.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // 60FPS animation loop interpolating current frame toward target frame
  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;

      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.12;
        const boundedFrame = Math.max(
          0,
          Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
        );
        renderFrame(boundedFrame);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [renderFrame]);

  // Initial draw once frames load
  useEffect(() => {
    if (framesLoaded) {
      renderFrame(73);
    }
  }, [framesLoaded, renderFrame]);

  // Pointer movement tracking across widescreen stage
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));

    const frameIdx = Math.round(progress * (TOTAL_FRAMES - 1));
    targetFrameRef.current = frameIdx;

    let newSide: "left" | "right" | "center" = "center";
    if (progress < 0.4) {
      newSide = "left";
    } else if (progress > 0.6) {
      newSide = "right";
    }

    if (newSide !== lastSideRef.current) {
      if (newSide === "left") {
        leftVisitsRef.current += 1;
        if (leftVisitsRef.current > 1) {
          setLeftStudyIdx((prev) => (prev === 0 ? 2 : 0));
        }
      } else if (newSide === "right") {
        rightVisitsRef.current += 1;
        if (rightVisitsRef.current > 1) {
          setRightStudyIdx((prev) => (prev === 1 ? 3 : 1));
        }
      }
      lastSideRef.current = newSide;
    }

    setActiveSide(newSide);
  };

  const handlePointerLeave = () => {
    targetFrameRef.current = 73;
    setActiveSide("center");
    lastSideRef.current = "center";
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setMobileActiveIdx((prev) => (prev + 1) % studies.length);
      } else {
        setMobileActiveIdx((prev) => (prev - 1 + studies.length) % studies.length);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="w-full bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <BlurText
              as="h2"
              text="Real projects built for growing businesses."
              mode="word"
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight font-bold"
            />
          </div>
          <div className="flex flex-col sm:items-end text-sm text-[#4A4B50] font-sans max-w-md">
            <p>
              Hover over the left or right to explore real systems we engineered and the verified results we achieved for our clients.
            </p>
          </div>
        </div>
      </div>

      {/* FULL-WIDESCREEN ROBOT STAGE */}
      <div
        ref={frameContainerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[75vh] sm:h-[85vh] min-h-[580px] max-h-[960px] bg-[#000000] border-y border-[#1E293B] shadow-[0_24px_80px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Corner Indicators */}
        <div className="absolute top-4 left-6 text-xs text-white/50 select-none pointer-events-none hidden sm:flex items-center gap-1.5 font-sans">
          <span className="text-[#60A5FA]">●</span>
          <span>Hover to explore client projects</span>
        </div>
        <div className="absolute top-4 right-6 text-xs text-white/50 select-none pointer-events-none hidden sm:flex items-center gap-1.5 font-sans">
          <span>Click any project for full details</span>
          <span className="text-[#60A5FA]">●</span>
        </div>

        {/* Drawn Connector Line (Left -> Center -> Right) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#1E5FD8]/40 to-transparent pointer-events-none" />

        {/* Centered High-DPI Robot Canvas with Pure Black Seamless Fit */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[1100px] object-contain select-none"
          />
        </div>

        {/* 
          ========================================================================
          DESKTOP: LEFT SIDE OPEN TYPOGRAPHY (ZERO CARDS, ZERO BOXES)
          ========================================================================
        */}
        <div
          className={`hidden md:block absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 max-w-[340px] lg:max-w-[400px] transition-all duration-300 pointer-events-auto ${
            activeSide === "left"
              ? "opacity-100 translate-x-0"
              : activeSide === "center"
              ? "opacity-40 -translate-x-2"
              : "opacity-10 -translate-x-6 pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={leftStudy.id}
              initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-white space-y-3"
            >
              {/* Telemetry Header */}
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <span className="font-mono text-xs text-[#60A5FA] font-bold">
                  0{leftStudyIdx + 1} //
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                  {leftStudy.client}
                </span>
              </div>

              {/* Title & Narrative */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                {leftStudy.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                {leftStudy.shortDescription}
              </p>

              {/* Verified Metric */}
              <div className="pt-2 flex items-center gap-3">
                <span className="font-serif text-2xl font-bold text-[#60A5FA]">
                  {leftStudy.metrics[0].stat}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                  {leftStudy.metrics[0].label}
                </span>
              </div>

              {/* Open Action Link */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedStudy(leftStudy)}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#60A5FA] hover:text-white uppercase tracking-wider cursor-pointer group"
                  data-cursor
                  data-cursor-text="INSPECT"
                >
                  <span>Read Case Study Narrative</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 
          ========================================================================
          DESKTOP: RIGHT SIDE OPEN TYPOGRAPHY (ZERO CARDS, ZERO BOXES)
          ========================================================================
        */}
        <div
          className={`hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 max-w-[340px] lg:max-w-[400px] transition-all duration-300 pointer-events-auto ${
            activeSide === "right"
              ? "opacity-100 translate-x-0"
              : activeSide === "center"
              ? "opacity-40 translate-x-2"
              : "opacity-10 translate-x-6 pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={rightStudy.id}
              initial={{ opacity: 0, x: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 16, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-white space-y-3 text-right"
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-end gap-2 border-b border-white/20 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                  {rightStudy.client}
                </span>
                <span className="font-mono text-xs text-[#60A5FA] font-bold">
                  // 0{rightStudyIdx + 1}
                </span>
              </div>

              {/* Title & Narrative */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                {rightStudy.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                {rightStudy.shortDescription}
              </p>

              {/* Verified Metric */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                  {rightStudy.metrics[0].label}
                </span>
                <span className="font-serif text-2xl font-bold text-[#60A5FA]">
                  {rightStudy.metrics[0].stat}
                </span>
              </div>

              {/* Open Action Link */}
              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStudy(rightStudy)}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#60A5FA] hover:text-white uppercase tracking-wider cursor-pointer group"
                  data-cursor
                  data-cursor-text="INSPECT"
                >
                  <span>Read Case Study Narrative</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE OPEN TYPOGRAPHY OVERLAY */}
        <div className="md:hidden absolute bottom-4 inset-x-4 z-20">
          <div className="p-4 text-white space-y-2.5 border-t border-white/20 bg-black/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#60A5FA] font-bold">
                0{mobileActiveIdx + 1} // {mobileStudy.client}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveIdx(
                      (mobileActiveIdx - 1 + studies.length) % studies.length
                    )
                  }
                  className="w-7 h-7 bg-white/10 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveIdx((mobileActiveIdx + 1) % studies.length)
                  }
                  className="w-7 h-7 bg-white/10 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-serif font-bold text-white">
              {mobileStudy.title}
            </h3>

            <div className="flex items-center justify-between pt-1">
              <span className="font-serif text-lg text-[#60A5FA] font-bold">
                {mobileStudy.metrics[0].stat}
              </span>
              <button
                type="button"
                onClick={() => setSelectedStudy(mobileStudy)}
                className="text-xs font-mono font-bold text-[#60A5FA] underline"
              >
                Inspect Narrative →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Inspection Modal (Open Editorial Reading View) */}
      <AnimatePresence>
        {selectedStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudy(null)}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF9F6] text-[#121316] border border-[#E6E6E8] p-6 sm:p-10 lg:p-12 shadow-2xl z-10 space-y-8"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#1E5FD8] font-bold">CASE STUDY DOSSIER //</span>
                  <span className="text-[#4A4B50] uppercase font-bold">
                    {selectedStudy.client}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="w-8 h-8 flex items-center justify-center bg-[#FFFFFF] border border-[#E6E6E8] hover:bg-[#1E5FD8] hover:text-white transition-colors cursor-pointer"
                  data-cursor
                  data-cursor-text="CLOSE"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block">
                  {selectedStudy.industry}
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#121316]">
                  {selectedStudy.title}
                </h3>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E6E6E8] text-sm">
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#7C7D82] mb-2">
                    [SYSTEM BOTTLENECK]
                  </h4>
                  <p className="text-[#4A4B50] leading-relaxed">
                    {selectedStudy.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#1E5FD8] mb-2">
                    [ENGINEERED ARCHITECTURE]
                  </h4>
                  <p className="text-[#121316] font-medium leading-relaxed">
                    {selectedStudy.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E6E6E8]">
                {selectedStudy.metrics.map((m, i) => (
                  <div key={i} className="border-l-2 border-[#1E5FD8] pl-3 py-1">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E5FD8]">
                      {m.stat}
                    </div>
                    <div className="text-xs font-mono uppercase text-[#7C7D82] mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architecture Tech Tags */}
              <div className="pt-4 border-t border-[#E6E6E8] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#7C7D82] mr-2">
                  DEPLOYED STACK:
                </span>
                {selectedStudy.tags.map((t, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] bg-[#FFFFFF] border border-[#E6E6E8] px-2.5 py-1 text-[#121316]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Modal CTA */}
              <div className="pt-6 border-t border-[#E6E6E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs font-mono text-[#7C7D82]">
                  100% Client Codebase Ownership • Zero Vendor Lock-in
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudy(null);
                    onOpenContact();
                  }}
                  className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-3 cursor-pointer flex items-center justify-center gap-2 text-white"
                  data-cursor
                  data-cursor-text="DISCUSS"
                >
                  <span>Build Similar System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
