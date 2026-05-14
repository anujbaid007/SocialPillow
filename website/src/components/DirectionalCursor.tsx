"use client";

import { useEffect, useRef } from "react";

/**
 * Directional cursor — a small arrow that follows the pointer and rotates
 * to match the direction of motion (schbang-style). The native cursor is
 * kept visible (this is a complement, not a replacement) so accessibility
 * affordances aren't lost. On touch devices the element stays hidden.
 *
 * Performance:
 *  - One global mousemove listener, throttled by requestAnimationFrame.
 *  - Movement smoothed with EMA so the rotation isn't jittery.
 *  - GPU-only transforms (translate3d + rotate); never touches layout.
 */
export default function DirectionalCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on coarse pointers (touch). prefers-reduced-motion → also skip
    // the rotation work, but we still let the dot follow the cursor.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = ref.current;
    if (!el) return;

    // Target = where the cursor IS. Current = where the dot is, eased toward target.
    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    // Direction in radians, smoothed.
    let angle = 0;
    let lastX = -100;
    let lastY = -100;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const loop = () => {
      // Ease the cursor position toward target (smoother feel than 1:1).
      cx += (tx - cx) * 0.25;
      cy += (ty - cy) * 0.25;

      if (!reduceMotion) {
        const dx = cx - lastX;
        const dy = cy - lastY;
        // Only update angle if motion is meaningful (avoid jitter at rest).
        if (dx * dx + dy * dy > 4) {
          const target = Math.atan2(dy, dx);
          // Shortest-path interpolation between angles.
          let delta = target - angle;
          while (delta > Math.PI) delta -= 2 * Math.PI;
          while (delta < -Math.PI) delta += 2 * Math.PI;
          angle += delta * 0.2;
        }
      }
      lastX = cx;
      lastY = cy;

      // Arrow's SVG points right (0°). Rotate by current angle.
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${
        (angle * 180) / Math.PI
      }deg)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="sp-directional-cursor pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ opacity: 0 }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12h16M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
