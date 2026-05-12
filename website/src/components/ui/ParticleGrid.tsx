"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const GRID_SPACING = 60;
    const MOUSE_RADIUS = 180;
    const MOUSE_FORCE = 45;
    const RETURN_SPEED = 0.04;
    const CONNECT_DIST = 100;
    const PURPLE = { r: 113, g: 21, b: 255 };
    const PURPLE_LIGHT = { r: 182, g: 11, b: 255 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(rect.width, rect.height);
    }

    function initParticles(w: number, h: number) {
      const particles: Particle[] = [];
      const cols = Math.ceil(w / GRID_SPACING) + 2;
      const rows = Math.ceil(h / GRID_SPACING) + 2;
      const offsetX = (w - (cols - 1) * GRID_SPACING) / 2;
      const offsetY = (h - (rows - 1) * GRID_SPACING) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * GRID_SPACING;
          const y = offsetY + row * GRID_SPACING;
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            size: 1.2 + Math.random() * 0.8,
            alpha: 0.15 + Math.random() * 0.2,
          });
        }
      }
      particlesRef.current = particles;
    }

    function animate() {
      const rect = canvas!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx!.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 0.06;
          p.vy -= Math.sin(angle) * force * 0.06;
        }

        // Return to base
        p.vx += (p.baseX - p.x) * RETURN_SPEED;
        p.vy += (p.baseY - p.y) * RETURN_SPEED;

        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.12;

            // Lines near mouse glow purple
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mouseDist = Math.sqrt(
              (mx - midX) ** 2 + (my - midY) ** 2
            );
            const purpleBlend = Math.max(
              0,
              1 - mouseDist / (MOUSE_RADIUS * 1.5)
            );

            const r = Math.round(255 + (PURPLE.r - 255) * purpleBlend);
            const g = Math.round(255 + (PURPLE.g - 255) * purpleBlend);
            const bCol = Math.round(255 + (PURPLE.b - 255) * purpleBlend);

            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${r},${g},${bCol},${opacity + purpleBlend * 0.15})`;
            ctx!.lineWidth = 0.5 + purpleBlend * 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);

        // Interpolate color from white to purple near mouse
        const r = Math.round(255 + (PURPLE_LIGHT.r - 255) * proximity);
        const g = Math.round(255 + (PURPLE_LIGHT.g - 255) * proximity);
        const b = Math.round(255 + (PURPLE_LIGHT.b - 255) * proximity);
        const alpha = p.alpha + proximity * 0.6;
        const size = p.size + proximity * 2;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.fill();

        // Glow for close particles
        if (proximity > 0.3) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, size + 4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${PURPLE.r},${PURPLE.g},${PURPLE.b},${(proximity - 0.3) * 0.2})`;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    function handleMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    resize();
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      style={{ pointerEvents: "auto" }}
    />
  );
}
