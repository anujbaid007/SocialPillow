"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const BLOG_POSTS = [
  {
    title: "How Social Media Marketing is Evolving in 2025",
    tag: "Social Media",
    readTime: "5 min",
    slug: "social-media-evolution-2025",
    excerpt: "The landscape of social media marketing continues to shift dramatically...",
  },
  {
    title: "The Art of Brand Storytelling for Modern Audiences",
    tag: "Branding",
    readTime: "7 min",
    slug: "brand-storytelling-modern",
    excerpt: "In a world overflowing with content, brand storytelling has become essential...",
  },
  {
    title: "SEO Strategies That Actually Drive Business Growth",
    tag: "SEO",
    readTime: "6 min",
    slug: "seo-strategies-growth",
    excerpt: "Beyond keywords and backlinks, modern SEO requires a holistic approach...",
  },
  {
    title: "Performance Marketing: Maximizing ROI in 2025",
    tag: "Performance",
    readTime: "8 min",
    slug: "performance-marketing-roi",
    excerpt: "Strategic ad placement and data-driven optimization can transform your campaigns...",
  },
  {
    title: "Content Strategy That Converts: A Complete Guide",
    tag: "Content",
    readTime: "10 min",
    slug: "content-strategy-converts",
    excerpt: "Creating content that resonates with your audience and drives conversions...",
  },
  {
    title: "Building a Strong Digital Presence for Indian Brands",
    tag: "Branding",
    readTime: "6 min",
    slug: "digital-presence-indian-brands",
    excerpt: "Indian brands are increasingly recognizing the importance of digital-first strategies...",
  },
];

export default function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-heading",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".blog-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".blog-grid", start: "top 80%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-28 pb-20 px-6 md:px-12 lg:px-18">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <p className="font-body text-sm uppercase tracking-widest text-sp-purple mb-4">
            Insights
          </p>
          <h1 className="blog-heading font-heading text-4xl md:text-6xl lg:text-7xl font-900 text-sp-white leading-tight">
            Blog
          </h1>
        </div>

        {/* Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-cursor-text="View Blog"
              className="blog-card group"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-sp-bg-card border border-white/5 relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${120 + i * 25}deg, ${
                      ["#7115FF", "#A412E2", "#B60BFF", "#6D28D9", "#8B5CF6", "#4C1D95"][i % 6]
                    }25, #11091B)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <span className="font-heading text-lg font-700 text-white/15 text-center group-hover:text-white/25 transition-colors">
                    {post.title}
                  </span>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-sp-purple/80 backdrop-blur-sm rounded-full font-body text-xs text-white">
                    {post.tag}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-heading text-base font-700 text-sp-white group-hover:text-sp-purple transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-sp-text/40 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="font-body text-xs text-sp-text/30 mt-3">{post.readTime} read</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
