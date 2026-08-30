"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MobileStickyCTAProps {
  onOpenContact: () => void;
}

export function MobileStickyCTA({ onOpenContact }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Only show on mobile when scrolled past hero (400px) and not at footer bottom
      if (scrollY > 400 && scrollY < docHeight - 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <button
        type="button"
        onClick={() => {
          trackEvent({ action: "click_mobile_sticky_cta", category: "cta", label: "Mobile Sticky CTA" });
          onOpenContact();
        }}
        className="w-full bg-[#1E5FD8] text-white py-3.5 px-5 shadow-2xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between border border-white/20 active:scale-[0.98] transition-transform min-h-[48px] cursor-pointer"
      >
        <span>Start a Project</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
