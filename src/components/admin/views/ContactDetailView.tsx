"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/AdminShell";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ErrorState, Skeleton } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useToast } from "@/components/admin/Toast";
import { useHandleError } from "@/components/admin/useHandleError";
import { btnPrimary, btnSecondary, btnDanger } from "@/components/admin/ui";
import { api } from "@/lib/admin/api";
import { formatDateTime } from "@/lib/admin/format";
import type { Contact, ContactStatus } from "@/lib/admin/types";
import { useApi } from "@/lib/admin/useApi";
import { useSessionRedirect } from "@/lib/admin/useSessionRedirect";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-ink break-words">{children}</dd>
    </div>
  );
}

export function ContactDetailView({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();
  const handleError = useHandleError();
  const { data, error, loading, refetch } = useApi<Contact>(`/api/admin/contacts/${id}`);
  useSessionRedirect(error);

  const [updating, setUpdating] = useState<ContactStatus | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function setStatus(status: ContactStatus) {
    setUpdating(status);
    try {
      await api(`/api/admin/contacts/${id}`, { method: "PATCH", body: { status } });
      toast.success(`Marked as ${status}`);
      refetch();
    } catch (err) {
      handleError(err, "Could not update the status.");
    } finally {
      setUpdating(null);
    }
  }

  async function remove() {
    setDeleting(true);
    try {
      await api(`/api/admin/contacts/${id}`, { method: "DELETE" });
      toast.success("Enquiry deleted");
      router.replace("/admin/contacts");
    } catch (err) {
      handleError(err, "Could not delete the enquiry.");
      setDeleting(false);
    }
  }

  const back = <Link href="/admin/contacts" className={btnSecondary}>← Back to enquiries</Link>;

  if (error && !data) {
    const missing = error.status === 404 || error.status === 400;
    return (
      <>
        <PageHeader title="Enquiry" />
        <ErrorState message={missing ? "Enquiry not found." : "We couldn't load this enquiry."} onRetry={missing ? undefined : refetch} backHref="/admin/contacts" />
      </>
    );
  }

  if (loading && !data) {
    return (
      <>
        <PageHeader title="Enquiry" />
        <div role="status" className="space-y-4">
          <span className="sr-only">Loading enquiry…</span>
          <Skeleton className="h-40" />
          <Skeleton className="h-48" />
        </div>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <PageHeader title={`Enquiry from ${data.name}`} actions={back} />

      <div className="space-y-6">
        <section aria-labelledby="details-heading" className="rounded-lg border border-line bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="details-heading" className="text-lg font-semibold text-ink">Details</h2>
            <StatusBadge status={data.status} />
          </div>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Name">{data.name}</Field>
            <Field label="Company">{data.companyName || "—"}</Field>
            <Field label="Email"><a className="font-semibold text-brand-dark underline underline-offset-4" href={`mailto:${data.email}`}>{data.email}</a></Field>
            <Field label="Phone">{data.phone ? <a className="font-semibold text-brand-dark underline underline-offset-4" href={`tel:${data.phone.replace(/\s+/g, "")}`}>{data.phone}</a> : "—"}</Field>
            <Field label="Subject">{data.subject || "—"}</Field>
            <Field label="Received">{formatDateTime(data.createdAt)}</Field>
          </dl>
        </section>

        <section aria-labelledby="message-heading" className="rounded-lg border border-line bg-white p-5 sm:p-6">
          <h2 id="message-heading" className="text-lg font-semibold text-ink">Message</h2>
          {/* Plain text only: this is visitor-submitted content, so never render it as HTML */}
          <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-ink">{data.message}</p>
        </section>

        <section aria-label="Actions" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" className={btnSecondary} disabled={updating !== null || data.status === "read"} onClick={() => setStatus("read")}>
            {updating === "read" ? "Updating…" : "Mark as Read"}
          </button>
          <button type="button" className={btnPrimary} disabled={updating !== null || data.status === "resolved"} onClick={() => setStatus("resolved")}>
            {updating === "resolved" ? "Updating…" : "Mark as Resolved"}
          </button>
          <button type="button" className={`${btnDanger} sm:ml-auto`} onClick={() => setConfirmOpen(true)}>
            Delete enquiry
          </button>
        </section>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this enquiry?"
        description={`The message from ${data.name} will be permanently deleted. This can't be undone.`}
        busy={deleting}
        onConfirm={remove}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
