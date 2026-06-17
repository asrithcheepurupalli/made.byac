import { useEffect } from "react";

// The made. cursor — our signature pointer.
//  • a precise dot that tracks 1:1
//  • a ring that eases behind it (liquid lag) + a fainter trailing ring
//  • over anything interactive: the ring morphs into a brand-red disc, shows a
//    contextual label, and *magnetises* toward small targets (buttons/links)
//
// Label is read from data-cursor on the element (or an ancestor); links/buttons
// without one get a ↗. Desktop / fine-pointer only; fully off under reduced
// motion (both gated in CSS). To retune: tweak EASE / TRAIL_EASE / MAGNET below.
const HOT = 'a, button, [role="button"], summary, [data-cursor]';
const EASE = 0.2; // ring follow (higher = snappier)
const TRAIL_EASE = 0.12; // trailing ring (lower = longer tail)
const MAGNET = 0.45; // pull toward a small target's centre

export function Cursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const trail = document.createElement("div");
    const ring = document.createElement("div");
    const label = document.createElement("span");
    const dot = document.createElement("div");
    trail.className = "mc-trail mc-idle";
    ring.className = "mc-ring mc-idle";
    label.className = "mc-label";
    dot.className = "mc-dot mc-idle";
    ring.appendChild(label);
    document.body.append(trail, ring, dot);
    document.documentElement.classList.add("has-cursor");

    let mx = innerWidth / 2,
      my = innerHeight / 2; // raw pointer
    let tx = mx,
      ty = my; // ring target (pointer, or magnetised toward a target centre)
    let rx = mx,
      ry = my; // ring eased position
    let lx = mx,
      ly = my; // trail eased position
    let started = false;
    let raf = 0;

    const setT = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const loop = () => {
      rx += (tx - rx) * EASE;
      ry += (ty - ry) * EASE;
      lx += (tx - lx) * TRAIL_EASE;
      ly += (ty - ly) * TRAIL_EASE;
      setT(dot, mx, my);
      setT(ring, rx, ry);
      setT(trail, lx, ly);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        [dot, ring, trail].forEach((el) => el.classList.remove("mc-idle"));
      }
      const el = (e.target as Element | null)?.closest(HOT) as HTMLElement | null;
      if (el) {
        ring.classList.add("hot");
        dot.classList.add("hot");
        trail.classList.add("hot");
        label.textContent = el.dataset.cursor || "↗";
        // magnetise toward small targets; large cards just follow the pointer
        const r = el.getBoundingClientRect();
        const small = r.width <= 280 && r.height <= 140;
        if (small) {
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          tx = mx + (cx - mx) * MAGNET;
          ty = my + (cy - my) * MAGNET;
        } else {
          tx = mx;
          ty = my;
        }
      } else {
        ring.classList.remove("hot");
        dot.classList.remove("hot");
        trail.classList.remove("hot");
        tx = mx;
        ty = my;
      }
    };
    const onDown = () => ring.classList.add("down");
    const onUp = () => ring.classList.remove("down");
    const setIdle = (idle: boolean) =>
      [dot, ring, trail].forEach((el) => el.classList.toggle("mc-idle", idle));

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", () => setIdle(true));
    document.addEventListener("mouseenter", () => setIdle(false));
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      trail.remove();
      ring.remove();
      dot.remove();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
