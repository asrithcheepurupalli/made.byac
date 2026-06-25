import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Shuffle } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── made. live ───────────────────────────────────────────────────────────────
// A pocket-sized taste of how we compose a brand from a feeling. Type a name and a
// vibe; a palette, a type pairing, a tagline and a live mock fall into place in a
// blink. No API, all client-side and deterministic, so it never goes dark in prod.
// The real, researched version (real menu, real photos, a named AI host) is made.
// table, and the page says so.

const EXTRA_FONTS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Serif+Display&family=Playfair+Display:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap";

type World = {
  label: string;
  keywords: string[];
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accents: string[];
  display: string;
  displayName: string;
  body: string;
  bodyName: string;
  taglines: string[];
  cta: string;
};

const WORLDS: World[] = [
  { label: "Late-night & moody", keywords: ["bar", "night", "moody", "jazz", "speakeasy", "wine", "lounge", "dark", "smoke", "whisky", "cocktail", "candlelit", "dim"], bg: "#0e0c0b", surface: "#1a1512", ink: "#f1e7d8", muted: "#a99e8c", accents: ["#d99547", "#c8102e", "#b8894a"], display: "'Fraunces', serif", displayName: "Fraunces", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Where the night slows down.", "Last call is a suggestion.", "Low light, high proof."], cta: "Reserve" },
  { label: "Coastal & fresh", keywords: ["beach", "coastal", "sea", "ocean", "fish", "fresh", "breezy", "sail", "tide", "shore", "seafood", "harbour"], bg: "#f3f1ea", surface: "#ffffff", ink: "#16323a", muted: "#5e7178", accents: ["#2f8f8f", "#3a7ca5", "#1f9e8a"], display: "'Cormorant Garamond', serif", displayName: "Cormorant", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Caught this morning.", "Salt, light, and time.", "The sea, plated."], cta: "Book a table" },
  { label: "Heritage & luxe", keywords: ["luxury", "fine", "heritage", "royal", "gold", "elegant", "tasting", "michelin", "couture", "grand", "atelier"], bg: "#100f0d", surface: "#1c1916", ink: "#f4eede", muted: "#a59c87", accents: ["#bd9b4e", "#c0a35e", "#9c7e3f"], display: "'Playfair Display', serif", displayName: "Playfair", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["An occasion, by design.", "Quietly extraordinary.", "Heritage, served."], cta: "Enquire" },
  { label: "Loud & youthful", keywords: ["playful", "fun", "youth", "neon", "street", "pop", "vibrant", "cafe", "startup", "energy", "skate", "gen z"], bg: "#11121a", surface: "#1b1d29", ink: "#f4f4f8", muted: "#9a9cb0", accents: ["#ff4d6d", "#5b8cff", "#ffd23f"], display: "'Space Grotesk', sans-serif", displayName: "Space Grotesk", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Loud, on purpose.", "For the always-on.", "Caffeine and chaos."], cta: "Order now" },
  { label: "Earthy & handmade", keywords: ["craft", "artisan", "earthy", "clay", "rustic", "bakery", "organic", "handmade", "farm", "terracotta", "sourdough", "wood"], bg: "#f4ece2", surface: "#fffaf3", ink: "#2a211a", muted: "#7a6a58", accents: ["#b5623a", "#a8763f", "#8c5a3c"], display: "'Fraunces', serif", displayName: "Fraunces", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Made by hand, slowly.", "From the ground up.", "Honest, earthy, warm."], cta: "Visit us" },
  { label: "Botanical & calm", keywords: ["garden", "botanical", "green", "plant", "wellness", "tea", "vegan", "leaf", "herbal", "matcha", "spa", "yoga"], bg: "#eef2e9", surface: "#ffffff", ink: "#1f2a1c", muted: "#5d6b56", accents: ["#4a7c3a", "#6b8f4e", "#3f7a5a"], display: "'Cormorant Garamond', serif", displayName: "Cormorant", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Green, all the way down.", "Grown, not made.", "A quieter kind of good."], cta: "Find your calm" },
  { label: "Industrial & sharp", keywords: ["tech", "industrial", "modern", "minimal", "concrete", "brutalist", "studio", "raw", "mono", "future", "lab", "saas"], bg: "#0c0d0f", surface: "#16181c", ink: "#eef0f2", muted: "#8b9197", accents: ["#3de08f", "#5b8cff", "#e0e0e0"], display: "'Space Grotesk', sans-serif", displayName: "Space Grotesk", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Form, function, no friction.", "Built like infrastructure.", "Raw, by design."], cta: "Get started" },
  { label: "Soft & romantic", keywords: ["soft", "romantic", "pastel", "floral", "patisserie", "dreamy", "bridal", "sweet", "dessert", "rose", "petal"], bg: "#f7f0f0", surface: "#fffafa", ink: "#3a2630", muted: "#8a6c78", accents: ["#c86b8a", "#b8718f", "#d98f6a"], display: "'DM Serif Display', serif", displayName: "DM Serif", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Sweet, with intent.", "A little softness.", "Made to be adored."], cta: "Treat yourself" },
  { label: "Warm & festive", keywords: ["spice", "indian", "saffron", "masala", "warm", "festive", "curry", "tandoor", "biryani", "desi", "thali", "street food"], bg: "#160f0a", surface: "#231711", ink: "#f6e9d6", muted: "#ab9982", accents: ["#e8702a", "#d4a017", "#c8102e"], display: "'Fraunces', serif", displayName: "Fraunces", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Spice, with a story.", "Warm to the last bite.", "Festive, always."], cta: "Order in" },
  { label: "Clean & editorial", keywords: ["clean", "simple", "editorial", "classic", "timeless", "minimal", "studio", "design"], bg: "#f6f3ee", surface: "#ffffff", ink: "#16130f", muted: "#6f6a62", accents: ["#c8102e", "#bd9b4e", "#16130f"], display: "'Fraunces', serif", displayName: "Fraunces", body: "'Hanken Grotesk', sans-serif", bodyName: "Hanken Grotesk", taglines: ["Less, but better.", "Designed to last.", "Clarity, on purpose."], cta: "Say hello" },
];

const EXAMPLES = [
  "Driftwood, a coastal seafood shack",
  "Volt, a third-wave specialty café",
  "Maison Noir, a candlelit wine bar",
  "Saffron Road, a festive Indian kitchen",
  "Fern & Stone, a botanical tearoom",
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return h >>> 0;
}

function compose(input: string, roll: number) {
  const raw = input.trim() || "Your Brand";
  const name = (raw.split(",")[0] || raw).trim().slice(0, 24) || "Your Brand";
  const vibe = (raw.includes(",") ? raw.slice(raw.indexOf(",") + 1) : raw).toLowerCase();
  let best = WORLDS[WORLDS.length - 1];
  let score = 0;
  for (const w of WORLDS) {
    let s = 0;
    for (const k of w.keywords) if (vibe.includes(k)) s++;
    if (s > score) { score = s; best = w; }
  }
  if (score === 0) best = WORLDS[hash(raw) % (WORLDS.length - 1)];
  const h = hash(raw) + roll * 2654435761;
  const accent = best.accents[h % best.accents.length];
  const tagline = best.taglines[(h >>> 3) % best.taglines.length];
  return { name, world: best, accent, tagline };
}

function PageHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey-dim">made. live</span>
      </div>
    </header>
  );
}

function Swatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-9 w-9 shrink-0 rounded-md border border-ink-line" style={{ background: hex }} />
      <div className="leading-tight">
        <div className="label text-[8px] text-grey-dim">{name}</div>
        <div className="font-mono text-[11px] text-paper/80">{hex}</div>
      </div>
    </div>
  );
}

export function LivePage() {
  const [input, setInput] = useState("Maison Noir, a candlelit wine bar");
  const [roll, setRoll] = useState(0);
  const brand = useMemo(() => compose(input, roll), [input, roll]);
  const { name, world, accent, tagline } = brand;

  useEffect(() => {
    if (document.getElementById("made-live-fonts")) return;
    const l = document.createElement("link");
    l.id = "made-live-fonts";
    l.rel = "stylesheet";
    l.href = EXTRA_FONTS;
    document.head.appendChild(l);
  }, []);

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh] overflow-clip">
      <PageHeader />
      <main>
        {/* hero + composer */}
        <section className="reveal-up px-6 md:px-10 pt-32 pb-12 md:pt-40">
          <div className="mx-auto max-w-[1600px]">
            <span className="label text-red">·made. live</span>
            <h1 className="mt-6 font-display text-[12vw] leading-[0.88] tracking-[-0.03em] sm:text-[7rem]">
              Type it.<br /><span className="italic font-normal text-gold">Watch it become a brand.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-grey-dim leading-relaxed font-display">
              This is how we start, a feeling becomes a palette, a type pairing, a voice. It runs in a blink, right here. The real version researches your place and builds the whole thing. That one is made. table.
            </p>

            <div className="mt-10 max-w-3xl">
              <label className="label text-grey-dim text-[10px]">name your place, then the vibe</label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 60))}
                spellCheck={false}
                aria-label="describe your brand"
                className="mt-2 block w-full border-b border-ink-line bg-transparent pb-3 font-display text-2xl md:text-4xl tracking-tight text-paper outline-none transition-colors focus:border-gold placeholder:text-paper/25"
                placeholder="Driftwood, a coastal seafood shack"
              />
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button onClick={() => setRoll((r) => r + 1)} data-cursor="roll" className="label inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-[10px] text-grey-dim transition-colors hover:text-paper hover:border-gold">
                  <Shuffle className="h-3.5 w-3.5" /> another take
                </button>
                {EXAMPLES.map((ex) => (
                  <button key={ex} onClick={() => { setInput(ex); setRoll(0); }} className="label rounded-full border border-ink-line px-3 py-2 text-[9px] text-grey-dim transition-colors hover:text-paper">
                    {ex.split(",")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* the composition */}
        <section className="border-t border-ink-line py-14 md:py-20">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
            {/* spec */}
            <div key={`spec-${name}-${roll}`} className="reveal-up lg:col-span-5">
              <span className="label" style={{ color: accent }}>·the read</span>
              <p className="mt-4 text-sm text-grey-dim">We read <span className="text-paper">{name}</span> as a <span className="text-paper">{world.label.toLowerCase()}</span> world. Here is the system.</p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-ink-line pt-6">
                <Swatch hex={world.bg} name="canvas" />
                <Swatch hex={world.ink} name="ink" />
                <Swatch hex={accent} name="accent" />
                <Swatch hex={world.surface} name="surface" />
              </div>

              <div className="mt-8 border-t border-ink-line pt-6">
                <div className="label text-[8px] text-grey-dim">type pairing</div>
                <div className="mt-3 flex items-baseline gap-4">
                  <span className="text-4xl leading-none" style={{ fontFamily: world.display }}>Aa</span>
                  <div className="leading-tight">
                    <div className="text-paper text-[15px]">{world.displayName}</div>
                    <div className="text-grey-dim text-[13px]">with {world.bodyName}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-ink-line pt-6">
                <div className="label text-[8px] text-grey-dim">a voice</div>
                <p className="mt-2 text-2xl leading-snug" style={{ fontFamily: world.display }}>{tagline}</p>
              </div>
            </div>

            {/* live mock */}
            <div key={`mock-${name}-${roll}`} className="reveal-up lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-ink-line shadow-2xl" style={{ background: world.bg, color: world.ink, fontFamily: world.body }}>
                {/* mock nav */}
                <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${world.muted}33` }}>
                  <span className="text-lg tracking-tight" style={{ fontFamily: world.display }}>
                    {name}<span style={{ color: accent }}>.</span>
                  </span>
                  <span className="flex gap-4 text-[11px] uppercase tracking-[0.16em]" style={{ color: world.muted }}>
                    <span>Menu</span><span>About</span><span>Visit</span>
                  </span>
                </div>
                {/* mock hero */}
                <div className="px-6 py-14 md:px-12 md:py-20">
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>now open</span>
                  <h3 className="mt-4 text-5xl md:text-7xl leading-[0.95] tracking-tight" style={{ fontFamily: world.display }}>{name}</h3>
                  <p className="mt-5 max-w-md text-base md:text-lg" style={{ color: world.muted }}>{tagline}</p>
                  <button className="mt-8 rounded-full px-6 py-3 text-sm font-semibold" style={{ background: accent, color: world.bg }}>{world.cta} →</button>
                  <div className="mt-12 flex gap-2">
                    {[world.ink, accent, world.muted, world.surface].map((c, i) => (
                      <span key={i} className="h-6 w-6 rounded-full" style={{ background: c, border: `1px solid ${world.muted}33` }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 label text-[9px] text-grey-dim">a live mock, composed from your words. not a template.</p>
            </div>
          </div>
        </section>

        {/* funnel to the real thing */}
        <section className="reveal-up border-t border-ink-line py-24 md:py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <span className="label text-red">·the real thing</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight tracking-tight">That took a blink.<br /><span className="italic font-normal text-gold">Imagine the whole build.</span></h2>
            <p className="mt-5 text-grey-dim leading-relaxed">The real version researches your place, writes a real menu, finds real photography and gives you a named AI host. That product is made. table, and we build the rest with you.</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="https://table.made-by-ac.com" target="_blank" rel="noreferrer" data-cursor="Open" className="inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-paper transition-transform hover:-translate-y-0.5">
                <span className="label text-[11px]">See made. table</span><ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="/#say-hi" data-cursor="Hello" className="inline-flex items-center gap-2 rounded-full border border-ink-line px-7 py-4 text-paper transition-colors hover:border-gold">
                <span className="label text-[11px]">Build with us</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
