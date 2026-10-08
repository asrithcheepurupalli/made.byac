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
