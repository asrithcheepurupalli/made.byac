import { SITE, EMAIL, WHATSAPP, SERVICES, type Service, type CaseShell, HUB } from "./data";
import type { Content } from "./content-types";
import type { Index } from "./registry";

const ORG_ID = `${SITE}/#org`;

const areaServed = [
  { "@type": "City", name: "Visakhapatnam" },
  { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
  { "@type": "Country", name: "India" },
];

export const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "made. by ac",
  alternateName: "made by ac",
  url: SITE,
  logo: `${SITE}/favicon.png`,
  image: `${SITE}/og.png`,
  description: "A design and development studio in Visakhapatnam building websites, appointment booking systems for clinics, restaurant ordering, WhatsApp automation and brands.",
  email: EMAIL,
  telephone: `+${WHATSAPP}`,
  address: { "@type": "PostalAddress", addressLocality: "Visakhapatnam", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
  areaServed,
  sameAs: ["https://github.com/asrithcheepurupalli"],
};

export const websiteNode = { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "made. by ac", publisher: { "@id": ORG_ID }, inLanguage: "en-IN" };

const crumbs = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export const homeLd = () => graph(organization, websiteNode);

export const serviceLd = (s: Service) =>
  graph(
    organization,
    {
      "@type": "Service",
      "@id": `${SITE}${s.path}#service`,
      name: s.h1,
      serviceType: s.serviceType,
      description: s.description,
      url: `${SITE}${s.path}`,
      provider: { "@id": ORG_ID },
      areaServed,
    },
    { "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    crumbs([
      { name: "Home", url: SITE },
      { name: "Services", url: `${SITE}${HUB.path}` },
      { name: s.navLabel, url: `${SITE}${s.path}` },
    ]),
  );

export const hubLd = () =>
  graph(
    organization,
    {
      "@type": "CollectionPage",
      name: HUB.h1,
      url: `${SITE}${HUB.path}`,
      description: HUB.description,
      mainEntity: { "@type": "ItemList", itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}${s.path}`, name: s.navLabel })) },
    },
    crumbs([{ name: "Home", url: SITE }, { name: "Services", url: `${SITE}${HUB.path}` }]),
  );

export const caseLd = (c: CaseShell) =>
  graph(
    organization,
    {
      "@type": "CreativeWork",
      name: c.h1,
      url: `${SITE}${c.path}`,
      description: c.description,
      image: `${SITE}${c.img}`,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      datePublished: c.datePublished,
      inLanguage: "en-IN",
    },
    crumbs([{ name: "Home", url: SITE }, { name: "Work", url: `${SITE}/work` }, { name: c.h1.split(":")[0], url: `${SITE}${c.path}` }]),
  );

const faqNode = (c: Content) => ({ "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

export const contentLd = (c: Content) => {
  const crumb =
    c.kind === "guide"
      ? [{ name: "Home", url: SITE }, { name: "Guides", url: `${SITE}/guides` }, { name: c.navLabel, url: `${SITE}${c.path}` }]
      : [{ name: "Home", url: SITE }, { name: "Services", url: `${SITE}${HUB.path}` }, { name: c.navLabel, url: `${SITE}${c.path}` }];
  const main =
    c.kind === "guide"
      ? {
          "@type": "Article", "@id": `${SITE}${c.path}#article`, headline: c.h1, description: c.description, url: `${SITE}${c.path}`,
          datePublished: c.datePublished, dateModified: c.datePublished, inLanguage: "en-IN",
          author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID }, mainEntityOfPage: `${SITE}${c.path}`,
        }
      : {
          "@type": "Service", "@id": `${SITE}${c.path}#service`, name: c.h1, serviceType: c.navLabel, description: c.description,
          url: `${SITE}${c.path}`, provider: { "@id": ORG_ID }, areaServed,
        };
  return graph(organization, main, faqNode(c), crumbs(crumb));
};

export const indexLd = (i: Index) =>
  graph(
    organization,
    {
      "@type": "CollectionPage", name: i.h1, url: `${SITE}${i.path}`, description: i.description,
      mainEntity: { "@type": "ItemList", itemListElement: i.items.map((it, n) => ({ "@type": "ListItem", position: n + 1, url: `${SITE}${it.path}`, name: it.label })) },
    },
    crumbs([{ name: "Home", url: SITE }, { name: i.eyebrow, url: `${SITE}${i.path}` }]),
  );
