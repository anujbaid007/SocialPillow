import type { Metadata, Viewport } from "next";
import { Cairo, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Social Pillow — Marketing You.",
  description:
    "Social Pillow is a digital marketing and branding agency. We boost brands, maximize reach, and drive growth for companies like Hero, Uber, BMW, Kia, and more.",
  keywords: [
    "digital marketing",
    "branding agency",
    "social media marketing",
    "SEO",
    "content strategy",
    "Social Pillow",
  ],
  openGraph: {
    title: "Social Pillow — Marketing You.",
    description: "Boost Brands, Maximize Reach, Drive Growth.",
    type: "website",
    url: "https://socialpillow.co",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(cairo.variable, spaceGrotesk.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll />
        <Navbar />
        <div className="relative z-10 isolate overflow-hidden rounded-b-[40px] md:rounded-b-[60px]" style={{ backgroundColor: "var(--sp-bg-primary)" }}>
          <main id="main-content">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
