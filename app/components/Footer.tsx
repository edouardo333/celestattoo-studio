"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MapPin, CalendarDays } from "lucide-react";
import { FACEBOOK_URL } from "@/app/lib/constants";
import IconBadge from "./IconBadge";

const REVEAL_STEP = 80;

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#tatouages", label: "Tatouages" },
  { href: "#coverups", label: "Cover-ups" },
  { href: "#peintures", label: "Peintures" },
  { href: "#processus", label: "Processus" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 9h-1a1.5 1.5 0 0 0-1.5 1.5V12m0 0H9.25M11 12v6.5m0-6.5h2"
      />
    </svg>
  );
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

export default function Footer() {
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
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[14px]"
        }`;

  const revealStyle = (index: number) =>
    reducedMotion ? undefined : { transitionDelay: `${index * REVEAL_STEP}ms` };

  const year = new Date().getFullYear();

  return (
    <footer ref={sectionRef} className="border-t border-gold/15 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {/* Logo */}
          <div className={reveal()} style={revealStyle(0)}>
            <div className="flex items-center">
              <Image
                src="/images/logo-celestattoo.png"
                alt="Célestattoo"
                width={1254}
                height={1254}
                className="h-11 w-11 object-contain"
              />
              <span className="ml-3 font-heading text-xl tracking-wide text-anthracite">
                Célestattoo
              </span>
            </div>
            <p className="mt-4 max-w-[220px] font-heading text-sm italic leading-relaxed text-anthracite/60">
              Tatouage &amp; peinture, pensés pour traverser le temps.
            </p>
          </div>

          {/* Navigation */}
          <div className={reveal()} style={revealStyle(1)}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Navigation
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-anthracite/70 transition-colors duration-300 ease-out hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div className={reveal()} style={revealStyle(2)}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Coordonnées
            </p>
            <p className="mt-5 font-heading text-sm text-anthracite/80">Lucy Dubois — Célestattoo</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              <li className="flex items-center gap-2 text-sm text-anthracite/70">
                <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} aria-hidden="true" />
                <span>Thetford Mines, Québec</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-anthracite/70">
                <CalendarDays className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} aria-hidden="true" />
                <span>Du mardi au vendredi — heures variables</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir le profil Facebook de Lucy"
                title="Ouvrir le profil Facebook de Lucy"
                className="group inline-block"
              >
                <IconBadge icon={FacebookIcon} size="sm" interactive />
              </a>
              <span className="text-sm text-anthracite/70">Facebook / Messenger</span>
            </div>
          </div>
        </div>

        <div
          className={`mt-14 flex flex-col items-center gap-1 border-t border-gold/10 pt-6 text-center sm:items-end sm:text-right ${reveal()}`}
          style={revealStyle(3)}
        >
          <p className="text-xs text-anthracite/50">© {year} Célestattoo</p>
          <p className="text-[11px] text-anthracite/35">Conçu avec soin par Brochu Digital</p>
        </div>
      </div>
    </footer>
  );
}
