// Aavira dish illustrations. Every dish is hand-built SVG, top-down on a 200x200 canvas, in one
// consistent flat style: soft shadow, warm earthy plates, three tones per food, small highlights.
// Deterministic: the same dish always draws the same way (seeded scatter), so there is nothing
// to load and nothing that belongs to anyone else's photography.

const C = {
  cream: "#efe3cf", creamDk: "#d9c8aa", slate: "#2d2623", slateLt: "#40362f", clay: "#b9532b", clayDk: "#8f3d1e",
  curry: "#c0431f", curryLt: "#e0642b", curryDk: "#8c2c12", turmeric: "#e9a23b", saffron: "#f0b84e",
  rice: "#f4e8c8", riceDk: "#e3d0a0", leaf: "#4f7a3a", leafLt: "#7aa14a", chilli: "#b3221a", chilliLt: "#d8402a",
  lime: "#b4c94c", limeDk: "#86a02e", brown: "#6a3b1e", brownLt: "#955428", paneer: "#f1e0b3", char: "#5a2f17",
  mint: "#5d8a3b", white: "#fbf6ec", gold: "#d8963a",
};

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
    return (s % 100000) / 100000;
  };
}
const f = (n: number) => Math.round(n * 10) / 10;

const shadow = `<ellipse cx="100" cy="110" rx="86" ry="82" fill="#000" opacity=".18"/>`;
const plate = (r = 84, fill = C.cream, rim = C.creamDk) =>
  `<circle cx="100" cy="100" r="${r}" fill="${rim}"/><circle cx="100" cy="100" r="${r - 5}" fill="${fill}"/>`;
const bowl = (r = 80, fill = C.clay, inner = C.clayDk) =>
  `<circle cx="100" cy="100" r="${r}" fill="${fill}"/><circle cx="100" cy="100" r="${r - 8}" fill="${inner}"/>`;

const leaf = (x: number, y: number, a: number, s = 1, col = C.leaf) =>
  `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${s})"><path d="M0 0 C6 -5 14 -4 18 0 C14 4 6 5 0 0Z" fill="${col}"/><path d="M1 0 L15 0" stroke="${C.cream}" stroke-opacity=".35" stroke-width=".9"/></g>`;
const chilli = (x: number, y: number, a: number, s = 1) =>
  `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${s})"><path d="M0 0 C10 -6 22 -3 30 5 C22 2 10 3 0 0Z" fill="${C.chilli}"/><circle cx="1" cy="0" r="1.8" fill="${C.leaf}"/></g>`;
const lime = (x: number, y: number, r = 11) =>
  `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${C.lime}"/><circle r="${r - 2.5}" fill="${C.white}" opacity=".85"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M0 0 L${f(Math.cos((i * Math.PI) / 3) * (r - 3.5))} ${f(Math.sin((i * Math.PI) / 3) * (r - 3.5))}" stroke="${C.lime}" stroke-width="1.6"/>`).join("")}</g>`;
const gloss = (x: number, y: number, rx = 4, a = -30) =>
  `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${rx}" ry="${f(rx / 2.4)}" fill="#fff" opacity=".28" transform="rotate(${a} ${f(x)} ${f(y)})"/>`;

