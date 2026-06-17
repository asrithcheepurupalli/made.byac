import { useEffect } from "react";

// A restrained custom cursor: a small dot that tracks the pointer 1:1 and a ring
// that eases behind it, growing over anything interactive. Desktop / fine-pointer
// only, and fully disabled under reduced motion (both gated in CSS). Easy to
// remove — delete this component + its mount in Site.tsx and the cursor CSS block.
export function Cursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot cursor-idle";
    ring.className = "cursor-ring cursor-idle";
    document.body.append(dot, ring);
    document.documentElement.classList.add("has-cursor");

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;
    let started = false;

    const loop = () => {
      // ring eases toward the pointer; dot is pinned exactly to it
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      raf = requestAnimationFrame(loop);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest('a, button, [role="button"], input, textarea, label, select, summary');

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        dot.classList.remove("cursor-idle");
        ring.classList.remove("cursor-idle");
      }
      const hot = isInteractive(e.target);
      ring.classList.toggle("cursor-hot", hot);
    };
    const onDown = () => ring.classList.add("cursor-down");
    const onUp = () => ring.classList.remove("cursor-down");
    const onLeave = () => {
      dot.classList.add("cursor-idle");
      ring.classList.add("cursor-idle");
    };
    const onEnter = () => {
      dot.classList.remove("cursor-idle");
      ring.classList.remove("cursor-idle");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
