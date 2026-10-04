import { useState } from "react";
import { SERVICES, HUB, EMAIL } from "./data";
import { Header, Footer, Page } from "./Shell";

const PAGES = [
  { label: "Home", href: "/", hint: "The studio" },
  { label: "Work", href: "/work", hint: "Case studies and projects" },
  { label: "Services", href: HUB.path, hint: "What we build" },
  ...SERVICES.map((s) => ({ label: s.navLabel, href: s.path, hint: s.eyebrow })),
  { label: "AI automation", href: "/ai", hint: "Agents for sales and support" },
  { label: "Labs", href: "/labs", hint: "Concept studies" },
  { label: "Craft", href: "/craft", hint: "Interactive pieces" },
  { label: "Contact", href: "/#say-hi", hint: "Say hi" },
];

export function NotFoundPage() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = term ? PAGES.filter((p) => (p.label + " " + p.hint).toLowerCase().includes(term)) : PAGES.slice(0, 6);
  return (
    <Page>
      <Header />
      <main className="mx-auto max-w-[1100px] px-6 md:px-10 pt-36 md:pt-44 pb-24">
        <span className="label text-red">Error 404</span>
        <h1 className="mt-5 font-display text-7xl md:text-[10rem] leading-[0.85] tracking-[-0.03em] italic">
          404<span className="not-italic text-red">.</span>
        </h1>
        <h2 className="mt-8 font-display text-3xl md:text-5xl leading-[1.05]">That page isn't here.</h2>
        <p className="mt-5 text-lg leading-relaxed text-ink/75 max-w-xl">
          The link may be old, or the page may have moved. Search for what you were after, or pick one of these.
        </p>

        <label htmlFor="nf-search" className="mt-10 block label text-[10px] text-ink/60">Search the site</label>
        <input
          id="nf-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try clinic, restaurant, website, WhatsApp"
          className="mt-3 w-full max-w-xl rounded-full bg-white border border-paper-line px-6 py-4 text-ink placeholder:text-ink/50 outline-none focus:border-gold"
        />

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          {shown.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="group block rounded-xl border border-paper-line px-5 py-4 hover:border-[#8a6d2f]/60 transition-colors">
                <span className="font-display text-xl group-hover:text-[#8a6d2f] transition-colors">{p.label}</span>
                <span className="block text-sm text-ink/65">{p.hint}</span>
              </a>
            </li>
          ))}
          {shown.length === 0 && <li className="text-ink/65">Nothing matched. Try the homepage, or email us.</li>}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a href="/" className="inline-flex items-center bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors">Back to the homepage</a>
          <a href={`mailto:${EMAIL}`} className="text-ink/65 hover:text-[#8a6d2f] transition-colors text-sm underline underline-offset-4 decoration-paper-line">Tell us what was missing</a>
        </div>
      </main>
      <Footer />
    </Page>
  );
}
