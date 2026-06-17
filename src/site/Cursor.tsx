import { useEffect } from "react";

// The made. cursor — our signature pointer.
//  • a precise dot that tracks 1:1
//  • a ring that eases behind it (liquid lag) + a fainter trailing ring
//  • over an interactive element: the ring morphs into a brand-red disc that
//    magnetises toward small targets and shows a contextual label (data-cursor),
//    or a clean white brand dot when there's no label
//  • over a work item (data-cursor-img): floats that project's thumbnail,
//    velocity-skewed, instead of the disc
//
// Desktop / fine-pointer only; fully off under reduced motion (gated in CSS).
const HOT = 'a, button, [role="button"], summary, [data-cursor], [data-cursor-img]';
const EASE = 0.2; // ring follow
const TRAIL_EASE = 0.12; // trailing ring + image
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
    const imgWrap = document.createElement("div");
    const img = document.createElement("img");
    trail.className = "mc-trail mc-idle";
    ring.className = "mc-ring mc-idle";
    label.className = "mc-label";
    dot.className = "mc-dot mc-idle";
    imgWrap.className = "mc-imgwrap";
    img.className = "mc-img";
    img.alt = "";
    ring.appendChild(label);
    imgWrap.appendChild(img);
    document.body.append(trail, ring, dot, imgWrap);
    document.documentElement.classList.add("has-cursor");

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      pmx = mx; // previous x (for velocity skew)
    let tx = mx,
      ty = my; // ring target
    let rx = mx,
      ry = my; // ring eased
    let lx = mx,
      ly = my; // trail + image eased
    let imgOn = false;
    let started = false;
    let raf = 0;

    const loop = () => {
      rx += (tx - rx) * EASE;
      ry += (ty - ry) * EASE;
      lx += (mx - lx) * TRAIL_EASE;
      ly += (my - ly) * TRAIL_EASE;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      trail.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      if (imgOn) {
        const skew = Math.max(-14, Math.min(14, (mx - pmx) * 0.6));
        imgWrap.style.transform = `translate3d(${lx}px, ${ly}px, 0) rotate(${skew}deg)`;
      }
      pmx = mx;
      raf = requestAnimationFrame(loop);
    };

    const setImg = (on: boolean, src?: string) => {
      if (on && src) {
        if (img.getAttribute("src") !== src) img.src = src;
        img.classList.add("show");
        imgOn = true;
        ring.classList.add("imgmode");
        dot.classList.add("imgmode");
        trail.classList.add("imgmode");
      } else {
        img.classList.remove("show");
        imgOn = false;
        ring.classList.remove("imgmode");
        dot.classList.remove("imgmode");
        trail.classList.remove("imgmode");
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        [dot, ring, trail].forEach((el) => el.classList.remove("mc-idle"));
      }
      const el = (e.target as Element | null)?.closest(HOT) as HTMLElement | null;
      if (!el) {
        ring.classList.remove("hot", "plain");
        dot.classList.remove("hot");
        trail.classList.remove("hot");
        setImg(false);
        tx = mx;
        ty = my;
        return;
      }
      const imgSrc = el.dataset.cursorImg;
      if (imgSrc) {
        setImg(true, imgSrc);
        ring.classList.remove("hot", "plain");
        dot.classList.remove("hot");
        trail.classList.remove("hot");
        tx = mx;
        ty = my;
        return;
      }
      setImg(false);
      const text = el.dataset.cursor || "";
      const plain = !text;
      ring.classList.add("hot");
      trail.classList.add("hot");
      label.textContent = text;
      ring.classList.toggle("plain", plain);
      // hide the precise dot only for the labelled red disc; keep it for the
      // plain outline-ring state so there's still an exact pointer
      dot.classList.toggle("hot", !plain);
      // magnetise toward small targets; large cards just follow the pointer
      const r = el.getBoundingClientRect();
      if (r.width <= 280 && r.height <= 140) {
        tx = mx + (r.left + r.width / 2 - mx) * MAGNET;
        ty = my + (r.top + r.height / 2 - my) * MAGNET;
      } else {
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
    document.addEventListener("mouseleave", () => {
      setIdle(true);
      setImg(false);
    });
    document.addEventListener("mouseenter", () => setIdle(false));
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      [trail, ring, dot, imgWrap].forEach((el) => el.remove());
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
