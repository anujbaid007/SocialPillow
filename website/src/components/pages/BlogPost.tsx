import Link from "next/link";
import { BLOG_DETAILS } from "@/lib/data";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";

const BLOG_SLUGS = [
  "social-media-evolution-2025",
  "brand-storytelling-modern",
  "seo-strategies-growth",
  "performance-marketing-roi",
  "content-strategy-converts",
  "digital-presence-indian-brands",
];

export default function BlogPost({ slug }: { slug: string }) {
  const post = BLOG_DETAILS[slug];
  const currentIndex = BLOG_SLUGS.indexOf(slug);
  const nextSlug = BLOG_SLUGS[(currentIndex + 1) % BLOG_SLUGS.length];
  const nextPost = BLOG_DETAILS[nextSlug];

  if (!post) return null;

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-12 px-6 md:px-12 lg:px-18">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-body text-sm text-sp-text/40 hover:text-sp-purple transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            All Posts
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sp-purple/20 text-sp-purple rounded-full font-body text-xs">
              <Tag size={12} />
              {post.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-sp-text/30">
              <Clock size={12} />
              {post.readTime} read
            </span>
            <span className="font-body text-xs text-sp-text/30">
              {post.date}
            </span>
          </div>

          <h1 className="post-heading font-heading text-3xl md:text-5xl lg:text-6xl font-900 text-sp-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-sp-border">
            <div className="w-10 h-10 rounded-full bg-sp-purple/20 flex items-center justify-center">
              <span className="font-heading text-sm font-700 text-sp-purple">
                SP
              </span>
            </div>
            <div>
              <p className="font-body text-sm text-sp-white font-500">
                {post.author}
              </p>
              <p className="font-body text-xs text-sp-text/30">{post.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6 md:px-12 lg:px-18">
        <div className="post-content max-w-[800px] mx-auto space-y-6">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="font-heading text-2xl font-800 text-sp-white mt-10 mb-2"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list" && block.items) {
              return (
                <ul key={i} className="space-y-3 pl-1">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 font-body text-base text-sp-text/60 leading-relaxed"
                    >
                      <span className="text-sp-purple mt-1.5 shrink-0">
                        &#9670;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="font-body text-base text-sp-text/60 leading-relaxed"
              >
                {block.text}
              </p>
            );
          })}
        </div>
      </section>

      {/* Next Post */}
      <section className="py-16 px-6 md:px-12 lg:px-18 bg-sp-bg-secondary">
        <div className="max-w-[800px] mx-auto">
          <Link
            href={`/blog/${nextSlug}`}
            data-cursor-text="Next Post"
            className="group block"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-body text-sm uppercase tracking-widest text-sp-text/30">
                Next Article
              </p>
              <ArrowRight
                size={18}
                className="text-sp-text/30 group-hover:text-sp-purple group-hover:translate-x-2 transition-all"
              />
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-800 text-sp-white/30 group-hover:text-sp-purple transition-colors duration-300">
              {nextPost.title}
            </h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
