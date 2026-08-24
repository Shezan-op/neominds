import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
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
      className={`${instrumentSerif.variable} ${manrope.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#121316] antialiased selection:bg-[#FF5200] selection:text-white min-h-screen flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

