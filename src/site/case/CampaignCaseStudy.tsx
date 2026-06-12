import type { FC } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data";
import { CAMPAIGN_CASES } from "./caseData";
import type { Project } from "../../types";

export function CampaignCaseStudy({ slug }: { slug: string }) {
  const c = CAMPAIGN_CASES[slug];
  if (!c) return null;
  const work = PROJECTS.filter((p) => p.client === c.client);
  const a = c.accent;

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen" style={{ ["--a" as string]: a }}>
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors">
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px] text-grey">Case study {c.index}</span>
          <a href="#say-hi" className="label text-[10px] rounded-full px-4 py-2 transition-colors" style={{ border: `1px solid ${a}`, color: a }}>
            Start a project
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-16">
        <span className="label" style={{ color: a }}>{c.index} — case study / {c.sector}</span>
        <h1 className="mt-6 font-display text-7xl md:text-[9rem] leading-[0.86] tracking-[-0.02em]">{c.client}<span style={{ color: a }}>.</span></h1>
        <p className="mt-7 font-display text-2xl md:text-4xl leading-snug max-w-3xl text-paper/85">{c.tagline}</p>

        <div className="reveal-up mt-14 rounded-2xl overflow-hidden border border-ink-line bg-ink-soft relative">
          <img src={c.hero} alt={`${c.client} campaign work`} loading="lazy" referrerPolicy="no-referrer" className="w-full max-h-[70vh] object-contain bg-black" />
        </div>
      </section>

      {/* overview */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-ink-line bg-ink-line">
          <Meta k="Client" v={c.client} a={a} />
          <Meta k="Sector" v={c.sector} a={a} />
          <Meta k="Year" v={c.year} a={a} />
          <Meta k="Role" v={c.role} a={a} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.deliverables.map((d) => (
            <span key={d} className="label text-[9px] text-grey-dim border border-ink-line rounded-full px-3 py-1.5">{d}</span>
          ))}
        </div>
      </section>

      {/* brief */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4"><span className="label" style={{ color: a }}>The brief</span></div>
        <div className="lg:col-span-8 space-y-6">
          {c.brief.map((p, i) => (
            <p key={i} className={i === 0 ? "font-display text-2xl md:text-[2.1rem] leading-[1.18] text-paper" : "text-lg leading-relaxed text-grey-dim max-w-2xl"}>{p}</p>
          ))}
        </div>
      </section>

      {/* the work */}
      <section className="border-y border-ink-line bg-ink-soft/40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: a }}>The work</span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] mb-14 md:mb-20">Selected pieces.</h2>
          <div className="flex flex-col gap-20 md:gap-28">
            {work.map((p, i) => (
              <WorkPiece key={p.id} project={p} reversed={i % 2 === 1} accent={a} />
            ))}
          </div>
        </div>
      </section>

      {/* approach */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4"><span className="label" style={{ color: a }}>The approach</span></div>
        <div className="lg:col-span-8 space-y-6">
          {c.approach.map((p, i) => (
            <p key={i} className="font-display text-xl md:text-2xl leading-relaxed text-paper/90 max-w-2xl">{p}</p>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink-line">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-25" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${a}, transparent 70%)` }} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-36 text-center">
          <span className="label" style={{ color: a }}>Next</span>
          <h2 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">Have a brand that deserves better than a template?</h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="#say-hi" className="group label rounded-full px-7 py-4 flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5" style={{ background: a, color: "#0b0b0c" }}>
              Start a project <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#" className="label rounded-full px-7 py-4 border border-ink-line text-paper hover:-translate-y-0.5 transition-transform duration-300">Back to work →</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <a href="#" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>{c.client} — made. by ac · {c.year}</span>
        </div>
      </footer>
    </div>
  );
}

const Meta: FC<{ k: string; v: string; a: string }> = ({ k, v, a }) => (
  <div className="bg-ink p-5 md:p-7">
    <div className="label" style={{ color: a }}>{k}</div>
    <div className="mt-3 text-sm md:text-[15px] text-paper">{v}</div>
  </div>
);

const WorkPiece: FC<{ project: Project; reversed: boolean; accent: string }> = ({ project, reversed, accent }) => (
  <div className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
    <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
      <div className="rounded-2xl overflow-hidden border border-ink-line bg-black">
        <img src={project.imageUrl} alt={project.altText} loading="lazy" referrerPolicy="no-referrer" className="w-full max-h-[64vh] object-contain" />
      </div>
    </div>
    <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
      <span className="label" style={{ color: accent }}>{project.category}</span>
      <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight text-paper">{project.title}</h3>
      <p className="mt-5 text-grey-dim leading-relaxed max-w-md">{project.description}</p>
    </div>
  </div>
);
