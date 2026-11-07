import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { UseCaseRecord } from "@/data/useCases";

export function UseCaseHero({ useCase }: { useCase: UseCaseRecord }) {
  return (
    <>
      <header className="bg-[#0b0e17] py-14 text-center text-white sm:py-18" style={{ backgroundImage: "radial-gradient(ellipse at 100% 0%, rgba(133,20,78,0.24), transparent 60%)" }}>
        <Container>
          <p className="text-[clamp(2rem,3.7vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.04em]">Work Details</p>
          <nav aria-label="Breadcrumb" className="mt-6 text-sm">
            <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <li><Link href="/" className="inline-flex min-h-11 items-center hover:underline sm:min-h-0">Home</Link></li>
              <li aria-hidden="true" className="text-white/50">/</li>
              <li><Link href="/use-cases" className="inline-flex min-h-11 items-center hover:underline sm:min-h-0">Case Study</Link></li>
              <li aria-hidden="true" className="text-white/50">/</li>
              <li><span aria-current="page" className="font-semibold text-pink-300">Work Details</span></li>
            </ol>
          </nav>
        </Container>
      </header>
      <Container className="grid gap-5 pb-8 pt-10 sm:pt-12 lg:grid-cols-[160px_1fr] lg:gap-7">
        <p className="pt-1 text-xs leading-5 text-ink">
          <span className="block text-[11px] uppercase tracking-[0.15em] text-[#5f6c83]">Project</span>
          {useCase.project}
        </p>
        <h1 className="balance max-w-3xl text-[clamp(1.75rem,3.2vw,2.875rem)] font-semibold leading-[1.12] tracking-[-0.04em]">{useCase.title}</h1>
      </Container>
    </>
  );
}
