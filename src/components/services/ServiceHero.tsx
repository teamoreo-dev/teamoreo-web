import Image from "next/image";
import type { Service } from "@/data/services";
import { Container } from "@/components/ui/Container";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden bg-[#0b0e17] text-white" style={{ backgroundImage: "radial-gradient(ellipse at 100% 0%, rgba(133,20,78,0.22), transparent 54%)" }}>
      <Container className="grid items-center gap-9 py-12 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-18">
        <div
          className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10"
          style={{ background: "radial-gradient(ellipse at 95% 100%, rgba(178,14,91,0.32), transparent 70%), #141020" }}
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-35" style={{ backgroundImage: "radial-gradient(#858096 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <Image
            src={service.heroImage.src}
            alt={service.heroImage.alt}
            fill
            preload
            sizes="(min-width: 1240px) 552px, (min-width: 1024px) 46vw, (min-width: 640px) 576px, 100vw"
            className="object-contain p-6 sm:p-8"
          />
        </div>
        <div className="min-w-0 py-1 lg:py-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-pink-300">
            <span className="size-1.5 rounded-full bg-pink-400" aria-hidden="true" />Services
          </p>
          <h1 className="balance mt-5 text-[clamp(2rem,3.9vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.04em]">{service.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{service.description}</p>
        </div>
      </Container>
    </section>
  );
}
