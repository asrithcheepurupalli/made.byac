import { ArrowUpRight } from "lucide-react";

// Homepage band for made. table — the studio's own SaaS product (productized from
// the restaurant QR work). Sits under the ink #ai band (both ink, no seam) and
// links out to the live product at table.made-by-ac.com.
const PRODUCT_URL = "https://table.made-by-ac.com";

export function MadeTableTease() {
  return (
    <section id="products" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 right-0 w-[60vw] h-[55vh] opacity-20"
        style={{ background: "radial-gradient(50% 50% at 70% 30%, var(--color-gold), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <span className="label text-gold">·our own / made. table</span>
            <h2 className="mt-6 font-display text-5xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              We build for clients.<br />Then we build <span className="italic font-normal text-gold">our own.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-display text-xl md:text-2xl text-grey-dim leading-relaxed">
              made. table is our product: a restaurant owner types their name and a line of vibe, and
              we compose a bespoke, live ordering demo in about a minute. Proof we don't just design
              products — we ship them.
            </p>
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="group mt-6 inline-flex items-center gap-2 label text-gold"
            >
              Visit made. table
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* the product, shown: type a vibe → get a live demo */}
        <a
          href={PRODUCT_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="reveal-up group block relative rounded-3xl overflow-hidden border border-ink-line bg-ink-soft/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* left: the generator (input) */}
            <div className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-ink-line">
              <img
                src="/products/madetable-generator.jpg"
                alt="made. table — type your restaurant's name and vibe"
                loading="lazy"
                className="w-full h-full object-cover object-top aspect-[16/10] lg:aspect-auto lg:min-h-[420px] opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <span className="absolute top-4 left-4 label text-[9px] text-paper/90 bg-ink/60 backdrop-blur rounded-full px-3 py-1.5">
                01 · type a vibe
              </span>
            </div>
            {/* right: a generated demo (output) */}
            <div className="lg:col-span-7 relative">
              <img
                src="/products/madetable-demo.jpg"
                alt="A bespoke restaurant ordering demo composed by made. table"
                loading="lazy"
                className="w-full h-full object-cover aspect-[16/10] lg:aspect-auto lg:min-h-[420px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <span className="absolute top-4 left-4 label text-[9px] text-paper/90 bg-ink/60 backdrop-blur rounded-full px-3 py-1.5">
                02 · get a live demo
              </span>
            </div>
          </div>

          {/* caption strip */}
          <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-t border-ink-line">
            <span className="label text-[10px] text-grey">
              table.made-by-ac.com <span className="text-grey-dim">· a made. by ac product</span>
            </span>
            <span className="inline-flex items-center gap-1.5 label text-[10px] text-gold">
              Try it live
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
