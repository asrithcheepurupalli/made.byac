import { useEffect } from "react";

// Drives the .reveal-up / .reveal-stagger CSS (see index.css) with a single
// IntersectionObserver, so reveals run on every browser — unlike the old
// animation-timeline approach, which only ran on Chromium + Safari 26+.
//
// Pass a route key so it re-scans after the SPA swaps page content. Elements
// already on screen at mount are revealed on the observer's first callback
// (next frame), which reads as a clean entrance rather than a flash.
export function useScrollReveal(routeKey: unknown) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // js-reveal is only set (by the inline <head> script) when motion is allowed.
    // Without it, content is already visible and there's nothing to reveal.
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const selector = ".reveal-up, .reveal-stagger";
    const collect = () =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.classList.contains("in-view"),
      );

    // Let the freshly-rendered route paint before we query + observe.
    const raf = requestAnimationFrame(() => {
      const els = collect();
      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("in-view"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
      );
      els.forEach((el) => io.observe(el));
      cleanup = () => io.disconnect();
    });

    let cleanup = () => {};
    return () => {
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [routeKey]);
}
