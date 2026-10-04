import { AboutPreview } from "@/components/home/AboutPreview";
import { AISolutions } from "@/components/home/AISolutions";
import { BusinessProcess } from "@/components/home/BusinessProcess";
import { CareersPreview } from "@/components/home/CareersPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { UseCasesPreview } from "@/components/home/UseCasesPreview";
import { WhyTeamOreo } from "@/components/home/WhyTeamOreo";
import { WorkPreview } from "@/components/home/WorkPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <AISolutions />
      <BusinessProcess />
      <UseCasesPreview />
      <WorkPreview />
      <WhyTeamOreo />
      <Industries />
      <TeamPreview />
      <CareersPreview />
      <InsightsPreview />
      <FinalCTA />
    </>
  );
}
