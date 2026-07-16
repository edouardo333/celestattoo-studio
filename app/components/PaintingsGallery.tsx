"use client";

import Image from "next/image";
import { useState } from "react";
import { paintings } from "@/app/data/gallery";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import GalleryLightbox from "./GalleryLightbox";

// Computed once at module scope so the lightbox always receives a stable
// array reference instead of a new one on every render.
const lightboxItems = paintings.map((item) => ({
  ...item,
  subtitle: "Œuvre originale",
}));

const REVEAL_STEP = 70;
const GALLERY_START_INDEX = 5;
const GALLERY_STAGGER_CAP = 10;

export default function PaintingsGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref: sectionRef, isRevealed, reducedMotion } = useScrollReveal<HTMLElement>();

  const reveal = () =>
    reducedMotion
      ? ""
      : `transition-all duration-[650ms] ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
        }`;

  const revealStyle = (index: number) =>
    reducedMotion ? undefined : { transitionDelay: `${index * REVEAL_STEP}ms` };

  const closingIndex = GALLERY_START_INDEX + GALLERY_STAGGER_CAP + 1;

  return (
    <section id="peintures" ref={sectionRef} className="relative bg-cream py-24 md:py-32">
      {/* Barely-there art-paper texture, consistent with the Hero and Portfolio */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-gold ${reveal()}`}
            style={revealStyle(0)}
          >
            De la toile à la peau
          </p>
          <h2
            className={`mt-6 font-heading text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl ${reveal()}`}
            style={revealStyle(1)}
          >
            La peinture au cœur de son langage artistique.
          </h2>

          {/* Ornamental divider — same construction as About and Cover-ups */}
          <div
            aria-hidden="true"
            className={`my-7 flex items-center justify-center gap-3 ${reveal()}`}
            style={revealStyle(2)}
          >
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-sm text-gold/70">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <p className={`text-base leading-relaxed text-anthracite ${reveal()}`} style={revealStyle(3)}>
            Les œuvres sur toile de Lucy révèlent sa maîtrise de la couleur,
            du réalisme, des regards et de la composition. Cette expérience
            nourrit directement sa manière de concevoir chaque tatouage.
          </p>

          <div className={`mt-8 flex flex-col items-center ${reveal()}`} style={revealStyle(4)}>
            <span aria-hidden="true" className="h-6 w-px bg-gold/40" />
            <p className="mx-auto mt-3 max-w-md font-heading text-base italic leading-relaxed text-gold sm:text-lg">
              « Chaque toile explore un regard, une émotion et une histoire
              destinée à traverser le temps. »
            </p>
          </div>
        </div>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 md:gap-8 lg:columns-3">
          {paintings.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Agrandir : ${item.title}`}
              className={`group mb-6 block w-full cursor-zoom-in break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:mb-8 ${reveal()}`}
              style={revealStyle(GALLERY_START_INDEX + Math.min(i, GALLERY_STAGGER_CAP))}
            >
              <span className="relative block overflow-hidden rounded-lg border border-gold/15 shadow-[0_6px_16px_-10px_rgba(87,68,51,0.12)] transition-shadow duration-500 ease-out group-hover:shadow-[0_14px_26px_-12px_rgba(87,68,51,0.2)]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover [filter:brightness(1)] transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.02] group-hover:[filter:brightness(1.015)]"
                />
              </span>
              <span className="mt-5 block md:mt-6">
                <span className="block font-heading text-base tracking-wide text-anthracite transition-colors duration-500 ease-out group-hover:text-gold sm:text-lg">
                  {item.title}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-anthracite/45">
                  Œuvre originale
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className={`mt-20 flex flex-col items-center gap-4 md:mt-24 ${reveal()}`} style={revealStyle(closingIndex)}>
          <div aria-hidden="true" className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-sm text-gold/70">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <p className="text-center text-sm italic text-anthracite/60">
            La même sensibilité artistique, de la toile jusqu&apos;à la peau.
          </p>
        </div>
      </div>

      <GalleryLightbox
        items={lightboxItems}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}
