import type { UseCaseContent, UseCaseRecord } from "@/data/useCases";
import { Container } from "@/components/ui/Container";
import { UseCaseHero } from "./UseCaseHero";
import { UseCaseMeta } from "./UseCaseMeta";
import { UseCaseVisual } from "./UseCaseVisual";

function ContentSection({ label, content }: { label: string; content?: UseCaseContent }) {
  if (!content?.paragraphs?.length && !content?.items?.length) return null;
  return (
    <section className="grid gap-4 lg:grid-cols-[0.5fr_1fr] lg:gap-14">
      <h2 className="text-base font-medium leading-7 text-[#5f6c83]">{label}</h2>
      <div className="min-w-0 space-y-4 text-base leading-7 text-[#303747]">
        {content.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {content.items?.length ? <ul className="list-disc space-y-2 pl-5 marker:text-[#707d94]">{content.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
      </div>
    </section>
  );
}

function Testimonial({ testimonial }: { testimonial: NonNullable<UseCaseRecord["testimonial"]> }) {
  return (
    <section aria-label="Project testimonial" className="bg-[#d91e65] py-12 text-white sm:py-16">
      <Container as="figure">
        <blockquote className="max-w-5xl text-[clamp(1.4rem,2.5vw,2rem)] font-semibold leading-[1.45] tracking-[-0.02em]">
          <p>“{testimonial.quote}”</p>
        </blockquote>
        <figcaption className="mt-8">
          <p className="text-sm font-bold">{testimonial.author}</p>
          {testimonial.role ? <p className="mt-1 text-sm">{testimonial.role}</p> : null}
        </figcaption>
      </Container>
    </section>
  );
}

export function UseCaseDetail({ useCase }: { useCase: UseCaseRecord }) {
  const hasSections = [useCase.problems, useCase.challenges, useCase.solutions].some((section) => section?.paragraphs?.length || section?.items?.length) || useCase.results?.length;
  return (
    <>
      <UseCaseHero useCase={useCase} />
      <Container>
        <UseCaseVisual useCase={useCase} />
        <UseCaseMeta useCase={useCase} />
        {useCase.about?.length ? <div className="py-12 sm:py-16"><ContentSection label="About The Project" content={{ paragraphs: useCase.about }} /></div> : null}
        {useCase.secondaryImage || useCase.artwork ? <UseCaseVisual useCase={useCase} secondary /> : null}
        {hasSections ? (
          <div className="space-y-12 py-12 sm:space-y-14 sm:py-16 lg:pb-24">
            <ContentSection label="Problems" content={useCase.problems} />
            <ContentSection label="Challenges" content={useCase.challenges} />
            <ContentSection label="Our Solutions" content={useCase.solutions} />
            <ContentSection label="Results" content={{ paragraphs: useCase.results }} />
          </div>
        ) : <div className="pb-12" />}
      </Container>
      {useCase.testimonial ? <Testimonial testimonial={useCase.testimonial} /> : null}
    </>
  );
}
