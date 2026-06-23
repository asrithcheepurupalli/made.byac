import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── The laws we design by ────────────────────────────────────────────────────
// Not a list of cards. An exhibit: a cursor-lit hero, a periodic table of the whole
// canon (the seven we live pop in colour), full-bleed specimens you can feel, and a
// rail that tracks where you are. The page demonstrates the laws while explaining them.
// Canon maintained at lawsofux.com by Jon Yablonski; we only claim what we build by.

function PageHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey-dim">the laws we design by</span>
      </div>
    </header>
  );
}

const card = "rounded-xl border border-ink-line p-4 transition-all duration-300";

/* 1. Aesthetic-Usability ─ pick the one you'd trust; reveal that you judged by looks. */
function AestheticDemo() {
  const [picked, setPicked] = useState<"" | "raw" | "made">("");
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">which would you hand your card details to?</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button onClick={() => setPicked("raw")} className="text-left" style={{ outline: picked === "raw" ? "2px solid var(--color-gold)" : "none", borderRadius: 12 }}>
          <div style={{ fontFamily: "Times New Roman, serif", background: "#dfe2e6", color: "#111", border: "2px solid #9aa0a8", borderRadius: 12, padding: 14 }}>
            <div style={{ fontWeight: 700 }}>Pay Now</div>
            <div style={{ fontSize: 12, color: "#555" }}>enter card number</div>
            <div style={{ marginTop: 8, background: "#fff", border: "1px solid #888", padding: "4px 6px", fontSize: 12 }}>____ ____ ____ ____</div>
            <div style={{ marginTop: 8, background: "#0a52cc", color: "#fff", textAlign: "center", padding: 6, fontSize: 12 }}>SUBMIT</div>
          </div>
        </button>
        <button onClick={() => setPicked("made")} className="text-left" style={{ outline: picked === "made" ? "2px solid var(--color-gold)" : "none", borderRadius: 12 }}>
          <div className="rounded-xl bg-paper text-ink p-3.5" style={{ borderRadius: 12 }}>
            <div className="font-display text-lg leading-none">Checkout</div>
            <div className="label text-[8px] text-grey">card details</div>
            <div className="mt-2 rounded-md border border-paper-line px-2.5 py-1.5 font-mono text-[11px] text-grey">4242 4242 4242 4242</div>
            <div className="mt-2 rounded-full bg-red py-1.5 text-center text-[11px] font-semibold text-white">Pay securely</div>
          </div>
        </button>
      </div>
      <p className="mt-5 text-[14px] leading-relaxed" style={{ minHeight: 44 }}>
        {picked ? (
          <span className="text-grey-dim">Neither one was actually tested. You judged trust in a glance, by the surface alone. {picked === "made" ? "You picked the prettier one, like almost everyone." : "Even here, the polish is doing the talking."} That is the effect, and it is why we sweat the surface.</span>
        ) : (
          <span className="text-grey-dim/60">Pick one.</span>
        )}
      </p>
    </div>
  );
}

/* 2. Von Restorff ─ the one red pill. shuffle / make-them-same to feel the difference. */
function VonRestorffDemo() {
  const [pos, setPos] = useState(7);
  const [same, setSame] = useState(false);
  const reshuffle = () => setPos(Math.floor((pos * 7 + 3) % 15));
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">{same ? "now find the one that matters" : "which did your eye hit first?"}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 15 }).map((_, i) => {
          const hot = !same && i === pos;
          return <span key={i} className="h-9 rounded-full transition-colors duration-300" style={{ width: hot ? 86 : 64, background: hot ? "var(--color-red)" : "var(--color-ink-line)" }} />;
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button onClick={reshuffle} className="label text-[10px] rounded-full border border-ink-line px-4 py-2 text-grey-dim transition-colors hover:text-paper">shuffle</button>
        <button onClick={() => setSame((s) => !s)} className="label text-[10px] rounded-full border border-ink-line px-4 py-2 text-grey-dim transition-colors hover:text-paper">{same ? "bring the red back" : "make them all the same"}</button>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">{same ? "Nothing stands out, so nothing gets remembered. The odd one out is what sticks." : "You found it instantly. That is why we allow exactly one red action per screen. Two reds, and neither wins."}</p>
    </div>
  );
}

