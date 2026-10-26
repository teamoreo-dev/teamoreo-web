"use client";

import { useEffect, useRef } from "react";
import { btnDanger, btnSecondary } from "./ui";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  busyLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Native <dialog>: showModal() gives focus trapping, Esc-to-close and a backdrop for free. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busyLabel = "Deleting…",
  busy = false,
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      className="m-auto w-full max-w-md rounded-xl p-6 shadow-xl backdrop:bg-black/50"
    >
      <h2 id="confirm-title" className="text-lg font-semibold text-ink">{title}</h2>
      <p id="confirm-desc" className="mt-2 text-sm text-muted">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        {/* Cancel is focused first so a stray Enter can never delete anything */}
        <button type="button" autoFocus onClick={onCancel} disabled={busy} className={btnSecondary}>
          Cancel
        </button>
        <button type="button" onClick={onConfirm} disabled={busy} className={btnDanger}>
          {busy ? busyLabel : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
