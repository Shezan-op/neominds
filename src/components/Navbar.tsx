"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Immediately hide navbar while user is actively scrolling
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
      className={`fixed top-0 inset-x-0 z-50 py-2 sm:py-2.5 px-3 sm:px-4 lg:px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md border border-[#E6E6E8] shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-4 sm:px-5 py-1.5 sm:py-2 text-[#121316] transition-all rounded-none">
          <div className="flex items-center justify-between">
            {/* Logo with Compact Profile */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="Neominds Home"
            >
              <div className="w-6 h-6 bg-[#1E5FD8] text-white flex items-center justify-center font-serif text-sm font-bold transition-transform group-hover:scale-105 rounded-none shadow-xs">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-[13px] tracking-tight text-[#121316] uppercase leading-none">
                  NEOMINDS
                </span>
                <span className="font-sans text-[8.5px] text-[#7C7D82] tracking-wider uppercase leading-tight mt-0.5">
                  Tech Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 font-sans">
              {/* Capabilities Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#4A4B50] hover:text-[#1E5FD8] transition-colors py-1 focus:outline-none cursor-pointer"
                  aria-expanded={servicesOpen}
                >
                  <span>Capabilities</span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#7C7D82] transition-transform duration-200 ${
                      servicesOpen ? "rotate-180 text-[#1E5FD8]" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {servicesOpen && (
                  <div
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 bg-[#FFFFFF] border border-[#E6E6E8] shadow-2xl p-2.5 z-50 text-[#121316] animate-in fade-in slide-in-from-top-2 duration-150 rounded-none"
                  >
                    <div className="px-3 py-1.5 border-b border-[#E6E6E8] mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7D82]">
                        Technical Systems
                      </span>
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      {SERVICES_DATA.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-start justify-between p-2 hover:bg-[#FAF9F6] transition-colors rounded-none"
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

              <Link
                href="/#services"
                className="text-[12px] font-semibold text-[#4A4B50] hover:text-[#1E5FD8] transition-colors"
              >
                Capabilities
              </Link>

              <Link
                href="/#case-studies"
                className="text-[12px] font-semibold text-[#4A4B50] hover:text-[#1E5FD8] transition-colors"
              >
                Case Studies
              </Link>

              <Link
                href="/#industries"
                className="text-[12px] font-semibold text-[#4A4B50] hover:text-[#1E5FD8] transition-colors"
              >
                Industries
              </Link>

              <Link
                href="/#why-us"
                className="text-[12px] font-semibold text-[#4A4B50] hover:text-[#1E5FD8] transition-colors"
              >
                Why Us
              </Link>
            </nav>

            {/* Primary Action Button */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary text-[11px] uppercase tracking-wider font-bold px-4 py-1.5 shadow-xs cursor-pointer rounded-none"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 focus:outline-none text-[#121316] hover:bg-[#F3F2EE] rounded-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-1.5 bg-[#FFFFFF] border border-[#E6E6E8] p-4 shadow-2xl max-w-lg mx-auto text-[#121316] rounded-none">
          <div className="py-1.5 border-b border-[#E6E6E8]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7D82] block mb-1 font-sans">
              Services
            </span>
            <div className="grid grid-cols-1 gap-0.5">
              {SERVICES_DATA.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 px-1.5 text-xs text-[#121316] hover:text-[#1E5FD8] hover:bg-[#FAF9F6] flex items-center justify-between transition-colors rounded-none"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#7C7D82]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-1.5 py-2">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-1.5 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Capabilities
            </Link>
            <Link
              href="/#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-1.5 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Case Studies
            </Link>
            <Link
              href="/#industries"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-1.5 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Industries
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-1.5 text-xs font-semibold hover:text-[#1E5FD8]"
            >
              Why Us
            </Link>
          </div>

          <div className="pt-1.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-2 rounded-none"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
