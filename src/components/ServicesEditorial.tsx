"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTransition } from "./motion/SectionTransition";
import { TravelingLine } from "./motion/TravelingLine";
import { trackEvent } from "@/lib/analytics";

const SERVICE_DNA_MAP: Record<string, string[]> = {
  "website-development": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Fast Edge Hosting"],
  "application-development": ["Web & Mobile Apps", "Cloud Backends", "PostgreSQL", "Live Sync"],
  "software-development": ["Custom APIs", "Automated Workflows", "Scalable Databases", "Cloud Setup"],
  "software-testing": ["Automated Tests", "Speed Checks", "Security Scans", "Bug Prevention"],
  "business-audits": ["Code Reviews", "Speed Audits", "Hosting Cost Reduction", "Action Plans"],
  "technical-consultation": ["Tech Architecture", "AI Tool Strategy", "1-on-1 Guidance", "Code Reviews"],
  "training": ["Modern React", "AI Workflows", "Hands-on Workshops", "Best Practices"],
};

export function ServicesEditorial() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isTakeover, setIsTakeover] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const lastIdxRef = useRef<number>(0);
  const lastTakeoverRef = useRef<boolean>(false);

  const totalServices = SERVICES_DATA.length;
  const activeService = SERVICES_DATA[activeIdx] || SERVICES_DATA[0];
  const activeDnaTokens = SERVICE_DNA_MAP[activeService.slug] || ["React", "Next.js", "API", "Cloud", "PostgreSQL"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalServices * 320}`, // Snappy, effortless scroll distance
          pin: pinContainer,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.2,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * totalServices),
              totalServices - 1
            );

            if (index !== lastIdxRef.current) {
              lastIdxRef.current = index;
              setActiveIdx(index);
              trackEvent({
                action: "service_machine_step",
                category: "service_inspection",
                label: SERVICES_DATA[index]?.title || `Service 0${index + 1}`,
              });
            }

            const takeover = progress >= 0.22 && progress <= 0.35;
            if (takeover !== lastTakeoverRef.current) {
              lastTakeoverRef.current = takeover;
              setIsTakeover(takeover);
            }
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [totalServices]);

  const titleWords = activeService.title.split(" ");
  const firstWord = titleWords[0] || "";
  const remainingWords = titleWords.slice(1).join(" ");

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#FAF9F6] text-[#121316] select-none"
    >
      <div
        ref={pinContainerRef}
        className="min-h-screen flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full will-change-transform"
      >
        {/* Section Header */}
        <div>
          <SectionTransition
            number="02"
            label="What We Build"
          />

          <div className="pt-2 pb-5 flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E6E6E8]">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#121316] font-serif uppercase">
                Services
              </h2>
            </div>

            {/* Simple Rolling Counter */}
            <div className="flex items-baseline gap-2 mt-4 sm:mt-0 font-sans">
              <div className="h-6 overflow-hidden relative flex items-center font-bold text-lg text-[#1E5FD8]">
                <div
                  className="transition-transform duration-300 ease-out flex flex-col"
                  style={{ transform: `translateY(-${activeIdx * 100}%)` }}
                >
                  {SERVICES_DATA.map((_, i) => (
                    <span key={i} className="h-6 flex items-center">
                      0{i + 1}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-xs text-[#7C7D82] font-semibold">of 0{totalServices}</span>
            </div>
          </div>
        </div>

        {/* ZERO CARDS: Spatial Typography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start my-auto py-4">
          {/* Left Column: Service Titles */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            {SERVICES_DATA.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={service.slug}
                  onClick={() => setActiveIdx(idx)}
                  className="cursor-pointer group transition-all duration-300 select-none"
                  data-cursor
                  data-cursor-text="SELECT"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span
                      className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-[#1E5FD8]"
                          : "text-[#B0B1B6] group-hover:text-[#7C7D82]"
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    <h3
                      className={`font-serif font-bold tracking-tight uppercase transition-all duration-300 ${
                        isActive
                          ? "text-2xl sm:text-4xl lg:text-5xl text-[#121316] translate-x-2"
                          : "text-base sm:text-xl text-[#A0A1A6] hover:text-[#505156] translate-x-0"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {isActive && (
                    <div className="w-16 h-[2px] bg-[#1E5FD8] mt-1.5 ml-7 sm:ml-8 will-change-transform" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Service Details (ZERO CARDS) */}
          <div className="lg:col-span-6 lg:border-l lg:border-[#E6E6E8] lg:pl-10 space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#1E5FD8] uppercase tracking-wider block">
                0{activeIdx + 1} // {activeService.title}
              </span>

              <div className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121316] leading-tight">
                <span className="inline-block transition-transform duration-300 ease-out">
                  {firstWord}
                </span>{" "}
                <span className="inline-block text-[#1E5FD8] transition-transform duration-300 ease-out">
                  {remainingWords}
                </span>
              </div>

              <p className="text-base text-[#4A4B50] font-sans leading-relaxed pt-1">
                {activeService.shortDescription}
              </p>
            </div>

            {/* Tools We Use */}
            <div className="pt-3 border-t border-[#E6E6E8] space-y-2">
              <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block">
                Tools & Frameworks:
              </span>
              <div className="flex flex-wrap items-center gap-2 font-sans text-xs">
                {activeDnaTokens.map((token, i) => (
                  <span
                    key={i}
                    className="bg-[#EDF4FF] text-[#1E5FD8] px-3 py-1 font-medium border border-[#1E5FD8]/20"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="pt-3 border-t border-[#E6E6E8] space-y-1.5">
              <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block mb-1.5">
                What You Get:
              </span>
              {activeService.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-xs sm:text-sm font-sans text-[#121316] py-1 border-b border-[#F0EFEB] last:border-none"
                >
                  <span className="text-[#1E5FD8] font-bold text-xs">
                    ✓
                  </span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Link */}
            <div className="pt-2">
              <Link
                href={`/services/${activeService.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E5FD8] hover:text-[#10316B] uppercase tracking-wider group min-h-[44px]"
                data-cursor
                data-cursor-text="VIEW"
              >
                <span>Learn more about {activeService.title}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Full-viewport Takeover Banner */}
        {isTakeover && (
          <div className="fixed inset-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md flex flex-col justify-between p-8 sm:p-14 pointer-events-none transition-opacity duration-300">
            <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4">
              <span className="text-xs text-[#1E5FD8] font-bold uppercase tracking-wider">
                FEATURED SERVICE // 02
              </span>
              <span className="text-xs text-[#7C7D82]">
                Custom Software & Apps
              </span>
            </div>

            <div className="my-auto text-center space-y-4">
              <h2 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#121316] tracking-tight uppercase leading-none will-change-transform">
                Application
              </h2>
              <h3 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-[#1E5FD8] tracking-tight uppercase leading-none">
                Development
              </h3>
              <p className="text-sm sm:text-base text-[#4A4B50] max-w-xl mx-auto pt-2 font-sans">
                Fast web apps and mobile tools built to handle thousands of users smoothly without crashing.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#7C7D82] border-t border-[#E6E6E8] pt-4 font-sans">
              <span>Neominds Services</span>
              <span>Scroll to see more services</span>
            </div>
          </div>
        )}

        <TravelingLine className="mt-4" />
      </div>
    </section>
  );
}
