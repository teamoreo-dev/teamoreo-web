import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function WorkPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-xl border border-line bg-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="eyebrow">Our work</p>
            <h2 className="balance mt-4 max-w-xl text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Solutions shaped around the work that needs to get done.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted">See how our strategy, technology and delivery capabilities come together.</p>
            <p className="mt-4 text-xs leading-5 text-muted">Approved project imagery, client names and outcomes to be confirmed by Team Oreo.</p>
            <Button href="/work" variant="secondary" className="mt-6">Explore Our Work</Button>
          </div>
          <div className="flex min-h-72 items-center justify-center bg-brand-soft p-7 sm:p-10">
            <div className="w-full max-w-lg overflow-hidden rounded-lg border border-ink/15 bg-white shadow-[0_16px_35px_rgba(24,21,28,0.10)]">
              <div className="flex h-9 items-center gap-2 border-b border-line px-4"><span className="size-2 rounded-full bg-brand"/><span className="size-2 rounded-full bg-line"/><span className="size-2 rounded-full bg-line"/></div>
              <div className="grid grid-cols-[0.35fr_1fr] gap-4 p-5">
                <div className="rounded bg-surface" />
                <div className="space-y-3 py-2"><div className="h-3 w-1/2 rounded bg-ink/80"/><div className="h-2 rounded bg-line"/><div className="h-2 w-4/5 rounded bg-line"/><div className="mt-5 h-16 rounded bg-mint"/></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
