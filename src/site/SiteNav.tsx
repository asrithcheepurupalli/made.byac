import { useEffect, useState } from "react";

// Fixed studio nav. Uses mix-blend-difference so the wordmark + links stay
// legible against both the paper (light) acts and the ink (dark) gallery.
const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Offer", href: "/offer" },
  { label: "Why", href: "#why" },
  { label: "Studio", href: "#studio" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide when scrolling down past the hero, show on the slightest scroll up
      if (y > 240 && y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 mix-blend-difference text-white transition-[transform,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "py-4" : "py-6"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="mx-auto max-w-[1600px] px-6 md:px-10 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl font-semibold italic tracking-tight leading-none">
          made<span className="not-italic">.</span>
        </a>

        <div className="flex items-center gap-7">
          <ul className="hidden sm:flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="u-link label text-[10px] opacity-80 hover:opacity-100 transition-opacity"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#say-hi"
            className="label text-[10px] border border-white/60 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            Say hi
          </a>
        </div>
      </nav>
    </header>
  );
}
