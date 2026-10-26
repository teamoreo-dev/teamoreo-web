"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "./api";

/** If a data request comes back 401 (session expired while on the page), go to the login page. */
export function useSessionRedirect(error: ApiError | null) {
  const router = useRouter();
  useEffect(() => {
    if (error?.status === 401) router.replace("/admin/login");
  }, [error, router]);
}
