import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// "How we make it": what we actually build, each with the thing we built it for. Five
// services that match our real, live work, and one provenance tile. Paper-dim canvas.
const SERVICES = [
  {
    id: "clinic",
    title: "Clinic & hospital booking",
    line: "Online and WhatsApp booking, payments and a live front desk queue, in Telugu, English and Hindi.",
    tags: ["Booking", "WhatsApp", "Payments"],
    proof: "Ramachandra Ortho Care",
    href: "/work/ramachandra-ortho",
  },
  {
    id: "restaurant",
    title: "Restaurant & bar ordering",
    line: "Table QR, shared carts and an AI host, wired into the kitchen you already run.",
    tags: ["QR ordering", "AI host", "Loyalty"],
    proof: "Ordering platform concept",
    href: "/work/somaa",
  },
  {
    id: "agents",
    title: "WhatsApp & AI agents",
    line: "Assistants that book, remind, take payment and answer, in your brand's own voice.",
    tags: ["WhatsApp", "Voice", "Automation"],
    proof: "AI automations",
    href: "/ai",
  },
  {
    id: "web",
    title: "Websites & web apps",
    line: "Fast, bilingual and built for search, designed and coded by the same team.",
    tags: ["Design", "Build", "Search-ready"],
    proof: "See the work",
    href: "/work",
  },
  {
    id: "brand",
    title: "Brand & identity",
    line: "Colour, type, voice and motion that hold together on every screen.",
    tags: ["Identity", "Campaigns", "Regional"],
    proof: "Innovolt campaigns",
    href: "/work/innovolt",
  },
];

const STEPS = [
  { n: "01", t: "Talk it through", d: "How your day runs, and what is not working." },
  { n: "02", t: "Design it in the open", d: "Real screens early, at phone and desktop width." },
  { n: "03", t: "Build and test", d: "Real code on a real stack, checked on real devices." },
  { n: "04", t: "Launch and look after it", d: "We stay on after go-live, not just until the invoice." },
];

export function GridLab() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="studio" data-ambient="dim" className="relative bg-paper-dim text-ink py-28 md:py-32 overflow-hidden">
      {/* seam: blend down from the ink gallery above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-paper-dim pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <span className="label text-red">·005 / what we do</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              How we<br />make it<span className="text-red">.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-display text-xl md:text-2xl text-grey leading-relaxed">
              One team, end to end: strategy, design and code. A system, not a service desk.
            </p>
            <a href="/offer" className="group mt-5 inline-flex items-center gap-2 label text-red">
              See everything we offer
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4">
          {SERVICES.map((c, i) => (
            <a
              key={c.id}
              href={c.href}
              data-cursor="See it"
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              className={`reveal-up lg:col-span-4 rounded-2xl border p-7 md:p-8 min-h-[270px] flex flex-col justify-between transition-[background-color,border-color,color] duration-300 ${
                hover === c.id ? "bg-ink text-paper border-ink" : "bg-paper border-paper-line text-ink"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`font-mono text-sm ${hover === c.id ? "text-red" : "text-gold"}`}>{String(i + 1).padStart(2, "0")}</span>
                <ArrowUpRight className={`w-5 h-5 transition-all duration-300 ${hover === c.id ? "text-paper translate-x-0.5 -translate-y-0.5" : "text-grey"}`} />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight">{c.title}</h3>
                <p className={`mt-3 text-[14px] leading-relaxed transition-colors ${hover === c.id ? "text-paper/75" : "text-grey"}`}>{c.line}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className={`label text-[8px] rounded-full border px-2.5 py-1 transition-colors ${hover === c.id ? "border-paper/30 text-paper/70" : "border-paper-line text-grey"}`}>{t}</span>
                  ))}
                </div>
                <span className={`mt-5 inline-flex items-center gap-1.5 label text-[10px] transition-colors ${hover === c.id ? "text-gold" : "text-red"}`}>
                  {c.proof} →
                </span>
              </div>
            </a>
          ))}

          {/* provenance */}
          <div className="reveal-up md:col-span-2 lg:col-span-4 rounded-2xl bg-ink text-paper p-8 md:p-10 flex flex-col justify-between min-h-[270px]">
            <span className="label text-gold">Provenance</span>
            <div>
              <div className="font-display text-4xl md:text-5xl">Vizag → world</div>
              <p className="mt-3 text-grey-dim text-[15px] max-w-xs">A studio on the coast of Andhra, building for businesses anywhere.</p>
            </div>
          </div>
        </div>

        {/* how a project runs */}
        <div className="mt-14 md:mt-20">
          <span className="label text-grey">How a project runs</span>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper-line border border-paper-line rounded-2xl overflow-hidden">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-paper-dim p-6 md:p-7 group hover:bg-paper transition-colors">
                <span className="font-mono text-red text-sm">{s.n}</span>
                <h4 className="mt-4 font-display text-xl">{s.t}</h4>
                <p className="mt-2 text-grey text-[13px] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
