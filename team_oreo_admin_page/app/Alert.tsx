"use client";

export type AlertType = "info" | "success" | "error" | "warning";
interface AlertProps {
  type?: AlertType;
  message?: string;
  onDismiss?: () => void;
}

export default function Alert({ type = "info", message, onDismiss }: AlertProps) {
  if (!message) return null;
  return (
    <div className={`alert alert-${type}`} role={type === "error" ? "alert" : "status"}>
      <span>{message}</span>
      {onDismiss && <button type="button" aria-label="Dismiss notification" onClick={onDismiss}>×</button>}
    </div>
  );
}
