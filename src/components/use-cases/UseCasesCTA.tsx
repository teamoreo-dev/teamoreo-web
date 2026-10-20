import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function UseCasesCTA() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div
          className="rounded-[28px] px-6 py-16 text-center text-white shadow-[0_24px_60px_rgba(232,25,114,0.22)] sm:px-12 sm:py-20"
          style={{ background: "linear-gradient(135deg, #e8287a 0%, #e5006a 45%, #c70f5d 100%)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">Let’s solve what’s next</p>
          <h2 className="balance mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.035em]">
            Have a business challenge? Let’s make it clearer.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/80">
            Start with a straightforward conversation about where you are and where you want to go.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-8 text-base font-bold text-ink transition-colors duration-200 hover:bg-brand-soft"
          >
            Talk to our team
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
