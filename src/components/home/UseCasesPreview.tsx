import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const useCases = [
  { category: "Data", title: "Bringing scattered information into one clear view", copy: "Creating a more useful foundation for reporting and decisions.", tone: "bg-mint" },
  { category: "Operations", title: "Finding friction in a business-critical process", copy: "Understanding delays and where a workflow can improve.", tone: "bg-brand-soft" },
  { category: "Technology", title: "Connecting a manual workflow through technology", copy: "Exploring a simpler, more consistent digital process.", tone: "bg-[#eef1f8]" },
];

function UseCaseVisual({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full" aria-hidden="true">
      <rect width="320" height="170" fill="transparent" />
      {index === 0 ? <><rect x="64" y="44" width="48" height="82" rx="5" fill="#fff"/><rect x="136" y="68" width="48" height="58" rx="5" fill="#fff"/><rect x="208" y="28" width="48" height="98" rx="5" fill="#e81972"/></> : null}
      {index === 1 ? <><circle cx="80" cy="85" r="26" fill="#fff"/><circle cx="160" cy="85" r="26" fill="#e81972"/><circle cx="240" cy="85" r="26" fill="#fff"/><path d="M106 85h28M186 85h28" stroke="#16151a" strokeWidth="5"/></> : null}
      {index === 2 ? <><rect x="48" y="35" width="224" height="100" rx="10" fill="#fff" stroke="#16151a" strokeWidth="4"/><path d="M80 104l48-39 43 25 67-45" fill="none" stroke="#e81972" strokeWidth="8" strokeLinecap="round"/></> : null}
    </svg>
  );
}

export function UseCasesPreview() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Use cases" title="The kinds of challenges we help solve." />
          <Link href="/use-cases" className="shrink-0 text-sm font-bold underline decoration-brand decoration-2 underline-offset-8 hover:text-brand-dark">View all use cases</Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {useCases.map((item, index) => (
            <Link href="/use-cases" key={item.title} className="group overflow-hidden rounded-xl border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_10px_24px_rgba(24,21,28,0.06)]">
              <div className={`${item.tone} aspect-[16/8.5]`}><UseCaseVisual index={index} /></div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-dark">{item.category}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
                <p className="mt-4 text-[0.7rem] text-muted">Details to be confirmed by Team Oreo.</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
