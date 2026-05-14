"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

/**
 * Vertical Solutions cards — schbang-style.
 *
 * Three tall columns side-by-side. The active column (default = 0, then
 * follows mouse hover) is painted in its brand color with full content;
 * the others render as ghosted outlined-text placeholders so the row
 * still reads as one composition. Click anywhere on a card to jump into
 * the dedicated solution page.
 *
 * No scroll listeners, no rAF — just hover state + CSS transitions on
 * GPU-friendly properties (color, background-color, opacity).
 */
export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-sp-bg-secondary overflow-hidden">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 pt-24 md:pt-32 pb-10 md:pb-14">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-4">
          What we do
        </p>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white">
            Our Solutions
          </h2>
          <p className="hidden md:block font-body text-sm text-sp-text/55 max-w-[280px]">
            Hover any card to expand it. Click through to explore the full solution.
          </p>
        </div>
      </div>

      {/* Vertical-card row */}
      <div className="px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
        <div
          role="tablist"
          aria-label="Our Solutions"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-[1400px] mx-auto"
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
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                className="sp-solution-card group relative flex flex-col justify-between rounded-3xl p-8 md:p-9 min-h-[440px] md:min-h-[560px] lg:min-h-[640px] overflow-hidden transition-[background-color,border-color,transform] duration-500 ease-out"
                style={{
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
                <div className="flex-1 flex flex-col justify-center py-10">
                  <h3
                    className="font-heading font-900 leading-[0.92] tracking-[-0.025em] transition-colors duration-500"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
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
                      maxHeight: isActive ? 280 : 0,
                    }}
                  >
                    <p className="font-body text-base md:text-lg text-white/90 leading-relaxed max-w-[34ch]">
                      {s.blurb}
                    </p>
                    <ul className="mt-5 space-y-1.5">
                      {s.capabilities.slice(0, 3).map((cap) => (
                        <li
                          key={cap}
                          className="font-body text-sm text-white/75 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/60" />
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
        </div>
      </div>
    </section>
  );
}
