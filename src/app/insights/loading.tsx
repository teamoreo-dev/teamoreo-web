import { Container } from "@/components/ui/Container";

export default function Loading() {
  return <Container className="grid min-h-[50vh] place-items-center py-16"><p role="status" className="text-muted">Loading insights…</p></Container>;
}