function blobs(seed: number, n: number, cx: number, cy: number, spread: number, rmin: number, rmax: number, cols: string[], withGloss = true) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const ang = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * spread;
    const x = cx + Math.cos(ang) * d, y = cy + Math.sin(ang) * d;
    const rad = rmin + r() * (rmax - rmin);
    const col = cols[Math.floor(r() * cols.length)];
    out += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rad * (1 + r() * 0.35))}" ry="${f(rad)}" fill="${col}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
    if (withGloss && rad > 6) out += gloss(x - rad * 0.2, y - rad * 0.3, rad * 0.45);
  }
  return out;
}
function dots(seed: number, n: number, cx: number, cy: number, spread: number, rmin: number, rmax: number, cols: string[]) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const ang = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * spread;
    out += `<circle cx="${f(cx + Math.cos(ang) * d)}" cy="${f(cy + Math.sin(ang) * d)}" r="${f(rmin + r() * (rmax - rmin))}" fill="${cols[Math.floor(r() * cols.length)]}"/>`;
  }
  return out;
}
const wrap = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-hidden="true">${inner}</svg>`;

export const DISHES: Record<string, { name: string; svg: () => string }> = {
  "chicken-fry": {
    name: "Andhra chicken fry",
    svg: () => wrap(`${shadow}${plate(84, C.slate, C.slateLt)}
      ${blobs(11, 9, 100, 100, 44, 12, 17, [C.curryDk, C.brown, C.curry])}
      ${dots(12, 30, 100, 100, 54, 1.4, 2.6, [C.turmeric, C.curryLt])}
      ${leaf(52, 70, -20)}${leaf(140, 58, 25)}${leaf(138, 138, 70)}${leaf(60, 138, 200)}${leaf(100, 50, 5, 0.9)}
      ${chilli(60, 100, -40, 0.9)}${chilli(130, 100, 150, 0.8)}${lime(152, 150)}`),
  },
  "prawn-pepper": {
    name: "Prawn pepper fry",
    svg: () => wrap(`${shadow}${plate(84, C.cream, C.creamDk)}
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => { const a = (i / 7) * Math.PI * 2 + 0.4; const x = 100 + Math.cos(a) * 34, y = 100 + Math.sin(a) * 34; return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f((a * 180) / Math.PI + 90)})"><path d="M-9 -16 C14 -14 16 10 -6 16 C4 6 2 -6 -9 -16Z" fill="${i % 2 ? C.curryLt : C.curry}"/><path d="M-6 -10 C6 -8 8 4 -2 9" stroke="${C.curryDk}" stroke-width="1.4" fill="none" opacity=".55"/><circle cx="-8" cy="-16" r="2.2" fill="${C.curryDk}"/></g>`; }).join("")}
      ${dots(21, 34, 100, 100, 58, 1.2, 2, [C.slate, C.brown, C.slate])}
      ${leaf(98, 92, 30, 1.1)}${leaf(82, 110, 160)}${leaf(116, 106, 100)}${chilli(70, 76, -30, 0.8)}${chilli(134, 128, 140, 0.8)}`),
  },
  biryani: {
    name: "Avakai chicken biryani",
    svg: () => wrap(`${shadow}${bowl(82, C.clay, C.clayDk)}
      <circle cx="100" cy="100" r="62" fill="${C.rice}"/>
      ${dots(31, 120, 100, 100, 58, 1.6, 3, [C.riceDk, C.white, C.saffron, C.rice])}
      <path d="M62 94 C84 70 118 74 140 98" stroke="${C.saffron}" stroke-width="7" fill="none" opacity=".7" stroke-linecap="round"/>
      <path d="M70 120 C92 134 118 130 134 112" stroke="${C.turmeric}" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/>
      ${blobs(32, 5, 100, 100, 36, 7, 10, [C.brownLt, C.brown])}
      <g transform="translate(100 98)"><ellipse rx="19" ry="14" fill="${C.white}"/><ellipse rx="8" ry="6.5" fill="${C.saffron}"/></g>
      <g transform="translate(126 120) rotate(30)"><ellipse rx="13" ry="10" fill="${C.white}"/><ellipse rx="5.5" ry="4.5" fill="${C.saffron}"/></g>
      ${leaf(70, 112, 190, 1)}${leaf(86, 78, 330, 1)}${leaf(134, 86, 40, 0.9)}`),
  },
  "paneer-tikka": {
    name: "Paneer tikka",
    svg: () => wrap(`${shadow}${plate(84, C.slate, C.slateLt)}
      ${[-22, 6, 34].map((o, k) => `<g transform="rotate(-18 100 100) translate(0 ${o})"><line x1="26" y1="100" x2="176" y2="100" stroke="${C.cream}" stroke-width="2.4" stroke-linecap="round"/>
        ${[0, 1, 2, 3].map((i) => { const x = 44 + i * 33; const col = [C.paneer, C.chilliLt, C.paneer, C.leaf][(i + k) % 4]; return `<rect x="${x}" y="87" width="24" height="26" rx="5" fill="${col}"/><rect x="${x + 2}" y="89" width="20" height="9" rx="3" fill="#fff" opacity=".22"/>${col === C.paneer ? `<path d="M${x + 5} 108 L${x + 19} 108" stroke="${C.char}" stroke-width="3" opacity=".7"/>` : ""}`; }).join("")}</g>`).join("")}
      <circle cx="150" cy="150" r="13" fill="${C.mint}"/><circle cx="148" cy="148" r="6" fill="${C.leafLt}" opacity=".6"/>
      ${lime(52, 150, 10)}`),
  },
  "fish-curry": {
    name: "Coastal fish curry",
    svg: () => wrap(`${shadow}${bowl(82, C.clay, C.clayDk)}
      <circle cx="100" cy="100" r="66" fill="${C.curry}"/><circle cx="100" cy="100" r="52" fill="${C.curryLt}" opacity=".55"/>
      ${dots(41, 40, 100, 100, 60, 1.4, 2.6, [C.turmeric, C.curryDk])}
      ${[[78, 84, -20], [124, 92, 30], [100, 122, 8]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-17 -9 C0 -16 18 -10 20 0 C18 10 0 15 -17 9 C-13 3 -13 -3 -17 -9Z" fill="${C.cream}"/><path d="M-10 -3 L12 -3 M-10 2 L10 2" stroke="${C.creamDk}" stroke-width="1.6"/></g>`).join("")}
      ${[[110, 70], [74, 112]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="10" fill="${C.chilliLt}"/><circle r="6" fill="${C.curryDk}" opacity=".5"/></g>`).join("")}
      ${leaf(96, 100, 40, 0.9, C.leafLt)}${leaf(128, 120, 130, 0.8, C.leafLt)}${chilli(60, 98, -25, 0.8)}`),
  },
  dosa: {
    name: "Ghee roast dosa",
    svg: () => wrap(`${shadow}<ellipse cx="100" cy="102" rx="90" ry="62" fill="${C.creamDk}"/><ellipse cx="100" cy="100" rx="85" ry="58" fill="${C.cream}"/>
      <path d="M26 100 C40 62 140 56 176 92 C180 102 176 112 168 116 C130 138 52 142 30 114 C26 110 24 106 26 100Z" fill="${C.gold}"/>
      <path d="M32 100 C48 70 140 66 170 96 C150 118 60 124 34 108Z" fill="${C.saffron}"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${52 + i * 17} ${108 - i * 0.5} C${58 + i * 17} 94 ${70 + i * 17} 90 ${74 + i * 17} 82" stroke="${C.brownLt}" stroke-width="2" fill="none" opacity=".55"/>`).join("")}
      ${dots(51, 26, 104, 96, 52, 1.2, 2.2, [C.brownLt, C.brown])}
      <circle cx="46" cy="150" r="13" fill="${C.white}"/><circle cx="46" cy="150" r="9" fill="${C.cream}"/><circle cx="46" cy="150" r="7" fill="${C.white}" opacity=".6"/>
      <circle cx="154" cy="152" r="13" fill="${C.white}"/><circle cx="154" cy="152" r="9" fill="${C.curryLt}"/>${dots(52, 8, 154, 152, 6, 1, 1.6, [C.turmeric, C.curryDk])}`),
  },
  "idli-sambar": {
    name: "Idli sambar",
    svg: () => wrap(`${shadow}${plate(84, C.cream, C.creamDk)}
      ${[[78, 82], [116, 84], [98, 114]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="21" fill="${C.creamDk}"/><circle r="18.5" fill="${C.white}"/><circle r="12" fill="#fff" opacity=".55"/>${gloss(-6, -7, 6)}</g>`).join("")}
      <g transform="translate(150 150)"><circle r="26" fill="${C.clay}"/><circle r="21" fill="${C.curryLt}"/>${dots(61, 26, 0, 0, 18, 1.4, 2.8, [C.turmeric, C.curryDk, C.leaf])}<path d="M-12 8 C-4 -10 8 -12 14 -4" stroke="${C.leaf}" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
      <g transform="translate(48 152)"><circle r="14" fill="${C.white}"/><circle r="10" fill="${C.leafLt}"/>${dots(62, 8, 0, 0, 6, 0.8, 1.5, [C.mint, C.white])}</g>`),
  },
  "chicken-65": {
    name: "Chicken 65",
    svg: () => wrap(`${shadow}${plate(84, C.slate, C.slateLt)}
      ${blobs(71, 13, 100, 98, 42, 9, 13, [C.curry, C.chilliLt, C.curryDk, C.curryLt])}
      ${dots(72, 26, 100, 98, 56, 1.4, 2.4, [C.turmeric, C.saffron])}
      ${[[62, 126], [138, 70], [132, 134]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="10" fill="none" stroke="${C.cream}" stroke-width="3" opacity=".85"/></g>`).join("")}
      ${chilli(58, 74, -50, 0.9)}${chilli(120, 50, 20, 0.8)}${leaf(80, 56, 330)}${leaf(142, 100, 60)}${leaf(70, 140, 180)}${lime(150, 150)}`),
  },
  keema: {
    name: "Mutton keema",
    svg: () => wrap(`${shadow}${bowl(80, C.clay, C.clayDk)}
      <circle cx="100" cy="100" r="64" fill="${C.brown}"/>
      ${dots(81, 150, 100, 100, 60, 1.8, 3.4, [C.brownLt, C.brown, C.char, C.curryDk])}
      ${dots(82, 16, 100, 100, 46, 3, 4.4, [C.leaf, C.leafLt])}
      ${dots(83, 14, 100, 100, 50, 1.4, 2.2, [C.turmeric])}
      ${leaf(100, 88, 20, 1.1, C.leafLt)}${leaf(80, 112, 190, 1, C.leafLt)}${leaf(120, 112, 80, 1, C.leafLt)}`),
  },
  payasam: {
    name: "Kaju payasam",
    svg: () => wrap(`${shadow}${bowl(78, C.gold, "#b97a27")}
      <circle cx="100" cy="100" r="62" fill="${C.white}"/><circle cx="100" cy="100" r="54" fill="${C.cream}"/>
      <circle cx="100" cy="100" r="40" fill="${C.paneer}" opacity=".6"/>
      ${blobs(91, 11, 100, 100, 38, 6, 8.5, [C.paneer, C.creamDk, C.saffron], true)}
      ${dots(92, 16, 100, 100, 44, 2, 3.2, [C.brown, C.char])}
      ${[[84, 90], [118, 112], [96, 126]].map(([x, y]) => `<path d="M${x - 5} ${y} h10" stroke="${C.saffron}" stroke-width="3" stroke-linecap="round"/>`).join("")}`),
  },
  "lime-soda": {
    name: "Fresh lime soda",
    svg: () => wrap(`${shadow}<circle cx="100" cy="100" r="76" fill="#cfd8d0" opacity=".9"/><circle cx="100" cy="100" r="68" fill="#e6efe4"/><circle cx="100" cy="100" r="60" fill="#d4e2c4"/>
      <circle cx="100" cy="100" r="52" fill="#e9f0d4" opacity=".8"/>
      ${[[78, 80], [120, 86], [92, 118], [124, 122], [104, 98]].map(([x, y], i) => `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="5" fill="#fff" opacity=".6" transform="rotate(${i * 17} ${x} ${y})"/>`).join("")}
      ${lime(110, 90, 24)}
      ${dots(95, 14, 100, 100, 46, 1.4, 3, ["#fff"])}
      ${leaf(70, 66, 300, 1.4, C.leafLt)}${leaf(78, 60, 330, 1.2, C.leaf)}${leaf(64, 74, 270, 1.1, C.leaf)}
      <line x1="40" y1="150" x2="150" y2="48" stroke="${C.clay}" stroke-width="5" stroke-linecap="round" opacity=".9"/>`),
  },
  "filter-coffee": {
    name: "Filter coffee",
    svg: () => wrap(`${shadow}
      <circle cx="100" cy="100" r="80" fill="${C.creamDk}"/><circle cx="100" cy="100" r="74" fill="${C.cream}"/>
      <g transform="translate(66 100)"><circle r="32" fill="#cfc7b8"/><circle r="28" fill="#e9e2d2"/><circle r="22" fill="${C.brown}"/><circle r="18" fill="${C.brownLt}"/><path d="M-10 -4 C-4 -12 6 -10 10 -3" stroke="${C.cream}" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/></g>
      <g transform="translate(142 100)"><circle r="30" fill="#cfc7b8"/><circle r="26" fill="#e9e2d2"/><circle r="20" fill="${C.brown}"/><circle r="16" fill="${C.brownLt}"/><circle r="10" fill="${C.white}" opacity=".85"/></g>`),
  },
  "gulab-jamun": {
    name: "Gulab jamun",
    svg: () => wrap(`${shadow}${bowl(80, C.gold, "#b97a27")}
      <circle cx="100" cy="100" r="62" fill="${C.curryDk}" opacity=".5"/><circle cx="100" cy="100" r="58" fill="${C.turmeric}" opacity=".55"/>
      ${[[80, 84], [118, 86], [100, 116], [70, 114], [128, 118]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="17" fill="${C.char}"/><circle r="14" fill="${C.brown}"/>${gloss(-5, -6, 6)}</g>`).join("")}
      ${dots(101, 22, 100, 100, 54, 1.4, 2.2, [C.leaf, C.leafLt])}`),
  },
};

export const DISH_IDS = Object.keys(DISHES);
export const dishSvg = (id: string) => (DISHES[id] ? DISHES[id].svg() : "");
