"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps the public site chrome (Navbar, <main>, Footer). Admin routes render their own
 * shell, so on /admin/* this renders only the children. Navbar and Footer are passed in
 * as props so they stay server-rendered.
 */
export function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return <>{children}</>;

  return (
    <>
      {navbar}
      <main id="main-content">{children}</main>
      {footer}
    </>
  );
}
