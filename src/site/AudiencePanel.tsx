import { ArrowUpRight } from "lucide-react";
import { PROFILES, SEGS, setSeg, useAudience } from "./audience";
import { waLink } from "../seo/contact";

// Under the hero. Everyone gets the same one line chooser; once we know who is reading
// (from the link they came on, or their tap) it opens into the proof that suits them.
export function AudiencePanel() {
  const seg = useAudience();
  const p = seg ? PROFILES[seg] : null;

  return (
    <section id="for-you" aria-label="Show me the work for" className="bg-paper border-t border-ink/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <span className="label text-[10px] text-ink/60 shrink-0">I am here as</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose what describes you">
            {SEGS.map((s) => {
              const on = s === seg;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSeg(on ? "" : s)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${on ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink/85 hover:border-ink"}`}
                >
                  {PROFILES[s].chip}
                </button>
              );
            })}
          </div>
        </div>

        {p && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 aud-in">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.01em]">{p.headline}</h2>
              <p className="mt-5 text-ink/75 leading-relaxed max-w-md">{p.sub}</p>
              <a
                href={waLink(p.wa)}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 label text-white hover:bg-red-deep transition-colors"
              >
                {p.cta} <span aria-hidden>→</span>
              </a>
            </div>
            <ul className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {p.tiles.map((t) => {
                const external = /^https?:/.test(t.href);
                return (
                  <li key={t.title}>
                    <a
                      href={t.href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex h-full flex-col rounded-2xl border border-ink/15 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-ink"
                    >
                      <span className="label text-[10px] text-red">{t.tag}</span>
                      <span className="mt-4 font-display text-2xl leading-tight">{t.title}</span>
                      <span className="mt-2 text-sm text-ink/70 leading-relaxed">{t.line}</span>
                      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 label text-[10px] text-ink/70 group-hover:text-ink">
                        Open <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
