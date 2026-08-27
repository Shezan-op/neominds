"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X, Sparkles, Terminal } from "lucide-react";
import { SCROLL_STACK_CASE_STUDIES, ScrollStackCaseStudy } from "@/lib/data";

interface RobotCaseStudiesShowcaseProps {
  onOpenContact: () => void;
}

const TOTAL_FRAMES = 124;

export function RobotCaseStudiesShowcase({ onOpenContact }: RobotCaseStudiesShowcaseProps) {
  const frameContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(73);
  const targetFrameRef = useRef<number>(73);
  const animationFrameRef = useRef<number>(0);
  const [framesLoaded, setFramesLoaded] = useState(false);

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
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = i.toString().padStart(3, "0");
      const img = new Image();
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 1) {
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

  // Render current frame to canvas
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

    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.min(hRatio, vRatio) * 1.0;

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;

    const shiftX = (canvasWidth - renderWidth) * 0.5;
    const shiftY = (canvasHeight - renderHeight) * 0.5;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, shiftX, shiftY, renderWidth, renderHeight);
  }, []);

  // Resize canvas for sharp high-DPI rendering
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

  // Desktop Mouse Movement Listener with Auto-Alternating Logic
  useEffect(() => {
    const container = frameContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top - 60 || e.clientY > rect.bottom + 60) return;

      const normalizedX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      let target = 73;
      if (normalizedX < 0.46) {
        // Left side: Robot turns left (frames 10 -> 69)
        const t = (0.46 - normalizedX) / 0.46;
        target = 69 - t * (69 - 10);

        if (lastSideRef.current !== "left") {
          setActiveSide("left");
          // Auto-alternate between Study 01 (Apex) and Study 03 (Nexus) on entry
          const nextLeft = leftVisitsRef.current % 2 === 0 ? 0 : 2;
          setLeftStudyIdx(nextLeft);
          leftVisitsRef.current += 1;
          lastSideRef.current = "left";
        }
      } else if (normalizedX > 0.54) {
        // Right side: Robot turns right (frames 77 -> 124)
        const t = (normalizedX - 0.54) / 0.46;
        target = 77 + t * (124 - 77);

        if (lastSideRef.current !== "right") {
          setActiveSide("right");
          // Auto-alternate between Study 02 (Vanguard) and Study 04 (OmniRetail) on entry
          const nextRight = rightVisitsRef.current % 2 === 0 ? 1 : 3;
          setRightStudyIdx(nextRight);
          rightVisitsRef.current += 1;
          lastSideRef.current = "right";
        }
      } else {
        // Center neutral: frames 70-76
        const t = (normalizedX - 0.46) / 0.08;
        target = 70 + t * (76 - 70);

        if (lastSideRef.current !== "center") {
          setActiveSide("center");
          lastSideRef.current = "center";
        }
      }

      targetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, target));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 60FPS RAF loop with smooth lerp physics
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

  // Mobile touch navigation handler
  const setMobileStudy = (idx: number) => {
    setMobileActiveIdx(idx);
    if (idx === 0 || idx === 2) {
      targetFrameRef.current = 28;
    } else {
      targetFrameRef.current = 112;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        // Swiped left -> next
        setMobileStudy((mobileActiveIdx + 1) % studies.length);
      } else {
        // Swiped right -> prev
        setMobileStudy((mobileActiveIdx - 1 + studies.length) % studies.length);
      }
    }
  };

  return (
    <section
      id="case-studies"
      className="w-full bg-[#FAF9F6] text-[#121316] border-b border-[#E6E6E8] relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
              Verified Production Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
              Interactive Systems Stage & Verified Outcomes.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4B50] font-sans max-w-md">
            Hover left or right across the widescreen stage to auto-explore verified systems as the vision engine directs toward each study.
          </p>
        </div>
      </div>

      {/* FULL-WIDESCREEN PURE BLACK ROBOT STAGE */}
      <div
        ref={frameContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[75vh] sm:h-[85vh] min-h-[580px] max-h-[960px] bg-[#000000] border-y border-[#1E293B] shadow-[0_24px_80px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Subtle Technical Corner Accents */}
        <div className="absolute top-4 left-6 text-[10px] font-mono text-white/30 select-none pointer-events-none hidden sm:block">
          + SECTOR 01 & 03 [LEFT]
        </div>
        <div className="absolute top-4 right-6 text-[10px] font-mono text-white/30 select-none pointer-events-none hidden sm:block">
          [RIGHT] SECTOR 02 & 04 +
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] font-mono text-white/30 select-none pointer-events-none hidden sm:block">
          + 60FPS KINETIC STAGE
        </div>
        <div className="absolute bottom-4 right-6 text-[10px] font-mono text-white/30 select-none pointer-events-none hidden sm:block">
          TELEMETRY: ACTIVE +
        </div>

        {/* Centered High-DPI Robot Canvas with Pure Black Seamless Fit */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[1100px] object-contain select-none"
          />
        </div>

        {/* DESKTOP: LEFT SIDE COMPACT CARD (Auto-alternates 01 Apex <-> 03 Nexus) */}
        <div
          className={`hidden md:block absolute left-6 lg:left-14 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
            activeSide === "left"
              ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
              : activeSide === "center"
              ? "opacity-20 -translate-x-2 scale-95 pointer-events-none"
              : "opacity-0 -translate-x-6 scale-90 pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={leftStudy.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-[310px] lg:w-[340px] bg-[#08080C]/90 backdrop-blur-xl border border-white/15 p-4 sm:p-5 shadow-2xl text-white rounded-none space-y-3"
            >
              {/* Card Header with Sector Pill */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="text-[#60A5FA] font-bold">LEFT //</span>
                  <span className="bg-[#1E5FD8] text-white px-1.5 py-0.5 font-bold">
                    0{leftStudyIdx + 1}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 uppercase truncate max-w-[130px]">
                  {leftStudy.industry}
                </span>
              </div>

              {/* Title & Client */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                  {leftStudy.client}
                </span>
                <h3 className="text-base sm:text-lg font-serif text-white leading-tight mt-0.5">
                  {leftStudy.title}
                </h3>
                <p className="text-xs text-white/70 font-sans leading-relaxed mt-1.5 line-clamp-2">
                  {leftStudy.shortDescription}
                </p>
              </div>

              {/* Compact Metric Tag */}
              <div className="flex items-center gap-2 pt-1">
                <div className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono">
                  <span className="text-[#60A5FA] font-bold">{leftStudy.metrics[0].stat}</span>{" "}
                  <span className="text-white/50 uppercase">{leftStudy.metrics[0].label}</span>
                </div>
              </div>

              {/* Read Full Button */}
              <button
                type="button"
                onClick={() => setSelectedStudy(leftStudy)}
                className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-2 flex items-center justify-center gap-2 rounded-none cursor-pointer text-white"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP: RIGHT SIDE COMPACT CARD (Auto-alternates 02 Vanguard <-> 04 OmniRetail) */}
        <div
          className={`hidden md:block absolute right-6 lg:right-14 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
            activeSide === "right"
              ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
              : activeSide === "center"
              ? "opacity-20 translate-x-2 scale-95 pointer-events-none"
              : "opacity-0 translate-x-6 scale-90 pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={rightStudy.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-[310px] lg:w-[340px] bg-[#08080C]/90 backdrop-blur-xl border border-white/15 p-4 sm:p-5 shadow-2xl text-white rounded-none space-y-3"
            >
              {/* Card Header with Sector Pill */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="text-[#60A5FA] font-bold">RIGHT //</span>
                  <span className="bg-[#1E5FD8] text-white px-1.5 py-0.5 font-bold">
                    0{rightStudyIdx + 1}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 uppercase truncate max-w-[130px]">
                  {rightStudy.industry}
                </span>
              </div>

              {/* Title & Client */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                  {rightStudy.client}
                </span>
                <h3 className="text-base sm:text-lg font-serif text-white leading-tight mt-0.5">
                  {rightStudy.title}
                </h3>
                <p className="text-xs text-white/70 font-sans leading-relaxed mt-1.5 line-clamp-2">
                  {rightStudy.shortDescription}
                </p>
              </div>

              {/* Compact Metric Tag */}
              <div className="flex items-center gap-2 pt-1">
                <div className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono">
                  <span className="text-[#60A5FA] font-bold">{rightStudy.metrics[0].stat}</span>{" "}
                  <span className="text-white/50 uppercase">{rightStudy.metrics[0].label}</span>
                </div>
              </div>

              {/* Read Full Button */}
              <button
                type="button"
                onClick={() => setSelectedStudy(rightStudy)}
                className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-2 flex items-center justify-center gap-2 rounded-none cursor-pointer text-white"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP: Center Direct Direction Prompt (Visible when neutral) */}
        <div
          className={`hidden md:flex absolute bottom-6 inset-x-0 justify-center pointer-events-none transition-opacity duration-300 ${
            activeSide === "center" ? "opacity-60" : "opacity-0"
          }`}
        >
          <span className="text-[10px] font-mono text-white tracking-widest uppercase bg-black/60 px-3 py-1 border border-white/10">
            ◄ HOVER LEFT (01 & 03) OR RIGHT (02 & 04) TO DIRECT VISION ►
          </span>
        </div>

        {/* MOBILE VIEWPORT: Touch-optimized Compact Card & Selector in Thumb Zone */}
        <div className="md:hidden absolute inset-x-3 bottom-3 z-30 space-y-2 pointer-events-auto">
          {/* Touch-safe 44px tap target selector pills */}
          <div className="grid grid-cols-4 gap-1.5 bg-[#08080C]/90 backdrop-blur-xl border border-white/15 p-1">
            {studies.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setMobileStudy(idx)}
                className={`min-h-[44px] flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  mobileActiveIdx === idx
                    ? "bg-[#1E5FD8] text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Active Mobile Card */}
          <div className="bg-[#08080C]/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl text-white space-y-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase">
                0{mobileActiveIdx + 1} // {mobileStudy.client}
              </span>
              <span className="text-[9px] font-mono text-white/50 uppercase">
                {mobileStudy.industry}
              </span>
            </div>

            <h3 className="text-sm font-serif text-white leading-tight">
              {mobileStudy.title}
            </h3>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-mono text-[#60A5FA] font-bold">
                {mobileStudy.metrics[0].stat} {mobileStudy.metrics[0].label}
              </span>

              <button
                type="button"
                onClick={() => setSelectedStudy(mobileStudy)}
                className="btn-primary text-[11px] uppercase tracking-wider font-bold px-3 py-2 flex items-center gap-1.5 min-h-[44px]"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Deep Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#E6E6E8] p-6 sm:p-10 shadow-2xl text-[#121316] rounded-none"
            >
              <button
                type="button"
                onClick={() => setSelectedStudy(null)}
                className="absolute top-6 right-6 p-2 text-[#7C7D82] hover:text-[#121316] bg-[#FAF9F6] border border-[#E6E6E8] focus:outline-none z-10 cursor-pointer rounded-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider">
                  {selectedStudy.client} • {selectedStudy.industry}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] mt-2 leading-tight">
                  {selectedStudy.title}
                </h3>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed border-t border-b border-[#E6E6E8] py-6 my-6">
                <div>
                  <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                    The Operational Challenge
                  </h4>
                  <p>{selectedStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                    The Engineering Solution
                  </h4>
                  <p>{selectedStudy.solution}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider mb-1 font-sans">
                    System Architecture Delivered
                  </h4>
                  <p>{selectedStudy.whatWeBuilt}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1E5FD8] text-xs uppercase tracking-wider mb-1 font-sans">
                    Commercial Return
                  </h4>
                  <p className="text-[#121316] font-semibold">{selectedStudy.outcome}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="text-xs font-semibold text-[#7C7D82] hover:text-[#121316] cursor-pointer rounded-none min-h-[44px] px-3"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudy(null);
                    onOpenContact();
                  }}
                  className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5 cursor-pointer rounded-none min-h-[44px]"
                >
                  <span>Build a Similar System</span>
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
