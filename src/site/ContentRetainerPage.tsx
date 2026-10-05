import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check, Plus } from "lucide-react";
import { EMAIL, SERVICE_BY_SLUG, waLink } from "../seo/data";

// The monthly content retainer, told as a scroll: the blank page, the one brief, the plan, the
// draft that a person edits, the yes. Each beat shows its idea on a stage instead of describing it.
// Everything on the stages is an illustration with example text, and says so. No prices, no counts,
// no results: those are agreed with each client.

const V = "#8b7cf6"; // the one extra accent: violet
const SVC = SERVICE_BY_SLUG["monthly-content-marketing-retainer"];

// ---------------------------------------------------------------------------------- helpers
function useTyped(text: string, on: boolean, delay = 0, speed = 30) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return; }
    if (reduce) { setN(text.length); return; }
    let i = 0;
    let t = 0;
    const tick = () => { i += 1; setN(i); if (i < text.length) t = window.setTimeout(tick, speed); };
    const start = window.setTimeout(tick, delay);
    return () => { window.clearTimeout(start); window.clearTimeout(t); };
  }, [on, text, delay, speed, reduce]);
  return text.slice(0, n);
}

/** Runs timed phases while `on`: returns the current phase number, resets when off. */
function usePhase(on: boolean, times: number[]) {
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!on) { setP(0); return; }
    if (reduce) { setP(times.length); return; }
    const ids = times.map((ms, i) => window.setTimeout(() => setP(i + 1), ms));
    return () => ids.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, reduce]);
  return p;
}

function useBeat(ref: RefObject<HTMLElement | null>, n: number) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [beat, setBeat] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setBeat(Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)))));
  return { beat, scrollYProgress };
}

