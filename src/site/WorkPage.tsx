import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { PROJECTS } from "../data";

// Clients that have a full case study — their gallery cards deep-link to it.
const CASE_SLUG: Record<string, string> = {
  Innovolt: "innovolt",
  "Mithai Maharaja": "mithai-maharaja",
};

// Featured studies carried at the top of the page.
const FEATURED = [
  { slug: "somaa", client: "Somaa", line: "A restobar that remembers you.", img: "/case/somaa/biryani.webp", tag: "QR dining platform", accent: "#d99547", overlay: "/case/somaa/wordmark-cream.png" },
  { slug: "innovolt", client: "Innovolt", line: "Used EVs, made a safe bet.", img: "/images/Hyd'Tel.png", tag: "EV marketplace campaigns", accent: "#27d17c" },
  { slug: "mithai-maharaja", client: "Mithai Maharaja", line: "Sweets dressed like heirlooms.", img: "/images/thumb_1778155198_f88efc2a-69f8-4b24-b07b-26e8a339b684.jpg", tag: "Luxury packaging", accent: "#c8a24b" },
];

const FILTERS = ["All", "Innovolt", "Mithai Maharaja", "Telyport", "Mr. Snapper International"];
const FILTER_LABEL: Record<string, string> = { "Mr. Snapper International": "Mr. Snapper" };

// The design system, shown not told — "how we design".
const PALETTE = [
  { name: "Ink", hex: "#0b0b0c" },
  { name: "Paper", hex: "#f6f3ee" },
  { name: "Red", hex: "#c8102e" },
  { name: "Gold", hex: "#bd9b4e" },
];
const TYPESET = [
  { role: "Display", font: "Fraunces", sample: "Aa", note: "Editorial serif. The voice." , cls: "font-display" },
  { role: "Text", font: "Hanken Grotesk", sample: "Aa", note: "Grotesk. The workhorse.", cls: "font-sans" },
  { role: "Detail", font: "Space Mono", sample: "Aa", note: "Mono. Labels and meta.", cls: "font-mono" },
];
const PRINCIPLES = [
  { k: "01", t: "Type is the design", d: "Before colour or image, the typography carries the idea." },
  { k: "02", t: "Make, don't decorate", d: "We build what we draw, so the idea survives contact with reality." },
  { k: "03", t: "The remembered 2%", d: "The detail nobody asks for is the one everybody remembers." },
];

