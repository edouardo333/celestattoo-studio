"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

// Runs synchronously before the browser's first paint on the client, and is
// a no-op during SSR (avoiding React's "useLayoutEffect does nothing on the
// server" warning). Resolved once at module load, not per render.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SAFETY_TIMEOUT_MS = 1000;

// threshold: 0 + a small negative bottom rootMargin fires as soon as any
// part of the target enters the viewport, regardless of the target's total
// height. A higher threshold (e.g. 0.1) requires that fraction of the
// target's full area to be on-screen at once — for a target much taller
// than the viewport (a single-column mobile masonry gallery can easily be
// 10x+ the viewport height) that area is never reachable, so the callback
// never fires at all.
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "0px 0px -5% 0px",
};

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

/**
 * Powers every scroll-reveal section on the site. Fixes a real iOS Safari
 * bug where a tall element (the mobile paintings masonry, stacked to a
 * single column) could exceed the IntersectionObserver threshold and never
 * report as intersecting — leaving the whole section stuck at opacity:0
 * forever while still occupying its full layout height.
 *
 * Content is never solely dependent on JS to become visible:
 *  - the "hidden, about to animate" state is only armed client-side, via a
 *    pre-paint layout effect — server-rendered (and no-JS) markup always
 *    renders fully visible, with no reveal classes applied at all;
 *  - if prefers-reduced-motion is set, or IntersectionObserver isn't
 *    supported, the section stays visible with no animation;
 *  - otherwise a ~1s safety timeout guarantees the section becomes visible
 *    even if the observer never fires for any reason.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useIsomorphicLayoutEffect(() => {
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || prefersReducedMotion) return;

    const node = ref.current;
    if (!node || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setIsRevealed(true);
    };

    const safetyTimer = window.setTimeout(reveal, SAFETY_TIMEOUT_MS);

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal();
    }, OBSERVER_OPTIONS);

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyTimer);
    };
  }, [armed, prefersReducedMotion]);

  return {
    ref,
    isRevealed,
    // Before the section is "armed" (first client paint), report
    // reducedMotion=true so every caller's reveal()/revealStyle() helper
    // renders fully visible, un-animated markup — matching the server HTML
    // exactly, with zero flash and zero dependency on JS to be visible.
    reducedMotion: !armed || prefersReducedMotion,
  };
}
