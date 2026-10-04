import { ArrowUpRight } from "lucide-react";

// "More to dig into": the self-initiated concept studies (labs) and the interactive pieces
// (craft), shown with real previews and direct links so nothing here is hidden behind a
// menu. The craft list includes the free landing-page teardown, our lead magnet.
const LABS = [
  { name: "VANE", note: "zips jam, feathers don't", shot: "/labs/vane/home.webp", accent: "#27499b" },
  { name: "Meanwhile", note: "half rent, full opportunity", shot: "/labs/meanwhile/home.webp", accent: "#ff5a1f" },
  { name: "Karu", note: "made by the last masters", shot: "/labs/karu/cover.webp", accent: "#c2683f" },
  { name: "Tideline", note: "off the boat, onto your table", shot: "/labs/tideline/home.webp", accent: "#16b9a8" },
  { name: "Pingless", note: "your phone, finally quiet", shot: "/labs/pingless/home.webp", accent: "#c8102e" },
];

const PIECES = [
  { href: "/teardown", title: "Free landing page teardown", line: "Tap the red marks, see what we would fix.", tag: "Free" },
  { href: "/live", title: "made. live", line: "Type a name and a vibe, watch it become a brand." },
  { href: "/worth", title: "What design is worth", line: "Slide your numbers, see the return." },
  { href: "/laws", title: "The laws we design by", line: "UX laws you can feel, not just read." },
  { href: "/system", title: "The living system", line: "Four colours, three fonts, one grid." },
  { href: "/motion", title: "The motion index", line: "Six moves, each live, each explained." },
];

export function ExploreTease() {
  return (
    <section data-nav-dark className="relative overflow-hidden bg-ink text-paper py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <span className="label text-red">·004 / beyond the work</span>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">More to dig into<span className="text-red">.</span></h2>
          </div>
          <p className="font-display text-lg md:text-xl text-grey-dim max-w-sm leading-relaxed">Whole products we built unasked, and the thinking behind every build.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* labs: five concept studies, shown, not described */}
          <div className="reveal-up lg:col-span-7 rounded-2xl border border-ink-line p-7 md:p-9">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 sm:gap-6">
              <div>
                <span className="label text-[9px]" style={{ color: "#e8702a" }}>concept studies</span>
                <h3 className="mt-3 font-display text-4xl md:text-5xl leading-tight tracking-tight">made. labs</h3>
                <p className="mt-3 max-w-md text-grey-dim leading-relaxed">Five whole products, each built from a blank page to a working demo, with no client and no brief.</p>
              </div>
              <a href="/labs" data-cursor="Open" className="shrink-0 self-start inline-flex items-center gap-2 label text-[10px] rounded-full bg-paper text-ink px-5 py-3 hover:bg-gold transition-colors">
                Enter the labs <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LABS.map((l, i) => (
                <li key={l.name} className={i === 0 ? "col-span-2 sm:col-span-1" : ""}>
                  <a href="/labs" data-cursor="Open" className="group block">
                    <div className="relative overflow-hidden rounded-xl border border-ink-line bg-ink-soft aspect-[4/3]">
                      <img src={l.shot} alt={`${l.name} concept study`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                      <span className="absolute left-2.5 top-2.5 h-1.5 w-1.5 rounded-full" style={{ background: l.accent }} />
                    </div>
                    <div className="mt-2.5">
                      <span className="block font-display text-lg group-hover:text-gold transition-colors">{l.name}</span>
                      <span className="block text-[11px] text-grey-dim leading-tight">{l.note}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* craft: six playable pieces, each one click away */}
          <div className="reveal-up lg:col-span-5 rounded-2xl border border-ink-line p-7 md:p-9 flex flex-col">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="label text-[9px] text-gold">how we think, made playable</span>
                <h3 className="mt-3 font-display text-4xl md:text-5xl leading-tight tracking-tight">the craft</h3>
              </div>
              <a href="/craft" data-cursor="Open" className="shrink-0 inline-flex items-center gap-2 label text-[10px] text-paper/80 hover:text-gold transition-colors pt-2">
                See all <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <ul className="mt-6 divide-y divide-ink-line border-y border-ink-line">
              {PIECES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} data-cursor="Play" className="group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="flex items-center gap-2.5 font-display text-xl group-hover:text-gold transition-colors">
                        {p.title}
                        {p.tag && <span className="label text-[8px] rounded-full bg-red text-white px-2 py-0.5">{p.tag}</span>}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-grey-dim">{p.line}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-grey-dim group-hover:text-paper transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
