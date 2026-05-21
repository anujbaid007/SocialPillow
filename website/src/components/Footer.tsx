"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

const formatZoned = (tz: string) =>
  new Date()
    .toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Live India / London time strip — initialised to null so SSR and first
  // client paint match (no hydration mismatch), then populated on mount and
  // refreshed every 30s. 30s is enough for minute-precision displays.
  const [times, setTimes] = useState<{ india: string; london: string } | null>(null);
  useEffect(() => {
    const update = () =>
      setTimes({
        india: formatZoned("Asia/Kolkata"),
        london: formatZoned("Europe/London"),
      });
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
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
      {/* "Let's create something extraordinary" row + live India clock pill.
          Headline left, clock-pill (links to /contact) right. Colors use the
          footer-scoped --fx-* tokens so it reads on the dark band in any
          page theme. */}
      <div className="px-6 md:px-16 lg:px-24 pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <p
            className="font-heading text-2xl md:text-4xl font-700 text-center md:text-left"
            style={{ color: "var(--fx-text)" }}
          >
            Let&apos;s create something{" "}
            <span style={{ color: "var(--sp-purple)" }}>extraordinary</span>
          </p>
          <Link
            href="/contact"
            className="flex items-center gap-5 px-7 py-3.5 rounded-full border shrink-0"
            style={{ borderColor: "var(--fx-border)", color: "var(--fx-text)" }}
          >
            <span className="flex items-center gap-2">
              <span className="font-body text-base">India</span>
              <span
                className="font-body text-sm tabular-nums"
                style={{ color: "var(--fx-text-40)" }}
              >
                {times ? times.india : "     "}
              </span>
            </span>
            <span aria-hidden style={{ color: "var(--fx-border)" }}>
              /
            </span>
            <span className="flex items-center gap-2">
              <span className="font-body text-base">London</span>
              <span
                className="font-body text-sm tabular-nums"
                style={{ color: "var(--fx-text-40)" }}
              >
                {times ? times.london : "     "}
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Footer logo — wordmark scaled down so the whole footer (CTA + logo
          + links) fits within typical viewport heights. */}
      <div
        ref={logoRef}
        className="flex justify-center pt-2 pb-6 md:pt-4 md:pb-8 px-6"
      >
        <Link
          href="/contact"
          aria-label="Social Pillow — Contact us"
          className="block transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          <Image
            src="/socialpillow-logo-white.svg"
            alt="Social Pillow"
            width={477}
            height={137}
            className="h-10 md:h-14 lg:h-20 w-auto"
          />
        </Link>
      </div>

      {/* Footer links */}
      <div
        className="py-6 px-6 md:px-16 lg:px-24 border-t"
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
