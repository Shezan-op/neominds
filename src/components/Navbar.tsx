"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  onOpenContact: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  sectionId?: string;
  isCenterBrand?: boolean;
}

const NAV_ITEMS: NavLinkItem[] = [
  { id: "capabilities", label: "Capabilities", href: "/#services", sectionId: "services" },
  { id: "case-studies", label: "Case studies", href: "/#case-studies", sectionId: "case-studies" },
  { id: "brand", label: "Neominds", href: "/", isCenterBrand: true },
  { id: "about-us", label: "About us", href: "/#why-us", sectionId: "why-us" },
  { id: "industries", label: "Industries", href: "/#industries", sectionId: "industries" },
];

export function Navbar({ onOpenContact }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("capabilities");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 120);

      // Track active section for traveling blue marker
      const sections = ["services", "case-studies", "industries", "why-us"];
      const currentPos = scrollY + 300;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentPos >= top && currentPos < top + height) {
            const matchedItem = NAV_ITEMS.find((item) => item.sectionId === sectionId);
            if (matchedItem) {
              setActiveSectionId(matchedItem.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const effectiveMarkerId = hoveredId || activeSectionId;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 flex justify-center pointer-events-none transition-all duration-300 ease-out font-serif ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <nav
        className="w-full max-w-7xl flex items-center justify-between pointer-events-auto select-none"
        aria-label="Main Navigation"
      >
        {/* Left Side: Mobile Logo */}
        <div className="flex items-center md:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#121316] font-bold text-sm bg-white/90 backdrop-blur-md px-3.5 py-2 border border-[#E6E6E8] shadow-sm"
          >
            <span className="text-[#1E5FD8]">❄</span>
            <span className="tracking-tight uppercase">neominds</span>
          </Link>
        </div>

        {/* 
          ======================================================================
          CENTER PILL NAVIGATION (DESKTOP) WITH TRAVELING BLUE MARKER
          ======================================================================
        */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="relative flex items-center bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E6E6E8] px-2 py-1.5 shadow-sm">
            {NAV_ITEMS.map((item) => {
              if (item.isCenterBrand) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="mx-3.5 flex items-center gap-1.5 font-serif font-bold text-sm text-[#121316] hover:text-[#1E5FD8] transition-colors group"
                    data-cursor
                    data-cursor-text="NEOMINDS"
                  >
                    <span className="text-[#1E5FD8] group-hover:rotate-45 transition-transform duration-300">
                      ❄
                    </span>
                    <span className="tracking-tight uppercase">{item.label}</span>
                  </Link>
                );
              }

              const isMarkerTarget = effectiveMarkerId === item.id;
              const isServicesButton = item.id === "capabilities";

              if (isServicesButton) {
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`relative px-3.5 py-1.5 text-xs font-sans font-medium transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                        isMarkerTarget ? "text-[#1E5FD8] font-semibold" : "text-[#4A4B50] hover:text-[#121316]"
                      }`}
                      data-cursor
                      data-cursor-text="CAPABILITIES"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180 text-[#1E5FD8]" : ""
                        }`}
                      />

                      {/* Traveling Active Blue Marker */}
                      {isMarkerTarget && (
                        <motion.div
                          layoutId="nav-traveling-marker"
                          className="absolute bottom-0 inset-x-2 h-[2px] bg-[#1E5FD8]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Services Dropdown */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-80 bg-[#FFFFFF] border border-[#E6E6E8] shadow-2xl p-2 z-50 space-y-1"
                        >
                          <div className="px-3 py-1.5 border-b border-[#F0EFEB] font-mono text-[10px] text-[#7C7D82] uppercase tracking-wider font-bold">
                            CORE CAPABILITY DOSSIERS
                          </div>
                          {SERVICES_DATA.map((service, i) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center justify-between px-3 py-2 text-xs font-sans text-[#121316] hover:bg-[#FAF9F6] hover:text-[#1E5FD8] transition-colors group"
                            >
                              <span className="font-medium">
                                0{i + 1} {service.title}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative px-3.5 py-1.5 text-xs font-sans font-medium transition-colors duration-200 ${
                    isMarkerTarget ? "text-[#1E5FD8] font-semibold" : "text-[#4A4B50] hover:text-[#121316]"
                  }`}
                  data-cursor
                  data-cursor-text={item.label.toUpperCase()}
                >
                  <span>{item.label}</span>

                  {/* Traveling Active Blue Marker */}
                  {isMarkerTarget && (
                    <motion.div
                      layoutId="nav-traveling-marker"
                      className="absolute bottom-0 inset-x-2 h-[2px] bg-[#1E5FD8]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side: Primary Contact CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              trackEvent({ action: "click_navbar_start_project", category: "cta", label: "Navbar CTA" });
              onOpenContact();
            }}
            className="hidden sm:inline-flex btn-primary text-xs uppercase tracking-wider font-bold px-4 py-2 text-white shadow-sm cursor-pointer"
            data-cursor
            data-cursor-text="START"
          >
            Start a Project
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-[#1E5FD8]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-[#FAF9F6] p-6 z-40 flex flex-col justify-between md:hidden border-t border-[#E6E6E8]"
          >
            <div className="space-y-4 pt-4">
              <span className="text-[10px] font-mono font-bold text-[#1E5FD8] uppercase tracking-widest block">
                SYSTEM NAVIGATION //
              </span>
              {NAV_ITEMS.filter((item) => !item.isCenterBrand).map((item, idx) => (
                <div key={item.id} className="border-b border-[#E6E6E8] pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xl font-serif font-bold text-[#121316]"
                  >
                    <span>
                      0{idx + 1} {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#1E5FD8]" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[#E6E6E8]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full btn-primary py-3.5 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
