"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    // Double-rAF ensures all child component useEffects have registered
    // their ScrollTriggers before we recalculate positions
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return null;
}