/** True on phones and tablets, and for reduced motion: pinned scroll scenes become plain stacks. */
function useStacked() {
  const reduce = useReducedMotion();
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const on = () => setNarrow(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow || !!reduce;
}

function InView({ children, className }: { children: (on: boolean) => ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { amount: 0.5 });
  return <div ref={ref} className={className}>{children(on)}</div>;
}

// ---------------------------------------------------------------------------------- stages
const doc = "rounded-3xl bg-paper text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,.7)] border border-white/10";

/** Scene one: a month of empty slots, then the retainer fills them. */
function BlankStage({ beat }: { beat: number }) {
  const cells = Array.from({ length: 20 });
  return (
    <div className={`${doc} p-5 md:p-7 w-full max-w-[560px]`}>
      <div className="flex items-center justify-between">
        <span className="label text-[10px] text-ink/55">Your content calendar</span>
        <span className="label text-[10px] text-ink/45">An illustration</span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2.5 md:gap-3">
        {cells.map((_, i) => {
          const filled = beat >= 3;
          const later = beat === 1 || beat === 2;
          return (
            <div
              key={i}
              className="relative aspect-[5/4] rounded-xl border transition-all duration-500"
              style={{
                transitionDelay: `${(i % 5) * 50 + Math.floor(i / 5) * 90}ms`,
                background: filled ? `${V}${i % 5 === 4 ? "33" : "1f"}` : beat === 2 ? "#00000008" : "transparent",
                borderColor: filled ? V : "#0b0b0c22",
                borderStyle: filled ? "solid" : "dashed",
                opacity: beat === 2 ? 0.55 : 1,
              }}
            >
              {filled && <span className="absolute inset-0 grid place-items-center"><Check className="w-4 h-4" style={{ color: V }} /></span>}
              {later && i % 3 === 0 && <span className="absolute left-1.5 top-1.5 label text-[7px] text-ink/45">later</span>}
              {beat === 0 && <span className="absolute inset-0 grid place-items-center text-ink/20 text-lg">+</span>}
            </div>
          );
        })}
      </div>
      <div className="mt-6 h-12 relative">
        <div className="absolute inset-0 flex items-center gap-3 transition-opacity duration-500" style={{ opacity: beat === 2 ? 1 : 0 }}>
          <span className="font-display text-2xl text-ink/70">Nothing published</span>
          <i className="w-[2px] h-7 bg-ink/70 animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center gap-3 transition-opacity duration-500" style={{ opacity: beat === 3 ? 1 : 0 }}>
          <span className="font-display text-2xl" style={{ color: "#5b4bd6" }}>A month, planned and written</span>
        </div>
        <div className="absolute inset-0 flex items-center transition-opacity duration-500" style={{ opacity: beat <= 1 ? 1 : 0 }}>
          <span className="font-display text-2xl text-ink/45">{beat === 0 ? "Twenty slots, all open" : "Pushed to next week"}</span>
        </div>
      </div>
    </div>
  );
}

const BRIEF = [
  ["Who you write for", "Founders of small B2B teams"],
  ["How you sound", "Plain, warm, a little dry"],
  ["Topics you own", "Onboarding, pricing, hiring"],
  ["Off limits", "Hype, jargon, naming competitors"],
] as const;
function BriefRow({ k, v, on, delay }: { key?: string; k: string; v: string; on: boolean; delay: number }) {
  const t = useTyped(v, on, delay, 26);
  return (
    <div className="rounded-xl border border-ink/10 bg-white px-4 py-3">
      <div className="label text-[9px] text-ink/45">{k}</div>
      <div className="mt-1 font-display text-xl leading-snug min-h-[1.6em]">{t}<span className="inline-block w-[2px] h-5 align-middle ml-0.5 bg-ink/60 animate-pulse" style={{ opacity: on && t.length < v.length ? 1 : 0 }} /></div>
    </div>
  );
}
function BriefStage({ on }: { key?: string; on: boolean }) {
  const p = usePhase(on, [2600, 3000]);
  return (
    <div className={`${doc} p-5 md:p-7 w-full max-w-[520px]`}>
      <div className="flex items-center justify-between"><span className="label text-[10px]" style={{ color: "#5b4bd6" }}>Your brief</span><span className="label text-[10px] text-ink/45">Example</span></div>
      <div className="mt-4 grid gap-3">
        {BRIEF.map(([k, v], i) => <BriefRow key={k} k={k} v={v} on={on} delay={i * 750} />)}
      </div>
      <div className="mt-4 transition-all duration-500" style={{ opacity: p >= 1 ? 1 : 0, transform: p >= 1 ? "none" : "translateY(8px)" }}>
        <div className="label text-[9px] text-ink/45">Pages that already sound like you</div>
        <div className="mt-2 flex flex-wrap gap-2">{["Your about page", "A post you love", "A newsletter you sent"].map((c) => <span key={c} className="rounded-full border border-ink/15 px-3 py-1.5 text-[12px]">{c}</span>)}</div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[13px] transition-opacity duration-500" style={{ opacity: p >= 2 ? 1 : 0, color: "#5b4bd6" }}><Check className="w-4 h-4" /> Saved. One conversation, done once.</div>
    </div>
  );
}

const WEEKS: { w: string; items: { kind: "Blog" | "Newsletter"; t: string }[] }[] = [
  { w: "Week 1", items: [{ kind: "Blog", t: "Why onboarding emails get skimmed" }, { kind: "Blog", t: "What to put on a pricing page" }] },
  { w: "Week 2", items: [{ kind: "Blog", t: "The hiring email that gets replies" }, { kind: "Newsletter", t: "This month's note" }] },
  { w: "Week 3", items: [{ kind: "Blog", t: "Three questions customers always ask" }, { kind: "Blog", t: "How we decide what to build next" }] },
  { w: "Week 4", items: [{ kind: "Blog", t: "A checklist you can steal" }, { kind: "Newsletter", t: "What to read and try" }] },
];
function PlanStage({ on }: { key?: string; on: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`${doc} p-5 md:p-7 w-full max-w-[560px]`}>
      <div className="flex items-center justify-between"><span className="label text-[10px]" style={{ color: "#5b4bd6" }}>The month, planned</span><span className="label text-[10px] text-ink/45">Example plan</span></div>
      <div className="mt-4 grid gap-3">
        {WEEKS.map((w, wi) => (
          <div key={w.w} className="grid grid-cols-[58px_1fr] gap-3 items-start">
            <span className="label text-[9px] text-ink/45 pt-3">{w.w}</span>
            <div className="grid gap-2">
              {w.items.map((it, ii) => (
                <motion.div
                  key={`${on}-${it.t}`}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  animate={on ? { opacity: 1, x: 0 } : { opacity: reduce ? 1 : 0, x: reduce ? 0 : 14 }}
                  transition={{ duration: 0.45, delay: on ? wi * 0.32 + ii * 0.14 : 0, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-[14px]"
                  style={{ background: it.kind === "Blog" ? "#efecff" : "#f6efdc", border: `1px solid ${it.kind === "Blog" ? `${V}55` : "#bd9b4e66"}` }}
                >
                  <span className="label text-[8px] shrink-0" style={{ color: it.kind === "Blog" ? "#5b4bd6" : "#8a6d2f" }}>{it.kind}</span>
                  <span className="truncate">{it.t}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-ink/50">You approve the titles before anyone writes. Your own plan is sized to you.</p>
    </div>
  );
}

function DraftStage({ on }: { key?: string; on: boolean }) {
  const p = usePhase(on, [1500, 2500, 3500, 4300]);
  const strike = (flag: boolean) => (flag ? "line-through decoration-[#c8102e] text-ink/35" : "");
  return (
    <div className={`${doc} p-5 md:p-7 w-full max-w-[560px]`}>
      <div className="flex items-center justify-between">
        <span className="label text-[10px] rounded-full px-3 py-1 transition-colors duration-500" style={{ background: p >= 4 ? "#e7f6ee" : "#efecff", color: p >= 4 ? "#1c7a4a" : "#5b4bd6" }}>{p >= 4 ? "Edited by a person" : "AI first draft"}</span>
        <span className="label text-[10px] text-ink/45">Example</span>
      </div>
      <h3 className="mt-5 font-display text-3xl leading-tight">Why your onboarding email gets skimmed</h3>
      <p className="mt-4 text-[17px] leading-[1.75]">
        <span className={`transition-all duration-500 ${strike(p >= 2)}`}>In today's fast-paced world, </span>
        <span className={`transition-all duration-500 ${p >= 3 ? "" : ""}`}>{p >= 3 ? "M" : "m"}ost onboarding emails get skimmed, not read. </span>
        <span className={`transition-all duration-500 ${strike(p >= 2)}`}>It is crucial to leverage engaging content to drive value. </span>
        <span className="rounded px-1 transition-all duration-500" style={{ background: p >= 3 ? "#efecff" : "transparent", color: p >= 3 ? "#3a2fa8" : "transparent", display: p >= 3 ? "inline" : "none" }}>Lead with the one thing the reader came for.</span>
      </p>
      <div className="mt-5 flex items-center gap-3 transition-all duration-500" style={{ opacity: p >= 4 ? 1 : 0, transform: p >= 4 ? "none" : "translateY(6px)" }}>
        <span className="grid place-items-center w-9 h-9 rounded-full" style={{ background: "#e7f6ee", color: "#1c7a4a" }}><Check className="w-5 h-5" /></span>
        <div>
          <div className="font-display text-xl leading-none">Signed off</div>
          <div className="text-[12px] text-ink/55 mt-1">Cut the filler. Matched the tone in the brief.</div>
        </div>
      </div>
    </div>
  );
}

function ApproveStage({ on }: { key?: string; on: boolean }) {
  const p = usePhase(on, [1400, 2300, 3200]);
  const row = (name: string, kind: string, done: boolean, pressing: boolean) => (
    <div className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3">
      <span className="label text-[8px] shrink-0" style={{ color: kind === "Blog" ? "#5b4bd6" : "#8a6d2f" }}>{kind}</span>
      <span className="flex-1 min-w-0 truncate text-[14px]">{name}</span>
      <span className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all duration-300 ${pressing ? "scale-95" : ""}`} style={{ background: done ? "#e7f6ee" : "#0b0b0c", color: done ? "#1c7a4a" : "#f6f3ee" }}>{done ? "Approved ✓" : "Approve"}</span>
    </div>
  );
  return (
    <div className={`${doc} p-5 md:p-7 w-full max-w-[520px]`}>
      <div className="flex items-center justify-between"><span className="label text-[10px]" style={{ color: "#5b4bd6" }}>Ready for your yes</span><span className="label text-[10px] text-ink/45">Example</span></div>
      <div className="mt-4 grid gap-3">
        {row("Why your onboarding email gets skimmed", "Blog", p >= 2, p === 1)}
        {row("This month's note", "Newsletter", p >= 3, p === 2)}
      </div>
      <div className="mt-5 rounded-2xl p-4 transition-all duration-500" style={{ background: "#efecff", opacity: p >= 3 ? 1 : 0.35 }}>
        <div className="font-display text-2xl leading-snug">{p >= 3 ? "Yours to publish." : "Nothing goes out without your yes."}</div>
        <p className="mt-1 text-[13px] text-ink/60">Publish-ready for your site, and ready to paste into the email tool you already use.</p>
      </div>
    </div>
  );
}

/** One small illustration per promise. */
function PromiseStage({ beat }: { beat: number }) {
  return (
    <div key={beat} className={`${doc} p-6 md:p-8 w-full max-w-[520px] rise`}>
      {beat === 0 && (
        <div>
          <span className="label text-[10px]" style={{ color: "#5b4bd6" }}>Same point, two voices</span>
          <div className="mt-5 rounded-xl border border-ink/10 bg-white px-4 py-3"><div className="label text-[9px] text-ink/40">A generic draft</div><p className="mt-1 font-display text-xl text-ink/40 line-through decoration-[#c8102e]">We are passionate about delivering value to our customers.</p></div>
          <div className="mt-3 rounded-xl px-4 py-3" style={{ background: "#efecff", border: `1px solid ${V}66` }}><div className="label text-[9px]" style={{ color: "#5b4bd6" }}>Edited against your brief</div><p className="mt-1 font-display text-xl text-ink">We fix the onboarding email people skip.</p></div>
        </div>
      )}
      {beat === 1 && (
        <div>
          <span className="label text-[10px]" style={{ color: "#5b4bd6" }}>Before it reaches you</span>
          <div className="mt-5 flex items-center gap-4">
            <span className="grid place-items-center w-14 h-14 rounded-full font-display text-2xl text-white" style={{ background: "#5b4bd6" }}>E</span>
            <div><div className="font-display text-2xl leading-none">The editor</div><div className="text-[13px] text-ink/55 mt-1.5">Rewrote two paragraphs. Checked every claim.</div></div>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5" style={{ background: "#e7f6ee", color: "#1c7a4a" }}><Check className="w-4 h-4" /><span className="label text-[10px]">Signed off</span></div>
        </div>
      )}
      {beat === 2 && (
        <div>
          <span className="label text-[10px]" style={{ color: "#5b4bd6" }}>Status</span>
          <div className="mt-5 flex items-center gap-3 font-display text-3xl leading-tight"><i className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#bd9b4e" }} />Not published. Waiting for you.</div>
          <div className="mt-6 flex gap-3"><span className="rounded-full px-6 py-2.5 text-[14px] font-semibold" style={{ background: "#0b0b0c", color: "#f6f3ee" }}>Approve</span><span className="rounded-full px-6 py-2.5 text-[14px] border border-ink/20">Ask for changes</span></div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------------- scenes
const BLANK_BEATS = [
  { h: "Everyone knows content matters.", d: "A steady blog, a newsletter people open, a voice that sounds like you. The plan is always there." },
  { h: "Nobody has the time.", d: "It slides to next week. Then to next month. The calendar stays empty." },
  { h: "So it goes quiet.", d: "The blog stops. The newsletter stops. Nobody decided that. It just happened." },
  { h: "We take the blank page.", d: "You give us one brief. We write the month. Here is how." },
];
const STEPS = [
  { k: "Brief", h: "You brief us once.", d: "Who you write for, how you sound and what is off limits. One conversation and a short form, and it is done." },
  { k: "Plan", h: "We plan the month.", d: "Titles and angles come to you before anyone writes a word. Swap, cut or add." },
  { k: "Draft and edit", h: "AI drafts. A person edits.", d: "The first draft is fast. The rewrite is where it becomes yours: your voice, accuracy, clarity, signed off by an editor." },
  { k: "Approve", h: "You say yes.", d: "Read in your own time, ask for changes, approve. Nothing goes out without it." },
];
const PROMISES = [
  { w: "In your voice.", d: "Every piece is edited against your brief, not a house style." },
  { w: "Signed by a person.", d: "An editor rewrites and signs off each one before you see it." },
  { w: "Only with your yes.", d: "You approve before anything is published. Always." },
];

function Pinned({ n, copy, stage, tone = "ink" }: { n: number; copy: (beat: number) => ReactNode; stage: (beat: number, on: boolean) => ReactNode; tone?: "ink" | "dim" }) {
  const ref = useRef<HTMLElement>(null);
  const { beat } = useBeat(ref, n);
  return (
    <section ref={ref} style={{ height: `${n * 100}vh` }} className={`relative ${tone === "dim" ? "bg-[#101013]" : "bg-ink"}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: `radial-gradient(50% 45% at 72% 50%, ${V}22, transparent 70%)` }} />
        <div className="relative mx-auto max-w-[1400px] h-full px-6 md:px-10 grid grid-cols-12 gap-10 items-center pt-16">
          <div className="col-span-5">{copy(beat)}</div>
          <div className="col-span-7 flex justify-center">{stage(beat, true)}</div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2" aria-hidden>
          {Array.from({ length: n }).map((_, i) => <i key={i} className="h-[3px] rounded-full transition-all duration-500" style={{ width: i === beat ? 36 : 14, background: i === beat ? V : "#ffffff30" }} />)}
        </div>
      </div>
    </section>
  );
}

function BeatCopy({ beat, items, label, big = false }: { beat: number; items: { h: string; d: string; k?: string }[]; label: string; big?: boolean }) {
  return (
    <div>
      <span className="label text-[10px]" style={{ color: V }}>· {label}</span>
      <div className="relative mt-6" style={{ minHeight: big ? 280 : 250 }}>
        {items.map((b, i) => (
          <div key={b.h} className="absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: i === beat ? 1 : 0, transform: i === beat ? "none" : `translateY(${i < beat ? -28 : 28}px)`, pointerEvents: i === beat ? "auto" : "none" }}>
            {b.k && <div className="label text-[10px] text-grey mb-3">{String(i + 1).padStart(2, "0")} · {b.k}</div>}
            <h2 className={`font-display ${big ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"} leading-[0.98] tracking-[-0.02em]`}>{b.h}</h2>
            <p className="mt-5 text-lg md:text-xl leading-snug text-paper/70 max-w-md">{b.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedBlock({ label, h, d, k, i, children }: { key?: string; label?: string; h: string; d: string; k?: string; i: number; children: ReactNode }) {
  return (
    <div className="px-6 py-14 border-t border-ink-line first:border-t-0">
      {label && <span className="label text-[10px]" style={{ color: V }}>· {label}</span>}
      {k && <div className="label text-[10px] text-grey mt-5">{String(i + 1).padStart(2, "0")} · {k}</div>}
      <h2 className="mt-4 font-display text-4xl leading-[1] tracking-[-0.02em]">{h}</h2>
      <p className="mt-4 text-lg leading-snug text-paper/70">{d}</p>
      <div className="mt-8 flex justify-center">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------------- page
export function ContentRetainerPage() {
  const stacked = useStacked();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const faqs = SVC?.faqs ?? [];
  const sample = waLink("Hi, I would like a free sample piece for the monthly content retainer. My topic is: ");

  return (
    <div className="bg-ink text-paper font-sans antialiased selection:bg-[#8b7cf6] selection:text-white overflow-x-clip">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors"><ArrowLeft className="w-4 h-4" /> made.</a>
          <span className="label text-[10px] text-grey hidden sm:block">Content retainer</span>
          <a href="#sample" className="label text-[10px] rounded-full px-4 py-2 border border-red text-red hover:bg-red hover:text-white transition-colors">Free sample piece</a>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: `radial-gradient(55% 50% at 78% 38%, ${V}2e, transparent 70%), radial-gradient(40% 40% at 10% 90%, #bd9b4e18, transparent 70%)` }} />
        <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-10 pt-28 pb-16 grid lg:grid-cols-12 gap-12 items-center">
          <motion.div style={{ opacity: fade }} className="lg:col-span-7">
            <span className="rise label block" style={{ color: V, animationDelay: "0.05s" }}>· content, on a retainer</span>
            <h1 className="rise mt-7 font-display text-6xl md:text-[7.6rem] leading-[0.9] tracking-[-0.02em]" style={{ animationDelay: "0.12s" }}>
              One brief.<br />A month of <span className="italic font-normal text-gold">content</span><span className="text-red">.</span>
            </h1>
            <p className="rise mt-9 font-display text-xl md:text-2xl leading-snug max-w-xl text-paper/80" style={{ animationDelay: "0.26s" }}>
              We write your blog and your newsletter every month for a flat fee. You brief us once. A person edits every piece. Nothing goes out without your yes.
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-5" style={{ animationDelay: "0.4s" }}>
              <a href="#sample" className="group label rounded-full px-7 py-4 flex items-center gap-2 bg-red text-white hover:bg-red-deep hover:-translate-y-0.5 transition">Get a free sample piece <ArrowUpRight className="w-4 h-4" /></a>
              <a href="#how" className="label text-[11px] text-paper/70 hover:text-paper underline underline-offset-8 decoration-white/30">See how it works</a>
            </div>
          </motion.div>
          <div className="lg:col-span-5 relative h-[360px] md:h-[460px]" aria-hidden>
            <motion.div style={{ y: y1 }} className="absolute left-[2%] top-[4%] w-[78%]">
              <div className="crp-float rounded-2xl bg-paper text-ink p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]" style={{ transform: "rotate(-4deg)" }}>
                <div className="label text-[8px]" style={{ color: "#5b4bd6" }}>Blog post</div>
                <div className="mt-2 font-display text-2xl leading-tight">Why your onboarding email gets skimmed</div>
                <div className="mt-3 grid gap-1.5">{[100, 92, 96, 60].map((w, i) => <i key={i} className="block h-1.5 rounded bg-ink/10" style={{ width: `${w}%` }} />)}</div>
              </div>
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute right-0 top-[34%] w-[66%]">
              <div className="rounded-2xl p-5 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]" style={{ background: "#f6efdc", transform: "rotate(3deg)" }}>
                <div className="label text-[8px]" style={{ color: "#8a6d2f" }}>Newsletter</div>
                <div className="mt-2 font-display text-2xl leading-tight">This month's note</div>
                <div className="mt-3 grid gap-1.5">{[100, 88, 70].map((w, i) => <i key={i} className="block h-1.5 rounded bg-ink/10" style={{ width: `${w}%` }} />)}</div>
              </div>
            </motion.div>
            <div className="absolute left-[8%] bottom-[2%] rounded-full px-5 py-3 flex items-center gap-2 text-ink" style={{ background: "#e7f6ee", transform: "rotate(-2deg)" }}>
              <Check className="w-4 h-4" style={{ color: "#1c7a4a" }} /><span className="label text-[10px]" style={{ color: "#1c7a4a" }}>Signed off by an editor</span>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 1: the blank page */}
      {stacked ? (
        <section>{BLANK_BEATS.map((b, i) => <StackedBlock key={b.h} i={i} label={i === 0 ? "the blank page" : undefined} h={b.h} d={b.d}><BlankStage beat={i} /></StackedBlock>)}</section>
      ) : (
        <Pinned n={BLANK_BEATS.length} copy={(beat) => <BeatCopy beat={beat} items={BLANK_BEATS} label="the blank page" big />} stage={(beat) => <BlankStage beat={beat} />} />
      )}

      {/* SCENE 2: how it works */}
      <div id="how" />
      {stacked ? (
        <section className="bg-[#101013]">
          {STEPS.map((s, i) => (
            <StackedBlock key={s.k} i={i} k={s.k} label={i === 0 ? "how it works" : undefined} h={s.h} d={s.d}>
              <InView>{(on) => (i === 0 ? <BriefStage on={on} /> : i === 1 ? <PlanStage on={on} /> : i === 2 ? <DraftStage on={on} /> : <ApproveStage on={on} />)}</InView>
            </StackedBlock>
          ))}
        </section>
      ) : (
        <Pinned tone="dim" n={STEPS.length} copy={(beat) => <BeatCopy beat={beat} items={STEPS.map((s) => ({ h: s.h, d: s.d, k: s.k }))} label="how it works" />} stage={(beat) => (
          <div className="relative w-full flex justify-center min-h-[480px]">
            {[<BriefStage key="b" on={beat === 0} />, <PlanStage key="p" on={beat === 1} />, <DraftStage key="d" on={beat === 2} />, <ApproveStage key="a" on={beat === 3} />].map((el, i) => (
              <div key={i} className="absolute inset-x-0 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: i === beat ? 1 : 0, transform: i === beat ? "none" : `translateY(${i < beat ? -40 : 40}px) scale(.97)`, pointerEvents: i === beat ? "auto" : "none" }}>{el}</div>
            ))}
          </div>
        )} />
      )}

      {/* SCENE 3: what lands each month */}
      <section className="border-y border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <span className="label text-[10px]" style={{ color: V }}>· every month</span>
          <h2 className="reveal-up mt-6 font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-4xl">What lands in your inbox, <span className="italic font-normal text-gold">on schedule</span><span className="text-red">.</span></h2>
          <div className="reveal-stagger mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "The plan", d: "Titles and angles for the month, for your approval.", viz: <div className="grid gap-2">{[80, 100, 64, 90].map((w, i) => <i key={i} className="block h-6 rounded-lg" style={{ width: `${w}%`, background: i % 2 ? "#f6efdc" : "#efecff" }} />)}</div> },
              { t: "Blog posts", d: "Edited, formatted, with headings and links to your own pages.", viz: <div className="grid gap-2"><i className="block h-7 rounded bg-ink/80 w-3/4" />{[100, 95, 98, 70].map((w, i) => <i key={i} className="block h-2 rounded bg-ink/12" style={{ width: `${w}%` }} />)}</div> },
              { t: "Newsletters", d: "Written for a phone screen. Ready to paste into your email tool.", viz: <div className="mx-auto w-24 rounded-xl border-2 border-ink/80 p-2 grid gap-1.5"><i className="block h-4 rounded bg-ink/80" />{[100, 90, 70].map((w, i) => <i key={i} className="block h-1.5 rounded bg-ink/15" style={{ width: `${w}%` }} />)}</div> },
              { t: "A short note", d: "What we published, what we would do next and what we need from you.", viz: <div className="flex items-center gap-3"><span className="grid place-items-center w-10 h-10 rounded-full" style={{ background: "#e7f6ee", color: "#1c7a4a" }}><Check className="w-5 h-5" /></span><div className="grid gap-1.5 flex-1">{[100, 70].map((w, i) => <i key={i} className="block h-2 rounded bg-ink/15" style={{ width: `${w}%` }} />)}</div></div> },
            ].map((c) => (
              <div key={c.t} className="group rounded-3xl bg-paper text-ink p-6 flex flex-col justify-between min-h-[320px] transition-transform duration-500 hover:-translate-y-2">
                <div className="flex-1 grid place-items-center py-4">{c.viz}</div>
                <div><h3 className="font-display text-2xl">{c.t}</h3><p className="mt-1.5 text-[14px] text-ink/65 leading-snug">{c.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 4: three promises */}
      {stacked ? (
        <section className="bg-[#101013] border-b border-ink-line">
          {PROMISES.map((p, i) => <StackedBlock key={p.w} i={i} label={i === 0 ? "our promise" : undefined} h={p.w} d={p.d}><PromiseStage beat={i} /></StackedBlock>)}
        </section>
      ) : (
        <Pinned tone="dim" n={PROMISES.length} copy={(beat) => <BeatCopy beat={beat} items={PROMISES.map((p) => ({ h: p.w, d: p.d }))} label="our promise" big />} stage={(beat) => <PromiseStage beat={beat} />} />
      )}

      {/* FIT + PRICE */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <span className="label text-[10px]" style={{ color: V }}>· is it for you</span>
          <h2 className="reveal-up mt-6 font-display text-5xl md:text-6xl leading-[0.98] tracking-[-0.02em]">Honest about who it fits.</h2>
          <div className="reveal-up mt-10 grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-ink-line p-6">
              <div className="label text-[10px]" style={{ color: V }}>A good fit</div>
              <ul className="mt-4 grid gap-3 text-[15px] text-paper/80">{["You know content matters but nobody has the time to write it", "You want a steady blog and newsletter without managing writers", "You will give one clear brief and review the pieces", "You would rather pay a flat monthly fee than per word"].map((t) => <li key={t} className="flex gap-3"><Check className="w-4 h-4 shrink-0 mt-1" style={{ color: V }} />{t}</li>)}</ul>
            </div>
            <div className="rounded-3xl border border-ink-line p-6">
              <div className="label text-[10px] text-grey">Not a fit</div>
              <ul className="mt-4 grid gap-3 text-[15px] text-paper/60">{["You want hundreds of cheap posts a week", "You want a ranking guarantee, which nobody honest can sell", "You want deep expert interviews for every piece", "You want to publish without reading anything first"].map((t) => <li key={t} className="flex gap-3"><span className="shrink-0 w-4 text-center text-grey">×</span>{t}</li>)}</ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <span className="label text-[10px]" style={{ color: V }}>· the price</span>
          <h2 className="reveal-up mt-6 font-display text-5xl md:text-6xl leading-[0.98] tracking-[-0.02em]">One flat fee, <span className="italic font-normal text-gold">written down</span><span className="text-red">.</span></h2>
          <p className="reveal-up mt-6 text-lg text-paper/70 max-w-lg leading-snug">We quote after one conversation, against a written plan. The writing is included, so there are no per-word surprises. Three things move the number:</p>
          <ul className="reveal-up mt-8 grid gap-3">{["How many blog posts and newsletters you want each month", "How much interviewing or review you want to do", "Whether you also want help publishing and scheduling"].map((t, i) => <li key={t} className="flex items-center gap-4 rounded-2xl border border-ink-line px-5 py-4"><span className="font-mono text-sm" style={{ color: V }}>{String(i + 1).padStart(2, "0")}</span><span className="text-[15px]">{t}</span></li>)}</ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-line" aria-labelledby="crp-faq">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10 py-24 md:py-32">
          <span className="label text-[10px]" style={{ color: V }}>· questions</span>
          <h2 id="crp-faq" className="reveal-up mt-6 font-display text-5xl md:text-6xl leading-[0.98] tracking-[-0.02em]">Straight answers<span className="text-red">.</span></h2>
          <div className="mt-10 border-t border-ink-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-ink-line py-5">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-display text-xl md:text-2xl leading-snug"><span>{f.q}</span><Plus className="w-5 h-5 shrink-0 transition-transform duration-300 group-open:rotate-45" style={{ color: V }} aria-hidden /></summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-paper/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* THE SAMPLE */}
      <section id="sample" className="relative overflow-hidden border-t border-ink-line">
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: `radial-gradient(50% 60% at 50% 100%, ${V}33, transparent 70%)` }} />
        <div className="reveal-up relative mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-40 text-center">
          <span className="label text-[10px] text-red">· try it first</span>
          <h2 className="mt-8 font-display text-5xl md:text-8xl leading-[0.92] tracking-[-0.02em] max-w-5xl mx-auto">Send us a topic. We write <span className="italic font-normal text-gold">one piece</span>, free<span className="text-red">.</span></h2>
          <p className="mt-8 text-xl text-paper/70 max-w-xl mx-auto leading-snug">Judge the writing before you commit to anything. If it sounds like you, we talk about a plan.</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href={sample} className="group label rounded-full px-8 py-4 flex items-center gap-2 bg-red text-white hover:bg-red-deep hover:-translate-y-0.5 transition">Message us on WhatsApp <ArrowUpRight className="w-4 h-4" /></a>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Free sample piece")}`} className="label rounded-full px-8 py-4 border border-ink-line text-paper hover:border-grey transition-colors">Or email {EMAIL}</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <a href="/" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <a href="/offer" className="hover:text-paper transition-colors">Everything we offer</a>
          <span><a href="/privacy" className="hover:text-gold transition-colors">Privacy</a> · <a href="/terms" className="hover:text-gold transition-colors">Terms</a></span>
        </div>
      </footer>
    </div>
  );
}
