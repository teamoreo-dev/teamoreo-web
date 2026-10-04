import Image from "next/image";
import Link from "next/link";

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Team Oreo home"
      className="inline-flex items-center"
    >
      <Image
        src="/images/brand/logos.png"
        alt="Team Oreo"
        width={156}
        height={40}
        priority
        className={`h-9 w-auto ${inverted ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
