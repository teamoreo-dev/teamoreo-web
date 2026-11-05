import Image from "next/image";
import type { UseCaseRecord } from "@/data/useCases";

export function UseCaseVisual({ useCase, secondary = false }: { useCase: UseCaseRecord; secondary?: boolean }) {
  const image = secondary ? useCase.secondaryImage : useCase.heroImage;
  const artwork = useCase.artwork ?? { title: useCase.title, label: useCase.category };
  const title = secondary ? artwork.label : artwork.title;
  const label = secondary ? artwork.title : artwork.label;

  return (
    <div
      className={`relative isolate w-full overflow-hidden rounded-xl ${secondary ? "aspect-[20/7] min-h-48" : "aspect-[23/10] min-h-56"}`}
      style={{ background: secondary ? "linear-gradient(130deg, #160e20 0%, #68103c 54%, #e7276e 100%)" : "linear-gradient(130deg, #1a1c32 0%, #4c2b91 55%, #7b31ec 100%)" }}
    >
      {image ? (
        <Image src={image.src} alt={image.alt} fill preload={!secondary} sizes="(min-width: 1240px) 1160px, 100vw" className="object-contain" />
      ) : (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute -right-[4%] -top-[30%] size-[42%] rounded-full bg-white/[0.07] [aspect-ratio:1] [height:auto]" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-[40%] -left-[5%] w-[33%] rounded-full bg-white/[0.06] [aspect-ratio:1]" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-[18%] right-[14%] w-[25%] rounded-full bg-white/[0.06] [aspect-ratio:1]" />
          <div className="absolute inset-0 flex min-w-0 flex-col justify-center p-6 text-white sm:p-12 lg:p-16">
            <p className={`${secondary ? "text-[clamp(1.4rem,2.8vw,2.5rem)]" : "text-[clamp(1.65rem,4.5vw,4rem)]"} max-w-[90%] font-semibold leading-tight tracking-[-0.035em]`}>{title}</p>
            <p className="mt-3 max-w-[90%] text-xs font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-base lg:text-xl">{label}</p>
          </div>
        </>
      )}
    </div>
  );
}
