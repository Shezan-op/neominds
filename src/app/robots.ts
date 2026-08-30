import { MetadataRoute } from "next";
import { COMPANY_CONFIG } from "@/lib/contact-config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = COMPANY_CONFIG.meta.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
