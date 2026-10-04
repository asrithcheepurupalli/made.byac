import { ArrowUpRight } from "lucide-react";
import { SERVICES, HUB, EMAIL, WHATSAPP } from "./data";
import { Header, Footer, Page } from "./Shell";

export function ServicesHub() {
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I would like to talk about a project.")}`;
  return (
    <Page>
      <Header />
      <main>
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-20">
          <nav aria-label="Breadcrumb" className="label text-[10px] text-grey-dim flex gap-2">
            <a href="/" className="hover:text-paper">Home</a><span aria-hidden>/</span>
            <span className="text-paper/80" aria-current="page">Services</span>
          </nav>
          <span className="mt-8 block label text-red">Services · Visakhapatnam, Andhra Pradesh, India</span>
          <h1 className="mt-5 text-balance font-display text-5xl md:text-8xl leading-[0.95] tracking-[-0.02em] max-w-5xl">{HUB.h1}<span className="text-red">.</span></h1>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-paper/80 max-w-2xl">{HUB.lede}</p>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {SERVICES.map((s, i) => (
              <li key={s.slug}>
                <a href={s.path} className="group flex h-full flex-col rounded-2xl border border-ink-line bg-ink-soft p-8 md:p-10 hover:border-gold/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="label text-[10px]" style={{ color: s.accent }}>{String(i + 1).padStart(2, "0")} · {s.eyebrow}</span>
                    <ArrowUpRight className="w-5 h-5 text-grey-dim group-hover:text-paper transition-colors" aria-hidden />
                  </div>
                  <h2 className="mt-6 font-display text-3xl md:text-4xl leading-[1.05] group-hover:text-gold transition-colors">{s.h1}</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-grey-dim">{s.description}</p>
                </a>
              </li>
            ))}
            <li>
              <a href="/ai" className="group flex h-full flex-col rounded-2xl border border-ink-line bg-ink-soft p-8 md:p-10 hover:border-gold/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="label text-[10px]" style={{ color: "#27d17c" }}>06 · AI automation</span>
                  <ArrowUpRight className="w-5 h-5 text-grey-dim group-hover:text-paper transition-colors" aria-hidden />
                </div>
                <h2 className="mt-6 font-display text-3xl md:text-4xl leading-[1.05] group-hover:text-gold transition-colors">AI agents that work the room</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-grey-dim">Conversion and retention agents, voice agents and concierge bots, built in your brand's voice to close the sale you were about to lose.</p>
              </a>
            </li>
          </ul>
        </section>

        <section className="bg-paper text-ink">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4"><span className="label text-red">Who we work with</span></div>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1]">A Vizag studio for clinics, restaurants and growing brands.</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/75 max-w-2xl">
                Our live work runs in Visakhapatnam: a clinic that books through the website and WhatsApp, and a restobar
                that orders from the table. We build the same systems for clinics, hospitals, restaurants and businesses across Andhra
                Pradesh and the rest of India, and our designers handle the brand and packaging side too.
              </p>
              <p className="mt-6 text-ink/70 text-[15px]">
                Want to see everything in one place? Take the <a href="/offer" className="underline underline-offset-4 decoration-red">interactive tour of what we offer</a>,
                or read the <a href="/work" className="underline underline-offset-4 decoration-red">case studies</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-ink-line">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 text-center">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">Not sure which one you need? Tell us the problem.</h2>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors">
                Message us on WhatsApp <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
              <a href={`mailto:${EMAIL}`} className="text-grey-dim hover:text-gold transition-colors text-sm underline underline-offset-4 decoration-ink-line">or email {EMAIL}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Page>
  );
}
