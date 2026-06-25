import { useEffect } from "react";

// Drives the .reveal-up / .reveal-stagger CSS (see index.css) with a single
// IntersectionObserver, so reveals run on every browser.
//
// Pass a route key so it re-scans after the SPA swaps page content. Crucially, route
// pages are code-split (React.lazy), so their content mounts a beat AFTER the route
// changes. A one-shot rAF would observe nothing and leave that content stuck hidden,
// so we also keep a MutationObserver watching for reveal elements that mount late.
export function useScrollReveal(routeKey: unknown) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // js-reveal is only set (by the inline <head> script) when motion is allowed.
    // Without it, content is already visible and there's nothing to reveal.
    if (!document.documentElement.classList.contains("js-reveal")) return;

    // Reveal via INLINE STYLES, not a class. Many of these elements live in
    // components that re-render (hover, filters, scroll-synced state); React rewrites
    // their className on every render and would wipe a JS-added class, snapping them
    // back to hidden. Inline styles survive that. (.reveal-stagger still needs the
    // class so its nth-child delays apply; its containers are static, so they're safe.)
    const reveal = (el: HTMLElement) => {
      if (el.classList.contains("reveal-stagger")) {
        el.classList.add("in-view");
      } else {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    };

    const selector = ".reveal-up, .reveal-stagger";
    const pending = (el: HTMLElement) => !el.classList.contains("in-view") && el.style.opacity !== "1";

    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let moRaf = 0;

    // Observe any not-yet-revealed elements currently in the DOM. Safe to call
    // repeatedly; re-observing an element the IO already watches is a no-op.
    const sweep = () => {
      if (!io) return;
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (pending(el)) io!.observe(el);
      });
    };

    const raf = requestAnimationFrame(() => {
      if (!("IntersectionObserver" in window)) {
        document.querySelectorAll<HTMLElement>(selector).forEach(reveal);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target as HTMLElement);
              io!.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
      );
      sweep();
      // Catch lazy / async-mounted page content as it appears (code-split routes).
      mo = new MutationObserver(() => {
        if (moRaf) return;
        moRaf = requestAnimationFrame(() => {
          moRaf = 0;
          sweep();
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (moRaf) cancelAnimationFrame(moRaf);
      mo?.disconnect();
      io?.disconnect();
    };
  }, [routeKey]);
}
