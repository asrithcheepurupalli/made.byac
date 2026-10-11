import type { Listing } from "./parse";

export interface Brand {
  name: string;
  agent: string;
  phone: string; // digits with country code
  accent: string;
  showCredit: boolean;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** One self contained HTML file: no external fonts, scripts or requests, photos embedded. */
export function renderListingHtml(l: Listing, b: Brand, photos: string[]): string {
  const msg = `Hi${b.agent ? " " + b.agent : ""}, I am interested in: ${l.title}${l.location && !l.title.includes(l.location.split(",")[0]) ? " (" + l.location + ")" : ""}.`;
  const wa = b.phone ? `https://wa.me/${b.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}` : "#";
  const facts: [string, string][] = ([
    ["Area", l.area], ["Floor", l.floor], ["Facing", l.facing], ["Parking", l.parking], ["Possession", l.possession], ["Furnishing", l.furnishing],
  ] as [string, string][]).filter(([, v]) => v);
  const gallery = photos.length
    ? `<div class="gal">${photos.map((p, i) => `<img src="${p}" alt="${esc(l.title)} photo ${i + 1}" ${i ? 'loading="lazy"' : ""}>`).join("")}</div>`
    : `<div class="ph">Add photos to show them here</div>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(l.title)}${b.name ? " · " + esc(b.name) : ""}</title>
<meta name="description" content="${esc([l.title, l.price, l.area, l.location].filter(Boolean).join(" · "))}">
<style>
:root{--a:${b.accent};--ink:#14110f;--bg:#f7f4ee}
*{box-sizing:border-box;margin:0}body{font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);background:var(--bg);padding-bottom:84px}
.top{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;font-weight:700;letter-spacing:-.01em}
.top small{font-weight:500;color:#6b655d}
.gal{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 18px}
.gal img{height:300px;width:84%;max-width:560px;object-fit:cover;border-radius:16px;scroll-snap-align:start;flex:0 0 auto;background:#e6e0d4}
.ph{margin:0 18px;height:220px;border-radius:16px;background:#e6e0d4;display:grid;place-items:center;color:#6b655d}
main{max-width:760px;margin:0 auto;padding:18px}
.tag{display:inline-block;background:var(--a);color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:99px;letter-spacing:.02em}
h1{font-size:30px;line-height:1.1;margin:12px 0 4px;letter-spacing:-.02em}
.loc{color:#6b655d}.price{font-size:28px;font-weight:800;margin:14px 0}
.facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin:16px 0}
.facts div{background:#fff;border:1px solid #e3ddd0;border-radius:12px;padding:10px 12px}
.facts b{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6b655d;font-weight:600}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.chips span{border:1px solid #d8d1c2;border-radius:99px;padding:5px 12px;font-size:14px;background:#fff}
p.d{margin:14px 0;color:#38332d}.rera{font-size:13px;color:#6b655d}
.bar{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #e3ddd0;padding:12px 18px;display:flex;gap:10px;align-items:center;justify-content:space-between}
.bar a.btn{background:#1fa855;color:#fff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:99px;flex:0 0 auto}
.bar span{font-size:13px;color:#6b655d}
footer{max-width:760px;margin:24px auto;padding:0 18px;font-size:12px;color:#8a8379}
footer a{color:inherit}
</style></head><body>
<div class="top"><span>${esc(b.name || "Your brand")}</span><small>${esc(b.agent)}</small></div>
${gallery}
<main>
<span class="tag">${l.purpose === "rent" ? "For rent" : "For sale"}</span>
<h1>${esc(l.title)}</h1>
${l.location ? `<p class="loc">${esc(l.location)}</p>` : ""}
${l.price ? `<p class="price">${esc(l.price)}</p>` : ""}
${facts.length ? `<div class="facts">${facts.map(([k, v]) => `<div><b>${k}</b>${esc(v)}</div>`).join("")}</div>` : ""}
${l.amenities.length ? `<div class="chips">${l.amenities.map((a) => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
${l.description ? `<p class="d">${esc(l.description)}</p>` : ""}
${l.rera ? `<p class="rera">RERA no. ${esc(l.rera)}</p>` : ""}
</main>
${b.showCredit ? `<footer>Page made with <a href="https://www.made-by-ac.com/listing-builder">made. by ac</a></footer>` : ""}
<div class="bar"><span>${esc(l.price || l.title)}</span><a class="btn" href="${wa}">Enquire on WhatsApp</a></div>
</body></html>`;
}
