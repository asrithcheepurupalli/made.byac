import type { LegalPageData } from "./legal";
import { Header, Footer, Page } from "./Shell";

export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <Page>
      <Header />
      <main className="mx-auto max-w-[820px] px-6 md:px-10 pt-32 md:pt-40 pb-24">
        <nav aria-label="Breadcrumb" className="label text-[10px] text-ink/65 flex gap-2">
          <a href="/" className="hover:text-ink">Home</a><span aria-hidden>/</span>
          <span className="text-ink/80" aria-current="page">{page.h1}</span>
        </nav>
        <h1 className="mt-8 text-balance font-display text-5xl md:text-6xl leading-[1] tracking-[-0.02em]">{page.h1}<span className="text-red">.</span></h1>
        <p className="mt-4 label text-[10px] text-ink/60">Last updated {page.updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-ink/80">{page.intro}</p>

        <div className="mt-12 divide-y divide-paper-line border-y border-paper-line">
          {page.sections.map((s) => (
            <section key={s.h} className="py-9">
              <h2 className="font-display text-2xl md:text-3xl leading-tight">{s.h}</h2>
              {s.p.map((t) => <p key={t} className="mt-4 text-[16px] leading-relaxed text-ink/80">{t}</p>)}
              {s.bullets && (
                <ul className="mt-4 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[16px] leading-relaxed text-ink/80">
                      <span aria-hidden className="mt-2.5 block w-1.5 h-1.5 shrink-0 rounded-full bg-red" /> {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </Page>
  );
}
