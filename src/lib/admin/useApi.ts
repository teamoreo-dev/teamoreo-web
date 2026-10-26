"use client";

import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "./api";

type Result<T> = { key: string; data?: T; error?: ApiError };

/**
 * Minimal data hook (no extra dependency). Keeps the previous data on screen while the
 * next page/filter loads, so tables don't flash empty.
 */
export function useApi<T>(path: string | null) {
  const [tick, setTick] = useState(0);
  const [result, setResult] = useState<Result<T> | null>(null);
  const key = path ? `${path}#${tick}` : null;

  useEffect(() => {
    if (!key || !path) return;
    const controller = new AbortController();
    api<T>(path, { signal: controller.signal })
      .then((data) => setResult({ key, data }))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setResult({
          key,
          error: e instanceof ApiError ? e : new ApiError(0, "UNKNOWN", "Something went wrong"),
        });
      });
    return () => controller.abort();
  }, [key, path]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);
  const loading = key !== null && result?.key !== key;
  const error = result?.key === key ? (result.error ?? null) : null;

  return { data: result?.data ?? null, error, loading, refetch };
}
