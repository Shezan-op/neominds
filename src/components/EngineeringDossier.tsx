"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode2, ShieldCheck, Cpu, Database, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface DossierTab {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  deliverableBullets: string[];
  systemSpecs: {
    label: string;
    value: string;
  }[];
  fileType: string;
}

const DOSSIER_DATA: DossierTab[] = [
  {
    id: "dossier-arch",
    tabLabel: "01 Architecture",
    category: "System Blueprint",
    title: "Distributed System & Database Schema",
    subtitle: "Enterprise Technical Foundation",
    description:
      "Every project begins with a deterministic technical blueprint: relational database models, API contracts, caching layers, and decoupled service boundaries designed for high throughput and zero data loss.",
    deliverableBullets: [
      "Entity relationship diagrams & PostgreSQL schemas",
      "REST and GraphQL API specifications",
      "Asynchronous message queue architecture",
      "Automated database migration scripts",
    ],
    systemSpecs: [
      { label: "Target Latency", value: "< 150ms" },
      { label: "Data Integrity", value: "100% ACID" },
      { label: "Cloud Deploy", value: "AWS / Vercel" },
    ],
    fileType: "ARCHITECTURE.SPEC",
  },
  {
    id: "dossier-ai",
    tabLabel: "02 AI Engines",
    category: "Autonomous Systems",
    title: "Deterministic AI Agents & LLM Pipelines",
    subtitle: "Structured Workflow Intelligence",
    description:
      "We build practical AI systems with strict output schemas, structured tool calling, input sanitization, and fallback queues. No hallucinations, no unpredictable conversational dead-ends.",
    deliverableBullets: [
      "Structured JSON schema enforcement",
      "Custom vector embeddings & private RAG sync",
      "Deterministic tool execution pipelines",
      "Continuous prompt evaluation test suites",
    ],
    systemSpecs: [
      { label: "Accuracy Rate", value: "99.4%" },
      { label: "Fallback Queue", value: "Automated" },
      { label: "Privacy Protocol", value: "Zero Data Sharing" },
    ],
    fileType: "AGENT_RUNTIME.TS",
  },
  {
    id: "dossier-qa",
    tabLabel: "03 Testing Suite",
    category: "Quality Assurance",
    title: "Automated End-to-End Test Harness",
    subtitle: "Zero-Downtime Deployment Verification",
    description:
      "Before a single line of code reaches production, automated E2E suites simulate concurrent traffic, race conditions, edge-case validation, and database load to guarantee stability.",
    deliverableBullets: [
      "Playwright end-to-end user flow tests",
      "Integration tests with mock payment & webhook APIs",
      "Stress testing up to 25,000 concurrent sessions",
      "Automated regression checks in CI/CD pipeline",
    ],
    systemSpecs: [
      { label: "Test Coverage", value: "95%+" },
      { label: "CI Validation", value: "Automated PR Gates" },
      { label: "Regression Risk", value: "Near Zero" },
    ],
    fileType: "QA_HARNESS.SPEC",
  },
  {
    id: "dossier-handover",
    tabLabel: "04 Code Ownership",
    category: "Final Delivery",
    title: "Complete Source Code & Infrastructure Keys",
    subtitle: "100% Intellectual Property Handover",
    description:
      "You receive the full repository, Git commit history, deployment scripts, environment keys, and comprehensive technical documentation. Zero vendor lock-in or recurring agency royalties.",
    deliverableBullets: [
      "Full GitHub repository transfer",
      "Infrastructure-as-Code Terraform / Docker configurations",
      "Executive and developer architecture documentation",
      "30-day post-launch warranty and live support",
    ],
    systemSpecs: [
      { label: "Ownership", value: "100% Client IP" },
      { label: "License Fees", value: "Zero" },
      { label: "Handover Speed", value: "Instant Git Transfer" },
    ],
    fileType: "OWNERSHIP_DEED.MD",
  },
];

export function EngineeringDossier() {
  const [activeTab, setActiveTab] = useState(DOSSIER_DATA[0].id);

  const currentDossier = DOSSIER_DATA.find((d) => d.id === activeTab) || DOSSIER_DATA[0];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Engineering Vault
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            How we structure and deliver your technical assets.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            Explore the exact artifacts, blueprints, and code standards delivered across our engineering sprints.
          </p>
        </motion.div>

        {/* Interactive Physical Folder Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Folder Tabs Row */}
          <div className="flex items-end gap-1.5 sm:gap-2 overflow-x-auto pb-px border-b border-[#E6E6E8] no-scrollbar">
            {DOSSIER_DATA.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-sans font-bold transition-all rounded-t-sm border border-b-0 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#FFFFFF] text-[#121316] border-[#E6E6E8] shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-10"
                      : "bg-[#FAF9F6] text-[#7C7D82] border-transparent hover:text-[#121316] hover:bg-[#F3F2EE]"
                  }`}
                >
                  {/* Top orange active accent line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabTop"
                      className="absolute top-0 inset-x-0 h-0.5 bg-[#FF5200] rounded-t-sm"
                    />
                  )}
                  <span>{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Folder Body / Dossier Card */}
          <div className="bg-[#FFFFFF] border border-[#E6E6E8] rounded-b-sm rounded-tr-sm p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDossier.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Dossier Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6E6E8] pb-6 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                      {currentDossier.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] leading-tight">
                      {currentDossier.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 bg-[#FAF9F6] border border-[#E6E6E8] rounded-sm text-xs font-mono text-[#7C7D82]">
                      {currentDossier.fileType}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base text-[#4A4B50] font-sans leading-relaxed max-w-3xl">
                  {currentDossier.description}
                </p>

                {/* Two-Column Grid: Deliverable Specs & Technical Standards */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                  {/* Left: Deliverables Checklist */}
                  <div className="md:col-span-7 space-y-3.5 bg-[#FAF9F6] border border-[#E6E6E8] rounded-sm p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#121316] block mb-2">
                      Included Engineering Artifacts
                    </span>
                    {currentDossier.deliverableBullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4B50]">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5200] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: Technical Specs Metrics */}
                  <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      {currentDossier.systemSpecs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 bg-[#FAF9F6] border border-[#E6E6E8] rounded-sm flex items-center justify-between"
                        >
                          <span className="text-xs text-[#7C7D82] font-sans font-medium uppercase tracking-wider">
                            {spec.label}
                          </span>
                          <span className="text-sm font-serif font-bold text-[#121316]">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-right">
                      <span className="text-[11px] text-[#7C7D82] font-mono">
                        Audited for ISO / SOC2 readiness
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
