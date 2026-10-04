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

export function Header({ cta }: { cta?: { href: string; label: string } }) {
  const c = cta ?? { href: "/#say-hi", label: "Say hi" };
  const external = c.href.startsWith("http");
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper/90 backdrop-blur-md border-b border-paper-line text-ink" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-2xl font-semibold italic tracking-tight leading-none" aria-label="made. by ac, homepage">
          made<span className="not-italic text-red">.</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/" className="hidden sm:inline label text-[10px] text-ink/70 hover:text-ink transition-colors">Homepage</a>
          <a href={c.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="label text-[10px] bg-red text-white rounded-full px-5 py-2.5 hover:bg-red-deep transition-colors">{c.label}</a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper-dim text-ink border-t border-paper-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div className="max-w-sm">
            <a href="/" className="font-display text-5xl md:text-6xl font-semibold italic tracking-tight inline-block">
              made<span className="not-italic text-red">.</span>
            </a>
            <p className="mt-4 text-ink/65 leading-relaxed">
              A design and software studio based in Visakhapatnam, India, working with clients worldwide.
            </p>
            <a href={`mailto:${EMAIL}`} className="mt-4 inline-block text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">{EMAIL}</a>
          </div>
          <nav aria-label="Services" className="flex flex-col gap-3">
            <span className="label text-ink/60">Services</span>
            <a href={HUB.path} className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">All services</a>
            {SERVICES.map((s) => (
              <a key={s.slug} href={s.path} className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">{s.navLabel}</a>
            ))}
            <a href="/ai" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">AI automation</a>
          </nav>
          <nav aria-label="Clinics and guides" className="flex flex-col gap-3">
            <span className="label text-ink/60">Clinics &amp; guides</span>
            <a href="/clinic-software" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Clinic booking by city and speciality</a>
            <a href="/clinic-appointment-booking-software-visakhapatnam" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Clinics in Visakhapatnam</a>
            <a href="/clinic-appointment-booking-software-andhra-pradesh" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Clinics in Andhra Pradesh</a>
            <a href="/guides" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Guides</a>
          </nav>
          <nav aria-label="Studio" className="flex flex-col gap-3">
            <span className="label text-ink/60">Studio</span>
            <a href="/" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">made. by ac homepage</a>
            <a href="/work/ramachandra-ortho" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Clinic booking case study</a>
            <a href="/work/aavira" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Restaurant platform study</a>
            <a href="/#say-hi" className="text-ink/80 hover:text-[#8a6d2f] transition-colors text-sm">Contact</a>
          </nav>
        </div>
        <div className="mt-14 pt-7 border-t border-paper-line flex flex-col sm:flex-row justify-between gap-3 label text-ink/60">
          <span>© 2026 made. by ac</span>
          <span className="flex gap-5"><a href="/privacy" className="hover:text-ink">Privacy</a><a href="/terms" className="hover:text-ink">Terms</a><span>Visakhapatnam, Andhra Pradesh, India</span></span>
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="bg-paper text-ink font-sans antialiased min-h-[100svh]">{children}</div>;
}
