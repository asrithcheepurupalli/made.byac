import { ArrowUpRight } from "lucide-react";

// made. ships its own products, not just client work. This is the paper break in the
// middle of the dark run. Two hero cards (percentyle + supermind) lead in bold ink,
// each with its own paper specimen strip; the rest of the shipped apps sit in quiet
// light cards beneath. Every card links out to the product's live home.
const PRODUCTS = [
  { name: "airlock.", url: "https://airlock.made-by-ac.com", desc: "Redacts sensitive data on-device, before it reaches AI." },
  { name: "stash.", url: "https://stash.made-by-ac.com", desc: "A local-first memory for your AI chats and reading." },
  { name: "pingless.", url: "https://pingless.made-by-ac.com", desc: "An on-device AI gateway that quiets your phone." },
  { name: "hindsight.", url: "https://hindsight.made-by-ac.com", desc: "A time-shifted mirror that shows how you really look on a call." },
  { name: "cricadda.", url: "https://cricadda-tau.vercel.app", desc: "Live LED scoring that turns any cricket turf into a stadium." },
];

export function ProductsTease() {
  return (
    <section id="products" className="relative bg-paper-dim text-ink py-24 md:py-32 overflow-hidden">
      {/* seam: blend down from the ink work section above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-paper-dim pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        {/* header */}
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <span className="label text-red">·005 / products</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">Things we've<br />made<span className="text-red">.</span></h2>
          </div>
          <p className="font-display text-xl md:text-2xl text-grey max-w-md leading-relaxed">Real products we design, build and ship, the same way we do for clients.</p>
        </div>

        {/* two featured heroes — bold ink cards on the paper section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* percentyle */}
          <a
            href="https://percentyle.in"
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className="reveal-up group flex flex-col overflow-hidden rounded-2xl bg-ink text-paper shadow-xl transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="flex-1 p-9 md:p-11 flex flex-col">
              <span className="label text-grey-dim">CAT 2026 prep</span>
              <h3 className="mt-6 font-display text-5xl md:text-6xl leading-none tracking-tight">percentyle<span className="text-red">.</span></h3>
              <p className="mt-4 font-display text-xl md:text-2xl leading-snug text-paper/90">Your entire CAT prep, in one place.</p>
              <p className="mt-3 max-w-md text-grey-dim leading-relaxed">Real PYQ mocks, a spaced-repetition error log, and analytics that show exactly what to fix next.</p>
              <span className="mt-7 inline-flex items-center gap-2 label text-paper border-b border-gold/50 pb-1 self-start group-hover:text-gold transition-colors">
                Open percentyle <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            {/* specimen strip: percentyle runs on paper */}
            <div className="relative bg-paper text-ink flex items-center justify-center py-9 px-8">
              <div className="text-center">
                <div className="font-display text-6xl md:text-7xl leading-none tracking-tight">99<span className="align-top text-2xl md:text-3xl">.%ile</span></div>
                <div className="label text-[10px] text-grey mt-2.5">the only number that matters</div>
              </div>
              <span className="absolute bottom-3.5 right-5 font-mono text-[11px] text-grey">percentyle.in</span>
            </div>
          </a>

          {/* supermind — the new privacy-first flagship */}
          <a
            href="https://supermind.ink"
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className="reveal-up group flex flex-col overflow-hidden rounded-2xl bg-ink text-paper shadow-xl transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="flex-1 p-9 md:p-11 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="label text-[10px] rounded-full bg-red px-3 py-1.5 text-white">New</span>
                <span className="label text-grey-dim">local-first second brain</span>
              </div>
              <h3 className="mt-6 font-display text-5xl md:text-6xl leading-none tracking-tight">supermind<span className="text-red">.</span></h3>
              <p className="mt-4 font-display text-xl md:text-2xl leading-snug text-paper/90">A second brain that lives on your device.</p>
              <p className="mt-3 max-w-md text-grey-dim leading-relaxed">Notes, links and files, organised automatically and found instantly. No account, no server, nothing ever leaves your machine.</p>
              <span className="mt-7 inline-flex items-center gap-2 label text-paper border-b border-gold/50 pb-1 self-start group-hover:text-gold transition-colors">
                Open supermind <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            {/* specimen strip: instant recall */}
            <div className="relative bg-paper text-ink flex items-center justify-center py-9 px-8">
              <div className="text-center">
                <div className="font-display text-6xl md:text-7xl leading-none tracking-tight">⌘K</div>
                <div className="label text-[10px] text-grey mt-2.5">everything, one keystroke away</div>
              </div>
              <span className="absolute bottom-3.5 right-5 font-mono text-[11px] text-grey">supermind.ink</span>
            </div>
          </a>
        </div>

        {/* the rest of the family — light cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="reveal-up group rounded-2xl border border-paper-line bg-paper p-7 flex flex-col gap-5 min-h-[160px] transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
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
