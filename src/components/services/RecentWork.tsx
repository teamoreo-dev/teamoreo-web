import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getRecentWork, type Service } from "@/data/services";

const backgrounds = [
  "linear-gradient(135deg, #160e20 0%, #5f103b 55%, #b31c5c 100%)",
  "linear-gradient(140deg, #cc2465 0%, #8a1c54 48%, #1a1025 100%)",
  "linear-gradient(135deg, #24152f 0%, #5a285f 55%, #9a1d59 100%)",
];

export function RecentWork({ service }: { service: Service }) {
  const work = getRecentWork(service);

  return (
    <section aria-labelledby="recent-work-heading" className="bg-white py-14 sm:py-18 lg:py-20">
      <Container>
        <h2 id="recent-work-heading" className="balance text-[clamp(1.65rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em] text-ink">Recent Work of {service.title}</h2>
        {work.length ? (
          <>
            <p className="mt-4 text-sm leading-6 text-muted sm:text-base">A selection of our {service.title.toLowerCase()} work.</p>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((project, index) => (
                <Link
                  key={project.slug}
                  href={project.href}
                  aria-label={`View work: ${project.title}`}
                  className="group relative flex min-h-64 w-full min-w-0 flex-col items-start overflow-hidden rounded-2xl border border-white/10 p-6 text-white shadow-[0_10px_24px_rgba(24,21,28,0.08)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark sm:aspect-[3/2]"
                  style={{ background: backgrounds[index % backgrounds.length] }}
                >
                  <span className="pointer-events-none absolute -right-5 -top-7 size-44 rounded-full bg-white/[0.05]" aria-hidden="true" />
                  <span className="pointer-events-none absolute right-14 top-16 size-24 rounded-full bg-white/[0.05]" aria-hidden="true" />
                  <span className="relative grid size-10 place-items-center rounded-lg bg-white/15" aria-hidden="true"><svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7v11h-6v-7H9v7H3V10Z" /></svg></span>
                  <h3 className="relative mb-4 mt-12 max-w-72 text-base font-bold leading-snug sm:text-lg">{project.title}</h3>
                  <span className="relative mt-auto inline-flex min-h-11 items-center justify-center self-center rounded-full bg-[#c70f5d] px-7 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-[#ad0c50]">View Work</span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-xl border border-line bg-surface px-6 py-8"><p className="text-sm leading-6 text-muted">Recent work for this service is not available yet.</p></div>
        )}
      </Container>
    </section>
  );
}
