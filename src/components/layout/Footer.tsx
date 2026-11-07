import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Container } from "@/components/ui/Container";
import { footerGroups, legalLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/15 pb-11 lg:grid-cols-[1.2fr_2.5fr]">
          <div className="max-w-sm">
            <BrandMark inverted />
            <p className="mt-6 text-sm leading-6 text-white/60">
              Technology, data and business consultancy for organisations ready to make practical progress.
            </p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-brand decoration-2 underline-offset-8">
              Start a conversation
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-7 gap-y-10 sm:grid-cols-4">
            {footerGroups.map((group) => {
              if (group.title === "Services") {
                return (
                  <div key="Contact">
                    <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Contact</h2>
                    <ul className="mt-5 space-y-3 text-sm text-white/72">
                      <li>
                        <a href="mailto:contact@teamoreo.co.uk" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                          <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-brand" aria-hidden="true"><path d="M2.5 5.5A1.5 1.5 0 0 1 4 4h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-9Z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m3.2 5.2 6.8 5 6.8-5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                          contact@teamoreo.co.uk
                        </a>
                      </li>
                      <li>
                        <a href="tel:+447749805340" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                          <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-brand" aria-hidden="true"><path d="M5.1 2.8 7.5 2l1.8 4.3-1.8 1.3a12.2 12.2 0 0 0 4.9 4.9l1.3-1.8L18 12.5l-.8 2.4c-.3.9-1.2 1.5-2.2 1.4A13.8 13.8 0 0 1 3.7 5c-.1-1 .5-1.9 1.4-2.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                          +44 7749 805340
                        </a>
                      </li>
                      <li className="inline-flex items-start gap-2">
                        <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true"><path d="M16 8.3c0 3.8-6 8.7-6 8.7s-6-4.9-6-8.7a6 6 0 1 1 12 0Z" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="8.3" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                        <span>128 City Road, London, EC1V 2NX.</span>
                      </li>
                    </ul>
                  </div>
                );
              }

              return (
                <div key={group.title}>
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">{group.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-white/72 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Team Oreo. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
