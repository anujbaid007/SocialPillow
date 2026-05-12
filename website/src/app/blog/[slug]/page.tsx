import { notFound } from "next/navigation";
import { BLOG_DETAILS } from "@/lib/data";
import BlogPost from "@/components/pages/BlogPost";

const BLOG_SLUGS = [
  "social-media-evolution-2025",
  "brand-storytelling-modern",
  "seo-strategies-growth",
  "performance-marketing-roi",
  "content-strategy-converts",
  "digital-presence-indian-brands",
];

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!BLOG_DETAILS[slug]) {
    notFound();
  }

  return <BlogPost slug={slug} />;
}
