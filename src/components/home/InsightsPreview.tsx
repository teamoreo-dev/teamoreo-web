import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublicBlogs } from "@/lib/blog/api";
import type { PublicBlog } from "@/lib/blog/types";

export async function InsightsPreview() {
  let articles: PublicBlog[] = [];
  try { articles = (await getPublicBlogs({ limit: 3 })).items; } catch { /* Homepage remains usable when the API is unavailable. */ }
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Latest thinking" title="Ideas for doing business better." />
          <Link href="/insights" className="shrink-0 text-sm font-bold underline decoration-brand decoration-2 underline-offset-8 hover:text-brand-dark">View all insights</Link>
        </div>
        {articles.length ? <div className="mt-10 grid gap-6 md:grid-cols-3">{articles.map((article) => <article key={article._id || article.slug}><Link href={`/insights/${article.slug}`} className="group block"><div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#17132d]">{article.featuredImage?.url ? <img src={article.featuredImage.url} alt={article.featuredImage.alt || ""} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_80%_20%,#e81972,transparent_35%),linear-gradient(135deg,#15132c,#31206b)]" aria-hidden="true" />}</div><p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-brand-dark">{article.category || "Insights"}</p><h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:text-brand-dark">{article.title}</h3></Link></article>)}</div> : <div className="mt-10 rounded-lg border border-line bg-surface p-7 text-sm text-muted">New insights from Team Oreo will appear here soon.</div>}
      </Container>
    </section>
  );
}
