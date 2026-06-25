import { useEffect, useState } from "react";

// Fixed studio nav. Uses mix-blend-difference so the wordmark + links stay
// legible against both the paper (light) acts and the ink (dark) gallery.
const LINKS = [
  { label: "Work", href: "/work" },
  { label: "Labs", href: "/labs" },
  { label: "AI", href: "/ai" },
  { label: "Craft", href: "/craft" },
  { label: "Offer", href: "/offer" },
  { label: "Why", href: "#why" },
  { label: "Studio", href: "#studio" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // the fixed nav flips to light text whenever a dark (ink) section sits behind it
  const [navDark, setNavDark] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    // Read once per frame (rAF-throttled) instead of on every scroll event. Lenis
    // fires many scroll events per frame, and the old handler did a querySelectorAll
    // + getBoundingClientRect on each one, thrashing layout. setState bails when the
    // boolean is unchanged, so the nav only re-renders when a state actually flips.
    const read = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 240 && y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
      let over = false;
      document.querySelectorAll<HTMLElement>("[data-nav-dark]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 44 && r.bottom >= 44) over = true;
      });
      setNavDark(over);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const tone = navDark ? "text-paper" : "text-ink";
  const sayHi = navDark
    ? "border-paper/50 hover:bg-paper hover:text-ink"
    : "border-ink/30 hover:bg-ink hover:text-paper";
  const bar = navDark ? "bg-paper" : "bg-ink";

  // Lock background scroll + close on Escape / route change while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onHash = () => setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 ${tone} transition-[transform,padding,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "pb-5" : "pb-8"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
        // top padding includes the safe-area inset so it isn't flush to the top
        style={{ paddingTop: `calc(env(safe-area-inset-top) + ${scrolled ? "1.25rem" : "2rem"})` }}
      >
        <nav className="mx-auto max-w-[1600px] px-6 md:px-10 flex items-center justify-between">
          <a href="#top" className="font-display text-2xl font-semibold italic tracking-tight leading-none">
            made<span className="not-italic">.</span>
          </a>

          {/* desktop links */}
          <div className="hidden sm:flex items-center gap-7">
            <ul className="flex items-center gap-7">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="u-link label text-[10px] opacity-80 hover:opacity-100 transition-opacity">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#say-hi"
              data-cursor="Hello"
              data-magnetic
              className={`label text-[10px] border rounded-full px-4 py-2 transition-colors ${sayHi}`}
            >
              Say hi
            </a>
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="sm:hidden relative w-9 h-9 -mr-1 flex flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block h-px w-6 ${menuOpen ? "bg-paper" : bar} transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 ${menuOpen ? "bg-paper" : bar} transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* mobile full-screen overlay menu */}
      <div
        className={`sm:hidden fixed inset-0 z-40 bg-ink text-paper transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-line) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(120% 90% at 50% 30%, #000 50%, transparent 100%)",
          }}
        />
        <div
          className="relative h-full flex flex-col px-7 pb-12"
          style={{ paddingTop: "max(calc(env(safe-area-inset-top) + 6rem), 7rem)" }}
        >
          <span className="label text-red">·menu</span>
          <ul className="mt-8 flex flex-col gap-1">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 py-3 font-display text-5xl tracking-tight"
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "none" : "translateY(14px)",
                    transition: `opacity 0.5s ${0.08 * i + 0.1}s cubic-bezier(0.16,1,0.3,1), transform 0.5s ${
                      0.08 * i + 0.1
                    }s cubic-bezier(0.16,1,0.3,1)`,
                  }}
                >
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="group-hover:text-gold transition-colors">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <a
              href="#say-hi"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center w-full bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors"
            >
              Say hi
            </a>
            <a
              href="mailto:thebrain@made-by-ac.com"
              className="mt-5 block text-center text-grey-dim text-sm hover:text-gold transition-colors"
            >
              thebrain@made-by-ac.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
