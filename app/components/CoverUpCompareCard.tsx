import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { CoverUpPair } from "@/app/data/gallery";

interface CoverUpCompareCardProps {
  pair: CoverUpPair;
  onOpen: () => void;
}

export default function CoverUpCompareCard({ pair, onOpen }: CoverUpCompareCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full flex-col overflow-hidden rounded-3xl border border-beige bg-cream text-left shadow-[0_10px_20px_-10px_rgba(87,68,51,0.14),0_25px_50px_-25px_rgba(87,68,51,0.2)] transition-all duration-[450ms] ease-out hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_16px_28px_-10px_rgba(87,68,51,0.18),0_35px_65px_-22px_rgba(87,68,51,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <p className="px-5 pt-5 text-xs font-medium uppercase tracking-[0.25em] text-anthracite/60 sm:px-6 sm:pt-6">
        {pair.title}
      </p>

      <span className="relative mt-4 block">
        <span className="grid grid-cols-1 sm:grid-cols-2 sm:items-center">
          <span className="relative border-b border-gold/25 bg-beige/40 p-4 sm:min-h-[400px] sm:border-b-0 sm:border-r sm:p-5 lg:min-h-[460px]">
            <span className="absolute left-3 top-3 z-10 rounded-md bg-charcoal/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cream">
              Avant
            </span>
            <Image
              src={pair.before.src}
              alt={pair.before.alt}
              width={pair.before.width}
              height={pair.before.height}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
              className="mx-auto block h-auto max-h-[420px] w-auto max-w-full object-contain transition-[transform,filter] duration-[450ms] ease-out [filter:contrast(1.03)] group-hover:scale-[1.012] group-hover:[filter:contrast(1.05)_brightness(1.02)] sm:max-h-[500px] lg:max-h-[600px]"
            />
          </span>

          <span className="relative bg-beige/40 p-4 sm:min-h-[400px] sm:p-5 lg:min-h-[460px]">
            <span className="absolute right-3 top-3 z-10 rounded-md bg-charcoal/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cream">
              Après
            </span>
            <Image
              src={pair.after.src}
              alt={pair.after.alt}
              width={pair.after.width}
              height={pair.after.height}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
              className="mx-auto block h-auto max-h-[420px] w-auto max-w-full object-contain transition-[transform,filter] duration-[450ms] ease-out [filter:contrast(1.03)] group-hover:scale-[1.012] group-hover:[filter:contrast(1.05)_brightness(1.02)] sm:max-h-[500px] lg:max-h-[600px]"
            />
          </span>
        </span>

        {/* Central divider, matching the slider's gold hairline */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gold-soft/70 sm:block"
        />

        {/* Discreet explore affordance */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-cream/80 backdrop-blur-sm">
            <Maximize2 className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="sr-only">Voir la transformation en grand</span>
        </span>
      </span>

      <span className="border-t border-gold/15 px-5 py-4 text-center sm:px-6">
        <span className="text-xs uppercase tracking-[0.2em] text-anthracite/60">{pair.note}</span>
      </span>
    </button>
  );
}
