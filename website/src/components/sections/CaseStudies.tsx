"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PORTFOLIO } from "@/lib/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const scrollLeft = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      window.scrollBy({ top: -window.innerHeight * 0.75, behavior: "smooth" });
      return;
    }
    trackRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
      return;
    }
    trackRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const updateCounter = (progress: number) => {
      if (!counterRef.current) return;
      const idx = Math.min(PORTFOLIO.length, Math.round(progress * (PORTFOLIO.length - 1)) + 1);
      counterRef.current.textContent = String(idx).padStart(2, "0");
    };

    const ctx = gsap.context(() => {
      gsap.set(".cs-heading, .cs-card", { opacity: 1 });
      if (prefersReduced) return;

      gsap.fromTo(".cs-heading", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".cs-card", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: trackRef.current, start: "top 80%" },
      });

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const track = trackRef.current;
          if (!track) return undefined;

          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

          const horizontalTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: 0.5,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onUpdate: (self) => updateCounter(self.progress),
            },
          });

          return () => horizontalTween.kill();
        },
      });
    }, sectionRef);

    const track = trackRef.current;
    const updateCounterFromScroll = () => {
      if (!track || !counterRef.current) return;
      const idx = Math.round(track.scrollLeft / 500) + 1;
      counterRef.current.textContent = String(idx).padStart(2, "0");
    };
    track?.addEventListener("scroll", updateCounterFromScroll, { passive: true });
    return () => { ctx.revert(); track?.removeEventListener("scroll", updateCounterFromScroll); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-sp-bg-secondary overflow-hidden md:min-h-screen md:py-0 py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 md:pt-32 lg:pt-36">
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <div>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-5">Selected Work</p>
            <h2 className="cs-heading font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white">Our Projects</h2>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="font-heading text-5xl font-800 text-sp-purple"><span ref={counterRef}>01</span></span>
            <span className="text-sp-text/30 font-body text-base">/ {String(PORTFOLIO.length).padStart(2, "0")}</span>
            <div className="flex gap-3 ml-4">
              <button onClick={scrollLeft} className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-sp-purple hover:border-sp-purple transition-all duration-300" aria-label="Previous">
                <ArrowLeft size={20} />
              </button>
              <button onClick={scrollRight} className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-sp-purple hover:border-sp-purple transition-all duration-300" aria-label="Next">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-8 overflow-x-auto md:overflow-visible px-6 md:px-16 lg:px-24 pb-6 md:pb-32 snap-x snap-mandatory scrollbar-hide will-change-transform" style={{ scrollbarWidth: "none" }}>
        {PORTFOLIO.map((item, i) => (
          <Link key={item.slug} href={`/work/${item.slug}`} className="cs-card shrink-0 w-[340px] md:w-[480px] lg:w-[560px] snap-start group" style={{ opacity: 0 }}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sp-bg-card border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500 ease-out">
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ background: `linear-gradient(${135 + i * 30}deg, ${["#7115FF", "#A412E2", "#B60BFF", "#6D28D9", "#8B5CF6", "#4C1D95"][i]}40, #0a0514)` }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-3xl md:text-4xl font-800 text-white/20 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500">{item.title}</span>
              </div>
              <div className="absolute top-5 left-5">
                <span className="px-4 py-1.5 bg-sp-purple/90 backdrop-blur-sm rounded-full font-body text-xs font-500 text-white uppercase tracking-wide">{item.category}</span>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-heading text-xl md:text-2xl font-700 text-sp-white group-hover:text-sp-purple transition-colors duration-300">{item.title}</h3>
              <p className="font-body text-sm text-sp-text/50 mt-1.5">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
