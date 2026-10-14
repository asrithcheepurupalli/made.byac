import { useSyncExternalStore } from "react";

// "Show the site the way this person needs to see it." The segment comes from, in order:
// the link they arrived on (?for=tech, written into our outreach emails), then the choice
// they made earlier on this device. It only reorders and re-words proof; every claim stays
// true for every segment, and search engines always get the default page.

export type Seg = "tech" | "services" | "clinic" | "restaurant" | "property";
export const SEGS: Seg[] = ["tech", "services", "clinic", "restaurant", "property"];

type Tile = { tag: string; title: string; line: string; href: string };
type Profile = {
  chip: string;          // the button label
  headline: string;      // what we say to them
  sub: string;
  cta: string;           // the one ask
  wa: string;            // WhatsApp prefill
  heroNote: string;      // replaces the "Live now" line in the hero
  heroLink: { label: string; href: string };
  tiles: Tile[];
};

export const PROFILES: Record<Seg, Profile> = {
  tech: {
    chip: "A tech or software team",
    headline: "We ship our own software, end to end.",
    sub: "Design, front end, extension, on-device AI. These are products we designed and released ourselves, so you can judge the work, not the pitch.",
    cta: "Talk to us about your product",
    wa: "Hi, we are a tech team and found you through made-by-ac.com. We would like to talk about a product.",
    heroNote: "For product teams: we design and ship our own software, like Airlock, which redacts sensitive data on your device before it reaches an AI chat.",
    heroLink: { label: "See Airlock", href: "https://airlock.made-by-ac.com" },
    tiles: [
      { tag: "Our product", title: "Airlock", line: "Redacts sensitive data on your device, before it reaches an AI chat.", href: "https://airlock.made-by-ac.com" },
      { tag: "Our product", title: "Stash", line: "A local-first memory for your AI chats and reading.", href: "https://stash.made-by-ac.com" },
      { tag: "Concept study", title: "VANE", line: "A product concept with its own art direction and a full case study.", href: "https://vane.made-by-ac.com" },
    ],
  },
  services: {
    chip: "A service firm or agency",
    headline: "Your site has to prove you before you pick up the phone.",
    sub: "Buyers in professional services look for evidence first. We rebuild the homepage around the proof they look for, and we can show you what we mean before you commit.",
    cta: "Ask for a free screen redesign",
    wa: "Hi, we run a service firm and found you through made-by-ac.com. We would like a free redesign of one screen.",
    heroNote: "For service firms: see how we mark up a weak homepage, then rebuild it around proof.",
    heroLink: { label: "Open the teardown", href: "/teardown" },
    tiles: [
      { tag: "Interactive", title: "The teardown", line: "A weak landing page, marked up pin by pin, then flipped into the fixed version.", href: "/teardown" },
      { tag: "Client work", title: "Ramachandra Ortho Care", line: "A real client system: booking, payment and reminders, in three languages.", href: "/work/ramachandra-ortho" },
      { tag: "What we build", title: "The offer", line: "Web, software, AI and brand, and how a project with us runs.", href: "/offer" },
    ],
  },
  clinic: {
    chip: "A clinic or health practice",
    headline: "A clinic where the visit starts before the call.",
    sub: "Patients book, pay a deposit and get reminders on WhatsApp, and the front desk sees one live queue. This one is running for a real clinic.",
    cta: "Book a clinic walkthrough",
    wa: "Hi, we run a clinic and found you through made-by-ac.com. We would like to see how the booking system works.",
    heroNote: "For clinics: a patient books, pays and queues on a system we built, in three languages.",
    heroLink: { label: "See Ramachandra Ortho Care", href: "/work/ramachandra-ortho" },
    tiles: [
      { tag: "Client work", title: "Ramachandra Ortho Care", line: "The full case study: booking, deposit, WhatsApp reminders and the front desk view.", href: "/work/ramachandra-ortho" },
      { tag: "Live", title: "The clinic site", line: "Open the real booking flow a patient uses.", href: "https://rcorthocare.made-by-ac.com" },
      { tag: "AI", title: "WhatsApp and AI", line: "Agents that answer, follow up and close on WhatsApp.", href: "/ai" },
    ],
  },
  restaurant: {
    chip: "A restaurant or hotel",
    headline: "Order from the table. The waiter stays the hero.",
    sub: "Guests scan, order together and an AI host suggests the next round, wired into the kitchen you already run. These are studies we designed and built ourselves.",
    cta: "See it for your venue",
    wa: "Hi, we run a restaurant and found you through made-by-ac.com. We would like to see the ordering platform.",
    heroNote: "For restaurants and hotels: guests scan, order together and watch the kitchen react, in a study we built ourselves.",
    heroLink: { label: "See the Aavira study", href: "/work/aavira" },
    tiles: [
      { tag: "Flagship study", title: "Aavira", line: "A guest platform with kitchen, waiter and owner views.", href: "/work/aavira" },
      { tag: "Prototype", title: "Grand Bay Dining", line: "A four-venue hotel: guests scan, order and an AI host knows their diet.", href: "https://grandbay.made-by-ac.com" },
      { tag: "Our product", title: "made. table", line: "Type a restaurant's name and an ordering site builds itself.", href: "https://table.made-by-ac.com" },
    ],
  },
  property: {
    chip: "A property business",
    headline: "Turn a messy WhatsApp listing into a page you can send.",
    sub: "Paste the listing, add photos, and get one clean branded page as a file. It runs in your browser and nothing is uploaded.",
    cta: "Talk to us about listing pages",
    wa: "Hi, we are in real estate and found you through made-by-ac.com. We would like branded listing pages.",
    heroNote: "For property agents and builders: paste a WhatsApp listing and get a clean, branded page, free, in your browser.",
    heroLink: { label: "Try the listing builder", href: "/listing-builder" },
    tiles: [
      { tag: "Free tool", title: "Listing builder", line: "Paste a listing, add photos, download one branded page.", href: "/listing-builder" },
      { tag: "Example", title: "A sample listing", line: "What the page looks like, with made-up details.", href: "/sample-listing" },
      { tag: "Service", title: "Listing pages for agents", line: "A branded page for every property, ready to send on WhatsApp.", href: "/property-listing-pages-for-real-estate-agents" },
    ],
  },
};

