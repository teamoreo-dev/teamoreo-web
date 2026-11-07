import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPublicBlogs } from "@/lib/blog/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical ideas on technology, data, AI and building better businesses with Team Oreo.",
  alternates: { canonical: "/insights" },
  openGraph: { title: "Insights | Team Oreo", description: "Practical ideas from Team Oreo.", url: "/insights" },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(Array.isArray(params.page) ? params.page[0] : params.page) || 1;
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const search = Array.isArray(params.search) ? params.search[0] : params.search;
  let result;
  let categoryOptions: string[] = [];
  let failed = false;
  try {
    const responses = await Promise.all([getPublicBlogs({ page, limit: 12, category, search }), getPublicBlogs({ limit: 50 })]);
    result = responses[0];
    categoryOptions = [...new Set(responses[1].items.map((article) => article.category).filter((value): value is string => Boolean(value)))].sort();
  } catch { failed = true; }

  return (
    <>
      <section className="text-white" style={{ background: "radial-gradient(55% 75% at 100% 0%, rgba(232,25,114,0.30), transparent 65%), #0b0c14" }}>
      <Container className="flex h-[440px] flex-col items-start justify-start pt-[112px] sm:h-[440px] sm:pt-[112px] lg:h-[440px] lg:pt-[112px] [&_h1]:!max-w-[720px] [&_h1]:!text-[30px] [&_h1]:!leading-[1.15] [&_h1]:!tracking-normal">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-pink-300"><span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />Blog</p>
          <h1 className="mt-7 max-w-3xl text-[clamp(2.1rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em]">Discover proven techniques to ignite creativity and overcome blocks for limitless inspiration in your endeavors.</h1>
          <nav aria-label="Breadcrumb" className="mt-8 text-sm font-semibold"><Link href="/">Home</Link><span className="mx-3 text-white/50" aria-hidden="true">/</span><span className="text-brand" aria-current="page">Blog</span></nav>
        </Container>
      </section>

      <section className="bg-[#faf9fb] py-10 sm:py-14">
        <Container>
          <form className="mb-8 grid gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-[1fr_auto_auto]" role="search">
            <label className="sr-only" htmlFor="insights-search">Search insights</label>
            <input id="insights-search" name="search" defaultValue={search} placeholder="Search insights" className="min-h-11 rounded border border-line px-3 text-sm outline-none focus:border-brand" />
            <label className="sr-only" htmlFor="insights-category">Category</label>
            <select id="insights-category" name="category" defaultValue={category || ""} className="min-h-11 rounded border border-line bg-white px-3 text-sm outline-none focus:border-brand"><option value="">All categories</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
            <button className="min-h-11 rounded bg-brand px-5 text-sm font-bold text-white hover:bg-brand-dark" type="submit">Search</button>
          </form>

          {failed ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">We couldn’t load insights right now. Please try again shortly.</div> : result?.items.length ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{result.items.map((article) => <BlogCard key={article._id || article.slug} article={article} />)}</div>
              {result.totalPages > 1 ? <nav aria-label="Insights pages" className="mt-10 flex flex-wrap justify-center gap-2">{Array.from({ length: result.totalPages }, (_, index) => { const number = index + 1; const query = new URLSearchParams(); query.set("page", String(number)); if (category) query.set("category", category); if (search) query.set("search", search); return <Link key={number} href={`/insights?${query}`} aria-current={number === result.page ? "page" : undefined} className={`grid size-10 place-items-center rounded border text-sm font-bold ${number === result.page ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand"}`}>{number}</Link>; })}</nav> : null}
            </>
          ) : <div className="rounded-xl border border-line bg-white p-10 text-center"><h2 className="text-xl font-semibold">No published insights yet</h2><p className="mt-2 text-sm text-muted">Please check back soon for new ideas from Team Oreo.</p></div>}
        </Container>
      </section>
    </>
  );
}
