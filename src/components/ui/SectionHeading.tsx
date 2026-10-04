type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${inverted ? "text-pink-300" : ""}`}>{eyebrow}</p>
      <h2
        className={`balance mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.12] tracking-[-0.035em] ${inverted ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-xl text-base leading-7 ${
            align === "center" ? "mx-auto" : ""
          } ${inverted ? "text-white/65" : "text-muted"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
