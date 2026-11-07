import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CareersPreview() {
  return (
    <section className="bg-surface py-12 sm:py-14">
      <Container>
        <div className="grid gap-6 rounded-r-xl border-l-4 border-brand bg-white p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
          <div>
            <p className="eyebrow">Work with us</p>
            <h2 className="balance mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">Start your next chapter at Team Oreo.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">Explore careers, internships and placement opportunities with a team that values curiosity and practical thinking.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/careers" className="inline-flex min-h-12 items-center justify-center rounded bg-ink px-6 text-sm font-bold text-white hover:bg-brand">Explore Careers</Link>
            <Link href="/work-with-us/internship-placement" className="inline-flex min-h-12 items-center justify-center rounded border border-ink/20 px-6 text-sm font-bold hover:border-brand hover:text-brand-dark">Internships & Placement</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
