"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

/**
 * Solutions — Schbang-style horizontal scroll row.
 *
 * Five tall solution cards rendered as a horizontal-scroll rail. The active
 * card (hovered/focused) lights up with its brand color and reveals the
 * capability list; the rest sit as ghosted outlined-text placeholders. Drag
 * or use the arrow buttons to scroll; native CSS scroll-snap keeps the next
 * card lined up to the viewport edge.
 *
 * Edge-hover auto-scroll: when the cursor enters the rightmost or leftmost
 * ~18% of the section, the rail scrolls continuously toward that edge. The
 * scroll speed ramps up the closer the cursor gets to the edge. Leaves the
 * scroll zone or moves cursor offscreen → stops.
 */
export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const edgeSpeedRef = useRef(0); // pixels per frame; negative = scroll left
  const rafRef = useRef<number | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-solution-card]");
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // rAF loop — applies whatever speed edgeSpeedRef currently holds. Single
  // loop kept alive across pointer moves so we don't churn rAF handles.
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
      // Edge zone width — 18% of the section on each side.
      const zone = Math.min(280, w * 0.18);
      // Inside the right zone → positive speed (scroll right).
      // Inside the left zone → negative speed (scroll left).
      // Speed scales linearly from 0 at zone boundary to maxSpeed at the edge.
      const maxSpeed = 16; // px / frame ≈ 960px/sec at 60fps
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

  // Stop on prefers-reduced-motion users — they get arrow buttons only.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) edgeSpeedRef.current = 0;
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Mobile: there's no hover to drive the active card, so make whichever card
  // is nearest the horizontal centre of the screen the active one as the rail
  // is side-scrolled. rAF-throttled so it tracks instantly. Desktop keeps the
  // hover/focus behaviour (this listener is only attached below the lg layout).
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const mql = window.matchMedia("(max-width: 1023px)");

    let raf: number | null = null;
    const recompute = () => {
      raf = null;
      const cards = rail.querySelectorAll<HTMLElement>(".sp-solution-card");
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
      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
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
    const onMediaChange = (e: MediaQueryListEvent) => (e.matches ? attach() : detach());
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
      className="relative bg-sp-bg-secondary overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 pt-24 md:pt-32 pb-10 md:pb-14">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-4">
          What we do
        </p>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white leading-[0.95] tracking-[-0.02em]">
            Our Solutions
          </h2>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous solution"
              className="w-12 h-12 rounded-full border border-sp-border-strong text-sp-text/70 hover:text-sp-white hover:border-sp-purple transition-colors flex items-center justify-center"
            >
              <ArrowRight size={18} className="rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next solution"
              className="w-12 h-12 rounded-full border border-sp-border-strong text-sp-text/70 hover:text-sp-white hover:border-sp-purple transition-colors flex items-center justify-center"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div
        ref={railRef}
        role="tablist"
        aria-label="Our Solutions"
        className="sp-solutions-rail flex gap-5 overflow-x-auto overflow-y-hidden pb-24 md:pb-32 pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-16 lg:pr-24"
        style={{ scrollbarWidth: "none" }}
      >
        {SOLUTIONS.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              data-solution-card
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              className="sp-solution-card group relative flex flex-col justify-between rounded-3xl p-8 md:p-9 min-h-[480px] md:min-h-[560px] lg:min-h-[640px] overflow-hidden transition-[background-color,border-color,transform] duration-500 ease-out shrink-0"
              style={{
                width: "clamp(280px, 78vw, 460px)",
                backgroundColor: isActive ? s.color : "transparent",
                borderWidth: 1,
                borderColor: isActive ? s.color : "var(--sp-border-strong)",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {/* Top row — index */}
              <div className="flex items-start justify-between gap-4">
                <span
                  className="font-body text-xs md:text-sm font-700 tabular-nums uppercase tracking-[0.2em] transition-colors duration-500"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : "var(--sp-text)" }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(SOLUTIONS.length).padStart(2, "0")}
                </span>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-500"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                    borderWidth: 1,
                    borderColor: isActive ? "transparent" : "var(--sp-border-strong)",
                    color: isActive ? "#FFFFFF" : "var(--sp-text)",
                  }}
                >
                  Solution
                </span>
              </div>

              {/* Middle — title + dynamic content */}
              <div className="flex-1 flex flex-col justify-center py-8">
                <h3
                  className="font-heading font-900 leading-[0.92] tracking-[-0.025em] transition-colors duration-500"
                  style={{
                    fontSize: "clamp(2.25rem, 4.2vw, 4rem)",
                    color: isActive ? "#FFFFFF" : "transparent",
                    WebkitTextStroke: isActive ? "0" : "1.5px var(--sp-white)",
                  }}
                >
                  {s.title.split(" ").map((word, idx) => (
                    <span key={idx} className="block">
                      {word}
                    </span>
                  ))}
                </h3>

                {/* Description — only the active card shows it */}
                <div
                  className="mt-6 transition-[opacity,max-height] duration-500 ease-out overflow-hidden"
                  style={{
                    opacity: isActive ? 1 : 0,
                    maxHeight: isActive ? 360 : 0,
                  }}
                >
                  <p className="font-body text-base md:text-lg text-white/90 leading-relaxed">
                    {s.blurb}
                  </p>
                  <ul className="mt-5 space-y-1.5">
                    {s.capabilities.slice(0, 5).map((cap) => (
                      <li
                        key={cap}
                        className="font-body text-sm text-white/75 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom — arrow chip */}
              <div className="flex items-center justify-between">
                <span
                  className="font-body text-sm md:text-base font-500 transition-colors duration-500"
                  style={{ color: isActive ? "#FFFFFF" : "var(--sp-text)" }}
                >
                  Explore
                </span>
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? "#FFFFFF" : "transparent",
                    borderWidth: 1,
                    borderColor: isActive ? "#FFFFFF" : "var(--sp-border-strong)",
                    transform: isActive ? "rotate(-45deg)" : "rotate(0deg)",
                  }}
                >
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    style={{ color: isActive ? s.color : "var(--sp-text)" }}
                  />
                </span>
              </div>
            </Link>
          );
        })}

        {/* End-cap CTA card — "View all" at the tail of the rail */}
        <Link
          href="/services"
          data-solution-card
          className="shrink-0 flex flex-col items-center justify-center rounded-3xl border border-dashed border-sp-border-strong/70 text-sp-text/60 hover:text-sp-white hover:border-sp-purple/50 transition-colors px-8 py-10 gap-3"
          style={{ width: "clamp(220px, 60vw, 320px)", minHeight: 480 }}
        >
          <span className="font-body text-xs uppercase tracking-[0.24em]">All Solutions</span>
          <span className="font-heading text-3xl md:text-4xl font-800 leading-tight text-center">
            See the full catalog
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>

      <style>{`
        .sp-solutions-rail::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
