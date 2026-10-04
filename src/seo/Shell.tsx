import type { ReactNode } from "react";
import { SERVICES, HUB, EMAIL } from "./data";

// Static, SSR-safe chrome for the search-facing pages. No hooks, no window access at
// render, so the same component prerenders at build time and runs in the browser.

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: HUB.path },
  { label: "AI", href: "/ai" },
  { label: "Craft", href: "/craft" },
];

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink/90 backdrop-blur-md border-b border-ink-line text-paper" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-2xl font-semibold italic tracking-tight leading-none" aria-label="made. by ac, home">
          made<span className="not-italic text-red">.</span>
        </a>
        <nav aria-label="Main" className="hidden sm:flex items-center gap-7">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="label text-[10px] text-paper/80 hover:text-paper transition-colors">{l.label}</a>
          ))}
          <a href="/#say-hi" className="label text-[10px] border border-paper/40 rounded-full px-4 py-2 hover:bg-paper hover:text-ink transition-colors">Say hi</a>
        </nav>
        <details className="sm:hidden relative">
          <summary className="label text-[10px] list-none cursor-pointer border border-paper/40 rounded-full px-4 py-2 select-none">Menu</summary>
          <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-ink-line bg-ink p-3 shadow-2xl">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="block px-3 py-3 font-display text-2xl">{l.label}</a>
            ))}
            <a href="/#say-hi" className="mt-2 block text-center bg-red text-white label rounded-full px-5 py-3">Say hi</a>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper border-t border-ink-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div className="max-w-sm">
            <a href="/" className="font-display text-5xl md:text-6xl font-semibold italic tracking-tight inline-block">
              made<span className="not-italic text-red">.</span>
            </a>
            <p className="mt-4 text-grey-dim leading-relaxed">
              A design and development studio in Visakhapatnam, building for businesses across Andhra Pradesh and India.
            </p>
            <a href={`mailto:${EMAIL}`} className="mt-4 inline-block text-paper/80 hover:text-gold transition-colors text-sm">{EMAIL}</a>
          </div>
          <nav aria-label="Services" className="flex flex-col gap-3">
            <span className="label text-grey">Services</span>
            <a href={HUB.path} className="text-paper/80 hover:text-gold transition-colors text-sm">All services</a>
            {SERVICES.map((s) => (
              <a key={s.slug} href={s.path} className="text-paper/80 hover:text-gold transition-colors text-sm">{s.navLabel}</a>
            ))}
            <a href="/ai" className="text-paper/80 hover:text-gold transition-colors text-sm">AI automation</a>
          </nav>
          <nav aria-label="Studio" className="flex flex-col gap-3">
            <span className="label text-grey">Studio</span>
            <a href="/work" className="text-paper/80 hover:text-gold transition-colors text-sm">Work</a>
            <a href="/work/ramachandra-ortho" className="text-paper/80 hover:text-gold transition-colors text-sm">Clinic booking case study</a>
            <a href="/work/somaa" className="text-paper/80 hover:text-gold transition-colors text-sm">Restaurant ordering case study</a>
            <a href="/labs" className="text-paper/80 hover:text-gold transition-colors text-sm">Labs</a>
            <a href="/#say-hi" className="text-paper/80 hover:text-gold transition-colors text-sm">Contact</a>
          </nav>
        </div>
        <div className="mt-14 pt-7 border-t border-ink-line flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <span>© 2026 made. by ac</span>
          <span>Visakhapatnam, Andhra Pradesh, India</span>
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="bg-ink text-paper font-sans antialiased min-h-[100svh]">{children}</div>;
}
