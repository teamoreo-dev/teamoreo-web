// Configure NEXT_PUBLIC_API_URL in .env.local. A blank value uses same-origin requests.
export const API_URL: string = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export interface ApiErrorPayload {
  success?: boolean;
  message?: string;
  error?: { message?: string };
  data?: unknown;
  [key: string]: unknown;
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...((options.headers ?? {}) as Record<string, string>),
    },
  });
  const result = (await response.json().catch(() => ({}))) as ApiErrorPayload;
  if (!response.ok || result.success === false) {
    throw new Error(result.error?.message || result.message || `Request failed (${response.status})`);
  }
  return (result.data ?? result) as T;
}
