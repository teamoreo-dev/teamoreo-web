import type { Metadata } from "next";
import { BlogEditView } from "@/components/admin/views/BlogEditView";

export const metadata: Metadata = { title: "Edit article" };

export default async function AdminEditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return <BlogEditView id={id} />;
}
