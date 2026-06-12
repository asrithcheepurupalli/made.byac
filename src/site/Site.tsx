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
    if (route.startsWith("#/work/") || route === "#/offer") window.scrollTo(0, 0);
  }, [route]);

  // /offer is a real path (served by offer.html for correct share previews);
  // #/offer is kept as an in-app fallback.
  const onOfferPath =
    typeof window !== "undefined" &&
    window.location.pathname.replace(/\/$/, "").replace(/\.html$/, "") === "/offer";
  if (onOfferPath || route === "#/offer") {
    return (
      <>
        <SmoothScroll />
        <OfferPage />
      </>
    );
  }

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
