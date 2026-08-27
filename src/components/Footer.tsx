"use client";

import React from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data";

interface FooterProps {
  onOpenContact?: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full text-white font-sans overflow-hidden border-t border-[#1E293B] select-none">
      {/* SPHERICAL CIRCULAR MIDNIGHT SAPPHIRE & WHITE GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-[#030611] pointer-events-none" />

      {/* Radial spherical glow simulating the circular world loop with the hero section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-85"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 100%, rgba(96, 165, 250, 0.32) 0%, rgba(30, 95, 216, 0.48) 32%, rgba(16, 49, 107, 0.75) 58%, rgba(8, 25, 61, 0.96) 82%, #030611 100%)",
        }}
      />

      {/* Subtle ambient diagonal light streak matching Fargo aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.12) 45%, rgba(96, 165, 250, 0.15) 50%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-0">
        {/* TOP ROW: 3 Columns matching Fargo Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10">
          {/* Left Column: Copyright, Social Buttons & Subtitle */}
          <div className="md:col-span-5 space-y-6">
            <span className="text-xs font-mono text-white/50 block">
              © {currentYear} Neominds LLC
            </span>

            {/* Dark Glass Social Icon Buttons */}
            <div className="flex items-center gap-2.5">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 min-h-[44px] min-w-[44px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#60A5FA] text-white/70 hover:text-white flex items-center justify-center transition-all rounded-none shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 min-h-[44px] min-w-[44px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#60A5FA] text-white/70 hover:text-white flex items-center justify-center transition-all rounded-none shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 min-h-[44px] min-w-[44px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#60A5FA] text-white/70 hover:text-white flex items-center justify-center transition-all rounded-none shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M21.582 6.186a2.76 2.76 0 0 0-1.942-1.956C17.928 3.75 12 3.75 12 3.75s-5.928 0-7.64.48A2.76 2.76 0 0 0 2.418 6.186C1.94 7.91 1.94 11.5 1.94 11.5s0 3.59.478 5.314a2.76 2.76 0 0 0 1.942 1.956c1.712.48 7.64.48 7.64.48s5.928 0 7.64-.48a2.76 2.76 0 0 0 1.942-1.956c.478-1.724.478-5.314.478-5.314s0-3.59-.478-5.314zM9.96 14.85V8.15l5.88 3.35-5.88 3.35z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 min-h-[44px] min-w-[44px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#60A5FA] text-white/70 hover:text-white flex items-center justify-center transition-all rounded-none shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-sans pt-1">
              Neominds is an applied technology solutions company. We engineer deterministic custom software, autonomous AI systems, and cloud infrastructure with 100% client code ownership.
            </p>
          </div>

          {/* Middle Column: Capabilities / Our Product */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA] block">
              Capabilities
            </span>
            <ul className="space-y-2.5 text-xs text-white/70">
              {SERVICES_DATA.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Company & Navigation */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA] block">
              Company
            </span>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-white transition-colors">
                  Why Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Engineering
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION: HUGE DISPLAY WORDMARK "neominds" (CENTERED) */}
        <div className="w-full pt-8 sm:pt-14 pb-0 overflow-hidden flex items-end justify-center text-center">
          <h2
            className="text-white font-serif font-bold tracking-tighter leading-none select-none text-center w-full -mb-3 sm:-mb-6 opacity-95"
            style={{
              fontSize: "clamp(4.5rem, 16vw, 18rem)",
              textShadow: "0 0 80px rgba(96, 165, 250, 0.3)",
            }}
          >
            neominds
          </h2>
        </div>
      </div>
    </footer>
  );
}
