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
      <section className="text-white" style={{ background: "radial-gradient(55% 75% at 100% 0%, rgba(232,25,114,0.30), transparent 65%), radial-gradient(45% 55% at 40% 100%, rgba(90,60,200,0.16), transparent 70%), #0b0c14" }}>
        <Container className="py-20 sm:py-24 lg:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-pink-400"><span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />What we do</p>
          <h1 className="mt-6 max-w-[46rem] text-[clamp(2.6rem,5.2vw,4.1rem)] font-bold leading-[1.05] tracking-[-0.035em]">Our services</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{description}</p>
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
