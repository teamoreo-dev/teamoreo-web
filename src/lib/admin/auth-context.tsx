"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "./api";
import type { AdminUser } from "./types";

type AuthValue = { admin: AdminUser; logout: () => Promise<void> };
const AuthContext = createContext<AuthValue | null>(null);

export function useAdmin() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAdmin must be used inside <AuthGuard>");
  return value;
}

/**
 * UX guard only: the server enforces security on every request.
 * Calls GET /api/admin/auth/me on mount; any failure sends the user to the login page.
 * Nothing protected renders until the check succeeds, so there is no flash of admin content.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    api<{ admin: AdminUser }>("/api/admin/auth/me")
      .then((d) => setAdmin(d.admin))
      .catch(() => router.replace("/admin/login")); // fail closed
  }, [router]);

  async function logout() {
    try {
      await api("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  }

  if (!admin) {
    return (
      <div role="status" aria-live="polite" className="grid min-h-screen place-items-center text-muted">
        Checking your session…
      </div>
    );
  }

  return <AuthContext.Provider value={{ admin, logout }}>{children}</AuthContext.Provider>;
}
