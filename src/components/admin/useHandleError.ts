"use client";

import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/admin/api";
import { useToast } from "./Toast";

//Use in catch blocks of mutations: toasts the message, or redirects to login on 401. 
export function useHandleError() {
  const toast = useToast();
  const router = useRouter();
  return (err: unknown, fallback = "Something went wrong. Please try again.") => {
    if (err instanceof ApiError && err.status === 401) {
      toast.error("Your session expired. Please sign in again.");
      router.replace("/admin/login");
      return;
    }
    toast.error(err instanceof ApiError && err.message ? err.message : fallback);
  };
}