/* 3. Hick's Law ─ flip between a wall of options and a curated few. */
function HicksDemo() {
  const [full, setFull] = useState(true);
  const many = ["Branding", "Packaging", "Web design", "App design", "Motion", "Illustration", "Photography", "Copywriting", "SEO", "Ads", "Email", "Strategy"];
  const few = ["Brand", "Product", "AI"];
  const list = full ? many : few;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="label text-grey-dim text-[9px]">pick what you need</p>
        <span className="label text-[9px]" style={{ color: full ? "var(--color-red)" : "var(--color-gold)" }}>{full ? "12 choices · you hesitate" : "3 choices · you just pick"}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {list.map((x) => <span key={x} className={`${card} text-[13px] text-paper/80`} style={{ borderRadius: 10, padding: "8px 12px" }}>{x}</span>)}
      </div>
      <button onClick={() => setFull((f) => !f)} className="label mt-5 text-[10px] rounded-full border border-ink-line px-4 py-2 text-grey-dim transition-colors hover:text-paper">{full ? "show me what matters" : "show me everything"}</button>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">More options means a slower, heavier decision. So we ask one sharp question and offer a few good answers, never a wall.</p>
    </div>
  );
}

/* 4. Fitts's Law ─ live target size + distance with a real difficulty score. */
function FittsDemo() {
  const [size, setSize] = useState(56);
  const [dist, setDist] = useState(180);
  const [hit, setHit] = useState(false);
  const id = Math.log2((2 * dist) / size + 1);
  const verdict = id < 2.2 ? ["effortless", "var(--color-gold)"] : id < 3.4 ? ["fine", "var(--color-paper)"] : ["a chore", "var(--color-red)"];
  return (
    <div>
      <div className="relative h-28 overflow-hidden rounded-xl border border-ink-line" style={{ background: "var(--color-ink)" }}>
        <span className="absolute top-1/2 left-4 -translate-y-1/2 h-3 w-3 rounded-full bg-grey" />
        <button onClick={() => { setHit(true); window.setTimeout(() => setHit(false), 600); }} className="absolute top-1/2 -translate-y-1/2 rounded-full font-semibold text-white transition-transform" style={{ left: Math.min(16 + dist, 320), width: size, height: size, background: hit ? "var(--color-gold)" : "var(--color-red)", fontSize: 10 }}>{hit ? "✓" : "tap"}</button>
      </div>
      <div className="mt-5 grid gap-3">
        <label className="label flex items-center gap-3 text-[9px] text-grey-dim">size<input type="range" min={20} max={96} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" style={{ accentColor: "var(--color-red)" }} /></label>
        <label className="label flex items-center gap-3 text-[9px] text-grey-dim">distance<input type="range" min={20} max={300} value={dist} onChange={(e) => setDist(+e.target.value)} className="w-full" style={{ accentColor: "var(--color-red)" }} /></label>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">Difficulty <span className="font-mono text-paper">{id.toFixed(2)}</span>, this tap feels <span style={{ color: verdict[1] }}>{verdict[0]}</span>. Bigger and closer wins, which is why our calls-to-action are large and never tucked in a corner.</p>
    </div>
  );
}

/* 5. Doherty Threshold ─ a delay slider; cross 400ms and it stops feeling instant. */
function DohertyDemo() {
  const [delay, setDelay] = useState(120);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const ok = delay <= 400;
  const run = () => { setDone(false); setBusy(true); window.setTimeout(() => { setBusy(false); setDone(true); }, delay); };
  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={run} className="rounded-full bg-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">{busy ? "…" : "do something"}</button>
        <span className="label text-[11px]" style={{ color: busy ? "var(--color-grey-dim)" : done ? (ok ? "var(--color-gold)" : "var(--color-red)") : "var(--color-grey-dim)" }}>{busy ? "working" : done ? (ok ? "felt instant" : "felt broken") : "press it"}</span>
      </div>
      <label className="label mt-5 flex items-center gap-3 text-[9px] text-grey-dim">response <span className="font-mono text-paper" style={{ width: 56 }}>{delay}ms</span><input type="range" min={0} max={1200} step={20} value={delay} onChange={(e) => setDelay(+e.target.value)} className="w-full" style={{ accentColor: ok ? "var(--color-gold)" : "var(--color-red)" }} /></label>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">Under 400ms and the system feels like an extension of your hand. Push past it and attention leaks. We design every interaction to answer before you can doubt it.</p>
    </div>
  );
}

