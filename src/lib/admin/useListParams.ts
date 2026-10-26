"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Keeps page / search / status in the URL so refresh, Back and shared links all work. */
export function useListParams() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10) || 1);
  const search = sp.get("search") ?? "";
  const status = sp.get("status") ?? "";

  const update = useCallback(
    (patch: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v === undefined || v === "") next.delete(k);
        else next.set(k, String(v));
      }
      if (!("page" in patch)) next.delete("page"); // any filter change goes back to page 1
      const q = next.toString();
      router.replace(q ? `${pathname}?${q}` : pathname);
    },
    [sp, router, pathname],
  );

  return { page, search, status, update };
}
