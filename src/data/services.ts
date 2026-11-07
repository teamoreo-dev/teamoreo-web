import database from "../../db.json";
import type { UseCaseRecord } from "./useCases";

export type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: { src: string; alt: string; sourceUrl: string };
  recentWork: string[];
  sourceUrl: string;
};

type ContentDatabase = {
  schemaVersion: number;
  services: ServiceRecord[];
  useCases: UseCaseRecord[];
};

const content: ContentDatabase = database;

export const services = content.services.map((service) => ({
  ...service,
  href: `/services/${service.slug}`,
}));

export type Service = (typeof services)[number];

export const serviceLinks = services.map(({ title, href }) => ({ label: title, href }));

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRecentWork(service: Service) {
  return service.recentWork.map((slug) => {
    const work = content.useCases.find((item) => item.slug === slug);
    if (!work) throw new Error(`Unknown use-case reference in service ${service.slug}: ${slug}`);
    return { ...work, href: `/use-cases/${work.slug}` };
  });
}
