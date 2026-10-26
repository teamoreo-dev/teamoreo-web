"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/lib/admin/auth-context";

const NAV = [
  { label: "Dashboard", href: "/admin", exact: true },
  { label: "Blog Management", href: "/admin/blogs", exact: false },
  { label: "Contact Submissions", href: "/admin/contacts", exact: false },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  return (
    <div className="flex h-full flex-col bg-navy text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-lg font-bold tracking-tight">Team Oreo</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pink-300">Admin</p>
      </div>

      <nav aria-label="Admin" className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center rounded-md px-3 text-sm font-semibold transition-colors ${
                    active ? "bg-brand text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <p className="truncate px-3 pb-2 text-xs text-white/60" title={admin.email}>
          Signed in as {admin.email}
        </p>
        <button
          type="button"
          onClick={logout}
          className="flex min-h-11 w-full items-center rounded-md px-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The drawer is "open for" the pathname it was opened on, so navigating closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal(); // traps focus, Esc closes
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen lg:block">
        <SidebarNav />
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="flex items-center justify-between bg-navy px-4 py-3 text-white lg:hidden">
        <p className="font-bold">Team Oreo Admin</p>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpenFor(pathname)}
          className="min-h-11 rounded-md border border-white/30 px-4 text-sm font-semibold"
        >
          Menu
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Admin menu"
        onClose={() => {
          setOpenFor(null);
          menuButtonRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenFor(null); // backdrop click
        }}
        className="m-0 h-full max-h-none w-72 max-w-[85vw] bg-navy p-0 backdrop:bg-black/50"
      >
        <SidebarNav onNavigate={() => setOpenFor(null)} />
      </dialog>

      {/* The site's global skip link targets #main-content */}
      <main id="main-content" tabIndex={-1} className="min-w-0 px-4 py-6 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
