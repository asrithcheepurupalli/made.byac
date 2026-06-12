import { useEffect, useState } from "react";
import { SmoothScroll } from "./SmoothScroll";
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

  useEffect(() => {
    if (route.startsWith("#/work/") || route === "#/offer" || route === "#/work") window.scrollTo(0, 0);
  }, [route]);

  // /offer and /work are real paths (served by their own .html for correct share
  // previews); the #/ variants are kept as in-app fallbacks.
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/$/, "").replace(/\.html$/, "")
      : "";

  // Case studies first, so a #/work/<slug> deep link wins over the /work archive.
  if (route === "#/work/somaa") {
    return (
      <>
        <SmoothScroll />
        <SomaaCaseStudy />
      </>
    );
  }

  const campaignSlug = route.startsWith("#/work/") ? route.slice("#/work/".length) : "";
  if (campaignSlug && CAMPAIGN_CASES[campaignSlug]) {
    return (
      <>
        <SmoothScroll />
        <CampaignCaseStudy slug={campaignSlug} />
      </>
    );
  }

  if (path === "/offer" || route === "#/offer") {
    return (
      <>
        <SmoothScroll />
        <OfferPage />
      </>
    );
  }

  if (path === "/work" || route === "#/work") {
    return (
      <>
        <SmoothScroll />
        <WorkPage />
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