export function WorkPage() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "index">("grid");

  const shown = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.client === filter)),
    [filter]
  );

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-ink-line">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors">
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px] text-grey">Selected work</span>
          <a href="/#say-hi" className="label text-[10px] rounded-full px-4 py-2 border border-red text-red hover:bg-red hover:text-white transition-colors">
            Start a project
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1500px] px-6 md:px-10 pt-36 md:pt-44 pb-12 md:pb-16">
        <span className="rise label text-red block" style={{ animationDelay: "0.05s" }}>· selected work</span>
        <h1 className="rise mt-6 font-display text-6xl md:text-[9rem] leading-[0.86] tracking-[-0.02em]" style={{ animationDelay: "0.13s" }}>
          Work that refuses<br />to be{" "}
          <span className="italic font-normal text-gold">ignored</span>
          <span className="text-red">.</span>
        </h1>
        <p className="rise mt-9 font-display text-xl md:text-2xl leading-snug max-w-2xl text-paper/80" style={{ animationDelay: "0.28s" }}>
          Brands, packaging, campaigns and products, from a coastal studio in India for clients
          anywhere. Every piece drawn and shipped by the same team.
        </p>
        <div className="rise mt-12 flex flex-wrap gap-x-12 gap-y-6" style={{ animationDelay: "0.4s" }}>
          {[
            { n: String(PROJECTS.length) + "+", l: "Projects shipped" },
            { n: "4", l: "Long-run clients" },
            { n: "6", l: "Disciplines" },
            { n: "1", l: "Team, end to end" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl md:text-5xl text-paper">{s.n}</div>
              <div className="mt-1 label text-[9px] text-grey">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* featured case studies — Somaa large, the other two small */}
      <section className="mx-auto max-w-[1500px] px-6 md:px-10 pb-8 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Somaa — the hero study */}
          {(() => {
            const f = FEATURED[0];
            return (
              <a href={`#/work/${f.slug}`} className="reveal-up group relative rounded-2xl overflow-hidden border border-ink-line bg-ink-soft lg:col-span-8 aspect-[16/12] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[480px]">
                <img src={f.img} alt={f.client} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/15" />
                {f.overlay && (
                  <img src={f.overlay} alt="" className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[46%] max-w-[300px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />
                )}
                <span className="absolute top-5 left-5 label text-[10px] rounded-full px-3 py-1.5" style={{ background: f.accent, color: "#0b0b0c" }}>Featured case study</span>
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <div className="label text-[10px]" style={{ color: f.accent }}>{f.tag}</div>
                  <h3 className="mt-2 font-display text-4xl md:text-6xl leading-[0.96] text-paper">{f.client}</h3>
                  <p className="mt-3 text-grey-dim text-[15px] md:text-base leading-snug max-w-sm">{f.line}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 label text-[11px] text-paper/85 group-hover:text-paper transition-colors">
                    Read the study <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            );
          })()}

          {/* Innovolt + Mithai — small, stacked */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 md:gap-6">
            {FEATURED.slice(1).map((f) => (
              <a key={f.slug} href={`#/work/${f.slug}`} className="reveal-up group relative rounded-2xl overflow-hidden border border-ink-line bg-ink-soft aspect-[16/10] lg:aspect-auto lg:min-h-[228px]">
                <img src={f.img} alt={f.client} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
                <span className="absolute top-3.5 left-3.5 label text-[8px] rounded-full px-2.5 py-1" style={{ background: f.accent, color: "#0b0b0c" }}>Case study</span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight text-paper">{f.client}</h3>
                  <p className="mt-1 text-grey-dim text-[12px] leading-snug">{f.tag}</p>
                </div>
                <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-paper/70 group-hover:text-paper transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* interactive gallery */}
      <section className="border-y border-ink-line bg-ink-soft/20">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-16 md:py-24">
          {/* controls */}
          <div className="reveal-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <span className="label text-red">· the full archive</span>
              <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95]">Everything else<span className="text-red">.</span></h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-1 p-1 rounded-full border border-ink-line bg-ink">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`label text-[10px] rounded-full px-3.5 py-2 transition-colors ${filter === f ? "bg-paper text-ink" : "text-grey hover:text-paper"}`}
                  >
                    {FILTER_LABEL[f] || f}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 p-1 rounded-full border border-ink-line bg-ink">
                <button onClick={() => setView("grid")} aria-pressed={view === "grid"} className={`rounded-full p-2 transition-colors ${view === "grid" ? "bg-paper text-ink" : "text-grey hover:text-paper"}`} aria-label="Grid view">
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setView("index")} aria-pressed={view === "index"} className={`rounded-full p-2 transition-colors ${view === "index" ? "bg-paper text-ink" : "text-grey hover:text-paper"}`} aria-label="Index view">
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* grid view */}
          {view === "grid" ? (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              <AnimatePresence mode="popLayout">
                {shown.map((p) => {
                  const slug = p.client ? CASE_SLUG[p.client] : undefined;
                  const Tag = slug ? "a" : "div";
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Tag
                        {...(slug ? { href: `#/work/${slug}` } : {})}
                        className="group relative block rounded-xl overflow-hidden border border-ink-line bg-ink-soft aspect-[4/5]"
                      >
                        <img src={p.imageUrl} alt={p.altText} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] opacity-85 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.05]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                        <div className="tile-info absolute inset-x-0 bottom-0 p-4 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                          <div className="font-display text-lg leading-tight text-paper">{p.title}</div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="label text-[8px] text-gold">{p.client}</span>
                            {slug && <span className="label text-[8px] text-grey-dim">· case study</span>}
                          </div>
                        </div>
                      </Tag>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* index view */
            <motion.div layout className="border-t border-ink-line">
              <AnimatePresence mode="popLayout">
                {shown.map((p, i) => {
                  const slug = p.client ? CASE_SLUG[p.client] : undefined;
                  const Tag = slug ? "a" : "div";
                  return (
                    <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <Tag {...(slug ? { href: `#/work/${slug}` } : {})} data-cursor-img={p.imageUrl} className="group grid grid-cols-12 items-center gap-4 py-5 border-b border-ink-line hover:bg-ink/40 transition-colors px-2">
                        <span className="col-span-1 font-mono text-xs text-grey">{String(i + 1).padStart(2, "0")}</span>
                        <span className="col-span-6 md:col-span-5 font-display text-xl md:text-2xl text-paper group-hover:text-gold transition-colors">{p.title}</span>
                        <span className="hidden md:block col-span-3 text-grey-dim text-sm">{p.category}</span>
                        <span className="col-span-4 md:col-span-2 label text-[9px] text-grey">{p.client}</span>
                        <span className="col-span-1 flex justify-end text-grey-dim">{slug && <ArrowUpRight className="w-4 h-4 group-hover:text-paper transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}</span>
                      </Tag>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* how we design — the system, shown not told */}
      <section className="mx-auto max-w-[1500px] px-6 md:px-10 py-20 md:py-32">
        <div className="reveal-up max-w-2xl">
          <span className="label text-red">· how we design</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95]">Not a style. A system<span className="text-red">.</span></h2>
          <p className="mt-6 text-grey-dim text-base md:text-lg leading-relaxed">
            Every project runs on the same quiet machinery: a tight palette, three typefaces with clear jobs,
            and a few principles we don't break. It is what lets the work feel made, not assembled.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* palette */}
          <div className="reveal-up lg:col-span-5 rounded-2xl border border-ink-line p-7 md:p-8">
            <span className="label text-grey">The palette</span>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {PALETTE.map((c) => (
                <div key={c.name} className="group">
                  <div className="aspect-square rounded-xl border border-ink-line transition-transform duration-300 group-hover:-translate-y-1" style={{ background: c.hex }} />
                  <div className="mt-2.5 font-display text-sm text-paper">{c.name}</div>
                  <div className="label text-[8px] text-grey">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>

          {/* type */}
          <div className="reveal-up lg:col-span-7 rounded-2xl border border-ink-line p-7 md:p-8">
            <span className="label text-grey">The type</span>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {TYPESET.map((t) => (
                <div key={t.role} className="group rounded-xl border border-ink-line p-5 hover:border-grey transition-colors">
                  <div className={`${t.cls} text-6xl leading-none text-paper transition-transform duration-300 group-hover:-translate-y-0.5`}>{t.sample}</div>
                  <div className="mt-4 label text-[9px] text-gold">{t.role}</div>
                  <div className="mt-1.5 font-display text-base text-paper">{t.font}</div>
                  <div className="mt-1 text-grey-dim text-[12px] leading-snug">{t.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* principles */}
          {PRINCIPLES.map((p) => (
            <div key={p.k} className="reveal-up lg:col-span-4 rounded-2xl border border-ink-line p-7 md:p-8 hover:border-grey transition-colors">
              <span className="font-mono text-sm text-red">{p.k}</span>
              <h3 className="mt-4 font-display text-2xl leading-tight text-paper">{p.t}</h3>
              <p className="mt-3 text-grey-dim text-[14px] leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink-line">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-25" style={{ background: "radial-gradient(50% 50% at 50% 50%, #c8102e, transparent 70%)" }} />
        <div className="reveal-up relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="label text-red">Next</span>
          <h2 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">Like what you see? The next one could be yours.</h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="/#say-hi" className="group label rounded-full px-7 py-4 flex items-center gap-2 bg-red text-white hover:bg-red-deep hover:-translate-y-0.5 transition-all duration-300">
              Start a project <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/offer" className="label rounded-full px-7 py-4 border border-ink-line text-paper hover:border-grey transition-colors">See what we offer</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <a href="/" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>made. by ac · selected work</span>
        </div>
      </footer>
    </div>
  );
}
