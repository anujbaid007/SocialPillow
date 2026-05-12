"use client";

import { HeroParallax, HeroProduct } from "@/components/blocks/hero-parallax";

const HERO_PRODUCTS: HeroProduct[] = [
  {
    title: "Social Media Strategy",
    link: "/services/social-media",
    gradient: "linear-gradient(135deg, #7115FF 0%, #1a0533 50%, #0a0118 100%)",
    icon: "📱",
  },
  {
    title: "Hero Motocorp Campaign",
    link: "/work/hero-motocorp",
    gradient: "linear-gradient(135deg, #B60BFF 0%, #2d0845 50%, #0a0118 100%)",
    icon: "🏍️",
  },
  {
    title: "Brand Identity Design",
    link: "/services/branding",
    gradient: "linear-gradient(135deg, #A412E2 0%, #1e0a35 50%, #06010E 100%)",
    icon: "🎨",
  },
  {
    title: "JBL Feel The Bass",
    link: "/work/jbl-feel-the-bass",
    gradient: "linear-gradient(135deg, #FF6B2B 0%, #331206 50%, #0a0118 100%)",
    icon: "🎧",
  },
  {
    title: "SEO & Growth",
    link: "/services/seo",
    gradient: "linear-gradient(135deg, #15B8FF 0%, #042a3d 50%, #06010E 100%)",
    icon: "📈",
  },
  {
    title: "Uber India Creative",
    link: "/work/uber-india",
    gradient: "linear-gradient(135deg, #00C853 0%, #0a2e14 50%, #06010E 100%)",
    icon: "🚗",
  },
  {
    title: "Performance Marketing",
    link: "/services/performance-marketing",
    gradient: "linear-gradient(135deg, #FF1744 0%, #33050d 50%, #0a0118 100%)",
    icon: "🎯",
  },
  {
    title: "Shudh — Organic Branding",
    link: "/work/shudh",
    gradient: "linear-gradient(135deg, #76FF03 0%, #1a3300 50%, #06010E 100%)",
    icon: "🌿",
  },
  {
    title: "Content Strategy",
    link: "/services/content-strategy",
    gradient: "linear-gradient(135deg, #FFD600 0%, #332b00 50%, #0a0118 100%)",
    icon: "✍️",
  },
  {
    title: "WRNING — Fashion Brand",
    link: "/work/wrning",
    gradient: "linear-gradient(135deg, #FF4081 0%, #330d1a 50%, #0a0118 100%)",
    icon: "👕",
  },
  {
    title: "Influencer Marketing",
    link: "/services/social-media",
    gradient: "linear-gradient(135deg, #E040FB 0%, #2d0833 50%, #06010E 100%)",
    icon: "⭐",
  },
  {
    title: "Hamari Asha Launch",
    link: "/work/hamari-asha",
    gradient: "linear-gradient(135deg, #FFAB40 0%, #33220d 50%, #0a0118 100%)",
    icon: "🕯️",
  },
  {
    title: "Website Development",
    link: "/services/branding",
    gradient: "linear-gradient(135deg, #536DFE 0%, #111633 50%, #06010E 100%)",
    icon: "💻",
  },
  {
    title: "BMW Digital Presence",
    link: "/work",
    gradient: "linear-gradient(135deg, #40C4FF 0%, #0d2833 50%, #06010E 100%)",
    icon: "🚙",
  },
  {
    title: "Creative Direction",
    link: "/services/content-strategy",
    gradient: "linear-gradient(135deg, #7C4DFF 0%, #190f33 50%, #06010E 100%)",
    icon: "🎬",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-sp-bg">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sp-bg via-sp-bg to-sp-bg-secondary" />
      {/* Static orb glows */}
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute top-[12%] left-[8%] z-0 w-[500px] h-[500px] bg-sp-purple/8 rounded-full blur-[120px]" />
        <div className="absolute top-[35%] right-[3%] z-0 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[120px]" />
      </div>
      <HeroParallax products={HERO_PRODUCTS} />
    </section>
  );
}
