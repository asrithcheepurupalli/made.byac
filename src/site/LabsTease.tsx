import { ArrowUpRight } from "lucide-react";

// Homepage teaser — a thin portal into made. labs. No duplicated content; it
// only points at /labs (the single home for the concept studies).
const WORLDS = [
  { name: "Meanwhile", note: "commercial vacancy, monetised", accent: "#ff5a1f" },
  { name: "Karu", note: "the maker, paid direct", accent: "#c2683f" },
  { name: "Tideline", note: "the catch, off the boat", accent: "#16b9a8" },
  { name: "Pingless", note: "shipped — a quieter phone", accent: "#27d17c" },
];

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
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-[1fr_auto] gap-12 lg:items-end">
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
        </div>

        <a
          href="/labs"
          data-cursor="Enter"
          data-magnetic
          className="reveal-up group inline-flex items-center gap-2 self-start lg:self-end label text-[11px] rounded-full px-7 py-4 bg-paper text-ink hover:bg-gold transition-colors"
        >
          Enter the labs
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
