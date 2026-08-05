import { ArrowUpRight } from "lucide-react";

// One compact strip for the deeper stuff, replacing the two separate Labs + Laws
// teases that used to stack back-to-back. Two cards, half the real estate.
const CARDS = [
  {
    href: "/labs",
    eyebrow: "concept studies",
    title: "made. labs",
    line: "Whole products built from a blank page to a working demo. Five of them, and counting.",
    accent: "#e8702a",
    // the newest study gets the front of the card
    featured: {
      name: "VANE",
      note: "zips jam, feathers don't",
      shot: "/labs/vane/home.png",
      accent: "#27499b",
    },
  },
  {
    href: "/craft",
    eyebrow: "how we think, made playable",
    title: "the craft",
    line: "The laws we design by, a live brand composer, a living system, a motion index. Proof, not claims.",
    accent: "#bd9b4e",
  },
];

export function ExploreTease() {
  return (
    <section data-nav-dark className="relative overflow-hidden bg-ink text-paper py-24 md:py-32">
      {/* seam: blend down from the paper products section above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper-dim to-ink pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <span className="label text-red">·006 / beyond the work</span>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">More to dig into<span className="text-red">.</span></h2>
          </div>
          <p className="font-display text-lg md:text-xl text-grey-dim max-w-sm leading-relaxed">Self-initiated worlds, and the thinking behind every build.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              data-cursor="Open"
              className="reveal-up group relative overflow-hidden rounded-2xl border border-ink-line p-9 md:p-11 min-h-[240px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              {/* newest study, bled in behind the copy */}
              {c.featured && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-[58%] hidden sm:block opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    maskImage: "linear-gradient(to right, transparent, #000 62%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, #000 62%)",
                  }}
                >
                  <img
                    src={c.featured.shot}
                    alt=""
                    loading="lazy"
                    className="absolute right-[-6%] top-1/2 -translate-y-1/2 w-[112%] max-w-none rounded-lg border border-ink-line transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="relative flex items-center justify-between">
                <span className="h-1 w-12 rounded-full" style={{ background: c.accent }} />
                <ArrowUpRight className="w-6 h-6 text-grey-dim transition-all duration-300 group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="relative">
                <span className="label text-[9px]" style={{ color: c.accent }}>{c.eyebrow}</span>
                <h3 className="mt-3 font-display text-4xl md:text-5xl leading-tight tracking-tight group-hover:text-gold transition-colors">{c.title}</h3>
                <p className="mt-3 max-w-md text-grey-dim leading-relaxed">{c.line}</p>
                {c.featured && (
                  <span className="mt-4 inline-flex items-center gap-2.5 label text-[9px] text-grey">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.featured.accent }} />
                    New · {c.featured.name}
                    <span className="text-grey-dim">{c.featured.note}</span>
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
