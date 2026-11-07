import { Container } from "@/components/ui/Container";

export function ComingSoon({ title }: { title: string }) {
  return <section className="min-h-[55vh] bg-white"><Container className="flex min-h-[55vh] items-center justify-center py-24 text-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Team Oreo</p><h1 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-brand sm:text-7xl">COMING SOON</h1><p className="mt-5 text-lg text-muted">{title}</p></div></Container></section>;
}
