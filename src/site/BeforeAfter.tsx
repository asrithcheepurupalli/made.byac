import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

// The made. difference, in one gesture. A draggable before→after of the SAME storefront:
// once as an off-the-shelf template, once made. by ac. A "what changed" breakdown makes
// the gap explicit, not just felt. Show, don't tell.

// A mock storefront, rendered two ways. Same restaurant, different soul.
function Card({ made }: { made: boolean }) {
  if (!made) {
    // BEFORE — a generic template: system font, stock blue, clutter, shouting.
    return (
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#ffffff", color: "#1b1b1b" }} className="w-full h-full p-5 md:p-7 flex flex-col select-none overflow-hidden">
        <div className="flex items-center justify-between border-b-2 pb-2" style={{ borderColor: "#1b1b1b" }}>
          <span style={{ fontWeight: 800 }} className="text-base md:text-lg tracking-tight">QUICKBITES</span>
          <span style={{ color: "#0a52cc" }} className="text-[9px] md:text-[10px] font-bold">HOME | MENU | ORDER | CONTACT</span>
        </div>
        <div className="mt-2.5 flex items-center gap-1 text-[11px]" style={{ color: "#f5a623" }}>
          ★★★★★ <span style={{ color: "#888" }} className="ml-1">4.9 (2,431 reviews)</span>
        </div>
        <div style={{ fontWeight: 800, lineHeight: 1.0 }} className="mt-2.5 text-2xl md:text-4xl uppercase">Best food<br />in town!!!</div>
        <div style={{ color: "#555" }} className="mt-2 text-[11px] md:text-[13px]">Order online now. FAST DELIVERY!! Lowest prices GUARANTEED. Use code <b>SAVE10</b>.</div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5 flex-1 min-h-0">
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ background: "#e6e6e6", color: "#b0b0b0" }} className="rounded flex items-center justify-center text-[9px]">PHOTO</div>
          ))}
        </div>
        <button style={{ background: "#0a52cc", color: "#fff", fontWeight: 800 }} className="mt-2.5 py-2.5 text-xs md:text-sm rounded uppercase tracking-wide">★ Order now → ★</button>
        <div style={{ color: "#9a9a9a" }} className="mt-2 text-[9px]">© 2026 QuickBites. Site built with TemplateCo.</div>
      </div>
    );
  }
  // AFTER — made.: Fraunces, warm paper, one red, an editorial voice, room to breathe.
  return (
    <div style={{ background: "#f6f3ee", color: "#0b0b0c" }} className="relative w-full h-full p-6 md:p-10 flex flex-col justify-between select-none overflow-hidden">
      <div aria-hidden className="absolute -right-24 -top-24 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,132,47,0.16), transparent 70%)" }} />
      <div className="relative flex items-center justify-between">
        <span className="font-display text-xl md:text-2xl font-semibold italic tracking-tight">Quick Bites<span className="not-italic" style={{ color: "#c8102e" }}>.</span></span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: "#6f6a62" }}>menu · story · order</span>
      </div>
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#a8842f" }}>now serving</span>
        <div className="mt-3 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">Coastal plates,<br /><span className="italic" style={{ color: "#a8842f" }}>unhurried.</span></div>
        <p className="mt-4 text-sm max-w-sm leading-relaxed" style={{ color: "#56514a" }}>Bay-of-Bengal cooking, a warm room, and an order that takes ten seconds.</p>
        <div className="mt-5 flex items-center gap-3">
          <span style={{ background: "#c8102e", color: "#fff" }} className="rounded-full px-5 py-2.5 text-[11px] font-semibold inline-flex items-center gap-1.5">Order <span aria-hidden>→</span></span>
          <span className="flex gap-1.5">
            {["#0b0b0c", "#c8102e", "#a8842f", "#e7ddcb"].map((c) => (
              <span key={c} className="w-4 h-4 rounded-full" style={{ background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
            ))}
          </span>
        </div>
      </div>
      <div className="relative font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: "#6f6a62" }}>made. by ac · designed to be remembered</div>
    </div>
  );
}

const DIFFS: [string, string, string][] = [
  ["Type", "Arial, off the shelf", "Fraunces, chosen for the story"],
  ["Colour", "a stock template blue", "one considered red, used once"],
  ["Voice", "BEST FOOD IN TOWN!!!", "an editorial line worth reading"],
  ["Space", "crammed to fill the page", "composed, with room to breathe"],
];

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
          const start = performance.now();
          const tick = (t: number) => {
            const e = Math.min(1, (t - start) / 1100);
            const eased = 1 - Math.pow(1 - e, 3);
            setPct(38 + Math.sin(eased * Math.PI) * 26);
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
    <section data-nav-dark className="relative bg-ink text-paper py-28 md:py-32 overflow-hidden">
      {/* ProblemPicker above is also ink, so no seam (a paper-to-ink seam here left a
          bright band between two dark sections after LiveCompose was removed) */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="reveal-up max-w-2xl">
          <span className="label text-gold">·003 / the made. difference</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">
            Drag it. Feel the<br />difference<span className="text-red">.</span>
          </h2>
          <p className="mt-6 text-grey-dim text-[15px] md:text-lg leading-relaxed">
            The same restaurant, built twice. On the left, a template anyone can buy. On the right, made. by ac. Drag the handle, then read what actually changed.
          </p>
        </div>

        {/* the comparison */}
        <div
          ref={wrapRef}
          className="reveal-up mt-12 relative w-full rounded-3xl overflow-hidden border border-ink-line select-none cursor-ew-resize aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/8] shadow-2xl"
          onMouseDown={(e) => { dragging.current = true; setHint(false); setFromClientX(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; setHint(false); e.touches[0] && setFromClientX(e.touches[0].clientX); }}
        >
          {/* AFTER fills the base */}
          <div className="absolute inset-0"><Card made /></div>
          {/* BEFORE clipped to the left of the handle */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}><Card made={false} /></div>

          {/* labels */}
          <span className="absolute top-4 left-4 label text-[9px] rounded-full px-3 py-1.5 bg-black/55 text-white backdrop-blur z-10">before · a template</span>
          <span className="absolute top-4 right-4 label text-[9px] rounded-full px-3 py-1.5 z-10" style={{ background: "#c8102e", color: "#fff" }}>made.</span>

          {/* divider + handle */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none z-10" style={{ left: `${pct}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-xl pointer-events-none z-10 ring-4 ring-white/25"
            style={{ left: `${pct}%` }}
          >
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
        <p className="mt-4 label text-[9px] text-grey text-center">drag the handle ←→</p>

        {/* what actually changed */}
        <div className="reveal-up mt-12 md:mt-16">
          <span className="label text-grey-dim">What changed</span>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-line border border-ink-line rounded-2xl overflow-hidden">
            {DIFFS.map(([dim, before, after]) => (
              <div key={dim} className="bg-ink p-6 flex flex-col gap-3">
                <span className="label text-[9px] text-gold">{dim}</span>
                <span className="text-[13px] leading-snug text-grey-dim line-through decoration-grey-dim/40">{before}</span>
                <span className="text-[15px] leading-snug text-paper">{after}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
