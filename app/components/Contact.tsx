"use client";

import { MessageCircle, Send, MapPin, CalendarDays, ExternalLink } from "lucide-react";
import { FACEBOOK_URL } from "@/app/lib/constants";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import IconBadge from "./IconBadge";

const REVEAL_STEP = 90;

const GOOGLE_MAPS_EMBED_SRC = "https://www.google.com/maps?q=Thetford+Mines,+Québec&output=embed";
const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Thetford+Mines,+QC/@46.116881,-71.330454,12.75z/data=!4m6!3m5!1s0x4cb830fc45f8e117:0xe49fae5c22588ee2!8m2!3d46.1028329!4d-71.3055522!16zL20vMDJocDR0?entry=ttu&g_ep=EgoyMDI2MDcxMy4wIKXMDSoASAFQAw%3D%3D";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 9h-1a1.5 1.5 0 0 0-1.5 1.5V12m0 0H9.25M11 12v6.5m0-6.5h2"
      />
    </svg>
  );
}

const coordinates = [
  { Icon: FacebookIcon, label: "Facebook / Messenger", value: "Écrire un message", href: FACEBOOK_URL },
  { Icon: MapPin, label: "Ville", value: "Thetford Mines, Québec", href: undefined },
  { Icon: CalendarDays, label: "Horaires", value: "Du mardi au vendredi — heures variables", href: undefined },
];

export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-charcoal py-24 md:py-32">
      {/* Very subtle golden glow behind the content — never flashy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft/10 blur-[110px]"
      />
      {/* Dark counterpart of the paper-grain texture used across the rest of the site */}
      <div className="bg-grain-dark pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left column — message, CTAs, coordinates */}
          <div className="text-center lg:text-left">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.3em] text-gold ${reveal()}`}
              style={revealStyle(0)}
            >
              Prendre rendez-vous
            </p>

            <h2
              className={`mt-6 font-heading text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl ${reveal()}`}
              style={revealStyle(1)}
            >
              Votre prochaine œuvre commence par une conversation.
            </h2>

            <p
              className={`mt-6 text-base leading-relaxed text-cream/70 ${reveal()}`}
              style={revealStyle(2)}
            >
              Chaque projet est unique. Discutons ensemble de votre idée afin
              de créer une œuvre entièrement pensée pour vous.
            </p>

            <div
              className={`mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start ${reveal()}`}
              style={revealStyle(3)}
            >
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-charcoal transition-all duration-[350ms] ease-out hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/20"
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden="true" />
                Prendre rendez-vous
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-all duration-[350ms] ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-gold/15"
              >
                <Send
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                Poser une question
              </a>
            </div>

            <p
              className={`mt-10 font-signature text-2xl text-gold-soft/80 ${reveal()}`}
              style={revealStyle(4)}
            >
              Lucy Dubois — Célestattoo
            </p>

            <div
              className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-t border-gold/15 pt-9 lg:justify-start ${reveal()}`}
              style={revealStyle(5)}
            >
              {coordinates.map(({ Icon, label, value, href }) => {
                const content = (
                  <span className="flex items-center gap-2.5 text-sm text-cream/75 transition-colors duration-300 ease-out group-hover:text-gold">
                    <IconBadge icon={Icon} size="xs" variant="dark" interactive={Boolean(href)} />
                    <span>
                      <span className="sr-only">{label} : </span>
                      {value}
                    </span>
                  </span>
                );
                return (
                  <div key={label} className={href ? "group" : ""}>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>

            <p
              className={`mt-5 text-xs italic text-cream/45 ${reveal()}`}
              style={revealStyle(6)}
            >
              Réponse directement sur Facebook Messenger.
            </p>
          </div>

          {/* Right column — Google Maps */}
          <div className={reveal()} style={revealStyle(3)}>
            <div className="overflow-hidden rounded-2xl border border-gold/25 shadow-[0_25px_60px_-24px_rgba(0,0,0,0.55)]">
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                title="Carte de Thetford Mines, Québec"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 [filter:grayscale(20%)_saturate(0.85)_contrast(1.08)] sm:h-[340px] lg:h-[460px]"
              />
            </div>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-cream/50">
                Thetford Mines, Québec
              </p>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-cream/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/75 transition-colors duration-300 ease-out hover:border-gold hover:text-gold"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
