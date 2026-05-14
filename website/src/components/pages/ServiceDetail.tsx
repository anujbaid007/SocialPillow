import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SERVICE_DETAILS } from "@/lib/data";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiceDetail({ slug }: { slug: string }) {
  const detail = SERVICE_DETAILS[slug];
  const currentIndex = SERVICES.findIndex((s) => s.slug === slug);
  const nextService = SERVICES[(currentIndex + 1) % SERVICES.length];

  if (!detail) return null;

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-12 lg:px-18">
        <div className="max-w-[1440px] mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-body text-sm text-sp-text/40 hover:text-sp-purple transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            All Services
          </Link>

          <p
            className="font-body text-sm uppercase tracking-widest mb-4"
            style={{ color: detail.color }}
          >
            {detail.subtitle}
          </p>
          <h1 className="detail-heading font-heading text-4xl md:text-6xl lg:text-[80px] font-900 text-sp-white leading-[0.95] tracking-tight max-w-[800px]">
            {detail.title}
          </h1>
          <div className="detail-body max-w-[700px] mt-8">
            <p className="font-body text-lg text-sp-text/60 leading-relaxed">
              {detail.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Features — sticky side-menu + scrolling cards (TechPillow pattern).
          Left column stays pinned while the right column's capability cards
          scroll past. Cards are tall enough that the grid scrolls for ~1.5
          viewports on desktop, making the pin feel earned. */}
      <section className="features-section py-24 md:py-32 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Sticky side menu */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <p
              className="font-body text-sm uppercase tracking-[0.2em] mb-4"
              style={{ color: detail.color }}
            >
              What We Deliver
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-900 text-sp-white leading-[1.05] tracking-[-0.02em]">
              Our {detail.title} Services
            </h2>
            <p className="font-body text-base md:text-lg text-sp-text/60 leading-relaxed mt-6 max-w-[440px]">
              The capabilities we bring to every {detail.title.toLowerCase()} engagement
              — battle-tested, outcome-driven, and tailored to your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 min-h-[44px] rounded-full font-body text-sm font-500 text-white transition-colors"
              style={{ backgroundColor: detail.color }}
            >
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>

          {/* Scrolling capability cards — each card has number + icon +
              title + descriptive blurb. Handles both legacy string-only
              features and the new rich object shape. */}
          <ol className="lg:col-span-7 space-y-4 md:space-y-5">
            {detail.features.map((feature, i) => {
              const f =
                typeof feature === "string"
                  ? { title: feature, description: "" }
                  : feature;
              return (
                <li
                  key={i}
                  className="feature-item group p-6 md:p-7 lg:p-8 rounded-2xl bg-sp-bg-card border border-sp-border transition-[border-color,transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-sp-border-strong"
                >
                  <div className="flex items-start gap-5 md:gap-6">
                    <span
                      className="font-heading text-xl md:text-2xl font-900 tabular-nums shrink-0 leading-none pt-0.5 transition-colors duration-300"
                      style={{ color: detail.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <CheckCircle2
                      size={22}
                      className="shrink-0 mt-0.5 transition-transform duration-300 ease-out group-hover:scale-110"
                      style={{ color: detail.color }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg md:text-xl font-700 text-sp-white leading-snug">
                        {f.title}
                      </h3>
                      {f.description && (
                        <p className="font-body text-sm md:text-base text-sp-text/65 leading-relaxed mt-2.5 md:mt-3">
                          {f.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 md:px-12 lg:px-18">
        <div className="max-w-[1440px] mx-auto">
          <p
            className="font-body text-sm uppercase tracking-widest mb-3"
            style={{ color: detail.color }}
          >
            How We Work
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-800 text-sp-white mb-16">
            Our Process
          </h2>

          <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.process.map((step, i) => (
              <div
                key={i}
                className="process-card p-8 rounded-2xl bg-sp-bg-card border border-sp-border hover:border-sp-border-strong transition-colors group"
              >
                <span
                  className="font-heading text-5xl font-900 block mb-4"
                  style={{ color: detail.color + "30" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-700 text-sp-white mb-2">
                  {step.step}
                </h3>
                <p className="font-body text-sm text-sp-text/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Next Service */}
      <section className="py-20 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-800 text-sp-white mb-3">
              Ready to get started?
            </h2>
            <p className="font-body text-base text-sp-text/50">
              Let&apos;s discuss how our {detail.title.toLowerCase()} services
              can grow your brand.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-4 bg-sp-purple hover:bg-sp-purple-light text-white rounded-full font-body text-sm font-500 transition-colors"
            >
              Start a Project
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/services/${nextService.slug}`}
              className="inline-flex items-center gap-2 px-6 py-4 border border-sp-border-strong hover:border-sp-purple/40 text-sp-text/50 hover:text-sp-white rounded-full font-body text-sm transition-all"
            >
              Next: {nextService.title}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
