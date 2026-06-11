import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";

// ACT II — Cinematic Dark Gallery. The work, under the lights.
// Somaa leads as the first full case study; the rest form the archive.
export function SelectedWork() {
  return (
    <section id="work" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div>
            <span className="label text-red">·003 — selected work</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              The work<span className="text-red">.</span>
            </h2>
          </div>
          <p className="font-display text-xl md:text-2xl text-grey-dim max-w-md leading-relaxed">
            Brand systems, packaging and products for clients across India — each made to be
            remembered.
          </p>
        </div>

        {/* FEATURED — Somaa case study */}
        <motion.a
          href="#/work/somaa"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-ink-line bg-ink-soft aspect-[16/10]">
              <img
                src="/case/somaa/shot-home.png"
                alt="Somaa — QR dining platform"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute top-5 left-6 label text-[10px] bg-red text-white rounded-full px-3 py-1.5">
                Featured case study
              </span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 label text-gold">
              <span>Somaa</span>
              <span className="w-6 h-px bg-gold/50" />
              <span className="text-grey-dim">2026</span>
            </div>
            <h3 className="mt-5 font-display text-5xl md:text-6xl leading-[0.98] text-paper">
              A restobar that<br />remembers you.
            </h3>
            <p className="mt-5 text-grey-dim leading-relaxed max-w-md">
              A coastal-Andhra restobar in Vizag — and the full QR dining platform we designed and
              built: scan-to-order, an AI dining host, loyalty, and a POS-connected kitchen.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 label text-paper border-b border-gold/50 pb-1 group-hover:text-gold transition-colors">
              Read the case study <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.a>

        {/* ARCHIVE — the rest of the work (case studies coming) */}
        <div className="mt-28 md:mt-40 border-t border-ink-line">
          <div className="flex items-center justify-between pt-8">
            <span className="label text-grey-dim">More from the studio</span>
            <span className="label text-grey-dim/60">case studies in progress</span>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.slice(0, 9).map((p) => (
              <div key={p.id} className="group">
                <div className="relative overflow-hidden rounded-xl border border-ink-line bg-ink-soft aspect-[4/3]">
                  <img
                    src={p.imageUrl}
                    alt={p.altText}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg text-paper/90 truncate">{p.title}</span>
                  <span className="label text-[9px] text-grey-dim shrink-0">{p.client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
