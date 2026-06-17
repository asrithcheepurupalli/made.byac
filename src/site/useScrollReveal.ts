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

    // Reveal via INLINE STYLES, not a class. Many of these elements live in
    // components that re-render (hover, filters, scroll-synced state); React
    // rewrites their className on every render and would wipe a JS-added class,
    // snapping them back to hidden. Inline styles survive that. (.reveal-stagger
    // still needs the class so its nth-child child delays apply — its containers
    // are static, so they're safe.)
    const reveal = (el: HTMLElement) => {
      if (el.classList.contains("reveal-clip")) {
        el.style.clipPath = "inset(0 0 0 0)";
        el.style.transform = "none";
      } else if (el.classList.contains("reveal-stagger")) {
        el.classList.add("in-view");
      } else {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    };

    const selector = ".reveal-up, .reveal-stagger, .reveal-clip";
    const collect = () =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.classList.contains("in-view") && el.style.opacity !== "1" && !el.style.clipPath,
      );

    // Let the freshly-rendered route paint before we query + observe.
    const raf = requestAnimationFrame(() => {
      const els = collect();
      if (!("IntersectionObserver" in window)) {
        els.forEach(reveal);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target as HTMLElement);
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
