import { useEffect, useState, type ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollProgress } from "./ScrollProgress";
import { Cursor } from "./Cursor";
import { useScrollReveal } from "./useScrollReveal";
import { SiteNav } from "./SiteNav";
import { ActHero } from "./ActHero";
import { Manifesto } from "./Manifesto";
import { SelectedWork } from "./SelectedWork";
import { GridLab } from "./GridLab";
import { Invitation } from "./Invitation";
import { SiteFooter } from "./SiteFooter";
import { OfferPage } from "./OfferPage";
import { WorkPage } from "./WorkPage";
import { SomaaCaseStudy } from "./case/SomaaCaseStudy";
import { CampaignCaseStudy } from "./case/CampaignCaseStudy";
import { CAMPAIGN_CASES } from "./case/caseData";

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

  // /offer and /work are real paths (served by their own .html for correct share
  // previews); the #/ variants are kept as in-app fallbacks.
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/$/, "").replace(/\.html$/, "")
      : "";

  // Re-arm scroll reveals whenever the route swaps the page content.
  useScrollReveal(`${route}|${path}`);

  useEffect(() => {
    if (route.startsWith("#/work/") || route === "#/offer" || route === "#/work") window.scrollTo(0, 0);
  }, [route]);

  // Pick the page for the current route. Case studies first, so a #/work/<slug>
  // deep link wins over the /work archive.
  const campaignSlug = route.startsWith("#/work/") ? route.slice("#/work/".length) : "";
  let content: ReactNode;
  if (route === "#/work/somaa") {
    content = <SomaaCaseStudy />;
  } else if (campaignSlug && CAMPAIGN_CASES[campaignSlug]) {
    content = <CampaignCaseStudy slug={campaignSlug} />;
  } else if (path === "/offer" || route === "#/offer") {
    content = <OfferPage />;
  } else if (path === "/work" || route === "#/work") {
    content = <WorkPage />;
  } else {
    content = (
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
    );
  }

  // Cursor / progress / smooth-scroll are singletons (mounted once, never
  // remounted on navigation); only the page content fades + re-keys per route.
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <SmoothScroll />
      <div key={`${route}|${path}`} className="route-fade">
        {content}
      </div>
    </>
  );
}
