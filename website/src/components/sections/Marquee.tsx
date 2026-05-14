"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TEXT = "IT'S TIME TO CREATE WITH SOCIAL PILLOW";
const REPEAT_COUNT = 4;

// 12-point star burst — single SVG path, inherits currentColor.
function StarBurst({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0 sp-burst-spin"
    >
      <path d="M50 0 L54 38 L92 28 L62 50 L92 72 L54 62 L50 100 L46 62 L8 72 L38 50 L8 28 L46 38 Z" />
    </svg>
  );
}

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // The track renders the SAME set of content twice in sequence. Animate
    // x from 0 to -setWidth — when the first set is fully off, the second
    // set sits exactly where the first one started, so the repeat is
    // visually seamless.
    const firstSet = track.firstElementChild as HTMLElement | null;
    if (!firstSet) return;

    const measureAndAnimate = () => {
      const setWidth = firstSet.getBoundingClientRect().width;
      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });
      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: 12, // faster — was 22s on CSS version
        ease: "none",
        repeat: -1,
      });
    };

    measureAndAnimate();

    // Re-measure on resize so the loop stays seamless when viewport changes.
    const ro = new ResizeObserver(measureAndAnimate);
    ro.observe(firstSet);

    return () => {
      ro.disconnect();
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return (
    <section
      className="sp-stroke-marquee relative overflow-hidden bg-sp-bg py-8 md:py-10 border-y border-sp-border"
      aria-hidden="true"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12"
          >
            {Array.from({ length: REPEAT_COUNT }).map((_, i) => {
              // Alternate between stroked outline and solid purple fill so the
              // marquee reads with two-tone rhythm instead of a single colour.
              const alt = i % 2 === 1;
              return (
                <div key={i} className="flex shrink-0 items-center gap-8 md:gap-12">
                  <span
                    className={`${alt ? "sp-solid-text" : "sp-stroke-text"} font-heading text-3xl md:text-5xl lg:text-6xl font-900 uppercase tracking-[-0.005em] leading-none`}
                  >
                    {TEXT}
                  </span>
                  <span className={alt ? "text-sp-white" : "text-sp-purple"}>
                    <StarBurst size={44} />
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        .sp-stroke-text {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--sp-white);
          text-stroke: 1.5px var(--sp-white);
        }
        .sp-solid-text {
          color: var(--sp-purple);
        }
        @keyframes sp-burst-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .sp-burst-spin {
          animation: sp-burst-spin 9s linear infinite;
          transform-origin: 50% 50%;
        }
        @media (prefers-reduced-motion: reduce) {
          .sp-burst-spin { animation: none; }
        }
      `}</style>
    </section>
  );
}
