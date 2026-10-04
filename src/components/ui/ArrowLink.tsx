import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm font-bold text-ink underline decoration-brand decoration-2 underline-offset-8 transition-colors hover:text-brand-dark"
    >
      {children}
    </Link>
  );
}
