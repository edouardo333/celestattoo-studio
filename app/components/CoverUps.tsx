"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Maximize2 } from "lucide-react";
import { coverUps } from "@/app/data/gallery";
import { FACEBOOK_URL } from "@/app/lib/constants";
import BeforeAfterSlider from "./BeforeAfterSlider";
import CoverUpCompareCard from "./CoverUpCompareCard";
import CoverUpLightbox from "./CoverUpLightbox";

const REVEAL_STEP = 80;
const CARDS_START_INDEX = 6;
const ROW_SIZE = 2;

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

export default function CoverUps() {
  const featured = coverUps.find((pair) => pair.featured) ?? coverUps[0];
  const rest = coverUps.filter((pair) => pair.id !== featured.id);

  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  const openLightbox = (id: string) => {
    const idx = coverUps.findIndex((pair) => pair.id === id);
    if (idx !== -1) setActiveIndex(idx);
  };

  const lastCardRow = Math.floor((rest.length - 1) / ROW_SIZE);

  return (
    <section id="cover-ups" ref={sectionRef} className="relative bg-beige py-24 md:py-32">
      {/* Bridges the existing nav link (#coverups) to this section's id (#cover-ups) */}
      <span id="coverups" className="block h-0 w-0" aria-hidden="true" />

      {/* Barely-there art-paper texture, consistent with the Hero and Portfolio */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.35em] text-gold ${reveal()}`}
            style={revealStyle(0)}
          >
            Transformations
          </p>

          <h2
            className={`mt-6 font-heading text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl ${reveal()}`}
            style={revealStyle(1)}
          >
            Redonner vie à une histoire existante.
          </h2>

          {/* Ornamental divider — same construction as About */}
          <div
            aria-hidden="true"
            className={`my-6 flex items-center justify-center gap-3 ${reveal()}`}
            style={revealStyle(2)}
          >
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-sm text-gold/70">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <p className={`text-base leading-relaxed text-anthracite ${reveal()}`} style={revealStyle(3)}>
            Le cover-up demande une compréhension précise des formes, des
            valeurs et des contrastes. Lucy transforme d&apos;anciens
            tatouages en créations cohérentes, détaillées et entièrement
            repensées.
          </p>

          <blockquote
            className={`relative mx-auto mt-8 max-w-md border-l border-gold/40 pl-5 text-left font-heading text-lg italic leading-relaxed text-anthracite/85 sm:text-xl ${reveal()}`}
            style={revealStyle(4)}
          >
            Chaque cover-up est l&apos;occasion de transformer un souvenir que
            l&apos;on souhaite laisser derrière soi en une œuvre que l&apos;on
            sera fier de porter.
          </blockquote>
        </div>

        <div className={`mt-14 ${reveal()}`} style={revealStyle(5)}>
          <BeforeAfterSlider
            title="Transformation vedette"
            note={featured.note}
            description="Une nouvelle composition pensée pour intégrer, transformer et dissimuler l'ancien tatouage."
            before={featured.before}
            after={featured.after}
            imageFit={featured.imageFit}
            beforeObjectPosition={featured.beforeObjectPosition}
            afterObjectPosition={featured.afterObjectPosition}
            sizes="(max-width: 1024px) 100vw, 1100px"
            priority
            frameClassName="h-[420px] bg-anthracite sm:h-[520px] lg:h-[600px]"
          />
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => openLightbox(featured.id)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-4 py-2 text-xs uppercase tracking-[0.2em] text-anthracite transition-colors duration-300 hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Voir en grand
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1180px] grid-cols-1 gap-y-10 gap-x-9 sm:grid-cols-2">
          {rest.map((pair, i) => {
            const rowIndex = Math.floor(i / ROW_SIZE);
            return (
              <div key={pair.id} className={reveal()} style={revealStyle(CARDS_START_INDEX + rowIndex)}>
                <CoverUpCompareCard pair={pair} onOpen={() => openLightbox(pair.id)} />
              </div>
            );
          })}
        </div>

        <div
          className={reveal()}
          style={revealStyle(CARDS_START_INDEX + lastCardRow + 1)}
        >
          <p className="mx-auto mt-14 max-w-2xl text-center text-sm italic leading-relaxed text-anthracite/70">
            Chaque projet de cover-up est évalué individuellement selon
            l&apos;ancien tatouage, la peau et le résultat souhaité.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium uppercase tracking-wide text-charcoal transition-all duration-[350ms] ease-out hover:tracking-wider hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-beige focus-visible:outline-none"
            >
              Discuter de votre projet de cover-up
              <span
                aria-hidden="true"
                className="transition-transform duration-[350ms] ease-out group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <CoverUpLightbox
        items={coverUps}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}
