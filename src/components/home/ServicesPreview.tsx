import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

const cardTones = ["bg-white", "bg-brand-soft", "bg-mint", "bg-white", "bg-[#f1f3f7]", "bg-brand-soft"];

function ServiceIcon({ index }: { index: number }) {
  const common = "h-7 w-7";

  if (index === 0) {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M8 9l2 2-2 2M13 13h3"/></svg>;
  }
  if (index === 1) {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>;
  }
  if (index === 2) {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 7 6-5 6 8 5-4"/></svg>;
  }
  if (index === 3) {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5M15 1v5M9 18v5M15 18v5M1 9h5M18 9h5M1 15h5M18 15h5M10 10h4v4h-4z"/></svg>;
  }
  if (index === 4) {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 7h11M13 4l3 3-3 3M19 17H8M11 14l-3 3 3 3"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="7" r="2"/></svg>;
  }
  return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>;
}

export function ServicesPreview() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Technology and consultancy that solve real business challenges."
            description="Focused support across technology, consultancy, data, AI and operations."
          />
          <Link href="/services" className="shrink-0 text-sm font-bold underline decoration-brand decoration-2 underline-offset-8 hover:text-brand-dark">
            View all services
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              href={service.href}
              key={service.title}
              className={`group min-h-56 rounded-xl border border-line p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_10px_24px_rgba(24,21,28,0.06)] ${cardTones[index]}`}
            >
              <div className="grid size-12 place-items-center rounded-lg border border-brand/15 bg-white text-brand">
                <ServiceIcon index={index} />
              </div>
              <h3 className="mt-6 max-w-xs text-xl font-semibold leading-tight tracking-[-0.025em]">{service.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{service.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
