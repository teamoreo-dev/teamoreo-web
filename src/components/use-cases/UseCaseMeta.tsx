import Link from "next/link";
import type { ReactNode } from "react";
import type { UseCaseRecord } from "@/data/useCases";
import { getService } from "@/data/services";

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5f6c83]">{label}</dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-ink">{children}</dd>
    </div>
  );
}

export function UseCaseMeta({ useCase }: { useCase: UseCaseRecord }) {
  const showClient = useCase.client && !useCase.provenance?.ambiguousFields?.includes("client");
  const services = useCase.servicesProvided.flatMap((slug) => {
    const service = getService(slug);
    return service ? [service] : [];
  });
  const columns = useCase.liveView ? "lg:grid-cols-5" : showClient ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-6 border-b border-[#e5e7ed] py-8 sm:grid-cols-3 ${columns}`}>
      {showClient ? <MetaItem label="Client">{useCase.client}</MetaItem> : null}
      <MetaItem label="Category">{useCase.category}</MetaItem>
      {useCase.liveView ? (
        <MetaItem label="Live View"><a href={useCase.liveView.href} target="_blank" rel="noopener noreferrer" aria-label={`${useCase.liveView.label ?? "Visit website"} (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 underline decoration-line underline-offset-4 hover:text-brand-dark sm:min-h-0">{useCase.liveView.label ?? "Visit Website"}<span aria-hidden="true">↗</span></a></MetaItem>
      ) : null}
      {useCase.timeline ? <MetaItem label="Timelines">{useCase.timeline}</MetaItem> : null}
      {services.length ? (
        <MetaItem label="Service We Provided"><ul className="space-y-1">{services.map((service) => <li key={service.slug}><Link href={service.href} className="inline-flex min-h-11 items-center hover:text-brand-dark hover:underline sm:min-h-0">{service.title}</Link></li>)}</ul></MetaItem>
      ) : null}
    </dl>
  );
}