/* 6. Jakob's Law ─ a familiar layout vs a scrambled one you have to relearn. */
function JakobsDemo() {
  const [scrambled, setScrambled] = useState(false);
  return (
    <div>
      <p className="label text-grey-dim text-[9px]">{scrambled ? "now find the menu and the logo" : "everything where you expect it"}</p>
      <div className="mt-4 rounded-xl border border-ink-line bg-ink p-4" style={{ height: 132 }}>
        {!scrambled ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-ink-line pb-2">
              <span className="font-display italic text-paper">brand<span className="text-red">.</span></span>
              <span className="label text-[8px] text-grey-dim">home · work · about</span>
            </div>
            <div className="flex flex-1 items-center"><span className="text-grey-dim text-sm">A page you can use without thinking.</span></div>
          </div>
        ) : (
          <div className="relative h-full">
            <span className="absolute bottom-1 right-2 font-display italic text-paper">brand<span className="text-red">.</span></span>
            <span className="label absolute left-1 top-1/2 -rotate-90 text-[8px] text-grey-dim">home·work·about</span>
            <span className="absolute right-3 top-2 text-grey-dim text-sm">Where did everything go?</span>
          </div>
        )}
      </div>
      <button onClick={() => setScrambled((s) => !s)} className="label mt-5 text-[10px] rounded-full border border-ink-line px-4 py-2 text-grey-dim transition-colors hover:text-paper">{scrambled ? "put it back" : "scramble it"}</button>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">You already carry a model of where a logo, a menu and a checkout should be. We honour it instead of making you relearn the basics.</p>
    </div>
  );
}

/* 7. Peak-End ─ play an experience; you remember the spike and the finish. */
function PeakEndDemo() {
  const bars = [3, 5, 4, 9, 4, 3, 7];
  const [step, setStep] = useState(-1);
  const peak = bars.indexOf(Math.max(...bars));
  const play = () => { setStep(0); let i = 0; const t = window.setInterval(() => { i += 1; setStep(i); if (i >= bars.length) window.clearInterval(t); }, 320); };
  const done = step >= bars.length;
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height: 120 }}>
        {bars.map((b, i) => {
          const on = step >= i;
          const mark = done && (i === peak || i === bars.length - 1);
          return <div key={i} className="flex-1 rounded-t-md transition-all duration-300" style={{ height: on ? `${b * 11}px` : 4, background: mark ? "var(--color-gold)" : on ? "var(--color-red)" : "var(--color-ink-line)" }} />;
        })}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button onClick={play} className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"><Play className="h-3.5 w-3.5" /> play the visit</button>
        {done && <span className="label text-[9px] text-gold">peak + end, highlighted</span>}
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-grey-dim">You will remember the highest moment and the last one, not the average. So we engineer a peak (the hero) and a warm goodbye (our "say hi" close), and let the middle breathe.</p>
    </div>
  );
}

type Law = { id: string; n: string; name: string; short: string; accent: string; says: string; here: string; Demo: ComponentType };
const LIVE: Law[] = [
  { id: "aesthetic", n: "01", name: "Aesthetic-Usability Effect", short: "Aesthetic", accent: "#c8102e", Demo: AestheticDemo, says: "People perceive good-looking design as more usable, and trust it before they have tested a thing.", here: "It is our whole thesis. You decided this studio was worth your time in the first second, on looks alone. We earn that second." },
  { id: "von-restorff", n: "02", name: "Von Restorff Effect", short: "Von Restorff", accent: "#bd9b4e", Demo: VonRestorffDemo, says: "The one thing that is different from the rest is the thing that gets remembered.", here: "Our red. Exactly one red action per screen, never two, so your eye always knows the next move. The dot in our wordmark is the same idea." },
  { id: "hicks", n: "03", name: "Hick's Law", short: "Hick's Law", accent: "#3aa655", Demo: HicksDemo, says: "The more choices you offer, the longer and heavier the decision becomes.", here: "The 'what's eating you?' picker, and a footer that lists four products, not forty. We ask one sharp question, not for everything at once." },
  { id: "fitts", n: "04", name: "Fitts's Law", short: "Fitts's Law", accent: "#2f6df0", Demo: FittsDemo, says: "The time to hit a target depends on how big it is and how far away.", here: "Our calls-to-action are large, rounded and close to the thumb. Nothing important hides in a corner at eight pixels tall." },
  { id: "doherty", n: "05", name: "Doherty Threshold", short: "Doherty", accent: "#8b5cf6", Demo: DohertyDemo, says: "Under 400 milliseconds, a system feels like an extension of your hand.", here: "Snappy reveals, an instant cursor, demos that compose while you watch. We answer before you can doubt." },
  { id: "jakobs", n: "06", name: "Jakob's Law", short: "Jakob's Law", accent: "#e8702a", Demo: JakobsDemo, says: "People expect your site to work like every other site they already know.", here: "Wordmark top-left, menu top-right, a checkout that behaves. We spend our novelty on the work, not on relearning where the menu is." },
  { id: "peak-end", n: "07", name: "Peak-End Rule", short: "Peak-End", accent: "#16a6a0", Demo: PeakEndDemo, says: "An experience is judged by its best moment and its ending, not its average.", here: "A cinematic hero for the peak, and a warm, human goodbye for the end. We make the bookends sing." },
];

