import { useEffect, useMemo, useRef, useState } from "react";
import { AV, Wordmark } from "./brand";

// The Aavira guest flow as a working front-end prototype: scan, browse, ask the host, order
// together, be remembered, leave feedback. No backend: everything here is local state, with a
// demo menu and demo guests. It shows the experience of the platform we built, and it is
// labelled as a prototype wherever it appears.

export type Screen = "scan" | "menu" | "host" | "cart" | "remember" | "feedback";

type Dish = { id: string; name: string; line: string; price: number; veg: boolean; cat: string; tag?: string };

export const MENU: Dish[] = [
  { id: "prawn-pepper", name: "Prawn pepper fry", line: "Curry leaf, black pepper, a squeeze of lime", price: 480, veg: false, cat: "Starters", tag: "Tonight" },
  { id: "chicken-65", name: "Chicken 65", line: "Crisp, red-hot, a curry leaf finish", price: 360, veg: false, cat: "Starters", tag: "Bestseller" },
  { id: "paneer-tikka", name: "Paneer tikka", line: "Char-grilled, with mint chutney", price: 340, veg: true, cat: "Starters" },
  { id: "chicken-fry", name: "Andhra chicken fry", line: "Dry-roasted with chilli and curry leaf", price: 420, veg: false, cat: "Mains" },
  { id: "fish-curry", name: "Coastal fish curry", line: "Tamarind, coconut, a slow simmer", price: 520, veg: false, cat: "Mains" },
  { id: "keema", name: "Mutton keema", line: "Peas, coriander, buttered pav alongside", price: 460, veg: false, cat: "Mains" },
  { id: "biryani", name: "Avakai chicken biryani", line: "Raw mango pickle masala, saffron rice", price: 440, veg: false, cat: "Biryani", tag: "Chef's pick" },
  { id: "dosa", name: "Ghee roast dosa", line: "Crisp, with two chutneys", price: 220, veg: true, cat: "Tiffin" },
  { id: "idli-sambar", name: "Idli sambar", line: "Soft, with drumstick sambar", price: 180, veg: true, cat: "Tiffin" },
  { id: "payasam", name: "Kaju payasam", line: "Cashew and cardamom, served warm", price: 190, veg: true, cat: "Sweet" },
  { id: "gulab-jamun", name: "Saffron jalebi", line: "Hot and crisp, soaked in rose syrup", price: 170, veg: true, cat: "Sweet" },
  { id: "lime-soda", name: "Fresh lime soda", line: "Sweet, salted or both", price: 120, veg: true, cat: "Drinks" },
  { id: "filter-coffee", name: "Filter coffee", line: "Strong, frothed, in a davara", price: 110, veg: true, cat: "Drinks" },
];
const BY_ID: Record<string, Dish> = Object.fromEntries(MENU.map((d) => [d.id, d]));
const CATS = ["All", "Starters", "Mains", "Biryani", "Tiffin", "Sweet", "Drinks"];
const GUESTS: Record<string, string> = { Ravi: AV.turmeric, Meera: AV.ember, You: "#7aa14a" };

type Line = { id: string; who: string };
const SEED: Line[] = [{ id: "chicken-65", who: "Ravi" }, { id: "lime-soda", who: "Meera" }, { id: "biryani", who: "You" }];

