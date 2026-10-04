import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function AboutPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">About Team Oreo</p>
            <p className="mt-7 max-w-xs text-sm leading-6 text-muted">
              A multidisciplinary consultancy built around practical progress—not technology for technology&apos;s sake.
            </p>
          </div>
          <div>
            <h2 className="balance max-w-4xl text-[clamp(1.9rem,3.5vw,3rem)] font-medium leading-[1.14] tracking-[-0.035em]">
              We help organisations turn complex business questions into <span className="text-brand">clear, workable solutions.</span>
            </h2>
            <div className="mt-7 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-base leading-7 text-muted">
                From shaping the right strategy to implementing the technology behind it, our approach connects people, process and data.
              </p>
              <ArrowLink href="/about">Discover Team Oreo</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
