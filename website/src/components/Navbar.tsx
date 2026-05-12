"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/lib/constants";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

const SUFFIXES = [".Social", ".Branding", ".SEO", ".PPC", ".Content"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [suffixIndex, setSuffixIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const islandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (islandRef.current) {
      gsap.fromTo(
        islandRef.current,
        { y: -16 },
        { y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSuffixIndex((i) => (i + 1) % SUFFIXES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-4 transition-[padding] duration-300 ${
        scrolled ? "px-4" : "px-6 md:px-16 lg:px-24"
      }`}
    >
      <div
        ref={islandRef}
        className={`flex items-center justify-between w-full transition-all duration-300 ${
          scrolled
            ? "max-w-5xl px-5 md:px-6 py-3 rounded-2xl bg-sp-bg/80 backdrop-blur-xl shadow-lg shadow-black/20 border border-white/[0.08]"
            : "max-w-[1400px] py-5 rounded-none bg-transparent border border-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-baseline group">
          <span className="font-heading text-xl md:text-2xl font-900 text-sp-white tracking-[-0.03em] leading-none">
            Social
          </span>
          <span className="font-heading text-xl md:text-2xl font-900 text-sp-purple tracking-[-0.03em] leading-none">
            Pillow
          </span>
          <span className="ml-1.5 inline-flex h-[15px] min-w-[72px] items-start overflow-hidden align-baseline">
            <span
              className="block w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateY(-${suffixIndex * 15}px)` }}
            >
              {SUFFIXES.map((suffix) => (
                <span
                  key={suffix}
                  className="block h-[15px] font-body text-[10px] md:text-[11px] font-600 leading-[15px] text-sp-purple-light"
                >
                  {suffix}
                </span>
              ))}
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="font-body text-sm font-500 text-sp-text/70 hover:text-sp-white transition-colors duration-200 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/[0.06]"
              >
                {link.label}
                {link.dropdown && <ChevronDown size={14} className="opacity-50" />}
              </Link>

              {link.dropdown && activeDropdown === link.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-sp-bg-card border border-white/10 rounded-2xl p-2 min-w-[220px] shadow-2xl shadow-black/40">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-sp-bg-card/95 border-l border-t border-white/10" />
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-sp-text/70 hover:text-sp-white hover:bg-sp-purple/10 rounded-xl transition-all duration-200"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-600 text-white bg-sp-purple rounded-xl hover:bg-sp-purple-light hover:shadow-lg hover:shadow-sp-purple/25 transition-all duration-300 font-body"
          >
            Contact Us
            <ArrowRight size={14} />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-sp-white hover:bg-white/[0.06] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-sp-bg z-50 pt-24 px-6 lg:hidden overflow-y-auto">
          <button
            className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/[0.06] text-sp-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-white/5">
                <Link
                  href={link.href}
                  className="block py-4 text-lg font-heading font-600 text-sp-text hover:text-sp-purple transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 pb-3">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-sm text-sp-text/60 hover:text-sp-purple"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-6 block text-center font-body text-sm font-500 text-sp-white bg-sp-purple px-6 py-3 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
