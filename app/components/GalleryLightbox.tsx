"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  /** Small, discreet secondary line shown under the title (e.g. "Œuvre originale") */
  subtitle?: string;
  width: number;
  height: number;
}

interface GalleryLightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const TRANSITION_MS = 260;

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  // Keep the dialog mounted (and the last-viewed item) for the duration of
  // the closing transition, since React would otherwise unmount instantly.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);

  // Derived-state adjustments done during render (React's recommended
  // alternative to setState-in-effect for "respond to a changed prop").
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  if (index !== prevIndex) {
    setPrevIndex(index);
    if (index !== null) setDisplayIndex(index);
  }

  const [prevIsOpen, setPrevIsOpen] = useState(false);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setMounted(true);
    } else {
      setVisible(false);
    }
  }

  // Genuinely async work (a frame/timer tick) belongs in an effect.
  useEffect(() => {
    if (isOpen && mounted) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen && mounted) {
      const timeout = setTimeout(() => setMounted(false), TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, mounted]);

  const current = displayIndex !== null ? items[displayIndex] : null;

  const goPrev = () => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  };

  const goNext = () => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  if (!mounted || !current) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/95 px-4 py-10 backdrop-blur-md transition-opacity duration-[260ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={current.title ?? current.alt}
        className={`relative flex max-h-full w-full max-w-5xl flex-col items-center transition-all duration-[260ms] ease-out ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.96] opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:-top-3 sm:right-[-3.25rem]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative flex max-h-[75vh] w-full items-center justify-center sm:max-h-[80vh]">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="90vw"
            className="max-h-[75vh] w-auto rounded-lg border border-gold/20 object-contain shadow-2xl shadow-charcoal/50 sm:max-h-[80vh]"
          />
        </div>

        {current.title && (
          <div className="mt-5 flex flex-col items-center gap-1 text-center">
            <p className="font-heading text-xl text-cream sm:text-2xl">{current.title}</p>
            {current.subtitle && (
              <p className="text-[11px] uppercase tracking-[0.25em] text-cream/55">
                {current.subtitle}
              </p>
            )}
          </div>
        )}

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Œuvre précédente"
              className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-charcoal/40 text-cream/80 opacity-80 transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-charcoal/60 hover:text-cream hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:-translate-x-14"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Œuvre suivante"
              className="absolute right-0 top-1/2 z-10 flex h-11 w-11 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-charcoal/40 text-cream/80 opacity-80 transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-charcoal/60 hover:text-cream hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:translate-x-14"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
