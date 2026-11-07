import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Community Hub", description: "Your Community Connection Hub from Team Oreo.", alternates: { canonical: "/community-hub" } };

export default function CommunityHubPage() {
  return <><section className="bg-navy text-white"><Container className="py-20 sm:py-24"><p className="eyebrow text-brand">Community Hub</p><h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Your Community Connection Hub</h1><p className="mt-5 max-w-3xl text-lg text-white/70">Uniting Neighbors, Empowering Voices, and Celebrating Diversity in Newham</p></Container></section><section className="py-16 sm:py-24"><Container><div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="eyebrow">Community</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Community News Event and Activities</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">The Community Hub brings people together, shares local information and celebrates the voices and diversity of Newham.</p></div><div className="rounded-xl bg-brand-soft p-8"><p className="eyebrow">Partners</p><h2 className="mt-4 text-2xl font-bold">Community Partners</h2><p className="mt-4 leading-7 text-muted">Partner information and logos were unavailable from the official source during migration.</p></div></div></Container></section></>;
}
