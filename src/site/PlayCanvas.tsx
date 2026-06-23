import { useEffect, useRef, useState } from "react";

// A playful grid above the footer. The dots spell "made." by default (red dot in its
// place); type your name and they re-form into it, like an LED sign. Tap any cell to
// paint or cycle its colour. Brand expression + a small joy.
const COLORS = ["#c8102e", "#bd9b4e", "#3aa655", "#2f6df0", "#8b5cf6", "#e8702a"];
const INK = "#15120f";
const CELL = 30; // target cell size in px
const ROWS = 11; // 2 pad + 7 glyph + 2 pad

// A compact 5x7 dot-matrix font. Each glyph is 7 rows of 5 columns. Guarantees the
// name reads, where freeform text rasterised at this scale never does.
const GLYPH_H = 7;
const F: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10101", "10011", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  "'": ["00100", "00100", "00000", "00000", "00000", "00000", "00000"],
  "-": ["00000", "00000", "00000", "01110", "00000", "00000", "00000"],
};

// Lay out text in the grid with the 5x7 font; return the lit cells + geometry so the
// caller can drop the red period right after the word.
function layout(text: string, cols: number) {
  const chars = text.toUpperCase().split("").filter((c) => c in F);
  const cw = 5;
  let gap = 1;
  let wordW = chars.length * cw + Math.max(0, chars.length - 1) * gap;
  if (wordW > cols) { gap = 0; wordW = chars.length * cw; }
  const startX = Math.max(0, Math.floor((cols - wordW) / 2));
  const padTop = Math.floor((ROWS - GLYPH_H) / 2);
  const cells: number[] = [];
  let cx = startX;
  for (const ch of chars) {
    const g = F[ch];
    for (let r = 0; r < GLYPH_H; r++)
      for (let c = 0; c < cw; c++)
        if (g[r][c] === "1") {
          const X = cx + c;
          const Y = padTop + r;
          if (X >= 0 && X < cols && Y >= 0 && Y < ROWS) cells.push(Y * cols + X);
        }
    cx += cw + gap;
  }
  return { cells, endX: startX + wordW, padTop };
}

// Assemble: the word in ink dots, its period as the signature dot, and a light scatter
// of colour in the empty rows above and below the word.
function compose(name: string, cols: number, word: string, dot: string): Record<number, string> {
  const text = name || word;
  const { cells, endX, padTop } = layout(text, cols);
  const m: Record<number, string> = {};
  cells.forEach((c) => (m[c] = INK));
  if (!name && endX + 1 < cols) m[(padTop + GLYPH_H - 1) * cols + endX + 1] = dot; // the made. period
  const total = cols * ROWS;
  let placed = 0;
  let tries = 0;
  while (placed < Math.round(cols * 0.55) && tries < total * 3) {
    tries++;
    const c = Math.floor(Math.random() * total);
    const r = Math.floor(c / cols);
    if ((r < padTop || r >= padTop + GLYPH_H) && m[c] === undefined) {
      m[c] = COLORS[Math.floor(Math.random() * COLORS.length)];
      placed++;
    }
  }
  return m;
}

export function PlayCanvas({ word = "made", dotColor = "#c8102e" }: { word?: string; dotColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(40);
  const [cellPx, setCellPx] = useState(CELL);
  const [name, setName] = useState("");
  const [cells, setCells] = useState<Record<number, string>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => {
      const w = el.clientWidth;
      // shrink the cell on small screens so a word like "made" still fits the width
      const cell = w < 560 ? 14 : w < 900 ? 22 : CELL;
      setCellPx(cell);
      setCols(Math.max(13, Math.floor(w / cell)));
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setCells(compose(name.trim(), cols, word, dotColor));
  }, [name, cols, word, dotColor]);

  const paint = (i: number) =>
    setCells((c) => {
      const idx = c[i] === undefined ? -1 : COLORS.indexOf(c[i]);
      const next = idx + 1;
      const out = { ...c };
      if (next >= COLORS.length) delete out[i];
      else out[i] = COLORS[next];
      return out;
    });

  const total = cols * ROWS;

  const field = (extra: string) => (
    <input
      value={name}
      onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z '-]/g, "").slice(0, 11))}
      placeholder="your name"
      aria-label="type your name"
      spellCheck={false}
      className={`block w-full max-w-md bg-transparent font-display font-semibold tracking-tight text-ink outline-none placeholder:text-ink/20 ${extra}`}
    />
  );

  return (
    <section className="relative overflow-hidden bg-paper border-t border-paper-line" aria-hidden>
      <style>{`@keyframes pc-pop{0%{transform:scale(.2);opacity:0}60%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}@media(prefers-reduced-motion:reduce){.pc-dot{animation:none!important}}`}</style>

      {/* mobile: a clean input bar above the grid (no overlap on short screens) */}
      <div className="md:hidden px-5 pt-5 pb-3">
        <label className="label text-grey-dim text-[9px]">type your name, we will fill it with our dots</label>
        {field("mt-1 text-3xl")}
      </div>

      <div
        ref={ref}
        className="grid border-l border-t border-paper-line"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: `${cellPx}px` }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const col = cells[i];
          return (
            <button
              key={i}
              onClick={() => paint(i)}
              className="group relative border-b border-r border-paper-line"
              aria-label="paint a dot"
            >
              <span className="pointer-events-none absolute inset-0 m-auto h-2 w-2 rounded-full bg-ink opacity-0 transition-opacity duration-150 group-hover:opacity-20" />
              {col !== undefined && (
                <span
                  className="pc-dot pointer-events-none absolute inset-0 m-auto rounded-full"
                  style={{ height: "66%", width: "66%", background: col, animation: "pc-pop .22s cubic-bezier(.34,1.56,.64,1)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* desktop: the field sits as a signature in the lower-left, over the canvas */}
      <div className="hidden md:block absolute bottom-8 left-10 max-w-[88vw]">
        <label className="label text-grey-dim text-[10px]">type your name, we will fill it with our dots</label>
        {field("mt-1.5 text-5xl")}
      </div>
    </section>
  );
}
