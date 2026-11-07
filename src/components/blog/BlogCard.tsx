import Link from "next/link";
import type { PublicBlog } from "@/lib/blog/types";

export function BlogCard({ article }: { article: PublicBlog }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_8px_22px_rgba(24,21,28,0.06)]">
      <Link href={`/insights/${article.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#17132d]">
          {article.featuredImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.featuredImage.url} alt={article.featuredImage.alt || ""} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_80%_20%,#e81972,transparent_35%),linear-gradient(135deg,#15132c,#31206b)]" aria-hidden="true" />
          )}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand-dark">
            {article.category ? <span>{article.category}</span> : null}
            {article.publishedAt ? <time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date(article.publishedAt))}</time> : null}
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:text-brand-dark">{article.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{article.excerpt}</p>
          <span className="mt-5 inline-flex text-sm font-bold underline decoration-brand decoration-2 underline-offset-8">Read article →</span>
        </div>
      </Link>
    </article>
  );
}
