import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

// ---- Somaa's own world: dark charcoal, warm amber, cream. ----
const C = {
  bg: "#0c0a09",
  surface: "#18120f",
  surfaceHi: "#1f1815",
  line: "#2a2320",
  text: "#f4ecdf",
  muted: "#b9ac98",
  dim: "#7a6f5e",
  amber: "#d99547",
  amberSoft: "#b07636",
};

const A = "/case/somaa";

function CountUp({ to, suffix = "", prefix = "", dur = 1500, decimals = 0 }: { to: number; suffix?: string; prefix?: string; dur?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? n.toFixed(decimals) : Math.round(n)}
      {suffix}
    </span>
  );
}

const META = [
  { k: "Client", v: "Somaa · Restobar & Live Music" },
  { k: "Location", v: "Yendada, Visakhapatnam" },
  { k: "Year", v: "2026" },
  { k: "Role", v: "Product · Brand · Full-stack build" },
  { k: "Stack", v: "Next.js · Supabase · Claude · Petpooja · MSG91" },
  { k: "Status", v: "Live pilot" },
];

const WALK = [
  { n: "01", t: "Scan the table.", d: "Every table carries its own QR. One scan, no app, no download, no waiting for a server to be free.", img: "step-scan" },
  { n: "02", t: "Browse a menu that feels like Somaa.", d: "47 dishes across 10 sections, each with photography, ₹ pricing, veg & bar flags, bestsellers and today's specials.", img: "step-browse" },
  { n: "03", t: "Ask Raga, the AI host.", d: "A Claude-powered dining host that knows the live menu. It suggests pairings and explains dishes in Somaa's own warm, slightly-loud voice.", img: "step-host" },
  { n: "04", t: "Order together.", d: "A shared table cart lets the whole table add dishes; the host places one order. No more shouting items across the table.", img: "step-order" },
  { n: "05", t: "Be remembered.", d: "Birthdays get a discount, anniversaries get a perk, and a loyalty ladder rewards regulars, automatically and never stacked.", img: "step-remember" },
  { n: "06", t: "Close the loop.", d: "After the meal, a quick rating earns a coupon by SMS for next time. Feedback becomes the reason to return.", img: "step-feedback" },
];

const SYSTEMS = [
  { t: "Raga · the AI host", d: "Guest-side Claude Haiku that reads the live menu and recommends in-character.", tag: "Claude · Haiku" },
  { t: "Group ordering", d: "Shared per-table cart with host-only checkout and 3-hour sessions.", tag: "Realtime" },
  { t: "Loyalty & occasions", d: "Four tiers, birthday & anniversary perks, best-single discount rule.", tag: "Engine" },
  { t: "Feedback → reward", d: "Signed post-order feedback issues a one-time coupon by SMS.", tag: "Growth loop" },
  { t: "Petpooja POS", d: "Orders forward straight to the kitchen's existing point-of-sale.", tag: "Integration" },
  { t: "Somy · sales coach", d: "Admin-side Claude Sonnet that reads revenue & feedback and coaches the floor.", tag: "Claude · Sonnet" },
];

const STATS = [
  { to: 47, suffix: "", label: "dishes on the live menu" },
  { to: 110, suffix: "+", label: "React components shipped" },
  { to: 16, suffix: "", label: "Postgres tables, RLS-secured" },
  { to: 2, suffix: "", label: "AI copilots · Raga & Somy" },
];

// What owners actually want — and the part of Somaa that delivers it. The waiter
// stays the hero; the platform makes them more effective.
const WANTS = [
  { k: "Faster service", d: "Scan, group-order and send in seconds, so tables move without waiting just to be noticed." },
  { k: "Higher average bill", d: "Raga suggests the pairing, the special and the second round, at every table, every time." },
  { k: "Better satisfaction", d: "Order-taking handled, the floor is freed for the part only people do well: hospitality." },
  { k: "More repeat visits", d: "Remembered occasions and a feedback-for-reward loop turn one good night into the next." },
];

