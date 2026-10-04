import "./aavira.css";

// Aavira brand: wordmark (monoline, round caps, the "I" is a wisp of steam), the mark, and tokens.
export const AV = {
  ink: "#0e0c0b",
  surface: "#161210",
  surfaceHi: "#1f1815",
  line: "#2a2420",
  cream: "#f5ecdd",
  muted: "#b9ac98",
  dim: "#9a8d79",
  turmeric: "#e9a23b",
  ember: "#d9622b",
  tide: "#12302e", // deep sea green, the coastal second surface
};

const SW = 13;
const H = 100;
const A = (x: number) => `M${x},${H} L${x + 31},12 L${x + 62},${H} M${x + 12},70 L${x + 50},70`;
const V = (x: number) => `M${x},12 L${x + 31},${H} L${x + 62},12`;
const I = (x: number) => `M${x + 9},${H} C${x - 6},82 ${x + 22},64 ${x + 9},46 C${x - 3},30 ${x + 19},22 ${x + 9},8`;
const R = (x: number) => `M${x},${H} L${x},12 L${x + 30},12 C${x + 62},12 ${x + 62},56 ${x + 30},56 L${x},56 M${x + 30},56 L${x + 58},${H}`;

const GAP = 22;
const widths = [62, 62, 62, 18, 58, 62];
const xs: number[] = [];
let cursor = 0;
for (const w of widths) { xs.push(cursor); cursor += w + GAP; }
const TOTAL = cursor - GAP;
const PATH = [A(xs[0]), A(xs[1]), V(xs[2]), I(xs[3]), R(xs[4]), A(xs[5])].join(" ");

export function Wordmark({ color = AV.cream, height = 28, className }: { color?: string; height?: number; className?: string }) {
  const vbW = TOTAL + SW * 2;
  const vbH = H + SW * 2;
  return (
    <svg viewBox={`${-SW} ${-SW} ${vbW} ${vbH}`} height={height} width={(height * vbW) / vbH} className={className} role="img" aria-label="Aavira">
      <path d={PATH} fill="none" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The wordmark drawing itself, letter by letter, for the intro. Stroke length is normalised so the
// same keyframes work at any size. `draw` seconds; falls back to the static mark with reduced motion.
export function WordmarkDraw({ color = AV.cream, height = 56, draw = 1.8, className }: { color?: string; height?: number; draw?: number; className?: string }) {
  const vbW = TOTAL + SW * 2;
  const vbH = H + SW * 2;
  return (
    <svg viewBox={`${-SW} ${-SW} ${vbW} ${vbH}`} height={height} width={(height * vbW) / vbH} className={className} role="img" aria-label="Aavira">
      <style>{`@keyframes av-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}@media (prefers-reduced-motion:no-preference){.av-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:av-draw ${draw}s cubic-bezier(.65,0,.35,1) .15s forwards}}`}</style>
      <path className="av-draw" pathLength={1} d={PATH} fill="none" stroke={color} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mark({ size = 40, fg = AV.turmeric, bg = AV.surface }: { size?: number; fg?: string; bg?: string }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Aavira">
      <rect width="120" height="120" rx="30" fill={bg} />
      <path d="M60,94 C42,72 78,60 60,42 C46,28 70,24 60,16" fill="none" stroke={fg} strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
