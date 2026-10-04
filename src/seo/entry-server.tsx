import { renderToString } from "react-dom/server";
import { SERVICES, HUB, CASES, SITE, EXISTING_PAGES } from "./data";
import { serviceLd, hubLd, caseLd, homeLd, contentLd, indexLd } from "./jsonld";
import { ServicePage } from "./ServicePage";
import { ServicesHub } from "./ServicesHub";
import { NotFoundPage } from "./NotFoundPage";
import { ContentPage } from "./ContentPage";
import { IndexPage } from "./IndexPage";
import { CONTENT, INDEXES } from "./registry";
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
      ogImage: `${SITE}${c.img.startsWith("/case/ortho") ? "/og.png" : c.img}`, robots: "index, follow", ld: caseLd(c), html: renderToString(<CaseShellBody i={i} />),
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
