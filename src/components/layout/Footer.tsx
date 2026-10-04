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
            {footerGroups.map((group) => (
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
            ))}
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
