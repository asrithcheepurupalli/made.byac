import { useEffect } from "react";

// Magnetic elements: anything tagged [data-magnetic] leans toward the cursor as
// it approaches, then springs back. Pairs with the custom cursor. Desktop /
// fine-pointer only, off under reduced motion. Re-binds per route (els change).
const RADIUS = 90; // how far beyond the element the pull begins
const STRENGTH = 0.3; // how far it leans (fraction of cursor offset)

export function useMagnetic(routeKey: unknown) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      if (!els.length) return;
      const onMove = (e: MouseEvent) => {
        for (const el of els) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          if (Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + RADIUS) {
            el.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
          } else if (el.style.transform) {
            el.style.transform = "";
          }
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        els.forEach((el) => (el.style.transform = ""));
      };
    });

    let cleanup = () => {};
    return () => {
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [routeKey]);
}
