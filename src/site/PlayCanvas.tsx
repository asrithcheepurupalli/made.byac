import { useEffect, useRef, useState } from "react";

// A playful grid above the footer. Graph paper filled with our signature dot. Tap any
// cell to paint it; tap again to cycle the colour; once more to clear. A few dots are
// seeded so the canvas is alive before you touch it. Brand expression + a small joy.
const COLORS = ["#c8102e", "#bd9b4e", "#3aa655", "#2f6df0", "#8b5cf6", "#e8702a"];
const CELL = 46; // target cell size in px
const ROWS = 12;

export function PlayCanvas({ word = "made", dotColor = "#c8102e" }: { word?: string; dotColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(28);
  const [cells, setCells] = useState<Record<number, number>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setCols(Math.max(7, Math.floor(el.clientWidth / CELL)));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // seed a scatter of dots once we know the grid size
  useEffect(() => {
    const total = cols * ROWS;
    const seeded: Record<number, number> = {};
    const n = Math.max(6, Math.round(total * 0.04));
    for (let i = 0; i < n; i++) {
      seeded[Math.floor(Math.random() * total)] = Math.floor(Math.random() * COLORS.length);
    }
    setCells(seeded);
  }, [cols]);

  const paint = (i: number) =>
    setCells((c) => {
      const next = c[i] === undefined ? 0 : c[i] + 1;
      const out = { ...c };
      if (next >= COLORS.length) delete out[i];
      else out[i] = next;
      return out;
    });

  const total = cols * ROWS;

  return (
    <section className="relative overflow-hidden bg-paper border-t border-paper-line" aria-hidden>
      <style>{`@keyframes pc-pop{0%{transform:scale(.2);opacity:0}60%{transform:scale(1.18)}100%{transform:scale(1);opacity:1}}@media(prefers-reduced-motion:reduce){.pc-dot{animation:none!important}}`}</style>
      <div
        ref={ref}
        className="grid border-l border-t border-paper-line"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: `${CELL}px` }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const ci = cells[i];
          return (
            <button
              key={i}
              onClick={() => paint(i)}
              className="group relative border-b border-r border-paper-line"
              aria-label="paint a dot"
            >
              <span className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-ink opacity-0 transition-opacity duration-150 group-hover:opacity-25" />
              {ci !== undefined && (
                <span
                  className="pc-dot pointer-events-none absolute inset-0 m-auto rounded-full"
                  style={{ height: "44%", width: "44%", background: COLORS[ci], animation: "pc-pop .28s cubic-bezier(.34,1.56,.64,1)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* wordmark, bottom-left, like a signature on the canvas */}
      <div className="pointer-events-none absolute bottom-5 left-5 md:bottom-9 md:left-10">
        <span className="font-display text-6xl md:text-8xl lg:text-9xl font-semibold italic tracking-tight leading-none text-ink">
          {word}
          <span className="not-italic" style={{ color: dotColor }}>.</span>
        </span>
      </div>

      <span className="pointer-events-none absolute top-4 right-5 md:right-10 label text-grey-dim">tap the grid, paint with our dot</span>
    </section>
  );
}
