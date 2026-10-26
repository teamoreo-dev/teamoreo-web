import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogsListView } from "@/components/admin/views/BlogsListView";

export const metadata: Metadata = { title: "Blog Management" };

export default function AdminBlogsPage() {
  
  return (
    <Suspense fallback={<p role="status" className="text-muted">Loading…</p>}>
      <BlogsListView />
    </Suspense>
  );
}
