import type { ApiFailure } from "./types";

export class ApiError extends Error {
  status: number;
  code: string;
  fields?: Record<string, string>;

  constructor(status: number, code: string, message: string, fields?: Record<string, string>) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

type Options = { method?: string; body?: unknown; signal?: AbortSignal };

/**
 * Every admin request goes through here. Requests are same-origin (the Next.js
 * rewrite proxies /api/* to the backend), so the HttpOnly cookie is sent
 * automatically. No token ever touches JavaScript, and no CSRF header is needed
 * (the backend only checks the Origin header, which the browser sets).
 */
export async function api<T = unknown>(
  path: string,
  { method = "GET", body, signal }: Options = {},
): Promise<T> {
  const res = await fetch(path, {
    method,
    signal,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    /* empty or non-JSON body */
  }

  const parsed = json as { success?: boolean; data?: T } | null;
  if (!res.ok || !parsed || parsed.success === false) {
    const err = (json as ApiFailure | null)?.error;
    throw new ApiError(
      res.status,
      err?.code ?? "UNKNOWN",
      err?.message ?? "Something went wrong",
      err?.fields,
    );
  }
  return parsed.data as T; // DELETE responses have no data → undefined
}

export function qs(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/** Upload with progress. fetch() can't report upload progress, so this uses XHR. Field name: "image". */
export function uploadImage(file: File, onProgress: (pct: number) => void) {
  return new Promise<{ url: string; publicId: string; bytes: number }>((resolve, reject) => {
    const fd = new FormData();
    fd.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/uploads");
    xhr.withCredentials = true;
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let j: { success?: boolean; data?: { url: string; publicId: string; bytes: number }; error?: { code?: string } } | null = null;
      try {
        j = JSON.parse(xhr.responseText);
      } catch {
        /* ignore */
      }
      if (xhr.status >= 200 && xhr.status < 300 && j?.success && j.data) resolve(j.data);
      else
        reject(
          new ApiError(
            xhr.status,
            j?.error?.code ?? "UPLOAD_FAILED",
            xhr.status === 413
              ? "Image is larger than 5 MB"
              : "Upload failed. Use a JPG, PNG or WebP under 5 MB",
          ),
        );
    };
    xhr.onerror = () => reject(new ApiError(0, "NETWORK", "Network error. Check your connection"));
    xhr.send(fd);
  });
}
