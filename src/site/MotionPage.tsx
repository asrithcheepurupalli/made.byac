import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── The motion index ─────────────────────────────────────────────────────────
// Like the Laws page, but for the craft of movement. You are already feeling most
// of this as you scroll; here is each move on its own, live, with the why. Easing,
// magnetism, micro-states, stagger, count-ups, and a calm mode that turns it all off.

const SIGNATURE = "cubic-bezier(0.16, 1, 0.3, 1)";

function PageHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey-dim">the motion index</span>
      </div>
    </header>
  );
}

/* 1. Easing ─ same move, mechanical vs alive. */
function EasingDemo() {
  const [on, setOn] = useState(false);
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">same distance, same time. one curve.</p>
      <div className="mt-4 space-y-4">
        {[true, false].map((isSig) => (
          <div key={String(isSig)} className="relative h-12 rounded-full border border-ink-line bg-ink">
            <span className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full" style={{ left: on ? "calc(100% - 2.25rem)" : "0.25rem", background: isSig ? "var(--color-gold)" : "var(--color-grey)", transition: `left 1.1s ${isSig ? SIGNATURE : "linear"}` }} />
            <span className="label absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-grey-dim">{isSig ? "our curve" : "linear"}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setOn((o) => !o)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"><Play className="h-3.5 w-3.5" /> {on ? "send them back" : "play both"}</button>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">Linear is a machine moving an object. Our curve starts fast and settles soft, the way real things move. We use it on nearly everything.</p>
    </div>
  );
}

/* 2. Magnetic ─ a control that leans toward your cursor. */
function MagneticDemo() {
  const zone = useRef<HTMLDivElement>(null);
  const [d, setD] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const el = zone.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setD({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">move your cursor near the button</p>
      <div ref={zone} onMouseMove={onMove} onMouseLeave={() => setD({ x: 0, y: 0 })} className="mt-4 flex h-40 items-center justify-center rounded-xl border border-ink-line bg-ink">
        <button className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink" style={{ transform: `translate(${d.x}px, ${d.y}px)`, transition: `transform 0.3s ${SIGNATURE}` }} data-cursor="hi">Catch me</button>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">The button leans toward you before you arrive. A target that reaches back is easier to hit and feels alive in the hand. We give it to the moments that matter.</p>
    </div>
  );
}

/* 3. Micro-states ─ hover lifts, press contracts. */
function StatesDemo() {
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">hover it, then press and hold</p>
      <div className="mt-4 flex h-40 items-center justify-center rounded-xl border border-ink-line bg-ink">
        <button className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95" style={{ transitionTimingFunction: SIGNATURE }}>Press me</button>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">Hover and it lifts toward you. Press and it gives, like a real button under a real thumb. Every control answers your touch inside a single frame, so the screen feels physical.</p>
    </div>
  );
}

/* 4. Stagger ─ a sequence, not a dump. */
function StaggerDemo() {
  const [n, setN] = useState(0);
  const items = ["Brief", "Sketch", "System", "Build", "Ship"];
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">reveal a list</p>
      <div className="mt-4 flex flex-wrap gap-2" style={{ minHeight: 88 }}>
        {items.map((it, i) => (
          <span key={`${n}-${i}`} className="rounded-lg border border-ink-line bg-ink-soft/50 px-4 py-3 text-sm text-paper/85" style={{ opacity: 0, animation: n ? `mo-rise .5s ${SIGNATURE} forwards` : "none", animationDelay: `${i * 90}ms` }}>{it}</span>
        ))}
      </div>
      <button onClick={() => setN((x) => x + 1)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"><Play className="h-3.5 w-3.5" /> {n ? "again" : "reveal"}</button>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">Things arrive one after another, a beat apart, so your eye is led through them. Dump everything at once and the reader has to do the sorting.</p>
    </div>
  );
}

/* 5. Count-up ─ a number that earns attention by moving. */
function CountDemo() {
  const [val, setVal] = useState(0);
  const target = 247;
  const run = () => {
    setVal(0);
    const dur = 1100;
    let t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">a number, delivered</p>
      <div className="mt-4 flex h-40 flex-col items-center justify-center rounded-xl border border-ink-line bg-ink">
        <span className="font-display text-7xl leading-none text-gold">{val}</span>
        <span className="label mt-2 text-[8px] text-grey-dim">brands shaped</span>
      </div>
      <button onClick={run} className="mt-4 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"><Play className="h-3.5 w-3.5" /> count it up</button>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">A figure that ticks into place lands harder than one that is just printed. The motion says this number was counted, and asks you to watch it arrive.</p>
    </div>
  );
}

/* 6. Calm mode ─ motion is a courtesy, not a tax. */
function CalmDemo() {
  const [calm, setCalm] = useState(false);
  const [tick, setTick] = useState(0);
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">{calm ? "calm: everything settles" : "motion: alive"}</p>
      <div className="mt-4 flex h-40 items-center justify-center gap-3 rounded-xl border border-ink-line bg-ink">
        {[0, 1, 2, 3].map((i) => (
          <span key={`${tick}-${i}`} className="h-12 w-12 rounded-lg bg-gold" style={calm ? {} : { animation: `mo-pulse 1.4s ${SIGNATURE} ${i * 0.15}s infinite` }} />
        ))}
      </div>
      <button onClick={() => { setCalm((c) => !c); setTick((t) => t + 1); }} className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 text-[11px] text-grey-dim transition-colors hover:text-paper hover:border-gold">{calm ? "bring motion back" : "switch to calm"}</button>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">Motion is a courtesy, never a tax. The whole site honours your reduced-motion setting automatically, and everything you have seen here settles into a calm, still version on request.</p>
    </div>
  );
}

type Move = { id: string; n: string; name: string; why: string; accent: string; Demo: ComponentType };
const MOVES: Move[] = [
  { id: "easing", n: "01", name: "Easing", why: "The curve a thing moves on is the difference between mechanical and alive.", accent: "#bd9b4e", Demo: EasingDemo },
  { id: "magnetic", n: "02", name: "Magnetism", why: "A target that leans toward your cursor is easier to hit and feels responsive.", accent: "#c8102e", Demo: MagneticDemo },
  { id: "states", n: "03", name: "Micro-states", why: "Hover, press, release. Controls that answer touch make a flat screen feel physical.", accent: "#3aa655", Demo: StatesDemo },
  { id: "stagger", n: "04", name: "Stagger", why: "Bring things in a beat apart and the eye is led, not flooded.", accent: "#2f6df0", Demo: StaggerDemo },
  { id: "count", n: "05", name: "Count-up", why: "A number that arrives by moving lands harder than one that is simply printed.", accent: "#e8702a", Demo: CountDemo },
  { id: "calm", n: "06", name: "Calm mode", why: "Motion is a courtesy. Ask for less and the whole thing settles, automatically.", accent: "#8b5cf6", Demo: CalmDemo },
];

function Exhibit({ m, flip }: { m: Move; flip: boolean }) {
  const Demo = m.Demo;
  return (
    <section id={`move-${m.id}`} className="relative overflow-hidden border-t border-ink-line py-16 md:py-24 reveal-up">
      <span aria-hidden className="pointer-events-none absolute -top-8 select-none font-display font-semibold leading-none" style={{ right: flip ? "auto" : "1rem", left: flip ? "1rem" : "auto", fontSize: "22vw", color: m.accent, opacity: 0.06 }}>{m.n}</span>
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-3"><span className="h-px w-10" style={{ background: m.accent }} /><span className="label" style={{ color: m.accent }}>·{m.n} / move</span></div>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">{m.name}</h2>
          <p className="mt-5 text-lg text-grey-dim leading-relaxed">{m.why}</p>
        </div>
        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          <div className="rounded-2xl border border-ink-line bg-ink-soft/40 p-6 md:p-8"><Demo /></div>
        </div>
      </div>
    </section>
  );
}

export function MotionPage() {
  useEffect(() => {
    if (document.getElementById("mo-keys")) return;
    const s = document.createElement("style");
    s.id = "mo-keys";
    s.textContent = "@keyframes mo-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes mo-pulse{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-14px) scale(1.08)}}@media(prefers-reduced-motion:reduce){[style*='mo-rise']{opacity:1!important;animation:none!important}[style*='mo-pulse']{animation:none!important}}";
    document.head.appendChild(s);
  }, []);
  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen overflow-clip">
      <PageHeader />
      <main>
        <section className="reveal-up px-6 md:px-10 pt-32 pb-12 md:pt-40">
          <div className="mx-auto max-w-[1600px]">
            <span className="label text-red">·the motion index</span>
            <h1 className="mt-6 font-display text-[12vw] leading-[0.88] tracking-[-0.03em] sm:text-[8rem]">
              Motion with<br /><span className="italic font-normal text-gold">manners.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-grey-dim leading-relaxed font-display">
              You have been feeling most of this since you arrived, the cursor, the reveals, the way buttons answer your touch. Here is each move on its own, live, with the reason it is there. Every one of them earns its place, and every one switches off if you ask.
            </p>
          </div>
        </section>

        {MOVES.map((m, i) => <Exhibit key={m.id} m={m} flip={i % 2 === 1} />)}

        <section className="reveal-up border-t border-ink-line py-24 md:py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight">Movement is a language.<br /><span className="italic font-normal text-gold">We speak it softly.</span></h2>
            <a href="/#say-hi" data-cursor="Hello" className="mt-10 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-paper transition-transform hover:-translate-y-0.5">
              <span className="label text-[11px]">Build something that moves</span><ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
