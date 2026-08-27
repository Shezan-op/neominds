"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare } from "lucide-react";
import { HOMEPAGE_FAQS, FAQItem } from "@/lib/data";

interface FAQSectionProps {
  customFaqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  onOpenContact?: () => void;
}

export function FAQSection({
  customFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our engineering sprints, code ownership, and technical capabilities.",
  onOpenContact,
}: FAQSectionProps) {
  const faqs = customFaqs || HOMEPAGE_FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8] overflow-hidden" id="faq">
      {/* Centered bounded column matching tecnomart layout */}
      <div className="w-full max-w-[820px] mx-auto px-5 relative z-10">
        {/* Centered Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1E5FD8] mb-3 flex items-center justify-center gap-2 font-sans">
              <span className="inline-block w-5 h-px bg-[#1E5FD8]" />
              Support & Transparency
              <span className="inline-block w-5 h-px bg-[#1E5FD8]" />
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight mb-4">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-[#4A4B50] font-sans max-w-lg mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Spring-animated Accordion */}
        <div className="border-t border-[#E6E6E8] mb-10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                className="border-b border-[#E6E6E8]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 sm:py-6 text-left focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-serif pr-4 transition-colors duration-200 ${
                      isOpen
                        ? "text-[#1E5FD8] font-semibold"
                        : "text-[#121316] font-normal group-hover:text-[#1E5FD8]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex-shrink-0 p-1.5 border transition-colors duration-200 rounded-none ${
                      isOpen
                        ? "text-[#1E5FD8] border-[#1E5FD8]/40 bg-[#EDF4FF]"
                        : "text-[#7C7D82] border-[#E6E6E8] group-hover:text-[#121316] group-hover:border-[#D2D2D6]"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 text-sm sm:text-base text-[#4A4B50] font-sans leading-relaxed pr-6 border-l-2 border-[#1E5FD8]/40 pl-4 ml-0 mb-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated Support Row matching tecnomart with Sharp Corners */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-[#FFFFFF] border border-[#E6E6E8] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] rounded-none"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div>
            <h4 className="text-[#121316] font-bold text-sm mb-1 font-sans">
              Have a specific technical question or architecture requirement?
            </h4>
            <p className="text-xs text-[#7C7D82] font-sans">
              Senior software engineers respond directly within one business day.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="btn-primary text-xs uppercase tracking-wider font-bold px-5 py-2.5 flex-shrink-0 flex items-center gap-2 rounded-none"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Talk to Engineer</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
