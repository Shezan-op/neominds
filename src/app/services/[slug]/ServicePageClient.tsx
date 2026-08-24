"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Layers } from "lucide-react";
import { ServiceItem } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ConversionCTA } from "@/components/ConversionCTA";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface ServicePageClientProps {
  service: ServiceItem;
}

export function ServicePageClient({ service }: ServicePageClientProps) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#121316] overflow-x-clip selection:bg-[#FF5200] selection:text-white">
      {/* Universal Navigation */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      <main>
        {/* Section 1 & 2: Service Hero + Description + 16:9 Visual (Two-Column Layout) */}
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-[#E6E6E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to all services link */}
            <div className="mb-8">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7C7D82] hover:text-[#121316] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Capabilities</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: 1. Service Name & 2. Description + CTA */}
              <div className="lg:col-span-6 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#121316] leading-[1.08] text-balance">
                  {service.heroHeadline}
                </h1>

                <p className="text-base sm:text-lg text-[#4A4B50] font-sans leading-relaxed">
                  {service.heroDescription}
                </p>

                {/* Deliverables List */}
                {service.deliverables.length > 0 && (
                  <div className="pt-4 border-t border-[#E6E6E8] space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#121316] block mb-2">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4B50]">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5200] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="btn-primary text-xs uppercase tracking-wider font-bold px-7 py-3.5 rounded-none"
                  >
                    <span>Request Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 16:9 Visual Placeholder */}
              <div className="lg:col-span-6">
                <BorderGlow
                  backgroundColor="#FFFFFF"
                  borderRadius={0}
                  glowColor="20 100 50"
                  colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                  glowRadius={30}
                  className="aspect-video p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-none"
                >
                  <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-3">
                    <span className="text-[11px] font-mono text-[#7C7D82] uppercase tracking-wider">
                      {service.title} Architecture
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#E6E6E8] rounded-none" />
                      <span className="w-2 h-2 bg-[#E6E6E8] rounded-none" />
                      <span className="w-2 h-2 bg-[#E6E6E8] rounded-none" />
                    </div>
                  </div>

                  <div className="py-10 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-[#FAF9F6] border border-[#E6E6E8] flex items-center justify-center text-[#FF5200] mb-3 rounded-none">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-[#121316]">
                      Production Architecture Blueprint
                    </span>
                    <span className="text-xs text-[#7C7D82] mt-1 max-w-xs">
                      Deterministic blueprint & specifications for {service.title.toLowerCase()} systems.
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6E6E8] text-[11px] font-mono text-[#7C7D82]">
                    <span>Verified Production Pipeline</span>
                    <span>100% Owned Code</span>
                  </div>
                </BorderGlow>
              </div>
            </div>
          </div>
        </section>

        {/* If minimal service (Training), show clean minimal placeholder notice */}
        {service.isMinimal ? (
          <section className="py-24 bg-[#FAF9F6] border-b border-[#E6E6E8]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <BorderGlow
                backgroundColor="#FFFFFF"
                borderRadius={0}
                glowColor="20 100 50"
                className="p-10 sm:p-14 space-y-4 rounded-none"
              >
                <h2 className="text-2xl sm:text-3xl font-serif text-[#121316]">
                  Training Curriculum on Request
                </h2>
                <p className="text-sm text-[#4A4B50] font-sans max-w-xl mx-auto leading-relaxed">
                  We provide bespoke engineering workshops and technical training for internal development teams. Contact our leads to design a curriculum tailored to your technical stack.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-none"
                  >
                    <span>Inquire About Workshops</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BorderGlow>
            </div>
          </section>
        ) : (
          <>
            {/* Section 3: Work We Did (Relevant Work & Projects) */}
            {service.workShowcase.length > 0 && (
              <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#121316]">
                      Work we delivered in {service.title.toLowerCase()}.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {service.workShowcase.map((work, idx) => (
                      <BorderGlow
                        key={idx}
                        backgroundColor="#FFFFFF"
                        borderRadius={0}
                        glowColor="20 100 50"
                        colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                        glowRadius={28}
                        className="p-8 sm:p-10 flex flex-col justify-between rounded-none"
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 mb-6">
                            <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider">
                              Project 0{idx + 1}
                            </span>
                            <span className="text-xs font-sans text-[#7C7D82] bg-[#FAF9F6] px-2.5 py-1 border border-[#E6E6E8] rounded-none">
                              {work.tag}
                            </span>
                          </div>

                          <h3 className="text-2xl font-serif text-[#121316] mb-3">
                            {work.title}
                          </h3>

                          <p className="text-sm text-[#4A4B50] font-sans leading-relaxed mb-6">
                            {work.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E6E6E8]">
                          <span className="text-3xl font-serif text-[#121316] block">
                            {work.metric}
                          </span>
                          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7C7D82]">
                            Verified Result
                          </span>
                        </div>
                      </BorderGlow>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section 4: Why You Need This Service (Problems Solved & Outcomes) */}
            {service.whyNeeded.length > 0 && (
              <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#121316]">
                      Why your business needs {service.title.toLowerCase()}.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {service.whyNeeded.map((item, idx) => (
                      <BorderGlow
                        key={idx}
                        backgroundColor="#FFFFFF"
                        borderRadius={0}
                        glowColor="20 100 50"
                        colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                        glowRadius={28}
                        className="p-8 space-y-6 rounded-none"
                      >
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#FF5200] block mb-2">
                            The Common Problem
                          </span>
                          <h3 className="text-xl font-serif text-[#121316] mb-2">
                            {item.problemTitle}
                          </h3>
                          <p className="text-sm text-[#4A4B50] font-sans leading-relaxed">
                            {item.problemDescription}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E6E6E8]">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#121316] block mb-1">
                            The Commercial Outcome
                          </span>
                          <p className="text-sm text-[#121316] font-sans font-medium">
                            {item.businessOutcome}
                          </p>
                        </div>
                      </BorderGlow>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section 5: Why Choose Neominds? (Advantages & Approach) */}
            {service.whyNeominds.length > 0 && (
              <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#121316]">
                      Why partner with Neominds for this service.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {service.whyNeominds.map((adv, idx) => (
                      <BorderGlow
                        key={idx}
                        backgroundColor="#FFFFFF"
                        borderRadius={0}
                        glowColor="20 100 50"
                        colors={["#FF5200", "#FF7A33", "#FFA07A"]}
                        glowRadius={24}
                        className="p-8 space-y-3 rounded-none"
                      >
                        <span className="text-xs font-mono font-bold text-[#FF5200] block">
                          0{idx + 1}
                        </span>
                        <h3 className="text-lg font-serif text-[#121316]">
                          {adv.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4A4B50] font-sans leading-relaxed">
                          {adv.description}
                        </p>
                      </BorderGlow>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section 6: Testimonials (Reusable) */}
            <TestimonialsSection />

            {/* Section 7: FAQ (Reusable & Service-Specific) */}
            {service.faqs.length > 0 && (
              <FAQSection
                customFaqs={service.faqs}
                title={`${service.title} Questions & Answers`}
                subtitle={`Common technical and commercial questions regarding our ${service.title.toLowerCase()} engagements.`}
              />
            )}
          </>
        )}

        {/* Section 8: Final CTA (Reusable) */}
        <ConversionCTA onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Section 9: Footer (Reusable) */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
