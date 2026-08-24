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
    <footer className="bg-[#FAF9F6] border-t border-[#E6E6E8] text-[#4A4B50] pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-[#E6E6E8]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-sm bg-[#121316] text-[#FAF9F6] flex items-center justify-center font-serif text-lg">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm tracking-tight text-[#121316] uppercase leading-none">
                  NEOMINDS
                </span>
                <span className="font-sans text-[10px] text-[#7C7D82] tracking-wider uppercase leading-tight mt-0.5">
                  Technology Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#4A4B50] font-sans leading-relaxed max-w-sm pt-2">
              Neominds is an applied technology solutions company. We engineer custom software, practical AI systems, web applications, and automated workflows for growing businesses.
            </p>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#121316] block">
              Services
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-[#4A4B50]">
              {SERVICES_DATA.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-[#FF5200] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#121316] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-[#4A4B50]">
              <li>
                <Link href="/#services" className="hover:text-[#FF5200] transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="hover:text-[#FF5200] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-[#FF5200] transition-colors">
                  Why Neominds
                </Link>
              </li>
              <li>
                <Link href="/#about-us" className="hover:text-[#FF5200] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#FF5200] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Engagement Column */}
          <div className="space-y-4">
            <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#121316] block">
              Direct Contact
            </span>
            <p className="text-xs text-[#7C7D82] font-sans leading-relaxed">
              Book a direct consultation with a senior software engineer.
            </p>
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-xs uppercase tracking-wider font-bold px-4 py-2.5 w-full text-center"
              >
                <span>Contact Engineering</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C7D82] font-sans">
          <span>© {currentYear} Neominds. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span>Built with Next.js and TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
