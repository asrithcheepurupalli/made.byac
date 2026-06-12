import { useState } from "react";
import { motion } from "motion/react";
import { Sun } from "lucide-react";
import { CAPABILITIES, PROCESS_STEPS } from "../data";
import { useAmbient, TEMPS } from "./useAmbient";

// ACT III — Kinetic Grid Lab. The studio as a living modular system: what we do
// and how we work, in ruled cells that react to intent. Paper-dim canvas.
export function GridLab() {
  const [hover, setHover] = useState<string | null>(null);
  const [temp, setTemp] = useAmbient();

  return (
    <section id="studio" data-ambient="dim" className="relative bg-paper-dim text-ink py-28 md:py-40 overflow-hidden">
      {/* seam: blend down from the ink gallery above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-paper-dim pointer-events-none" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <span className="label text-red">·004 / the studio</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              How we<br />make it<span className="text-red">.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-display text-xl md:text-2xl text-grey leading-relaxed">
              One team, end to end: strategy, design and code. A system, not a service desk.
            </p>
            <a href="#/offer" className="group mt-5 inline-flex items-center gap-2 label text-red">
              See everything we offer
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* ambient light control — warms/cools the paper acts (hero left untouched) */}
        <div className="reveal-up mb-10 md:mb-14 flex flex-wrap items-center gap-4">
          <span className="label text-grey flex items-center gap-2">
            <Sun className="w-3.5 h-3.5" strokeWidth={1.75} /> Set the room
          </span>
          <div className="inline-flex gap-1 p-1 rounded-full border border-paper-line bg-paper">
            {TEMPS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemp(t.id)}
                aria-pressed={temp === t.id}
                className={`label text-[10px] rounded-full px-4 py-2 transition-colors ${
                  temp === t.id ? "bg-ink text-paper" : "text-grey hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* bento grid of capabilities + accents */}
        <div className="grid grid-cols-2 lg:grid-cols-12 auto-rows-[minmax(0,1fr)] gap-3 md:gap-4">
          {/* capability cells */}
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.id}
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              className={`reveal-up lg:col-span-3 rounded-2xl border p-7 md:p-8 min-h-[210px] flex flex-col justify-between transition-[background-color,border-color,color,transform] duration-300 cursor-default hover:-translate-y-1 ${
                hover === c.id
                  ? "bg-ink text-paper border-ink"
                  : "bg-paper border-paper-line text-ink"
              }`}
            >
              <span className={`font-mono text-sm ${hover === c.id ? "text-red" : "text-gold"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight">{c.title}</h3>
                <p
                  className={`mt-3 text-[14px] leading-relaxed transition-colors ${
                    hover === c.id ? "text-paper/70" : "text-grey"
                  }`}
                >
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* red accent statement */}
          <div className="col-span-2 lg:col-span-7 rounded-2xl bg-red text-white p-8 md:p-12 flex items-center min-h-[200px]">
            <p className="font-display text-3xl md:text-[2.6rem] leading-[1.05] tracking-[-0.01em]">
              The 2% nobody asks for is the 2% everybody remembers.
            </p>
          </div>

          {/* gold provenance cell */}
          <div className="col-span-2 lg:col-span-5 rounded-2xl bg-ink text-paper p-8 md:p-12 flex flex-col justify-between min-h-[200px]">
            <span className="label text-gold">Provenance</span>
            <div>
              <div className="font-display text-4xl md:text-5xl">Vizag → world</div>
              <p className="mt-3 text-grey-dim text-[15px] max-w-xs">
                A design practice from the coast of Andhra, building for brands anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* process strip */}
        <div className="mt-14 md:mt-20">
          <span className="label text-grey">The process</span>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-paper-line border border-paper-line rounded-2xl overflow-hidden">
            {PROCESS_STEPS.map((s) => (
              <div key={s.id} className="bg-paper-dim p-6 md:p-7 group hover:bg-paper transition-colors">
                <span className="font-mono text-red text-sm">{s.stepNumber}</span>
                <h4 className="mt-4 font-display text-xl">{s.title}</h4>
                <p className="mt-2 text-grey text-[13px] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