// ---- PROJECTED IMPACT (a pilot model — NOT measured results) ----
// Clearly labelled as a projection everywhere it appears. Numbers are a modelled
// pilot ramp, not claims of actuals. Revenue is indexed to the launch baseline (100).
const REVENUE_INDEX = [100, 107, 116, 124, 131, 138]; // launch → month 5
const REVENUE_MONTHS = ["Launch", "M1", "M2", "M3", "M4", "M5"];

const IMPACT_KPIS = [
  { to: 22, prefix: "+", suffix: "%", label: "average bill value", sub: "Raga's pairings & specials" },
  { to: 27, prefix: "+", suffix: "%", label: "repeat-visit rate", sub: "occasions + feedback loop" },
  { to: 18, prefix: "+", suffix: "%", label: "faster table turns", sub: "self + group ordering" },
  { to: 4.7, suffix: "/5", decimals: 1, label: "guest satisfaction", sub: "projected average rating" },
];

// A reliable scroll-reveal: a CSS scroll-driven fade-up where supported
// (Chrome), gracefully visible everywhere else. Never gets stuck hidden.
const Reveal: FC<{ children: ReactNode; className?: string; delay?: number }> = ({ children, className = "" }) => {
  return <div className={`reveal-up ${className}`}>{children}</div>;
};

// A projected-revenue area chart that draws + rises into view. Pure SVG; the line
// animates via pathLength, the fill fades up, the end dot pops. Honest by framing,
// not by faking precision — the curve is a modelled pilot ramp (indexed to launch).
const RevenueChart: FC<{ data: number[]; months: string[] }> = ({ data, months }) => {
  const reduce = useReducedMotion();
  const W = 720, H = 260, padX = 18, padTop = 26, baseY = H - 30;
  const yMin = 92, yMax = Math.max(...data) + 8;
  const x = (i: number) => padX + (i * (W - padX * 2)) / (data.length - 1);
  const y = (v: number) => baseY - ((v - yMin) / (yMax - yMin)) * (baseY - padTop);
  const pts = data.map((v, i) => [x(i), y(v)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${baseY} L${pts[0][0].toFixed(1)},${baseY} Z`;
  const grid = [100, 115, 130, Math.round(yMax - 4)];

  return (
    <div className="rounded-2xl p-5 md:p-8" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="label text-[9px]" style={{ color: C.dim }}>Projected monthly revenue · indexed to launch</div>
          <div className="mt-2 font-display text-4xl md:text-5xl" style={{ color: C.text }}>
            <CountUp to={38} prefix="+" suffix="%" /> <span className="text-2xl" style={{ color: C.amber }}>by month 5</span>
          </div>
        </div>
        <span className="label text-[9px] hidden sm:block" style={{ color: C.dim }}>pilot model</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none" role="img" aria-label="Projected revenue rising over the pilot">
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.amber} stopOpacity="0.34" />
            <stop offset="100%" stopColor={C.amber} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {grid.map((g) => (
          <g key={g}>
            <line x1={padX} x2={W - padX} y1={y(g)} y2={y(g)} stroke={C.line} strokeWidth="1" />
            <text x={padX} y={y(g) - 5} fill={C.dim} fontSize="11" fontFamily="monospace">{g}</text>
          </g>
        ))}

        {/* area fill — fades up after the line draws */}
        <motion.path
          d={area}
          fill="url(#rev-fill)"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.9 }}
        />

        {/* the rising line — draws left to right */}
        <motion.path
          d={line}
          fill="none"
          stroke={C.amber}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* end dot — pops at the peak */}
        <motion.circle
          cx={pts[pts.length - 1][0]}
          cy={pts[pts.length - 1][1]}
          r="6"
          fill={C.amber}
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${pts[pts.length - 1][0]}px ${pts[pts.length - 1][1]}px` }}
        />
      </svg>

      <div className="mt-3 flex justify-between px-1">
        {months.map((m) => (
          <span key={m} className="font-mono text-[10px]" style={{ color: C.dim }}>{m}</span>
        ))}
      </div>
    </div>
  );
};

