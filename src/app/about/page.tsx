import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AboutIllustration } from "@/components/about/AboutIllustration";
import { FeatureCard } from "@/components/about/FeatureCard";
import { UseCasePanel } from "@/components/use-cases/UseCasePanel";
import { aboutHero, aboutIntro, aboutMission, aboutStats, aboutVision, aboutWhy } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutHero.title,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
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
            {aboutHero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-[46rem] text-[clamp(2.6rem,5.2vw,4.1rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {aboutHero.title}
          </h1>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <UseCasePanel className="shadow-[0_30px_60px_rgba(24,21,28,0.18)]">
            <AboutIllustration />
          </UseCasePanel>
          <div>
            <div className="space-y-4 text-[1.0625rem] leading-8 text-muted">
              {aboutIntro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border-l-4 border-brand bg-[#ffecf3] px-7 py-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">{aboutIntro.achievementLabel}</p>
              <p className="mt-2 text-xl font-semibold leading-8 tracking-[-0.02em]">{aboutIntro.achievement}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-[#f8f9fb] py-20">
        <Container>
          <h2 className="sr-only">Team Oreo in numbers</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {aboutStats.map((stat) => (
              <li key={stat.label} className="rounded-[20px] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                <p className="text-[2.5rem] font-bold leading-none tracking-[-0.03em] text-brand">{stat.value}</p>
                <p className="mt-4 text-base font-semibold">{stat.label}</p>
                <p className="mt-2 text-[0.95rem] leading-6 text-muted">{stat.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <div>
            <h2 className="text-[clamp(2.4rem,4.2vw,3.5rem)] font-bold leading-none tracking-[-0.03em]">Mission</h2>
            <p className="mt-5 inline-block rounded-full bg-[#ffecf3] px-5 py-2.5 text-sm font-semibold text-brand-dark">
              {aboutMission.badge}
            </p>
          </div>
          <div className="max-w-3xl space-y-5 text-[1.0625rem] leading-[2] text-muted">
            {[aboutMission.statement, ...aboutMission.paragraphs].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="bg-[#f8f9fb] py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.03em]">Our Vision</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted">{aboutVision.title}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {aboutVision.values.map((v) => (
              <FeatureCard key={v.title} variant="elevated" {...v} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Team Oreo */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <h2 className="balance text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Why Team Oreo?</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {aboutWhy.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}