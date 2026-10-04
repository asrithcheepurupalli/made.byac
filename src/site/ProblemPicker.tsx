import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// "What's eating you?" — the visitor taps THEIR problem and the panel transforms
// to show the exact fix, in motion. Each fix points at something we have really built and
// can show, on this site, rather than at a product somewhere else.

type Fix = {
  id: string;
  pain: string;
  tag: string;
  accent: string;
  promise: string;
  line: string;
  href: string;
  cta: string;
  proof: string; // animated number, e.g. "+27%"
  proofLabel: string;
};

const FIXES: Fix[] = [
  {
    id: "clinic",
    pain: "Phone calls, no-shows and a messy front desk",
    tag: "clinic booking",
    accent: "#2bbfa5",
    promise: "A booking is only real once it's paid.",
    line: "Online and WhatsApp booking in Telugu, English and Hindi, a slot held for payment, and one live queue for your front desk.",
    href: "/work/ramachandra-ortho",
    cta: "See the clinic, live",
    proof: "15 min",
    proofLabel: "a slot waits for payment, then goes back",
  },
  {
    id: "tables",
    pain: "Guests wait to be noticed",
    tag: "restaurant ordering",
    accent: "#d99547",
    promise: "Order from the table. The waiter stays the hero.",
    line: "Scan, order together and let an AI host suggest the second round, wired into the kitchen you already run.",
    href: "/work/somaa",
    cta: "See the ordering concept",
    proof: "0",
    proofLabel: "apps for guests to download",
  },
  {
    id: "vanish",
    pain: "Customers come once, then vanish",
    tag: "ai and whatsapp",
    accent: "#27d17c",
    promise: "We win them back, automatically.",
    line: "Agents that watch behaviour, score intent and close on WhatsApp. Your best salesperson, never asleep.",
    href: "/ai",
    cta: "See AI automations",
    proof: "24/7",
    proofLabel: "always on, never off",
  },
  {
    id: "generic",
    pain: "My brand looks like everyone else",
    tag: "brand and design",
    accent: "#c8102e",
    promise: "We make you impossible to ignore.",
    line: "Colour, type, voice and motion that are unmistakably yours. We design them; we never assemble them from a template.",
    href: "/work",
    cta: "See the work",
    proof: "1 of 1",
    proofLabel: "a world that's only yours",
  },
  {
    id: "build",
    pain: "I need it built, not just drawn",
    tag: "design and build",
    accent: "#6d7bf4",
    promise: "The studio that draws it, ships it.",
    line: "One team designs and codes, so what you approve is what goes live. No hand-off to lose the idea in.",
    href: "/offer",
    cta: "See what we build",
    proof: "1 team",
    proofLabel: "design and code, no hand-off",
  },
];

// tiny count-up for the numeric proofs (skips non-numeric like 24/7, 1 of 1)
function Proof({ value, accent }: { value: string; accent: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const numeric = /^[+]?\d+%?$/.test(value);
  const target = numeric ? parseInt(value.replace(/[^\d]/g, ""), 10) : 0;
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.endsWith("%") ? "%" : "";
  const [n, setN] = useState(numeric ? 0 : 0);
  useEffect(() => {
    if (!numeric || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, target]);
  return (
    <span ref={ref} className="font-display text-6xl md:text-7xl leading-none" style={{ color: accent }}>
      {numeric ? `${prefix}${n}${suffix}` : value}
    </span>
  );
}

export function ProblemPicker() {
  const [active, setActive] = useState(0);
  const fix = FIXES[active];

  return (
    <section id="fix" data-nav-dark className="relative bg-ink text-paper py-28 md:py-32 overflow-hidden">
      {/* accent glow tracks the selected fix */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 w-[55vw] h-[55vh]"
        animate={{ opacity: 0.18 }}
        style={{ background: `radial-gradient(50% 50% at 70% 30%, ${fix.accent}, transparent 70%)` }}
        key={fix.id}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up max-w-3xl">
          <span className="label text-red">·003 / your problem, our move</span>
          <h2 className="mt-6 font-display text-5xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
            What's eating<br />your time<span className="text-red">?</span>
          </h2>
          <p className="mt-6 text-grey-dim text-[15px] md:text-lg leading-relaxed">
            Tap the one that stings. We'll show you exactly what we'd do about it.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch">
          {/* the pains — tappable */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {FIXES.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(i)}
                  className="group relative text-left rounded-2xl border px-5 md:px-6 py-5 transition-all duration-300"
                  style={{
                    borderColor: on ? f.accent : "var(--color-ink-line)",
                    background: on ? f.accent + "14" : "transparent",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full origin-center transition-transform duration-400"
                    style={{ background: f.accent, transform: on ? "scaleY(1)" : "scaleY(0)" }}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-display text-xl md:text-2xl leading-snug transition-colors ${on ? "text-paper" : "text-grey-dim group-hover:text-paper"}`}>
                      {f.pain}
                    </span>
                    <ArrowUpRight
                      className="w-5 h-5 shrink-0 transition-all duration-300"
                      style={{ color: on ? f.accent : "var(--color-grey)", transform: on ? "none" : "rotate(0)" }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* the fix — in motion */}
          <div className="lg:col-span-7">
            <div className="relative h-full rounded-3xl border border-ink-line bg-ink-soft/50 p-7 md:p-10 overflow-hidden min-h-[420px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fix.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-between gap-8"
                >
                  <div>
                    <span className="label text-[10px]" style={{ color: fix.accent }}>the fix · {fix.tag}</span>
                    <h3 className="mt-5 font-display text-4xl md:text-6xl leading-[0.98] tracking-[-0.01em]">
                      {fix.promise}
                    </h3>
                    <p className="mt-5 text-grey-dim text-[15px] md:text-lg leading-relaxed max-w-xl">{fix.line}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                      <Proof value={fix.proof} accent={fix.accent} />
                      <p className="mt-2 label text-[9px] text-grey">{fix.proofLabel}</p>
                    </div>
                    <a
                      href={fix.href}
                      {...(fix.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      data-cursor="See it"
                      className="group inline-flex items-center gap-2 label text-[11px] rounded-full px-6 py-4 text-ink transition-transform duration-300 hover:-translate-y-0.5 self-start sm:self-auto"
                      style={{ background: fix.accent }}
                    >
                      {fix.cta}
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
