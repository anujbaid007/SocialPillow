"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trigger the float-in animations when the footer is actually being
  // revealed. The footer is position:fixed, so its own viewport
  // intersection is always true — we can't observe the footer directly.
  // Instead we watch the sentinel placed at the bottom of <main>: when it
  // scrolls into view, main is sliding up off the viewport and the
  // fixed footer underneath is being uncovered.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const sentinel = document.getElementById("sp-footer-sentinel");
    if (!sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            footer.setAttribute("data-visible", "true");
            io.disconnect();
            break;
          }
        }
      },
      // rootMargin: trigger slightly before the sentinel is in the viewport
      // so the cutouts are sliding in just as the footer is revealed.
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer-themed fixed inset-x-0 bottom-0 z-0 rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[80px] overflow-hidden"
    >
      {/* Pre-footer CTA — three tilted product cutouts slide in around the
          headline as the footer scrolls into view (mirrors the
          "Take a Pillow and Relax!" treatment on socialpillow.co). */}
      <div className="relative py-16 md:py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block select-none"
        >
          <img
            src="/images/footer-decor/wrning-tag.png"
            alt=""
            className="sp-float-decor sp-float-tl absolute -top-6 -left-4 lg:-left-6 w-[180px] lg:w-[220px] h-auto"
          />
          <img
            src="/images/footer-decor/wrning-box.jpg"
            alt=""
            className="sp-float-decor sp-float-tr absolute top-2 -right-8 lg:-right-10 w-[200px] lg:w-[240px] h-auto"
          />
          <img
            src="/images/footer-decor/shudh-bottle.png"
            alt=""
            className="sp-float-decor sp-float-bl absolute -bottom-10 left-10 lg:left-20 w-[140px] lg:w-[170px] h-auto"
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link
            href="/contact"
            className="group flex items-center gap-4 px-7 py-3.5 rounded-full border hover:bg-sp-purple hover:border-sp-purple hover:text-white transition-all duration-300"
            style={{ borderColor: "var(--fx-border)" }}
          >
            <span className="font-body text-base">India</span>
            <span
              className="font-body text-sm group-hover:text-white/80 transition-colors tabular-nums"
              style={{ color: "var(--fx-text-40)" }}
            >
              {time} IST
            </span>
          </Link>
          <p className="font-heading text-3xl md:text-4xl font-700 text-center">
            Let&apos;s create something{" "}
            <span style={{ color: "var(--sp-purple)" }}>extraordinary</span>
          </p>
        </div>
      </div>

      {/* Footer Logo — official Social Pillow SVG, white variant.
          Uses the white logo asset directly so it reads on the dark footer
          gradient. In the inverted light footer (dark page theme) the brand
          theming is provided by the parent --fx-* tokens, but the wordmark
          itself stays white to preserve recognition. */}
      <div
        ref={logoRef}
        className="flex justify-center py-16 md:py-24 px-6"
      >
        <Link
          href="/contact"
          aria-label="Social Pillow — Contact us"
          className="block transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          <img
            src="/socialpillow-logo-white.svg"
            alt="Social Pillow"
            className="h-16 md:h-24 lg:h-32 w-auto"
          />
        </Link>
      </div>

      {/* Footer links */}
      <div
        className="py-10 px-6 md:px-16 lg:px-24 border-t"
        style={{ borderColor: "var(--fx-border-soft)" }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {Object.entries(BRAND.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sp-purple transition-colors duration-300 text-sm capitalize"
                style={{ color: "var(--fx-text-30)" }}
              >
                {platform}
              </a>
            ))}
          </div>

          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            {["About", "Contact", "Work", "Blog", "Services"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="hover:text-sp-purple transition-colors duration-300 text-sm"
                style={{ color: "var(--fx-text-30)" }}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="text-right" style={{ color: "var(--fx-text-25)" }}>
            <p className="text-xs">Proudly created in India.</p>
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Social Pillow. {BRAND.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
