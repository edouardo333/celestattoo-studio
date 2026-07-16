"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Award, Sparkles, PenTool } from "lucide-react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const PARALLAX_MAX_PX = 12;

const trustPoints = [
  { Icon: Award, label: "15+ ans d'expérience" },
  { Icon: Sparkles, label: "Projets entièrement personnalisés" },
  { Icon: PenTool, label: "Tatouage, peinture et cover-up" },
];

const aboutStats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "100 %", label: "Créations personnalisées" },
  { value: "Des centaines", label: "de projets réalisés" },
];

const REVEAL_STEP = 80;

export default function About() {
  const { ref: sectionRef, isRevealed, reducedMotion } = useScrollReveal<HTMLElement>();
  const photoRef = useRef<HTMLDivElement>(null);

  // Extremely subtle parallax: the portrait drifts a few px while the text
  // column stays put, giving a light sense of depth as the section scrolls by.
  useEffect(() => {
    if (reducedMotion) return;

    const sectionEl = sectionRef.current;
    const photoEl = photoRef.current;
    if (!sectionEl || !photoEl) return;

    let frame = 0;
    const update = () => {
      const rect = sectionEl.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const progress =
        (rect.top + rect.height / 2 - viewportH / 2) / (viewportH / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      photoEl.style.transform = `translateY(${clamped * -PARALLAX_MAX_PX}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, sectionRef]);

  const reveal = () =>
    reducedMotion
      ? ""
      : `transition-all duration-[600ms] ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`;

  const revealStyle = (index: number) =>
    reducedMotion ? undefined : { transitionDelay: `${index * REVEAL_STEP}ms` };

  return (
    <section id="apropos" ref={sectionRef} className="bg-beige py-24 md:py-32">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Fine vertical divider between the two columns — desktop only */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 hidden h-[480px] w-px -translate-x-1/2 -translate-y-1/2 bg-gold/12 lg:block"
        />

        {/* Artistic frame */}
        <div className={`group flex justify-center lg:justify-start ${reveal()}`} style={revealStyle(0)}>
          <div
            ref={photoRef}
            className="relative h-[400px] w-[340px] will-change-transform sm:h-[480px] sm:w-[420px] lg:h-[540px] lg:w-[480px]"
          >
            {/* Very light watercolor wash behind the frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[55%_45%_60%_40%/45%_55%_35%_65%] bg-gold-soft/3 blur-2xl sm:-inset-8"
            />

            <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl border border-gold/50" />
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-beige bg-cream shadow-[0_18px_30px_-12px_rgba(87,68,51,0.12),0_40px_90px_-30px_rgba(87,68,51,0.18)] transition-shadow duration-[450ms] ease-out lg:group-hover:shadow-[0_22px_38px_-12px_rgba(87,68,51,0.16),0_50px_110px_-28px_rgba(87,68,51,0.22)]">
              <Image
                src="/images/lucy-photo-tattoogun.jpg"
                alt="Lucy Célestattoo au travail dans son atelier"
                width={951}
                height={951}
                className="h-full w-full object-contain object-[50%_50%] [filter:contrast(1.05)_saturate(1.03)] transition-[transform,filter] duration-[450ms] ease-out lg:group-hover:scale-[1.02] lg:group-hover:[filter:contrast(1.08)_brightness(1.02)_saturate(1.04)]"
              />
              {/* Soft top sheen, like gallery light resting on the frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-transparent"
              />
              {/* Very occasional light pass across the frame, like a vitrine catching the light */}
              {!reducedMotion && (
                <div
                  aria-hidden="true"
                  className="animate-frame-sheen pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-cream/25 to-transparent"
                />
              )}
            </div>
            <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-gold-soft/30 blur-2xl" />
          </div>
        </div>

        {/* Content */}
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] text-gold ${reveal()}`}
            style={revealStyle(1)}
          >
            L&apos;artiste derrière l&apos;œuvre
          </p>

          <h2
            className={`mt-6 font-heading text-[31px] leading-[1.3] text-charcoal sm:text-[38px] lg:text-[50px] ${reveal()}`}
            style={revealStyle(2)}
          >
            Plus qu&apos;un tatouage,{" "}
            <span className="italic text-gold">une création profondément
            personnelle.</span>
          </h2>

          {/* Ornamental divider */}
          <div
            aria-hidden="true"
            className={`my-6 flex items-center gap-3 ${reveal()}`}
            style={revealStyle(3)}
          >
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-sm text-gold/70">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <div className="flex flex-col gap-5 text-base leading-relaxed text-anthracite">
            <p className={reveal()} style={revealStyle(4)}>
              Lucy Dubois est une artiste tatoueuse et peintre établie à
              Thetford Mines. Depuis plus de quinze ans, elle développe un
              univers où le réalisme, la nature, les animaux et les émotions
              occupent une place centrale.
            </p>
            <p className={reveal()} style={revealStyle(5)}>
              Son expérience en peinture influence directement son travail sur
              la peau. Chaque projet est pensé comme une composition
              complète, avec une attention particulière portée aux ombres,
              aux volumes, aux regards et aux détails.
            </p>
            <p className={reveal()} style={revealStyle(6)}>
              Qu&apos;il s&apos;agisse d&apos;un tatouage personnalisé, d&apos;un
              cover-up complexe ou d&apos;une œuvre sur toile, Lucy prend le
              temps de comprendre l&apos;histoire et les intentions derrière
              chaque création.
            </p>
          </div>

          <blockquote
            className={`relative mt-7 mb-[52px] max-w-md border-l border-gold/40 pl-5 font-heading text-lg italic leading-relaxed text-anthracite/85 sm:text-xl ${reveal()}`}
            style={revealStyle(7)}
          >
            Chaque tatouage raconte une histoire. Mon rôle est de lui donner
            une vie éternelle.
          </blockquote>

          {/* Premium, editorial stats line */}
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 ${reveal()}`}
            style={revealStyle(8)}
          >
            {aboutStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col rounded-md p-2 -m-2 transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:shadow-[0_10px_24px_-14px_rgba(87,68,51,0.25)] ${
                  i > 0 ? "sm:border-l sm:border-gold/20 sm:pl-4" : ""
                }`}
              >
                <span className="font-heading text-2xl text-anthracite">{stat.value}</span>
                <span className="mt-1 text-xs uppercase tracking-wide text-anthracite/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <ul
            className={`mt-9 flex flex-col gap-3 border-t border-gold/25 pt-7 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3 ${reveal()}`}
            style={revealStyle(9)}
          >
            {trustPoints.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-anthracite">
                <Icon className="h-4 w-4 text-gold-soft" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <a
            href="#tatouages"
            className={`group mt-9 inline-flex items-center gap-2 rounded-sm text-sm font-medium uppercase tracking-wide text-charcoal transition-all duration-[350ms] ease-out hover:tracking-wider hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-beige focus-visible:outline-none ${reveal()}`}
            style={revealStyle(10)}
          >
            Découvrir son parcours
            <span
              aria-hidden="true"
              className="transition-transform duration-[350ms] ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>

          <p
            className={`mt-3 font-signature text-2xl text-gold-soft/80 ${
              reducedMotion
                ? ""
                : `transition-all duration-[700ms] ease-out ${
                    isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
                  }`
            }`}
            style={revealStyle(11)}
          >
            Lucy Dubois
          </p>
        </div>
      </div>
    </section>
  );
}
