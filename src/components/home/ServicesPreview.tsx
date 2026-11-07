import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServicesPreview() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Technology and consultancy that solve real business challenges."
            description="IT consultancy, development, design, project management, AI and blockchain services."
          />
          <Link href="/services" className="shrink-0 text-sm font-bold underline decoration-brand decoration-2 underline-offset-8 hover:text-brand-dark">
            View all services
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} headingLevel={3} />
          ))}
        </div>
      </Container>
    </section>
  );
}
