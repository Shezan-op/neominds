"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const lastIdxRef = useRef<number>(0);

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
          end: `+=${totalServices * 320}`,
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
                label: SERVICES_DATA[index]?.title || `Service ${index + 1}`,
              });
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
          <div className="pt-2 pb-5 flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E6E6E8]">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#121316] font-serif uppercase">
              Services
            </h2>
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
                  className="cursor-pointer group transition-all duration-200 select-none"
                  data-cursor
                  data-cursor-text="SELECT"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <h3
                      className={`font-serif font-bold tracking-tight uppercase transition-all duration-200 ${
                        isActive
                          ? "text-2xl sm:text-4xl lg:text-5xl text-[#121316] translate-x-2"
                          : "text-base sm:text-xl text-[#A0A1A6] hover:text-[#505156] translate-x-0"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {isActive && (
                    <div className="w-16 h-[2px] bg-[#1E5FD8] mt-1.5 will-change-transform" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Service Details (ZERO CARDS, ZERO BADGES) */}
          <div className="lg:col-span-6 lg:border-l lg:border-[#E6E6E8] lg:pl-10 space-y-5">
            <div className="space-y-3">
              <div className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121316] leading-tight">
                <span className="inline-block transition-transform duration-200 ease-out">
                  {firstWord}
                </span>{" "}
                <span className="inline-block text-[#1E5FD8] transition-transform duration-200 ease-out">
                  {remainingWords}
                </span>
              </div>

              <p className="text-base text-[#4A4B50] font-sans leading-relaxed pt-1">
                {activeService.shortDescription}
              </p>
            </div>

            {/* Tools We Use: Pure Typography */}
            <div className="pt-3 border-t border-[#E6E6E8] space-y-1.5">
              <span className="text-xs font-bold text-[#7C7D82] uppercase tracking-wider block">
                Tools & Frameworks:
              </span>
              <p className="text-sm font-sans font-medium text-[#1E5FD8]">
                {activeDnaTokens.join("  •  ")}
              </p>
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

        <TravelingLine className="mt-4" />
      </div>
    </section>
  );
}
