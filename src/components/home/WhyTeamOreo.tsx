import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  { title: "Business first", copy: "We start with the outcome, then choose the right process and technology to support it." },
  { title: "Connected expertise", copy: "Business, technology and data thinking sit together, so recommendations are grounded and joined up." },
  { title: "Practical by design", copy: "Our focus is on clear next steps and solutions people can understand, use and improve." },
  { title: "Built to keep learning", copy: "Measurement is part of the work, helping teams see what is changing and what to refine next." },
];

export function WhyTeamOreo() {
  return (
    <section className="border-y border-line py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow="Why Team Oreo" title="Thoughtful at every stage." description="A multidisciplinary approach that keeps complex work clear, useful and centred on your organisation." />
        <div className="border-t border-line">
          {principles.map((item, index) => (
            <article key={item.title} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[2.5rem_0.75fr_1.25fr] sm:gap-5">
              <span className="text-xs font-semibold text-brand">0{index + 1}</span>
              <h3 className="text-lg font-semibold tracking-[-0.025em]">{item.title}</h3>
              <p className="text-sm leading-6 text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
