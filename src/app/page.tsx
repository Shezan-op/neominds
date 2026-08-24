"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LogoCredibility } from "@/components/LogoCredibility";
import { ScrollStackSection } from "@/components/ScrollStackSection";
import { ServicesEditorial } from "@/components/ServicesEditorial";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { EngineeringDossier } from "@/components/EngineeringDossier";
import { WhyNeomindsSection } from "@/components/WhyNeomindsSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ConversionCTA } from "@/components/ConversionCTA";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#121316] overflow-x-clip selection:bg-[#FF5200] selection:text-white font-sans">
      {/* 01. Clean Header with Services Dropdown */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      <main>
        {/* 02. Plain Hero Section with 16:9 Canvas Placeholder */}
        <HeroSection onOpenContact={() => setContactOpen(true)} />

        {/* 03. Credibility / Technology Marks Bar */}
        <LogoCredibility />

        {/* 04. 4-Card Scroll Stack (Problem -> Capability -> Differentiator -> Contact) */}
        <ScrollStackSection onOpenContact={() => setContactOpen(true)} />

        {/* 05. Editorial Services Overview */}
        <ServicesEditorial />

        {/* 06. Selected Case Studies Showcase */}
        <CaseStudiesSection onOpenContact={() => setContactOpen(true)} />

        {/* 07. Interactive Engineering Dossier / Artifacts Vault */}
        <EngineeringDossier />

        {/* 08. Core Differentiators (Why Neominds) */}
        <WhyNeomindsSection />

        {/* 09. About Neominds B2B Narrative */}
        <AboutSection />

        {/* 10. High-Legibility Testimonials */}
        <TestimonialsSection />

        {/* 11. Centered FAQ Accordion */}
        <FAQSection onOpenContact={() => setContactOpen(true)} />

        {/* 12. Final Conversion Section */}
        <ConversionCTA onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* 13. Structured Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Direct Engineering Consultation Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
