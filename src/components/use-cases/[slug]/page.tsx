import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseDetail } from "@/components/use-cases/UseCaseDetail";
import { getUseCase, useCases } from "@/data/useCases";

type Params = { slug: string };

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const useCase = getUseCase((await params).slug);
  if (!useCase) return {};
  return { title: useCase.title, description: useCase.summary.slice(0, 160), alternates: { canonical: `/use-cases/${useCase.slug}` } };
}

export default async function UseCasePage({ params }: { params: Promise<Params> }) {
  const useCase = getUseCase((await params).slug);
  if (!useCase) notFound();
  return <UseCaseDetail useCase={useCase} />;
}
