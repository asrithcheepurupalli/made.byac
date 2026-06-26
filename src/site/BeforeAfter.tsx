import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

// The made. difference, in one gesture. Drag a cheap template into the full made.
// treatment: not a prettier page, a whole brand system (identity, voice, palette,
// type, surfaces). The scope grid below spells out everything we actually deliver.

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
  // AFTER — made.: a whole brand system, not a page. Identity, voice, palette, type, surfaces.
  const cell = "rounded-lg p-3 md:p-4 flex flex-col";
  const lbl = "font-mono text-[7px] md:text-[8px] uppercase tracking-[0.16em]";
  return (
    <div style={{ background: "#f6f3ee", color: "#0b0b0c" }} className="relative w-full h-full p-5 md:p-7 flex flex-col select-none overflow-hidden">
      <div aria-hidden className="absolute -right-24 -top-24 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,132,47,0.16), transparent 70%)" }} />
      {/* identity */}
      <div className="relative flex items-center justify-between">
        <span className="font-display text-xl md:text-3xl font-semibold italic tracking-tight">Quick Bites<span className="not-italic" style={{ color: "#c8102e" }}>.</span></span>
        <span className={lbl} style={{ color: "#a8842f" }}>a complete brand</span>
      </div>
      {/* voice */}
      <div className="relative mt-3 md:mt-4">
        <span className={lbl} style={{ color: "#a8842f" }}>Voice</span>
        <div className="mt-1 font-display text-2xl md:text-4xl leading-[0.98] tracking-[-0.02em]">Coastal plates, <span className="italic" style={{ color: "#a8842f" }}>unhurried.</span></div>
      </div>
      {/* system: palette / type / surface */}
      <div className="relative mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3 flex-1 min-h-0">
        <div className={cell} style={{ border: "1px solid #e2dccf" }}>
          <span className={lbl} style={{ color: "#6f6a62" }}>Palette</span>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {["#0b0b0c", "#c8102e", "#a8842f", "#16323a", "#e7ddcb"].map((c) => (
              <span key={c} className="w-4 h-4 md:w-6 md:h-6 rounded" style={{ background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
            ))}
          </div>
        </div>
        <div className={cell} style={{ border: "1px solid #e2dccf" }}>
          <span className={lbl} style={{ color: "#6f6a62" }}>Type</span>
          <div className="mt-auto">
            <span className="font-display text-3xl md:text-5xl leading-none">Aa</span>
            <div className="text-[8px] md:text-[10px] mt-1" style={{ color: "#6f6a62" }}>Fraunces · Hanken</div>
          </div>
        </div>
        <div className={cell} style={{ border: "1px solid #e2dccf" }}>
          <span className={lbl} style={{ color: "#6f6a62" }}>Website</span>
          <div className="mt-auto rounded p-2 flex flex-col justify-between min-h-[44px] md:min-h-[64px]" style={{ background: "#0b0b0c" }}>
            <span className="font-display italic text-[9px] md:text-[11px]" style={{ color: "#f6f3ee" }}>Quick Bites<span style={{ color: "#c8102e" }}>.</span></span>
            <span className="font-display text-[11px] md:text-[15px] leading-none" style={{ color: "#f6f3ee" }}>Coastal plates.</span>
            <span className="mt-1 inline-block w-9 h-1.5 rounded-full" style={{ background: "#c8102e" }} />
          </div>
        </div>
      </div>
      {/* what's in the box */}
      <div className={`relative mt-3 ${lbl}`} style={{ color: "#6f6a62" }}>Identity · Website · App · Motion · Voice · System</div>
    </div>
  );
}

// Everything made. actually delivers — the scope, in words.
const SCOPE: [string, string][] = [
  ["Identity", "A wordmark, marks and a visual signature, not a clip-art logo."],
  ["Website", "Designed and built by us, end to end. Never a template."],
  ["Product & app", "Ordering, dashboards, the things your customers actually use."],
  ["Motion", "How it moves, not just how it sits. Considered, never showy."],
  ["Voice & copy", "Words worth reading, in a tone that is unmistakably yours."],
  ["A living system", "Tokens and rules, so the brand stays itself on every screen."],
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
    setPct(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
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
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="reveal-up max-w-2xl">
          <span className="label text-gold">·003 / the made. difference</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">
            Drag it. Feel the<br />difference<span className="text-red">.</span>
          </h2>
          <p className="mt-6 text-grey-dim text-[15px] md:text-lg leading-relaxed">
            The same restaurant, built twice. On the left, a template anyone can buy. On the right, the full made. treatment, a whole brand system. Drag the handle, then see everything that comes with it.
          </p>
        </div>

        {/* the comparison */}
        <div
          ref={wrapRef}
          className="reveal-up group mt-12 relative w-full rounded-3xl overflow-hidden border border-ink-line select-none cursor-ew-resize active:cursor-grabbing aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/8] shadow-2xl"
          onMouseDown={(e) => { dragging.current = true; setHint(false); setFromClientX(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; setHint(false); e.touches[0] && setFromClientX(e.touches[0].clientX); }}
        >
          <div className="absolute inset-0"><Card made /></div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}><Card made={false} /></div>

          <span className="absolute top-4 left-4 label text-[9px] rounded-full px-3 py-1.5 bg-black/55 text-white backdrop-blur z-10">before · a template</span>
          <span className="absolute top-4 right-4 label text-[9px] rounded-full px-3 py-1.5 z-10" style={{ background: "#c8102e", color: "#fff" }}>made. · a whole brand</span>

          <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none z-10" style={{ left: `${pct}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-xl pointer-events-none z-10 ring-4 ring-white/25 transition-[transform,box-shadow] duration-200 group-hover:scale-105 group-active:scale-110 group-active:ring-white/50" style={{ left: `${pct}%` }}>
            <MoveHorizontal className="w-5 h-5 transition-transform duration-200 group-active:scale-90" />
          </div>
        </div>
        <p className="mt-4 label text-[9px] text-grey text-center">drag the handle ←→</p>

        {/* what made. actually delivers */}
        <div className="reveal-up mt-14 md:mt-20">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">Not a page. Everything.</h3>
            <span className="label text-grey-dim hidden sm:block">what comes with made.</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-line border border-ink-line rounded-2xl overflow-hidden">
            {SCOPE.map(([t, d], i) => (
              <div key={t} className="group bg-ink p-6 md:p-7 flex flex-col gap-3 transition-colors duration-300 hover:bg-ink-soft">
                <span className="font-mono text-sm text-gold transition-colors group-hover:text-red">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="font-display text-xl md:text-2xl leading-tight">{t}</h4>
                <p className="text-[14px] leading-relaxed text-grey-dim">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
