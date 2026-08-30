import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - System Node Not Found | Neominds",
  description: "The requested system node or architecture route could not be resolved in the Neominds network.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col justify-between p-6 sm:p-12 lg:p-20 relative overflow-hidden select-none">
      {/* Top Bar Status */}
      <div className="flex items-center justify-between border-b border-[#E6E6E8] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
          <span className="font-bold text-[#E11D48]">EXCEPTION 404 // UNRESOLVED ROUTE</span>
        </div>
        <span className="text-[#7C7D82] hidden sm:inline">NEOMINDS SYSTEM ROUTER</span>
      </div>

      {/* Main Technical 404 Message */}
      <div className="max-w-3xl my-auto space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs bg-[#EDF4FF] border border-[#1E5FD8]/30 px-3 py-1 text-[#1E5FD8] font-bold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SYSTEM NODE NOT FOUND IN REGISTRY</span>
        </div>

        <h1 className="font-serif font-black text-6xl sm:text-8xl lg:text-9xl text-[#121316] tracking-tight uppercase leading-none">
          404 <span className="text-[#1E5FD8]">ERR</span>
        </h1>

        <p className="text-base sm:text-xl text-[#4A4B50] font-sans max-w-xl leading-relaxed">
          The requested system node, case dossier, or architectural specification does not exist or has been relocated to another cluster.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-3.5 flex items-center gap-2 text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Central System</span>
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-3.5 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#1E5FD8] hover:text-[#1E5FD8] transition-colors"
          >
            Contact Neominds Architects
          </Link>
        </div>
      </div>

      {/* Footer Diagnostic Trace */}
      <div className="border-t border-[#E6E6E8] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-xs text-[#7C7D82] gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#1E5FD8]" />
          <span>STATUS: FAILOVER SAFE • CODEBASE HEALTH 100%</span>
        </div>
        <span>SYSTEM TIME: {new Date().getFullYear()} NEOMINDS</span>
      </div>
    </main>
  );
}
