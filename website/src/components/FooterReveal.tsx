"use client";

import { useEffect } from "react";

// Measures the footer's height and sets it as a CSS variable on <body>.
// The body uses that variable for padding-bottom, leaving exactly enough
// scroll room at the end of the page to reveal the fixed footer underneath.
// No layout/JS work happens during scroll — ResizeObserver only fires on
// layout-actual changes (initial render, font load, resize, orientation).
export default function FooterReveal() {
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("footer.footer-themed");
    if (!footer) return;

    const apply = () => {
      const h = footer.getBoundingClientRect().height;
      document.body.style.setProperty("--footer-h", `${Math.ceil(h)}px`);
    };
    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(footer);
    window.addEventListener("orientationchange", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  return null;
}
