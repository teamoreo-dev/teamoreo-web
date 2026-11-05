import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

const description = `Explore Team Oreo's services: ${services.map(({ title }) => title).join(", ")}.`;

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Team Oreo", description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-white py-12 sm:py-16">
        <Container>
          <p className="eyebrow">What we do</p>
          <h1 className="mt-5 text-[clamp(2rem,3.8vw,3.25rem)] font-semibold leading-tight tracking-[-0.04em]">Our services</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{description}</p>
        </Container>
      </section>
      <section aria-label="Explore our services" className="bg-[#faf9fb] py-10 sm:py-14">
        <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}
        </Container>
      </section>
    </>
  );
}