const INTENTS: { k: string; label: string; say: string; picks: string[] }[] = [
  { k: "spicy", label: "Something spicy", say: "Start with the Chicken 65: crisp and red-hot. A fresh lime soda takes the edge off.", picks: ["chicken-65", "lime-soda"] },
  { k: "veg", label: "Vegetarian", say: "Paneer tikka to share, then a ghee roast dosa for the table.", picks: ["paneer-tikka", "dosa"] },
  { k: "sweet", label: "Something sweet", say: "Two ways to end it: warm kaju payasam, or hot saffron jalebi if you like it sticky.", picks: ["payasam", "gulab-jamun"] },
  { k: "pop", label: "What's popular?", say: "Most tables open with the Chicken 65 and the prawn pepper fry, then share a biryani.", picks: ["chicken-65", "prawn-pepper", "biryani"] },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function DishArt({ id, size = 64, radius = 14 }: { id: string; size?: number; radius?: number }) {
  return <img src={`/case/aavira/dishes/${id}.webp`} alt={BY_ID[id]?.name ?? ""} width={size} height={size} loading="lazy" draggable={false} style={{ width: size, height: size, borderRadius: radius, objectFit: "cover" }} className="shrink-0" />;
}

const Dot = ({ veg }: { veg: boolean }) => (
  <span className="inline-flex items-center justify-center w-[13px] h-[13px] rounded-[3px] border" style={{ borderColor: veg ? "#5fa05a" : "#c0431f" }} aria-label={veg ? "Vegetarian" : "Non vegetarian"}>
    <span className="block w-[6px] h-[6px] rounded-full" style={{ background: veg ? "#5fa05a" : "#c0431f" }} />
  </span>
);

const Icon = ({ d, active }: { d: string; active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={active ? AV.turmeric : AV.dim} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ICONS = {
  menu: "M5 5h14M5 12h14M5 19h9",
  host: "M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12Z",
  cart: "M6 6h15l-2 9H8L6 6Zm0 0L5 3H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  you: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0",
};

export function AaviraPrototype({
  screen: controlled,
  onScreen,
  className,
  onOrder,
  onCall,
  status,
}: {
  screen?: Screen;
  onScreen?: (s: Screen) => void;
  className?: string;
  onOrder?: (lines: { name: string; who: string; price: number }[], total: number) => void;
  onCall?: (kind: "waiter" | "bill") => void;
  status?: "new" | "cooking" | "ready" | "served" | null;
}) {
  const [screen, setScreen] = useState<Screen>(controlled ?? "scan");
  useEffect(() => { if (controlled) setScreen(controlled); }, [controlled]);
  const go = (s: Screen) => { setScreen(s); onScreen?.(s); };

  const [cat, setCat] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [cart, setCart] = useState<Line[]>(SEED);
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState(false);
  const [called, setCalled] = useState<"" | "waiter" | "bill">("");
  const [chat, setChat] = useState<{ from: "host" | "me"; text: string; picks?: string[] }[]>([
    { from: "host", text: "Good evening, I'm Aira, tonight's host. What are you in the mood for?" },
  ]);
  const [typing, setTyping] = useState(false);
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timer = useRef<number>(0);

  const add = (id: string) => {
    setCart((c) => [...c, { id, who: "You" }]);
    setSent(false);
    setToast(`${BY_ID[id].name} added to the table`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(""), 1600);
  };
  const ask = (i: (typeof INTENTS)[number]) => {
    if (typing) return;
    setChat((m) => [...m, { from: "me", text: i.label }]);
    setTyping(true);
    window.setTimeout(() => { setTyping(false); setChat((m) => [...m, { from: "host", text: i.say, picks: i.picks }]); }, 750);
  };
  const total = useMemo(() => cart.reduce((s, l) => s + BY_ID[l.id].price, 0), [cart]);
  const shown = MENU.filter((d) => (cat === "All" || d.cat === cat) && (!vegOnly || d.veg));

  // ----- scaling: design at 390 x 844 and scale to whatever width we are given
  const wrap = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => setK(el.clientWidth / 390);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tab = (s: Screen, label: string, d: string) => (
    <button type="button" onClick={() => go(s)} className="flex flex-col items-center gap-1 py-2 px-3 relative" aria-current={screen === s} aria-label={label}>
      <Icon d={d} active={screen === s} />
      <span className="text-[10px] tracking-wide" style={{ color: screen === s ? AV.turmeric : AV.dim }}>{label}</span>
      {s === "cart" && cart.length > 0 && (
        <span className="absolute top-0.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-semibold grid place-items-center" style={{ background: AV.ember, color: "#fff" }}>{cart.length}</span>
      )}
    </button>
  );

  return (
    <div ref={wrap} className={className} style={{ width: "100%", height: 844 * k, position: "relative", overflow: "hidden", borderRadius: "inherit", background: AV.ink }}>
      <div style={{ width: 390, height: 844, transform: `scale(${k})`, transformOrigin: "top left", position: "absolute", inset: 0 }} className="font-sans" >
        <div className="absolute inset-0 flex flex-col" style={{ background: AV.ink, color: AV.cream }}>
          {/* status bar */}
          <div className="h-[46px] shrink-0 flex items-end justify-between px-7 pb-1.5 text-[12px]" style={{ color: AV.muted }}>
            <span className="font-medium">9:41</span><span aria-hidden>●●● ▮</span>
          </div>

          {/* ---------------------------------------------------------------- SCAN */}
          {screen === "scan" && (
            <div className="flex-1 flex flex-col items-center px-8 pt-6 pb-10 text-center">
              <Wordmark height={26} />
              <p className="mt-3 text-[11px] tracking-[0.2em] uppercase" style={{ color: AV.dim }}>coastal kitchen and bar</p>
              <div className="mt-10 relative w-[250px] h-[250px] rounded-[28px] grid place-items-center" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                {[["top-3 left-3", "border-t-2 border-l-2"], ["top-3 right-3", "border-t-2 border-r-2"], ["bottom-3 left-3", "border-b-2 border-l-2"], ["bottom-3 right-3", "border-b-2 border-r-2"]].map(([pos, b]) => (
                  <span key={pos} className={`absolute w-7 h-7 rounded-md ${pos} ${b}`} style={{ borderColor: AV.turmeric }} />
                ))}
                <svg viewBox="0 0 10 10" width="150" height="150" aria-hidden>
                  <rect width="10" height="10" rx="1" fill={AV.cream} />
                  {[[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],[6,0],[7,0],[8,0],[6,1],[8,1],[6,2],[7,2],[8,2],[0,6],[1,6],[2,6],[0,7],[2,7],[0,8],[1,8],[2,8],[4,1],[4,3],[3,4],[5,4],[4,5],[6,5],[5,7],[7,6],[8,8],[4,7],[3,6],[6,8]].map(([x, y]) => <rect key={`${x}${y}`} x={x + 0.5} y={y + 0.5} width="0.9" height="0.9" fill={AV.ink} />)}
                </svg>
              </div>
              <div className="mt-8 px-4 py-1.5 rounded-full text-[12px]" style={{ background: AV.surface, border: `1px solid ${AV.line}`, color: AV.cream }}>Table 7 · 2 guests</div>
              <p className="mt-5 text-[14px] leading-relaxed max-w-[260px]" style={{ color: AV.muted }}>Scan the code on your table. It opens right here in the browser: no app, no download.</p>
              <button type="button" onClick={() => go("menu")} className="mt-auto w-full rounded-full py-4 text-[14px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Open the menu</button>
            </div>
          )}

          {/* ---------------------------------------------------------------- MENU */}
          {screen === "menu" && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="px-5 pt-2 pb-3 flex items-center justify-between"><Wordmark height={20} /><span className="text-[12px]" style={{ color: AV.muted }}>Table 7</span></div>
              <div className="px-5 pb-3"><div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: `linear-gradient(120deg, ${AV.surfaceHi}, #2a1c12)`, border: `1px solid ${AV.line}` }}>
                <DishArt id="prawn-pepper" size={52} radius={12} />
                <div><div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: AV.turmeric }}>Tonight's special</div><div className="font-display text-[17px] leading-tight">Prawn pepper fry</div></div>
              </div></div>
              <div className="px-5 pb-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }} role="tablist">
                <button type="button" onClick={() => setVegOnly((v) => !v)} aria-pressed={vegOnly} className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap inline-flex items-center gap-1.5" style={{ background: vegOnly ? "#2f4a2b" : AV.surface, color: vegOnly ? "#bfe3b6" : AV.muted, border: `1px solid ${vegOnly ? "#5fa05a" : AV.line}` }}><Dot veg />Veg</button>
                {CATS.map((c) => (
                  <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className="px-3.5 py-1.5 rounded-full text-[12px] whitespace-nowrap" style={{ background: cat === c ? AV.turmeric : AV.surface, color: cat === c ? AV.ink : AV.muted, border: `1px solid ${cat === c ? AV.turmeric : AV.line}` }}>{c}</button>
                ))}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 flex flex-col gap-2.5">
                {shown.length === 0 && <p className="text-center text-[13px] py-8" style={{ color: AV.dim }}>Nothing here for that filter.</p>}
                {shown.map((d) => (
                  <div key={d.id} className="rounded-2xl p-2.5 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                    <button type="button" onClick={() => setOpen(d.id)} aria-label={`Details for ${d.name}`} className="shrink-0"><DishArt id={d.id} size={84} /></button>
                    <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setOpen(d.id)}>
                      <div className="flex items-center gap-2"><Dot veg={d.veg} />{d.tag && <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: AV.turmeric }}>{d.tag}</span>}</div>
                      <div className="font-display text-[16px] leading-tight mt-1">{d.name}</div>
                      <div className="text-[11.5px] leading-snug mt-0.5" style={{ color: AV.muted }}>{d.line}</div>
                      <div className="text-[13px] mt-1.5 font-medium">{inr(d.price)}</div>
                    </div>
                    <button type="button" onClick={() => add(d.id)} aria-label={`Add ${d.name}`} className="w-9 h-9 rounded-full text-[20px] leading-none grid place-items-center shrink-0 active:scale-90 transition-transform" style={{ background: AV.turmeric, color: AV.ink }}>+</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- HOST */}
          {screen === "host" && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="px-5 pt-2 pb-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center font-display text-[18px]" style={{ background: AV.surfaceHi, color: AV.turmeric, border: `1px solid ${AV.line}` }}>A</div>
                <div><div className="font-display text-[18px] leading-none">Aira</div><div className="text-[11px] mt-1" style={{ color: AV.dim }}>Your host tonight · knows the menu</div></div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-3 flex flex-col gap-3">
                {chat.map((m, i) => (
                  <div key={i} className={m.from === "me" ? "self-end max-w-[78%]" : "self-start max-w-[88%]"}>
                    <div className="rounded-2xl px-4 py-2.5 text-[13.5px] leading-snug" style={{ background: m.from === "me" ? AV.turmeric : AV.surface, color: m.from === "me" ? AV.ink : AV.cream, border: m.from === "me" ? "none" : `1px solid ${AV.line}` }}>{m.text}</div>
                    {m.picks && (
                      <div className="mt-2 flex flex-col gap-2">
                        {m.picks.map((p) => (
                          <div key={p} className="rounded-xl p-2 flex items-center gap-2.5" style={{ background: AV.surfaceHi, border: `1px solid ${AV.line}` }}>
                            <DishArt id={p} size={44} />
                            <div className="flex-1 min-w-0"><div className="font-display text-[14px] leading-tight">{BY_ID[p].name}</div><div className="text-[11px]" style={{ color: AV.muted }}>{inr(BY_ID[p].price)}</div></div>
                            <button type="button" onClick={() => add(p)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {typing && <div className="self-start rounded-2xl px-4 py-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}><span className="inline-flex gap-1">{[0, 1, 2].map((d) => <i key={d} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: AV.dim, animationDelay: `${d * 150}ms` }} />)}</span></div>}
              </div>
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {INTENTS.map((i) => <button key={i.k} type="button" onClick={() => ask(i)} className="px-3.5 py-2 rounded-full text-[12px]" style={{ background: AV.surface, border: `1px solid ${AV.line}`, color: AV.cream }}>{i.label}</button>)}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- CART */}
          {screen === "cart" && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="px-5 pt-2 pb-3">
                <div className="font-display text-[22px] leading-none">The table's order</div>
                <div className="mt-2 flex items-center gap-2">
                  {Object.entries(GUESTS).map(([n, c]) => <span key={n} className="inline-flex items-center gap-1.5 text-[11px] rounded-full pl-1 pr-2.5 py-1" style={{ background: AV.surface, border: `1px solid ${AV.line}`, color: AV.muted }}><i className="w-4 h-4 rounded-full grid place-items-center text-[9px] not-italic font-bold" style={{ background: c, color: AV.ink }}>{n[0]}</i>{n}</span>)}
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-5 flex flex-col gap-2.5 pb-3">
                {cart.length === 0 && <p className="text-center text-[13px] py-10" style={{ color: AV.dim }}>The table is empty. Add something from the menu.</p>}
                {cart.map((l, i) => (
                  <div key={i} className="rounded-2xl p-2.5 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                    <DishArt id={l.id} size={46} />
                    <div className="flex-1 min-w-0"><div className="font-display text-[15px] leading-tight">{BY_ID[l.id].name}</div><div className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: AV.muted }}><i className="w-2 h-2 rounded-full" style={{ background: GUESTS[l.who] }} />added by {l.who}</div></div>
                    <div className="text-[13px] font-medium">{inr(BY_ID[l.id].price)}</div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-3 pt-2" style={{ borderTop: `1px solid ${AV.line}` }}>
                {sent ? (
                  <div className="rounded-2xl p-4" style={{ background: AV.surfaceHi, border: `1px solid ${AV.turmeric}55` }} role="status">
                    <div className="font-display text-[19px]" style={{ color: AV.turmeric }}>{!status || status === "new" ? "Sent to the kitchen" : status === "cooking" ? "The kitchen is on it" : status === "ready" ? "Ready, on its way" : "Enjoy your meal"}</div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {["Sent", "Cooking", "Ready", "Served"].map((t, k) => {
                        const at = ["new", "cooking", "ready", "served"].indexOf(status ?? "new");
                        return <div key={t} className="flex-1"><div className="h-1.5 rounded-full" style={{ background: k <= at ? AV.turmeric : AV.line }} /><div className="mt-1 text-[9.5px] text-center" style={{ color: k <= at ? AV.cream : AV.dim }}>{t}</div></div>;
                      })}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => { setCalled("waiter"); onCall?.("waiter"); }} className="rounded-full py-2.5 text-[12px] font-semibold" style={{ border: `1px solid ${AV.line}`, color: called === "waiter" ? AV.turmeric : AV.cream }}>{called === "waiter" ? "Waiter is coming" : "Call the waiter"}</button>
                      <button type="button" onClick={() => { setCalled("bill"); onCall?.("bill"); }} className="rounded-full py-2.5 text-[12px] font-semibold" style={{ border: `1px solid ${AV.line}`, color: called === "bill" ? AV.turmeric : AV.cream }}>{called === "bill" ? "Bill on its way" : "Ask for the bill"}</button>
                    </div>
                    <button type="button" onClick={() => { setSent(false); setCalled(""); setCart([]); }} className="mt-3 w-full text-[12px] underline underline-offset-4" style={{ color: AV.muted }}>Order another round</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3 text-[14px]"><span style={{ color: AV.muted }}>{cart.length} items</span><span className="font-semibold text-[16px]">{inr(total)}</span></div>
                    <button type="button" onClick={() => { setSent(true); onOrder?.(cart.map((l) => ({ name: BY_ID[l.id].name, who: l.who, price: BY_ID[l.id].price })), total); }} disabled={!cart.length} className="w-full rounded-full py-3.5 text-[14px] font-semibold disabled:opacity-40" style={{ background: AV.turmeric, color: AV.ink }}>Send to the kitchen</button>
                    <p className="mt-2 text-center text-[11px]" style={{ color: AV.dim }}>One host places the order for everyone.</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- REMEMBER */}
          {screen === "remember" && (
            <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-2 pb-4 flex flex-col gap-3.5">
              <div className="font-display text-[22px] leading-none">Welcome back, Meera</div>
              <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #2a1c12, ${AV.surfaceHi})`, border: `1px solid ${AV.turmeric}44` }}>
                <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: AV.turmeric }}>It's your birthday week</div>
                <div className="font-display text-[22px] leading-tight mt-2">A dessert is on us tonight</div>
                <p className="text-[12.5px] mt-2" style={{ color: AV.muted }}>Applied automatically. We always apply the single best perk, so offers never stack.</p>
                <div className="absolute -right-3 -bottom-3"><DishArt id="payasam" size={104} radius={52} /></div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                <div className="flex items-center justify-between text-[12px]" style={{ color: AV.muted }}><span>Your tier</span><span style={{ color: AV.turmeric }}>Insider</span></div>
                <div className="mt-3 flex items-center gap-1.5">
                  {["Guest", "Regular", "Insider", "House"].map((t, i) => <div key={t} className="flex-1"><div className="h-1.5 rounded-full" style={{ background: i <= 2 ? AV.turmeric : AV.line }} /><div className="mt-1.5 text-[10px] text-center" style={{ color: i <= 2 ? AV.cream : AV.dim }}>{t}</div></div>)}
                </div>
                <p className="mt-3 text-[12px]" style={{ color: AV.muted }}>Four more visits to reach House: a reserved table on busy nights.</p>
              </div>
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                <DishArt id="biryani" size={52} />
                <div className="flex-1"><div className="text-[10px] tracking-[0.16em] uppercase" style={{ color: AV.dim }}>Your usual</div><div className="font-display text-[16px] leading-tight">Avakai chicken biryani</div></div>
                <button type="button" onClick={() => { add("biryani"); }} className="px-3.5 py-2 rounded-full text-[11.5px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add again</button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- FEEDBACK */}
          {screen === "feedback" && (
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-4 flex flex-col items-center text-center">
              {done ? (
                <div className="mt-6 w-full" role="status">
                  <div className="font-display text-[26px] leading-tight">Thank you, that helps.</div>
                  <p className="mt-2 text-[13px]" style={{ color: AV.muted }}>Here is something for next time.</p>
                  <div className="mt-6 rounded-3xl p-6 relative" style={{ background: AV.turmeric, color: AV.ink }}>
                    <div className="text-[10px] tracking-[0.2em] uppercase opacity-70">Next visit</div>
                    <div className="font-display text-[44px] leading-none mt-2">10% off</div>
                    <div className="mt-3 text-[12px] opacity-80">Show this code to your waiter</div>
                    <div className="mt-2 inline-block px-3 py-1.5 rounded-lg font-mono text-[14px] tracking-widest" style={{ background: AV.ink, color: AV.turmeric }}>AAV-7K2</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-display text-[26px] leading-tight mt-2">How was tonight?</div>
                  <p className="mt-2 text-[13px]" style={{ color: AV.muted }}>Tell us in ten seconds and we will thank you with something for next time.</p>
                  <div className="mt-6 flex gap-2" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" role="radio" aria-checked={stars === s} aria-label={`${s} star${s > 1 ? "s" : ""}`} onClick={() => setStars(s)} className="w-12 h-12 grid place-items-center active:scale-90 transition-transform">
                        <svg viewBox="0 0 24 24" width="34" height="34"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" fill={s <= stars ? AV.turmeric : "none"} stroke={s <= stars ? AV.turmeric : AV.dim} strokeWidth="1.5" strokeLinejoin="round" /></svg>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {["The food", "The service", "The music", "The wait"].map((t) => {
                      const on = tags.includes(t);
                      return <button key={t} type="button" onClick={() => setTags((x) => (on ? x.filter((y) => y !== t) : [...x, t]))} aria-pressed={on} className="px-3.5 py-2 rounded-full text-[12px]" style={{ background: on ? AV.turmeric : AV.surface, color: on ? AV.ink : AV.cream, border: `1px solid ${on ? AV.turmeric : AV.line}` }}>{t}</button>;
                    })}
                  </div>
                  <button type="button" disabled={!stars} onClick={() => setDone(true)} className="mt-auto w-full rounded-full py-3.5 text-[14px] font-semibold disabled:opacity-40" style={{ background: AV.turmeric, color: AV.ink }}>Send and get my code</button>
                </>
              )}
            </div>
          )}

          {/* dish sheet */}
          {open && BY_ID[open] && (
            <div className="absolute inset-0 z-20 flex flex-col justify-end" role="dialog" aria-label={BY_ID[open].name} style={{ background: "rgba(5,4,4,.62)" }} onClick={() => setOpen(null)}>
              <div className="rounded-t-[28px] overflow-hidden" style={{ background: AV.surface, borderTop: `1px solid ${AV.line}` }} onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <img src={`/case/aavira/dishes/${open}.webp`} alt={BY_ID[open].name} className="w-full h-[250px] object-cover" />
                  <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center text-[18px]" style={{ background: "rgba(14,12,11,.75)", color: AV.cream }}>×</button>
                </div>
                <div className="px-5 pt-4 pb-6">
                  <div className="flex items-center gap-2"><Dot veg={BY_ID[open].veg} />{BY_ID[open].tag && <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: AV.turmeric }}>{BY_ID[open].tag}</span>}</div>
                  <div className="font-display text-[24px] leading-tight mt-1.5">{BY_ID[open].name}</div>
                  <p className="text-[13px] leading-snug mt-1.5" style={{ color: AV.muted }}>{BY_ID[open].line}. Ask Aira if you want it milder or to share.</p>
                  <button type="button" onClick={() => { add(open); setOpen(null); }} className="mt-4 w-full rounded-full py-3.5 text-[14px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add to the table · {inr(BY_ID[open].price)}</button>
                </div>
              </div>
            </div>
          )}

          {/* toast */}
          <div className="absolute left-5 right-5 bottom-[92px] pointer-events-none flex justify-center transition-all duration-300" style={{ opacity: toast ? 1 : 0, transform: toast ? "none" : "translateY(8px)" }} aria-live="polite">
            <span className="rounded-full px-4 py-2 text-[12px]" style={{ background: AV.cream, color: AV.ink }}>{toast}</span>
          </div>

          {/* tab bar */}
          {screen !== "scan" && (
            <nav className="shrink-0 flex items-center justify-around pb-5 pt-1" style={{ background: AV.surface, borderTop: `1px solid ${AV.line}` }} aria-label="Guest navigation">
              {tab("menu", "Menu", ICONS.menu)}
              {tab("host", "Aira", ICONS.host)}
              {tab("cart", "Table", ICONS.cart)}
              {tab("remember", "You", ICONS.you)}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
