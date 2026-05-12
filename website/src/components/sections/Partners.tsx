"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const PARTNERS = [
  { name: "Google", logo: "/images/partners/google.svg" },
  { name: "Meta", logo: "/images/partners/meta.svg" },
  { name: "Shopify", logo: "/images/partners/shopify.svg" },
  { name: "HubSpot", logo: "/images/partners/hubspot.svg" },
  { name: "Adobe", logo: "/images/partners/adobe.svg" },
  { name: "Zoho", logo: "/images/partners/zoho.svg" },
  { name: "Semrush", logo: "/images/partners/semrush.svg" },
  { name: "Google Ads", logo: "/images/partners/googleads.svg" },
  { name: "Google Analytics", logo: "/images/partners/googleanalytics.svg" },
];

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const w = trackRef.current.scrollWidth / 2;
    const tween = gsap.to(trackRef.current, { x: -w, duration: 25, ease: "none", repeat: -1 });
    return () => { tween.kill(); };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-sp-bg-secondary border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 mb-12">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-text/40">Technology & Platform Partners</p>
      </div>
      <div ref={trackRef} className="flex items-center gap-10 md:gap-14 whitespace-nowrap" aria-hidden="true">
        {[...PARTNERS, ...PARTNERS].map((partner, i) => (
          <div key={`p-${i}`} className="shrink-0 flex items-center gap-3 px-6 py-3 border border-white/[0.06] rounded-xl hover:border-white/15 transition-colors duration-300">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={24}
              height={24}
              className="w-5 h-5 opacity-50"
              unoptimized
            />
            <span className="font-body text-sm text-sp-text/40 hover:text-sp-text/70 transition-colors duration-300">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
