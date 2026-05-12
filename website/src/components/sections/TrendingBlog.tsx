"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BLOG_POSTS = [
  { title: "How Social Media Marketing is Evolving in 2025", tag: "Social Media", readTime: "5 min", slug: "social-media-evolution-2025" },
  { title: "The Art of Brand Storytelling for Modern Audiences", tag: "Branding", readTime: "7 min", slug: "brand-storytelling-modern" },
  { title: "SEO Strategies That Actually Drive Business Growth", tag: "SEO", readTime: "6 min", slug: "seo-strategies-growth" },
];

export default function TrendingBlog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) { gsap.set(".blog-row", { opacity: 1 }); return; }
      gsap.fromTo(".blog-row", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-44 bg-sp-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <div>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-sp-purple mb-5">Trending Now</p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 text-sp-white">Latest Insights</h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sp-purple hover:text-sp-purple-light font-body text-sm transition-colors duration-300">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="border-t border-white/[0.06]">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-row group flex items-center justify-between py-8 md:py-10 border-b border-white/[0.06] hover:border-sp-purple/25 transition-colors duration-300" style={{ opacity: 0 }}>
              <div className="flex items-center gap-5 md:gap-8 flex-1 min-w-0">
                <span className="px-4 py-1.5 bg-sp-purple/10 border border-sp-purple/25 rounded-full font-body text-xs font-500 text-sp-purple shrink-0">{post.tag}</span>
                <h3 className="font-heading text-lg md:text-2xl lg:text-3xl font-700 text-sp-text/75 group-hover:text-sp-white transition-colors duration-300 truncate">{post.title}</h3>
              </div>
              <div className="flex items-center gap-5 shrink-0 ml-4">
                <span className="hidden md:block font-body text-sm text-sp-text/35">{post.readTime}</span>
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-sp-purple group-hover:border-sp-purple transition-all duration-300">
                  <ArrowRight size={16} className="text-sp-text/25 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
