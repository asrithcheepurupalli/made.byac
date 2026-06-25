import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── The living system ────────────────────────────────────────────────────────
// The site, laid bare. Four colours, three fonts, one grid. A kinetic type bay you
// can type into, and a specimen card you re-theme by changing tokens, to feel what a
// system actually buys you: change one value, everything stays coherent.

function PageHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey-dim">the living system</span>
      </div>
    </header>
  );
}

const COLOURS = [
  { name: "ink", hex: "#0b0b0c", role: "the canvas and the type. our default dark.", dark: true },
  { name: "paper", hex: "#f6f3ee", role: "the light canvas. warm, never pure white.", dark: false },
  { name: "red", hex: "#c8102e", role: "the single action. one per screen, never two.", dark: true },
  { name: "gold", hex: "#bd9b4e", role: "warmth and emphasis. never an action.", dark: true },
];

const ACCENTS = [
  { name: "red", hex: "#c8102e" },
  { name: "gold", hex: "#bd9b4e" },
  { name: "green", hex: "#27d17c" },
  { name: "blue", hex: "#3a7ca5" },
];
const RADII = [
  { name: "sharp", v: 2 },
  { name: "soft", v: 12 },
  { name: "round", v: 999 },
];
const FONTS = [
  { name: "Fraunces", stack: "'Fraunces', serif" },
  { name: "Hanken", stack: "'Hanken Grotesk', sans-serif" },
  { name: "Space Mono", stack: "'Space Mono', monospace" },
];

const PRINCIPLES: [string, string][] = [
  ["Red is the one action", "Exactly one red call-to-action per screen. Two reds and your eye has nowhere to land."],
  ["Gold is warmth, not action", "It emphasises and reassures. It never asks you to click."],
  ["One extra accent, at most", "A page may borrow a single extra colour (an AI green, say). The frame stays ink, paper, red, gold."],
  ["The dot is the signature", "Lowercase made. with an upright red dot. The middot · separates, the arrow → moves you on."],
  ["Motion earns its keep", "Every animation has a reason, and every one of them switches off under reduced motion."],
  ["Paper is warm, never white", "Pure #fff is cold. Our paper carries a little warmth, so the ink feels like ink on a page."],
];

