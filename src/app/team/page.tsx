import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Our Team", description: "Meet the Team Oreo team.", alternates: { canonical: "/team" } };
const members = [["Mohammed Hadi", "Managing Director"], ["Dhara Parekh", "Managing Director (Operations)"], ["Ahammed Anshad", "Managing Director (Project Lead)"]] as const;

export default function TeamPage() {
  return <><section className="bg-navy text-white"><Container className="py-20 sm:py-24"><p className="eyebrow text-brand">Our team</p><h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Our Team Members</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Our amazing team is all about driving innovation and excellence! Each member brings their own unique talents to the table, from our talented developers to our creative designers. We love fostering collaboration, sparking creativity, and encouraging growth so that we can stay ahead in the tech world together!</p></Container></section><section className="py-16 sm:py-24"><Container><div className="grid gap-6 md:grid-cols-3">{members.map(([name, role]) => <article key={name} className="rounded-xl border border-line bg-white p-7 text-center shadow-[0_12px_35px_rgba(24,21,28,0.06)]"><div className="mx-auto grid size-24 place-items-center rounded-full bg-brand-soft text-3xl font-bold text-brand">{name.slice(0, 1)}</div><h2 className="mt-6 text-xl font-bold">{name}</h2><p className="mt-2 text-sm text-brand-dark">{role}</p></article>)}</div><p className="mt-8 text-sm text-muted">Team photographs were unavailable from the official source during migration.</p></Container></section></>;
}
