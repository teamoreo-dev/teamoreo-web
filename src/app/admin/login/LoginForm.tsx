"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/admin/api";
import { btnPrimary, inputClass, labelClass } from "@/components/admin/ui";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Already signed in? Skip the form.
  useEffect(() => {
    api("/api/admin/auth/me")
      .then(() => router.replace("/admin"))
      .catch(() => {});
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      await api("/api/admin/auth/login", { method: "POST", body: { email, password } });
      router.replace("/admin");
    } catch (err) {
      const status = err instanceof ApiError ? err.status : 0;
      setError(
        status === 429
          ? "Too many attempts. Please try again later."
          : status === 401 || status === 400
            ? "Invalid email or password" 
            : status === 403
              ? "Request blocked. Check that the site and API origins match (CLIENT_ORIGIN)."
              : "Something went wrong. Please try again.",
      );
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-sm rounded-xl border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <p className="eyebrow">Team Oreo</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Admin sign in</h1>

      {error ? (
        <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
          {error}
        </p>
      ) : null}

      <div className="mt-6">
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" type="email" autoComplete="username" required value={email}
               onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      </div>
      <div className="mt-4">
        <label htmlFor="password" className={labelClass}>Password</label>
        <input id="password" type="password" autoComplete="current-password" required value={password}
               onChange={(e) => setPassword(e.target.value)} className={inputClass} />
      </div>

      <button type="submit" disabled={pending} className={`${btnPrimary} mt-6 w-full`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
