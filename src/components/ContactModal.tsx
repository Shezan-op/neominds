"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight, Send } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: SERVICES_DATA[0].title,
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#E6E6E8] p-6 sm:p-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 rounded-none">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-[#7C7D82] hover:text-[#121316] focus:outline-none cursor-pointer rounded-none"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-[#1E5FD8] uppercase tracking-wider block mb-1">
                Technical Discovery
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] leading-tight">
                Discuss Your Technical Project
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4B50] font-sans mt-2">
                Consult directly with a senior software engineer. We will review your requirements, architecture, and timeline.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E6E8] text-[#121316] text-xs sm:text-sm focus:outline-none focus:border-[#121316] transition-colors rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E6E8] text-[#121316] text-xs sm:text-sm focus:outline-none focus:border-[#121316] transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1">
                    Company Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E6E8] text-[#121316] text-xs sm:text-sm focus:outline-none focus:border-[#121316] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1">
                  Primary Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E6E8] text-[#121316] text-xs sm:text-sm focus:outline-none focus:border-[#121316] transition-colors rounded-none"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1">
                  Project Notes & Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what you are building or the bottleneck you want to solve..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E6E8] text-[#121316] text-xs sm:text-sm focus:outline-none focus:border-[#121316] transition-colors resize-none rounded-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs font-semibold text-[#7C7D82] hover:text-[#121316] cursor-pointer rounded-none"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5 flex items-center gap-2 cursor-pointer rounded-none"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4 font-sans">
            <div className="w-12 h-12 bg-[#EDF4FF] border border-[#1E5FD8]/30 text-[#1E5FD8] flex items-center justify-center mx-auto rounded-none">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-serif text-[#121316]">
              Discovery Request Received
            </h3>

            <p className="text-xs sm:text-sm text-[#4A4B50] max-w-sm mx-auto leading-relaxed">
              Thank you, {formData.name}. A senior technical architect will review your project requirements and email {formData.email} within 24 hours.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="btn-primary text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded-none"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