const REST: [string, string][] = [
  ["Choice Overload", "Too many options overwhelm, so people stall or pick nothing."],
  ["Chunking", "Group information into meaningful units so it is easier to take in."],
  ["Cognitive Load", "Spend the user's mental effort on the task, not on the interface."],
  ["Cognitive Bias", "Predictable thinking shortcuts shape how people read a screen."],
  ["Flow", "Full immersion in a task, with the right challenge and zero friction."],
  ["Goal-Gradient Effect", "Motivation grows the closer a goal looks, so show progress."],
  ["Law of Common Region", "A shared boundary makes elements feel like one group."],
  ["Law of Proximity", "Things placed near each other read as related."],
  ["Law of Prägnanz", "People read complex shapes as the simplest form they can."],
  ["Law of Similarity", "Things that look alike are seen as part of one set."],
  ["Law of Uniform Connectedness", "Visually connected elements feel the most related."],
  ["Mental Model", "People expect a system to behave like their idea of it."],
  ["Miller's Law", "Working memory holds about seven items, give or take two."],
  ["Occam's Razor", "Prefer the simplest design that still does the job."],
  ["Paradox of the Active User", "People skip the manual and start using it at once."],
  ["Pareto Principle", "Most of the value comes from a small share of the features."],
  ["Parkinson's Law", "Work expands to fill whatever time it is given."],
  ["Postel's Law", "Be forgiving of what you accept and careful with what you send."],
  ["Selective Attention", "People filter for what matters and ignore the rest."],
  ["Serial Position Effect", "The first and last items in a list are remembered best."],
  ["Tesler's Law", "Complexity cannot be removed, only moved. So we carry it, not you."],
  ["Working Memory", "A small, temporary store for what the task needs right now."],
  ["Zeigarnik Effect", "Unfinished tasks nag at the memory more than finished ones."],
];

type Item = { name: string; desc: string; live: boolean; id?: string; accent?: string };
const ALL: Item[] = [
  ...LIVE.map((l) => ({ name: l.name, desc: l.says, live: true, id: l.id, accent: l.accent })),
  ...REST.map(([name, desc]) => ({ name, desc, live: false })),
].sort((a, b) => a.name.localeCompare(b.name));

/* Cursor-lit dot-grid hero: faint dots everywhere, gold dots glow under the cursor. */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  return (
    <section ref={ref} className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 md:px-10" style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(var(--color-ink-line) 1.5px, transparent 1.6px)", backgroundSize: "34px 34px", opacity: 0.55 }} />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(var(--color-gold) 1.7px, transparent 1.8px)", backgroundSize: "34px 34px", WebkitMaskImage: "radial-gradient(240px circle at var(--mx) var(--my), #000 0%, transparent 72%)", maskImage: "radial-gradient(240px circle at var(--mx) var(--my), #000 0%, transparent 72%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] reveal-up">
        <span className="label text-red">·the laws we design by</span>
        <h1 className="mt-7 font-display text-[15vw] leading-[0.86] tracking-[-0.03em] sm:text-[10rem]">
          Good design<br /><span className="italic font-normal text-gold">obeys laws.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-grey-dim leading-relaxed font-display">
          Decades of research into how people see, decide and remember. We do not decorate with them, we build on them. Thirty laws below. The seven we live by, you can feel for yourself.
        </p>
        <div className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-grey-dim">
          <span className="h-px w-10 bg-red" /> scroll to the canon
        </div>
      </div>
    </section>
  );
}

/* The canon as a periodic table; a reader above the grid updates on hover OR tap, the
   seven we live pop in colour. The reader sits above so it is always in view. */
