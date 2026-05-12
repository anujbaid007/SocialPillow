import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { SERVICE_DETAILS } from "@/lib/data";
import ServiceDetail from "@/components/pages/ServiceDetail";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!SERVICE_DETAILS[slug]) {
    notFound();
  }

  return <ServiceDetail slug={slug} />;
}
