"use client";

import Link from "next/link";
import { PageHeader } from "@/components/admin/AdminShell";
import { EmptyState, ErrorState, Skeleton, TableSkeleton } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { tableWrap, td, th } from "@/components/admin/ui";
import { useApi } from "@/lib/admin/useApi";
import { useSessionRedirect } from "@/lib/admin/useSessionRedirect";
import { formatDate } from "@/lib/admin/format";
import type { DashboardSummary } from "@/lib/admin/types";

function StatCard({ label, value, href }: { label: string; value?: number; href?: string }) {
  const body = (
    <>
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        {value === undefined ? <Skeleton className="h-9 w-16" /> : value}
      </dd>
    </>
  );
  const cls = "block rounded-lg border border-line bg-white p-5";
  return (
    <div>
      {href ? (
        <Link href={href} className={`${cls} transition-colors hover:border-brand`}>
          <dl>{body}</dl>
        </Link>
      ) : (
        <dl className={cls}>{body}</dl>
      )}
    </div>
  );
}

export function DashboardView() {
  const { data, error, loading, refetch } = useApi<DashboardSummary>("/api/admin/dashboard/summary");
  useSessionRedirect(error);

  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your articles and enquiries." />

      {error && !data ? (
        <ErrorState message="We couldn't load the dashboard." onRetry={refetch} />
      ) : (
        <>
          <section aria-label="Summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Articles" value={data?.totalArticles} href="/admin/blogs" />
            <StatCard label="Published Articles" value={data?.publishedArticles} href="/admin/blogs?status=published" />
            <StatCard label="Total Enquiries" value={data?.totalEnquiries} href="/admin/contacts" />
            <StatCard label="New Enquiries" value={data?.newEnquiries} href="/admin/contacts?status=new" />
          </section>

          <section aria-labelledby="recent-heading" className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="recent-heading" className="text-lg font-semibold text-ink">Recent enquiries</h2>
              <Link href="/admin/contacts" className="text-sm font-bold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark">
                View all
              </Link>
            </div>

            {loading && !data ? (
              <TableSkeleton rows={4} cols={5} />
            ) : data && data.recentEnquiries.length === 0 ? (
              <EmptyState title="No enquiries yet" description="New messages from the Contact page will appear here." />
            ) : (
              <div className={tableWrap}>
                <table className="min-w-full">
                  <caption className="sr-only">Most recent enquiries</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={th}>Name</th>
                      <th scope="col" className={th}>Email</th>
                      <th scope="col" className={th}>Subject</th>
                      <th scope="col" className={th}>Status</th>
                      <th scope="col" className={th}>Date</th>
                      <th scope="col" className={th}><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.recentEnquiries.map((c) => (
                      <tr key={c._id}>
                        <td className={`${td} font-semibold`}>{c.name}</td>
                        <td className={td}>{c.email}</td>
                        <td className={td}>{c.subject || "—"}</td>
                        <td className={td}><StatusBadge status={c.status} /></td>
                        <td className={`${td} whitespace-nowrap`}>{formatDate(c.createdAt)}</td>
                        <td className={td}>
                          <Link href={`/admin/contacts/${c._id}`} className="font-bold text-brand-dark underline underline-offset-4">
                            View<span className="sr-only"> enquiry from {c.name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
