import { AboutPreview } from "@/components/home/AboutPreview";
import { AISolutions } from "@/components/home/AISolutions";
import { BusinessProcess } from "@/components/home/BusinessProcess";
import { CareersPreview } from "@/components/home/CareersPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { UseCasesPreview } from "@/components/home/UseCasesPreview";
import { WhyTeamOreo } from "@/components/home/WhyTeamOreo";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <AISolutions />
      <BusinessProcess />
      <UseCasesPreview />
      <WhyTeamOreo />
      <Industries />
      <TeamPreview />
      <CareersPreview />
      <FinalCTA />
    </>
  );
}
