"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Send, AlertCircle } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) {
      errs.company = "Please enter your company or project name";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    trackEvent({
      action: "submit_contact_form",
      category: "contact_form",
      label: formData.service,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-xl bg-[#FAF9F6] border border-[#E6E6E8] p-6 sm:p-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-[#7C7D82] hover:text-[#121316] focus:outline-none cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Modal"
          data-cursor
          data-cursor-text="CLOSE"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 border-b border-[#E6E6E8] pb-4">
              <span className="text-xs font-bold text-[#1E5FD8] uppercase tracking-wider block mb-1">
                Start a Conversation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#121316] leading-tight">
                Tell us about your project
              </h3>
              <p className="text-sm text-[#4A4B50] font-sans mt-2">
                We will get back to you within 24 hours with ideas, timeline estimates, and honest advice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              {/* Field 01: Name */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#121316] text-sm font-sans focus:outline-none transition-colors ${
                    errors.name ? "border-[#E11D48]" : "border-[#E6E6E8] focus:border-[#1E5FD8]"
                  }`}
                />
                {errors.name && (
                  <span className="text-xs text-[#E11D48] font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Field 02 & 03: Email & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#121316] mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#121316] text-sm font-sans focus:outline-none transition-colors ${
                      errors.email ? "border-[#E11D48]" : "border-[#E6E6E8] focus:border-[#1E5FD8]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-[#E11D48] font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121316] mb-1">
                    Company / Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      if (errors.company) setErrors({ ...errors, company: "" });
                    }}
                    className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#121316] text-sm font-sans focus:outline-none transition-colors ${
                      errors.company ? "border-[#E11D48]" : "border-[#E6E6E8] focus:border-[#1E5FD8]"
                    }`}
                  />
                  {errors.company && (
                    <span className="text-xs text-[#E11D48] font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.company}
                    </span>
                  )}
                </div>
              </div>

              {/* Field 04: Service */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1">
                  What kind of service do you need?
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] text-sm font-sans focus:outline-none focus:border-[#1E5FD8] transition-colors"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 05: Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1">
                  Tell us a bit about what you want to build (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any key goals, timelines, or questions you have..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E6E6E8] text-[#121316] text-sm font-sans focus:outline-none focus:border-[#1E5FD8] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3.5 px-6 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 text-white cursor-pointer min-h-[44px]"
                  data-cursor
                  data-cursor-text="SEND"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Project Details</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Simple, Clean Success Confirmation */
          <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-[#EDF4FF] border border-[#1E5FD8]/30 mx-auto flex items-center justify-center text-[#1E5FD8]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1E5FD8] uppercase tracking-wider block">
                Message Sent Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#121316]">
                Thanks for reaching out!
              </h3>
              <p className="text-sm text-[#4A4B50] font-sans max-w-md mx-auto leading-relaxed">
                We received your message and will review your project details. We will email you at <span className="font-bold text-[#121316]">{formData.email}</span> within 24 hours.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto btn-primary text-xs uppercase tracking-wider font-bold px-6 py-3 cursor-pointer text-white min-h-[44px]"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
