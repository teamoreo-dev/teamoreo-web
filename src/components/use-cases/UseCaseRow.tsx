import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { UseCasePanel } from "./UseCasePanel";
import type { UseCase } from "@/data/useCases";

export function UseCaseRow({ useCase, reverse, tinted }: { useCase: UseCase; reverse: boolean; tinted: boolean }) {
  return (
    <section className={tinted ? "bg-surface" : "bg-white"}>
      <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="inline-block rounded-full bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-dark">
            {useCase.category}
          </p>
          <h2 className="balance mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em]">{useCase.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">{useCase.summary}</p>
          <Link
            href={`/use-cases/${useCase.slug}`}
            aria-label={`View work: ${useCase.title}`}
            className="mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-brand px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(232,25,114,0.22)] transition-colors duration-200 hover:bg-brand-dark"
          >
            View Work
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <UseCasePanel image={useCase.image} href={`/use-cases/${useCase.slug}`} />
        </div>
      </Container>
    </section>
  );
}