import { useEffect, useState } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { SiteNav } from "./SiteNav";
import { ActHero } from "./ActHero";
import { Manifesto } from "./Manifesto";
import { SelectedWork } from "./SelectedWork";
import { GridLab } from "./GridLab";
import { Invitation } from "./Invitation";
import { SiteFooter } from "./SiteFooter";
import { SomaaCaseStudy } from "./case/SomaaCaseStudy";

// Tiny hash router so case-study pages get their own URL + back button,
// without pulling in a routing dependency.
function useHashRoute() {
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash : ""));
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

// The made. studio site — one immersive scroll, three acts:
//   I.   Editorial Brutalist hero (paper) + manifesto
//   II.  Cinematic Dark Gallery — the work (ink)
//   III. Kinetic Grid Lab — the studio (paper-dim)
//   + the Invitation (ink) and footer.  Case studies live at #/work/<slug>.
export function Site() {
  const route = useHashRoute();

  useEffect(() => {
    if (route.startsWith("#/work/")) window.scrollTo(0, 0);
  }, [route]);

  if (route === "#/work/somaa") {
    return (
      <>
        <SmoothScroll />
        <SomaaCaseStudy />
      </>
    );
  }

  return (
    <>
      <SmoothScroll />
      <div className="bg-paper text-ink font-sans antialiased">
        <SiteNav />
        <main>
          <ActHero />
          <Manifesto />
          <SelectedWork />
          <GridLab />
          <Invitation />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
