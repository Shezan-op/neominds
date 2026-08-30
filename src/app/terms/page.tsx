import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY_CONFIG } from "@/lib/contact-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Neominds",
  description: "Review the software engineering and service terms for partnering with Neominds.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#121316] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto space-y-10 select-none">
      {/* Top Nav Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#1E5FD8] hover:underline uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>

      {/* Header */}
      <div className="border-b border-[#E6E6E8] pb-6 space-y-2">
        <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-widest block">
          LEGAL & COMPLIANCE // 02
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#121316]">
          Terms of Service
        </h1>
        <p className="font-mono text-xs text-[#7C7D82]">
          Effective Date: January 1, {new Date().getFullYear()} • Standard Engineering Master Services Agreement
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-sans text-sm sm:text-base text-[#4A4B50] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            1. Engagement & Engineering Deliverables
          </h2>
          <p>
            {COMPANY_CONFIG.name} provides custom software engineering, cloud architecture, AI agent systems, and technical auditing services under agreed Statements of Work (SOW). All deliverables undergo rigorous peer review, unit/integration testing, and performance validation before production deployment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            2. Intellectual Property & Transfer of Rights
          </h2>
          <p>
            Upon full settlement of contracted project milestones, full intellectual property rights, repository ownership, CI/CD pipeline keys, and documentation are transferred entirely to the client with zero royalty fees or ongoing vendor lock-in dependencies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            3. Confidentiality & Non-Disclosure
          </h2>
          <p>
            We maintain strict NDAs across all engagements. Client architecture diagrams, business logic, algorithmic models, and proprietary data are treated as strictly confidential trade secrets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            4. Service Inquiries & Legal Notices
          </h2>
          <p>
            All formal notices or contract inquiries should be sent to our legal desk at{" "}
            <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-[#1E5FD8] font-mono font-bold hover:underline">
              {COMPANY_CONFIG.email}
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
