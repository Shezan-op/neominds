"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

interface NavbarProps {
  onOpenContact: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  isCenterBrand?: boolean;
}

const NAV_ITEMS: NavLinkItem[] = [
  { id: "services", label: "Services", href: "/#services" },
  { id: "case-studies", label: "Case studies", href: "/#case-studies" },
  { id: "brand", label: "Neominds", href: "/", isCenterBrand: true },
  { id: "about-us", label: "About us", href: "/#why-us" },
  { id: "industries", label: "Industries", href: "/#industries" },
];

export function Navbar({ onOpenContact }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Immediately hide navbar while actively scrolling
      setIsVisible(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Show navbar ONLY after user has stopped scrolling for 1.5 seconds (1500ms)
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollThreshold = 180;
        if (window.scrollY > scrollThreshold) {
          setIsVisible(true);
        }
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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
      className={`fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-sans ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6"
      }`}
    >
      <div className="pointer-events-auto max-w-5xl">
        {/* SHARP RECTANGULAR NAVBAR BAR */}
        <div
          onMouseLeave={() => {
            setHoveredIdx(null);
            setServicesOpen(false);
          }}
          className="relative bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-none px-0 py-0 flex items-stretch text-[#121316] overflow-hidden"
        >
          {/* DESKTOP NAV ITEMS WITH FLUSH SPOTLIGHT CONE */}
          <nav className="hidden md:flex items-stretch font-sans">
            {NAV_ITEMS.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              const isCenter = item.isCenterBrand;

              return (
                <div
                  key={item.id}
                  ref={item.id === "services" ? dropdownRef : undefined}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    if (item.id === "services") {
                      setServicesOpen(true);
                    } else {
                      setServicesOpen(false);
                    }
                  }}
                  className="relative flex items-center justify-center min-h-[48px] px-5 lg:px-6 cursor-pointer select-none overflow-hidden"
                >
                  {/* FLUSH TRIANGULAR / TRAPEZOID SPOTLIGHT CONE */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId="navbar-spotlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-start"
                      >
                        {/* Conical Trapezoid Spotlight Shape flush from top:0 to bottom:0 */}
                        <div
                          className="w-full h-full"
                          style={{
                            clipPath: "polygon(26% 0%, 74% 0%, 100% 100%, 0% 100%)",
                            background:
                              "linear-gradient(180deg, #FFFFFF 0%, #93C5FD 18%, #1E5FD8 55%, #1546A6 100%)",
                          }}
                        />

                        {/* Top Bright White Light Emitter Bar */}
                        <div className="absolute top-0 w-8 h-[2px] bg-white rounded-none shadow-[0_0_8px_#FFFFFF]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Nav Item Text Label (Source Sans 3 Font Only) */}
                  <Link
                    href={item.href}
                    className={`relative z-10 transition-colors duration-200 flex items-center gap-1 font-sans text-[13px] ${
                      isCenter
                        ? "font-bold text-[14px] tracking-tight"
                        : "font-semibold"
                    } ${
                      isHovered
                        ? "text-white font-bold"
                        : "text-[#121316] hover:text-[#121316]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.id === "services" && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          servicesOpen && isHovered ? "rotate-180 text-white" : "text-[#7C7D82]"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu for Services */}
                  {item.id === "services" && servicesOpen && (
                    <div
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="absolute top-full left-0 mt-0 w-80 bg-[#FFFFFF] border border-[#E6E6E8] shadow-2xl p-2.5 z-50 text-[#121316] rounded-none animate-in fade-in slide-in-from-top-2 duration-150 font-sans"
                    >
                      <div className="px-3 py-1.5 border-b border-[#E6E6E8] mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
                          Capabilities & Systems
                        </span>
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        {SERVICES_DATA.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="group flex items-start justify-between p-2 hover:bg-[#FAF9F6] transition-colors rounded-none font-sans"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-[#121316] group-hover:text-[#1E5FD8] transition-colors font-sans">
                                {service.title}
                              </span>
                              <span className="text-[10px] text-[#7C7D82] line-clamp-1 mt-0.5 font-sans">
                                {service.shortDescription}
                              </span>
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-[#7C7D82] opacity-0 group-hover:opacity-100 group-hover:text-[#1E5FD8] transition-all flex-shrink-0 mt-0.5" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* FAR RIGHT: SHARP RECTANGULAR BUTTON "Contact us →" */}
          <div className="hidden md:flex items-center pl-3 pr-3 my-auto">
            <button
              type="button"
              onClick={onOpenContact}
              className="bg-[#1E5FD8] hover:bg-[#174CB3] text-white text-[12px] font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-none flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Contact us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE VIEWPORT CONTROLS */}
          <div className="flex md:hidden items-center justify-between w-full min-w-[280px] px-4 py-2.5 font-sans">
            <Link
              href="/"
              className="font-sans font-bold text-sm text-[#121316] uppercase"
            >
              Neominds
            </Link>

            <div className="flex items-center gap-2 font-sans">
              <button
                type="button"
                onClick={onOpenContact}
                className="bg-[#1E5FD8] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-none"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[#121316] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 inset-x-4 bg-[#FFFFFF] border border-[#E6E6E8] p-5 shadow-2xl max-w-sm mx-auto text-[#121316] rounded-none pointer-events-auto font-sans">
          <div className="py-2 border-b border-[#E6E6E8]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7D82] block mb-2 font-sans">
              Services
            </span>
            <div className="grid grid-cols-1 gap-1">
              {SERVICES_DATA.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 text-xs text-[#121316] hover:text-[#1E5FD8] hover:bg-[#FAF9F6] flex items-center justify-between transition-colors rounded-none font-sans"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7C7D82]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2 py-3 font-sans">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Services
            </Link>
            <Link
              href="/#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Case studies
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              About us
            </Link>
            <Link
              href="/#industries"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Industries
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full bg-[#1E5FD8] text-white text-xs uppercase tracking-wider font-bold py-2.5 rounded-none flex items-center justify-center gap-1.5 font-sans"
            >
              <span>Contact us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
