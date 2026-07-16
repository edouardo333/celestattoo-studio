"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MessageCircle, PenTool, CircleCheck, Sparkles } from "lucide-react";
import IconBadge from "./IconBadge";

const REVEAL_STEP = 80;
const STEPS_START_INDEX = 4;

const steps = [
  {
    number: "01",
    title: "Échange",
    text: "Comprendre l'histoire, les envies, les références et la personnalité du client.",
    Icon: MessageCircle,
  },
  {
    number: "02",
    title: "Création",
    text: "Dessiner une composition pensée spécialement pour son corps.",
    Icon: PenTool,
  },
  {
    number: "03",
    title: "Validation",
    text: "Ajuster chaque détail jusqu'à obtenir une création parfaitement équilibrée.",
    Icon: CircleCheck,
  },
  {
    number: "04",
    title: "Réalisation",
    text: "Transformer cette vision en une œuvre durable qui traversera le temps.",
    Icon: Sparkles,
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

export default function CreativeProcess() {
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
    <section id="processus" ref={sectionRef} className="relative bg-beige py-24 md:py-32">
      {/* Barely-there art-paper texture, consistent with the rest of the site */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-gold ${reveal()}`}
            style={revealStyle(0)}
          >
            Le processus
          </p>

          <h2
            className={`mt-6 font-heading text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl ${reveal()}`}
            style={revealStyle(1)}
          >
            Chaque création suit une histoire unique.
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

          <p className={`text-base leading-relaxed text-anthracite ${reveal()}`} style={revealStyle(3)}>
            Chaque projet débute par une écoute attentive afin de transformer
            une idée en une œuvre entièrement personnalisée.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8">
          {steps.map(({ number, title, text, Icon }, i) => (
            <div
              key={number}
              className={`group relative overflow-hidden rounded-2xl border border-gold/15 bg-cream p-8 shadow-[0_10px_24px_-14px_rgba(87,68,51,0.16)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_18px_34px_-16px_rgba(87,68,51,0.22)] sm:p-9 ${reveal()}`}
              style={revealStyle(STEPS_START_INDEX + i)}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-2 select-none font-heading text-[92px] leading-none text-gold/[0.13] sm:-top-6 sm:right-3 sm:text-[110px]"
              >
                {number}
              </span>

              <div className="relative">
                <IconBadge icon={Icon} size="md" interactive />
                <h3 className="mt-6 font-heading text-xl text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-anthracite/80">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
