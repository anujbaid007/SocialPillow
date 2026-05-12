"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 0.85, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 lg:px-18"
      data-cursor-text="Play Reel"
    >
      <div className="max-w-[1440px] mx-auto">
        <div
          ref={videoRef}
          className="relative aspect-video rounded-2xl overflow-hidden bg-sp-bg-card border border-white/5"
        >
          {/* Gradient overlay for placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-sp-purple/20 via-sp-bg-dark to-sp-bg-card" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sp-purple/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-sp-purple">
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Agency reel text */}
          <div className="absolute bottom-8 left-8">
            <p className="font-body text-xs text-white/40 uppercase tracking-widest">
              Agency Reel 2025
            </p>
            <p className="font-heading text-lg font-700 text-white/80">
              Watch Our Story
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
