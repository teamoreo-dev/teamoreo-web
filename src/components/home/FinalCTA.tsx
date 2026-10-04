import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-brand py-14 text-white sm:py-16">
      <Container className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Start a conversation</p>
          <h2 className="balance mt-4 max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]">Have a business challenge? Let&apos;s talk.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80">Tell us what you are working through. We will help you find a clear way forward.</p>
        </div>
        <Button href="/contact" variant="light" className="shrink-0">Contact Team Oreo</Button>
      </Container>
    </section>
  );
}
