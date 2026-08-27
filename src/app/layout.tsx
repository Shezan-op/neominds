import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-source-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF9F6",
};

export const metadata: Metadata = {
  title: "Neominds | AI and Technology Solutions Company",
  description:
    "We build, test, and deploy practical AI solutions, custom software, automated workflows, and enterprise applications for growing businesses.",
  keywords: [
    "Technology Solutions",
    "AI Agents",
    "Software Development",
    "Application Development",
    "Website Development",
    "Software Testing",
    "Business Audits",
    "Technical Consultation",
    "Neominds",
  ],
  authors: [{ name: "Neominds" }],
  openGraph: {
    title: "Neominds | AI and Technology Solutions Company",
    description:
      "A serious technical partner for businesses building custom software, practical AI solutions, and reliable digital systems.",
    type: "website",
    locale: "en_US",
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
      className={`${bricolageGrotesque.variable} ${sourceSans3.variable}`}
    >
      <body className="bg-[#FAF9F6] text-[#121316] antialiased selection:bg-[#1E5FD8] selection:text-white min-h-screen flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
