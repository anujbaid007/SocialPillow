"use client";

import { useState } from "react";
import Link from "next/link";
import { PORTFOLIO } from "@/lib/constants";

const FILTERS = ["All", "Branding", "Social Media", "Content"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 lg:px-18">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-4">
            Our Work
          </p>
          <h1 className="work-heading font-heading text-4xl md:text-6xl lg:text-7xl font-900 text-sp-white leading-tight">
            Explore Our Latest Work
          </h1>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300 ${
                activeFilter === f
                  ? "bg-sp-purple text-white"
                  : "border border-sp-border-strong text-sp-text/50 hover:border-sp-purple/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              data-cursor-text="View Case Study"
              className="work-card group"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-sp-bg-card border border-sp-border relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg, ${
                      ["#7115FF", "#A412E2", "#B60BFF", "#6D28D9", "#8B5CF6", "#4C1D95"][i % 6]
                    }33, var(--sp-bg-card))`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-3xl font-800 text-sp-white/20 group-hover:text-sp-white/40 transition-all duration-500 group-hover:scale-110">
                    {item.title}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-sp-purple/80 backdrop-blur-sm rounded-full font-body text-xs text-white">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-heading text-lg font-700 text-sp-white group-hover:text-sp-purple transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-sp-text/50 mt-1">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
