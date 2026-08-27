"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Code2, Cpu, FileText, Layers, ShieldCheck, Terminal, Workflow } from "lucide-react";
import { BorderGlow } from "@/components/ui/BorderGlow";

interface DossierItem {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  description: string;
  fileType: string;
  deliverableBullets: string[];
  codeSnippet: string;
  systemSpecs: { label: string; value: string }[];
}

const DOSSIER_DATA: DossierItem[] = [
  {
    id: "ai-agents",
    tabLabel: "01. AI Agents & Workflows",
    category: "Autonomous Systems",
    title: "Deterministic Multi-Agent Orchestration Engine",
    description:
      "Enterprise autonomous workflows built with strict schema validation, structured function calling, and deterministic state transitions. We eliminate hallucination risk in production pipelines.",
    fileType: "agent_orchestrator.ts",
    deliverableBullets: [
      "Custom tool-calling router with automated fallback loops",
      "LangGraph / OpenAI SDK / Claude 3.7 production harnesses",
      "Vector embeddings & retrieval with Supabase pgvector",
      "Human-in-the-loop verification checkpoints",
    ],
    codeSnippet: `export const agentWorkflow = new Workflow({
  stateSchema: EnterpriseStateSchema,
  maxAutonomousRetries: 3,
  strictValidation: true,
  nodes: [
    { name: "ingest", handler: ingestPayload },
    { name: "evaluate", handler: modelReasoningNode },
    { name: "verify", handler: deterministicAuditor },
  ],
});`,
    systemSpecs: [
      { label: "P99 Latency", value: "< 240ms" },
      { label: "Deterministic Accuracy", value: "99.94%" },
      { label: "Fallback Recovery", value: "100%" },
    ],
  },
  {
    id: "custom-software",
    tabLabel: "02. Custom Software",
    category: "Full-Stack Architecture",
    title: "High-Throughput Distributed Microservices",
    description:
      "Modern full-stack applications engineered for sub-millisecond response times, horizontal elasticity, and strict compliance isolation.",
    fileType: "cluster_config.go",
    deliverableBullets: [
      "Next.js 16 + Go / Node.js distributed backends",
      "PostgreSQL / Redis caching & partitioned event streams",
      "Zero-trust API authentication with granular RBAC",
      "Automated CI/CD pipelines deploying to AWS / GCP",
    ],
    codeSnippet: `func InitializeCluster(ctx context.Context) (*Cluster, error) {
    mesh := networking.NewMeshTopology(
        networking.WithZeroDowntimeRollingDeploy(),
        networking.WithStrictMTLS(),
        networking.WithTelemetryExporter("otel.neominds.internal"),
    )
    return mesh.Bootstrap(ctx)
}`,
    systemSpecs: [
      { label: "Req / Second", value: "45,000+" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Test Coverage", value: "94.8%" },
    ],
  },
  {
    id: "application-dev",
    tabLabel: "03. Web & App Systems",
    category: "Client Engineering",
    title: "Performance-Critical Web & Mobile Applications",
    description:
      "Consumer and enterprise client applications designed with instant interaction feedback, buttery-smooth animations, and offline-first data sync.",
    fileType: "client_engine.tsx",
    deliverableBullets: [
      "Responsive React / Next.js / React Native architectures",
      "Lenis 60fps smooth kinetic animation pipelines",
      "Optimistic UI updates with offline IndexedDB caches",
      "Sub-second First Contentful Paint (FCP) and zero layout shift",
    ],
    codeSnippet: `export function KineticAppEngine({ children }: EngineProps) {
  const { lenis } = useKineticSmoothScroll({ lerp: 0.1 });
  useFrameUpdate((time) => lenis.raf(time));

  return (
    <ViewTransitionProvider>
      <ClientHydrationGuard fallback={<SkeletonLayout />}>
        {children}
      </ClientHydrationGuard>
    </ViewTransitionProvider>
  );
}`,
    systemSpecs: [
      { label: "FCP Benchmark", value: "0.42s" },
      { label: "Core Web Vitals", value: "100 / 100" },
      { label: "Frame Rate", value: "60 FPS Locked" },
    ],
  },
  {
    id: "audits-consultation",
    tabLabel: "04. Audits & Consulting",
    category: "Technical Advisory",
    title: "Deep-Code Architectural & Security Audits",
    description:
      "Comprehensive structural, security, and scalability reviews of existing codebases. We identify hidden concurrency bottlenecks, database leaks, and AI cost inefficiencies.",
    fileType: "audit_matrix.json",
    deliverableBullets: [
      "OWASP top 10 & data leak vulnerability assessments",
      "Database query plan optimization & indexing remediation",
      "LLM token burn & model routing cost reductions (30-60%)",
      "Executive architecture dossier with actionable code diffs",
    ],
    codeSnippet: `{
  "auditResult": "COMPLETED",
  "bottlenecksRemediated": 18,
  "estimatedCostSavings": "44.2%",
  "p99LatencyReduction": "3.8x",
  "status": "PRODUCTION_HARDENED"
}`,
    systemSpecs: [
      { label: "Cost Reduction", value: "35-60%" },
      { label: "Audit Turnaround", value: "5 Days" },
      { label: "Deliverable", value: "Actionable PRs" },
    ],
  },
];

export function EngineeringDossier() {
  const [activeTabId, setActiveTabId] = useState<string>(DOSSIER_DATA[0].id);

  const currentDossier = DOSSIER_DATA.find((d) => d.id === activeTabId) || DOSSIER_DATA[0];

  return (
    <section className="py-24 sm:py-32 bg-[#08090C] text-[#FFFFFF] border-b border-[#222530] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-2">
            Engineering Blueprint Dossier
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFFFF] leading-tight">
            How we engineer mission-critical systems.
          </h2>
          <p className="mt-4 text-base text-[#E2E5EE] font-sans leading-relaxed">
            Inspect our technical standards, code paradigms, and production benchmarks across our four core engineering capabilities.
          </p>
        </div>

        {/* Tabbed Folder Dossier System */}
        <div className="relative">
          {/* Top Folder Tabs Bar with Sharp Corners */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px border-b border-[#2D313F] no-scrollbar">
            {DOSSIER_DATA.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative px-4 sm:px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 border-t border-x cursor-pointer flex-shrink-0 flex items-center gap-2 whitespace-nowrap rounded-none ${
                    isActive
                      ? "bg-[#101217] text-[#FFFFFF] border-[#2D313F] shadow-[0_-4px_16px_rgba(0,0,0,0.3)] z-10"
                      : "bg-[#090A0D] text-[#A0A4B8] border-transparent hover:text-[#FFFFFF] hover:bg-[#14161F]"
                  }`}
                >
                  {/* Top blue active accent line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabTopDark"
                      className="absolute top-0 inset-x-0 h-0.5 bg-[#1E5FD8] rounded-none"
                    />
                  )}
                  <span>{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Folder Body / Dark Dossier Card with Sharp Corners */}
          <BorderGlow
            backgroundColor="#101217"
            borderRadius={0}
            glowColor="217 91 60"
            colors={["#10316B", "#1E5FD8", "#60A5FA"]}
            edgeSensitivity={25}
            glowRadius={36}
            glowIntensity={1.2}
            className="p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#2D313F] rounded-none"
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
                    <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block">
                      {currentDossier.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFFFF] leading-tight">
                      {currentDossier.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 bg-[#161822] border border-[#2D313F] text-xs font-mono text-[#FFFFFF] font-bold rounded-none">
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
                  <div className="md:col-span-6 space-y-3.5 p-6 bg-[#14161F] border border-[#2D313F] rounded-none">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block mb-3 font-sans">
                      Included Engineering Artifacts
                    </span>
                    {currentDossier.deliverableBullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FFFFFF]">
                        <CheckCircle2 className="w-4 h-4 text-[#1E5FD8] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: Code Syntax Preview Box */}
                  <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                    <div className="p-5 bg-[#0B0C10] border border-[#2D313F] font-mono text-xs text-[#FFFFFF] overflow-x-auto space-y-2 rounded-none">
                      <div className="flex items-center justify-between border-b border-[#222530] pb-2 text-[11px] text-[#A0A4B8]">
                        <span className="text-white font-bold">{currentDossier.fileType}</span>
                        <span className="text-[#1E5FD8] font-bold">SYNTAX VERIFIED</span>
                      </div>
                      <pre className="text-[#FFFFFF] leading-relaxed pt-1 font-mono">
                        <code>{currentDossier.codeSnippet}</code>
                      </pre>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      {currentDossier.systemSpecs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 bg-[#14161F] border border-[#2D313F] rounded-none"
                        >
                          <span className="text-[10px] text-[#A0A4B8] font-mono block uppercase">
                            {spec.label}
                          </span>
                          <span className="text-xs font-bold text-[#1E5FD8] block mt-0.5 font-mono">
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
