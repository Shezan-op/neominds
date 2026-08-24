"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Activity, Terminal, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const [pulseActive, setPulseActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#FAF9F6] border-b border-[#E6E6E8] overflow-hidden">
      {/* Subtle ambient light gradient in hero background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5200]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Copy & Actions */}
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

          {/* Right Column: 16:9 Interactive Architecture Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative w-full aspect-video rounded-xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_12px_40px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between p-5 sm:p-7 group">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6E6E8]" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#7C7D82]">
                  <Terminal className="w-3.5 h-3.5 text-[#FF5200]" />
                  <span>runtime.neominds.internal</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  HEALTHY
                </span>
              </div>

              {/* Central System Topology Visualizer */}
              <div className="py-4 sm:py-6 flex flex-col items-center justify-center relative">
                {/* Node Grid Layout */}
                <div className="w-full max-w-sm grid grid-cols-3 gap-3 text-center font-mono">
                  {/* Node 1 */}
                  <div
                    className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                      pulseActive === 0
                        ? "bg-[#FFF6F0] border-[#FF5200] shadow-xs"
                        : "bg-[#FAF9F6] border-[#E6E6E8]"
                    }`}
                  >
                    <span className="text-[10px] text-[#7C7D82] block">NODE_01</span>
                    <span className="text-xs font-bold text-[#121316] block mt-0.5">
                      AI Agent Engine
                    </span>
                    <span className="text-[9px] text-[#FF5200] font-semibold block mt-1">
                      {pulseActive === 0 ? "PROCESSING" : "READY"}
                    </span>
                  </div>

                  {/* Node 2 */}
                  <div
                    className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                      pulseActive === 1
                        ? "bg-[#FFF6F0] border-[#FF5200] shadow-xs"
                        : "bg-[#FAF9F6] border-[#E6E6E8]"
                    }`}
                  >
                    <span className="text-[10px] text-[#7C7D82] block">NODE_02</span>
                    <span className="text-xs font-bold text-[#121316] block mt-0.5">
                      PostgreSQL RAG
                    </span>
                    <span className="text-[9px] text-[#FF5200] font-semibold block mt-1">
                      {pulseActive === 1 ? "INDEXING" : "SYNCED"}
                    </span>
                  </div>

                  {/* Node 3 */}
                  <div
                    className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                      pulseActive === 2
                        ? "bg-[#FFF6F0] border-[#FF5200] shadow-xs"
                        : "bg-[#FAF9F6] border-[#E6E6E8]"
                    }`}
                  >
                    <span className="text-[10px] text-[#7C7D82] block">NODE_03</span>
                    <span className="text-xs font-bold text-[#121316] block mt-0.5">
                      Edge API Cluster
                    </span>
                    <span className="text-[9px] text-[#FF5200] font-semibold block mt-1">
                      {pulseActive === 2 ? "ROUTING" : "ACTIVE"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs text-[#7C7D82] font-sans">
                    Deterministic pipeline orchestration with real-time failover queues.
                  </span>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E6E6E8] text-[11px] text-[#7C7D82] font-mono">
                <span>Latency: 42ms</span>
                <span className="text-[#FF5200] font-semibold">16:9 Architecture Space</span>
                <span>Uptime: 99.98%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
