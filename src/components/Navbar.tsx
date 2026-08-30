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
      setIsVisible(scrollY > 100);

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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 flex justify-center pointer-events-none transition-all duration-300 ease-out font-sans ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <nav
        className="w-full max-w-5xl flex items-center justify-between pointer-events-auto select-none"
        aria-label="Main Navigation"
      >
        {/* Left Side: Mobile Logo with Sharp Edges */}
        <div className="flex items-center md:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#121316] font-bold text-sm bg-white/90 backdrop-blur-md px-4 py-2 border border-[#E6E6E8] rounded-none shadow-sm"
          >
            <span className="text-[#1E5FD8]">❄</span>
            <span className="tracking-tight uppercase font-serif">neominds</span>
          </Link>
        </div>

        {/* 
          ======================================================================
          SHARP-EDGED EDITORIAL FLOATING NAVIGATION (DESKTOP)
          When hovered, text turns crisp WHITE on top of sliding dark box
          ======================================================================
        */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div
            onMouseLeave={() => setHoveredId(null)}
            className="relative flex items-center bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#E6E6E8] p-1.5 rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            {NAV_ITEMS.map((item) => {
              if (item.isCenterBrand) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="mx-3.5 px-3 py-2 flex items-center gap-2 font-serif font-bold text-sm text-[#121316] hover:text-[#1E5FD8] transition-colors group rounded-none"
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

              const isHovered = hoveredId === item.id;
              const isActive = activeSectionId === item.id && !hoveredId;
              const isServicesButton = item.id === "capabilities";

              if (isServicesButton) {
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      className={`relative px-4 py-2 text-xs font-medium rounded-none transition-colors duration-200 flex items-center gap-1.5 cursor-pointer z-10 ${
                        isHovered || (isActive && !servicesOpen)
                          ? "text-white font-semibold"
                          : "text-[#121316] hover:text-white"
                      }`}
                      data-cursor
                      data-cursor-text="CAPABILITIES"
                    >
                      {/* Sliding Sharp Dark Background: Turns text white on hover */}
                      {(isHovered || (isActive && !servicesOpen)) && (
                        <motion.div
                          layoutId="nav-pill-bg"
                          className="absolute inset-0 bg-[#121316] rounded-none z-[-1]"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}

                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180 text-[#60A5FA]" : ""
                        }`}
                      />
                    </button>

                    {/* Services Dropdown with Sharp Edges */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-3 w-80 bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 rounded-none z-50 space-y-1"
                        >
                          <div className="px-3.5 py-2 border-b border-[#F0EFEB] text-[11px] text-[#7C7D82] uppercase tracking-wider font-bold">
                            What We Build
                          </div>
                          {SERVICES_DATA.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center justify-between px-3.5 py-2.5 text-xs text-[#121316] hover:bg-[#121316] hover:text-white rounded-none transition-all group"
                            >
                              <span className="font-medium">
                                {service.title}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
                  className={`relative px-4 py-2 text-xs font-medium rounded-none transition-colors duration-200 cursor-pointer z-10 ${
                    isHovered || isActive
                      ? "text-white font-semibold"
                      : "text-[#121316] hover:text-white"
                  }`}
                  data-cursor
                  data-cursor-text={item.label.toUpperCase()}
                >
                  {/* Sliding Sharp Dark Background: Turns text white on hover */}
                  {(isHovered || isActive) && (
                    <motion.div
                      layoutId="nav-pill-bg"
                      className="absolute inset-0 bg-[#121316] rounded-none z-[-1]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Integrated Contact CTA Button with Sharp Edges */}
            <button
              type="button"
              onClick={() => {
                trackEvent({ action: "click_navbar_start_project", category: "cta", label: "Navbar CTA" });
                onOpenContact();
              }}
              className="ml-2 bg-[#1E5FD8] hover:bg-[#164fc0] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-none transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
              data-cursor
              data-cursor-text="CONTACT"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button with Sharp Edges */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] rounded-none shadow-sm cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-[#1E5FD8]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu with Sharp Edges */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-[#FAF9F6] p-6 z-40 flex flex-col justify-between md:hidden border-t border-[#E6E6E8]"
          >
            <div className="space-y-4 pt-4">
              {NAV_ITEMS.filter((item) => !item.isCenterBrand).map((item) => (
                <div key={item.id} className="border-b border-[#E6E6E8] pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xl font-serif font-bold text-[#121316]"
                  >
                    <span>{item.label}</span>
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
                className="w-full bg-[#1E5FD8] hover:bg-[#164fc0] py-3.5 text-xs font-bold uppercase tracking-wider text-white rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
