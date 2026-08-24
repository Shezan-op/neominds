"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E6E8] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-[#FAF9F6] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Neominds Home"
          >
            <div className="w-8 h-8 rounded-sm bg-[#121316] text-[#FAF9F6] flex items-center justify-center font-serif text-lg font-normal transition-transform group-hover:scale-105">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#4A4B50] hover:text-[#121316] transition-colors py-2 focus:outline-none cursor-pointer"
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#7C7D82] transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-[#121316]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {servicesOpen && (
                <div
                  onMouseLeave={() => setServicesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-80 bg-[#FFFFFF] border border-[#E6E6E8] shadow-[0_12px_32px_rgba(0,0,0,0.06)] rounded-sm p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 border-b border-[#E6E6E8] mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82]">
                      Technical Capabilities
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {SERVICES_DATA.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-start justify-between p-2.5 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#121316] group-hover:text-[#FF5200] transition-colors">
                            {service.title}
                          </span>
                          <span className="text-[11px] text-[#7C7D82] line-clamp-1 mt-0.5">
                            {service.shortDescription}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#7C7D82] opacity-0 group-hover:opacity-100 group-hover:text-[#FF5200] transition-all flex-shrink-0 mt-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#case-studies"
              className="text-sm font-semibold text-[#4A4B50] hover:text-[#121316] transition-colors"
            >
              Case Studies
            </Link>

            <Link
              href="/#why-us"
              className="text-sm font-semibold text-[#4A4B50] hover:text-[#121316] transition-colors"
            >
              Why Us
            </Link>

            <Link
              href="/#about-us"
              className="text-sm font-semibold text-[#4A4B50] hover:text-[#121316] transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenContact}
              className="btn-primary text-xs uppercase tracking-wider font-bold"
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
              className="p-2 text-[#121316] hover:bg-[#F3F2EE] rounded-sm focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#E6E6E8] px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <div className="py-2 border-b border-[#E6E6E8]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C7D82] block mb-2">
              Services
            </span>
            <div className="grid grid-cols-1 gap-1">
              {SERVICES_DATA.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 text-sm text-[#121316] hover:text-[#FF5200] hover:bg-[#F3F2EE] rounded-sm flex items-center justify-between"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7C7D82]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <Link
              href="/#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 text-sm font-semibold text-[#121316]"
            >
              Case Studies
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 text-sm font-semibold text-[#121316]"
            >
              Why Us
            </Link>
            <Link
              href="/#about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 text-sm font-semibold text-[#121316]"
            >
              About Us
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full btn-primary text-xs uppercase tracking-wider font-bold py-3"
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
