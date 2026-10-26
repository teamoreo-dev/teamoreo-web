import type { Metadata } from "next";
import { BlogNewView } from "@/components/admin/views/BlogNewView";

export const metadata: Metadata = { title: "New article" };

export default function AdminNewBlogPage() {
  return <BlogNewView />;
}
