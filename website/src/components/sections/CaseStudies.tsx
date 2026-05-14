import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

// 3-up grid of real socialpillow.co project images. Theming is consistent
// across light + dark mode because the section bg, card frame, and title
// all use semantic tokens (bg-sp-bg-secondary / bg-sp-bg-card / text-sp-*).
export default function CaseStudies() {
  const items = PORTFOLIO.slice(0, 6);

  return (
    <section className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-sp-bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-4">
              Selected Work
            </p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white leading-[0.95] tracking-[-0.02em]">
              Our Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 px-5 py-3 min-h-[44px] border border-sp-border-strong rounded-full font-body text-sm text-sp-text/80 hover:text-sp-white hover:border-sp-purple transition-colors"
          >
            View all
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <li key={item.slug}>
              <Link
                href={`/work/${item.slug}`}
                className="group block focus:outline-none"
                aria-label={`${item.title} — ${item.subtitle}`}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sp-bg-card border border-sp-border-strong transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-15px_rgba(113,21,255,0.35)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading="eager"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    unoptimized
                  />

                  {/* Bottom gradient veil for legibility of the arrow + index */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
                  />

                  {/* Top row — index + category pill */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="font-body text-xs font-700 tabular-nums text-white drop-shadow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full font-body text-[10px] font-600 text-white uppercase tracking-[0.15em]">
                      {item.category}
                    </span>
                  </div>

                  {/* Arrow chip, bottom-right */}
                  <span className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-sp-purple group-hover:scale-110">
                    <ArrowUpRight size={16} className="text-white" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="font-heading text-lg md:text-xl font-700 text-sp-white group-hover:text-sp-purple transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-sp-text/55 mt-1.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-sp-border-strong rounded-full font-body text-sm text-sp-text/80 hover:text-sp-white hover:border-sp-purple transition-colors"
          >
            View all projects
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
