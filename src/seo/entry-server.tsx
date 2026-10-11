import { renderToString } from "react-dom/server";
import { SERVICES, HUB, CASES, SITE, EXISTING_PAGES } from "./data";
import { serviceLd, hubLd, caseLd, homeLd, contentLd, indexLd } from "./jsonld";
import { ServicePage } from "./ServicePage";
import { ServicesHub } from "./ServicesHub";
import { NotFoundPage } from "./NotFoundPage";
import { ContentPage } from "./ContentPage";
import { IndexPage } from "./IndexPage";
import { CONTENT, INDEXES } from "./registry";
import { LEGAL } from "./legal";
import { LegalPage } from "./LegalPage";
import { FAQ_TOPICS } from "../site/FaqSection";
import { Header, Footer, Page } from "./Shell";

// Build-time only. Renders the search-facing pages to static HTML so crawlers (and
// anyone on a slow phone) get real content without waiting for JavaScript.

export interface PageOut {
  file: string;        // path under dist, no leading slash, e.g. "services.html"
  url: string;         // canonical path
  title: string;
  description: string;
  ogImage: string;
  robots: string;
  ld: object | null;
  html: string;
}

function CaseShellBody({ i }: { i: number }) {
  const c = CASES[i];
  return (
    <Page>
      <Header />
      <main className="mx-auto max-w-[900px] px-6 md:px-10 pt-36 pb-24">
        <nav aria-label="Breadcrumb" className="label text-[10px] text-grey-dim flex gap-2">
          <a href="/">Home</a><span aria-hidden>/</span><a href="/work">Work</a>
        </nav>
        <h1 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02]">{c.h1}</h1>
        {c.summary.map((p) => <p key={p} className="mt-6 text-lg leading-relaxed text-paper/80">{p}</p>)}
        <img src={c.img} alt={c.h1} className="mt-10 w-full rounded-2xl" />
        <p className="mt-10"><a href={SERVICES[0].path} className="underline underline-offset-4">Appointment booking software for clinics</a> · <a href={HUB.path} className="underline underline-offset-4">All services</a></p>
      </main>
      <Footer />
    </Page>
  );
}

export function getPages(): PageOut[] {
  const out: PageOut[] = [];
  out.push({
    file: "services.html", url: HUB.path, title: HUB.title, description: HUB.description,
    ogImage: `${SITE}/og.png`, robots: "index, follow", ld: hubLd(), html: renderToString(<ServicesHub />),
  });
  for (const s of SERVICES) {
    out.push({
      file: `${s.slug}.html`, url: s.path, title: s.title, description: s.description,
      ogImage: `${SITE}/og.png`, robots: "index, follow", ld: serviceLd(s), html: renderToString(<ServicePage slug={s.slug} />),
    });
  }
  CASES.forEach((c, i) => {
    out.push({
      file: `work/${c.slug}.html`, url: c.path, title: c.title, description: c.description,
      ogImage: `${SITE}${c.slug === "aavira" ? "/og-aavira-study.jpg" : c.img.startsWith("/case/ortho") ? "/og.png" : c.img}`, robots: "index, follow", ld: caseLd(c), html: renderToString(<CaseShellBody i={i} />),
    });
  });
  for (const c of CONTENT) {
    out.push({
      file: `${c.path.slice(1)}.html`, url: c.path, title: c.title, description: c.description,
      ogImage: `${SITE}/og.png`, robots: "index, follow", ld: contentLd(c), html: renderToString(<ContentPage c={c} />),
    });
  }
  for (const i of INDEXES) {
    out.push({
      file: `${i.path.slice(1)}.html`, url: i.path, title: i.title, description: i.description,
      ogImage: `${SITE}/og.png`, robots: "index, follow", ld: indexLd(i), html: renderToString(<IndexPage i={i} />),
    });
  }
  for (const l of LEGAL) {
    out.push({
      file: `${l.slug}.html`, url: l.path, title: l.title, description: l.description,
      ogImage: `${SITE}/og.png`, robots: "index, follow", ld: null, html: renderToString(<LegalPage page={l} />),
    });
  }
  out.push({
    file: "404.html", url: "/404", title: "Page not found · made. by ac", description: "That page isn't here. Search the site or pick a page below.",
    ogImage: `${SITE}/og.png`, robots: "noindex, follow", ld: null, html: renderToString(<NotFoundPage />),
  });
  return out;
}

