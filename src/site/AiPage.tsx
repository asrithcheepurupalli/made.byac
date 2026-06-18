import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  Gavel,
  Send,
  Check,
  Play,
  RotateCcw,
  Bot,
  MessageSquareText,
  PhoneCall,
  ShoppingBag,
  Star,
  Sparkles,
  Wand2,
  Heart,
  Clock3,
  Brain,
  Ear,
  Plug,
  Rocket,
  Quote,
  Palette,
} from "lucide-react";

const ACCENT = "#27d17c"; // the made. AI green — same identity as the offer page

/* ------------------------------------------------------------------ *
 *  The flagship demo — "watch the agent work".
 *
 *  A scripted, self-playing simulation of the conversion + retention
 *  agent: it watches a shopper's behaviour, a judge scores the buying
 *  intent, and a closer sends a personal WhatsApp nudge with social
 *  proof and a timed offer. Nothing leaves the page — it's a scripted
 *  storyboard, not a live model (that wiring comes once the key's in).
 * ------------------------------------------------------------------ */

type Signal = { icon: typeof Eye; text: string; weight: number };

const SIGNALS: Signal[] = [
  { icon: Eye, text: "Viewed “Obsidian Black” polo · 3 times", weight: 22 },
  { icon: Heart, text: "Saved it to wishlist", weight: 20 },
  { icon: ShoppingBag, text: "Added to bag, then idle 4 min", weight: 26 },
  { icon: Clock3, text: "Hovered checkout, didn't finish", weight: 18 },
];

const CLOSER_LINES = [
  "Yo — caught you eyeing the Obsidian Black 🖤",
  "Here's how our top customers style it ↓",
  "Yours is held for the next hour — 15% off if you grab it today.",
];

const RESULTS = ["Message sent", "15% offer applied", "Bag held 60 min", "Logged to CRM"];

type Phase = "idle" | "watch" | "judge" | "close" | "done";

function AgentDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [signals, setSignals] = useState(0); // signals revealed
  const [score, setScore] = useState(0); // 0..100 intent
  const [lines, setLines] = useState(0); // closer bubbles revealed
  const runRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  async function play() {
    const id = ++runRef.current;
    setSignals(0);
    setScore(0);
    setLines(0);
    setPhase("watch");

    // 1 — watch behaviour, accumulate signals + intent
    let acc = 0;
    for (let i = 0; i < SIGNALS.length; i++) {
      if (runRef.current !== id) return;
      await wait(820);
      setSignals(i + 1);
      acc += SIGNALS[i].weight;
      setScore(Math.min(88, acc));
    }

    // 2 — the judge scores
    if (runRef.current !== id) return;
    await wait(700);
    setPhase("judge");
    await wait(1100);

    // 3 — the closer fires
    if (runRef.current !== id) return;
    setPhase("close");
    for (let i = 0; i < CLOSER_LINES.length; i++) {
      if (runRef.current !== id) return;
      await wait(i === 0 ? 500 : 1050);
      setLines(i + 1);
    }

    // 4 — results
    if (runRef.current !== id) return;
    await wait(900);
    setPhase("done");
  }

  // autoplay once when scrolled into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const judged = phase === "judge" || phase === "close" || phase === "done";
  const playing = phase !== "idle" && phase !== "done";

  return (
    <div ref={rootRef} className="rounded-3xl border border-ink-line bg-ink-soft/50 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-ink-line">
        <div className="flex items-center gap-3">
          <span className="relative flex w-2.5 h-2.5">
            {playing && (
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: ACCENT }} />
            )}
            <span className="relative inline-flex rounded-full w-2.5 h-2.5" style={{ background: phase === "idle" ? "var(--color-grey)" : ACCENT }} />
          </span>
          <span className="label text-[10px] text-paper">
            {phase === "idle" ? "Retention agent" : phase === "done" ? "Cycle complete" : "Agent live"}
            <span className="text-grey"> · made. AI</span>
          </span>
        </div>
        <span className="font-mono text-xs text-grey">
          {phase === "idle" ? "ready" : phase === "watch" ? "watching" : phase === "judge" ? "scoring" : phase === "close" ? "closing" : "done"}
        </span>
      </div>

      {/* body — three columns on desktop: watch · judge · close */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-ink-line">
        {/* WATCH */}
        <div className="md:col-span-4 bg-ink-soft/60 p-5 md:p-6 min-h-[300px]">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.7} />
            <span className="label text-[9px] text-grey-dim">Watches behaviour</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {SIGNALS.slice(0, signals).map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-2.5 rounded-xl bg-ink p-3"
                >
                  <Icon className="w-4 h-4 mt-0.5 text-grey shrink-0" strokeWidth={1.6} />
                  <span className="text-[13px] leading-snug text-paper/85">{s.text}</span>
                </motion.div>
              );
            })}
            {phase === "idle" && (
              <p className="text-grey text-[13px] leading-relaxed">
                Every scroll, hover and pause on your store becomes a signal.
              </p>
            )}
          </div>
        </div>

        {/* JUDGE */}
        <div className="md:col-span-4 bg-ink p-5 md:p-6 min-h-[300px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Gavel className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.7} />
            <span className="label text-[9px] text-grey-dim">Scores intent</span>
          </div>

          {/* the dial */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-ink-line)" strokeWidth="8" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl text-paper tabular-nums">{Math.round(score)}</span>
                <span className="label text-[8px] text-grey">intent</span>
              </div>
            </div>
            <AnimatePresence>
              {judged && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 inline-flex items-center gap-1.5 label text-[10px] rounded-full px-3 py-1.5"
                  style={{ background: ACCENT, color: "#0b0b0c" }}
                >
                  <Sparkles className="w-3.5 h-3.5" /> High intent · close now
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CLOSE */}
        <div className="md:col-span-4 bg-ink-soft/60 p-5 md:p-6 min-h-[300px]">
          <div className="flex items-center gap-2 mb-4">
            <Send className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.7} />
            <span className="label text-[9px] text-grey-dim">Closes on WhatsApp</span>
          </div>

          {phase === "close" || phase === "done" ? (
            <div className="flex flex-col gap-2">
              {CLOSER_LINES.slice(0, lines).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="self-start max-w-[92%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13px] leading-snug text-ink"
                  style={{ background: "#dcf8c6" }}
                >
                  {l}
                </motion.div>
              ))}
              {lines >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start flex gap-1.5 mt-0.5"
                >
                  {[0, 1, 2].map((n) => (
                    <span key={n} className="w-12 h-12 rounded-lg bg-ink border border-ink-line flex items-center justify-center">
                      <Star className="w-4 h-4 text-grey" strokeWidth={1.4} />
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <p className="text-grey text-[13px] leading-relaxed">
              When intent is hot, a personal message goes out — social proof, a held bag, a timed nudge.
            </p>
          )}

          <AnimatePresence>
            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 flex flex-wrap gap-1.5"
              >
                {RESULTS.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1 text-[11px] rounded-full px-2.5 py-1 border" style={{ borderColor: ACCENT + "66", color: ACCENT }}>
                    <Check className="w-3 h-3" /> {r}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-between px-5 md:px-7 py-4 border-t border-ink-line">
        <button
          onClick={play}
          disabled={playing}
          className="group inline-flex items-center gap-2.5 label text-[11px] rounded-full px-5 py-3 transition-all duration-300 disabled:opacity-50"
          style={{ background: ACCENT, color: "#0b0b0c" }}
        >
          {phase === "done" ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          {phase === "idle" ? "Run the agent" : playing ? "Working…" : "Run it again"}
        </button>
        <span className="label text-[9px] text-grey">Scripted preview · nothing leaves this page</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  What we can automate — the broader service line.
 * ------------------------------------------------------------------ */

type Auto = { icon: typeof Bot; title: string; line: string; tags: string[]; badge?: string };

const AUTOMATIONS: Auto[] = [
  {
    icon: Sparkles,
    title: "Conversion & Retention Agent",
    line: "Watches behaviour, scores intent, and closes on WhatsApp — recovers the carts you're losing today.",
    tags: ["Intent scoring", "Cart recovery", "WhatsApp / push", "Upsell", "Win-back"],
    badge: "Flagship",
  },
  {
    icon: MessageSquareText,
    title: "Concierge & Support Agent",
    line: "A 24/7 assistant in your brand's voice — answers, recommends, and books, in Hinglish or English.",
    tags: ["24/7 chat", "Multilingual", "On-brand voice", "Order help", "Hand-off to humans"],
  },
  {
    icon: PhoneCall,
    title: "Voice Sales Agent",
    line: "Picks up every call in a natural voice, qualifies the lead and books straight into your calendar.",
    tags: ["Inbound & outbound", "Booking", "Lead capture", "Call summaries"],
  },
  {
    icon: ShoppingBag,
    title: "WhatsApp Commerce",
    line: "Browse, order and pay inside a chat — the storefront your customers already live in.",
    tags: ["Catalog in chat", "Checkout", "Payments", "Order tracking"],
  },
  {
    icon: Star,
    title: "Feedback & Reputation Loop",
    line: "Reads the room after every order — routes unhappy customers to you, sends happy ones to your reviews.",
    tags: ["Sentiment", "Smart routing", "Review nudges", "Alerts"],
  },
  {
    icon: Wand2,
    title: "Creative Automation",
    line: "On-brand campaign variants, product copy and social posts at volume — drawn by the studio, scaled by AI.",
    tags: ["Ad variants", "Product copy", "Social content", "Brand-locked"],
  },
];

export function AiPage() {
  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors">
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px] text-grey">AI automations</span>
          <a href="/#say-hi" className="label text-[10px] rounded-full px-4 py-2 border" style={{ borderColor: ACCENT, color: ACCENT }}>
            Start a project
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden mx-auto max-w-[1400px] px-6 md:px-10 pt-36 md:pt-44 pb-10 md:pb-16">
        <div className="pointer-events-none absolute -top-24 right-0 w-[60vw] h-[50vh] opacity-20" style={{ background: `radial-gradient(50% 50% at 70% 30%, ${ACCENT}, transparent 70%)` }} />
        <span className="rise label block" style={{ color: ACCENT, animationDelay: "0.05s" }}>· ai automations</span>
        <h1 className="rise mt-6 font-display text-6xl md:text-[8.5rem] leading-[0.88] tracking-[-0.02em]" style={{ animationDelay: "0.13s" }}>
          Agents that<br />work the room
          <span style={{ color: ACCENT }}>.</span>
        </h1>
        <p className="rise mt-9 font-display text-xl md:text-2xl leading-snug max-w-2xl text-paper/80" style={{ animationDelay: "0.28s" }}>
          The same studio that designs the brand now builds the AI behind it — agents that watch, decide
          and act on their own. They answer, they recommend, and they close the sale you were about to lose.
        </p>
      </section>

      {/* the story / the idea */}
      <StorySection />

      {/* the flagship demo */}
      <section className="border-y border-ink-line bg-ink-soft/20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
          <div className="reveal-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <span className="label" style={{ color: ACCENT }}>· see it work</span>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
                Watch, score,<br /><span className="italic font-normal" style={{ color: ACCENT }}>close.</span>
              </h2>
            </div>
            <p className="text-grey-dim text-[15px] md:text-base leading-relaxed max-w-md">
              A shopper browses and leaves. The agent watches the behaviour, a judge scores the buying intent,
              and a closer sends a personal nudge on WhatsApp — automatically. Here's the whole cycle.
            </p>
          </div>
          <div className="reveal-up">
            <AgentDemo />
          </div>
        </div>
      </section>

      {/* how we build */}
      <HowWeBuild />

      {/* what we can automate */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="reveal-up max-w-2xl">
          <span className="label text-red">· what we can automate</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
            Six agents,<br />one studio.
          </h2>
          <p className="mt-6 text-grey-dim text-[15px] md:text-base leading-relaxed">
            We don't bolt on a generic chatbot. Each agent is designed in your brand's voice and wired into
            the tools you already run — built by the team that drew the brand in the first place.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {AUTOMATIONS.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="reveal-up group relative rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-8 flex flex-col hover:border-grey transition-colors"
              >
                {a.badge && (
                  <span className="absolute top-6 right-6 label text-[8px] rounded-full px-2.5 py-1 leading-none" style={{ background: ACCENT, color: "#0b0b0c" }}>
                    {a.badge}
                  </span>
                )}
                <span
                  className="w-11 h-11 rounded-xl border border-ink-line flex items-center justify-center transition-all duration-300 group-hover:-rotate-6"
                  style={{ color: ACCENT }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display text-2xl leading-tight">{a.title}</h3>
                <p className="mt-3 text-grey-dim text-[14px] leading-relaxed flex-1">{a.line}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <span key={t} className="text-[11px] rounded-full px-2.5 py-1 border border-ink-line text-grey">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* anything, end to end */}
      <Breadth />

      {/* proof — somaa */}
      <Proof />

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink-line">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-25" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${ACCENT}, transparent 70%)` }} />
        <div className="reveal-up relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="label" style={{ color: ACCENT }}>Next</span>
          <h2 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">
            Want one of these working for your brand? Let's scope it.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="/#say-hi" className="group label rounded-full px-7 py-4 flex items-center gap-2 text-ink hover:-translate-y-0.5 transition-all duration-300" style={{ background: ACCENT }}>
              Start a project <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/offer" className="label rounded-full px-7 py-4 border border-ink-line text-paper hover:border-grey transition-colors">Everything we offer</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <a href="/" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>made. by ac · ai automations</span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  The story — the one idea that makes us instantly recognisable:
 *  the studio designs the face, and now builds the brain behind it.
 * ------------------------------------------------------------------ */

function StorySection() {
  return (
    <section className="relative overflow-hidden border-b border-ink-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
        <span className="reveal-up label" style={{ color: ACCENT }}>· the idea</span>
        <h2 className="reveal-up mt-7 font-display text-5xl md:text-8xl leading-[0.9] tracking-[-0.02em] max-w-5xl">
          The face.<br />And now, <span className="italic font-normal" style={{ color: ACCENT }}>the brain.</span>
        </h2>
        <p className="reveal-up mt-9 font-display text-xl md:text-3xl leading-snug max-w-3xl text-paper/80">
          For years we made brands impossible to ignore. Now we make them impossible to out-think.
          The same studio that shapes how a brand looks and sounds builds the layer underneath —
          the judgment that notices, decides and closes. One team for the part your customers see,
          and the part that never sleeps.
        </p>

        <div className="reveal-up mt-14 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="rounded-2xl border border-ink-line bg-ink-soft/40 p-8 md:p-10">
            <span className="w-11 h-11 rounded-xl border border-ink-line flex items-center justify-center text-gold">
              <Palette className="w-5 h-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-6 font-display text-3xl">The face</h3>
            <p className="mt-3 text-grey-dim text-[15px] leading-relaxed">
              Brand, packaging, sites and campaigns. The part the world sees and remembers — the craft
              we've always been known for.
            </p>
          </div>
          <div className="rounded-2xl border p-8 md:p-10" style={{ borderColor: ACCENT + "55", background: ACCENT + "0d" }}>
            <span className="w-11 h-11 rounded-xl border flex items-center justify-center" style={{ borderColor: ACCENT + "55", color: ACCENT }}>
              <Brain className="w-5 h-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-6 font-display text-3xl">The brain</h3>
            <p className="mt-3 text-grey-dim text-[15px] leading-relaxed">
              Agents that watch, judge and act on their own — answering, recommending and closing. The part
              that works while you sleep. (Yes, <span className="text-paper">thebrain@made-by-ac.com</span> was always the plan.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  How we build — the method, named and legible. Signals that any
 *  agent is a known, repeatable build, not a science project.
 * ------------------------------------------------------------------ */

const BUILD_STEPS = [
  { icon: Ear, no: "01", title: "Listen", body: "We map every moment a customer touches you — and every place they quietly slip away." },
  { icon: Brain, no: "02", title: "Give it judgment", body: "We design what the agent notices, decides and says — in your brand's exact voice, not a default one." },
  { icon: Plug, no: "03", title: "Wire it in", body: "We connect it to the tools you already run: WhatsApp, your store, POS, calendar and CRM." },
  { icon: Rocket, no: "04", title: "Ship & sharpen", body: "Live on real traffic from day one. We watch how it performs and tune it every week." },
];

function HowWeBuild() {
  return (
    <section className="border-b border-ink-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="reveal-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="label text-red">· how we build</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
              From a hunch<br />to a <span className="italic font-normal" style={{ color: ACCENT }}>hire.</span>
            </h2>
          </div>
          <p className="text-grey-dim text-[15px] md:text-base leading-relaxed max-w-md">
            An agent is a teammate you onboard once and never re-train. Here's how yours gets made —
            usually two weeks to a working pilot, not a six-month deck.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-line border border-ink-line rounded-2xl overflow-hidden">
          {BUILD_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.no} className="reveal-up group bg-ink-soft/40 p-7 md:p-8 hover:bg-ink-soft transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl border border-ink-line flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6" style={{ color: ACCENT }}>
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-sm text-grey">{s.no}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-tight">{s.title}</h3>
                <p className="mt-3 text-grey-dim text-[14px] leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Anything, end to end — one studio carries the whole stack, so the
 *  reader trusts we can take on any service, not just the six above.
 * ------------------------------------------------------------------ */

const STACK = ["Strategy", "Brand", "Design", "Build", "AI"];

const JOBS = [
  "Recover abandoned carts", "Answer every call", "Book appointments", "Qualify inbound leads",
  "Chase reviews", "Re-order reminders", "Table reservations", "Quote & invoice", "Win back lapsed customers",
  "Onboard new users", "Triage support", "Upsell at checkout", "Follow up after a visit", "Route the right lead to the right person",
];

function Breadth() {
  return (
    <section className="border-b border-ink-line bg-ink-soft/20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="reveal-up max-w-3xl">
          <span className="label" style={{ color: ACCENT }}>· anything, end to end</span>
          <h2 className="mt-6 font-display text-4xl md:text-7xl leading-[0.92] tracking-[-0.02em]">
            If it repeats,<br />we can automate it.
          </h2>
          <p className="mt-7 text-grey-dim text-[15px] md:text-lg leading-relaxed">
            One studio, the whole stack — strategy, brand, design, build and AI under a single roof. Nothing
            gets lost between a design agency, a dev shop and some “AI guy.” You bring the problem; we carry the
            entire thing, from the first sketch to the agent running in production.
          </p>
        </div>

        {/* the whole stack, one team */}
        <div className="reveal-up mt-12 flex flex-wrap items-center gap-2 md:gap-3">
          {STACK.map((s, i) => (
            <div key={s} className="flex items-center gap-2 md:gap-3">
              <span className="label text-[11px] rounded-full px-4 py-2.5 border border-ink-line text-paper/85">{s}</span>
              {i < STACK.length - 1 && <span className="text-grey">→</span>}
            </div>
          ))}
          <span className="label text-[10px] text-grey ml-1 md:ml-3">one team</span>
        </div>

        {/* example jobs */}
        <div className="reveal-up mt-10">
          <span className="label text-grey-dim">A few things we hand to agents</span>
          <div className="mt-5 flex flex-wrap gap-2">
            {JOBS.map((j) => (
              <span key={j} className="text-[13px] rounded-full px-3.5 py-2 border border-ink-line bg-ink/40 text-paper/80 hover:text-paper hover:border-grey transition-colors">
                {j}
              </span>
            ))}
            <span className="text-[13px] rounded-full px-3.5 py-2 border" style={{ borderColor: ACCENT + "66", color: ACCENT }}>
              …or whatever's eating your team's day
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Proof — this isn't a concept deck. We already shipped one (Somaa).
 * ------------------------------------------------------------------ */

function Proof() {
  return (
    <section className="border-b border-ink-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="reveal-up lg:col-span-7">
          <span className="label text-gold">· proof</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
            We don't just pitch this.<br /><span className="italic font-normal text-gold">We ship it.</span>
          </h2>
          <p className="mt-7 text-grey-dim text-[15px] md:text-lg leading-relaxed max-w-xl">
            In Vizag, Somaa runs an AI dining host we designed and built — it greets guests, takes the
            order and knows the menu, wired straight into the kitchen's POS. The agents on this page
            aren't a concept. They're already how we work.
          </p>
          <a href="#/work/somaa" className="group mt-9 inline-flex items-center gap-2 label" style={{ color: ACCENT }}>
            See the Somaa build
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="reveal-up lg:col-span-5">
          <figure className="rounded-3xl border border-ink-line bg-ink-soft/40 p-8 md:p-10">
            <Quote className="w-8 h-8" style={{ color: ACCENT }} strokeWidth={1.4} />
            <blockquote className="mt-5 font-display text-2xl md:text-3xl leading-snug text-paper/90">
              The same team that drew the brand shipped the AI behind it. No hand-offs, no “that's not our scope.”
            </blockquote>
            <figcaption className="mt-7 label text-[10px] text-grey-dim">made. by ac · design → build → AI</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
