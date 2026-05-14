// Lenis smooth-scroll + GSAP ticker were causing site-wide jank. Disabled.
// Native browser scroll is more performant and matches the simpler aesthetic.
// Keep the component shell mounted so the layout import doesn't 404.
export default function SmoothScroll() {
  return null;
}