export function SystemPage() {
  const [type, setType] = useState("Design is intelligence made visible");
  const [accent, setAccent] = useState(ACCENTS[0].hex);
  const [radius, setRadius] = useState(12);
  const [font, setFont] = useState(FONTS[0].stack);
  const [grid, setGrid] = useState(false);

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh] overflow-clip">
      <PageHeader />
      <main>
        {/* hero */}
        <section className="reveal-up px-6 md:px-10 pt-32 pb-12 md:pt-40">
          <div className="mx-auto max-w-[1600px]">
            <span className="label text-red">·the living system</span>
            <h1 className="mt-6 font-display text-[12vw] leading-[0.88] tracking-[-0.03em] sm:text-[7.5rem]">
              Built on<br /><span className="italic font-normal text-gold">almost nothing.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-grey-dim leading-relaxed font-display">
              Four colours. Three fonts. One grid. Everything you have seen on this site is made from these, and from a handful of rules. A system is not a constraint, it is the reason the whole thing feels like one hand made it.
            </p>
          </div>
        </section>

        {/* the four colours */}
        <section className="reveal-up border-t border-ink-line py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <span className="label text-red">·001 / the palette</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight">Four colours, with jobs.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLOURS.map((c) => (
                <div key={c.name} className="overflow-hidden rounded-xl border border-ink-line">
                  <div className="flex h-32 items-end p-4" style={{ background: c.hex }}>
                    <span className="font-display text-2xl" style={{ color: c.dark ? "#f6f3ee" : "#0b0b0c" }}>{c.name}</span>
                  </div>
                  <div className="bg-ink-soft/40 p-4">
                    <div className="font-mono text-[11px] text-grey-dim">{c.hex}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-paper/80">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* kinetic type bay */}
        <section className="reveal-up border-t border-ink-line py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <span className="label text-red">·002 / the type</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight">Three voices. Type into them.</h2>
            <input
              value={type}
              onChange={(e) => setType(e.target.value.slice(0, 48))}
              spellCheck={false}
              aria-label="type to set"
              className="mt-8 block w-full max-w-3xl border-b border-ink-line bg-transparent pb-3 text-xl text-paper outline-none transition-colors focus:border-gold placeholder:text-paper/25"
              placeholder="type something"
            />
            <div className="mt-10 grid gap-10 border-t border-ink-line pt-10 lg:grid-cols-3">
              <div>
                <div className="label text-[8px] text-grey-dim">Fraunces · display</div>
                <p className="mt-3 text-3xl md:text-4xl leading-[1.05]" style={{ fontFamily: "'Fraunces', serif" }}>{type || "Display"}</p>
              </div>
              <div>
                <div className="label text-[8px] text-grey-dim">Hanken Grotesk · body</div>
                <p className="mt-3 text-xl leading-relaxed text-paper/85" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{type || "Body copy"}</p>
              </div>
              <div>
                <div className="label text-[8px] text-grey-dim">Space Mono · label</div>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-gold" style={{ fontFamily: "'Space Mono', monospace" }}>{type || "Label"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* the living token panel */}
        <section className="reveal-up border-t border-ink-line py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <span className="label text-red">·003 / one grid, many faces</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight tracking-tight">Change a token.<br />Watch it all follow.</h2>
            <p className="mt-4 max-w-xl text-grey-dim">This is the whole point of a system. Move one value and everything stays coherent, because nothing was hand-placed.</p>

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
              {/* controls */}
              <div className="lg:col-span-4 space-y-7">
                <div>
                  <div className="label text-[8px] text-grey-dim">accent</div>
                  <div className="mt-3 flex gap-2">
                    {ACCENTS.map((a) => (
                      <button key={a.name} onClick={() => setAccent(a.hex)} aria-label={a.name} className="h-9 w-9 rounded-full transition-transform hover:scale-110" style={{ background: a.hex, outline: accent === a.hex ? "2px solid var(--color-paper)" : "none", outlineOffset: 2 }} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="label text-[8px] text-grey-dim">radius</div>
                  <div className="mt-3 flex gap-2">
                    {RADII.map((r) => (
                      <button key={r.name} onClick={() => setRadius(r.v)} className="label rounded-md border px-3 py-2 text-[9px] transition-colors" style={{ borderColor: radius === r.v ? "var(--color-gold)" : "var(--color-ink-line)", color: radius === r.v ? "var(--color-paper)" : "var(--color-grey-dim)" }}>{r.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="label text-[8px] text-grey-dim">heading font</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {FONTS.map((f) => (
                      <button key={f.name} onClick={() => setFont(f.stack)} className="label rounded-md border px-3 py-2 text-[9px] transition-colors" style={{ borderColor: font === f.stack ? "var(--color-gold)" : "var(--color-ink-line)", color: font === f.stack ? "var(--color-paper)" : "var(--color-grey-dim)" }}>{f.name}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setGrid((g) => !g)} className="label rounded-full border border-ink-line px-4 py-2 text-[9px] text-grey-dim transition-colors hover:text-paper">{grid ? "hide the grid" : "show the grid"}</button>
              </div>

              {/* specimen card */}
              <div className="lg:col-span-8">
                <div className="relative overflow-hidden border border-ink-line bg-paper text-ink" style={{ borderRadius: Math.min(radius, 28) }}>
                  {grid && (
                    <div aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ backgroundImage: "linear-gradient(var(--color-red) 1px, transparent 1px), linear-gradient(90deg, var(--color-red) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.12 }} />
                  )}
                  <div className="relative grid gap-8 p-7 md:grid-cols-2 md:p-10">
                    <div>
                      <span className="label text-[9px]" style={{ color: accent }}>new in</span>
                      <h3 className="mt-3 text-4xl leading-[0.98] tracking-tight" style={{ fontFamily: font }}>Aurelia<span style={{ color: accent }}>.</span></h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-ink/70" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>A daily serum that does the quiet work. One pump, every morning, for the kind of skin that needs no filter.</p>
                      <div className="mt-6 flex items-center gap-3">
                        <button className="px-5 py-2.5 text-sm font-semibold text-white" style={{ background: accent, borderRadius: Math.min(radius, 999) }}>Add to bag</button>
                        <span className="px-3 py-2 text-xs font-medium" style={{ border: `1px solid ${accent}`, color: accent, borderRadius: Math.min(radius, 999) }}>₹2,400</span>
                      </div>
                    </div>
                    <div className="rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}22, transparent)`, borderRadius: Math.min(radius, 20), minHeight: 180 }}>
                      <div className="flex h-full items-center justify-center">
                        <span className="text-7xl" style={{ fontFamily: font, color: accent }}>Aa</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 label text-[9px] text-grey-dim">one card, every token live. nothing here is hand-placed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* the rules */}
        <section data-nav-dark className="reveal-up bg-paper text-ink border-t border-paper-line py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <span className="label text-red">·004 / the rules</span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl leading-tight tracking-tight">A few rules do most of the work.</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
              {PRINCIPLES.map(([t, d]) => (
                <div key={t} className="bg-paper p-6">
                  <h3 className="font-display text-xl leading-tight">{t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-grey">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* cta */}
        <section className="reveal-up border-t border-ink-line py-24 md:py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight">Every client gets<br /><span className="italic font-normal text-gold">a system like this.</span></h2>
            <p className="mt-5 text-grey-dim leading-relaxed">Not a logo and a hope. A kit of colours, type, spacing and rules, so your brand stays itself on every screen, in every hand.</p>
            <a href="/#say-hi" data-cursor="Hello" className="mt-9 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-paper transition-transform hover:-translate-y-0.5">
              <span className="label text-[11px]">Build yours with us</span><ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
