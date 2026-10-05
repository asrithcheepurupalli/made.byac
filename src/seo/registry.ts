import { SERVICES, SITE, type Service } from "./data";
import { LANDINGS } from "./content-landings";
import { GUIDES } from "./content-guides";
import type { Cluster, Content } from "./content-types";

// One lookup for every search-facing page, so routing, sitemap, internal links and the
// prerender all agree.

export const CONTENT: Content[] = [...LANDINGS, ...GUIDES];
export const CONTENT_BY_PATH: Record<string, Content> = Object.fromEntries(CONTENT.map((c) => [c.path, c]));

export const SERVICE_CLUSTER: Record<string, Cluster> = {
  "appointment-booking-software-for-clinics": "clinic",
  "web-development-company-visakhapatnam": "web",
  "restaurant-qr-ordering-system": "restaurant",
  "whatsapp-business-automation": "web",
  "branding-and-packaging-design-visakhapatnam": "web",
  "monthly-content-marketing-retainer": "content",
};

export interface Index {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  items: { path: string; label: string; hint: string }[];
}

const clinicItems = [
  ...SERVICES.filter((s) => SERVICE_CLUSTER[s.slug] === "clinic").map((s: Service) => ({ path: s.path, label: s.h1, hint: s.description })),
  ...LANDINGS.filter((l) => l.cluster === "clinic").map((l) => ({ path: l.path, label: l.h1, hint: l.description })),
];

export const INDEXES: Index[] = [
  {
    path: "/clinic-software",
    title: "Clinic appointment booking software: cities and specialities",
    description: "Appointment booking for clinics and hospitals in Vizag, Andhra Pradesh, Hyderabad and across India, by speciality: orthopaedic, dental, skin, physio and labs.",
    eyebrow: "Clinics and hospitals",
    h1: "Appointment booking for every kind of clinic, in every city we serve",
    lede: "Online and WhatsApp booking, pay to confirm and a live front desk queue, set up for your speciality and your city. Start with the one that sounds like you.",
    items: clinicItems,
  },
  {
    path: "/guides",
    title: "Guides: clinic software, WhatsApp, websites and QR ordering",
    description: "Plain guides from a Vizag studio: how to choose a web developer, a clinic booking software checklist, reducing no-shows, WhatsApp reminders and QR ordering.",
    eyebrow: "Guides",
    h1: "Straight answers before you hire anyone",
    lede: "Short, honest guides written by the people who build and run these systems. No invented statistics, just what we have seen work.",
    items: GUIDES.map((g) => ({ path: g.path, label: g.h1, hint: g.description })),
  },
];
export const INDEX_BY_PATH: Record<string, Index> = Object.fromEntries(INDEXES.map((i) => [i.path, i]));

/** Pages to show as "keep reading" for a content page. */
export function relatedFor(paths: string[]) {
  const all: Record<string, { label: string; hint: string }> = {};
  for (const s of SERVICES) all[s.path] = { label: s.h1, hint: s.description };
  for (const c of CONTENT) all[c.path] = { label: c.h1, hint: c.description };
  return paths.filter((p) => all[p]).map((p) => ({ path: p, label: all[p].label, hint: all[p].hint }));
}

export const ALL_PATHS = [
  ...SERVICES.map((s) => s.path),
  ...CONTENT.map((c) => c.path),
  ...INDEXES.map((i) => i.path),
];

export { SITE };
