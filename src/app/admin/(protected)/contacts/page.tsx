import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactsListView } from "@/components/admin/views/ContactsListView";

export const metadata: Metadata = { title: "Contact Submissions" };

export default function AdminContactsPage() {
  return (
    <Suspense fallback={<p role="status" className="text-muted">Loading…</p>}>
      <ContactsListView />
    </Suspense>
  );
}
