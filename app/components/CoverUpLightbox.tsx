"use client";

import { useEffect, useRef, useState } from "react";
import type { CoverUpPair } from "@/app/data/gallery";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface CoverUpLightboxProps {
  items: CoverUpPair[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const TRANSITION_MS = 260;

export default function CoverUpLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: CoverUpLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  // Keep the dialog mounted (and the last-viewed pair) for the duration of
  // the closing transition, since React would otherwise unmount instantly.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);

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
      {/* Close button — anchored to the window, never to the image */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Fermer la galerie"
        className="absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-charcoal/50 text-cream transition-colors hover:border-gold hover:bg-charcoal/70 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:top-6 sm:right-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Transformation précédente"
            className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-charcoal/40 text-cream/80 opacity-80 transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-charcoal/60 hover:text-cream hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Transformation suivante"
            className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-charcoal/40 text-cream/80 opacity-80 transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-charcoal/60 hover:text-cream hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${current.title} — comparaison avant et après`}
        className={`relative flex max-h-full w-full max-w-4xl flex-col items-center transition-all duration-[260ms] ease-out ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.96] opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <BeforeAfterSlider
          title={current.title}
          note={current.note}
          before={current.before}
          after={current.after}
          imageFit="contain"
          beforeObjectPosition={current.beforeObjectPosition}
          afterObjectPosition={current.afterObjectPosition}
          sizes="90vw"
          autoFit
          frameClassName="rounded-lg border border-gold/20 bg-anthracite shadow-2xl shadow-charcoal/50"
        />
      </div>
    </div>
  );
}
