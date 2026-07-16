"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Star, Quote } from "lucide-react";

const REVEAL_STEP = 80;
const CARDS_START_INDEX = 3;

// Real Facebook reviews — punctuation/capitalization lightly tidied for
// readability only, wording and meaning unchanged.
const testimonials = [
  {
    name: "Ainsylvie Lavie",
    project: "Création personnalisée",
    quote:
      "Ben voyons donc… C'est capoter. Tout l'ouvrage que tu as mis et le résultat est tout simplement magnifique, malade. Encore wow Lucy, tu es une vraie de vraie pro.",
  },
  {
    name: "Nathalie Poudrier",
    project: "Tatouage personnalisé",
    quote: "Wow Lucy, tu fais de la magie. C'est vraiment impressionnant.",
  },
  {
    name: "Yanick Maheu",
    project: "Cover-up",
    quote: "Wow, vraiment très beau cover-up. Travail de professionnel.",
  },
  {
    name: "Carl Lalancette",
    project: "Restauration de tatouage",
    quote: "Très beau travail Lucy. Belle récupération ou restauration de tatouage.",
  },
];

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

export default function Testimonials() {
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
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
        }`;

  const revealStyle = (index: number) =>
    reducedMotion ? undefined : { transitionDelay: `${index * REVEAL_STEP}ms` };

  return (
    <section id="temoignages" ref={sectionRef} className="relative bg-cream py-24 md:py-32">
      {/* Barely-there art-paper texture, consistent with the rest of the site */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-gold ${reveal()}`}
            style={revealStyle(0)}
          >
            Témoignages
          </p>

          <h2
            className={`mt-6 font-heading text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl ${reveal()}`}
            style={revealStyle(1)}
          >
            Des histoires gravées dans la peau.
          </h2>

          {/* Ornamental divider — same construction as About, Cover-ups and Peintures */}
          <div
            aria-hidden="true"
            className={`my-7 flex items-center justify-center gap-3 ${reveal()}`}
            style={revealStyle(2)}
          >
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-sm text-gold/70">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {testimonials.map(({ name, project, quote }, i) => (
            <div
              key={name}
              className={`group relative overflow-hidden rounded-2xl border border-gold/15 bg-beige/60 p-8 shadow-[0_10px_20px_-14px_rgba(87,68,51,0.16)] transition-all duration-[600ms] ease-out hover:-translate-y-[3px] hover:shadow-[0_20px_38px_-16px_rgba(87,68,51,0.26)] ${reveal()}`}
              style={revealStyle(CARDS_START_INDEX + i)}
            >
              {/* Very subtle golden opening quote mark, sunk into the card background */}
              <Quote
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-4 h-28 w-28 text-gold/[0.06] transition-colors duration-[600ms] ease-out group-hover:text-gold/[0.14]"
                fill="currentColor"
                strokeWidth={0}
              />

              <div
                className="relative flex items-center gap-1 transition-[filter] duration-[600ms] ease-out group-hover:brightness-110"
                aria-label="5 étoiles sur 5"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-4 w-4 fill-gold text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="relative mt-5 font-heading text-lg italic leading-relaxed text-anthracite/85">
                « {quote} »
              </p>

              <div className="relative mt-6 flex items-center gap-3 border-t border-gold/15 pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-cream font-heading text-sm text-gold"
                >
                  {name.charAt(0)}
                </span>
                <div>
                  <p className="font-heading text-base text-charcoal">{name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-anthracite/50">
                    {project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
