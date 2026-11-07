import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UseCaseDetail } from "@/components/use-cases/UseCaseDetail";
import { getUseCase, useCases } from "@/data/useCases";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const useCase = getUseCase((await params).slug);
  if (!useCase) notFound();
  const url = `/use-cases/${useCase.slug}`;

  return {
    title: useCase.title,
    description: useCase.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${useCase.title} | Team Oreo`,
      description: useCase.summary,
      url,
      type: "article",
    },
  };
}

export default async function UseCasePage({ params }: Props) {
  const useCase = getUseCase((await params).slug);
  if (!useCase) notFound();
  return <UseCaseDetail useCase={useCase} />;
}
