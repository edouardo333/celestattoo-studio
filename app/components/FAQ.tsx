"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  CalendarDays,
  WalletCards,
  HeartPulse,
  Clock3,
  RefreshCcw,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import IconBadge from "./IconBadge";

const REVEAL_STEP = 80;
const ITEMS_START_INDEX = 3;

// Placeholder answers — to be refined with Lucy before launch.
const faqItems = [
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Vous pouvez contacter Lucy directement via Facebook Messenger pour discuter de votre projet et fixer une date.",
    Icon: CalendarDays,
  },
  {
    question: "Faut-il verser un dépôt ?",
    answer:
      "Oui, un dépôt est demandé pour confirmer chaque rendez-vous. Ce montant est ensuite déduit du prix final de la séance.",
    Icon: WalletCards,
  },
  {
    question: "Comment préparer sa séance ?",
    answer:
      "Il est recommandé d'être bien reposé, hydraté et d'avoir mangé avant votre rendez-vous. Évitez l'alcool dans les 24 heures précédant la séance.",
    Icon: HeartPulse,
  },
  {
    question: "Les retouches sont-elles incluses ?",
    answer:
      "Une retouche est généralement incluse dans le prix pour assurer un résultat impeccable. Elle est planifiée quelques semaines après la séance initiale.",
    Icon: RefreshCcw,
  },
  {
    question: "Combien de temps dure une séance ?",
    answer:
      "La durée varie selon la taille et la complexité du projet, de quelques heures à une journée complète pour les pièces plus élaborées.",
    Icon: Clock3,
  },
  {
    question: "Réalisez-vous des cover-ups ?",
    answer:
      "Oui, les cover-ups font partie des spécialités de Lucy. Chaque projet est étudié individuellement selon l'ancien tatouage et le résultat souhaité.",
    Icon: Layers3,
  },
  {
    question: "Quel est l'âge minimum ?",
    answer:
      "L'âge minimum est de 18 ans, avec une pièce d'identité valide requise le jour du rendez-vous.",
    Icon: ShieldCheck,
  },
  {
    question: "Comment prendre soin de son tatouage ?",
    answer:
      "Des consignes de soins détaillées sont remises après chaque séance afin d'assurer une cicatrisation optimale.",
    Icon: HeartPulse,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: sectionRef, isRevealed, reducedMotion } = useScrollReveal<HTMLElement>();

  const reveal = () =>
    reducedMotion
      ? ""
      : `transition-all duration-[650ms] ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
        }`;

  const revealStyle = (index: number) =>
    reducedMotion ? undefined : { transitionDelay: `${index * REVEAL_STEP}ms` };

  return (
    <section id="faq" ref={sectionRef} className="relative bg-beige py-24 md:py-32">
      {/* Barely-there art-paper texture, consistent with the rest of the site */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-gold ${reveal()}`}
            style={revealStyle(0)}
          >
            Questions fréquentes
          </p>

          <h2
            className={`mt-6 font-heading text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl ${reveal()}`}
            style={revealStyle(1)}
          >
            Tout ce qu&apos;il faut savoir avant votre rendez-vous.
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

        <div className="mt-14 divide-y divide-gold/15 border-t border-b border-gold/15">
          {faqItems.map(({ question, answer, Icon }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={question} className={reveal()} style={revealStyle(ITEMS_START_INDEX + i)}>
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className="h-4 w-4 shrink-0 text-gold-soft"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <span className="font-heading text-lg text-charcoal sm:text-xl">{question}</span>
                  </span>
                  <IconBadge
                    icon={isOpen ? Minus : Plus}
                    size="xs"
                    active={isOpen}
                    interactive
                    className={isOpen ? "rotate-90" : "rotate-0"}
                  />
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p
                    className={`max-w-xl pb-6 pl-7 pr-8 text-sm leading-relaxed text-anthracite/80 transition-opacity duration-300 ease-in-out ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
