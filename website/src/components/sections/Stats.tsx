"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

/**
 * Animated stats counter.
 *
 * Design decisions (Emil Kowalski / UI-UX Pro Max guidance):
 *  - Numbers animate FROM 0 to target using cubic ease-out (entering motion).
 *  - Total duration ~1400ms with per-item stagger of 120ms — long enough
 *    to be noticed, short enough that the section is fully readable in
 *    well under 2s.
 *  - Trigger fires once via IntersectionObserver at 35% visibility — the
 *    number is animating WHEN the user actually sees it, not invisibly
 *    above the fold.
 *  - Brand-purple accent line below each number scales in from the left
 *    as the count progresses, giving the motion visible cause-and-effect.
 *  - Suffix character ("+" / "K" / etc.) is parsed off so the integer
 *    portion can animate cleanly.
 *  - `tabular-nums` keeps the digit width stable so the row never reflows
 *    while the values count up.
 *  - prefers-reduced-motion → snap to the final value instantly, no rAF.
 */

function useCountUp(target: number, durationMs: number, delayMs: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    const startAt = performance.now() + delayMs;
    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / durationMs);
      // Cubic ease-out — strong start, soft landing.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, delayMs, active]);

  return value;
}

function StatItem({
  rawValue,
  label,
  index,
  active,
}: {
  rawValue: string;
  label: string;
  index: number;
  active: boolean;
}) {
  // Parse leading digits + trailing suffix (e.g. "24+" → 24 / "+").
  const match = rawValue.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : rawValue;
  const display = useCountUp(target, 1400, index * 120, active);

  // Track progress (0-1) so we can scale the accent line proportionally.
  const progress = target === 0 ? 0 : Math.min(1, display / target);

  return (
    <div className="group">
      <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-900 text-sp-purple leading-none tabular-nums transition-transform duration-200 ease-out group-hover:-translate-y-1">
        {display}
        <span aria-hidden="true">{suffix}</span>
      </p>

      {/* Brand-purple accent line — grows alongside the count-up so the
          motion expresses cause-effect. */}
      <span
        aria-hidden="true"
        className="mt-5 block h-px bg-sp-purple/30 overflow-hidden"
      >
        <span
          className="block h-full bg-sp-purple origin-left"
          style={{
            transform: `scaleX(${progress})`,
            transition: active ? "transform 80ms linear" : "none",
          }}
        />
      </span>

      <p className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-sp-text/60 mt-4">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    // IntersectionObserver — fire ONCE when the user actually sees it.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-sp-bg"
      aria-label="Key numbers"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {STATS.map((stat, i) => (
          <StatItem
            key={stat.label}
            rawValue={stat.value}
            label={stat.label}
            index={i}
            active={active}
          />
        ))}
      </div>
    </section>
  );
}
