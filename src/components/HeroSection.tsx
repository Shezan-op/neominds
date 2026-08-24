"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

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

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPills, setShowPills] = useState(false);

  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

  // Show action pills 400ms after load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Mouse-scrub video control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX: number | null = null;
    let isSeeking = false;
    let pendingTargetTime: number | null = null;

    const SENSITIVITY = 0.8;

    const handleMouseMove = (e: MouseEvent) => {
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }

      const delta = e.clientX - prevX;
      prevX = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const current = video.currentTime || 0;
      const targetTime = Math.max(0, Math.min(video.duration, current + timeOffset));

      if (isSeeking) {
        pendingTargetTime = targetTime;
      } else {
        isSeeking = true;
        video.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      if (pendingTargetTime !== null) {
        const next = pendingTargetTime;
        pendingTargetTime = null;
        video.currentTime = next;
      } else {
        isSeeking = false;
      }
    };

    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      video.removeEventListener("seeked", handleSeeked);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-12 z-1">
      {/* 1. Background Video with Interactive Mouse Scrub */}
      <video
        ref={videoRef}
        src="/herovideo.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] pointer-events-none z-0 select-none"
      />

      {/* Subtle overlay for clean contrast */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none z-0 backdrop-blur-[1px]" />

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
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs"
          >
            Pitch us an idea
          </button>

          {/* White Pill Button 2: Capabilities */}
          <a
            href="#services"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs"
          >
            Explore capabilities
          </a>

          {/* White Pill Button 3: Workflow */}
          <a
            href="#workflow"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs"
          >
            See how we operate
          </a>

          {/* White Pill Button 4: Engineering Vault */}
          <a
            href="#dossier"
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs"
          >
            Inspect engineering vault
          </a>

          {/* Outline Pill Button: Copy Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center bg-black/85 text-white border border-black/20 backdrop-blur-xs rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] gap-2 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
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
