import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { UseCaseRow } from "@/components/use-cases/UseCaseRow";
import { UseCasesCTA } from "@/components/use-cases/UseCasesCTA";
import { useCases } from "@/data/useCases";

const heroCopy =
  "At Team Oreo, we are dedicated to making a positive impact in the community through innovative solutions and collaborative efforts. Our work spans various sectors including education, healthcare, and environmental sustainability.";

export const metadata: Metadata = {
  title: "Use Cases",
  description: heroCopy,
  alternates: { canonical: "/use-cases" },
};

export default function UseCasesPage() {
  return (
    <>
      <section
        className="text-white"
        style={{
          background:
            "radial-gradient(55% 75% at 100% 0%, rgba(232,25,114,0.30), transparent 65%), radial-gradient(45% 55% at 40% 100%, rgba(90,60,200,0.16), transparent 70%), #0b0c14",
        }}
      >
        <Container className="py-20 sm:py-24 lg:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-pink-400">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            Use Cases
          </p>
          <h1 className="balance mt-6 max-w-3xl text-[clamp(2.6rem,5.2vw,4.1rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            Transform your imagination into reality
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{heroCopy}</p>
        </Container>
      </section>

      {useCases.map((useCase, index) => (
        <UseCaseRow key={useCase.slug} useCase={useCase} reverse={index % 2 === 1} tinted={index % 2 === 1} />
      ))}

      <UseCasesCTA />
    </>
  );
}