import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { useCases } from "@/data/useCases";
import { getPublicBlogs } from "@/lib/blog/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002";
  const staticRoutes = ["", "/about", "/services", "/use-cases", "/insights", "/contact", "/faq", "/privacy-policy", "/careers", "/certificates", "/community-hub", "/team", "/work", "/work-with-us", "/work-with-us/internship-placement", "/life-at-team-oreo"];
  const localRoutes = [...services.map((service) => service.href), ...useCases.map((useCase) => `/use-cases/${useCase.slug}`)];
  let articles: Awaited<ReturnType<typeof getPublicBlogs>>["items"] = [];
  try { articles = (await getPublicBlogs({ limit: 50 })).items; } catch { /* Keep static routes if the API is unavailable. */ }
  const staticEntries: MetadataRoute.Sitemap = [...staticRoutes, ...localRoutes].map((route, index) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: index === 0 ? 1 : 0.7 }));
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({ url: `${siteUrl}/insights/${article.slug}`, lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(), changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...staticEntries, ...articleEntries];
}
