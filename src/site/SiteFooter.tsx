import { useStudio } from "../StudioContext";

// Minimal editorial footer.
export function SiteFooter() {
  const { vizagTime } = useStudio();
  return (
    <footer data-nav-dark className="bg-ink text-paper border-t border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <a href="#top" className="group font-display text-5xl md:text-7xl font-semibold italic tracking-tight inline-block">
              made<span className="not-italic text-red">.</span>
            </a>
            <p className="mt-4 text-grey-dim max-w-sm leading-relaxed">
              A design &amp; development studio. We make brands impossible to ignore.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div className="flex flex-col gap-3">
              <span className="label text-grey">Studio</span>
              <a href="#work" className="text-paper/80 hover:text-gold transition-colors text-sm">Work</a>
              <a href="#why" className="text-paper/80 hover:text-gold transition-colors text-sm">Why</a>
              <a href="#studio" className="text-paper/80 hover:text-gold transition-colors text-sm">Studio</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-grey">Products</span>
              <a href="https://table.made-by-ac.com" target="_blank" rel="noreferrer" className="text-paper/80 hover:text-gold transition-colors text-sm">made. table</a>
              <a href="https://kitchen.made-by-ac.com" target="_blank" rel="noreferrer" className="text-paper/80 hover:text-gold transition-colors text-sm">made. kitchen</a>
              <a href="https://crew.made-by-ac.com" target="_blank" rel="noreferrer" className="text-paper/80 hover:text-gold transition-colors text-sm">made. crew</a>
              <a href="/ai" className="text-paper/80 hover:text-gold transition-colors text-sm">AI agents</a>
              <a href="/offer" className="text-paper/80 hover:text-gold transition-colors text-sm">What we offer</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="label text-grey">Elsewhere</span>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-paper/80 hover:text-gold transition-colors text-sm">Instagram</a>
              <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="text-paper/80 hover:text-gold transition-colors text-sm">Behance</a>
              <a href="mailto:thebrain@made-by-ac.com" className="text-paper/80 hover:text-gold transition-colors text-sm">Email</a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-ink-line flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <span>© 2026 made. by ac · all rights reserved</span>
          <span>Vizag {vizagTime || "··"}</span>
          <span>made with intent</span>
        </div>
      </div>
    </footer>
  );
}
