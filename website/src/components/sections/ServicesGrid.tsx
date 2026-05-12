"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) { gsap.set(".service-block", { opacity: 1 }); return; }
      gsap.fromTo(".service-block", { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const moveLens = useCallback((event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const lens = lensRef.current;
    const container = containerRef.current;
    if (!lens || !container) return;
    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;
    const rowRect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rowRect.left;
    const rotate = localX * 0.12;
    const service = SERVICES[index];
    // Direct DOM mutation — no React re-render
    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
    lens.style.borderColor = service.color;
    lens.style.boxShadow = `0 0 0 1px ${service.color}30, 0 18px 60px ${service.color}35, inset 0 0 40px ${service.color}18`;
    lens.style.background = `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.22), ${service.color}26 38%, rgba(6,1,14,0.82) 70%)`;
    lens.style.display = "flex";
    // Update ring and inner text
    const ringEl = lens.querySelector<HTMLElement>("[data-lens-ring]");
    if (ringEl) ringEl.style.background = `conic-gradient(from 0deg, ${service.color}, transparent 28%, ${service.color} 42%, transparent 68%, ${service.color})`;
    const numEl = lens.querySelector<HTMLElement>("[data-lens-num]");
    const titleEl = lens.querySelector<HTMLElement>("[data-lens-title]");
    if (numEl) numEl.textContent = String(index + 1).padStart(2, "0");
    if (titleEl) {
      titleEl.textContent = service.title;
      titleEl.style.transform = `rotate(${-rotate}deg) scale(1.08)`;
    }
    lensIndexRef.current = index;
  }, []);

  const hideLens = useCallback(() => {
    if (lensRef.current) lensRef.current.style.display = "none";
    lensIndexRef.current = null;
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 md:py-44 bg-sp-bg">
      <GridPattern
        width={44}
        height={44}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        squares={[
          [2, 3],
          [5, 1],
          [8, 5],
          [11, 2],
          [15, 7],
          [19, 4],
          [23, 9],
          [28, 3],
          [31, 8],
          [35, 5],
        ]}
        className={cn(
          "stroke-sp-purple/25 fill-sp-purple/10",
          "[mask-image:radial-gradient(760px_circle_at_35%_42%,white,transparent_78%)]",
          "inset-x-0 inset-y-[-18%] h-[140%] skew-y-6 opacity-60",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(113,21,255,0.14),transparent_32%),linear-gradient(to_bottom,transparent,rgba(6,1,14,0.72))]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="mb-16 md:mb-24">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-5">What We Do</p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white">Our Services</h2>
        </div>

        <div ref={containerRef} className="border-t border-white/[0.06] relative">
          {/* Shared lens element — moved by JS, never re-rendered */}
          <div
            ref={lensRef}
            className="pointer-events-none absolute z-20 hidden h-40 w-40 items-center justify-center rounded-full border"
            style={{ display: "none", backdropFilter: "blur(10px)" }}
          >
            <div
              data-lens-ring
              className="absolute inset-2 rounded-full opacity-80"
              style={{
                maskImage: "radial-gradient(circle, transparent 55%, black 57%)",
                WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 57%)",
              }}
            />
            <div className="relative text-center">
              <p data-lens-num className="font-body text-[10px] font-700 uppercase tracking-[0.24em] text-white/50" />
              <p data-lens-title className="font-heading text-3xl font-900 leading-none text-white" />
            </div>
          </div>

          {SERVICES.map((service, i) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="service-block block group" style={{ opacity: 0 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseMove={(event) => moveLens(event, i)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                hideLens();
              }}>
              <div className="flex items-center justify-between py-8 md:py-12 border-b border-white/[0.06] transition-all duration-500 relative overflow-hidden"
                style={{
                  backgroundColor: hoveredIndex === i ? `${service.color}08` : "transparent",
                }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
                  style={{ backgroundColor: hoveredIndex === i ? service.color : "transparent" }} />
                <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0 pl-4 md:pl-6">
                  <span className="font-heading text-xs font-700 text-sp-text/25 tabular-nums shrink-0 hidden md:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-900 transition-colors duration-500 truncate"
                    style={{ color: hoveredIndex === i ? service.color : "rgba(255,255,255,0.85)" }}>
                    {service.title}
                  </span>
                  <span className="hidden lg:block font-body text-sm text-sp-text/40 max-w-[300px] leading-relaxed shrink-0">{service.description}</span>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 mr-2"
                  style={{
                    borderColor: hoveredIndex === i ? service.color : "rgba(255,255,255,0.1)",
                    backgroundColor: hoveredIndex === i ? service.color : "transparent",
                  }}>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ color: hoveredIndex === i ? "white" : "rgba(255,255,255,0.3)" }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
