import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/services/ServiceHero";
import { RecentWork } from "@/components/services/RecentWork";
import { getService, services } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) notFound();

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: service.href },
    openGraph: { title: `${service.title} | Team Oreo`, description: service.description, url: service.href },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return <><ServiceHero service={service} /><RecentWork service={service} /></>;
}
