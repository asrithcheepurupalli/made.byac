import { flushSync } from "react-dom";

// In-app navigation. Internal links no longer reload the document: a click swaps the page
// inside the running app, wrapped in a browser View Transition (cross-fade + a shared
// element morph from a project card into its case study). Browsers without View
// Transitions get a short fade instead. Everything degrades to a normal page load.

type Listener = () => void;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

export const subscribe = (l: Listener) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Snapshot string for useSyncExternalStore: path + hash. */
export const snapshot = () => `${window.location.pathname}${window.location.hash}`;

export const normPath = (p: string) => p.replace(/\/$/, "").replace(/\.html$/, "");

// Paths served by a Vercel redirect to another site: always let the browser handle them.
const EXTERNAL_PATHS = ["/table", "/kitchen", "/crew", "/staff", "/pingless"];

// Route chunk loaders, registered by Site so a hover can warm the next page.
const loaders = new Map<string, () => Promise<unknown>>();
let fallbackLoader: (() => Promise<unknown>) | null = null;
export const registerRoute = (path: string, load: () => Promise<unknown>) => { loaders.set(path, load); };
export const registerFallback = (load: () => Promise<unknown>) => { fallbackLoader = load; };
export const preload = (path: string) => {
  const p = normPath(path);
  const l = loaders.get(p) ?? (p.startsWith("/work/") ? loaders.get("/work/*") : null) ?? fallbackLoader;
  return l ? l().catch(() => undefined) : Promise.resolve();
};

// ── scroll memory so Back returns to where you were ────────────────────────────────
const KEY = "made-scroll";
const readMap = (): Record<string, number> => {
  try { return JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch { return {}; }
};
const writeY = (k: string, y: number) => {
  try { const m = readMap(); m[k] = y; sessionStorage.setItem(KEY, JSON.stringify(m)); } catch { /* ignore */ }
};
const stateKey = () => ((window.history.state && window.history.state.k) as string | undefined) ?? "0";

// ── head sync: keep the tab title and description right after an in-app navigation ──
const pageHead = new Map<string, Promise<{ title: string; description: string } | null>>();
function fetchHead(path: string) {
  if (!pageHead.has(path)) {
    pageHead.set(
      path,
      fetch(path, { headers: { Accept: "text/html" } })
        .then((r) => (r.ok ? r.text() : ""))
        .then((html) => {
          const t = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
          const d = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
          return t ? { title: decode(t), description: d ? decode(d) : "" } : null;
        })
        .catch(() => null)
    );
  }
  return pageHead.get(path)!;
}
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
async function syncHead(path: string) {
  const h = await fetchHead(path);
  if (!h) return;
  document.title = h.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", h.description);
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resetScroll(y = 0) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: { immediate?: boolean }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(y, { immediate: true });
  window.scrollTo(0, y);
}

type VT = { finished: Promise<void> };
const startVT = (cb: () => void): VT | null => {
  const d = document as unknown as { startViewTransition?: (cb: () => void) => VT };
  return d.startViewTransition ? d.startViewTransition(cb) : null;
};

/** Run a swap with the best transition the browser offers. */
async function transition(swap: () => void, hero?: HTMLElement | null) {
  if (reduced()) { swap(); return; }

  // A shared element can only be named once per snapshot: clear any hero on the page we are
  // leaving, then name the card image that was clicked.
  const cleared: HTMLElement[] = [];
  if (hero) {
    document.querySelectorAll<HTMLElement>("[data-vt-hero]").forEach((el) => { el.style.viewTransitionName = "none"; cleared.push(el); });
    hero.style.viewTransitionName = "proj";
  }
  const vt = startVT(() => { flushSync(swap); });
  if (vt) {
    try { await vt.finished; } catch { /* aborted transitions are fine */ }
  } else {
    swap(); // no View Transitions: swap instantly, the route-rise animation gives the entrance
  }
  if (hero) hero.style.viewTransitionName = "";
  cleared.forEach((el) => { el.style.viewTransitionName = ""; });
}

export async function navigate(url: URL, from?: Element | null) {
  const path = normPath(url.pathname);
  writeY(stateKey(), window.scrollY);
  const hero = (from?.querySelector("img") as HTMLElement | null) ?? null;
  await preload(path); // so the new page renders synchronously inside the transition
  const k = String(Date.now());
  const swap = () => {
    window.history.pushState({ k }, "", url.pathname + url.search + url.hash);
    emit();
    if (!url.hash || url.hash.startsWith("#/")) resetScroll(0);
  };
  await transition(swap, hero);
  current = path;
  void syncHead(path || "/");
  // (Vercel Analytics tracks pushState page views on its own)
}

let installed = false;
let current = "";
export function installNavigation() {
  if (installed || typeof window === "undefined") return () => {};
  installed = true;
  if (typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition === "function" && !reduced()) {
    document.documentElement.classList.add("has-vt");
  }
  window.history.scrollRestoration = "manual";
  if (!window.history.state || !window.history.state.k) window.history.replaceState({ k: "0" }, "");

  const internal = (a: HTMLAnchorElement) => {
    if (a.target && a.target !== "_self") return null;
    if (a.hasAttribute("download")) return null;
    const href = a.getAttribute("href");
    if (!href || /^(mailto:|tel:|sms:|javascript:)/i.test(href)) return null;
    let url: URL;
    try { url = new URL(a.href, window.location.href); } catch { return null; }
    if (url.origin !== window.location.origin) return null;
    const p = normPath(url.pathname);
    if (EXTERNAL_PATHS.includes(p)) return null;
    if (/\.[a-z0-9]{2,5}$/i.test(p) && !/\.html$/i.test(url.pathname)) return null; // files: pdf, png, xml, txt
    return url;
  };

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
    if (!a) return;
    const url = internal(a);
    if (!url) return;
    // same page: let anchors and smooth scrolling work natively
    if (normPath(url.pathname) === normPath(window.location.pathname) && url.search === window.location.search) return;
    e.preventDefault();
    void navigate(url, a);
  };

  // warm the next page on hover / touch so the click feels instant
  const warm = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
    if (!a) return;
    const url = internal(a);
    if (!url) return;
    const p = normPath(url.pathname);
    if (p === normPath(window.location.pathname)) return;
    void preload(p);
    void fetchHead(p || "/");
  };

  current = normPath(window.location.pathname);
  const onPop = () => {
    const next = normPath(window.location.pathname);
    if (next === current) { emit(); return; } // hash-only history step: no page change
    current = next;
    const y = readMap()[stateKey()] ?? 0;
    const swap = () => { emit(); resetScroll(window.location.hash ? 0 : y); };
    void preload(normPath(window.location.pathname)).then(() => transition(swap, null)).then(() => void syncHead(normPath(window.location.pathname) || "/"));
  };
  const onHash = () => emit();

  document.addEventListener("click", onClick);
  document.addEventListener("mouseover", warm, { passive: true });
  document.addEventListener("touchstart", warm, { passive: true });
  window.addEventListener("popstate", onPop);
  window.addEventListener("hashchange", onHash);
  return () => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("mouseover", warm);
    document.removeEventListener("touchstart", warm);
    window.removeEventListener("popstate", onPop);
    window.removeEventListener("hashchange", onHash);
    installed = false;
  };
}
