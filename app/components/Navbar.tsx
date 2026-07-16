"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FACEBOOK_URL } from "@/app/lib/constants";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#tatouages", label: "Tatouages" },
  { href: "#coverups", label: "Cover-ups" },
  { href: "#peintures", label: "Peintures" },
  { href: "#contact", label: "Contact" },
];

// The sections tracked for the active-link indicator — each maps to the
// closest matching anchor above. "cover-ups" is the section's real id,
// bridged to the nav's "#coverups" anchor.
const SECTION_IDS = ["accueil", "apropos", "tatouages", "cover-ups", "peintures", "processus", "temoignages", "faq", "contact"];
const SECTION_TO_HREF: Record<string, string> = {
  accueil: "#accueil",
  apropos: "#apropos",
  tatouages: "#tatouages",
  "cover-ups": "#coverups",
  peintures: "#peintures",
  processus: "#peintures",
  temoignages: "#peintures",
  faq: "#peintures",
  contact: "#contact",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const href = SECTION_TO_HREF[visible.target.id];
          if (href) setActiveHref(href);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-[350ms] ease-out ${
        scrolled
          ? "border-[rgba(180,140,80,0.12)] bg-[rgba(248,243,235,0.88)] shadow-[0_2px_16px_-6px_rgba(23,23,23,0.06)] backdrop-blur-[14px]"
          : "border-gold/15 bg-cream/95 shadow-sm shadow-charcoal/5 backdrop-blur-sm"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding] duration-[350ms] ease-out md:px-10 ${
          scrolled ? "py-2.5 md:py-2.5" : "py-3 md:py-3.5"
        }`}
      >
        <Link
          href="#accueil"
          className="group flex items-center transition-transform duration-300 ease-out animate-[logo-reveal_500ms_ease-out_both] hover:-translate-y-[1px]"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative flex items-center overflow-hidden">
            <Image
              src="/images/logo-celestattoo.png"
              alt="Célestattoo"
              width={1254}
              height={1254}
              priority
              className={`object-contain drop-shadow-[0_1px_2px_rgba(23,23,23,0.08)] transition-[filter,height,width] duration-300 ease-out group-hover:brightness-[1.04] group-hover:drop-shadow-[0_4px_10px_rgba(23,23,23,0.16)] ${
                scrolled ? "h-9 w-9 md:h-11 md:w-11" : "h-11 w-11 md:h-[52px] md:w-[52px]"
              }`}
            />
            {/* Fine golden reflection on hover — like light passing over polished metal */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold-soft/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[logo-shine_850ms_ease-out]"
            />
          </span>
          <span className="ml-3 font-heading text-xl tracking-wide text-anthracite transition-colors duration-300 ease-out group-hover:text-charcoal md:text-[26px]">
            Célestattoo
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex flex-col items-center gap-1.5 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ease-out ${
                    isActive ? "text-gold" : "text-anthracite hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`h-px w-full bg-gold transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-md bg-charcoal px-6 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-gold hover:text-charcoal lg:inline-block"
        >
          Prendre rendez-vous
        </a>

        <button
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-charcoal transition-transform ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-charcoal transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-charcoal transition-transform ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-gold/15 bg-cream transition-[max-height] duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 text-sm font-medium uppercase tracking-wide transition-colors ${
                  activeHref === link.href ? "text-gold" : "text-anthracite hover:text-gold"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block rounded-md bg-charcoal px-6 py-3 text-center text-sm font-medium tracking-wide text-cream hover:bg-gold hover:text-charcoal"
            >
              Prendre rendez-vous
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
