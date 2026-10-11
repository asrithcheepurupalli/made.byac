// Tells IndexNow search engines (Bing, Yandex, Seznam and others) that our pages exist or changed.
// Run after a deploy: node scripts/indexnow.mjs
// Bing's index also feeds several AI assistants, so this speeds up how fast new pages can be cited.
const KEY = "0dbcceff33fcbecb00c049e3f89dabed";
const HOST = "www.made-by-ac.com";
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`submitted ${urls.length} urls, status ${res.status}`);
