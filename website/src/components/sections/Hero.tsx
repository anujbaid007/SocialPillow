import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Pure-CSS staggered fade-up (sp-fade-up keyframe in globals.css).
// Respects prefers-reduced-motion via the global media query.
const staggerDelay = (i: number) => ({ animationDelay: `${i * 90}ms` });

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sp-bg pt-40 md:pt-48 lg:pt-56 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] right-[5%] w-[480px] h-[480px] rounded-full opacity-40 blur-[140px] -z-0"
        style={{ background: "radial-gradient(circle, rgba(113,21,255,0.55), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <p
          className="sp-fade-up font-body text-sm md:text-base uppercase tracking-[0.24em] text-sp-purple mb-8"
          style={staggerDelay(0)}
        >
          Marketing You.
        </p>

        <h1
          className="sp-fade-up font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] font-900 leading-[0.95] tracking-[-0.03em] text-sp-white max-w-[18ch]"
          style={staggerDelay(1)}
        >
          Where Brands Meet <span className="text-sp-purple">Success</span>
        </h1>

        <p
          className="sp-fade-up font-body text-lg md:text-xl text-sp-text/70 leading-relaxed mt-8 md:mt-10 max-w-[640px]"
          style={staggerDelay(2)}
        >
          Social Pillow empowers businesses and founders to thrive globally with
          compelling visual storytelling and impactful user experiences.
        </p>

        <div
          className="sp-fade-up flex flex-wrap items-center gap-4 mt-10 md:mt-14"
          style={staggerDelay(3)}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] bg-sp-purple hover:bg-sp-purple-light text-white rounded-full font-body text-base font-500 transition-colors"
          >
            Start a Project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] border border-sp-border-strong text-sp-text/80 hover:text-sp-white hover:border-sp-purple/50 rounded-full font-body text-base transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
