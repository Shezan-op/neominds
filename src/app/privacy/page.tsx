import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY_CONFIG } from "@/lib/contact-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Neominds",
  description: "Learn how Neominds protects client data, codebase integrity, and digital privacy.",
};

export default function PrivacyPolicy() {
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
          LEGAL & COMPLIANCE // 01
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#121316]">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-[#7C7D82]">
          Effective Date: January 1, {new Date().getFullYear()} • Last Reviewed: Q1 {new Date().getFullYear()}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-sans text-sm sm:text-base text-[#4A4B50] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            1. Overview & Commitment to Zero-Data Exposure
          </h2>
          <p>
            At {COMPANY_CONFIG.legalName} (&quot;{COMPANY_CONFIG.name}&quot;), we operate with strict engineering principles. We respect the confidentiality of our clients, partners, and website visitors. We collect only the minimum telemetry and communication data required to engineer and deliver custom digital solutions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-[#121316]">
            <li><strong>Direct Communications:</strong> Name, work email address, company affiliation, and project scope submitted through our contact architecture.</li>
            <li><strong>System Telemetry:</strong> Aggregated, anonymized performance metrics (such as viewport resolution, network latency, and interaction telemetry) used strictly to optimize technical rendering and motion performance.</li>
            <li><strong>Proprietary Codebases:</strong> All client source code, credentials, and infrastructure configurations handled under NDA are strictly isolated and never stored on public-facing servers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            3. 100% Code & Intellectual Property Ownership
          </h2>
          <p>
            Unlike traditional vendor lock-in agencies, {COMPANY_CONFIG.name} guarantees that all code, models, automation pipelines, and infrastructure architecture developed for our clients remain 100% the intellectual property of the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#121316]">
            4. Contact & Compliance Inquiries
          </h2>
          <p>
            For privacy inquiries, audit requests, or data deletion requests, contact our compliance office at{" "}
            <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-[#1E5FD8] font-mono font-bold hover:underline">
              {COMPANY_CONFIG.email}
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
