"use client";

import Image from "next/image";
import { useState } from "react";
import type { CoverUpImage } from "@/app/data/gallery";

interface BeforeAfterSliderProps {
  title: string;
  note: string;
  before: CoverUpImage;
  after: CoverUpImage;
  sizes: string;
  priority?: boolean;
  imageFit?: "cover" | "contain";
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  /** Controls the frame's size and background (height, rounding, backdrop colour) */
  frameClassName?: string;
  description?: string;
  /**
   * When true, the frame sizes itself from the "after" image's own intrinsic
   * ratio (capped by frameClassName's max-width/max-height), instead of
   * filling a fixed-aspect box — used by the lightbox so nothing is ever
   * cropped or stretched. Default (false) keeps the fixed-frame behaviour
   * used by the on-page featured comparator.
   */
  autoFit?: boolean;
}

export default function BeforeAfterSlider({
  title,
  note,
  before,
  after,
  sizes,
  priority,
  imageFit = "cover",
  beforeObjectPosition = "center",
  afterObjectPosition = "center",
  frameClassName = "aspect-[4/5] bg-anthracite",
  description,
  autoFit = false,
}: BeforeAfterSliderProps) {
  const [value, setValue] = useState(50);
  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";
  const ratio = after.width / after.height;

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-xl shadow-sm shadow-charcoal/10 ${
          autoFit ? "mx-auto" : "mx-auto w-full max-w-[1100px]"
        } ${frameClassName}`}
        style={
          autoFit
            ? {
                width: `min(90vw, calc(75vh * ${ratio}))`,
                height: `min(75vh, calc(90vw / ${ratio}))`,
              }
            : undefined
        }
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: afterObjectPosition }}
          className={fitClass}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes={sizes}
            priority={priority}
            style={{ objectPosition: beforeObjectPosition }}
            className={fitClass}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-gold-soft/90"
          style={{ left: `${value}%` }}
        />

        <span className="pointer-events-none absolute left-4 top-4 rounded-md bg-charcoal/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cream">
          Avant
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-md bg-charcoal/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cream">
          Après
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label={`Faire glisser pour comparer avant et après — ${title}`}
          className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        <div
          className="pointer-events-none absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-cream text-charcoal shadow-[0_4px_14px_-4px_rgba(87,68,51,0.35)] ring-0 transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-gold"
          style={{ left: `${value}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1100px] flex-col items-center gap-1 text-center">
        <p className="font-heading text-lg text-charcoal">{title}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-anthracite/70">{note}</p>
        {description && (
          <p className="mt-2 max-w-md text-sm italic text-anthracite/80">{description}</p>
        )}
      </div>
    </div>
  );
}
