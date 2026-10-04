import { lazy, Suspense, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { lazyRoute } from "./lazyRoute";
import { installTracking } from "./track";
import { installNavigation, normPath, registerFallback, registerRoute, snapshot, subscribe } from "./nav";
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
const SelectedWork = lazy(() => import("./SelectedWork").then((m) => ({ default: m.SelectedWork })));
const ProductsTease = lazy(() => import("./ProductsTease").then((m) => ({ default: m.ProductsTease })));
const ExploreTease = lazy(() => import("./ExploreTease").then((m) => ({ default: m.ExploreTease })));
const GridLab = lazy(() => import("./GridLab").then((m) => ({ default: m.GridLab })));
const Manifesto = lazy(() => import("./Manifesto").then((m) => ({ default: m.Manifesto })));
const Invitation = lazy(() => import("./Invitation").then((m) => ({ default: m.Invitation })));
const PlayCanvas = lazy(() => import("./PlayCanvas").then((m) => ({ default: m.PlayCanvas })));

// Route pages load on demand, so the homepage ships only its own code instead of all
// eleven pages in one bundle (that monolith is what made the site slow).
const OfferPage = lazyRoute(() => import("./OfferPage").then((m) => ({ default: m.OfferPage })));
const AiPage = lazyRoute(() => import("./AiPage").then((m) => ({ default: m.AiPage })));
const KitchenPage = lazyRoute(() => import("./KitchenPage").then((m) => ({ default: m.KitchenPage })));
const WorkPage = lazyRoute(() => import("./WorkPage").then((m) => ({ default: m.WorkPage })));
const LabsPage = lazyRoute(() => import("./LabsPage").then((m) => ({ default: m.LabsPage })));
const LawsPage = lazyRoute(() => import("./LawsPage").then((m) => ({ default: m.LawsPage })));
const LivePage = lazyRoute(() => import("./LivePage").then((m) => ({ default: m.LivePage })));
const SystemPage = lazyRoute(() => import("./SystemPage").then((m) => ({ default: m.SystemPage })));
const WorthPage = lazyRoute(() => import("./WorthPage").then((m) => ({ default: m.WorthPage })));
const MotionPage = lazyRoute(() => import("./MotionPage").then((m) => ({ default: m.MotionPage })));
const CraftPage = lazyRoute(() => import("./CraftPage").then((m) => ({ default: m.CraftPage })));
const TeardownPage = lazyRoute(() => import("./TeardownPage").then((m) => ({ default: m.TeardownPage })));
const SeoRoute = lazyRoute<{ path: string }>(() => import("../seo/SeoRoute").then((m) => ({ default: m.SeoRoute })));
import { ON_AAVIRA_HOST } from "./case/aavira/host";
const AaviraSite = lazyRoute(() => import("./case/aavira/AaviraSite").then((m) => ({ default: m.AaviraSite })));
const AaviraCaseStudy = lazyRoute(() => import("./case/aavira/AaviraCaseStudy").then((m) => ({ default: m.AaviraCaseStudy })));
const OrthoCaseStudy = lazyRoute(() => import("./case/OrthoCaseStudy").then((m) => ({ default: m.OrthoCaseStudy })));
const CampaignCaseStudy = lazyRoute<{ slug: string }>(() => import("./case/CampaignCaseStudy").then((m) => ({ default: m.CampaignCaseStudy })));

// Tell the navigation layer how to warm each page, so a hover (or the click itself) has the
// chunk ready before the swap and the transition never shows a blank frame.
registerRoute("", () => Promise.resolve());
registerRoute("/offer", OfferPage.preload);
registerRoute("/ai", AiPage.preload);
registerRoute("/kitchen", KitchenPage.preload);
registerRoute("/work", WorkPage.preload);
registerRoute("/labs", LabsPage.preload);
registerRoute("/laws", LawsPage.preload);
registerRoute("/live", LivePage.preload);
registerRoute("/system", SystemPage.preload);
registerRoute("/worth", WorthPage.preload);
registerRoute("/motion", MotionPage.preload);
registerRoute("/craft", CraftPage.preload);
registerRoute("/teardown", TeardownPage.preload);
registerRoute("/work/ramachandra-ortho", OrthoCaseStudy.preload);
registerRoute("/work/aavira", AaviraCaseStudy.preload);
registerRoute("/aavira", AaviraSite.preload);
registerRoute("/work/innovolt", CampaignCaseStudy.preload);
registerRoute("/work/mithai-maharaja", CampaignCaseStudy.preload);
registerFallback(SeoRoute.preload);

// Location store: the path and hash, kept in sync with in-app navigation and the back button.
function useLocation() {
  const loc = useSyncExternalStore(subscribe, snapshot, () => "");
  const i = loc.indexOf("#");
  return { path: normPath(i < 0 ? loc : loc.slice(0, i)), hash: i < 0 ? "" : loc.slice(i) };
}

// The made. studio site — one immersive scroll, three acts:
//   I.   Editorial Brutalist hero (paper) + manifesto
//   II.  Cinematic Dark Gallery — the work (ink)
//   III. Kinetic Grid Lab — the studio (paper-dim)
//   + the Invitation (ink) and footer.  Case studies live at #/work/<slug>.
export function Site() {
  const { path: rawPath, hash: route } = useLocation();
  // aavira.made-by-ac.com opens the restaurant site at its root
  const path = ON_AAVIRA_HOST && (rawPath === "" || rawPath === "/") ? "/aavira" : rawPath;

  // Internal links swap pages inside the app (with a transition) instead of reloading.
  useEffect(() => installNavigation(), []);
  useEffect(() => installTracking(), []);

  // The #/ variants of the pages are kept as in-app fallbacks.
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
  }, [path, route]);

  // Pick the page for the current route. Case studies first, so a #/work/<slug>
  // deep link wins over the /work archive.
  const caseSlug = path.startsWith("/work/") ? path.slice("/work/".length) : "";
  const KNOWN = ["", "/index", "/offer", "/ai", "/kitchen", "/work", "/labs", "/laws", "/live", "/system", "/worth", "/motion", "/craft", "/teardown", "/aavira"];
  const isKnownCase = caseSlug === "ramachandra-ortho" || caseSlug === "aavira" || !!CAMPAIGN_CASES[caseSlug];
  const isHashPage = route.startsWith("#/");
  let content: ReactNode;
  if (caseSlug === "aavira") {
    content = <AaviraCaseStudy />;
  } else if (caseSlug === "ramachandra-ortho") {
    content = <OrthoCaseStudy />;
  } else if (caseSlug && CAMPAIGN_CASES[caseSlug]) {
    content = <CampaignCaseStudy slug={caseSlug} />;
  } else if (!isHashPage && !KNOWN.includes(path) && !isKnownCase) {
    content = <SeoRoute path={path} />;
  } else if (path === "/aavira") {
    content = <AaviraSite />;
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
          <Defer Component={SelectedWork} id="work" dark bg="bg-ink" minHeight="200svh" delay={1500} />
          <Defer Component={ProblemPicker} id="fix" dark bg="bg-ink" minHeight="100svh" delay={2000} />
          <Defer Component={ExploreTease} dark bg="bg-ink" minHeight="80svh" delay={2500} />
          <Defer Component={GridLab} id="studio" bg="bg-paper-dim" minHeight="120svh" delay={3000} />
          <Defer Component={ProductsTease} id="products" bg="bg-paper-dim" minHeight="120svh" delay={3500} />
          <Defer Component={Manifesto} id="why" bg="bg-paper" minHeight="100svh" delay={4000} />
          <Defer Component={Invitation} id="say-hi" dark bg="bg-ink" minHeight="100svh" delay={4500} />
        </main>
        <Defer Component={PlayCanvas} bg="bg-paper" minHeight="60svh" delay={5000} />
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
