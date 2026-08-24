"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export function ServicesEditorial() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-[#E6E6E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E6E8] rounded-sm mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7D82] font-sans">
              Core Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#121316] leading-tight">
            Comprehensive technical services for modern enterprises.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4B50] font-sans">
            We provide full-lifecycle software engineering, practical AI deployment, and technical consulting.
          </p>
        </motion.div>

        {/* Editorial Services Table / List */}
        <div className="border-t border-[#E6E6E8]">
          {SERVICES_DATA.map((service, index) => {
            const serviceNumber = (index + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block border-b border-[#E6E6E8] py-7 sm:py-9 hover:bg-[#FFFFFF] transition-all duration-200 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start sm:items-center">
                    {/* Service Number */}
                    <div className="md:col-span-1">
                      <span className="text-xs font-mono font-bold text-[#7C7D82] group-hover:text-[#FF5200] transition-colors">
                        {serviceNumber}
                      </span>
                    </div>

                    {/* Service Title */}
                    <div className="md:col-span-4">
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#121316] group-hover:text-[#FF5200] transition-colors flex items-center gap-2">
                        <span>{service.title}</span>
                      </h3>
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-6">
                      <p className="text-sm text-[#4A4B50] font-sans leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Arrow Action */}
                    <div className="md:col-span-1 flex justify-start md:justify-end">
                      <div className="w-8 h-8 rounded-sm bg-[#FAF9F6] border border-[#E6E6E8] group-hover:border-[#FF5200] group-hover:bg-[#FF5200] text-[#7C7D82] group-hover:text-white flex items-center justify-center transition-all duration-200">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
