"use client";

import React, { useState } from "react";
import { OpeningSequence } from "@/components/OpeningSequence";
import { ClosingSequence } from "@/components/ClosingSequence";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { NumberChangerSection } from "@/components/NumberChangerSection";
import { TechLogoLoop } from "@/components/TechLogoLoop";
import { ServicesEditorial } from "@/components/ServicesEditorial";
import { RobotCaseStudiesShowcase } from "@/components/RobotCaseStudiesShowcase";
import { IndustriesSection } from "@/components/IndustriesSection";
import { WhyNeomindsSection } from "@/components/WhyNeomindsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ConversionCTA } from "@/components/ConversionCTA";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#121316] overflow-x-clip selection:bg-[#1E5FD8] selection:text-white font-sans">
      {/* 
        ========================================================================
        00. PREMIUM CINEMATIC OPENING SEQUENCE (ASCENT)
        Skyscraper Canyon -> Camera Rise -> Deep Sky -> Cloud Veil -> Homepage
        ========================================================================
      */}
      <OpeningSequence />

      {/* 01. Floating Interactive Spotlight Navbar (Appears on Homepage) */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      <main className="relative z-10 bg-[#FAF9F6]">
        {/* 02. Hero Section with hero-image.png */}
        <HeroSection onOpenContact={() => setContactOpen(true)} />

        {/* 03. Editorial Number Changer (Projects, Team, Experience) */}
        <NumberChangerSection />

        {/* 04. Infinite Technology Logo Loop */}
        <TechLogoLoop />

        {/* 05. Centered Inline Expandable Capabilities Showcase */}
        <ServicesEditorial />

        {/* 06. Full-Width Robot Case Studies Interactive Showcase */}
        <RobotCaseStudiesShowcase onOpenContact={() => setContactOpen(true)} />

        {/* 07. Industries Served (Clean Horizontal Scroll) */}
        <IndustriesSection />

        {/* 08. Why Choose Neominds */}
        <WhyNeomindsSection />

        {/* 09. Testimonials */}
        <TestimonialsSection />

        {/* 10. Direct Technical Discovery Consultation */}
        <ConversionCTA onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* 11. Structured Footer with Silk Drapery */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* 
        ========================================================================
        12. PREMIUM CINEMATIC CLOSING SEQUENCE (DESCENT / ZOOM OUT)
        Deep Sky Clouds -> Reverse Camera -> Canyon Expansion -> Full Architecture
        ========================================================================
      */}
      <ClosingSequence />

      {/* Direct Engineering Consultation Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
