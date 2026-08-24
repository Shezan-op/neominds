"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

interface FooterProps {
  onOpenContact?: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050507] border-t border-[#222530] text-[#CBD0DE] pt-16 sm:pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-[#222530]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-[#FF5200] text-white flex items-center justify-center font-serif text-lg font-bold rounded-none">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm tracking-tight text-[#FFFFFF] uppercase leading-none">
                  NEOMINDS
                </span>
                <span className="font-sans text-[10px] text-[#A0A4B8] tracking-wider uppercase leading-tight mt-0.5">
                  Technology Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#E2E5EE] leading-relaxed max-w-sm pt-2">
              Neominds is an applied technology solutions company. We engineer custom enterprise software, deterministic AI systems, web applications, and automated workflows.
            </p>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block">
              Capabilities
            </span>
            <ul className="space-y-2.5 text-xs text-[#CBD0DE]">
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-[#CBD0DE]">
              <li>
                <Link href="/#services" className="hover:text-[#FF5200] transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/#workflow" className="hover:text-[#FF5200] transition-colors">
                  Workflow
                </Link>
              </li>
              <li>
                <Link href="/#dossier" className="hover:text-[#FF5200] transition-colors">
                  Vault
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
            </ul>
          </div>

          {/* Direct Engagement Column */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block">
              Direct Contact
            </span>
            <p className="text-xs text-[#CBD0DE] leading-relaxed">
              Book a direct consultation with a senior software architect.
            </p>
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-xs uppercase tracking-wider font-bold px-4 py-2.5 w-full text-center flex items-center justify-center gap-2 text-white rounded-none"
              >
                <span>Contact Engineering</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0A4B8]">
          <span>© {currentYear} Neominds. 100% Client Code Ownership.</span>
          <div className="flex items-center gap-6">
            <span>Deterministic Software & AI Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
