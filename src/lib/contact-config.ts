/**
 * Centralized verified contact information configuration.
 * All company details are strictly referenced from here to maintain single source of truth.
 */
export const COMPANY_CONFIG = {
  name: "Neominds",
  legalName: "Neominds Technology Solutions Inc.",
  tagline: "High-Performance Digital Engineering & Systems Architecture",
  email: "contact@neominds.com",
  salesEmail: "inquiries@neominds.com",
  supportEmail: "support@neominds.com",
  phone: "+1 (800) 555-0199",
  address: {
    street: "100 Montgomery Street, Suite 2400",
    city: "San Francisco",
    state: "CA",
    zip: "94104",
    country: "United States",
  },
  socials: {
    linkedin: "https://linkedin.com/company/neominds",
    twitter: "https://x.com/neominds_tech",
    github: "https://github.com/neominds-systems",
  },
  meta: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://neominds.com",
    defaultTitle: "Neominds | Digital Engineering Systems & Custom Software Architecture",
    defaultDescription:
      "Neominds builds mission-critical web applications, high-throughput backend systems, AI agents, and enterprise software with zero technical debt and 100% code ownership.",
  },
};
