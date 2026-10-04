import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TechnologyIllustration } from "./TechnologyIllustration";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-line bg-white">
      <Container className="grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-18 lg:gap-16 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">Technology and business solutions</p>
          <h1 className="balance mt-5 text-[clamp(2.35rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-ink">
            Transforming IT Solutions for Tomorrow&apos;s Challenges
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            At Team Oreo, we are dedicated to delivering cutting-edge IT services and solutions that drive your business forward.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/services">Explore Our Services</Button>
            <Button href="/contact" variant="secondary">Talk to Our Team</Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[500px] md:justify-self-end">
          <TechnologyIllustration />
        </div>
      </Container>
    </section>
  );
}