export function SomaaCaseStudy() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Walkthrough: the phone shows whichever step is nearest the viewport centre.
  // Measuring the DOM directly keeps the screen perfectly in sync with the text.
  const walkRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress: walkP } = useScroll({ target: walkRef, offset: ["start start", "end end"] });
  useMotionValueEvent(walkP, "change", () => {
    const mid = window.innerHeight / 2;
    let best = active;
    let bestDist = Infinity;
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  });

  return (
    <div style={{ background: C.bg, color: C.text }} className="font-sans antialiased selection:bg-[#d99547] selection:text-black">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(12,10,9,0.6)", borderBottom: `1px solid ${C.line}`, paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="label flex items-center gap-2 text-[10px]" style={{ color: C.muted }}>
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px]" style={{ color: C.dim }}>Case study · 01</span>
          <a href="#say-hi" className="label text-[10px] rounded-full px-4 py-2 transition-colors" style={{ border: `1px solid ${C.amber}`, color: C.amber }}>
            Start a project
          </a>
        </div>
      </header>

      {/* HERO — parallax */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <img src={`${A}/hero.png`} alt="Somaa signature dish" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0c0a09 8%, rgba(12,10,9,0.45) 45%, rgba(12,10,9,0.65) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-16 md:pb-24">
          <span className="label" style={{ color: C.amber }}>·01 · case study · hospitality</span>
          <img src={`${A}/wordmark-cream.png`} alt="Somaa" className="mt-8 h-16 md:h-28 w-auto object-contain object-left" />
          <p className="mt-8 font-display text-2xl md:text-4xl leading-snug max-w-2xl" style={{ color: C.text }}>
            A coastal-Andhra restobar in Vizag, and the AI-powered dining experience platform we
            designed and built to match the room.
          </p>
          <div className="mt-10 flex items-center gap-3 label" style={{ color: C.muted }}>
            <span className="inline-block w-10 h-px" style={{ background: C.amber }} /> scroll
          </div>
        </motion.div>
      </section>

      {/* marquee tagline */}
      <div className="overflow-hidden py-5 border-y" style={{ borderColor: C.line, background: C.surface }}>
        <div className="whitespace-nowrap font-display text-xl md:text-2xl" style={{ color: C.dim }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-6">
              Where the Bay of Bengal meets the bar <span style={{ color: C.amber }}>·</span> unhurried, and a little loud.
            </span>
          ))}
        </div>
      </div>

      {/* OVERVIEW meta */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: C.line, border: `1px solid ${C.line}` }}>
          {META.map((m) => (
            <div key={m.k} className="p-6 md:p-8" style={{ background: C.bg }}>
              <div className="label" style={{ color: C.amber }}>{m.k}</div>
              <div className="mt-3 text-[15px] md:text-base" style={{ color: C.text }}>{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THE BRIEF */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="label" style={{ color: C.amber }}>The brief</span>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-[2.9rem] leading-[1.12]" style={{ color: C.text }}>
              Somaa had the food, the bar and the music. What it didn't have was a way to{" "}
              <span style={{ color: C.amber }}>order</span> that felt as considered as the room.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: C.muted }}>
              Paper menus and a busy floor meant guests waited just to be noticed. Generic QR menus
              would have worked, and felt like every other place. Somaa wanted the at-table
              experience to carry the brand: warm, a little theatrical, unmistakably theirs. And it
              had to plug into the kitchen they already run on Petpooja.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE BIGGER IDEA — the reposition */}
      <section className="border-y" style={{ borderColor: C.line, background: C.surface }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
          <Reveal>
            <span className="label" style={{ color: C.amber }}>The bigger idea</span>
            <h2 className="mt-6 font-display text-3xl md:text-[3.2rem] leading-[1.08] max-w-4xl" style={{ color: C.text }}>
              Most restaurant tech sells <span style={{ color: C.dim }}>fewer waiters.</span> We built the{" "}
              <span style={{ color: C.amber }}>opposite.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: C.muted }}>
              The category pitches automation as subtraction: replace the server, thin the floor.
              But owners never wanted fewer people. They want faster tables, bigger bills, happier
              guests, and more of them coming back. So Somaa isn't a QR menu that removes the waiter.
              It's a platform that makes every waiter{" "}
              <span style={{ color: C.text }}>three times more effective</span>. The technology works
              quietly in the background, and the waiter stays the hero of the room.
            </p>
          </Reveal>

          {/* category reframe */}
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="label text-[11px]" style={{ color: C.dim, textDecoration: "line-through" }}>
                QR ordering system
              </span>
              <span style={{ color: C.dim }}>→</span>
              <span className="font-display text-xl md:text-2xl" style={{ color: C.amber }}>
                AI-powered dining experience platform
              </span>
            </div>
          </Reveal>

          {/* what owners actually want */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: C.line, border: `1px solid ${C.line}` }}>
            {WANTS.map((w) => (
              <div key={w.k} className="reveal-up p-6 md:p-7" style={{ background: C.bg }}>
                <h3 className="font-display text-xl md:text-[1.45rem] leading-tight" style={{ color: C.text }}>{w.k}</h3>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: C.muted }}>{w.d}</p>
              </div>
            ))}
          </div>

          {/* the moat */}
          <Reveal>
            <p className="mt-16 font-display text-2xl md:text-3xl leading-snug max-w-3xl" style={{ color: C.text }}>
              The gap in the market was never{" "}
              <span style={{ color: C.muted }}>“let people order from their phones.”</span> Everyone has
              that. The gap is a night worth coming back for, and that's far harder to copy than a QR code.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STICKY PRODUCT WALKTHROUGH — phone screen swaps per step on scroll */}
      <section ref={walkRef} className="border-y" style={{ borderColor: C.line, background: C.surface }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* sticky phone */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center py-16 lg:py-0">
            <div className="relative">
              <div className="relative rounded-[2.2rem] p-2.5 shadow-2xl" style={{ background: "#000", border: `1px solid ${C.line}` }}>
                <div className="relative w-[256px] md:w-[300px] aspect-[430/932] rounded-[1.7rem] overflow-hidden bg-black">
                  {WALK.map((s, i) => (
                    <img
                      key={s.img}
                      src={`${A}/${s.img}.png`}
                      alt={`Somaa · ${s.t}`}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-out"
                      style={{ opacity: active === i ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>
              {/* step pips */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
                {WALK.map((s, i) => (
                  <span key={s.n} className="w-1.5 rounded-full transition-all duration-300" style={{ height: active === i ? 22 : 8, background: active === i ? C.amber : C.line }} />
                ))}
              </div>
              <div className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(circle, rgba(217,149,71,0.5), transparent 70%)" }} />
            </div>
          </div>

          {/* scrolling steps — generous vh rhythm on desktop (synced to the sticky
              phone); tight + full-opacity on mobile, where the phone isn't sticky */}
          <div className="flex flex-col gap-14 py-12 lg:gap-[26vh] lg:py-[32vh]">
            {WALK.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="walk-step"
                data-active={active === i}
              >
                <span className="font-mono text-sm" style={{ color: C.amber }}>{s.n}</span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight" style={{ color: C.text }}>{s.t}</h3>
                <p className="mt-4 text-lg leading-relaxed max-w-md" style={{ color: C.muted }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS grid */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
        <Reveal>
          <span className="label" style={{ color: C.amber }}>Under the hood</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95]" style={{ color: C.text }}>
            Six systems, one calm experience.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.07}>
              <div className="h-full rounded-2xl p-7 md:p-8 transition-colors" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                <span className="label text-[9px]" style={{ color: C.dim }}>{s.tag}</span>
                <h3 className="mt-4 font-display text-2xl" style={{ color: C.text }}>{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: C.muted }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y" style={{ borderColor: C.line, background: C.surface }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: C.amber }}>By the numbers</span>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-6xl md:text-7xl tracking-tight" style={{ color: C.text }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-sm leading-relaxed max-w-[22ch]" style={{ color: C.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTED IMPACT — modelled pilot ramp, clearly labelled */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
        <Reveal>
          <span className="label" style={{ color: C.amber }}>Projected impact · pilot model</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl" style={{ color: C.text }}>
            What a waiter, made 3× more effective, is worth.
          </h2>
          <p className="mt-7 text-lg leading-relaxed max-w-2xl" style={{ color: C.muted }}>
            A modelled view of where the platform takes the room: bigger bills, faster tables and more
            guests coming back, compounding into revenue. These are projections for the pilot, not
            measured results.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <RevenueChart data={REVENUE_INDEX} months={REVENUE_MONTHS} />
        </Reveal>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACT_KPIS.map((k, i) => {
            const frac = Math.min(1, k.decimals ? k.to / 5 : k.to / 35);
            return (
              <Reveal key={k.label} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl p-6 md:p-7" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                  <div className="font-display text-4xl md:text-5xl tracking-tight" style={{ color: C.text }}>
                    <CountUp to={k.to} prefix={k.prefix ?? ""} suffix={k.suffix} decimals={k.decimals ?? 0} />
                  </div>
                  {/* grow bar */}
                  <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{ background: C.line }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: C.amber, transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: frac }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.1, delay: 0.15 + (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="mt-4 text-[15px]" style={{ color: C.text }}>{k.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed" style={{ color: C.dim }}>{k.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-[12px] leading-relaxed max-w-2xl" style={{ color: C.dim }}>
          Projected pilot model: illustrative figures based on the platform's mechanics and comparable
          rollouts, shown to size the opportunity. Not a claim of measured results. Revenue is indexed
          to the launch baseline (100).
        </p>
      </section>

      {/* CRAFT — brand + homepage shot */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5">
          <span className="label" style={{ color: C.amber }}>The craft</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05]" style={{ color: C.text }}>
            We dressed it in candlelight.
          </h2>
          <p className="mt-7 text-lg leading-relaxed" style={{ color: C.muted }}>
            A late-night palette of charcoal, cream and a single warm amber, with Fraunces serifs for
            warmth and Inter for clarity. Parallax, smooth scrolling and slow Ken-Burns motion make a
            phone screen feel like stepping inside the room.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {[C.bg, C.surface, C.amber, C.text].map((c) => (
              <div key={c} className="w-12 h-12 rounded-lg" style={{ background: c, border: `1px solid ${C.line}` }} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${C.line}` }}>
              <img src={`${A}/og.png`} alt="Somaa brand · order from your table, talk to the AI host" className="w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOME / CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-30" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(217,149,71,0.5), transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-40 text-center">
          <span className="label" style={{ color: C.amber }}>The outcome</span>
          <h2 className="mt-8 font-display text-4xl md:text-7xl leading-[1.0] max-w-4xl mx-auto" style={{ color: C.text }}>
            A guest can sit down, scan, and feel looked after before a server says a word.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="https://somaa.made-by-ac.com" target="_blank" rel="noreferrer" className="group label rounded-full px-7 py-4 flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5" style={{ background: C.amber, color: "#1a1206" }}>
              Visit Somaa <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#say-hi" className="label rounded-full px-7 py-4 transition-transform duration-300 hover:-translate-y-0.5" style={{ border: `1px solid ${C.line}`, color: C.text }}>
              Want one like this? →
            </a>
          </div>
        </div>
      </section>

      {/* footer strip */}
      <footer className="border-t" style={{ borderColor: C.line }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label" style={{ color: C.dim }}>
          <a href="#" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>Somaa · made. by ac · 2026</span>
        </div>
      </footer>
    </div>
  );
}
