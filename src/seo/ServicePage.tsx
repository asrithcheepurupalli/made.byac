import { ArrowUpRight } from "lucide-react";
import { SERVICE_BY_SLUG, HUB, EMAIL, waLink, type Service } from "./data";
import { Header, Footer, Page } from "./Shell";

function Cta({ s, className = "" }: { s: Service; className?: string }) {
  return (
    <a
      href={waLink(s.ctaMessage)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors ${className}`}
    >
      {s.ctaLabel} <ArrowUpRight className="w-4 h-4" aria-hidden />
    </a>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const s = SERVICE_BY_SLUG[slug];
  if (!s) return null;
  const related = s.related.map((r) => SERVICE_BY_SLUG[r]).filter(Boolean);

  return (
    <Page>
      <Header />
      <main>
        {/* HERO: one headline, one action, proof right beside it */}
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="label text-[10px] text-grey-dim flex flex-wrap gap-2">
              <a href="/" className="hover:text-paper">Home</a><span aria-hidden>/</span>
              <a href={HUB.path} className="hover:text-paper">Services</a><span aria-hidden>/</span>
              <span className="text-paper/80" aria-current="page">{s.navLabel}</span>
            </nav>
            <span className="mt-8 block label" style={{ color: s.accent }}>{s.eyebrow}</span>
            <h1 className="mt-5 text-balance font-display text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em]">{s.h1}<span className="text-red">.</span></h1>
            <p className="mt-8 text-lg md:text-xl leading-relaxed text-paper/80 max-w-2xl">{s.lede}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta s={s} />
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(s.navLabel)}`} className="text-grey-dim hover:text-gold transition-colors text-sm underline underline-offset-4 decoration-ink-line">or email {EMAIL}</a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <a href={s.proof.href} className="group block rounded-2xl overflow-hidden border border-ink-line bg-ink-soft">
              <img src={s.proof.img} alt={s.proof.alt} width={1200} height={750} className="w-full aspect-[16/10] object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
              <div className="p-6">
                <span className="label text-[10px]" style={{ color: s.accent }}>{s.proof.label}</span>
                <h2 className="mt-2 font-display text-2xl leading-snug">{s.proof.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-grey-dim">{s.proof.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 label text-[10px] text-paper/85 group-hover:text-gold transition-colors">{s.proof.cta} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden /></span>
              </div>
            </a>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="bg-paper text-ink">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
            <span className="label text-red">What changes for you</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl">Outcomes, not a feature list.</h2>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper-line rounded-2xl overflow-hidden border border-paper-line">
              {s.outcomes.map((o) => (
                <div key={o.t} className="bg-paper p-7">
                  <h3 className="font-display text-2xl leading-tight">{o.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{o.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: s.accent }}>What is included</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl">Everything needed to run it day to day.</h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.includes.map((i) => (
              <li key={i.t} className="rounded-2xl border border-ink-line bg-ink-soft p-7">
                <h3 className="font-display text-2xl leading-tight">{i.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-grey-dim">{i.d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* COVERAGE: where we work */}
        <section className="bg-paper-dim text-ink">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4"><span className="label text-red">Where we work</span></div>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">{s.coverage.h}</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/75 max-w-2xl">{s.coverage.p}</p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: s.accent }}>How it works</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl">From first call to live, in four steps.</h2>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {s.process.map((p, i) => (
              <li key={p.t} className="rounded-2xl border border-ink-line p-7">
                <span className="font-mono text-sm" style={{ color: s.accent }}>0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight">{p.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-grey-dim">{p.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ: objection handling, and the FAQPage schema mirrors it */}
        <section className="bg-paper text-ink">
          <div className="mx-auto max-w-[1000px] px-6 md:px-10 py-20 md:py-28">
            <span className="label text-red">Questions we get asked</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02]">Straight answers.</h2>
            <div className="mt-10 divide-y divide-paper-line border-y border-paper-line">
              {s.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl md:text-2xl leading-snug">
                    <span>{f.q}</span>
                    <span aria-hidden className="mt-1 shrink-0 text-red transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink/75 max-w-3xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED: internal links with descriptive anchors */}
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
          <span className="label text-grey">Related</span>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((r) => (
              <a key={r.slug} href={r.path} className="group rounded-2xl border border-ink-line p-7 hover:border-gold/60 transition-colors">
                <span className="label text-[10px]" style={{ color: r.accent }}>{r.eyebrow}</span>
                <h3 className="mt-3 font-display text-2xl leading-tight group-hover:text-gold transition-colors">{r.h1}</h3>
                <span className="mt-4 inline-flex items-center gap-1.5 label text-[10px] text-paper/80">Read more <ArrowUpRight className="w-3.5 h-3.5" aria-hidden /></span>
              </a>
            ))}
          </div>
        </section>

        {/* REPEATED CTA */}
        <section className="border-t border-ink-line">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 text-center">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">Tell us how your day runs. We will say what fits.</h2>
            <div className="mt-10"><Cta s={s} /></div>
          </div>
        </section>
      </main>
      <Footer />
    </Page>
  );
}
