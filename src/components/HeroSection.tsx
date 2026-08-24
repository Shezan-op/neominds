"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Check } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
}

// Typewriter custom hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      let index = 0;
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const TOTAL_FRAMES = 124;

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(10);
  const targetFrameRef = useRef<number>(10);
  const animationFrameRef = useRef<number>(0);

  const [copied, setCopied] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [framesLoaded, setFramesLoaded] = useState(false);

  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

  // Show action pills 400ms after load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Preload all 124 frames in memory for smooth 60fps playback
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
          // As soon as initial batch is ready, begin displaying
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

  // Render current frame to canvas with object-fit cover
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

    // Align slightly right of center (70% center) as in design spec
    const shiftX = (canvasWidth - renderWidth) * 0.7;
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

      // Smooth lerp towards target frame
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@neominds.co");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-12 z-1 bg-[#FAF9F6]">
      {/* 1. Interactive 60FPS Cursor-Tracked Robot Frame Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none block"
      />

      {/* Subtle overlay for clean editorial contrast */}
      <div className="absolute inset-0 bg-[#FAF9F6]/20 pointer-events-none z-0 backdrop-blur-[0.5px]" />

      {/* Hero Content Container */}
      <div className="max-w-2xl relative z-10 select-none">
        {/* 1. Blurred Intro Label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6 text-black font-sans leading-[1.3] font-normal"
          style={{
            fontSize: "clamp(18px, 4vw, 26px)",
            filter: "blur(4px)",
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Neominds' Adaptive Response Interface Agent
        </div>

        {/* 2. Typewriter Text */}
        <p
          className="text-black mb-5 sm:mb-6 font-sans font-normal leading-[1.35] min-h-[54px]"
          style={{
            fontSize: "clamp(18px, 4vw, 26px)",
          }}
        >
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-cursor-blink" />
          )}
        </p>

        {/* 3. Action Pill Buttons */}
        <div
          className={`flex flex-wrap gap-2 pt-2 transition-all duration-400 ease-out ${
            showPills
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          {/* White Pill Button 1: Contact Modal */}
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs font-sans font-medium"
          >
            Pitch us an idea
          </button>

          {/* White Pill Button 2: Capabilities */}
          <a
            href="#services"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs font-sans font-medium"
          >
            Explore capabilities
          </a>

          {/* White Pill Button 3: Workflow */}
          <a
            href="#workflow"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs font-sans font-medium"
          >
            See how we operate
          </a>

          {/* White Pill Button 4: Engineering Vault */}
          <a
            href="#dossier"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs font-sans font-medium"
          >
            Inspect engineering vault
          </a>

          {/* Outline Pill Button: Copy Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center bg-black/85 text-white border border-black/20 backdrop-blur-xs rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] gap-2 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer font-sans font-medium"
          >
            <span>
              Reach us:{" "}
              <span className="underline underline-offset-2">hello@neominds.co</span>
            </span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80"
              >
                <path
                  d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33333 10H2.66667C2.29848 10 2 9.70152 2 9.33333V2.66667C2 2.29848 2.29848 2 2.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V3.33333"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
