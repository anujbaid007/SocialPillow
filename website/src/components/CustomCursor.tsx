"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ring || !textEl) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      gsap.set(dot, { x: mouse.x - 4, y: mouse.y - 4 });
      gsap.set(ring, { x: pos.x - 20, y: pos.y - 20 });
      gsap.set(textEl, { x: mouse.x + 20, y: mouse.y - 10 });

      requestAnimationFrame(tick);
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorText = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      if (cursorText) {
        textEl.textContent = cursorText;
        textEl.classList.add("visible");
        ring.classList.add("hovering");
      } else if (target.closest("a, button, [role='button']")) {
        ring.classList.add("hovering");
      }
    };

    const handleLeave = () => {
      textEl.classList.remove("visible");
      ring.classList.remove("hovering");
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter, true);
    document.addEventListener("mouseleave", handleLeave, true);
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter, true);
      document.removeEventListener("mouseleave", handleLeave, true);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={textRef} className="cursor-text" />
    </>
  );
}
