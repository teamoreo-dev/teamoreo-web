import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Get in Touch", description: "Talk to Team Oreo about your next technology, data or business challenge.", alternates: { canonical: "/contact" } };

export function LegacyContactPage() {
  return <>
    <section className="text-white" style={{ background: "linear-gradient(110deg, #090e18, #17142f 62%, #321025)" }}><Container className="py-14 sm:py-20"><h1 className="text-[clamp(2.3rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em]">Get in touch</h1><p className="mt-6 text-lg text-white/75">We want to hear from you!</p></Container></section>
    <section className="py-12 sm:py-16"><Container><div className="max-w-3xl text-muted"><p>Do you have an exciting project which you’re itching to get started on? Maybe you’re looking for digital support on your new project? Or perhaps you just need ongoing technical support for your organization?</p><p className="mt-5">Whatever you’re looking for, our team is ready to help.</p></div><div className="mt-8 overflow-hidden rounded-2xl"><Image src="/images/home/team-oreo-hero.png" alt="Team Oreo creative workspace" width={1536} height={1024} className="h-64 w-full object-cover sm:h-96" priority /></div><div className="mt-8"><ContactForm /></div></Container></section>
    <section className="bg-navy py-12 text-white"><Container className="grid gap-8 sm:grid-cols-3"><div><h2 className="font-bold">Contact</h2><a className="mt-4 block text-sm text-white/70 hover:text-white" href="mailto:contact@teamoreo.co.uk">contact@teamoreo.co.uk</a><a className="mt-2 block text-sm text-white/70 hover:text-white" href="tel:+447749805340">+44 7749 805 340</a></div><div><h2 className="font-bold">Visit us</h2><p className="mt-4 text-sm leading-6 text-white/70">128 City Road, London, England, EC1V 2NX</p></div><div><h2 className="font-bold">Start a conversation</h2><p className="mt-4 text-sm leading-6 text-white/70">Tell us what you are working through and we’ll help find a clear way forward.</p></div></Container></section>
  </>;
}

export default function ContactPage() {
  return (
    <>
    <section className="text-white" style={{ background: "linear-gradient(110deg, #090e18, #17142f 62%, #321025)" }}><Container className="py-14 sm:py-20"><h1 className="text-[clamp(2.3rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em]">Get in touch</h1><p className="mt-6 text-lg text-white/75">We want to hear from you!</p></Container></section>
    <section className="py-10 sm:py-14">
      <Container className="grid items-start gap-10 lg:grid-cols-[1fr_0.94fr] lg:gap-12">
        <div className="min-w-0">
          <div className="max-w-xl text-lg leading-8 text-[#24507b]">
            <p>Do you have an exciting project which you’re itching to get started on? Maybe you’re looking for digital support on your new project? Or perhaps you just need ongoing technical support for your organization?</p>
            <p className="mt-6">Whatever you’re looking for, our team is ready to help.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl">
            <Image src="/images/contact-london.jpg" alt="London skyline with the Gherkin and The Shard" width={1400} height={933} className="h-[27rem] w-full object-cover lg:h-[31rem]" priority />
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
    </>
  );
}
