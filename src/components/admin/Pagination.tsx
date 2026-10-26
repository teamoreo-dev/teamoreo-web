import { btnSecondary } from "./ui";

type Props = { page: number; totalPages: number; total: number; limit: number; onPage: (p: number) => void };

export function Pagination({ page, totalPages, total, limit, onPage }: Props) {
  if (total === 0) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);

  return (
    <nav aria-label="Pagination" className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-muted">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={`${btnSecondary} min-h-10 px-3`} disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={`min-h-10 min-w-10 rounded-[0.35rem] border px-3 text-sm font-bold ${
              p === page ? "border-brand bg-brand text-white" : "border-ink/20 bg-white text-ink hover:bg-surface"
            }`}
          >
            {p}
          </button>
        ))}
        <button type="button" className={`${btnSecondary} min-h-10 px-3`} disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
          Next
        </button>
      </div>
    </nav>
  );
}
