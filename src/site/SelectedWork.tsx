import type { FC } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";
import { useStudio } from "../StudioContext";
import type { Project } from "../types";

// ACT II — Cinematic Dark Gallery. The work, under the lights.
// A curated reel of featured projects, alternating sides, then a compact index.
const FEATURED_IDS = [
  "royal-kaju-katli",
  "choose-your-speed",
  "hyderabad-regional-ev",
  "snap-photography-contest",
  "classic-indian-combo",
  "bengaluru-fleet-solutions",
];

function byId(id: string) {
  return PROJECTS.find((p) => p.id === id);
}

const ProjectRow: FC<{ project: Project; index: number; reversed: boolean }> = ({ project, index, reversed }) => {
  const { handleSelectProject } = useStudio();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center cursor-pointer"
      onClick={() => handleSelectProject(project)}
    >
      <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
        <div className="relative overflow-hidden rounded-2xl border border-ink-line bg-ink-soft aspect-[16/11]">
          <img
            src={project.imageUrl}
            alt={project.altText}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />
          <span className="absolute top-5 left-6 font-display text-[5rem] leading-none text-white/15 select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 label text-gold">
          <span>{project.client}</span>
          <span className="w-6 h-px bg-gold/50" />
          <span className="text-grey-dim">{project.year}</span>
        </div>
        <h3 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] text-paper">
          {project.title}
        </h3>
        <p className="mt-5 text-grey-dim leading-relaxed max-w-md">{project.description}</p>
        <div className="mt-7 flex items-center gap-5">
          {project.metrics && (
            <span className="label text-[9px] text-red border border-red/40 rounded-full px-3 py-1.5">
              {project.metrics}
            </span>
          )}
          <span className="label text-paper/80 flex items-center gap-1.5 group-hover:text-red transition-colors">
            View case <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  const featured = FEATURED_IDS.map(byId).filter(Boolean) as Project[];
  const rest = PROJECTS.filter((p) => !FEATURED_IDS.includes(p.id));

  return (
    <section id="work" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28">
          <div>
            <span className="label text-red">·003 — selected work</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              The work<span className="text-red">.</span>
            </h2>
          </div>
          <p className="font-display text-xl md:text-2xl text-grey-dim max-w-md leading-relaxed">
            Brand systems, packaging and campaigns for clients across India — each made to be
            remembered.
          </p>
        </div>

        {/* featured reel */}
        <div className="flex flex-col gap-24 md:gap-36">
          {featured.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} reversed={i % 2 === 1} />
          ))}
        </div>

        {/* compact index of the rest */}
        <div className="mt-28 md:mt-40 border-t border-ink-line">
          <span className="label text-grey-dim block pt-8">More from the archive</span>
          <div className="mt-2 divide-y divide-ink-line">
            {rest.map((p) => (
              <ArchiveRow key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ArchiveRow: FC<{ project: Project }> = ({ project }) => {
  const { handleSelectProject } = useStudio();
  return (
    <button
      onClick={() => handleSelectProject(project)}
      className="group w-full text-left py-6 flex items-baseline justify-between gap-6 hover:px-2 transition-[padding] duration-300"
    >
      <span className="font-display text-2xl md:text-3xl text-paper/90 group-hover:text-red transition-colors">
        {project.title}
      </span>
      <span className="hidden sm:flex items-center gap-4 label text-grey-dim shrink-0">
        <span>{project.client}</span>
        <span>{project.year}</span>
        <ArrowUpRight className="w-4 h-4 text-paper/40 group-hover:text-red transition-colors" />
      </span>
    </button>
  );
}
