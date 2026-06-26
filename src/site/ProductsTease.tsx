import { ArrowUpRight } from "lucide-react";

// made. ships its own products, not just client work. This is the paper break in the
// middle of the dark run; percentyle is the featured (bold ink) card so it pops, the
// rest of the family sits in quiet light cards beneath.
const PRODUCTS = [
  { name: "made. table", url: "https://table.made-by-ac.com", desc: "Type a vibe, get a bespoke restaurant site." },
  { name: "made. crew", url: "https://crew.made-by-ac.com", desc: "A chief-of-staff and back-office for operators." },
  { name: "made. kitchen", url: "https://kitchen.made-by-ac.com", desc: "Growth and retention for cloud kitchens." },
  { name: "pingless.", url: "https://pingless.made-by-ac.com", desc: "An on-device AI gateway that quiets your phone." },
];

export function ProductsTease() {
  return (
    <section id="products" className="relative bg-paper-dim text-ink border-t border-paper-line py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        {/* header */}
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <span className="label text-red">·005 / products</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">We build for<br />ourselves too<span className="text-red">.</span></h2>
          </div>
          <p className="font-display text-xl md:text-2xl text-grey max-w-md leading-relaxed">Real products we design, build and ship, the same way we do for clients.</p>
        </div>

        {/* featured: percentyle — a bold ink card on the paper section */}
        <a
          href="https://percentyle.in"
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="reveal-up group grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden rounded-2xl bg-ink text-paper shadow-xl transition-transform duration-300 hover:-translate-y-1"
        >
          {/* left: the pitch */}
          <div className="lg:col-span-7 p-9 md:p-12 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="label text-[10px] rounded-full bg-red px-3 py-1.5 text-white">New</span>
              <span className="label text-grey-dim">CAT 2026 prep</span>
            </div>
            <h3 className="mt-7 font-display text-6xl md:text-7xl leading-none tracking-tight">percentyle<span className="text-red">.</span></h3>
            <p className="mt-5 font-display text-2xl md:text-3xl leading-snug text-paper/90">Your entire CAT prep, in one place.</p>
            <p className="mt-4 max-w-md text-grey-dim leading-relaxed">Real PYQ mocks, a spaced-repetition error log, and analytics that show exactly what to fix next.</p>
            <span className="mt-8 inline-flex items-center gap-2 label text-paper border-b border-gold/50 pb-1 self-start group-hover:text-gold transition-colors">
              Open percentyle <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          {/* right: a calm specimen panel (percentyle runs on paper) */}
          <div className="lg:col-span-5 relative min-h-[220px] bg-paper text-ink flex items-center justify-center p-10">
            <div className="text-center">
              <div className="font-display text-7xl md:text-8xl leading-none tracking-tight">99<span className="align-top text-3xl md:text-4xl">.%ile</span></div>
              <div className="label text-[10px] text-grey mt-3">the only number that matters</div>
            </div>
            <span className="absolute bottom-4 right-5 font-mono text-[11px] text-grey">percentyle.in</span>
          </div>
        </a>

        {/* the rest of the family — light cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="reveal-up group rounded-2xl border border-paper-line bg-paper p-7 flex flex-col gap-5 min-h-[160px] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="h-1 w-10 rounded-full bg-gold" />
                <ArrowUpRight className="w-5 h-5 text-grey transition-all duration-300 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-auto">
                <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-grey">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
