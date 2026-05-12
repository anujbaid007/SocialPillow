"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [time, setTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !footerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: 80, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="sticky bottom-0 z-0 text-white"
      style={{ background: "linear-gradient(180deg, #1a0e2e 0%, #0a0514 100%)" }}
    >
      {/* Pre-footer CTA */}
      <div className="py-16 md:py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link
            href="/contact"
            className="group flex items-center gap-4 px-7 py-3.5 border border-white/10 rounded-full hover:bg-sp-purple hover:border-sp-purple transition-all duration-300"
          >
            <span className="font-body text-base">India</span>
            <span className="font-body text-sm text-white/40 group-hover:text-white/70 transition-colors tabular-nums">
              {time} IST
            </span>
          </Link>
          <p className="font-heading text-3xl md:text-4xl font-700 text-center">
            Let&apos;s create something{" "}
            <span className="text-sp-purple">extraordinary</span>
          </p>
        </div>
      </div>

      {/* Footer Logo — parallax reveal */}
      <div
        ref={logoRef}
        className="flex justify-center py-16 md:py-24 px-6"
      >
        <Link href="/contact" className="block">
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[110px] font-900 tracking-[-0.04em] text-center hover:scale-[1.02] transition-transform duration-500">
            <span className="text-white">Social</span>
            <span className="text-sp-purple">Pillow</span>
          </h2>
        </Link>
      </div>

      {/* Footer links */}
      <div className="border-t border-white/[0.06] py-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {Object.entries(BRAND.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-sp-purple transition-colors duration-300 text-sm capitalize"
              >
                {platform}
              </a>
            ))}
          </div>

          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            {["About", "Contact", "Work", "Blog", "Services"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-white/30 hover:text-white transition-colors duration-300 text-sm"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="text-right">
            <p className="text-white/25 text-xs">Proudly created in India.</p>
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} Social Pillow. {BRAND.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
