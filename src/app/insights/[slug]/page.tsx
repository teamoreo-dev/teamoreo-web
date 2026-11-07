import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getPublicBlog } from "@/lib/blog/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try { return await getPublicBlog(slug); } catch (error) { if (error instanceof Error && error.message.includes("404")) notFound(); throw error; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await load((await params).slug);
  return { title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt, alternates: { canonical: `/insights/${article.slug}` }, openGraph: { title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt, url: `/insights/${article.slug}`, type: "article", images: article.featuredImage?.url ? [{ url: article.featuredImage.url, alt: article.featuredImage.alt || article.title }] : undefined } };
}

export default async function InsightDetailPage({ params }: Props) {
  const article = await load((await params).slug);
  return <article>
    <header className="text-white" style={{ background: "radial-gradient(55% 75% at 100% 0%, rgba(232,25,114,0.30), transparent 65%), #0b0c14" }}>
      <Container className="py-14 sm:py-20"><Link href="/insights" className="text-sm underline underline-offset-4">← All insights</Link><div className="mt-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.12em] text-pink-300">{article.category ? <span>{article.category}</span> : null}{article.publishedAt ? <time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(article.publishedAt))}</time> : null}</div><h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em]">{article.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{article.excerpt}</p></Container>
    </header>
    <Container className="py-12 sm:py-16">
      {article.featuredImage?.url ? <div className="mb-10 overflow-hidden rounded-xl bg-surface"><img src={article.featuredImage.url} alt={article.featuredImage.alt || article.title} className="max-h-[34rem] w-full object-cover" /></div> : null}
      <div className="mx-auto max-w-3xl"><p className="mb-8 text-sm font-semibold text-muted">By {article.author || "Team Oreo"}</p><div className="admin-rich article-content" dangerouslySetInnerHTML={{ __html: article.content || "" }} /></div>
    </Container>
  </article>;
}
