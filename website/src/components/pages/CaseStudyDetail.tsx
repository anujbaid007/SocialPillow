import Link from "next/link";
import { PORTFOLIO } from "@/lib/constants";
import { PORTFOLIO_DETAILS } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CaseStudyDetail({ slug }: { slug: string }) {
  const detail = PORTFOLIO_DETAILS[slug];
  const currentIndex = PORTFOLIO.findIndex((p) => p.slug === slug);
  const nextProject = PORTFOLIO[(currentIndex + 1) % PORTFOLIO.length];
  const gradientColor = ["#7115FF", "#A412E2", "#B60BFF", "#6D28D9", "#8B5CF6", "#4C1D95"][currentIndex % 6];

  if (!detail) return null;

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-12 lg:px-18">
        <div className="max-w-[1440px] mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-body text-sm text-sp-text/40 hover:text-sp-purple transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            All Work
          </Link>

          <div className="case-meta flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-sp-purple/20 text-sp-purple rounded-full font-body text-xs uppercase tracking-wider">
              {detail.category}
            </span>
            <span className="font-body text-sm text-sp-text/30">
              {detail.client}
            </span>
            <span className="font-body text-sm text-sp-text/30">
              {detail.year}
            </span>
          </div>

          <h1 className="case-heading font-heading text-4xl md:text-6xl lg:text-[80px] font-900 text-sp-white leading-[0.95] tracking-tight max-w-[900px]">
            {detail.title}
          </h1>
          <p className="font-body text-lg text-sp-text/50 mt-6 max-w-[600px]">
            {detail.subtitle}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 lg:px-18 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="aspect-[16/7] rounded-2xl overflow-hidden relative">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${gradientColor}40, var(--sp-bg-card))`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-5xl md:text-7xl font-900 text-sp-white/15">
                {detail.title}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="case-content py-20 px-6 md:px-12 lg:px-18">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-sp-text/30 mb-2">
                Client
              </p>
              <p className="font-heading text-base font-700 text-sp-white">
                {detail.client}
              </p>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-sp-text/30 mb-2">
                Year
              </p>
              <p className="font-heading text-base font-700 text-sp-white">
                {detail.year}
              </p>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-sp-text/30 mb-2">
                Services
              </p>
              <div className="flex flex-wrap gap-2">
                {detail.services.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 border border-sp-border-strong rounded-full font-body text-xs text-sp-text/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="case-section">
              <h2 className="font-heading text-2xl font-800 text-sp-white mb-4">
                Overview
              </h2>
              <p className="font-body text-base text-sp-text/60 leading-relaxed">
                {detail.overview}
              </p>
            </div>

            <div className="case-section">
              <h2 className="font-heading text-2xl font-800 text-sp-white mb-4">
                The Challenge
              </h2>
              <p className="font-body text-base text-sp-text/60 leading-relaxed">
                {detail.challenge}
              </p>
            </div>

            <div className="case-section">
              <h2 className="font-heading text-2xl font-800 text-sp-white mb-4">
                Our Solution
              </h2>
              <p className="font-body text-base text-sp-text/60 leading-relaxed">
                {detail.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="results-section py-20 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-3">
            Impact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-800 text-sp-white mb-12">
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detail.results.map((result, i) => (
              <div
                key={i}
                className="result-item p-6 rounded-2xl bg-sp-bg-card border border-sp-border"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="font-heading text-3xl font-900 shrink-0"
                    style={{ color: gradientColor }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-base text-sp-text/70 leading-relaxed pt-1">
                    {result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-20 px-6 md:px-12 lg:px-18">
        <div className="max-w-[1440px] mx-auto">
          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor-text="Next Project"
            className="group block"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-body text-sm uppercase tracking-widest text-sp-text/30">
                Next Project
              </p>
              <ArrowRight
                size={20}
                className="text-sp-text/30 group-hover:text-sp-purple group-hover:translate-x-2 transition-all"
              />
            </div>
            <h3 className="font-heading text-3xl md:text-5xl font-900 text-sp-white/20 group-hover:text-sp-purple transition-colors duration-500">
              {nextProject.title}
            </h3>
            <p className="font-body text-base text-sp-text/30 mt-2">
              {nextProject.subtitle}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
