"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOLUTIONS, PORTFOLIO, ABOUT_MEGA_FEATURED } from "@/lib/constants";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";

// Lookup so we can show featured project previews per solution.
const PORTFOLIO_BY_SLUG = Object.fromEntries(PORTFOLIO.map((p) => [p.slug, p]));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // Solution currently being previewed inside the mega-menu (left column).
  const [activeSolution, setActiveSolution] = useState(0);
  // About item currently being previewed in the About mega-menu (left column).
  const [activeAbout, setActiveAbout] = useState(0);
  const scrolledRef = useRef(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Collapse the mobile menu + any open dropdown whenever navigation lands on
  // a new route. The per-link onClick already closes it, but this is the
  // backstop for cases that don't fire it (touch quirks, hash links, browser
  // back/forward) so the overlay never lingers over the new page.
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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

  // Defer close so the user can move from trigger → panel without flicker.
  const openDropdown = (name: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveDropdown(name);
  };
  const scheduleClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const solutionsOpen = activeDropdown === "Solutions";
  const aboutOpen = activeDropdown === "About";

  return (
    <>
      {/* Floating-island navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-4 transition-[padding] duration-300 ease-out ${
          scrolled ? "px-4" : "px-6 md:px-16 lg:px-24"
        }`}
      >
        <div
          ref={islandRef}
          className={`flex items-center justify-between w-full transition-[max-width,padding,background-color,border-color,box-shadow] duration-300 ease-out ${
            scrolled
              ? "max-w-5xl px-5 md:px-6 py-3 rounded-2xl bg-sp-bg/85 backdrop-blur-xl shadow-lg shadow-black/20 border border-sp-border"
              : "max-w-[1400px] py-5 rounded-none bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Social Pillow home">
            <img
              src="/socialpillow-logo.svg"
              alt="Social Pillow"
              className="h-7 md:h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const hasDropdown = Array.isArray(link.dropdown) && link.dropdown.length > 0;
              const isOpen = activeDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && openDropdown(link.label)}
                  onMouseLeave={() => hasDropdown && scheduleClose()}
                >
                  <Link
                    href={link.href}
                    aria-haspopup={hasDropdown ? "true" : undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    className="font-body text-sm font-500 text-sp-text/70 hover:text-sp-white transition-colors duration-200 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-sp-purple/10"
                  >
                    {link.label}
                    {hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="opacity-50 transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
                      />
                    )}
                  </Link>

                  {/* About / Solutions both use full-width mega-menus rendered
                      outside this map. Nothing to render inline here. */}
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-600 text-white bg-sp-purple rounded-xl hover:bg-sp-purple-light hover:shadow-lg hover:shadow-sp-purple/25 transition-[background-color,box-shadow] duration-300 font-body"
            >
              Contact Us
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            <button
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-sp-white hover:bg-sp-purple/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Solutions mega-menu — full-width panel.
          Sits below the navbar, fills the viewport horizontally, contains
          a category list on the left and 2 project previews on the right
          that update based on which solution is hovered. */}
      <div
        className={`hidden lg:block fixed inset-x-0 top-0 z-40 transition-[opacity,transform] duration-300 ease-out ${
          solutionsOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={() => openDropdown("Solutions")}
        onMouseLeave={scheduleClose}
        aria-hidden={!solutionsOpen}
      >
        {/* Push panel below the navbar with top padding */}
        <div className="pt-20 px-4">
          <div className="mx-auto max-w-[1400px] bg-sp-bg-card border border-sp-border-strong rounded-3xl shadow-2xl shadow-black/40 backdrop-blur-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-0">
              {/* Left — solution categories */}
              <div className="col-span-4 p-6 md:p-7 border-r border-sp-border">
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-sp-text/45 mb-4 px-3">
                  Solutions
                </p>
                <ul className="flex flex-col gap-1">
                  {SOLUTIONS.map((s, i) => {
                    const isActive = i === activeSolution;
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          onMouseEnter={() => setActiveSolution(i)}
                          onFocus={() => setActiveSolution(i)}
                          className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl transition-colors duration-200"
                          style={{
                            backgroundColor: isActive
                              ? "rgba(113,21,255,0.10)"
                              : undefined,
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-heading text-lg font-800 transition-colors duration-200"
                              style={{
                                color: isActive ? s.color : "var(--sp-white)",
                              }}
                            >
                              {s.title}
                            </p>
                            <p className="font-body text-xs text-sp-text/55 mt-0.5 truncate">
                              {s.blurb}
                            </p>
                          </div>
                          <ArrowRight
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 transition-all duration-200 ease-out"
                            style={{
                              color: isActive ? s.color : "var(--sp-text)",
                              opacity: isActive ? 1 : 0.4,
                              transform: isActive
                                ? "translateX(2px)"
                                : "translateX(0)",
                            }}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-2 px-3 py-2 font-body text-xs uppercase tracking-[0.18em] text-sp-purple hover:gap-3 transition-all duration-200"
                >
                  View all solutions
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Right — featured project previews for the active solution */}
              <div className="col-span-8 p-6 md:p-7 bg-sp-bg-secondary/30">
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-sp-text/45 mb-4">
                  Featured work · {SOLUTIONS[activeSolution].title}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {SOLUTIONS[activeSolution].featured.map((slug) => {
                    const item = PORTFOLIO_BY_SLUG[slug];
                    if (!item) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/work/${item.slug}`}
                        className="group block rounded-2xl overflow-hidden border border-sp-border-strong hover:border-sp-purple/40 transition-colors duration-300"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-sp-bg-card">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/15 backdrop-blur-sm rounded-full font-body text-[10px] font-600 text-white uppercase tracking-[0.15em]">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-4 flex items-start justify-between gap-3 bg-sp-bg-card">
                          <div className="min-w-0">
                            <p className="font-heading text-sm font-700 text-sp-white truncate">
                              {item.title}
                            </p>
                            <p className="font-body text-xs text-sp-text/55 mt-0.5 truncate">
                              {item.subtitle}
                            </p>
                          </div>
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-sp-text/40 group-hover:text-sp-purple group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 ease-out"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About mega-menu — full-width panel, mirrors the Solutions design.
          Left column lists About sub-items (Our Story / Team / Process)
          and the right column shows featured About preview tiles. */}
      {(() => {
        const aboutLink = NAV_LINKS.find((l) => l.label === "About");
        const aboutItems = aboutLink?.dropdown ?? [];
        return (
          <div
            className={`hidden lg:block fixed inset-x-0 top-0 z-40 transition-[opacity,transform] duration-300 ease-out ${
              aboutOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            onMouseEnter={() => openDropdown("About")}
            onMouseLeave={scheduleClose}
            aria-hidden={!aboutOpen}
          >
            <div className="pt-20 px-4">
              <div className="mx-auto max-w-[1400px] bg-sp-bg-card border border-sp-border-strong rounded-3xl shadow-2xl shadow-black/40 backdrop-blur-xl overflow-hidden">
                <div className="grid grid-cols-12 gap-0">
                  {/* Left — About categories */}
                  <div className="col-span-4 p-6 md:p-7 border-r border-sp-border">
                    <p className="font-body text-[10px] uppercase tracking-[0.24em] text-sp-text/45 mb-4 px-3">
                      About
                    </p>
                    <ul className="flex flex-col gap-1">
                      {aboutItems.map((sub, i) => {
                        const isActive = i === activeAbout;
                        const desc =
                          "description" in sub
                            ? (sub as { description?: string }).description
                            : undefined;
                        return (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onMouseEnter={() => setActiveAbout(i)}
                              onFocus={() => setActiveAbout(i)}
                              className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl transition-colors duration-200"
                              style={{
                                backgroundColor: isActive
                                  ? "rgba(113,21,255,0.10)"
                                  : undefined,
                              }}
                            >
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-heading text-lg font-800 transition-colors duration-200"
                                  style={{
                                    color: isActive
                                      ? "var(--sp-purple)"
                                      : "var(--sp-white)",
                                  }}
                                >
                                  {sub.label}
                                </p>
                                {desc && (
                                  <p className="font-body text-xs text-sp-text/55 mt-0.5 truncate">
                                    {desc}
                                  </p>
                                )}
                              </div>
                              <ArrowRight
                                size={16}
                                aria-hidden="true"
                                className="shrink-0 transition-all duration-200 ease-out"
                                style={{
                                  color: isActive
                                    ? "var(--sp-purple)"
                                    : "var(--sp-text)",
                                  opacity: isActive ? 1 : 0.4,
                                  transform: isActive
                                    ? "translateX(2px)"
                                    : "translateX(0)",
                                }}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <Link
                      href="/about"
                      className="mt-6 inline-flex items-center gap-2 px-3 py-2 font-body text-xs uppercase tracking-[0.18em] text-sp-purple hover:gap-3 transition-all duration-200"
                    >
                      Read our full story
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Right — featured About preview tiles */}
                  <div className="col-span-8 p-6 md:p-7 bg-sp-bg-secondary/30">
                    <p className="font-body text-[10px] uppercase tracking-[0.24em] text-sp-text/45 mb-4">
                      The people & process behind the work
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {ABOUT_MEGA_FEATURED.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group block rounded-2xl overflow-hidden border border-sp-border-strong hover:border-sp-purple/40 transition-colors duration-300"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-sp-bg-card">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/15 backdrop-blur-sm rounded-full font-body text-[10px] font-600 text-white uppercase tracking-[0.15em]">
                              About
                            </span>
                          </div>
                          <div className="p-4 flex items-start justify-between gap-3 bg-sp-bg-card">
                            <div className="min-w-0">
                              <p className="font-heading text-sm font-700 text-sp-white truncate">
                                {item.title}
                              </p>
                              <p className="font-body text-xs text-sp-text/55 mt-0.5 truncate">
                                {item.caption}
                              </p>
                            </div>
                            <ArrowUpRight
                              size={16}
                              aria-hidden="true"
                              className="shrink-0 text-sp-text/40 group-hover:text-sp-purple group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 ease-out"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Backdrop dim when any mega-menu open — soft, click-to-close. */}
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setActiveDropdown(null)}
        className={`hidden lg:block fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          solutionsOpen || aboutOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-sp-bg z-[60] pt-24 px-6 lg:hidden overflow-y-auto">
          <button
            className="absolute top-6 right-6 p-2 rounded-lg hover:bg-sp-purple/10 text-sp-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-sp-border">
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
              Contact Us <ArrowRight size={14} className="inline ml-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
