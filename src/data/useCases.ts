import database from "../../db.json";

export type UseCaseImage = { src: string; alt: string; sourceUrl?: string };
export type UseCaseContent = { paragraphs?: string[]; items?: string[] };

export type UseCaseRecord = {
  slug: string;
  title: string;
  project: string;
  client?: string;
  category: string;
  timeline?: string;
  summary: string;
  servicesProvided: string[];
  sourceUrl: string;
  sourceNote?: string;
  about?: string[];
  problems?: UseCaseContent;
  challenges?: UseCaseContent;
  solutions?: UseCaseContent;
  results?: string[];
  liveView?: { href: string; label?: string };
  heroImage?: UseCaseImage;
  secondaryImage?: UseCaseImage;
  artwork?: { title: string; label: string };
  testimonial?: { quote: string; author: string; role?: string; excerpt?: boolean };
  provenance?: {
    verifiedOn: string;
    liveViewSourceHref?: string;
    notes?: string[];
    ambiguousFields?: string[];
  };
  listingOrder?: number;
  listingSummary?: string;
  image?: string;
};

export type UseCase = UseCaseRecord;
const records: UseCaseRecord[] = database.useCases;

// Keep the approved listing's order and copy while sharing canonical project records.
export const useCases = [...records]
  .sort((a, b) => (a.listingOrder ?? 0) - (b.listingOrder ?? 0))
  .map((record) => ({ ...record, image: record.image ?? record.heroImage?.src, summary: record.listingSummary ?? record.summary }));

export function getUseCase(slug: string) {
  return records.find((record) => record.slug === slug);
}
