import { motion } from "motion/react";

// "Why we do this": the belief, then the facts. Editorial, paper. The facts row is the
// About a visitor needs in five seconds: where, since when, and what we do.
const FACTS = [
  { k: "Where", v: "Based in India, working worldwide" },
  { k: "Since", v: "2026" },
  { k: "What", v: "Design, software and AI, under one roof" },
];

export function Manifesto() {
  return (
    <section id="why" className="relative bg-paper text-ink py-28 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <span className="label text-red">·007 / why we do this</span>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-display font-light text-[7vw] sm:text-5xl lg:text-[4.4rem] leading-[1.08] tracking-[-0.01em] max-w-[18ch]"
        >
          We started <em className="font-normal">made.</em> because most things are{" "}
          <span className="text-grey">forgettable</span>. And they don't have to be.
          Good design is the difference between being{" "}
          <span className="text-red-deep italic">seen</span> and being{" "}
          <span className="underline decoration-gold decoration-2 underline-offset-[6px]">remembered</span>.
        </motion.p>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/75">
          We design and build together, so what you approve is what ships. We work remotely with clients
          anywhere, from brand to booking system, and we stay on after launch.
        </p>

        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-paper-line border border-paper-line rounded-2xl overflow-hidden max-w-4xl">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-paper p-6 md:p-7">
              <dt className="label text-[10px] text-red">{f.k}</dt>
              <dd className="mt-3 font-display text-xl md:text-2xl leading-snug">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href="#say-hi" className="inline-flex items-center gap-2 bg-ink text-paper label rounded-full px-7 py-4 hover:bg-red transition-colors">
            Say hi <span aria-hidden>→</span>
          </a>
          <a href="#work" className="label text-ink/80 hover:text-ink underline underline-offset-[6px] decoration-ink/30">See the work</a>
        </div>
      </div>
    </section>
  );
}
