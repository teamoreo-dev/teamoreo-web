import { Container } from "@/components/ui/Container";

const industries = ["Restaurants & Hospitality", "Retail", "Education", "Government", "NGOs", "Professional Services", "SMEs", "Start-ups"];

export function Industries() {
  return (
    <section className="bg-brand-soft py-14 sm:py-16">
      <Container className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-14">
        <div>
          <p className="eyebrow">Industries we support</p>
          <h2 className="balance mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Broad experience. A tailored approach.</h2>
        </div>
        <ul className="grid border-l border-t border-brand/25 sm:grid-cols-2">
          {industries.map((industry) => (
            <li key={industry} className="flex min-h-14 items-center border-b border-r border-brand/25 bg-white/45 px-5 text-sm font-semibold sm:px-6">
              {industry}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
