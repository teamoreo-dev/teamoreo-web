import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { UseCase } from "@/data/useCases";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
      <h2 className="text-xl font-semibold tracking-[-0.025em]">{label}</h2>
      <div className="max-w-2xl text-base leading-7 text-muted">{children}</div>
    </section>
  );
}

export function UseCaseDetail({ useCase }: { useCase: UseCase }) {
  const { title, category, summary, challenge, approach, image, outcomes } = useCase;
  const intro = useCase.intro ?? summary;
  const hasContent = intro || challenge || approach || image || outcomes?.length;

  return (
    <>
      <section className="border-b border-line py-14 sm:py-16">
        <Container>
          <p className="eyebrow">{category}</p>
          <h1 className="balance mt-5 max-w-3xl text-[clamp(2.2rem,4.2vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
            {title}
          </h1>
          {intro ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{intro}</p> : null}
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          {image ? (
            <div className="relative mb-12 aspect-[16/8] overflow-hidden rounded-xl border border-line bg-surface">
              <Image src={image} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-contain" />
            </div>
          ) : null}

          {challenge ? <Block label="The challenge"><p>{challenge}</p></Block> : null}
          {approach ? <Block label="Our approach"><p>{approach}</p></Block> : null}
          {outcomes?.length ? (
            <Block label="Outcomes">
              <ul className="space-y-3">
                {outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {!hasContent ? (
            <p className="border-t border-line pt-8 text-sm text-muted">Project details to be confirmed by Team Oreo.</p>
          ) : null}

          <div className="border-t border-line pt-8">
            <Button href="/use-cases" variant="secondary">All use cases</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
