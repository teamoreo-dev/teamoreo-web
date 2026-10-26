import Link from "next/link";
import { btnPrimary, btnSecondary } from "./ui";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded bg-surface ${className}`} />;
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div role="status" aria-live="polite" className="space-y-2 rounded-lg border border-line bg-white p-4">
      <span className="sr-only">Loading…</span>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: cols }).map((__, c) => (
            <Skeleton key={c} className="h-6" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p> : null}
      {action ? (
        <div className="mt-6">
          {action.href ? (
            <Link href={action.href} className={btnPrimary}>
              {action.label}
            </Link>
          ) : (
            <button type="button" onClick={action.onClick} className={btnSecondary}>
              {action.label}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function ErrorState({
  message = "We couldn't load this. Please try again.",
  onRetry,
  backHref,
}: {
  message?: string;
  onRetry?: () => void;
  backHref?: string;
}) {
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-6 py-10 text-center">
      <p className="font-semibold text-red-800">{message}</p>
      <div className="mt-5 flex justify-center gap-3">
        {onRetry ? (
          <button type="button" onClick={onRetry} className={btnSecondary}>
            Try again
          </button>
        ) : null}
        {backHref ? (
          <Link href={backHref} className={btnSecondary}>
            Go back
          </Link>
        ) : null}
      </div>
    </div>
  );
}
