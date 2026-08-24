"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Terminal, Code2, Database, ShieldCheck, ArrowRight } from "lucide-react";
import { BorderGlow } from "@/components/ui/BorderGlow";

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
  codeSnippet: string;
}

const DOSSIER_DATA: DossierTab[] = [
  {
    id: "dossier-arch",
    tabLabel: "01 Architecture",
    category: "System Blueprint",
    title: "Distributed Schema & Event Pipeline",
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
    codeSnippet: `export interface DatabaseClusterConfig {
  primaryPool: "postgres-r6g.2xlarge",
  readReplicas: 3,
  connectionPooling: "pgbouncer-strict",
  walReplicationLag: "< 5ms",
  sslMode: "require"
};`,
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
    codeSnippet: `const AgentExecutor = z.object({
  taskQueue: z.enum(["INGEST", "AUDIT", "DISPATCH"]),
  schemaValidator: (res) => strictToolSchema.parse(res),
  maxToolHops: 5,
  telemetryStream: true
});`,
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
    codeSnippet: `test("concurrent checkout with stock lock", async ({ page }) => {
  await page.simulateConcurrentPurchases(50);
  expect(inventoryCount).toBe(0);
  expect(overdraftRisk).toBe(false);
});`,
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
    codeSnippet: `### NEOMINDS CLIENT IP HANDOVER
- REPOSITORY: https://github.com/client-org/production
- OWNERSHIP: 100% EXCLUSIVE
- PERPETUAL COMMERCIAL RIGHTS: GRANTED
- THIRD-PARTY ROYALTIES: $0.00`,
  },
];

export function EngineeringDossier() {
  const [activeTab, setActiveTab] = useState(DOSSIER_DATA[0].id);

  const currentDossier = DOSSIER_DATA.find((d) => d.id === activeTab) || DOSSIER_DATA[0];

  return (
    <section id="dossier" className="py-24 sm:py-32 bg-[#090A0D] text-[#FFFFFF] border-b border-[#222530] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFFFF] leading-tight">
            How we structure and deliver your technical assets.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E5EE] font-sans">
            Explore the exact artifacts, blueprints, and code standards delivered across our engineering sprints.
          </p>
        </motion.div>

        {/* Interactive Physical Folder Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Folder Tabs Row */}
          <div className="flex items-end gap-1.5 sm:gap-2 overflow-x-auto pb-px border-b border-[#2D313F] no-scrollbar">
            {DOSSIER_DATA.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-sans font-bold transition-all rounded-t-lg border border-b-0 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#101217] text-[#FFFFFF] border-[#2D313F] shadow-[0_-4px_16px_rgba(0,0,0,0.3)] z-10"
                      : "bg-[#090A0D] text-[#A0A4B8] border-transparent hover:text-[#FFFFFF] hover:bg-[#14161F]"
                  }`}
                >
                  {/* Top orange active accent line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabTopDark"
                      className="absolute top-0 inset-x-0 h-0.5 bg-[#FF5200] rounded-t-lg"
                    />
                  )}
                  <span>{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Folder Body / Dark Dossier Card */}
          <BorderGlow
            backgroundColor="#101217"
            borderRadius={12}
            glowColor="20 100 50"
            colors={["#FF5200", "#FF7A33", "#FFA07A"]}
            edgeSensitivity={25}
            glowRadius={36}
            glowIntensity={1.2}
            className="p-6 sm:p-10 lg:p-12 shadow-2xl rounded-b-xl rounded-tr-xl border border-[#2D313F]"
          >
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D313F] pb-6 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#FF5200] uppercase tracking-wider block">
                      {currentDossier.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFFFF] leading-tight">
                      {currentDossier.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 bg-[#161822] border border-[#2D313F] rounded-full text-xs font-mono text-[#FFFFFF] font-bold">
                      {currentDossier.fileType}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base text-[#E2E5EE] font-sans leading-relaxed max-w-3xl">
                  {currentDossier.description}
                </p>

                {/* Two-Column Grid: Deliverable Specs & Code Syntax Box */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
                  {/* Left: Deliverables Checklist */}
                  <div className="md:col-span-6 space-y-3.5 p-6 rounded-xl bg-[#14161F] border border-[#2D313F]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block mb-3 font-sans">
                      Included Engineering Artifacts
                    </span>
                    {currentDossier.deliverableBullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FFFFFF]">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5200] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: Code Syntax Preview Box */}
                  <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                    <div className="p-5 rounded-xl bg-[#0B0C10] border border-[#2D313F] font-mono text-xs text-[#FFFFFF] overflow-x-auto space-y-2">
                      <div className="flex items-center justify-between border-b border-[#222530] pb-2 text-[11px] text-[#A0A4B8]">
                        <span className="text-white font-bold">{currentDossier.fileType}</span>
                        <span className="text-[#FF5200] font-bold">SYNTAX VERIFIED</span>
                      </div>
                      <pre className="text-[#FFFFFF] leading-relaxed pt-1 font-mono">
                        <code>{currentDossier.codeSnippet}</code>
                      </pre>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      {currentDossier.systemSpecs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 bg-[#14161F] border border-[#2D313F] rounded-lg"
                        >
                          <span className="text-[10px] text-[#A0A4B8] font-mono block uppercase">
                            {spec.label}
                          </span>
                          <span className="text-xs font-bold text-[#FF5200] block mt-0.5 font-mono">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
