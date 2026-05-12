"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    quickX.current = gsap.quickTo(btnRef.current, "x", { duration: 0.4, ease: "power2.out" });
    quickY.current = gsap.quickTo(btnRef.current, "y", { duration: 0.4, ease: "power2.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn || !quickX.current || !quickY.current) return;
    const rect = btn.getBoundingClientRect();
    quickX.current((e.clientX - rect.left - rect.width / 2) * strength);
    quickY.current((e.clientY - rect.top - rect.height / 2) * strength);
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (quickX.current) quickX.current(0);
    if (quickY.current) quickY.current(0);
  }, []);

  return (
    <div
      ref={btnRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
