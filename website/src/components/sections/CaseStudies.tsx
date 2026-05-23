"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO } from "@/lib/constants";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Our Projects — horizontal scroll rail with edge-hover auto-scroll.
// Same pattern as Solutions: cursor inside the rightmost / leftmost 18% of
// the section makes the rail scroll continuously in that direction; speed
// ramps up the closer the cursor gets to the edge.
export default function CaseStudies() {
  const items = PORTFOLIO.slice(0, 6);
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const edgeSpeedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  // Index of the card currently centred in the rail — used on touch devices
  // (no hover) to highlight whichever card is in view while side-scrolling.
  const [activeCard, setActiveCard] = useState(0);

  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-project-card]");
    const step = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const tick = useCallback(() => {
    const rail = railRef.current;
    const speed = edgeSpeedRef.current;
    if (!rail || speed === 0) {
      rafRef.current = null;
      return;
    }
    rail.scrollLeft += speed;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const ensureLoop = useCallback(() => {
    if (rafRef.current == null && edgeSpeedRef.current !== 0) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = rect.width;
      const zone = Math.min(280, w * 0.18);
      const maxSpeed = 16;
      let speed = 0;
      if (x > w - zone) {
        const t = Math.min(1, (x - (w - zone)) / zone);
        speed = t * maxSpeed;
      } else if (x < zone) {
        const t = Math.min(1, (zone - x) / zone);
        speed = -t * maxSpeed;
      }
      edgeSpeedRef.current = speed;
      ensureLoop();
    },
    [ensureLoop]
  );

  const handlePointerLeave = useCallback(() => {
    edgeSpeedRef.current = 0;
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) edgeSpeedRef.current = 0;
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Continuously highlight whichever card's centre is nearest the horizontal
  // middle of the screen as the rail is side-scrolled. A scroll listener
  // (rAF-throttled) recomputes the nearest card on every frame so the
  // highlight tracks instantly, rather than waiting for a card to cross an
  // observer band. Only shown on touch/mobile (see the media query below).
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Mobile-only: the highlight is purely a touch affordance (desktop uses
    // hover), so we only track + listen below the lg desktop breakpoint.
    const mql = window.matchMedia("(max-width: 1023px)");

    let raf: number | null = null;
    const recompute = () => {
      raf = null;
      const cards = rail.querySelectorAll<HTMLElement>("[data-project-card]");
      const screenCenter = window.innerWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - screenCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveCard((prev) => (prev === bestIdx ? prev : bestIdx));
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(recompute);
    };

    const attach = () => {
      rail.addEventListener("scroll", onScroll, { passive: true });
      recompute();
    };
    const detach = () => rail.removeEventListener("scroll", onScroll);

    if (mql.matches) attach();
    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) attach();
      else detach();
    };
    mql.addEventListener("change", onMediaChange);
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      detach();
      mql.removeEventListener("change", onMediaChange);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="py-24 md:py-32 bg-sp-bg-secondary overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-4">
              Selected Work
            </p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white leading-[0.95] tracking-[-0.02em]">
              Our Projects
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/work"
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 min-h-[44px] border border-sp-border-strong rounded-full font-body text-sm text-sp-text/80 hover:text-sp-white hover:border-sp-purple transition-colors"
            >
              View all
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous project"
                className="w-12 h-12 rounded-full border border-sp-border-strong text-sp-text/70 hover:text-sp-white hover:border-sp-purple transition-colors flex items-center justify-center"
              >
                <ArrowRight size={18} className="rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next project"
                className="w-12 h-12 rounded-full border border-sp-border-strong text-sp-text/70 hover:text-sp-white hover:border-sp-purple transition-colors flex items-center justify-center"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal rail */}
      <div
        ref={railRef}
        className="sp-projects-rail flex gap-5 md:gap-6 overflow-x-auto overflow-y-hidden pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-16 lg:pr-24"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            data-project-card
            data-active={i === activeCard ? "true" : undefined}
            className="sp-project-card group block focus:outline-none shrink-0"
            aria-label={`${item.title} — ${item.subtitle}`}
            style={{ width: "clamp(280px, 78vw, 460px)" }}
          >
            <div className="sp-card-frame relative aspect-[4/5] rounded-3xl overflow-hidden bg-sp-bg-card border border-sp-border-strong transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-15px_rgba(113,21,255,0.35)]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 460px, 78vw"
                className="sp-card-img object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                unoptimized
              />

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
              />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="font-body text-xs font-700 tabular-nums text-white drop-shadow">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <span className="inline-flex px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full font-body text-[10px] font-600 text-white uppercase tracking-[0.15em]">
                  {item.category}
                </span>
              </div>

              {/* Title + arrow stacked on top of the gradient veil */}
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-heading text-2xl md:text-3xl font-800 text-white leading-[1.05] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-white/75 mt-1.5 leading-snug line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
                <span className="sp-card-arrow shrink-0 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-sp-purple group-hover:scale-110">
                  <ArrowUpRight size={18} className="text-white" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* End-cap "View all" tile */}
        <Link
          href="/work"
          data-project-card
          className="shrink-0 flex flex-col items-center justify-center rounded-3xl border border-dashed border-sp-border-strong/70 text-sp-text/60 hover:text-sp-white hover:border-sp-purple/50 transition-colors px-8 py-10 gap-3"
          style={{ width: "clamp(220px, 60vw, 320px)" }}
        >
          <span className="font-body text-xs uppercase tracking-[0.24em]">More Projects</span>
          <span className="font-heading text-3xl md:text-4xl font-800 leading-tight text-center">
            See all work
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12 px-6 md:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-sp-border-strong rounded-full font-body text-sm text-sp-text/80 hover:text-sp-white hover:border-sp-purple transition-colors"
        >
          View all projects
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <style>{`
        .sp-projects-rail::-webkit-scrollbar { display: none; }

        /* On mobile/tablet (below the lg desktop layout) there's no reliable
           hover, so highlight the centred card while the rail is side-scrolled.
           Mirrors the desktop group-hover treatment. */
        @media (max-width: 1023px) {
          .sp-project-card[data-active="true"] .sp-card-frame {
            box-shadow: 0 20px 50px -15px rgba(113, 21, 255, 0.35);
            border-color: rgba(113, 21, 255, 0.45);
          }
          .sp-project-card[data-active="true"] .sp-card-img {
            transform: scale(1.04);
          }
          .sp-project-card[data-active="true"] .sp-card-arrow {
            background-color: var(--sp-purple);
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
