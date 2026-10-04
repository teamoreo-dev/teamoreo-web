import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "text";
  className?: string;
  ariaLabel?: string;
};

const styles = {
  primary:
    "bg-brand text-white hover:bg-brand-dark border border-brand shadow-[0_12px_30px_rgba(232,25,114,0.18)]",
  secondary:
    "border border-ink/20 bg-white text-ink hover:border-ink hover:bg-surface",
  light: "border border-white bg-white text-ink hover:bg-brand-soft",
  text: "text-ink underline decoration-brand decoration-2 underline-offset-8 hover:text-brand-dark",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.35rem] px-6 py-3 text-[0.92rem] font-bold transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
