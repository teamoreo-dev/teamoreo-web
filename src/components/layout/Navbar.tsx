"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { BrandMark } from "./BrandMark";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");
  const useCasesActive = pathname === "/use-cases" || pathname.startsWith("/use-cases/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${open ? "fixed inset-x-0 top-0 lg:sticky lg:inset-x-auto" : "sticky top-0"} z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-line/80 bg-white/95 shadow-[0_8px_30px_rgba(20,20,24,0.05)] backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between lg:h-[72px]">
        <BrandMark />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div className="group relative" key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`inline-flex items-center gap-1 rounded px-3 py-3 text-sm font-semibold transition-colors hover:text-brand-dark ${servicesActive ? "text-brand-dark" : "text-ink/80"}`}
                >
                  {item.label}
                  <svg viewBox="0 0 12 8" className="h-2 w-3" aria-hidden="true">
                    <path d="m1 1.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full max-h-[calc(100dvh-5rem)] w-64 translate-y-2 overflow-y-auto border-t-2 border-brand bg-white p-2 opacity-0 shadow-[0_18px_50px_rgba(20,20,24,0.13)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={pathname === child.href ? "page" : undefined}
                      className="block rounded px-4 py-2.5 text-sm font-medium text-ink/75 hover:bg-brand-soft hover:text-brand-dark aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-dark"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === "/use-cases" && useCasesActive ? pathname === item.href ? "page" : "location" : undefined}
                className={`rounded px-3 py-3 text-sm font-semibold transition-colors hover:text-brand-dark ${item.href === "/use-cases" && useCasesActive ? "text-brand-dark" : "text-ink/80"}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/contact"
          className="hidden min-h-11 items-center rounded-[0.3rem] bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-dark lg:inline-flex"
        >
          Contact Us
        </Link>

        <button
          type="button"
          className="grid size-11 place-items-center rounded border border-ink/15 bg-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>

      <div
        id="mobile-navigation"
        className={`${open ? "visible opacity-100" : "invisible opacity-0"} absolute inset-x-0 top-full h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-white/90 backdrop-blur-md transition-opacity duration-150 lg:hidden`}
      >
        <Container className="py-5">
          <nav aria-label="Mobile navigation">
            {navigation.map((item) =>
              item.children ? (
                <details key={item.label} className="border-b border-line py-1">
                  <summary className={`flex cursor-pointer list-none items-center justify-between py-3 text-base font-semibold marker:hidden ${servicesActive ? "text-brand-dark" : ""}`}>
                    {item.label}
                    <span className="text-brand" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-3 pl-4">
                    <Link href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined} className="flex min-h-11 items-center py-2 text-sm font-bold text-brand-dark">
                      View all {item.label}
                    </Link>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setOpen(false)} aria-current={pathname === child.href ? "page" : undefined} className="flex min-h-11 items-center py-2 text-sm text-muted aria-[current=page]:text-brand-dark">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={item.href === "/use-cases" && useCasesActive ? pathname === item.href ? "page" : "location" : undefined} className={`block border-b border-line py-4 font-semibold ${item.href === "/use-cases" && useCasesActive ? "text-brand-dark" : ""}`}>
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center rounded bg-brand px-5 font-bold text-white">
              Contact Us
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
