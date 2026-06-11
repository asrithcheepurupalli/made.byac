import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
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

function CountUp({ to, suffix = "", prefix = "", dur = 1500 }: { to: number; suffix?: string; prefix?: string; dur?: number }) {
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
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

const META = [
  { k: "Client", v: "Somaa — Restobar & Live Music" },
  { k: "Location", v: "Yendada, Visakhapatnam" },
  { k: "Year", v: "2026" },
  { k: "Role", v: "Product · Brand · Full-stack build" },
  { k: "Stack", v: "Next.js · Supabase · Claude · Petpooja · MSG91" },
  { k: "Status", v: "Live pilot" },
];

const WALK = [
  { n: "01", t: "Scan the table.", d: "Every table carries its own QR. One scan — no app, no download, no waiting for a server to be free." },
  { n: "02", t: "Browse a menu that feels like Somaa.", d: "47 dishes across 10 sections, each with photography, ₹ pricing, veg & bar flags, bestsellers and today's specials." },
  { n: "03", t: "Ask Raga, the AI host.", d: "A Claude-powered dining host that knows the live menu — suggests pairings and explains dishes in Somaa's own warm, slightly-loud voice." },
  { n: "04", t: "Order together.", d: "A shared table cart lets the whole table add dishes; the host places one order. No more shouting items across the table." },
  { n: "05", t: "Be remembered.", d: "Birthdays get 15% off, anniversaries get a perk, and a loyalty ladder rewards regulars — automatically, never stacked." },
  { n: "06", t: "Close the loop.", d: "After the meal, a quick rating earns a coupon by SMS for next time. Feedback becomes the reason to return." },
];

const SYSTEMS = [
  { t: "Raga — the AI host", d: "Guest-side Claude Haiku that reads the live menu and recommends in-character.", tag: "Claude · Haiku" },
  { t: "Group ordering", d: "Shared per-table cart with host-only checkout and 3-hour sessions.", tag: "Realtime" },
  { t: "Loyalty & occasions", d: "Four tiers, birthday & anniversary perks, best-single discount rule.", tag: "Engine" },
  { t: "Feedback → reward", d: "Signed post-order feedback issues a one-time coupon by SMS.", tag: "Growth loop" },
  { t: "Petpooja POS", d: "Orders forward straight to the kitchen's existing point-of-sale.", tag: "Integration" },
  { t: "Somy — sales coach", d: "Admin-side Claude Sonnet that reads revenue & feedback and coaches the floor.", tag: "Claude · Sonnet" },
];

const STATS = [
  { to: 47, suffix: "", label: "dishes on the live menu" },
  { to: 110, suffix: "+", label: "React components shipped" },
  { to: 16, suffix: "", label: "Postgres tables, RLS-secured" },
  { to: 2, suffix: "", label: "AI copilots — Raga & Somy" },
];

// A reliable scroll-reveal: a CSS scroll-driven fade-up where supported
// (Chrome), gracefully visible everywhere else. Never gets stuck hidden.
const Reveal: FC<{ children: ReactNode; className?: string; delay?: number }> = ({ children, className = "" }) => {
  return <div className={`reveal-up ${className}`}>{children}</div>;
};

export function SomaaCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ background: C.bg, color: C.text }} className="font-sans antialiased selection:bg-[#d99547] selection:text-black">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(12,10,9,0.6)", borderBottom: `1px solid ${C.line}` }}>
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
          <span className="label" style={{ color: C.amber }}>·01 — case study / hospitality</span>
          <img src={`${A}/wordmark-cream.png`} alt="Somaa" className="mt-8 h-16 md:h-28 w-auto object-contain object-left" />
          <p className="mt-8 font-display text-2xl md:text-4xl leading-snug max-w-2xl" style={{ color: C.text }}>
            A coastal-Andhra restobar in Vizag — and the QR dining platform we designed and built to
            match the room.
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
              Where the Bay of Bengal meets the bar <span style={{ color: C.amber }}>—</span> unhurried, and a little loud.
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
              would have worked — and felt like every other place. Somaa wanted the at-table
              experience to carry the brand: warm, a little theatrical, unmistakably theirs. And it
              had to plug into the kitchen they already run on Petpooja.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STICKY PRODUCT WALKTHROUGH */}
      <section className="border-y" style={{ borderColor: C.line, background: C.surface }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* sticky phone */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center py-16 lg:py-0">
            <div className="relative">
              <div className="rounded-[2.2rem] p-2.5 shadow-2xl" style={{ background: "#000", border: `1px solid ${C.line}` }}>
                <img src={`${A}/shot-menu.png`} alt="Somaa at-table menu" className="w-[260px] md:w-[300px] rounded-[1.7rem]" />
              </div>
              <div className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(circle, rgba(217,149,71,0.5), transparent 70%)" }} />
            </div>
          </div>

          {/* scrolling steps */}
          <div className="flex flex-col gap-[18vh] py-[20vh]">
            {WALK.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0.25, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-mono text-sm" style={{ color: C.amber }}>{s.n}</span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight" style={{ color: C.text }}>{s.t}</h3>
                <p className="mt-4 text-lg leading-relaxed max-w-md" style={{ color: C.muted }}>{s.d}</p>
              </motion.div>
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

      {/* CRAFT — brand + homepage shot */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5">
          <span className="label" style={{ color: C.amber }}>The craft</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05]" style={{ color: C.text }}>
            We dressed it in candlelight.
          </h2>
          <p className="mt-7 text-lg leading-relaxed" style={{ color: C.muted }}>
            A late-night palette — charcoal, cream and a single warm amber — with Fraunces serifs for
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
              <img src={`${A}/shot-home.png`} alt="Somaa marketing site" className="w-full" />
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
            A guest can sit down, scan, and feel looked after — before a server says a word.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="https://somaa.made-by-ac.com" target="_blank" rel="noreferrer" className="label rounded-full px-7 py-4 flex items-center gap-2 transition-colors" style={{ background: C.amber, color: "#1a1206" }}>
              Visit Somaa <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="#say-hi" className="label rounded-full px-7 py-4 transition-colors" style={{ border: `1px solid ${C.line}`, color: C.text }}>
              Want one like this? →
            </a>
          </div>
        </div>
      </section>

      {/* footer strip */}
      <footer className="border-t" style={{ borderColor: C.line }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label" style={{ color: C.dim }}>
          <a href="#" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>Somaa — made. by ac · 2026</span>
        </div>
      </footer>
    </div>
  );
}
