"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/AdminShell";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Pagination } from "@/components/admin/Pagination";
import { SearchBox } from "@/components/admin/SearchBox";
import { EmptyState, ErrorState, TableSkeleton } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useToast } from "@/components/admin/Toast";
import { useHandleError } from "@/components/admin/useHandleError";
import { btnPrimary, btnSecondary, btnSmall, inputClass, tableWrap, td, th } from "@/components/admin/ui";
import { api, qs } from "@/lib/admin/api";
import { formatDate } from "@/lib/admin/format";
import type { Blog, Paginated } from "@/lib/admin/types";
import { useApi } from "@/lib/admin/useApi";
import { useListParams } from "@/lib/admin/useListParams";
import { useSessionRedirect } from "@/lib/admin/useSessionRedirect";

const LIMIT = 10;

export function BlogsListView() {
  const { page, search, status, update } = useListParams();
  const toast = useToast();
  const handleError = useHandleError();
  const [resetKey, setResetKey] = useState(0);
  const [toDelete, setToDelete] = useState<Blog | null>(null);
  const [busy, setBusy] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const { data, error, loading, refetch } = useApi<Paginated<Blog>>(
    `/api/admin/blogs${qs({ page, limit: LIMIT, search, status })}`,
  );
  useSessionRedirect(error);

  const filtered = Boolean(search || status);

  async function confirmDelete() {
    if (!toDelete) return;
    setBusy(true);
    try {
      await api(`/api/admin/blogs/${toDelete._id}`, { method: "DELETE" });
      toast.success("Article deleted");
      const wasLastOnPage = data?.items.length === 1 && page > 1;
      setToDelete(null);
      if (wasLastOnPage) update({ page: page - 1, search, status });
      else refetch();
    } catch (err) {
      handleError(err, "Could not delete the article.");
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(blog: Blog) {
    const next = blog.status === "published" ? "draft" : "published";
    setTogglingId(blog._id);
    try {
      await api(`/api/admin/blogs/${blog._id}`, { method: "PATCH", body: { status: next } });
      toast.success(next === "published" ? "Article published" : "Article unpublished");
      refetch();
    } catch (err) {
      handleError(err, "Could not update the article.");
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Blog Management"
        description="Create, edit, publish and remove articles."
        actions={<Link href="/admin/blogs/new" className={btnPrimary}>New article</Link>}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBox key={resetKey} value={search} onSearch={(v) => update({ search: v, status })} label="Search articles" placeholder="Search by title or excerpt" />
        <div>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select id="status-filter" value={status} onChange={(e) => update({ search, status: e.target.value })} className={`${inputClass} mt-0 sm:w-44`}>
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {error && !data ? (
        <ErrorState message="We couldn't load the articles." onRetry={refetch} />
      ) : loading && !data ? (
        <TableSkeleton rows={5} cols={6} />
      ) : data && data.items.length === 0 ? (
        filtered ? (
          <EmptyState
            title="No articles match your filters"
            description="Try a different search or status."
            action={{ label: "Clear filters", onClick: () => { setResetKey((k) => k + 1); update({ search: "", status: "" }); } }}
          />
        ) : (
          <EmptyState title="No articles yet" description="Write your first article to get started." action={{ label: "New article", href: "/admin/blogs/new" }} />
        )
      ) : (
        data && (
          <>
            <div className={`${tableWrap} ${loading ? "opacity-60" : ""} hidden lg:block`} aria-busy={loading}>
              <table className="min-w-full">
                <caption className="sr-only">Articles</caption>
                <thead>
                  <tr>
                    <th scope="col" className={th}>Image</th>
                    <th scope="col" className={th}>Title</th>
                    <th scope="col" className={th}>Category</th>
                    <th scope="col" className={th}>Status</th>
                    <th scope="col" className={th}>Date</th>
                    <th scope="col" className={th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((b) => (
                    <tr key={b._id}>
                      <td className={td}>
                        {/* Plain <img>: next/image would need Cloudinary in next.config remotePatterns (shared file) */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.featuredImage?.url} alt={b.featuredImage?.alt || ""} width={64} height={40} className="h-10 w-16 rounded object-cover bg-surface" />
                      </td>
                      <td className={`${td} min-w-56 font-semibold`}>{b.title}</td>
                      <td className={td}>{b.category}</td>
                      <td className={td}><StatusBadge status={b.status} /></td>
                      <td className={`${td} whitespace-nowrap`}>{formatDate(b.status === "published" ? b.publishedAt : b.updatedAt)}</td>
                      <td className={td}>
                        <div className="flex flex-wrap gap-2">
                          <Link href={`/admin/blogs/${b._id}/edit`} className={`${btnSecondary} ${btnSmall}`}>
                            Edit<span className="sr-only"> {b.title}</span>
                          </Link>
                          <button type="button" disabled={togglingId === b._id} onClick={() => togglePublish(b)} className={`${btnSecondary} ${btnSmall}`}>
                            {b.status === "published" ? "Unpublish" : "Publish"}<span className="sr-only"> {b.title}</span>
                          </button>
                          <button type="button" onClick={() => setToDelete(b)} className={`${btnSecondary} ${btnSmall} border-red-300 text-red-700 hover:border-red-700 hover:bg-red-50`}>
                            Delete<span className="sr-only"> {b.title}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`space-y-3 lg:hidden ${loading ? "opacity-60" : ""}`} aria-busy={loading}>
              {data.items.map((b) => (
                <article key={b._id} className="rounded-lg border border-line bg-white p-4 shadow-sm">
                  <div className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.featuredImage?.url} alt={b.featuredImage?.alt || ""} width={80} height={56} className="h-14 w-20 shrink-0 rounded object-cover bg-surface" />
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold leading-snug text-ink">{b.title}</h2>
                      <p className="mt-1 text-sm text-muted">{b.category}</p>
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-muted">Date</dt><dd className="mt-1 text-ink">{formatDate(b.status === "published" ? b.publishedAt : b.updatedAt)}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wide text-muted">Status</dt><dd className="mt-1"><StatusBadge status={b.status} /></dd></div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/admin/blogs/${b._id}/edit`} className={`${btnSecondary} ${btnSmall}`}>
                      Edit<span className="sr-only"> {b.title}</span>
                    </Link>
                    <button type="button" disabled={togglingId === b._id} onClick={() => togglePublish(b)} className={`${btnSecondary} ${btnSmall}`}>
                      {b.status === "published" ? "Unpublish" : "Publish"}<span className="sr-only"> {b.title}</span>
                    </button>
                    <button type="button" onClick={() => setToDelete(b)} className={`${btnSecondary} ${btnSmall} border-red-300 text-red-700 hover:border-red-700 hover:bg-red-50`}>
                      Delete<span className="sr-only"> {b.title}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <Pagination page={data.page} totalPages={data.totalPages} total={data.total} limit={data.limit} onPage={(p) => update({ page: p, search, status })} />
          </>
        )
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this article?"
        description={toDelete ? `“${toDelete.title}” will be permanently deleted. This can't be undone.` : ""}
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
