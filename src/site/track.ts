import { track } from "@vercel/analytics";

// Lightweight event tracking so the next audit has real data. One delegated click listener
// classifies the links that matter (contact actions, case studies, lead magnets, products)
// and sends a named event with the page and the part of the page it came from. No personal
// data is sent: only the page path, the section and the link target.
//
// Note: Vercel only records custom events on plans that include them (Pro and up). Page views
// are recorded regardless. Events are sent from the browser only.

type Props = Record<string, string | number | boolean | null>;
// Every event goes to Google Analytics (the gtag snippet in each page head) and to Vercel Analytics.
// Both are wrapped so a blocked or missing script can never break the page.
const safe = (name: string, props: Props) => {
  try { (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, props); } catch { /* analytics must never break the page */ }
  try { track(name, props); } catch { /* same */ }
};

const whereOf = (a: Element) => {
  if (a.closest("header, nav")) return "header";
  if (a.closest("footer")) return "footer";
  return a.closest("section[id]")?.id || "page";
};

const PRODUCT_HOSTS = ["percentyle.in", "supermind.ink", ".made-by-ac.com", "cricadda-tau.vercel.app"];

export function installTracking() {
  if (typeof document === "undefined") return () => {};
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const page = window.location.pathname || "/";
    const where = whereOf(a);
    const label = (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);

    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)/i.test(href)) return safe("cta_whatsapp", { page, where, label });
    if (href.startsWith("mailto:")) return safe("cta_email", { page, where });
    if (href.startsWith("tel:")) return safe("cta_call", { page, where });
    if (href === "#say-hi" || href === "/#say-hi") return safe("cta_start_project", { page, where, label });

    let url: URL | null = null;
    try { url = new URL(a.href, window.location.href); } catch { return; }
    const path = url.pathname.replace(/\/$/, "");
    if (url.origin === window.location.origin) {
      const m = path.match(/^\/work\/([a-z0-9-]+)$/);
      if (m) return safe("case_study_click", { slug: m[1], from: page, where });
      if (path === "/teardown" || path === "/worth") return safe("lead_magnet_click", { target: path, from: page, where });
      if (path === "/offer") return safe("offer_click", { from: page, where, label });
      if (path === "/listing-builder" || path === "/sample-listing") return safe("tool_click", { target: path, from: page, where });
      if (path === "/about") return safe("about_click", { from: page, where });
      if (path === "/services" || /-(for|in)-/.test(path)) return safe("service_click", { target: path, from: page, where });
      return;
    }
    if (PRODUCT_HOSTS.some((h) => url!.hostname === h || (h.startsWith(".") && url!.hostname.endsWith(h)))) {
      safe("product_click", { product: url.hostname, from: page, where });
    }
  };
  document.addEventListener("click", onClick, { capture: true });

  // "Nothing next" check: how many people actually reach the contact section, once per page view.
  // Polled rather than observed, because the section is lazy-mounted and its element gets replaced.
  let firedFor = "";
  const watchContact = () => {
    const path = window.location.pathname;
    if (path === firedFor) return;
    const el = document.getElementById("say-hi");
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.65 && r.bottom > window.innerHeight * 0.35) { firedFor = path; safe("contact_section_view", { page: path }); }
  };
  const poll = window.setInterval(watchContact, 1000);

  return () => {
    document.removeEventListener("click", onClick, { capture: true });
    window.clearInterval(poll);
  };
}

export const trackEvent = safe;
