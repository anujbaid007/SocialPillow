"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) { gsap.set(".cta-card", { opacity: 1 }); return; }
      gsap.fromTo(".cta-card", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-44 bg-sp-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="cta-card relative overflow-hidden rounded-3xl bg-gradient-to-br from-sp-purple/20 via-sp-bg-card to-sp-bg-dark border border-white/5 p-10 md:p-16 lg:p-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sp-purple/10 rounded-full" style={{ background: "radial-gradient(circle, rgba(113,21,255,0.15), transparent 70%)" }} aria-hidden="true" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-6">Get In Touch</p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-800 text-sp-white mb-5">Ready to start your project?</h2>
              <p className="font-body text-lg text-sp-text/50 max-w-[500px] leading-relaxed">Let&apos;s discuss how we can help your brand grow and reach its full potential.</p>
            </div>
            <MagneticButton strength={0.2}>
              <Link href="/contact" className="group flex items-center gap-4 px-10 py-6 border-2 border-white/10 rounded-full hover:bg-sp-purple hover:border-sp-purple transition-all duration-500 hover:shadow-[0_0_60px_rgba(113,21,255,0.3)]">
                <span className="font-heading text-lg font-700 text-sp-white">Let&apos;s Talk</span>
                <ArrowRight size={18} className="text-sp-text/25 group-hover:text-white transition-colors" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
