import { notFound } from "next/navigation";
import { PORTFOLIO } from "@/lib/constants";
import { PORTFOLIO_DETAILS } from "@/lib/data";
import CaseStudyDetail from "@/components/pages/CaseStudyDetail";

export function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!PORTFOLIO_DETAILS[slug]) {
    notFound();
  }

  return <CaseStudyDetail slug={slug} />;
}
