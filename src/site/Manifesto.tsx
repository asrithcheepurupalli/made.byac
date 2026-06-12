import { motion } from "motion/react";

// "Why we do this" — the bridge from the hero into the work. Editorial, paper.
const PRINCIPLES = [
  { n: "01", t: "Feeling first", d: "A brand is the feeling someone is left with. We design the feeling, then the artefacts." },
  { n: "02", t: "Detail is the work", d: "The 2% nobody asks for is the 2% everybody remembers. We obsess over it." },
  { n: "03", t: "Make, don't decorate", d: "We build what we draw — packaging, sites, systems — so the idea survives contact with reality." },
];

export function Manifesto() {
  return (
    <section id="why" className="relative bg-paper text-ink py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <span className="label text-red">·002 — why we do this</span>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-display font-light text-[7vw] sm:text-5xl lg:text-[4.4rem] leading-[1.08] tracking-[-0.01em] max-w-[18ch]"
        >
          We started <em className="font-normal">made.</em> because most things are{" "}
          <span className="text-grey">forgettable</span> — and they don't have to be.
          Good design is the difference between being{" "}
          <span className="text-red-deep italic">seen</span> and being{" "}
          <span className="underline decoration-gold decoration-2 underline-offset-[6px]">remembered</span>.
        </motion.p>

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-line border border-paper-line rounded-2xl overflow-hidden">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="bg-paper p-8 md:p-10 flex flex-col gap-4">
              <span className="font-mono text-red text-sm">{p.n}</span>
              <h3 className="font-display text-2xl md:text-3xl">{p.t}</h3>
              <p className="text-grey leading-relaxed text-[15px] max-w-[34ch]">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
