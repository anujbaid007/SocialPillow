"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function WhatDefinesUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".defines-word");
      if (prefersReduced) { words.forEach((w) => gsap.set(w, { opacity: 1 })); return; }
      words.forEach((word) => {
        gsap.fromTo(word, { opacity: 0.15 }, {
          opacity: 1, ease: "none",
          scrollTrigger: { trigger: word, start: "top 85%", end: "top 45%", scrub: true },
        });
      });
      gsap.to(".rotating-arrow", { rotation: 360, duration: 8, ease: "none", repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const text1 = "We are brand builders at heart, creators by design, and digital enthusiasts in practice.";
  const text2 = "Our mission — taking the best of Indian creative talent to the world, one brand at a time.";

  return (
    <section ref={sectionRef} className="py-32 md:py-44 px-6 md:px-16 lg:px-24 bg-sp-bg-secondary">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-32">
          <div className="flex items-center gap-5 mb-10">
            <div className="rotating-arrow w-14 h-14 border-2 border-sp-purple rounded-full flex items-center justify-center">
              <ArrowRight size={22} className="text-sp-purple" />
            </div>
            <span className="font-body text-sm uppercase tracking-[0.15em] text-sp-text/30">What Defines Us</span>
          </div>
          <MagneticButton strength={0.2}>
            <Link href="/about" className="inline-flex items-center gap-3 px-10 py-5 bg-sp-purple text-white rounded-full font-body text-base font-500 hover:bg-sp-purple-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(113,21,255,0.3)]">
              <span className="relative z-10">Dive Into Our Story</span>
              <ArrowRight size={16} className="relative z-10" />
            </Link>
          </MagneticButton>
        </div>

        <div className="lg:col-span-3 space-y-12">
          <p className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-700 leading-[1.25]">
            {text1.split(" ").map((word, i) => (
              <span key={i}><span className="defines-word inline">{word}</span>{" "}</span>
            ))}
          </p>
          <p className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-700 leading-[1.25]">
            {text2.split(" ").map((word, i) => (
              <span key={i}><span className="defines-word inline">{word}</span>{" "}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