export const homeJsonLd = () => JSON.stringify(homeLd());

export function sitemapUrls() {
  return [
    { path: "/", priority: "1.0" },
    { path: HUB.path, priority: "0.9" },
    ...SERVICES.map((s) => ({ path: s.path, priority: "0.9" })),
    ...INDEXES.map((i) => ({ path: i.path, priority: "0.8" })),
    ...CONTENT.map((c) => ({ path: c.path, priority: c.kind === "guide" ? "0.7" : "0.8" })),
    ...CASES.map((c) => ({ path: c.path, priority: "0.7" })),
    ...LEGAL.map((l) => ({ path: l.path, priority: "0.2" })),
    ...EXISTING_PAGES,
  ];
}

export function homeFallback() {
  return renderToString(
    <div style={{ background: "#f6f3ee", color: "#0b0b0c", minHeight: "100vh", padding: "6rem 1.5rem", fontFamily: "Georgia, serif" }}>
      <h1 style={{ fontSize: "2.5rem", lineHeight: 1.05, maxWidth: "20ch" }}>made. by ac, a web development and design studio in Visakhapatnam</h1>
      <p style={{ marginTop: "1.5rem", maxWidth: "55ch", fontSize: "1.15rem", lineHeight: 1.6 }}>
        We design and build websites, appointment booking systems for clinics, restaurant QR ordering, WhatsApp automation and
        brands, for businesses in Vizag, across Andhra Pradesh and throughout India.
      </p>
    </div>,
  );
}

/* ───────────── content for crawlers that do not run JavaScript ─────────────
 * Most AI crawlers read the raw HTML only. The site is a JavaScript app, so we ship the same
 * facts as plain HTML in a <noscript> block, plus a single markdown file (llms-full.txt).
 * Everything here is generated from the same data the pages use, so it cannot drift. */
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PRODUCTS: [string, string, string][] = [
  ["made. table", "https://table.made-by-ac.com", "A restaurant ordering system that composes a bespoke demo from a venue's name and vibe."],
  ["Airlock", "https://airlock.made-by-ac.com", "A browser extension that strips personal data on the device before a prompt reaches an AI chatbot."],
  ["Stash", "https://stash.made-by-ac.com", "A private, searchable archive of your AI chats and the pages you read, kept on your own device."],
  ["Pingless", "https://pingless.made-by-ac.com", "An Android app that reads notifications on the phone and clears the noise, with no internet permission."],
  ["NADIR", "https://nadir.made-by-ac.com", "Point a phone out of a plane window and it names the ground below, offline."],
  ["Percentyle", "https://percentyle.in", "A CAT exam preparation app with real past year questions and mock tests."],
  ["supermind.", "https://supermind.ink", "A second brain that stays on your device, with optional encryption and no server."],
];

const DEFINITION = "made. by ac is a design and software studio based in Visakhapatnam (Vizag), India, founded and led by Asrith Cheepurupalli. It builds appointment booking systems for clinics, restaurant QR ordering, WhatsApp and AI automation, websites, and brand identity, for clients in India and overseas.";

function homeBlock(): string {
  const services = SERVICES.map((s) => `<li><a href="${SITE}${s.path}">${esc(s.h1)}</a>: ${esc(s.description)}</li>`).join("");
  const cases = CASES.map((c) => `<li><a href="${SITE}${c.path}">${esc(c.h1)}</a>: ${esc(c.summary[0])}</li>`).join("");
  const products = PRODUCTS.map(([n, u, d]) => `<li><a href="${u}">${esc(n)}</a>: ${esc(d)}</li>`).join("");
  const faqs = (FAQ_TOPICS.flatMap((t) => t.qs as readonly (readonly [string, string])[]) as (readonly [string, string])[]).map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("");
  return `<main><h1>made. by ac: a design and software studio in Visakhapatnam</h1>
<p>${esc(DEFINITION)}</p>
<h2>What we build</h2><ul>${services}</ul>
<h2>Work we can point to</h2><ul>${cases}</ul>
<p>Aavira is our own flagship study of a restaurant platform. It is a study, not a client project.</p>
<h2>Products we make ourselves</h2><ul>${products}</ul>
<h2>Questions we are asked</h2>${faqs}
<h2>Contact</h2><p>Email thebrain@made-by-ac.com or WhatsApp +91 93908 52636. We are based in Visakhapatnam, Andhra Pradesh, India, and work with clients worldwide.</p>
<p><a href="${SITE}/services">All services</a> · <a href="${SITE}/work">Work</a> · <a href="${SITE}/about">About the founder</a> · <a href="${SITE}/offer">What we offer</a></p></main>`;
}

