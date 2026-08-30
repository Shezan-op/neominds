"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("neominds_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("neominds_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("neominds_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent settings"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#FAF9F6] border border-[#E6E6E8] shadow-2xl p-4 sm:p-5 select-none animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#1E5FD8] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Cookie Preferences</span>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          className="text-[#7C7D82] hover:text-[#121316] p-1 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
          aria-label="Dismiss cookie banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="mt-2 text-xs text-[#4A4B50] leading-relaxed">
        We use essential cookies to keep this site fast and responsive. Read our{" "}
        <Link href="/privacy" className="text-[#1E5FD8] underline font-medium">
          Privacy Policy
        </Link>{" "}
        to learn more.
      </p>

      <div className="mt-3 flex items-center justify-end gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={handleDecline}
          className="px-3 py-1.5 text-[#7C7D82] hover:text-[#121316] cursor-pointer"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="px-4 py-1.5 bg-[#1E5FD8] hover:bg-[#174CB3] text-white cursor-pointer shadow-xs"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
