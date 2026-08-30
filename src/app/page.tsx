"use client";

import React, { useState } from "react";
import { OpeningSequence } from "@/components/OpeningSequence";
import { ClosingSequence } from "@/components/ClosingSequence";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { NumberChangerSection } from "@/components/NumberChangerSection";
import { TechLogoLoop } from "@/components/TechLogoLoop";
import { ServicesEditorial } from "@/components/ServicesEditorial";
import { TextCollision } from "@/components/motion/TextCollision";
import { RobotCaseStudiesShowcase } from "@/components/RobotCaseStudiesShowcase";
import { IndustriesSection } from "@/components/IndustriesSection";
import { WordMorph } from "@/components/motion/WordMorph";
import { WhyNeomindsSection } from "@/components/WhyNeomindsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ConversionCTA } from "@/components/ConversionCTA";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { CinematicScroll } from "@/components/lightswind/cinematic-scroll";
import { CookieBanner } from "@/components/CookieBanner";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#121316] overflow-x-clip selection:bg-[#1E5FD8] selection:text-white font-sans">
      {/* 00. Cinematic Opening Sequence */}
      <OpeningSequence />

      {/* Cinematic Scroll Layer */}
      <CinematicScroll
        isViewportOverlay
        blurLayers={5}
        blurMax={16}
        blurSize={72}
        accentColor="#1E5FD8"
        showScrollbar={true}
      />

      {/* 01. Floating Interactive Spotlight Navbar */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      <main className="relative z-10 bg-[#FAF9F6]">
        {/* 02. Hero Section with Compressed Exit Transition */}
        <HeroSection onOpenContact={() => setContactOpen(true)} />

        {/* 03. Section 01: Telemetry & Verified Numbers (ZERO CARDS) */}
        <NumberChangerSection />

        {/* 04. Infinite Technology Logo Loop */}
        <TechLogoLoop />

        {/* 05. Section 02: Pinned Services Typographic Index (ZERO CARDS) */}
        <ServicesEditorial />

        {/* 06. Typography Collision (SYSTEMS + SCALE) */}
        <TextCollision />

        {/* 07. Section 03: Interactive Systems Showcase (ZERO CARDS) */}
        <RobotCaseStudiesShowcase onOpenContact={() => setContactOpen(true)} />

        {/* 08. Section 04: Industries Typographic Spotlight (ZERO CARDS) */}
        <IndustriesSection />

        {/* 09. Word Morphing (WE BUILD SOFTWARE THAT...) */}
        <WordMorph />

        {/* 10. Section 05: Why Neominds (ZERO CARDS) */}
        <WhyNeomindsSection />

        {/* 11. Section 06: Client Voices with Alternating Line-Split (ZERO CARDS) */}
        <TestimonialsSection />

        {/* 12. Section 07: Conversion CTA */}
        <ConversionCTA onOpenContact={() => setContactOpen(true)} />

        {/* 13. Cinematic Closing Sequence */}
        <ClosingSequence />
      </main>

      {/* 14. Grand Structured Footer with Monumental Wordmark */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Direct Engineering Consultation Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Sticky Mobile CTA */}
      <MobileStickyCTA onOpenContact={() => setContactOpen(true)} />

      {/* Privacy & Telemetry Cookie Settings */}
      <CookieBanner />
    </div>
  );
}
