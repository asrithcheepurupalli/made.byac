import { ArrowUpRight, Zap, Truck, Gift, Package } from "lucide-react";
import { PROJECTS } from "../data";

// ACT II — the work, under the lights. Three case studies carry it; everything
// else hangs on a quiet wall you can hover to view.
const CASE_STUDIES = [
  { slug: "somaa", client: "Somaa", line: "A restobar that\nremembers you.", img: "/case/somaa/biryani.webp", tag: "AI dining platform" },
  { slug: "innovolt", client: "Innovolt", line: "Used EVs, made\na safe bet.", img: "/images/Hyd'Tel.png", tag: "EV campaigns" },
  { slug: "mithai-maharaja", client: "Mithai Maharaja", line: "Sweets dressed\nlike heirlooms.", img: "/images/thumb_1778155198_f88efc2a-69f8-4b24-b07b-26e8a339b684.jpg", tag: "Luxury packaging" },
];

// secondary case studies — small brand tiles, no design thumbnails (Somaa stays the hero)
const MORE = [
  { slug: "innovolt", client: "Innovolt", desc: "Commercial EV marketplace campaigns", accent: "#27d17c", icons: [Zap, Truck] },
  { slug: "mithai-maharaja", client: "Mithai Maharaja", desc: "Luxury Indian sweets packaging", accent: "#c8a24b", icons: [Gift, Package] },
];

// quiet wall = clients without a dedicated case study (yet)
const WALL = PROJECTS.filter((p) => p.client === "Telyport" || p.client === "Mr. Snapper International");
const ROT = [-3, 2.5, -2, 3, -1.5, 2, -2.5, 1.5];

// thumbnail the cursor floats when hovering a secondary case-study card
const CASE_IMG: Record<string, string> = Object.fromEntries(CASE_STUDIES.map((c) => [c.slug, c.img]));

export function SelectedWork() {
  const somaa = CASE_STUDIES[0];

  return (
    <section id="work" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      {/* sits under the ink before/after section — no seam needed */}
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        {/* header */}
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div>
            <span className="label text-red">·003 / selected work</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">The work<span className="text-red">.</span></h2>
          </div>
          <p className="font-display text-xl md:text-2xl text-grey-dim max-w-md leading-relaxed">Three studies we're proud of, and a wall of everything else.</p>
        </div>

        {/* featured case study — Somaa */}
        <a href={`#/work/${somaa.slug}`} data-cursor="View" className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-ink-line bg-ink-soft aspect-[16/10]">
              <img src={somaa.img} alt="Somaa chicken biryani" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
              {/* recreate the Somaa hero: wordmark over the biryani */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/35" />
              <img
                src="/case/somaa/wordmark-cream.png"
                alt="Somaa"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] max-w-[280px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute top-5 left-6 label text-[10px] bg-red text-white rounded-full px-3 py-1.5 z-10">Featured case study</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 label text-gold"><span>{somaa.client}</span><span className="w-6 h-px bg-gold/50" /><span className="text-grey-dim">{somaa.tag}</span></div>
            <h3 className="mt-5 font-display text-5xl md:text-6xl leading-[0.98] text-paper whitespace-pre-line">{somaa.line}</h3>
            <span className="mt-7 inline-flex items-center gap-2 label text-paper border-b border-gold/50 pb-1 group-hover:text-gold transition-colors">Read the case study <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
          </div>
        </a>

        {/* secondary case studies — wide brand tiles (only two for now; shrink the grid when more are added) */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {MORE.map((c) => (
            <a
              key={c.slug}
              href={`#/work/${c.slug}`}
              data-cursor="View"
              data-cursor-img={CASE_IMG[c.slug]}
              className="group reveal-up rounded-2xl border border-ink-line p-9 md:p-11 min-h-[200px] flex flex-col gap-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="block h-1 w-12 rounded-full" style={{ background: c.accent }} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3" style={{ color: c.accent }}>
                  {c.icons.map((Icon, j) => (
                    <Icon key={j} className="w-6 h-6" strokeWidth={1.6} />
                  ))}
                </div>
                <ArrowUpRight className="w-5 h-5 text-grey-dim group-hover:text-paper transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-auto">
                <h3 className="font-display text-3xl md:text-4xl text-paper">{c.client}</h3>
                <p className="mt-2 text-grey-dim md:text-[15px]">{c.desc}</p>
              </div>
              <span className="label text-[10px]" style={{ color: c.accent }}>Read case study →</span>
            </a>
          ))}
        </div>

        {/* the quiet wall — hover to view */}
        <div className="mt-28 md:mt-40 border-t border-ink-line">
          <div className="flex items-center justify-between pt-8 mb-16">
            <span className="label text-grey-dim">Also from the studio</span>
            <span className="label text-grey-dim/60">hover to view</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-16 md:gap-x-16 px-2">
            {WALL.map((p, i) => (
              <div
                key={p.id}
                className="wall-item group relative flex flex-col items-center hover:z-40"
                style={{ transform: `rotate(${ROT[i % ROT.length]}deg)` }}
              >
                {/* the hanger */}
                <span className="w-px h-7 bg-ink-line" />
                <span className="w-1.5 h-1.5 rounded-full -mt-7 mb-5" style={{ background: "var(--color-gold)" }} />
                {/* grows upward from its bottom edge so it never covers the caption below */}
                <div className="relative w-28 md:w-36 aspect-[3/4] rounded-md overflow-hidden border border-ink-line bg-ink-soft shadow-lg origin-bottom transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.5] group-hover:rotate-0 group-hover:shadow-2xl">
                  <img src={p.imageUrl} alt={p.altText} loading="lazy" referrerPolicy="no-referrer" className="wall-thumb w-full h-full object-cover grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100" />
                </div>
                <div className="wall-caption relative z-40 mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-display text-sm text-paper leading-tight">{p.title}</div>
                  <div className="label text-[8px] text-grey-dim mt-1">{p.client}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
