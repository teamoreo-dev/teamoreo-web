import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function TeamPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-mint" aria-hidden="true">
          <div className="absolute left-[12%] top-[12%] size-32 rounded-full bg-brand" />
          <div className="absolute bottom-0 left-[24%] h-48 w-32 rounded-t-full bg-ink" />
          <div className="absolute right-[13%] top-[18%] size-28 rounded-full bg-[#efc2a6]" />
          <div className="absolute bottom-0 right-[9%] h-52 w-36 rounded-t-full bg-white" />
          <div className="absolute bottom-10 left-10 h-24 w-24 border-[14px] border-white" />
        </div>
        <div>
          <p className="eyebrow">Our team</p>
          <h2 className="balance mt-4 text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Different perspectives. One shared focus.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">Team Oreo brings people across business, technology, data and delivery together around each challenge.</p>
          <p className="mt-5 text-xs leading-5 text-muted">Team profiles and approved photography to be confirmed by Team Oreo.</p>
          <Button href="/team" variant="secondary" className="mt-6">Meet Our Team</Button>
        </div>
      </Container>
    </section>
  );
}
