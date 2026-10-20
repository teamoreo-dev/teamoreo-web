import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type UseCasePanelProps = {
  /** Illustration in /public. Optional until the approved asset is added. */
  image?: string;
  /** Custom artwork (e.g. an inline SVG) shown instead of the image or placeholder. */
  children?: ReactNode;
  /** When set, the panel links here and shows a "View Work" overlay on hover. */
  href?: string;
  className?: string;
};

const background =
  "radial-gradient(70% 60% at 50% 78%, rgba(232,25,114,0.42), transparent 72%), radial-gradient(50% 50% at 90% 0%, rgba(120,60,200,0.18), transparent 70%), #12101f";

/** Dark, pink-glow illustration panel shared by the Use Cases and About pages. */
export function UseCasePanel({ image, children, href, className = "" }: UseCasePanelProps) {
  const art =
    children ??
    (image ? (
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 568px, 100vw" className="object-contain" />
    ) : (
      // Neutral stand-in until the approved illustration is added to /public.
      <div className="absolute inset-[14%] rounded-xl border border-white/25 bg-white/5 p-5" aria-hidden="true">
        <div className="flex gap-2">
          <span className="size-2 rounded-full bg-brand" />
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/30" />
        </div>
        <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-4">
          <div className="h-24 rounded-lg bg-brand/80" />
          <div className="space-y-3 pt-1">
            <div className="h-3 w-3/4 rounded bg-white/35" />
            <div className="h-2 rounded bg-white/20" />
            <div className="h-2 w-4/5 rounded bg-white/20" />
          </div>
        </div>
      </div>
    ));

  const content = (
    <>
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />
      {art}
      {href ? (
        // Dims the artwork and reveals the label on hover, as in the prototype.
        <span
          aria-hidden="true"
          className="use-case-panel__overlay absolute inset-0 grid place-items-center bg-[#0a0912]/60 text-xl font-bold text-white"
        >
          View Work
        </span>
      ) : null}
    </>
  );

  const classes = `use-case-panel relative block aspect-[4/3] w-full overflow-hidden rounded-[28px] ${className}`;

  // The "View Work" button beside the panel is the accessible link, so the
  // panel link is hidden from keyboard and screen-reader users to avoid a duplicate.
  return href ? (
    <Link href={href} tabIndex={-1} aria-hidden="true" className={classes} style={{ background }}>
      {content}
    </Link>
  ) : (
    <div className={classes} style={{ background }}>
      {content}
    </div>
  );
}