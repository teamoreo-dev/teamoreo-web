import type { Metadata } from "next";
import { ContactDetailView } from "@/components/admin/views/ContactDetailView";

export const metadata: Metadata = { title: "Enquiry" };

export default async function AdminContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ContactDetailView id={id} />;
}
