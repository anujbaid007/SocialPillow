"use client";

import { useRef, useEffect } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "#7115FF",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouse);
    return () => card.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card relative overflow-hidden rounded-2xl border border-white/5 bg-sp-bg-card transition-all duration-300 hover:border-white/10 ${className}`}
      style={
        {
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      <div className="glow-card-spotlight pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300" />
      {children}

      <style jsx>{`
        .glow-card:hover .glow-card-spotlight {
          opacity: 1;
        }
        .glow-card-spotlight {
          background: radial-gradient(
            400px circle at var(--glow-x, 50%) var(--glow-y, 50%),
            var(--glow-color, #7115ff)15,
            transparent 60%
          );
        }
      `}</style>
    </div>
  );
}
