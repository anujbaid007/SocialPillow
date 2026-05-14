"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const RAINBOW_COLORS = ["#7115FF", "#A412E2", "#B60BFF", "#8B5CF6", "#6D28D9"];

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverColor, setHoverColor] = useState("#7115FF");

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 lg:px-18">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div className="max-w-[900px] mb-20">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-4">
            Our Services
          </p>
          <h1 className="services-heading font-heading text-4xl md:text-6xl lg:text-7xl font-900 text-sp-white leading-tight">
            Solutions that drive real growth
          </h1>
          <p className="font-body text-lg text-sp-text/50 mt-6 max-w-[600px]">
            We provide customised solutions to meet your brand needs. From strategy to execution,
            we deliver results.
          </p>
        </div>

        {/* Service blocks */}
        <div className="services-list space-y-2">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              data-cursor-text="View More"
              className="service-row block group"
              onMouseEnter={() => {
                setHoverColor(RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)]);
                setHoveredIndex(i);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 px-8 md:px-12 rounded-2xl border transition-all duration-500"
                style={{
                  backgroundColor: hoveredIndex === i ? hoverColor + "12" : "transparent",
                  borderColor: hoveredIndex === i ? hoverColor + "30" : "var(--sp-border)",
                }}
              >
                <div className="flex-1">
                  <p className="font-body text-xs uppercase tracking-widest text-sp-text/30 mb-2">
                    {service.subtitle}
                  </p>
                  <h2
                    className="font-heading text-3xl md:text-5xl lg:text-6xl font-900 transition-colors duration-500 text-sp-white/30"
                    style={hoveredIndex === i ? { color: hoverColor } : undefined}
                  >
                    {service.title}
                  </h2>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-4">
                  <p className="font-body text-sm text-sp-text/40 max-w-[280px] hidden lg:block">
                    {service.description}
                  </p>
                  <div
                    className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500"
                    style={{
                      borderColor: hoveredIndex === i ? hoverColor : "var(--sp-border-strong)",
                      backgroundColor: hoveredIndex === i ? hoverColor : "transparent",
                    }}
                  >
                    <ArrowRight size={18} className="text-sp-text/45" color={hoveredIndex === i ? "white" : undefined} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Process */}
        <section className="mt-32">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-3">
            Our Process
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-800 text-sp-white mb-16">
            How We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Discovery", "Strategy", "Prototype", "Optimization"].map((step, i) => (
              <div
                key={step}
                className="p-8 rounded-2xl bg-sp-bg-card border border-sp-border text-center hover:border-sp-purple/30 transition-colors duration-300"
              >
                <span className="font-heading text-5xl font-900 text-sp-purple/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-700 text-sp-white mt-4">{step}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
