"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diamond } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!trackRef.current || !sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const track = trackRef.current;
    const width = track.scrollWidth / 2;
    const tween = gsap.to(track, { x: -width, duration: 20, ease: "none", repeat: -1 });

    let tsTween: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current, start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        tsTween?.kill();
        tsTween = gsap.to(tween, { timeScale: Math.min(1 + velocity / 2000, 4), duration: 0.3 });
      },
      onLeave: () => { tsTween?.kill(); tsTween = gsap.to(tween, { timeScale: 1, duration: 0.5 }); },
      onLeaveBack: () => { tsTween?.kill(); tsTween = gsap.to(tween, { timeScale: 1, duration: 0.5 }); },
    });
    return () => { tween.kill(); tsTween?.kill(); st.kill(); };
  }, []);

  const text = "IT'S TIME TO CREATE WITH SOCIAL PILLOW";

  return (
    <section ref={sectionRef} className="py-10 md:py-14 overflow-hidden bg-sp-bg border-y border-white/5" aria-hidden="true">
      <div ref={trackRef} className="flex items-center whitespace-nowrap gap-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-heading text-4xl md:text-6xl lg:text-7xl font-900 uppercase tracking-wider text-sp-white">{text}</span>
            <Diamond size={24} className="text-sp-purple shrink-0" fill="currentColor" />
            <span className="font-heading text-4xl md:text-6xl lg:text-7xl font-900 uppercase tracking-wider stroke-text">{text}</span>
            <Diamond size={24} className="text-sp-purple shrink-0" fill="currentColor" />
          </div>
        ))}
      </div>
    </section>
  );
}