const KEY = "made.seg";
const isSeg = (v: unknown): v is Seg => typeof v === "string" && (SEGS as string[]).includes(v);

let current: Seg | "" = "";
let started = false;
const subs = new Set<() => void>();

function announce(seg: Seg, via: "link" | "chooser" | "remembered") {
  try {
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    g?.("set", "user_properties", { audience: seg });
    if (via !== "remembered") g?.("event", "audience_select", { segment: seg, via, page: window.location.pathname });
  } catch { /* analytics must never break the page */ }
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  let fromLink: unknown = null;
  try { fromLink = new URLSearchParams(window.location.search).get("for"); } catch { /* ignore */ }
  let stored: unknown = null;
  try { stored = window.localStorage.getItem(KEY); } catch { /* storage blocked: fine */ }
  if (isSeg(fromLink)) {
    current = fromLink;
    try { window.localStorage.setItem(KEY, fromLink); } catch { /* ignore */ }
    announce(fromLink, "link");
  } else if (isSeg(stored)) {
    current = stored;
    announce(stored, "remembered");
  }
}

export function setSeg(seg: Seg | "") {
  current = seg;
  try { seg ? window.localStorage.setItem(KEY, seg) : window.localStorage.removeItem(KEY); } catch { /* ignore */ }
  if (seg) announce(seg, "chooser");
  subs.forEach((f) => f());
}

const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
const snapshot = () => { start(); return current; };

// "" on the server and during hydration, so the prerendered page is always the default one.
export function useAudience(): Seg | "" {
  return useSyncExternalStore(subscribe, snapshot, () => "");
}
