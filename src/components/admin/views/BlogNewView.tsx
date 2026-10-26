"use client";

import { PageHeader } from "@/components/admin/AdminShell";
import { BlogForm } from "@/components/admin/blog/BlogForm";

export function BlogNewView() {
  return (
    <>
      <PageHeader title="New article" description="Save it as a draft or publish it straight away." />
      <BlogForm mode="create" />
    </>
  );
}
