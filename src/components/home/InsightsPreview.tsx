import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const topics = [
  { category: "Technology", title: "Making better technology decisions as your organisation grows", color: "bg-brand-soft" },
  { category: "Data", title: "From reporting overload to useful business insight", color: "bg-mint" },
  { category: "AI", title: "Where responsible AI can add value to everyday work", color: "bg-[#eef1f8]" },
];

export function InsightsPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Latest thinking" title="Ideas for doing business better." />
          <Link href="/insights" className="shrink-0 text-sm font-bold underline decoration-brand decoration-2 underline-offset-8 hover:text-brand-dark">View all insights</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {topics.map((topic, index) => (
            <article key={topic.title}>
              <div className={`${topic.color} relative aspect-[16/9] overflow-hidden rounded-lg p-5`}>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{topic.category}</span>
                <span className="absolute -bottom-10 -right-7 text-[12rem] font-semibold leading-none text-white/70" aria-hidden="true">{index + 1}</span>
              </div>
              <p className="mt-5 text-xs text-muted">Article content to be confirmed</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em]">{topic.title}</h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
