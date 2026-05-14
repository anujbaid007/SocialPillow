import type { Metadata, Viewport } from "next";
import { Cairo, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";
import ThemeToggle from "@/components/ThemeToggle";
import DirectionalCursor from "@/components/DirectionalCursor";

import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

// Runs before React hydration — applies persisted theme to <html> so first
// paint matches the user's saved preference and we never flash the default.
const THEME_INIT_SCRIPT = `
(function(){try{var t=localStorage.getItem('sp-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();
`;

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
    <html lang="en" className={cn(cairo.variable, spaceGrotesk.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-sp-bg sp-footer-reveal-body">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll />
        <Navbar />
        {/* Main content sits on z-10 with a solid bg so the fixed footer
            underneath (z-0) is hidden until the user scrolls past main.
            FooterReveal measures footer height and sets --footer-h so
            body padding-bottom matches exactly. */}
        <main id="main-content" className="relative z-10 bg-sp-bg">
          {children}
          {/* Sentinel — sits at the very bottom of <main>. When this scrolls
              into view, main is about to slide up off the viewport and the
              fixed footer underneath begins to reveal. FooterReveal observes
              this to trigger the footer's slide-in decorations. */}
          <div
            id="sp-footer-sentinel"
            aria-hidden="true"
            className="h-px w-full pointer-events-none"
          />
        </main>
        <Footer />
        <FooterReveal />
        <ThemeToggle />
        <DirectionalCursor />
      </body>
    </html>
  );
}
