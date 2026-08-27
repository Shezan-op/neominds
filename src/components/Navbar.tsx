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
      className={`fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6"
      }`}
    >
      <div className="pointer-events-auto">
        {/* Rounded Navbar Pill Container matching the reference image */}
        <div
          onMouseLeave={() => {
            setHoveredIdx(null);
            setServicesOpen(false);
          }}
          className="relative bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_12px_36px_rgba(0,0,0,0.08)] rounded-2xl sm:rounded-full px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 text-[#121316]"
        >
          {/* DESKTOP NAV ITEMS WITH TRIANGULAR SPOTLIGHT CONE HOVER */}
          <nav className="hidden md:flex items-center">
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
                  className="relative flex items-center justify-center min-h-[46px] px-4 sm:px-5 cursor-pointer select-none"
                >
                  {/* TRIANGULAR / TRAPEZOID SPOTLIGHT CONE ON HOVER */}
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
                        className="absolute inset-y-0 inset-x-0 -my-1 z-0 pointer-events-none flex flex-col items-center justify-start overflow-hidden"
                      >
                        {/* Conical Trapezoid Spotlight Shape with Royal Sapphire Gradient */}
                        <div
                          className="w-full h-full"
                          style={{
                            clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
                            background:
                              "linear-gradient(180deg, #FFFFFF 0%, #93C5FD 18%, #1E5FD8 55%, #1546A6 100%)",
                            boxShadow: "0 12px 28px -4px rgba(30, 95, 216, 0.5)",
                          }}
                        />

                        {/* Top Bright White Light Emitter Bar */}
                        <div className="absolute top-0 w-8 h-[2px] bg-white rounded-full shadow-[0_0_8px_#FFFFFF]" />

                        {/* Bottom Ambient Glow Floor */}
                        <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-[#1546A6]/60 to-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Nav Item Text Label */}
                  <Link
                    href={item.href}
                    className={`relative z-10 transition-colors duration-200 flex items-center gap-1 text-[13px] font-sans ${
                      isCenter
                        ? "font-serif font-bold text-[15px] tracking-tight"
                        : "font-semibold"
                    } ${
                      isHovered
                        ? "text-white"
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

                  {/* Dropdown Menu for Services when hovered */}
                  {item.id === "services" && servicesOpen && (
                    <div
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="absolute top-full left-0 mt-3 w-80 bg-[#FFFFFF] border border-[#E6E6E8] shadow-2xl p-2.5 z-50 text-[#121316] rounded-xl animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-3 py-1.5 border-b border-[#E6E6E8] mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7D82]">
                          Capabilities & Systems
                        </span>
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        {SERVICES_DATA.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="group flex items-start justify-between p-2 hover:bg-[#FAF9F6] transition-colors rounded-lg"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-[#121316] group-hover:text-[#1E5FD8] transition-colors">
                                {service.title}
                              </span>
                              <span className="text-[10px] text-[#7C7D82] line-clamp-1 mt-0.5">
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

          {/* FAR RIGHT: SOLID ROYAL SAPPHIRE BLUE BUTTON "Contact us →" */}
          <div className="hidden md:block pl-2">
            <button
              type="button"
              onClick={onOpenContact}
              className="bg-[#1E5FD8] hover:bg-[#174CB3] text-white text-[12px] font-sans font-semibold px-4 py-2 rounded-xl sm:rounded-full flex items-center gap-1.5 transition-all shadow-[0_4px_14px_rgba(30,95,216,0.35)] cursor-pointer"
            >
              <span>Contact us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE VIEWPORT CONTROLS */}
          <div className="flex md:hidden items-center justify-between w-full min-w-[280px] px-2 py-1">
            <Link
              href="/"
              className="font-serif font-bold text-base text-[#121316]"
            >
              Neominds
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenContact}
                className="bg-[#1E5FD8] text-white text-xs font-semibold px-3 py-1.5 rounded-full"
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
        <div className="md:hidden fixed top-20 inset-x-4 bg-[#FFFFFF] border border-[#E6E6E8] p-5 shadow-2xl max-w-sm mx-auto text-[#121316] rounded-2xl pointer-events-auto">
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
                  className="py-1.5 px-2 text-xs text-[#121316] hover:text-[#1E5FD8] hover:bg-[#FAF9F6] flex items-center justify-between transition-colors rounded-lg"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7C7D82]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2 py-3">
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
              className="w-full bg-[#1E5FD8] text-white text-xs uppercase tracking-wider font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
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
