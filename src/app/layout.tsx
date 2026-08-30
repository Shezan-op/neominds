import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { COMPANY_CONFIG } from "@/lib/contact-config";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF9F6",
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_CONFIG.meta.siteUrl),
  title: {
    default: "Neominds | Simple, Powerful Software & AI That Works",
    template: "%s | Neominds",
  },
  description:
    "We build custom websites, apps, and helpful AI tools for growing businesses. Clean code, direct communication, and 100% code ownership.",
  keywords: [
    "Custom Software",
    "Web Development",
    "App Development",
    "AI Tools",
    "Software Engineering",
    "Neominds",
  ],
  authors: [{ name: COMPANY_CONFIG.name }],
  creator: COMPANY_CONFIG.name,
  publisher: COMPANY_CONFIG.legalName,
  openGraph: {
    title: "Neominds | Simple, Powerful Software & AI That Works",
    description:
      "We build custom websites, apps, and helpful AI tools for growing businesses. Clean code, direct communication, and 100% code ownership.",
    url: COMPANY_CONFIG.meta.siteUrl,
    siteName: COMPANY_CONFIG.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opening.png",
        width: 1920,
        height: 1080,
        alt: "Neominds Software & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neominds | Simple, Powerful Software & AI That Works",
    description:
      "We build custom websites, apps, and helpful AI tools for growing businesses. Clean code, direct communication, and 100% code ownership.",
    images: ["/opening.png"],
    creator: "@neominds_tech",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${manrope.variable}`}
    >
      <body className="bg-[#FAF9F6] text-[#121316] antialiased selection:bg-[#1E5FD8] selection:text-white min-h-screen flex flex-col font-sans">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
