"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastItem = { id: number; kind: "success" | "error"; message: string };
type ToastApi = { success: (m: string) => void; error: (m: string) => void };

const ToastContext = createContext<ToastApi | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((kind: ToastItem["kind"], message: string) => {
    const id = Date.now() + Math.random();
    setItems((cur) => [...cur, { id, kind, message }]);
    setTimeout(() => setItems((cur) => cur.filter((t) => t.id !== id)), 5000);
  }, []);

  const api = useMemo<ToastApi>(
    () => ({ success: (m) => push("success", m), error: (m) => push("error", m) }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[200] flex flex-col items-center gap-2 px-4">
        {items.map((t) => (
          <div
            key={t.id}
            role={t.kind === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${
              t.kind === "error" ? "bg-red-700" : "bg-ink"
            }`}
          >
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setItems((cur) => cur.filter((x) => x.id !== t.id))}
              className="-my-1 rounded px-2 py-1 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
