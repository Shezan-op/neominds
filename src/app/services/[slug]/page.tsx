import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES_DATA, ServiceItem } from "@/lib/data";
import { ServicePageClient } from "./ServicePageClient";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Neominds",
    };
  }

  return {
    title: `${service.title} | Neominds Technology Solutions`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Neominds`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}
