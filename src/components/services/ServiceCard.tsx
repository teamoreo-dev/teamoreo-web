import Link from "next/link";
import type { Service } from "@/data/services";
import { ServiceIcon } from "./ServiceIcon";

const tones = ["bg-white", "bg-brand-soft", "bg-mint", "bg-white", "bg-[#f1f3f7]", "bg-brand-soft", "bg-[#f3effa]", "bg-mint"];

export function ServiceCard({ service, index, headingLevel = 2 }: { service: Service; index: number; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Link
      href={service.href}
      className={`group block min-h-56 rounded-xl border border-line p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_10px_24px_rgba(24,21,28,0.06)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark ${tones[index % tones.length]}`}
    >
      <div className="grid size-12 place-items-center rounded-lg border border-brand/15 bg-white text-brand-dark">
        <ServiceIcon slug={service.slug} />
      </div>
      <Heading className="mt-6 text-xl font-semibold leading-tight tracking-[-0.025em] text-ink">{service.title}</Heading>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{service.shortDescription}</p>
    </Link>
  );
}
