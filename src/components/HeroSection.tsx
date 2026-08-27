"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Activity,
  Cpu,
  CheckCircle2,
  Zap,
  Grid2X2,
  ChevronRight,
} from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"pipeline" | "metrics" | "terminal">("pipeline");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden text-white selection:bg-[#1E5FD8] selection:text-white">
      {/* 
        ========================================================================
        01. ROYAL SAPPHIRE & WHITE CIRCULAR ATMOSPHERIC GRADIENT
        Deep midnight sapphire at top, transitioning down to light atmospheric blue
        and fading seamlessly into #FAF9F6 right at the tablet height.
        ========================================================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Sapphire / Navy Radial Spherical Circle Glow */}
        <div
          className="absolute inset-x-0 top-0 h-[1100px] w-full"
          style={{
            background:
              "radial-gradient(130% 90% at 50% -10%, #050E24 0%, #08193D 28%, #10316B 52%, #1E5FD8 72%, #60A5FA 86%, #C7DFFE 94%, #FAF9F6 100%)",
          }}
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-[#030914]/40 via-transparent to-transparent opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-24">
        {/* 
          ========================================================================
          02. TOP HEADER BAR (Logo, Case Study Pill, Menu Button)
          ========================================================================
        */}
        <div className="flex items-center justify-between py-3 mb-14 sm:mb-20">
          {/* Top-Left: Neominds Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-2 text-white/95 hover:text-white transition-opacity group focus:outline-none"
            aria-label="Neominds"
          >
            <div className="w-6 h-6 flex items-center justify-center text-white font-serif text-lg font-bold">
              ❄
            </div>
            <span className="font-sans font-semibold text-sm tracking-tight text-white/90 group-hover:text-white">
              neominds
            </span>
          </a>

          {/* Top-Center: Pill Badge */}
          <motion.a
            href="#case-studies"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-white/90 hover:text-white transition-all shadow-xs cursor-pointer rounded-full"
          >
            <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-none animate-pulse" />
            <span>READ VERIFIED CASE STUDIES</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
          </motion.a>

          {/* Top-Right: Menu / Direct Contact Button */}
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer rounded-none"
          >
            <Grid2X2 className="w-3.5 h-3.5 text-white/80" />
            <span className="font-bold">MENU</span>
          </button>
        </div>

        {/* 
          ========================================================================
          03. HERO HEADLINE & VALUE PROPOSITION
          ========================================================================
        */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-serif font-bold text-white tracking-tight leading-[1.04]"
          >
            Move enterprise systems without friction
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm sm:text-base md:text-lg text-white/80 font-sans font-normal leading-relaxed max-w-2xl text-balance"
          >
            Clear results from teams trusting Neominds to engineer custom software, automate workflows, and deploy intelligent AI systems. Infrastructure stays fast, visible, and dependable.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            {/* Left Button: SEE IN ACTION */}
            <button
              type="button"
              onClick={() => scrollToSection("case-studies")}
              className="px-6 py-3 bg-[#0A1733]/70 hover:bg-[#10224D] border border-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none"
            >
              SEE IN ACTION
            </button>

            {/* Right Button: REQUEST A DEMO (Royal Sapphire Blue) */}
            <button
              type="button"
              onClick={onOpenContact}
              className="px-6 py-3 bg-[#1E5FD8] hover:bg-[#174CB3] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_4px_24px_rgba(30,95,216,0.45)] cursor-pointer rounded-none border border-[#3B82F6]/40"
            >
              <Grid2X2 className="w-3.5 h-3.5" />
              <span>REQUEST A DEMO</span>
            </button>
          </motion.div>
        </div>

        {/* 
          ========================================================================
          04. CENTERPIECE: TRANSPARENT ROBOT HOLDING TABLET
          With smooth white gradient cover ending at the waistline/below tablet
          ========================================================================
        */}
        <div className="relative mt-8 sm:mt-12 flex flex-col items-center justify-center">
          {/* Main Visual Frame */}
          <div className="relative w-full max-w-[440px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[700px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full select-none"
            >
              {/* Backgroundless Transparent Robot Image */}
              <Image
                src="/hero-image.png?v=2"
                alt="Neominds Applied AI and Enterprise Architecture"
                width={1024}
                height={1536}
                priority
                unoptimized
                className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
              />

              {/* 
                SMOOTH WHITE GRADIENT COVER:
                Transparent on upper body/tablet, smoothly fades to solid white/page background (#FAF9F6)
                right below the tablet (at the marked waist line).
              */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, transparent 48%, rgba(250, 249, 246, 0.45) 62%, rgba(250, 249, 246, 0.94) 75%, #FAF9F6 86%, #FAF9F6 100%)",
                }}
              />

              {/* 
                ====================================================================
                05. INTERACTIVE TABLET SCREEN OVERLAY
                Fitted right onto the tablet held horizontally in the robot's hands!
                ====================================================================
              */}
              <div
                className="absolute left-[14.8%] top-[46.5%] w-[59.5%] h-[22.6%] rounded-[6px] sm:rounded-[8px] bg-[#0A0D14] border border-[#2A2E3D] shadow-2xl overflow-hidden text-left flex flex-col z-20 pointer-events-auto"
                style={{
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 8px 30px rgba(0,0,0,0.6)",
                }}
              >
                {/* Tablet Top Tab Bar */}
                <div className="flex items-center justify-between bg-[#121622] border-b border-[#222738] px-2 sm:px-3 py-1 sm:py-1.5 flex-shrink-0">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("pipeline")}
                      className={`px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors rounded-none ${
                        activeTab === "pipeline"
                          ? "bg-[#1E5FD8] text-white font-bold"
                          : "text-[#8E92A4] hover:text-white"
                      }`}
                    >
                      AI Pipeline
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("metrics")}
                      className={`px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors rounded-none ${
                        activeTab === "metrics"
                          ? "bg-[#1E5FD8] text-white font-bold"
                          : "text-[#8E92A4] hover:text-white"
                      }`}
                    >
                      Telemetry
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("terminal")}
                      className={`hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors rounded-none ${
                        activeTab === "terminal"
                          ? "bg-[#1E5FD8] text-white font-bold"
                          : "text-[#8E92A4] hover:text-white"
                      }`}
                    >
                      Terminal
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono text-[#38BDF8]">
                    <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-ping" />
                    <span className="hidden sm:inline">LIVE // 99.9%</span>
                  </div>
                </div>

                {/* Tablet Screen Content Area */}
                <div className="flex-1 p-2 sm:p-3 overflow-hidden bg-[#07090F] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {/* TAB 1: AI AGENT PIPELINE */}
                    {activeTab === "pipeline" && (
                      <motion.div
                        key="pipeline"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1.5 sm:space-y-2 font-mono text-[8px] sm:text-[11px]"
                      >
                        <div className="flex items-center justify-between text-[#8E92A4] border-b border-[#1A2030] pb-1">
                          <span className="text-[#60A5FA] font-bold uppercase">Workflow Node // v2.4</span>
                          <span className="text-white/60">Latency: 142ms</span>
                        </div>

                        {/* Pipeline stages */}
                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                          <div className="bg-[#121624] border border-[#222A40] p-1 sm:p-1.5 rounded-none flex flex-col justify-between">
                            <span className="text-[7px] sm:text-[9px] text-[#8E92A4] uppercase">01. INGEST</span>
                            <span className="text-white font-bold text-[8px] sm:text-[10px] truncate">Vector Sync</span>
                            <span className="text-[#38BDF8] text-[7px] sm:text-[8px]">● Verified</span>
                          </div>

                          <div className="bg-[#121624] border border-[#1E5FD8] p-1 sm:p-1.5 rounded-none flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[#1E5FD8]" />
                            <span className="text-[7px] sm:text-[9px] text-[#60A5FA] uppercase">02. EXECUTE</span>
                            <span className="text-white font-bold text-[8px] sm:text-[10px] truncate">LLM Reasoning</span>
                            <span className="text-[#38BDF8] text-[7px] sm:text-[8px]">⚡ Running</span>
                          </div>

                          <div className="bg-[#121624] border border-[#222A40] p-1 sm:p-1.5 rounded-none flex flex-col justify-between">
                            <span className="text-[7px] sm:text-[9px] text-[#8E92A4] uppercase">03. OUTPUT</span>
                            <span className="text-white font-bold text-[8px] sm:text-[10px] truncate">Deterministic</span>
                            <span className="text-[#38BDF8] text-[7px] sm:text-[8px]">● Complete</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[7px] sm:text-[9px] text-[#8E92A4] pt-0.5">
                          <span className="text-white/70 truncate">Engine: Claude 3.7 + Custom Backend</span>
                          <span className="text-[#38BDF8] font-bold">0 FAILURES</span>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: TELEMETRY & METRICS */}
                    {activeTab === "metrics" && (
                      <motion.div
                        key="metrics"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1.5 sm:space-y-2 font-mono text-[8px] sm:text-[11px]"
                      >
                        <div className="flex items-center justify-between text-[#8E92A4] border-b border-[#1A2030] pb-1">
                          <span className="text-[#38BDF8] font-bold">SYSTEM TELEMETRY</span>
                          <span className="text-white/60">Cluster: US-EAST-1</span>
                        </div>

                        <div className="grid grid-cols-2 gap-1 sm:gap-2">
                          <div className="bg-[#121624] border border-[#222A40] p-1 sm:p-1.5">
                            <span className="text-[7px] sm:text-[8px] text-[#8E92A4] block">API THROUGHPUT</span>
                            <span className="text-sm sm:text-lg font-bold text-white leading-none">18,420</span>
                            <span className="text-[7px] sm:text-[8px] text-[#38BDF8] block mt-0.5">req / sec</span>
                          </div>

                          <div className="bg-[#121624] border border-[#222A40] p-1 sm:p-1.5">
                            <span className="text-[7px] sm:text-[8px] text-[#8E92A4] block">ERROR RATE</span>
                            <span className="text-sm sm:text-lg font-bold text-[#38BDF8] leading-none">0.001%</span>
                            <span className="text-[7px] sm:text-[8px] text-white/60 block mt-0.5">zero downtime</span>
                          </div>
                        </div>

                        <div className="h-1.5 sm:h-2 bg-[#1A2030] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#1E5FD8] to-[#38BDF8] w-[92%]" />
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 3: TERMINAL */}
                    {activeTab === "terminal" && (
                      <motion.div
                        key="terminal"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-[7px] sm:text-[9px] text-[#A0A6BD] space-y-0.5 sm:space-y-1"
                      >
                        <p className="text-white/40">&gt; neominds deploy --cluster=prod-alpha</p>
                        <p className="text-[#38BDF8]">&gt; [OK] Connected to multi-region mesh</p>
                        <p className="text-white/80">&gt; Compiled 14 microservices in 4.2s</p>
                        <p className="text-[#60A5FA]">&gt; System ready: 0 errors, 100% test pass</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 
          ========================================================================
          06. 3-COLUMN STATS ROW (Light Atmospheric Zone at bottom)
          ========================================================================
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-10 pt-8 sm:pt-12 border-t border-[#D0DFEE]/60 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-center sm:text-left">
            {/* Stat 01 */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#121316] tracking-tight">
                99.9%
              </span>
              <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed mt-2 max-w-[240px]">
                increase in system visibility & uptime across enterprise deployments
              </p>
            </div>

            {/* Stat 02 */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#121316] tracking-tight">
                10x
              </span>
              <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed mt-2 max-w-[240px]">
                faster setup time from technical onboarding to first production run
              </p>
            </div>

            {/* Stat 03 */}
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#121316] tracking-tight">
                64%
              </span>
              <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed mt-2 max-w-[240px]">
                reduction in manual follow-ups across mission-critical workflows
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
