"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled past 75% of the viewport height (past hero section)
      const heroHeight = window.innerHeight * 0.75;
      setScrolledPastHero(window.scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <header className="fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto rounded-full px-5 sm:px-7 transition-all duration-300 pointer-events-auto ${
          scrolledPastHero
            ? "bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E6E6E8] shadow-[0_8px_30px_rgba(0,0,0,0.06)] py-2.5 sm:py-3 text-[#121316]"
            : "bg-[#101217]/70 backdrop-blur-md border border-white/10 py-3 sm:py-3.5 text-white shadow-xl"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Neominds Home"
          >
            <div className="w-7 h-7 rounded-sm bg-[#FF5200] text-white flex items-center justify-center font-serif text-base font-normal transition-transform group-hover:scale-105">
              N
            </div>
            <div className="flex flex-col">
              <span
                className={`font-sans font-bold text-[13px] tracking-tight uppercase leading-none transition-colors ${
                  scrolledPastHero ? "text-[#121316]" : "text-white"
                }`}
              >
                NEOMINDS
              </span>
              <span
                className={`font-sans text-[9px] tracking-wider uppercase leading-tight mt-0.5 transition-colors ${
                  scrolledPastHero ? "text-[#7C7D82]" : "text-[#A0A4B8]"
                }`}
              >
                Technology Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 font-sans">
            {/* Capabilities Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1 text-[13px] font-semibold transition-colors py-1.5 focus:outline-none cursor-pointer ${
                  scrolledPastHero
                    ? "text-[#4A4B50] hover:text-[#121316]"
                    : "text-[#E2E5EE] hover:text-white"
                }`}
                aria-expanded={servicesOpen}
              >
                <span>Capabilities</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-[#FF5200]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {servicesOpen && (
                <div
                  onMouseLeave={() => setServicesOpen(false)}
                  className={`absolute top-full left-0 mt-2 w-80 border shadow-2xl rounded-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                    scrolledPastHero
                      ? "bg-[#FFFFFF] border-[#E6E6E8] text-[#121316]"
                      : "bg-[#14161F] border-[#2D313F] text-white"
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 border-b mb-1 ${
                      scrolledPastHero ? "border-[#E6E6E8]" : "border-[#2D313F]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        scrolledPastHero ? "text-[#7C7D82]" : "text-[#A0A4B8]"
                      }`}
                    >
                      Technical Systems
                    </span>
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    {SERVICES_DATA.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className={`group flex items-start justify-between p-2 rounded-lg transition-colors ${
                          scrolledPastHero
                            ? "hover:bg-[#FAF9F6]"
                            : "hover:bg-[#1C1F2B]"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-xs font-semibold group-hover:text-[#FF5200] transition-colors ${
                              scrolledPastHero ? "text-[#121316]" : "text-white"
                            }`}
                          >
                            {service.title}
                          </span>
                          <span
                            className={`text-[10px] line-clamp-1 mt-0.5 ${
                              scrolledPastHero
                                ? "text-[#7C7D82]"
                                : "text-[#A0A4B8]"
                            }`}
                          >
                            {service.shortDescription}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-[#7C7D82] opacity-0 group-hover:opacity-100 group-hover:text-[#FF5200] transition-all flex-shrink-0 mt-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#workflow"
              className={`text-[13px] font-semibold transition-colors ${
                scrolledPastHero
                  ? "text-[#4A4B50] hover:text-[#121316]"
                  : "text-[#E2E5EE] hover:text-white"
              }`}
            >
              Workflow
            </Link>

            <Link
              href="/#dossier"
              className={`text-[13px] font-semibold transition-colors ${
                scrolledPastHero
                  ? "text-[#4A4B50] hover:text-[#121316]"
                  : "text-[#E2E5EE] hover:text-white"
              }`}
            >
              Vault
            </Link>

            <Link
              href="/#case-studies"
              className={`text-[13px] font-semibold transition-colors ${
                scrolledPastHero
                  ? "text-[#4A4B50] hover:text-[#121316]"
                  : "text-[#E2E5EE] hover:text-white"
              }`}
            >
              Case Studies
            </Link>

            <Link
              href="/#why-us"
              className={`text-[13px] font-semibold transition-colors ${
                scrolledPastHero
                  ? "text-[#4A4B50] hover:text-[#121316]"
                  : "text-[#E2E5EE] hover:text-white"
              }`}
            >
              Why Us
            </Link>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="btn-primary text-xs uppercase tracking-wider font-bold px-5 py-2 rounded-full shadow-xs"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-full focus:outline-none ${
                scrolledPastHero
                  ? "text-[#121316] hover:bg-[#F3F2EE]"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-2 border rounded-2xl p-5 shadow-2xl max-w-lg mx-auto pointer-events-auto ${
            scrolledPastHero
              ? "bg-[#FFFFFF] border-[#E6E6E8] text-[#121316]"
              : "bg-[#14161F] border-[#2D313F] text-white"
          }`}
        >
          <div
            className={`py-2 border-b ${
              scrolledPastHero ? "border-[#E6E6E8]" : "border-[#2D313F]"
            }`}
          >
            <span
              className={`text-[11px] font-bold uppercase tracking-wider block mb-2 font-sans ${
                scrolledPastHero ? "text-[#7C7D82]" : "text-[#A0A4B8]"
              }`}
            >
              Services
            </span>
            <div className="grid grid-cols-1 gap-1">
              {SERVICES_DATA.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 px-2 text-xs rounded-md flex items-center justify-between transition-colors ${
                    scrolledPastHero
                      ? "text-[#121316] hover:text-[#FF5200] hover:bg-[#FAF9F6]"
                      : "text-white hover:text-[#FF5200] hover:bg-[#1C1F2B]"
                  }`}
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2 py-3">
            <Link
              href="/#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#FF5200]"
            >
              Workflow
            </Link>
            <Link
              href="/#dossier"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#FF5200]"
            >
              Vault
            </Link>
            <Link
              href="/#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#FF5200]"
            >
              Case Studies
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 text-xs font-semibold hover:text-[#FF5200]"
            >
              Why Us
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-2.5 rounded-full"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
