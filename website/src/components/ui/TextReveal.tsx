"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0.3,
  stagger = 0.04,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".tr-char");
    if (!chars) return;

    gsap.fromTo(
      chars,
      { opacity: 0, filter: "blur(10px)", y: "30%" },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: "0%",
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay, stagger]);

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="tr-char inline-block"
          style={{ opacity: 0 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
