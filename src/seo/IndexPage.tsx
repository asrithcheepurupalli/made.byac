import { ArrowUpRight } from "lucide-react";
import type { Index } from "./registry";
import { Header, Footer, Page } from "./Shell";
import { EMAIL, WHATSAPP } from "./data";

export function IndexPage({ i }: { i: Index }) {
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I would like to talk about a project.")}`;
  return (
    <Page>
      <Header />
      <main>
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="label text-[10px] text-ink/65 flex gap-2">
            <a href="/" className="hover:text-ink">Home</a><span aria-hidden>/</span><span className="text-ink/80" aria-current="page">{i.eyebrow}</span>
          </nav>
          <span className="mt-8 block label text-red">{i.eyebrow}</span>
          <h1 className="mt-5 text-balance font-display text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em] max-w-5xl">{i.h1}<span className="text-red">.</span></h1>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-ink/80 max-w-2xl">{i.lede}</p>
        </section>
        <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
          <ul className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
            {i.items.map((it, n) => (
              <li key={it.path}>
                <a href={it.path} className="group flex h-full flex-col rounded-2xl border border-paper-line bg-white p-8 hover:border-[#8a6d2f]/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="label text-[10px] text-[#8a6d2f]">{String(n + 1).padStart(2, "0")}</span>
                    <ArrowUpRight className="w-5 h-5 text-ink/65 group-hover:text-ink transition-colors" aria-hidden />
                  </div>
                  <h2 className="mt-5 font-display text-2xl md:text-3xl leading-[1.1] group-hover:text-[#8a6d2f] transition-colors">{it.label}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{it.hint}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="border-t border-paper-line">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 text-center">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto text-balance">Not sure which one is you? Just tell us about your day.</h2>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors">Message us on WhatsApp <ArrowUpRight className="w-4 h-4" aria-hidden /></a>
              <a href={`mailto:${EMAIL}`} className="text-ink/65 hover:text-[#8a6d2f] transition-colors text-sm underline underline-offset-4 decoration-paper-line">or email {EMAIL}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Page>
  );
}
