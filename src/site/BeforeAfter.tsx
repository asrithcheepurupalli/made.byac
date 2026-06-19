import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

// The made. difference, in one gesture. A draggable before→after: the same brand,
// once as a generic template, once made. by ac. Drag the handle (or it nudges
// itself on first view) — show, don't tell.

// A mock storefront card, rendered two ways. Same content, different soul.
function Card({ made }: { made: boolean }) {
  if (!made) {
    // BEFORE — generic template: system font, harsh, cramped, off-the-shelf blue.
    return (
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#ffffff", color: "#222" }} className="w-full h-full p-8 md:p-10 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between">
          <span style={{ fontWeight: 800, letterSpacing: "-0.5px" }} className="text-lg">QUICKBITES</span>
          <span style={{ color: "#888" }} className="text-[11px]">Home · Menu · Contact</span>
        </div>
        <div>
          <div style={{ fontWeight: 800, lineHeight: 1.05 }} className="text-4xl md:text-5xl">BEST FOOD IN TOWN!!</div>
          <div style={{ color: "#777" }} className="mt-3 text-sm">Order online now. Fast delivery. Good price.</div>
          <button style={{ background: "#2563eb", color: "#fff", borderRadius: 4, fontWeight: 700 }} className="mt-5 px-5 py-2.5 text-sm">ORDER NOW</button>
        </div>
        <div style={{ color: "#aaa" }} className="text-[10px]">© 2026 QuickBites. All rights reserved.</div>
      </div>
    );
  }
  // AFTER — made.: Fraunces, paper, red + gold, spacious, intentional.
  return (
    <div style={{ background: "#f6f3ee", color: "#0b0b0c" }} className="w-full h-full p-8 md:p-10 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <span className="font-display text-xl font-semibold italic tracking-tight">Quick Bites<span className="not-italic text-red">.</span></span>
        <span className="label text-[9px] text-grey">menu · story · order</span>
      </div>
      <div>
        <div className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">Coastal plates,<br /><span className="italic text-gold">unhurried.</span></div>
        <div className="mt-4 text-grey text-sm max-w-xs leading-relaxed">Bay-of-Bengal cooking, a warm room, and an order that takes ten seconds.</div>
        <a className="mt-6 inline-flex items-center gap-2 label text-[10px] rounded-full px-5 py-3 bg-red text-white">Order <span aria-hidden>→</span></a>
      </div>
      <div className="label text-[9px] text-grey">made. by ac · designed to be remembered</div>
    </div>
  );
}

export function BeforeAfter() {
  const [pct, setPct] = useState(38);
  const [hint, setHint] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPct(Math.max(2, Math.min(98, p)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && setFromClientX(e.clientX);
    const touch = (e: TouchEvent) => dragging.current && e.touches[0] && setFromClientX(e.touches[0].clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touch, { passive: true });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [setFromClientX]);

  // a gentle one-time nudge when it scrolls into view, so people know it moves
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hint) {
          setHint(false);
          let p = 38;
          const start = performance.now();
          const tick = (t: number) => {
            const e = Math.min(1, (t - start) / 1100);
            // ease out to 62, then settle back to 48
            const eased = 1 - Math.pow(1 - e, 3);
            p = 38 + Math.sin(eased * Math.PI) * 26;
            setPct(p);
            if (e < 1) requestAnimationFrame(tick);
            else setPct(50);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hint]);

  return (
    <section className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper-dim to-ink pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="reveal-up max-w-2xl">
          <span className="label text-gold">·004 / the made. difference</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">
            Drag it. Feel the<br />difference<span className="text-red">.</span>
          </h2>
          <p className="mt-6 text-grey-dim text-[15px] md:text-lg leading-relaxed">
            Same restaurant. Left, a template anyone can buy. Right, made. by ac. The gap is the whole point.
          </p>
        </div>

        {/* the comparison */}
        <div
          ref={wrapRef}
          className="reveal-up mt-12 relative w-full rounded-3xl overflow-hidden border border-ink-line select-none cursor-ew-resize aspect-[16/10] md:aspect-[16/8]"
          onMouseDown={(e) => { dragging.current = true; setHint(false); setFromClientX(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; setHint(false); e.touches[0] && setFromClientX(e.touches[0].clientX); }}
        >
          {/* AFTER fills the base */}
          <div className="absolute inset-0"><Card made /></div>
          {/* BEFORE clipped to the left of the handle */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}><Card made={false} /></div>

          {/* labels */}
          <span className="absolute top-4 left-4 label text-[9px] rounded-full px-3 py-1.5 bg-black/55 text-white backdrop-blur">before · a template</span>
          <span className="absolute top-4 right-4 label text-[9px] rounded-full px-3 py-1.5" style={{ background: "#c8102e", color: "#fff" }}>made.</span>

          {/* divider + handle */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none" style={{ left: `${pct}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-xl pointer-events-none"
            style={{ left: `${pct}%` }}
          >
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
        <p className="mt-4 label text-[9px] text-grey text-center">drag the handle ←→</p>
      </div>
    </section>
  );
}
