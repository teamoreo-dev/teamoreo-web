import type { BlogStatus, ContactStatus } from "@/lib/admin/types";

const styles: Record<string, string> = {
  draft: "bg-surface text-ink border-line",
  published: "bg-mint text-emerald-900 border-emerald-200",
  new: "bg-brand-soft text-brand-dark border-brand/30",
  read: "bg-surface text-ink border-line",
  resolved: "bg-mint text-emerald-900 border-emerald-200",
};

const labels: Record<string, string> = {
  draft: "Draft", published: "Published", new: "New", read: "Read", resolved: "Resolved",
};


export function StatusBadge({ status }: { status: BlogStatus | ContactStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
