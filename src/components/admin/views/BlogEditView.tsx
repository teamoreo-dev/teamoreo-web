"use client";

import { PageHeader } from "@/components/admin/AdminShell";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { ErrorState, Skeleton } from "@/components/admin/States";
import type { Blog } from "@/lib/admin/types";
import { useApi } from "@/lib/admin/useApi";
import { useSessionRedirect } from "@/lib/admin/useSessionRedirect";

export function BlogEditView({ id }: { id: string }) {
  const { data, error, loading, refetch } = useApi<Blog>(`/api/admin/blogs/${id}`);
  useSessionRedirect(error);

  return (
    <>
      <PageHeader title="Edit article" />
      {error && !data ? (
        <ErrorState
          message={error.status === 404 ? "Article not found." : "We couldn't load this article."}
          onRetry={error.status === 404 ? undefined : refetch}
          backHref="/admin/blogs"
        />
      ) : loading && !data ? (
        <div role="status" className="space-y-4">
          <span className="sr-only">Loading article…</span>
          <Skeleton className="h-12" />
          <Skeleton className="h-24" />
          <Skeleton className="h-72" />
        </div>
      ) : data ? (
        // key resets the form's state if a different article is ever loaded
        <BlogForm key={data._id} mode="edit" initial={data} />
      ) : null}
    </>
  );
}
