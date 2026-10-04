import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Identify", copy: "Define the real challenge." },
  { title: "Analyse", copy: "Understand what matters." },
  { title: "Improve", copy: "Shape a better approach." },
  { title: "Implement", copy: "Put the solution to work." },
  { title: "Measure", copy: "Learn and refine." },
];

export function BusinessProcess() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="How we help" title="A clear path from challenge to change." />
        <ol className="mt-10 border-l border-line md:grid md:grid-cols-5 md:border-l-0 md:border-t">
          {steps.map((step, index) => (
            <li key={step.title} className="relative py-4 pl-7 md:px-4 md:pb-0 md:pt-7 first:md:pl-0">
              <span className="absolute -left-[5px] top-6 size-2.5 rounded-full bg-brand md:-top-[5px] md:left-4 first:md:left-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-brand">0{index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
