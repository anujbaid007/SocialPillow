"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SERVICE_DETAILS } from "@/lib/data";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail({ slug }: { slug: string }) {
  const pageRef = useRef<HTMLDivElement>(null);

  const detail = SERVICE_DETAILS[slug];
  const currentIndex = SERVICES.findIndex((s) => s.slug === slug);
  const nextService = SERVICES[(currentIndex + 1) % SERVICES.length];

  useEffect(() => {
    if (!detail) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-heading",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".detail-body",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
      gsap.fromTo(
        ".feature-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".features-section", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".process-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".process-grid", start: "top 80%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [detail]);

  if (!detail) return null;

  return (
    <div ref={pageRef}>
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

      {/* Features */}
      <section className="features-section py-20 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p
              className="font-body text-sm uppercase tracking-widest mb-3"
              style={{ color: detail.color }}
            >
              What We Deliver
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-800 text-sp-white">
              Our {detail.title} Services
            </h2>
          </div>
          <div className="space-y-4">
            {detail.features.map((feature, i) => (
              <div
                key={i}
                className="feature-item flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <CheckCircle2
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: detail.color }}
                />
                <span className="font-body text-base text-sp-text/70">
                  {feature}
                </span>
              </div>
            ))}
          </div>
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
                className="process-card p-8 rounded-2xl bg-sp-bg-card border border-white/5 hover:border-white/10 transition-colors group"
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
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/10 hover:border-sp-purple/30 text-sp-text/50 hover:text-sp-white rounded-full font-body text-sm transition-all"
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
