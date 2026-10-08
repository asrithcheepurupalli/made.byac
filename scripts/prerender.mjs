// After `vite build` + `vite build --ssr`: turn dist/index.html into one static HTML
// file per search-facing page (service pages, case studies, 404), refresh the home
// fallback, and write a sitemap from the same data the pages use.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const mod = await import(pathToFileURL(path.join(root, ".ssr", "entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const SITE = "https://www.made-by-ac.com";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const ROOT_RE = /<!--seo-fallback-->[\s\S]*?<!--\/seo-fallback-->/;
if (!ROOT_RE.test(template)) throw new Error("index.html is missing the seo-fallback markers");

// 1) homepage: fill the no-JS fallback
fs.writeFileSync(
  path.join(dist, "index.html"),
  template
    .replace(ROOT_RE, `<!--seo-fallback-->${mod.homeFallback()}<!--/seo-fallback-->`)
    .replace("</head>", `    <script type="application/ld+json">${mod.homeJsonLd()}</script>\n  </head>`),
);

// strip the home page's head tags from the template, then add each page's own
const strip = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/^\s*<meta (name="(title|description|keywords|robots)"|property="(og|twitter):[^"]*")[^>]*>\s*$/gm, "")
    .replace(/^\s*<link rel="canonical"[^>]*>\s*$/gm, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

const base = strip(template);
let count = 0;
for (const p of mod.getPages()) {
  const url = SITE + (p.url === "/404" ? "/" : p.url);
  const head = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="${p.robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="made. by ac" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:image" content="${p.ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${p.ogImage}" />`,
    p.ld ? `<script type="application/ld+json">${JSON.stringify(p.ld)}</script>` : "",
  ].filter(Boolean).join("\n    ");
  const html = base.replace("</head>", `    ${head}\n  </head>`).replace(ROOT_RE, `<!--seo-fallback-->${p.html}<!--/seo-fallback-->`);
  const file = path.join(dist, p.file);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  count++;
}

// sitemap, from the same data
const urls = mod.sitemapUrls().map((u) => `  <url><loc>${SITE}${u.path}</loc><priority>${u.priority}</priority></url>`).join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`prerendered ${count} pages + sitemap (${mod.sitemapUrls().length} urls)`);

// 3) kill the chunk waterfall: main.js boots, THEN fetches the page chunk. Tell the browser
// about the page chunk (and its shared imports) up front so both download in parallel.
const assets = fs.readdirSync(path.join(dist, "assets"));
const chunk = (name) => assets.find((f) => f.startsWith(name + "-") && f.endsWith(".js"));
const chunkFor = (file) => {
  const f = file.replace(/\\/g, "/");
  const direct = { "offer.html": "OfferPage", "ai.html": "AiPage", "kitchen.html": "KitchenPage", "work.html": "WorkPage", "labs.html": "LabsPage", "laws.html": "LawsPage", "live.html": "LivePage", "system.html": "SystemPage", "worth.html": "WorthPage", "motion.html": "MotionPage", "craft.html": "CraftPage", "teardown.html": "TeardownPage", "aavira.html": "AaviraSite", "monthly-content-marketing-retainer.html": "ContentRetainerPage", "work/ramachandra-ortho.html": "OrthoCaseStudy", "work/aavira.html": "AaviraCaseStudy", "work/innovolt.html": "CampaignCaseStudy", "work/mithai-maharaja.html": "CampaignCaseStudy" };
  if (direct[f]) return direct[f];
  if (f === "index.html" || f === "404.html") return null;
  return "SeoRoute";
};
const withDeps = (name) => {
  const out = new Set([name]);
  const src = fs.readFileSync(path.join(dist, "assets", name), "utf8");
  for (const m of src.matchAll(/(?:from|import)\s*["']\.\/([^"']+\.js)["']/g)) out.add(m[1]);
  return [...out];
};
const htmlFiles = [];
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const fp = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== "assets" && e.name !== "fonts" && e.name !== "images") walk(fp); } else if (e.name.endsWith(".html")) htmlFiles.push(fp); } };
walk(dist);
let deferred = 0;
for (const fp of htmlFiles) {
  const rel = path.relative(dist, fp);
  const base = chunkFor(rel);
  const c = base && chunk(base);
  let html = fs.readFileSync(fp, "utf8");
  const tag = html.match(/<script type="module"[^>]*src="(\/assets\/main-[^"]+\.js)"[^>]*><\/script>/);
  if (!tag || html.includes("__boot")) continue;
  const mainSrc = tag[1];
  const pre = c ? withDeps(c).filter((n) => `/assets/${n}` !== mainSrc).map((n) => `/assets/${n}`) : [];
  // The entry bundle (~140 KB gz) competes with CSS and fonts for the first paint on slow
  // connections. The prerendered HTML already shows the page, so paint first, then boot.
  const loader = `<script>(function __boot(){var d=0;function go(){if(d)return;d=1;${JSON.stringify(pre)}.forEach(function(h){var l=document.createElement("link");l.rel="modulepreload";l.href=h;document.head.appendChild(l)});var s=document.createElement("script");s.type="module";s.src=${JSON.stringify(mainSrc)};document.head.appendChild(s)}function after(){requestAnimationFrame(function(){setTimeout(go,0)})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",after);else after();setTimeout(go,2500)})()</script>`;
  html = html.replace(tag[0], loader);
  fs.writeFileSync(fp, html);
  deferred++;
}
console.log(`entry script deferred past first paint on ${deferred} pages`);