function CanonIndex({ onJump }: { onJump: (id: string) => void }) {
  const [active, setActive] = useState(Math.max(0, ALL.findIndex((i) => i.live)));
  const cur = ALL[active];
  return (
    <section className="relative border-t border-ink-line py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label text-red">·the canon</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight">Thirty laws.<br />Seven we build by.</h2>
          </div>
          <p className="max-w-xs text-sm text-grey-dim leading-relaxed">The colour ones are the laws we live. Hover or tap any to read it, then feel the live ones. Credit, <a href="https://lawsofux.com" target="_blank" rel="noreferrer" className="u-link text-paper">lawsofux.com</a>.</p>
        </div>

        {/* the reader — sits above the grid, always in view as you browse */}
        <div className="mt-8 flex min-h-[4.5rem] flex-col gap-3 border-y border-ink-line py-5 sm:flex-row sm:items-center sm:gap-6">
          <span className="label shrink-0 text-[10px]" style={{ color: cur.live ? cur.accent : "var(--color-grey-dim)" }}>{cur.live ? "we live this" : "in the canon"}</span>
          <p className="flex-1 font-display text-lg leading-snug md:text-2xl">
            <span className="text-paper">{cur.name}.</span> <span className="text-grey-dim">{cur.desc}</span>
          </p>
          {cur.live && cur.id && (
            <button onClick={() => onJump(cur.id!)} data-cursor="feel" className="label shrink-0 self-start rounded-full px-4 py-2 text-[10px] text-ink transition-transform hover:-translate-y-0.5 sm:self-auto" style={{ background: cur.accent }}>
              feel it →
            </button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
          {ALL.map((it, i) => (
            <button
              key={it.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              title={it.desc}
              data-cursor={it.live ? "feel" : undefined}
              className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-lg p-2.5 text-left transition-transform duration-200 hover:-translate-y-1"
              style={{ background: it.live ? it.accent : "var(--color-ink-soft)", border: active === i ? "1px solid var(--color-paper)" : "1px solid var(--color-ink-line)" }}
            >
              <span className={`label text-[8px] ${it.live ? "text-ink/55" : "text-grey-dim"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={`font-display text-[12px] md:text-[13px] leading-[1.05] ${it.live ? "text-ink" : "text-grey-dim group-hover:text-paper"}`}>{it.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* A full-bleed specimen: giant ghost number, the law, the live demo, alternating side. */
function Exhibit({ law, flip }: { law: Law; flip: boolean }) {
  const Demo = law.Demo;
  return (
    <section id={`law-${law.id}`} className="relative overflow-hidden border-t border-ink-line py-20 md:py-32 scroll-mt-16 reveal-up">
      <span aria-hidden className="pointer-events-none absolute -top-10 select-none font-display font-semibold leading-none" style={{ right: flip ? "auto" : "1rem", left: flip ? "1rem" : "auto", fontSize: "26vw", color: law.accent, opacity: 0.06 }}>{law.n}</span>
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: law.accent }} />
            <span className="label" style={{ color: law.accent }}>·{law.n} / law</span>
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">{law.name}</h2>
          <p className="mt-5 text-lg text-grey-dim leading-relaxed">{law.says}</p>
          <p className="mt-6 flex gap-3">
            <span className="label shrink-0 pt-1 text-gold">we live it</span>
            <span className="text-[15px] leading-relaxed text-paper/85">{law.here}</span>
          </p>
        </div>
        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          <div className="rounded-2xl border border-ink-line bg-ink-soft/40 p-6 md:p-8">
            <Demo />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Fixed rail: where you are in the seven; goal-gradient + serial position, on you. */
function ProgressRail({ active, onJump }: { active: number; onJump: (id: string) => void }) {
  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex">
      {LIVE.map((l, i) => (
        <button key={l.id} onClick={() => onJump(l.id)} className="group flex items-center gap-2.5" data-cursor="jump" aria-label={l.name}>
          <span className="label text-[8px] text-grey-dim opacity-0 transition-opacity group-hover:opacity-100" style={{ opacity: active === i ? 1 : undefined, color: active === i ? l.accent : undefined }}>{l.short}</span>
          <span className="h-2.5 w-2.5 rounded-full transition-all duration-300" style={{ background: active === i ? l.accent : "var(--color-ink-line)", transform: active === i ? "scale(1.5)" : "scale(1)" }} />
        </button>
      ))}
    </div>
  );
}

export function LawsPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = LIVE.findIndex((l) => `law-${l.id}` === e.target.id);
          if (idx >= 0) setActive(idx);
        }
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    LIVE.forEach((l) => { const el = document.getElementById(`law-${l.id}`); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const jump = (id: string) => document.getElementById(`law-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen overflow-clip">
      <PageHeader />
      <ProgressRail active={active} onJump={jump} />
      <main>
        <Hero />
        <CanonIndex onJump={jump} />
        {LIVE.map((law, i) => <Exhibit key={law.id} law={law} flip={i % 2 === 1} />)}

        <section className="reveal-up border-t border-ink-line py-24 md:py-36 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight">Design you can feel,<br /><span className="italic font-normal text-gold">because it follows the rules.</span></h2>
            <a href="/#say-hi" data-cursor="Hello" className="mt-10 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-paper transition-transform hover:-translate-y-0.5">
              <span className="label text-[11px]">Build something with us</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
