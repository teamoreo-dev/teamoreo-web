const paths: Record<string, React.ReactNode> = {
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3Z" />,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  trend: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
};

type FeatureCardProps = {
  icon: string;
  title: string;
  copy: string;
  /** "outlined" = bordered card; "elevated" = soft-shadow card (Our Vision). */
  variant?: "outlined" | "elevated";
};

const styles = {
  outlined: {
    card: "rounded-xl border border-line bg-white p-6",
    icon: "size-12 rounded-lg border border-brand/15 bg-brand-soft",
    title: "mt-5 text-xl font-semibold leading-snug tracking-[-0.025em]",
    copy: "mt-3 text-sm leading-6 text-muted",
  },
  elevated: {
    card: "rounded-[20px] bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.07)]",
    icon: "size-12 rounded-xl bg-[#ffe8f0]",
    title: "mt-7 text-xl font-semibold leading-snug tracking-[-0.02em]",
    copy: "mt-3 text-base leading-7 text-muted",
  },
};

export function FeatureCard({ icon, title, copy, variant = "outlined" }: FeatureCardProps) {
  const v = styles[variant];
  return (
    <article className={v.card}>
      <div className={`grid place-items-center text-brand ${v.icon}`}>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {paths[icon]}
        </svg>
      </div>
      <h3 className={v.title}>{title}</h3>
      <p className={v.copy}>{copy}</p>
    </article>
  );
}