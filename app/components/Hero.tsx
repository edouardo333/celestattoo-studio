import Image from "next/image";
import { Award, MapPin, Brush } from "lucide-react";
import { FACEBOOK_URL } from "@/app/lib/constants";

const stats = [
  { Icon: Award, value: "15+", label: "Années d'expérience" },
  { Icon: MapPin, value: "Thetford Mines", label: "Québec" },
  { Icon: Brush, value: "Créations", label: "100% personnalisées" },
];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-[76px] pb-16 md:min-h-screen md:pt-[88px]"
    >
      {/* Extremely subtle paper-grain texture — purely decorative, never conscious */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-12">
        {/* Text column */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <div
            className="group relative mb-8 flex animate-[logo-reveal_500ms_ease-out_both] items-center overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-[1px]"
            style={{ animationDelay: "0ms" }}
          >
            <Image
              src="/images/logo-celestattoo.png"
              alt="Célestattoo"
              width={1254}
              height={1254}
              className="h-auto w-[220px] object-contain drop-shadow-[0_1px_2px_rgba(23,23,23,0.08)] transition-[filter] duration-300 ease-out group-hover:brightness-[1.04] group-hover:drop-shadow-[0_4px_10px_rgba(23,23,23,0.16)] sm:w-[260px] lg:w-[340px]"
            />
            {/* Fine golden reflection on hover — same treatment as the header logo */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold-soft/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[logo-shine_850ms_ease-out]"
            />
          </div>

          <h1
            className="animate-fade-in-up font-heading text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            L&apos;art prend vie,
            <br />
            <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text italic text-transparent">
              de la toile à la peau.
            </span>
          </h1>

          <p
            className="animate-fade-in-up mt-6 max-w-md text-base leading-relaxed text-anthracite"
            style={{ animationDelay: "160ms" }}
          >
            À travers le tatouage et la peinture, Lucy transforme chaque idée
            en une œuvre personnelle, expressive et conçue pour traverser le
            temps.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#tatouages"
              className="animate-fade-in-up rounded-md bg-charcoal px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-all duration-[350ms] ease-out hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal hover:shadow-lg hover:shadow-charcoal/20"
              style={{ animationDelay: "240ms" }}
            >
              Découvrir les tatouages
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-in-up rounded-md border border-anthracite px-7 py-3.5 text-sm font-medium tracking-wide text-anthracite transition-all duration-[350ms] ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-charcoal/10"
              style={{ animationDelay: "320ms" }}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Premium stat cards */}
          <div
            className="animate-fade-in-up mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
            style={{ animationDelay: "400ms" }}
          >
            {stats.map(({ Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-beige bg-white/50 px-5 py-4 text-center shadow-[0_2px_12px_-4px_rgba(23,23,23,0.06)] transition-all duration-[350ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(23,23,23,0.14)] lg:items-start lg:text-left"
              >
                <Icon className="h-5 w-5 text-[#C9A46A]" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-anthracite">{value}</p>
                  <p className="text-xs text-anthracite/70">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Signature phrase */}
          <p
            className="animate-fade-in-up mt-6 w-full text-center text-sm text-anthracite/60 lg:text-left"
            style={{ animationDelay: "480ms" }}
          >
            Chaque création est pensée pour durer toute une vie.
          </p>
        </div>

        {/* Visual composition column */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div
            className="group relative h-[420px] w-[280px] animate-fade-in-up sm:h-[520px] sm:w-[340px] lg:h-[600px] lg:w-[390px]"
            style={{ animationDelay: "150ms", animationDuration: "700ms" }}
          >
            {/* Organic, diffuse halo — soft natural light rather than a geometric glow */}
            <div className="absolute -inset-10 -z-10 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-gold-soft/15 blur-[60px]" />

            {/* Beige arch behind the portrait */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[200px] rounded-b-3xl bg-beige" />

            {/* Soft watercolor textures */}
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gold-soft/25 blur-3xl" />
            <div className="absolute -bottom-8 -right-6 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />

            {/* Portrait */}
            <div className="absolute inset-0 overflow-hidden rounded-t-[200px] rounded-b-3xl border border-beige shadow-[0_10px_15px_-6px_rgba(23,23,23,0.12),0_30px_70px_-20px_rgba(23,23,23,0.25)] transition-shadow duration-[350ms] ease-out lg:group-hover:shadow-[0_14px_20px_-6px_rgba(23,23,23,0.16),0_40px_90px_-18px_rgba(23,23,23,0.32)]">
              <Image
                src="/images/photo-lucy-hero.jpg"
                alt="Lucy Célestattoo, artiste tatoueuse et peintre"
                width={698}
                height={891}
                priority
                className="h-full w-full object-cover object-[50%_50%] transition-transform duration-[350ms] ease-out lg:group-hover:scale-[1.02]"
              />
            </div>

            {/* Thin gold ring accent */}
            <div className="absolute -bottom-6 -left-8 h-28 w-28 rounded-full border border-gold/60 sm:h-32 sm:w-32" />
          </div>
        </div>
      </div>

      {/* Scroll indicator — small bouncing dot within a minimal pill, Apple-style */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-anthracite/50">
          Défiler
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-gold/40 pt-1.5">
          <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-gold" />
        </span>
      </div>

      {/* Elegant threshold before the next section */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:w-64" />
      </div>
    </section>
  );
}
