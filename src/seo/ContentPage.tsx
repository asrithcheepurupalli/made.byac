import { ArrowUpRight } from "lucide-react";
import type { Content, Section } from "./content-types";
import { EMAIL, HUB, waLink } from "./data";
import { relatedFor } from "./registry";
import { Header, Footer, Page } from "./Shell";
import { TrustStrip, FitBlock, NextSteps, StickyCta, CheckList, Moment, RelatedLinks, Deliverables, Gallery, PricingNote } from "./blocks";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function SectionBody({ s, idx, id, onLight }: { s: Section; idx: number; id: string; onLight: boolean }) {
  const muted = onLight ? "text-ink/75" : "text-ink/75";
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="font-display text-3xl md:text-4xl leading-[1.08] text-balance">{s.h}</h2>
      {s.p.map((t) => <p key={t} className={`mt-5 text-[17px] md:text-lg leading-relaxed ${muted}`}>{t}</p>)}
      {s.bullets && (
        <ul className={`${onLight ? "" : "reveal-stagger"} mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3`}>
          {s.bullets.map((b) => (
            <li key={b} className={`flex gap-3 rounded-xl border p-4 text-[15px] leading-relaxed ${onLight ? "border-paper-line bg-paper-dim text-ink/85" : "border-paper-line bg-white text-ink/85"}`}>
              <span aria-hidden className="mt-2 block w-1.5 h-1.5 shrink-0 rounded-full bg-red" /> {b}
            </li>
          ))}
        </ul>
      )}
      {s.checklist && <CheckList items={s.checklist} id={`${id}-${idx}`} />}
    </div>
  );
}

function Faqs({ c, onLight }: { c: Content; onLight: boolean }) {
  return (
    <div className={`mt-10 divide-y border-y ${onLight ? "divide-paper-line border-paper-line" : "divide-paper-line border-paper-line"}`}>
      {c.faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl md:text-2xl leading-snug">
            <span>{f.q}</span>
            <span aria-hidden className="mt-1 shrink-0 text-red transition-transform duration-300 group-open:rotate-45">+</span>
          </summary>
          <p className={`mt-4 text-[16px] leading-relaxed max-w-3xl ${onLight ? "text-ink/75" : "text-ink/75"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ContentPage({ c }: { c: Content }) {
  const wa = waLink(c.ctaMessage);
  const related = relatedFor(c.related);
  const isGuide = c.kind === "guide";

  return (
    <Page>
      <Header cta={{ href: wa, label: "Message us" }} />
      <main>
        {/* HERO: promise, proof, one action */}
        <div style={{ background: `radial-gradient(70% 70% at 88% 0%, ${c.accent}1f, transparent 70%)` }}>
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-14 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className={isGuide || !c.proof ? "lg:col-span-9" : "lg:col-span-7"}>
            <nav aria-label="Breadcrumb" className="label text-[10px] text-ink/65 flex flex-wrap gap-2">
              <a href="/" className="hover:text-ink">Home</a><span aria-hidden>/</span>
              {isGuide ? <a href="/guides" className="hover:text-ink">Guides</a> : <a href={HUB.path} className="hover:text-ink">Services</a>}
              <span aria-hidden>/</span><span className="text-ink/80" aria-current="page">{c.navLabel}</span>
            </nav>
            <span className="mt-8 block label" style={{ color: c.accent }}>{c.eyebrow}</span>
            <h1 className="mt-5 text-balance font-display text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em]">{c.h1}{/[?!.]$/.test(c.h1) ? null : <span className="text-red">.</span>}</h1>
            {isGuide && (
              <p className="mt-5 label text-[10px] text-ink/65">By the made. by ac team · {c.datePublished} · {c.readMins} min read</p>
            )}
            <p className="mt-8 text-lg md:text-xl leading-relaxed text-ink/80 max-w-2xl">{c.lede}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors">
                {c.ctaLabel} <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.navLabel)}`} className="text-ink/65 hover:text-[#8a6d2f] transition-colors text-sm underline underline-offset-4 decoration-paper-line">or email {EMAIL}</a>
            </div>
          </div>
          {!isGuide && c.proof && (
            <div className="lg:col-span-5">
              <a href={c.proof.href} {...(c.proof.external ? { target: "_blank", rel: "noreferrer" } : {})} className="group block rounded-2xl overflow-hidden border border-paper-line bg-white">
                <img src={c.proof.img} alt={c.proof.alt} width={1200} height={750} className="w-full aspect-[16/10] object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                <div className="p-6">
                  <span className="label text-[10px]" style={{ color: c.accent }}>{c.proof.label}</span>
                  <h2 className="mt-2 font-display text-2xl leading-snug">{c.proof.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.proof.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 label text-[10px] text-ink/85 group-hover:text-[#8a6d2f] transition-colors">{c.proof.cta} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden /></span>
                </div>
              </a>
            </div>
          )}
        </section>

        </div>

        <TrustStrip cluster={isGuide ? "guide" : c.cluster} />

        {/* BODY: the story, in order: why, try it, what you get, see it, then the rest */}
        {c.sections.map((s, i) => {
          const tint = i % 2 === 1 ? "bg-white border-y border-paper-line" : "";
          return (
            <div key={s.h}>
              <section className={isGuide ? (i % 2 ? "bg-white border-y border-paper-line" : "") : tint}>
                <div className={`mx-auto px-6 md:px-10 py-16 md:py-24 ${isGuide ? "max-w-[820px]" : "max-w-[1000px]"}`}>
                  <div className="reveal-up"><SectionBody s={s} idx={i} id={slug(s.h)} onLight /></div>
                </div>
              </section>
              {!isGuide && i === 0 && (
                <>
                  <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-16 md:pb-24"><div className="reveal-up"><Moment cluster={c.cluster} /></div></div>
                  <Deliverables cluster={c.cluster} accent={c.accent} />
                  <Gallery cluster={c.cluster} accent={c.accent} />
                </>
              )}
            </div>
          );
        })}

        {!isGuide && <FitBlock cluster={c.cluster} />}
        {!isGuide && <PricingNote cluster={c.cluster} />}

        {/* FAQ */}
        <section className="bg-white border-y border-paper-line text-ink">
          <div className="mx-auto max-w-[900px] px-6 md:px-10 py-20 md:py-28">
            <span className="label text-red">Questions we get asked</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02]">Straight answers.</h2>
            <Faqs c={c} onLight />
          </div>
        </section>

        <RelatedLinks items={related} heading={isGuide ? "Keep reading" : "Related"} />
        <NextSteps href={wa} label={c.ctaLabel} cluster={c.cluster} />
      </main>
      <Footer />
      <StickyCta href={wa} label={c.ctaLabel} />
    </Page>
  );
}
