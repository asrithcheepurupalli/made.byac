import { useEffect } from "react";
import type Lenis from "lenis";

// Light smooth scrolling for desktop wheels and trackpads.
//
// The old setup ran a requestAnimationFrame loop forever and used a slow, floaty curve,
// which read as lag. This version:
//  - uses a quick lerp, so the page settles in a fraction of a second,
//  - runs its frame loop only while a scroll is actually happening, then sleeps,
//  - stays off touch devices (native momentum is better there) and under reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // A/B switch for comparing feel: add ?scroll=native to any URL to use plain browser scrolling.
    try { if (new URLSearchParams(window.location.search).get("scroll") === "native") return; } catch { /* ignore */ }

    // Lenis loads after first paint; it is only needed once someone scrolls.
    let cleanup = () => {};
    let dead = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (dead) return;
      cleanup = start(LenisCtor);
    });
    return () => { dead = true; cleanup(); };

    function start(LenisCtor: typeof Lenis) {
    const lenis = new LenisCtor({
      lerp: 0.2,          // higher = snappier; the old duration/easing felt slow
      smoothWheel: true,
      wheelMultiplier: 1,
      anchors: true,
      autoRaf: false,     // we drive frames ourselves, only when needed
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    let quiet = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      quiet = lenis.isScrolling ? 0 : quiet + 1;
      raf = quiet > 20 ? 0 : requestAnimationFrame(loop); // sleep ~⅓s after it settles
    };
    const wake = () => {
      quiet = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    // anything that can start a scroll wakes the loop
    window.addEventListener("wheel", wake, { passive: true });
    window.addEventListener("keydown", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    const scrollTo = lenis.scrollTo.bind(lenis);
    lenis.scrollTo = ((...args: Parameters<Lenis["scrollTo"]>) => {
      wake();
      return scrollTo(...args);
    }) as Lenis["scrollTo"];
    wake();

    return () => {
      window.removeEventListener("wheel", wake);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("resize", wake);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
    }
  }, []);

  return null;
}
