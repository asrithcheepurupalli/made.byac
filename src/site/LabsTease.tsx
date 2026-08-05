import { ArrowUpRight } from "lucide-react";

// Homepage teaser — a thin portal into made. labs. No duplicated content; it
// only points at /labs (the single home for the concept studies).
const WORLDS = [
  { name: "VANE", note: "the zip, rethought", accent: "#27499b" },
  { name: "Meanwhile", note: "commercial vacancy, monetised", accent: "#ff5a1f" },
  { name: "Karu", note: "the maker, paid direct", accent: "#c2683f" },
  { name: "Tideline", note: "the catch, off the boat", accent: "#16b9a8" },
  { name: "Pingless", note: "shipped — a quieter phone", accent: "#c8102e" },
];

const FEATURED = {
  name: "VANE",
  note: "zips jam, feathers don't",
  accent: "#27499b",
};

export function LabsTease() {
  return (
    <section data-nav-dark className="relative bg-ink text-paper border-t border-ink-line py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 80% at 80% 50%, #000 35%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-[1fr_0.82fr] gap-12 lg:gap-16 lg:items-center">
        <div>
          <span className="reveal-up label text-gold block">· made. labs</span>
          <h2 className="reveal-up mt-6 font-display text-5xl md:text-7xl leading-[0.94] tracking-[-0.02em] max-w-[16ch]">
            Beyond the brief, we build whole{" "}
            <span className="italic text-gold">worlds<span className="text-red">.</span></span>
          </h2>
          <p className="reveal-up mt-6 text-grey-dim text-lg max-w-xl leading-relaxed">
            Self-initiated concept studies: entire products taken from a blank page to a working demo,
            with no client and no brief. Proof we can build the thing you haven't asked for yet.
          </p>

          <div className="reveal-up mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
            {WORLDS.map((w) => (
              <div key={w.name} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ background: w.accent }} />
                <span className="font-display text-lg">{w.name}</span>
                <span className="label text-[9px] text-grey">{w.note}</span>
              </div>
            ))}
          </div>
          <a
            href="/labs"
            data-cursor="Enter"
            data-magnetic
            className="reveal-up group mt-10 inline-flex items-center gap-2 label text-[11px] rounded-full px-7 py-4 bg-paper text-ink hover:bg-gold transition-colors"
          >
            Enter the labs
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* newest study, given the front of the room */}
        <a
          href="/labs#vane"
          data-cursor="Open"
          className="reveal-up group block"
          aria-label="VANE, the newest concept study"
        >
          <div
            className="rounded-xl overflow-hidden border border-ink-line bg-ink-soft shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
            style={{ boxShadow: `0 30px 80px -40px ${FEATURED.accent}80` }}
          >
            <div className="h-7 flex items-center gap-1.5 px-3 border-b border-ink-line bg-ink">
              <span className="w-2 h-2 rounded-full" style={{ background: FEATURED.accent }} />
              <span className="w-2 h-2 rounded-full bg-ink-line" />
              <span className="w-2 h-2 rounded-full bg-ink-line" />
              <span className="ml-3 font-mono text-[9px] text-grey-dim">vane.made-by-ac.com</span>
            </div>
            <img
              src="/labs/vane/home.png"
              alt="VANE, a closure with no slider, taken from a feather"
              loading="lazy"
              className="w-full block"
            />
          </div>
          <div className="mt-5 flex items-baseline gap-3 flex-wrap">
            <span className="label text-[9px] rounded-full px-2.5 py-1" style={{ background: FEATURED.accent, color: "#fff" }}>
              Newest
            </span>
            <span className="font-display text-2xl">
              <span className="italic font-normal">V</span>ANE
              <span style={{ color: FEATURED.accent }}>.</span>
            </span>
            <span className="label text-[9px] text-grey">{FEATURED.note}</span>
          </div>
        </a>
      </div>
    </section>
  );
}
