"use client";

import React, { useState, useEffect, useRef } from "react";
import { NUMBER_CHANGER_STATS } from "@/lib/data";
import { TrendingUp, Users, Award, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTransition } from "./motion/SectionTransition";
import { DrawLine } from "./motion/DrawLine";
import { TextFillScroll } from "./motion/TextFillScroll";

function ResolvingNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const targetStr = value.toString();
  const [displayChars, setDisplayChars] = useState(
    targetStr.replace(/[0-9]/g, "-")
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    let isMounted = true;
    let timer: NodeJS.Timeout | null = null;
    const chars = "0123456789";

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (hasAnimatedRef.current || !isMounted) return;
        hasAnimatedRef.current = true;

        let step = 0;
        const totalSteps = 20;

        timer = setInterval(() => {
          if (!isMounted) {
            if (timer) clearInterval(timer);
            return;
          }
          step++;
          const progress = step / totalSteps;

          const nextStr = targetStr
            .split("")
            .map((digit, idx) => {
              const charProgress = (idx + 1) / targetStr.length;
              if (progress >= charProgress) return digit;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

          setDisplayChars(nextStr);

          if (step >= totalSteps) {
            if (timer) clearInterval(timer);
            setDisplayChars(targetStr);
          }
        }, 40);
      },
    });

    return () => {
      isMounted = false;
      if (timer) clearInterval(timer);
      trigger.kill();
    };
  }, [targetStr]);

  return (
    <div ref={containerRef} className="flex items-baseline gap-1 my-2 select-none">
      <span className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#121316] tracking-tight tabular-nums font-bold">
        {displayChars}
      </span>
      <span className="text-3xl sm:text-4xl font-serif text-[#1E5FD8] font-bold">
        {suffix}
      </span>
    </div>
  );
}

export function NumberChangerSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getStatIcon = (id: string) => {
    switch (id) {
      case "projects":
        return <TrendingUp className="w-4 h-4 text-[#1E5FD8]" />;
      case "team":
        return <Users className="w-4 h-4 text-[#1E5FD8]" />;
      case "experience":
        return <Award className="w-4 h-4 text-[#1E5FD8]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#1E5FD8]" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="telemetry"
      className="py-16 sm:py-24 bg-[#FAF9F6] text-[#121316] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean, Simple Section Header */}
        <SectionTransition
          number="01"
          label="Proven Results"
        />

        {/* Section Headline with TextFillScroll */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <TextFillScroll
              text="Real results from real projects built for growing businesses."
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight font-bold"
              fillColor="#121316"
              baseColor="#A5A6AC"
            />
          </div>
          <p className="text-sm sm:text-base text-[#4A4B50] font-sans max-w-sm">
            We build software that helps companies grow faster, save hours of manual work, and delight their users.
          </p>
        </div>

        {/* Progressive Hairline Dividers & Clean Editorial Layout */}
        <div className="relative">
          <DrawLine orientation="horizontal" color="#E6E6E8" className="mb-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6E6E8]">
            {NUMBER_CHANGER_STATS.map((stat) => (
              <div
                key={stat.id}
                className="py-8 md:py-10 px-0 md:px-8 lg:px-10 first:pl-0 last:pr-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 pb-2">
                    {getStatIcon(stat.id)}
                    <span className="text-xs font-semibold text-[#7C7D82] uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>

                  {/* Character-Level Resolving Number */}
                  <ResolvingNumber value={stat.value} suffix={stat.suffix} />

                  {/* Subtext description */}
                  <p className="text-sm text-[#4A4B50] font-sans leading-relaxed mt-2">
                    {stat.subtext}
                  </p>
                </div>

                {/* Bottom Footnote */}
                <div className="mt-6 pt-4 border-t border-[#E6E6E8]/70 flex items-center gap-2 text-xs text-[#7C7D82] font-sans">
                  <span>{stat.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <DrawLine orientation="horizontal" color="#E6E6E8" className="mt-0" />
        </div>
      </div>
    </section>
  );
}