const ROOT_BLOCKS: Record<string, () => string> = {
  "index.html": homeBlock,
  "about.html": () => `<main><h1>The founder story: made. by ac</h1><p>${esc(DEFINITION)}</p>
<h2>It started with design</h2><p>We began by making brand identities, packaging and campaigns for local businesses, including a commercial electric vehicle marketplace and a sweets brand.</p>
<h2>Then a clinic needed more than a nice page</h2><p>An orthopaedic clinic in Visakhapatnam needed online booking, payment to confirm a slot and a live queue for the front desk. We built the booking system, a WhatsApp assistant and the admin desk. A slot is never marked booked until the payment clears.</p>
<h2>Then we started building our own products</h2><ul>${PRODUCTS.map(([n, u, d]) => `<li><a href="${u}">${esc(n)}</a>: ${esc(d)}</li>`).join("")}</ul>
<h2>How we keep ourselves honest</h2><p>Work on our site carries one of four labels: client build, our own product, concept study or pitch demo. We do not publish numbers we have not measured.</p></main>`,
  "offer.html": () => `<main><h1>What we offer</h1><p>${esc(DEFINITION)}</p><ul>${SERVICES.map((s) => `<li><a href="${SITE}${s.path}">${esc(s.h1)}</a>: ${esc(s.description)}</li>`).join("")}</ul><p>We also build AI sales agents that answer calls and messages, book appointments and log requests: <a href="${SITE}/ai">AI automation</a>.</p></main>`,
  "work.html": () => `<main><h1>Our work</h1><p>${esc(DEFINITION)}</p><ul>${CASES.map((c) => `<li><a href="${SITE}${c.path}">${esc(c.h1)}</a>: ${esc(c.summary.join(" "))}</li>`).join("")}</ul></main>`,
  "ai.html": () => `<main><h1>AI automation: agents that work the room</h1><p>We build AI agents for businesses: conversion and retention agents for stores, voice agents that answer calls and book appointments, WhatsApp commerce and concierge assistants, and feedback loops. They run in your brand's voice and hand over to a person when it matters. Based in Visakhapatnam, working with clients across India.</p><p><a href="${SITE}/whatsapp-business-automation">WhatsApp business automation</a> · <a href="${SITE}/services">All services</a></p></main>`,
};

export function rootNoscript(file: string): string | null {
  const f = ROOT_BLOCKS[file];
  return f ? f() : null;
}

export function llmsFull(): string {
  const bullets = (a: { t: string; d: string }[]) => a.map((x) => `- **${x.t}**: ${x.d}`).join("\n");
  const out: string[] = [];
  out.push("# made. by ac", "", `> ${DEFINITION}`, "");
  out.push("## Facts", "- Location: Visakhapatnam (Vizag), Andhra Pradesh, India", "- Languages: English, Telugu, Hindi", "- Contact: thebrain@made-by-ac.com, WhatsApp +91 93908 52636", `- Website: ${SITE}`, "- We are a studio. We do not run portal listings or sell guaranteed rankings or guaranteed mentions.", "");
  out.push("## Services", "");
  for (const s of SERVICES) {
    out.push(`### ${s.h1}`, `URL: ${SITE}${s.path}`, "", s.lede, "", "What you get:", bullets(s.outcomes), "", "Frequently asked:", ...s.faqs.map((f) => `- **${f.q}** ${f.a}`), "");
  }
  out.push("## Pages by topic", "");
  for (const c of CONTENT) out.push(`- [${c.h1}](${SITE}${c.path}): ${c.description}`);
  out.push("", "## Case studies", "");
  for (const c of CASES) out.push(`- [${c.h1}](${SITE}${c.path}): ${c.summary.join(" ")}`);
  out.push("", "## Products we make", "");
  for (const [n, u, d] of PRODUCTS) out.push(`- [${n}](${u}): ${d}`);
  out.push("", "## Questions", "");
  for (const t of FAQ_TOPICS) for (const [q, a] of t.qs) out.push(`- **${q}** ${a}`);
  out.push("");
  return out.join("\n");
}
