"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/AdminShell";
import { Pagination } from "@/components/admin/Pagination";
import { SearchBox } from "@/components/admin/SearchBox";
import { EmptyState, ErrorState, TableSkeleton } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { btnSecondary, btnSmall, inputClass, tableWrap, td, th } from "@/components/admin/ui";
import { qs } from "@/lib/admin/api";
import { formatDate } from "@/lib/admin/format";
import type { Contact, Paginated } from "@/lib/admin/types";
import { useApi } from "@/lib/admin/useApi";
import { useListParams } from "@/lib/admin/useListParams";
import { useSessionRedirect } from "@/lib/admin/useSessionRedirect";

const LIMIT = 10;

export function ContactsListView() {
  const { page, search, status, update } = useListParams();
  const [resetKey, setResetKey] = useState(0);

  const { data, error, loading, refetch } = useApi<Paginated<Contact>>(
    `/api/admin/contacts${qs({ page, limit: LIMIT, search, status })}`,
  );
  useSessionRedirect(error);

  const filtered = Boolean(search || status);

  return (
    <>
      <PageHeader title="Contact Submissions" description="Enquiries sent from the Contact page." />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBox key={resetKey} value={search} onSearch={(v) => update({ search: v, status })} label="Search enquiries" placeholder="Search name, email, company or subject" />
        <div>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select id="status-filter" value={status} onChange={(e) => update({ search, status: e.target.value })} className={`${inputClass} mt-0 sm:w-44`}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {error && !data ? (
        <ErrorState message="We couldn't load the enquiries." onRetry={refetch} />
      ) : loading && !data ? (
        <TableSkeleton rows={5} cols={5} />
      ) : data && data.items.length === 0 ? (
        filtered ? (
          <EmptyState
            title="No enquiries match your filters"
            description="Try a different search or status."
            action={{ label: "Clear filters", onClick: () => { setResetKey((k) => k + 1); update({ search: "", status: "" }); } }}
          />
        ) : (
          <EmptyState title="No enquiries yet" description="Messages sent from the Contact page will appear here." />
        )
      ) : (
        data && (
          <>
            <div className={`${tableWrap} ${loading ? "opacity-60" : ""}`} aria-busy={loading}>
              <table className="min-w-full">
                <caption className="sr-only">Enquiries</caption>
                <thead>
                  <tr>
                    <th scope="col" className={th}>Name</th>
                    <th scope="col" className={th}>Email</th>
                    {/* Remove this column if the approved Contact form has no subject field */}
                    <th scope="col" className={th}>Subject</th>
                    <th scope="col" className={th}>Date</th>
                    <th scope="col" className={th}>Status</th>
                    <th scope="col" className={th}><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((c) => (
                    <tr key={c._id}>
                      <td className={`${td} ${c.status === "new" ? "font-bold" : "font-medium"}`}>{c.name}</td>
                      <td className={td}>{c.email}</td>
                      <td className={td}>{c.subject || "—"}</td>
                      <td className={`${td} whitespace-nowrap`}>{formatDate(c.createdAt)}</td>
                      <td className={td}><StatusBadge status={c.status} /></td>
                      <td className={td}>
                        <Link href={`/admin/contacts/${c._id}`} className={`${btnSecondary} ${btnSmall}`}>
                          View<span className="sr-only"> enquiry from {c.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={data.page} totalPages={data.totalPages} total={data.total} limit={data.limit} onPage={(p) => update({ page: p, search, status })} />
          </>
        )
      )}
    </>
  );
}
