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
import { LivePage } from "./LivePage";
import { SystemPage } from "./SystemPage";
import { WorthPage } from "./WorthPage";
import { MotionPage } from "./MotionPage";
import { CraftPage } from "./CraftPage";
import { PlayCanvas } from "./PlayCanvas";
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
  // Only PAGE routes (#/...) swap content. In-page scroll anchors (#say-hi, #why…)
  // must NOT re-key the tree, or every anchor click remounts the whole page and the
  // scroll is thrown away (the "dead loop").
  const pageRoute = route.startsWith("#/") ? route : "";

  // Re-arm scroll reveals + magnetic elements whenever the route swaps content.
  useScrollReveal(`${pageRoute}|${path}`);
  useMagnetic(`${pageRoute}|${path}`);

  useEffect(() => {
    if (route.startsWith("#/work/") || route === "#/offer" || route === "#/work" || route === "#/ai" || route === "#/kitchen" || route === "#/labs" || route === "#/laws" || route === "#/live" || route === "#/system" || route === "#/worth" || route === "#/motion" || route === "#/craft") window.scrollTo(0, 0);
  }, [route]);

  // Deep-link to a homepage section from another page (e.g. /#say-hi from /laws) is a
  // full load: scroll to the anchor once it exists and the intro curtain has unlocked.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash.length < 2 || hash.startsWith("#/")) return;
    if (window.location.pathname.replace(/\/$/, "") !== "") return; // anchors live on the homepage
    let cancelled = false;
    let tries = 0;
    const tick = () => {
      if (cancelled) return;
      let el: Element | null = null;
      try { el = document.querySelector(hash); } catch { el = null; }
      const locked = document.body.style.overflow === "hidden";
      if (el && !locked) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } }).__lenis;
        if (lenis) lenis.scrollTo(el, { offset: 0 });
        else (el as HTMLElement).scrollIntoView();
      } else if (tries++ < 45) {
        window.setTimeout(tick, 80);
      }
    };
    window.setTimeout(tick, 120);
    return () => { cancelled = true; };
  }, []);

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
  } else if (path === "/live" || route === "#/live") {
    content = <LivePage />;
  } else if (path === "/system" || route === "#/system") {
    content = <SystemPage />;
  } else if (path === "/worth" || route === "#/worth") {
    content = <WorthPage />;
  } else if (path === "/motion" || route === "#/motion") {
    content = <MotionPage />;
  } else if (path === "/craft" || route === "#/craft") {
    content = <CraftPage />;
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
        <PlayCanvas />
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
      <div key={`${pageRoute}|${path}`} className="route-fade">
        {content}
      </div>
    </>
  );
}
