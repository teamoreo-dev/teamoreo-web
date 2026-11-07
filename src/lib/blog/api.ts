import type { PublicBlog, PublicBlogPage } from "./types";

const apiUrl = process.env.API_URL?.trim();

async function request<T>(path: string): Promise<T> {
  if (!apiUrl) throw new Error("Blog API is not configured. Set API_URL in the frontend environment.");
  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api${path}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`Blog request failed (${response.status})`);
  const body = (await response.json()) as { success?: boolean; data?: T };
  if (!body.success || body.data === undefined) throw new Error("Blog request returned an invalid response");
  return body.data;
}

export function getPublicBlogs(params: { page?: number; limit?: number; category?: string; search?: string } = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  return request<PublicBlogPage>(`/blogs${query.size ? `?${query.toString()}` : ""}`);
}

export function getPublicBlog(slug: string) {
  return request<PublicBlog>(`/blogs/${encodeURIComponent(slug)}`);
}
