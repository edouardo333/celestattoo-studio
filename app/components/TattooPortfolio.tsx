"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ZoomIn } from "lucide-react";
import { tattoos } from "@/app/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

const INITIAL_COUNT = 8;
const REVEAL_STEP = 80;
const GALLERY_START_INDEX = 2;
const ROW_SIZE = 3;

/** Subtle, repeating vertical offset pattern applied on large screens only,
 * to break the straight-grid alignment without looking random. */
const OFFSET_PATTERN = [
  "",
  "lg:mt-[60px]",
  "",
  "",
  "lg:mt-[100px]",
  "",
  "lg:mt-[40px]",
  "",
];

function getOffsetClass(index: number) {
  return OFFSET_PATTERN[index % OFFSET_PATTERN.length];
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export default function TattooPortfolio() {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const isRevealed = reducedMotion || visible;

  useEffect(() => {
    if (reducedMotion) return;

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const reveal = () =>
    reducedMotion
      ? ""
      : `transition-all duration-[650ms] ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`;

  const revealStyle = (index: number) =>
    reducedMotion ? undefined : { transitionDelay: `${index * REVEAL_STEP}ms` };

  const visibleItems = showAll ? tattoos : tattoos.slice(0, INITIAL_COUNT);

  return (
    <section id="tatouages" ref={sectionRef} className="relative bg-cream py-24 md:py-32">
      {/* Barely-there art-paper texture across the whole gallery */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.35em] text-gold ${reveal()}`} style={revealStyle(0)}>
            Portfolio
          </p>
          <h2
            className={`mt-6 font-heading text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl ${reveal()}`}
            style={revealStyle(0)}
          >
            Des œuvres pensées pour vivre sur la peau.
          </h2>
          <p className={`mt-6 text-base leading-relaxed text-anthracite ${reveal()}`} style={revealStyle(1)}>
            Chaque tatouage est développé comme une composition complète, en
            tenant compte du mouvement du corps, des volumes, des ombres et
            de l&apos;histoire derrière chaque projet.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[30fr_38fr_30fr] lg:gap-10">
          {visibleItems.map((item, i) => {
            const rowIndex = Math.floor(i / ROW_SIZE);
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Agrandir : ${item.title}`}
                className={`group flex flex-col overflow-hidden rounded-3xl border border-beige bg-beige/40 text-left shadow-[0_10px_20px_-10px_rgba(87,68,51,0.14),0_25px_50px_-25px_rgba(87,68,51,0.2)] transition-all duration-[450ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-10px_rgba(87,68,51,0.18),0_35px_65px_-22px_rgba(87,68,51,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  item.featured ? "lg:col-span-2" : ""
                } ${getOffsetClass(i)} ${reveal()}`}
                style={revealStyle(GALLERY_START_INDEX + rowIndex)}
              >
                <span className="relative flex items-center justify-center bg-cream p-3 sm:p-4">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="h-auto w-full max-h-[420px] object-contain [filter:contrast(1.04)] transition-[transform,filter] duration-[450ms] ease-out group-hover:scale-[1.02] group-hover:[filter:contrast(1.06)_brightness(1.03)] sm:max-h-[500px] lg:max-h-[720px]"
                  />
                  {/* Discreet zoom affordance */}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-charcoal/25 backdrop-blur-sm">
                      <ZoomIn className="h-4 w-4 text-cream" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                </span>
                <span className="flex flex-col gap-1 px-4 py-4 sm:px-5">
                  <span className="font-heading text-base text-charcoal sm:text-lg">
                    {item.title}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-anthracite/60">
                    {item.category}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-md border border-anthracite px-7 py-3 text-sm font-medium uppercase tracking-wide text-anthracite transition-colors hover:border-gold hover:text-gold"
          >
            {showAll ? "Réduire la galerie" : "Voir tout le portfolio"}
          </button>
        </div>

        <p className="mt-8 text-center font-signature text-2xl text-gold-soft/80">
          Lucy Dubois
        </p>
      </div>

      <GalleryLightbox
        items={visibleItems}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}
