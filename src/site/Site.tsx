import { useEffect, useState, type ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollProgress } from "./ScrollProgress";
import { Cursor } from "./Cursor";
import { Intro } from "./Intro";
import { useScrollReveal } from "./useScrollReveal";
import { useMagnetic } from "./useMagnetic";
import { SiteNav } from "./SiteNav";
import { ActHero } from "./ActHero";
import { ProblemPicker } from "./ProblemPicker";
import { LiveCompose } from "./LiveCompose";
import { BeforeAfter } from "./BeforeAfter";
import { Manifesto } from "./Manifesto";
import { SelectedWork } from "./SelectedWork";
import { GridLab } from "./GridLab";
import { Invitation } from "./Invitation";
import { SiteFooter } from "./SiteFooter";
import { OfferPage } from "./OfferPage";
import { AiPage } from "./AiPage";
import { KitchenPage } from "./KitchenPage";
import { WorkPage } from "./WorkPage";
import { LabsPage } from "./LabsPage";
import { LabsTease } from "./LabsTease";
import { LawsPage } from "./LawsPage";
import { LawsTease } from "./LawsTease";
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

  // Re-arm scroll reveals + magnetic elements whenever the route swaps content.
  useScrollReveal(`${route}|${path}`);
  useMagnetic(`${route}|${path}`);

  useEffect(() => {
    if (route.startsWith("#/work/") || route === "#/offer" || route === "#/work" || route === "#/ai" || route === "#/kitchen" || route === "#/labs" || route === "#/laws") window.scrollTo(0, 0);
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
  } else if (path === "/ai" || route === "#/ai") {
    content = <AiPage />;
  } else if (path === "/kitchen" || route === "#/kitchen") {
    content = <KitchenPage />;
  } else if (path === "/work" || route === "#/work") {
    content = <WorkPage />;
  } else if (path === "/labs" || route === "#/labs") {
    content = <LabsPage />;
  } else if (path === "/laws" || route === "#/laws") {
    content = <LawsPage />;
  } else {
    content = (
      <div className="bg-paper text-ink font-sans antialiased">
        <Intro />
        <SiteNav />
        <main>
          <ActHero />
          <ProblemPicker />
          <LiveCompose />
          <BeforeAfter />
          <SelectedWork />
          <LabsTease />
          <LawsTease />
          <GridLab />
          <Manifesto />
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
      <div className="grain" aria-hidden />
      <div key={`${route}|${path}`} className="route-fade">
        {content}
      </div>
    </>
  );
}
