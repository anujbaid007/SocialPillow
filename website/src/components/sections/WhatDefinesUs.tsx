"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINE_1 =
  "We bring your brand to life with creative strategies that captivate and convert.";
const LINE_2 =
  "From viral campaigns to impactful events, we ensure your business stands out — one brand at a time.";

// Split a sentence into <span> per word so each can be animated separately
// while preserving the natural line wrapping of the original text.
function renderWords(text: string, prefix: string) {
  return text.split(/(\s+)/).map((part, i) =>
    /\s+/.test(part) ? (
      <span key={`${prefix}-s${i}`}>{part}</span>
    ) : (
      <span key={`${prefix}-w${i}`} className="sp-defines-word">
        {part}
      </span>
    )
  );
}

export default function WhatDefinesUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        gsap.set(".sp-defines-word", { "--t": 1 });
        return;
      }

      // Single shared scrub timeline staggered across every word in document
      // order, so the second paragraph cannot start colouring until the first
      // one finishes — the words light up sequentially across both lines.
      gsap.fromTo(
        ".sp-defines-word",
        { "--t": 0 },
        {
          "--t": 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: ".sp-defines-stack",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-sp-bg-secondary"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-28">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 border-2 border-sp-purple rounded-full flex items-center justify-center">
              <ArrowRight size={22} className="text-sp-purple" />
            </div>
            <span className="font-body text-sm uppercase tracking-[0.15em] text-sp-text/40">
              What Defines Us
            </span>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 bg-sp-purple hover:bg-sp-purple-light text-white rounded-full font-body text-base font-500 transition-colors"
          >
            Dive Into Our Story
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="sp-defines-stack lg:col-span-3 space-y-10">
          <p className="font-heading text-3xl md:text-4xl lg:text-[2.6rem] font-700 leading-[1.25]">
            {renderWords(LINE_1, "l1")}
          </p>
          <p className="font-heading text-3xl md:text-4xl lg:text-[2.6rem] font-700 leading-[1.25]">
            {renderWords(LINE_2, "l2")}
          </p>
        </div>
      </div>

      <style>{`
        /* Each word interpolates between the dim and bright theme colours
           via color-mix, driven by the --t custom property GSAP scrubs from
           0 → 1 as the paragraph scrolls through the viewport. */
        .sp-defines-word {
          --t: 0;
          display: inline-block;
          color: color-mix(in oklab, var(--sp-text) calc((1 - var(--t)) * 100%), var(--sp-white) calc(var(--t) * 100%));
          opacity: calc(0.22 + var(--t) * 0.78);
          will-change: color, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .sp-defines-word {
            --t: 1;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
