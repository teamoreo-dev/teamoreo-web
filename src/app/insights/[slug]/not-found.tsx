import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() { return <Container className="py-24 text-center"><h1 className="text-3xl font-bold">Insight not found</h1><p className="mt-3 text-muted">This article may have been removed or is not published.</p><Link href="/insights" className="mt-7 inline-flex rounded bg-brand px-5 py-3 font-bold text-white">Back to insights</Link></Container>; }
