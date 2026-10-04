import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "./Cursor";
import { Intro } from "./Intro";
import { useScrollReveal } from "./useScrollReveal";
import { useMagnetic } from "./useMagnetic";
import { SiteNav } from "./SiteNav";
import { ActHero } from "./ActHero";
import { SiteFooter } from "./SiteFooter";
import { Defer } from "./Defer";
import { CAMPAIGN_CASES } from "./case/caseData";

const ProblemPicker = lazy(() => import("./ProblemPicker").then((m) => ({ default: m.ProblemPicker })));
const BeforeAfter = lazy(() => import("./BeforeAfter").then((m) => ({ default: m.BeforeAfter })));
const SelectedWork = lazy(() => import("./SelectedWork").then((m) => ({ default: m.SelectedWork })));
const ProductsTease = lazy(() => import("./ProductsTease").then((m) => ({ default: m.ProductsTease })));
const ExploreTease = lazy(() => import("./ExploreTease").then((m) => ({ default: m.ExploreTease })));
const GridLab = lazy(() => import("./GridLab").then((m) => ({ default: m.GridLab })));
const Manifesto = lazy(() => import("./Manifesto").then((m) => ({ default: m.Manifesto })));
const Invitation = lazy(() => import("./Invitation").then((m) => ({ default: m.Invitation })));
const PlayCanvas = lazy(() => import("./PlayCanvas").then((m) => ({ default: m.PlayCanvas })));

// Route pages load on demand, so the homepage ships only its own code instead of all
// eleven pages in one bundle (that monolith is what made the site slow).
const OfferPage = lazy(() => import("./OfferPage").then((m) => ({ default: m.OfferPage })));
const AiPage = lazy(() => import("./AiPage").then((m) => ({ default: m.AiPage })));
const KitchenPage = lazy(() => import("./KitchenPage").then((m) => ({ default: m.KitchenPage })));
const WorkPage = lazy(() => import("./WorkPage").then((m) => ({ default: m.WorkPage })));
const LabsPage = lazy(() => import("./LabsPage").then((m) => ({ default: m.LabsPage })));
const LawsPage = lazy(() => import("./LawsPage").then((m) => ({ default: m.LawsPage })));
const LivePage = lazy(() => import("./LivePage").then((m) => ({ default: m.LivePage })));
const SystemPage = lazy(() => import("./SystemPage").then((m) => ({ default: m.SystemPage })));
const WorthPage = lazy(() => import("./WorthPage").then((m) => ({ default: m.WorthPage })));
const MotionPage = lazy(() => import("./MotionPage").then((m) => ({ default: m.MotionPage })));
const CraftPage = lazy(() => import("./CraftPage").then((m) => ({ default: m.CraftPage })));
const TeardownPage = lazy(() => import("./TeardownPage").then((m) => ({ default: m.TeardownPage })));
const SomaaCaseStudy = lazy(() => import("./case/SomaaCaseStudy").then((m) => ({ default: m.SomaaCaseStudy })));
const SeoRoute = lazy(() => import("../seo/SeoRoute").then((m) => ({ default: m.SeoRoute })));
const OrthoCaseStudy = lazy(() => import("./case/OrthoCaseStudy").then((m) => ({ default: m.OrthoCaseStudy })));
const CampaignCaseStudy = lazy(() => import("./case/CampaignCaseStudy").then((m) => ({ default: m.CampaignCaseStudy })));

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
  // Case studies live at real paths (/work/<slug>) so search engines can index them.
  // Old #/work/<slug> links redirect to the path.
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith("#/work/")) window.location.replace(`/work/${h.slice("#/work/".length)}`);
  }, []);

  // Only PAGE routes (#/...) swap content. In-page scroll anchors (#say-hi, #why…)
  // must NOT re-key the tree, or every anchor click remounts the whole page and the
  // scroll is thrown away (the "dead loop").
  const pageRoute = route.startsWith("#/") ? route : "";

  // Re-arm scroll reveals + magnetic elements whenever the route swaps content.
  useScrollReveal(`${pageRoute}|${path}`);
  useMagnetic(`${pageRoute}|${path}`);

  useEffect(() => {
    if (route === "#/offer" || route === "#/work" || route === "#/ai" || route === "#/kitchen" || route === "#/labs" || route === "#/laws" || route === "#/live" || route === "#/system" || route === "#/worth" || route === "#/motion" || route === "#/craft" || route === "#/teardown") window.scrollTo(0, 0);
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
  const caseSlug = path.startsWith("/work/") ? path.slice("/work/".length) : "";
  const KNOWN = ["", "/index", "/offer", "/ai", "/kitchen", "/work", "/labs", "/laws", "/live", "/system", "/worth", "/motion", "/craft", "/teardown"];
  const isKnownCase = caseSlug === "somaa" || caseSlug === "ramachandra-ortho" || !!CAMPAIGN_CASES[caseSlug];
  const isHashPage = route.startsWith("#/");
  let content: ReactNode;
  if (caseSlug === "somaa") {
    content = <SomaaCaseStudy />;
  } else if (caseSlug === "ramachandra-ortho") {
    content = <OrthoCaseStudy />;
  } else if (caseSlug && CAMPAIGN_CASES[caseSlug]) {
    content = <CampaignCaseStudy slug={caseSlug} />;
  } else if (!isHashPage && !KNOWN.includes(path) && !isKnownCase) {
    content = <SeoRoute path={path} />;
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
  } else if (path === "/teardown" || route === "#/teardown") {
    content = <TeardownPage />;
  } else {
    content = (
      <div className="bg-paper text-ink font-sans antialiased">
        <Intro />
        <SiteNav />
        <main>
          <ActHero />
          <Defer Component={ProblemPicker} id="fix" dark bg="bg-ink" minHeight="100svh" delay={1800} />
          <Defer Component={BeforeAfter} dark bg="bg-ink" minHeight="90svh" delay={2300} />
          <Defer Component={SelectedWork} id="work" dark bg="bg-ink" minHeight="200svh" delay={2800} />
          <Defer Component={ProductsTease} id="products" bg="bg-paper-dim" minHeight="120svh" delay={3300} />
          <Defer Component={ExploreTease} dark bg="bg-ink" minHeight="60svh" delay={3800} />
          <Defer Component={GridLab} id="studio" bg="bg-paper-dim" minHeight="100svh" delay={4300} />
          <Defer Component={Manifesto} id="why" bg="bg-paper" minHeight="80svh" delay={4800} />
          <Defer Component={Invitation} id="say-hi" dark bg="bg-ink" minHeight="100svh" delay={5300} />
        </main>
        <Defer Component={PlayCanvas} bg="bg-paper" minHeight="60svh" delay={5800} />
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
        <Suspense fallback={<div style={{ minHeight: "100vh" }} aria-hidden />}>
          {content}
        </Suspense>
      </div>
    </>
  );
}
