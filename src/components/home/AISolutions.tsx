import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const capabilities = ["AI automation", "Intelligent reporting", "AI-powered analytics", "AI integration"];

export function AISolutions() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow text-pink-300">AI solutions</p>
          <h2 className="balance mt-4 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.04em]">
            Practical AI for better ways of working.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
            We help organisations apply AI where it can reduce friction, strengthen decisions and support everyday work.
          </p>
          <ul className="mt-6 grid max-w-xl gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {capabilities.map((capability) => (
              <li key={capability} className="flex items-center gap-3 text-white/80">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />{capability}
              </li>
            ))}
          </ul>
          <Button href="/services/artificial-intelligence" variant="light" className="mt-7">Explore AI Solutions</Button>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[340px]" aria-hidden="true">
          <div className="absolute inset-[21%] grid place-items-center rounded-full border border-brand/70 bg-brand text-2xl font-semibold">AI</div>
          <div className="absolute left-1/2 top-0 h-[21%] w-px -translate-x-1/2 bg-white/25" />
          <div className="absolute bottom-0 left-1/2 h-[21%] w-px -translate-x-1/2 bg-white/25" />
          <div className="absolute left-0 top-1/2 h-px w-[21%] -translate-y-1/2 bg-white/25" />
          <div className="absolute right-0 top-1/2 h-px w-[21%] -translate-y-1/2 bg-white/25" />
          <div className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-white/5 text-xs">Data</div>
          <div className="absolute bottom-0 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-white/5 text-xs">Action</div>
          <div className="absolute left-0 top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/5 text-xs">People</div>
          <div className="absolute right-0 top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/5 text-xs">Process</div>
        </div>
      </Container>
    </section>
  );
}
