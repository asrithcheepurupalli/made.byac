import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { AV, Wordmark } from "./brand";

// The Aavira guest flow as a working front-end prototype: scan, browse, ask the host, order
// together, be remembered, leave feedback. No backend: everything is local state with a demo
// menu and demo guests. The host here is a scripted stand-in for the real thing, which runs on
// Claude, is grounded in the live menu, and can act on the cart. The prototype says so in the chat.

export type Screen = "scan" | "menu" | "host" | "cart" | "remember" | "feedback";
export type ServiceKind = "water" | "napkins" | "cutlery" | "waiter" | "bill";
export type OrderLine = { name: string; who: string; price: number; qty: number; note?: string };

export type Dish = {
  id: string; name: string; line: string; price: number; veg: boolean; cat: string; tag?: string;
  spice: 0 | 1 | 2 | 3; how: string; hero: string; pair: string; alias: string[];
};

export const MENU: Dish[] = [
  { id: "prawn-pepper", name: "Prawn pepper fry", line: "Curry leaf, black pepper, a squeeze of lime", price: 480, veg: false, cat: "Starters", tag: "Tonight", spice: 2, how: "Tossed hot in a heavy kadai with crushed black pepper and curry leaf, finished with lime.", hero: "Fresh coastal prawns", pair: "lime-soda", alias: ["prawn", "shrimp"] },
  { id: "chicken-65", name: "Chicken 65", line: "Crisp, red-hot, a curry leaf finish", price: 360, veg: false, cat: "Starters", tag: "Bestseller", spice: 3, how: "Marinated overnight and fried twice so the crust shatters, then tossed with curry leaf and chilli.", hero: "Guntur chilli", pair: "lime-soda", alias: ["chicken 65", "65"] },
  { id: "paneer-tikka", name: "Paneer tikka", line: "Char-grilled, with mint chutney", price: 340, veg: true, cat: "Starters", spice: 1, how: "Marinated in hung curd and ajwain, then grilled until the edges blister.", hero: "Charcoal char", pair: "lime-soda", alias: ["paneer", "tikka"] },
  { id: "chicken-fry", name: "Andhra chicken fry", line: "Dry-roasted with chilli and curry leaf", price: 420, veg: false, cat: "Mains", spice: 3, how: "Dry-roasted slowly with whole red chillies and curry leaf. No gravy, so every piece is coated.", hero: "Whole dried chilli", pair: "lime-soda", alias: ["chicken fry", "andhra chicken"] },
  { id: "fish-curry", name: "Coastal fish curry", line: "Tamarind, coconut, a slow simmer", price: 520, veg: false, cat: "Mains", spice: 2, how: "Simmered low in tamarind and coconut so the fish stays tender and the gravy turns glossy.", hero: "Tamarind", pair: "lime-soda", alias: ["fish"] },
  { id: "keema", name: "Mutton keema", line: "Peas, coriander, buttered pav alongside", price: 460, veg: false, cat: "Mains", spice: 2, how: "Minced mutton cooked down with onion, tomato and peas until nearly dry, served with buttered pav.", hero: "Slow-cooked mutton", pair: "lime-soda", alias: ["keema", "mutton"] },
  { id: "biryani", name: "Avakai chicken biryani", line: "Raw mango pickle masala, saffron rice", price: 440, veg: false, cat: "Biryani", tag: "Chef's pick", spice: 2, how: "A raw mango pickle masala gives it a tang you will not find in a standard dum biryani. Sealed and steamed with saffron rice.", hero: "Avakai", pair: "lime-soda", alias: ["biryani", "biriyani"] },
  { id: "dosa", name: "Ghee roast dosa", line: "Crisp, with two chutneys", price: 220, veg: true, cat: "Tiffin", spice: 1, how: "Fermented batter spread paper thin and roasted with ghee until it shatters.", hero: "Ghee", pair: "filter-coffee", alias: ["dosa"] },
  { id: "idli-sambar", name: "Idli sambar", line: "Soft, with drumstick sambar", price: 180, veg: true, cat: "Tiffin", spice: 1, how: "Steamed soft, with a sambar built on drumstick and tamarind.", hero: "Drumstick", pair: "filter-coffee", alias: ["idli", "sambar"] },
  { id: "payasam", name: "Kaju payasam", line: "Cashew and cardamom, served warm", price: 190, veg: true, cat: "Sweet", spice: 0, how: "Cashews fried in ghee, then simmered in milk and cardamom until it thickens.", hero: "Cashew", pair: "filter-coffee", alias: ["payasam", "kheer"] },
  { id: "gulab-jamun", name: "Saffron jalebi", line: "Hot and crisp, soaked in rose syrup", price: 170, veg: true, cat: "Sweet", spice: 0, how: "Batter piped into hot ghee, then soaked in saffron and rose syrup.", hero: "Saffron", pair: "filter-coffee", alias: ["jalebi"] },
  { id: "lime-soda", name: "Fresh lime soda", line: "Sweet, salted or both", price: 120, veg: true, cat: "Drinks", spice: 0, how: "Fresh lime pressed to order and topped with soda. Sweet, salted or both.", hero: "Fresh lime", pair: "chicken-65", alias: ["lime", "soda"] },
  { id: "filter-coffee", name: "Filter coffee", line: "Strong, frothed, in a davara", price: 110, veg: true, cat: "Drinks", spice: 0, how: "A slow-brewed decoction, frothed with hot milk and poured from a height.", hero: "Chicory blend", pair: "payasam", alias: ["coffee"] },
];
export const BY_ID: Record<string, Dish> = Object.fromEntries(MENU.map((d) => [d.id, d]));
export const CATS = ["All", "Starters", "Mains", "Biryani", "Tiffin", "Sweet", "Drinks"];
const GUESTS: Record<string, string> = { Ravi: AV.turmeric, Meera: AV.ember, You: "#7aa14a" };
export const NOTES = ["Less spicy", "Extra spicy", "No onion"];
export const SERVICES: { k: ServiceKind; label: string; done: string }[] = [
  { k: "water", label: "Water", done: "Water is on its way" },
  { k: "napkins", label: "Napkins", done: "Napkins are on their way" },
  { k: "cutlery", label: "Cutlery", done: "Cutlery is on its way" },
  { k: "waiter", label: "Server", done: "A server is coming" },
  { k: "bill", label: "Bill", done: "The bill is on its way" },
];

type Line = { uid: number; id: string; who: string; qty: number; note?: string };
let UID = 10;
const SEED: Line[] = [
  { uid: 1, id: "chicken-65", who: "Ravi", qty: 1 },
  { uid: 2, id: "lime-soda", who: "Meera", qty: 1 },
  { uid: 3, id: "biryani", who: "You", qty: 1 },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// ---- the stand-in host: a keyword reader, labelled as scripted in the chat itself
type Lang = "en" | "te" | "hi";
const langOf = (t: string): Lang => (/[ఀ-౿]|telugu|cheppandi|kavali|baagundi/i.test(t) ? "te" : /[ऀ-ॿ]|hindi|chahiye|batao|bataiye|teekha/i.test(t) ? "hi" : "en");
const ALIASES = MENU.flatMap((d) => d.alias.map((a) => ({ a, id: d.id }))).sort((x, y) => y.a.length - x.a.length);
const findDish = (t: string): { id: string; rest: string } | null => {
  const l = t.toLowerCase();
  for (const { a, id } of ALIASES) { if (l.includes(a)) return { id, rest: l.replace(a, " ") }; }
  return null;
};
const qtyOf = (t: string) => {
  const w: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, a: 1 };
  const m = /\b(\d+|one|two|three|four)\b/.exec(t);
  if (!m) return 1;
  return Math.min(6, Number.isNaN(Number(m[1])) ? w[m[1]] : Number(m[1]));
};

const INTENT_TEXT: Record<string, Record<Lang, string>> = {
  spicy: {
    en: "Start with the Chicken 65: crisp and red-hot. A fresh lime soda takes the edge off.",
    te: "కారంగా కావాలంటే చికెన్ 65 ట్రై చేయండి. కరకరలాడుతుంది, లైమ్ సోడాతో చాలా బాగుంటుంది.",
    hi: "तीखा चाहिए तो चिकन 65 लीजिए: कुरकुरा और लाल मिर्च वाला। साथ में फ्रेश लाइम सोडा।",
  },
  veg: {
    en: "Paneer tikka to share, then a ghee roast dosa for the table.",
    te: "శాకాహారం అయితే పనీర్ టిక్కా షేర్ చేసుకోండి, తర్వాత నెయ్యి రోస్ట్ దోశ.",
    hi: "शाकाहारी में पनीर टिक्का शेयर कीजिए, फिर घी रोस्ट डोसा।",
  },
  sweet: {
    en: "Two ways to end it: warm kaju payasam, or hot saffron jalebi if you like it sticky.",
    te: "తీపి కోసం వేడి జీడిపప్పు పాయసం లేదా జిలేబీ ప్రయత్నించండి.",
    hi: "मीठे में गरम काजू पायसम या जलेबी।",
  },
  pop: {
    en: "Most tables open with the Chicken 65 and the prawn pepper fry, then share a biryani.",
    te: "చాలా టేబుళ్లు చికెన్ 65, ప్రాన్ పెప్పర్ ఫ్రైతో మొదలుపెడతాయి, తర్వాత బిర్యానీ షేర్ చేస్తారు.",
    hi: "ज़्यादातर टेबल चिकन 65 और प्रॉन पेपर फ्राई से शुरू करते हैं, फिर बिरयानी शेयर करते हैं।",
  },
};
const INTENT_PICKS: Record<string, string[]> = { spicy: ["chicken-65", "lime-soda"], veg: ["paneer-tikka", "dosa"], sweet: ["payasam", "gulab-jamun"], pop: ["chicken-65", "prawn-pepper", "biryani"] };

export function DishArt({ id, size = 64, radius = 14 }: { id: string; size?: number; radius?: number }) {
  return <img src={`/case/aavira/dishes/${id}.webp`} alt={BY_ID[id]?.name ?? ""} width={size} height={size} loading="lazy" draggable={false} style={{ width: size, height: size, borderRadius: radius, objectFit: "cover" }} className="shrink-0" />;
}

export const Dot = ({ veg }: { veg: boolean }) => (
  <span className="inline-flex items-center justify-center w-[13px] h-[13px] rounded-[3px] border" style={{ borderColor: veg ? "#5fa05a" : "#c0431f" }} aria-label={veg ? "Vegetarian" : "Non vegetarian"}>
    <span className="block w-[6px] h-[6px] rounded-full" style={{ background: veg ? "#5fa05a" : "#c0431f" }} />
  </span>
);

export const Chilis = ({ n }: { n: number }) => (
  <span className="inline-flex gap-0.5" aria-label={`Spice level ${n} of 3`}>{[1, 2, 3].map((i) => <i key={i} className="w-2 h-2 rounded-full" style={{ background: i <= n ? AV.ember : AV.line }} />)}</span>
);

const Icon = ({ d, active }: { d: string; active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={active ? AV.turmeric : AV.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ICONS = {
  menu: "M5 5h14M5 12h14M5 19h9",
  host: "M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12Z",
  cart: "M6 6h15l-2 9H8L6 6Zm0 0L5 3H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  you: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0",
};

// A cart row: quantity stepper, a note, and swipe-left (or the x) to remove.
function CartRow({ l, onQty, onNote, onRemove, locked }: { l: Line; onQty: (d: number) => void; onNote: (n: string | undefined) => void; onRemove: () => void; locked: boolean }) {
  const [dx, setDx] = useState(0);
  const [noting, setNoting] = useState(false);
  const start = useRef<number | null>(null);
  const d = BY_ID[l.id];
  const onDown = (e: RPointerEvent) => { if (!locked) start.current = e.clientX; };
  const onMove = (e: RPointerEvent) => { if (start.current !== null) setDx(Math.max(-84, Math.min(0, e.clientX - start.current))); };
  const onUp = () => { start.current = null; setDx((v) => (v < -44 ? -84 : 0)); };
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <button type="button" onClick={onRemove} aria-label={`Remove ${d.name}`} className="absolute inset-y-0 right-0 w-[84px] text-[12px] font-semibold" style={{ background: "#8a2c14", color: "#fff" }}>Remove</button>
      <div onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} className="relative p-2.5" style={{ background: AV.surface, border: `1px solid ${AV.line}`, borderRadius: 16, transform: `translateX(${dx}px)`, transition: start.current === null ? "transform .2s" : "none", touchAction: "pan-y" }}>
        <div className="flex items-center gap-3">
          <DishArt id={l.id} size={46} />
          <div className="flex-1 min-w-0">
            <div className="font-display text-[15px] leading-tight">{d.name}</div>
            <div className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: AV.muted }}><i className="w-2 h-2 rounded-full" style={{ background: GUESTS[l.who] }} />added by {l.who}</div>
            {l.note && <div className="text-[11px] mt-0.5 italic" style={{ color: AV.turmeric }}>{l.note}</div>}
          </div>
          <div className="text-right">
            <div className="text-[13px] font-medium">{inr(d.price * l.qty)}</div>
            {!locked && (
              <div className="mt-1 inline-flex items-center rounded-full" style={{ border: `1px solid ${AV.line}` }}>
                <button type="button" onClick={() => (l.qty > 1 ? onQty(-1) : onRemove())} aria-label={`Fewer ${d.name}`} className="w-8 h-8 text-[16px] leading-none">−</button>
                <span className="w-5 text-center text-[12px]" aria-live="polite">{l.qty}</span>
                <button type="button" onClick={() => onQty(1)} aria-label={`More ${d.name}`} className="w-8 h-8 text-[16px] leading-none">+</button>
              </div>
            )}
          </div>
        </div>
        {!locked && (
          <div className="mt-2 pl-[58px]">
            {!noting ? (
              <button type="button" onClick={() => setNoting(true)} className="text-[11px] underline underline-offset-4" style={{ color: AV.muted }}>{l.note ? "Change note" : "Add a note for the kitchen"}</button>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {NOTES.map((n) => <button key={n} type="button" aria-pressed={l.note === n} onClick={() => { onNote(l.note === n ? undefined : n); setNoting(false); }} className="px-2.5 py-1 rounded-full text-[11px]" style={{ background: l.note === n ? AV.turmeric : AV.ink, color: l.note === n ? AV.ink : AV.cream, border: `1px solid ${AV.line}` }}>{n}</button>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function AaviraPrototype({
  screen: controlled,
  onScreen,
  className,
  onOrder,
  onCall,
  onEvent,
  status,
}: {
  screen?: Screen;
  onScreen?: (s: Screen) => void;
  className?: string;
  onOrder?: (lines: OrderLine[], total: number) => void;
  onCall?: (kind: ServiceKind) => void;
  onEvent?: () => void;
  status?: "new" | "cooking" | "ready" | "served" | null;
}) {
  const [screen, setScreen] = useState<Screen>(controlled ?? "scan");
  useEffect(() => { if (controlled) setScreen(controlled); }, [controlled]);
  const go = (s: Screen) => { setScreen(s); onScreen?.(s); };

  const [cat, setCat] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [chefOpen, setChefOpen] = useState(false);
  const [cart, setCart] = useState<Line[]>(SEED);
  const cartRef = useRef(cart);
  cartRef.current = cart;
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState(false);
  const [interested, setInterested] = useState(false);
  type Msg = { from: "host" | "me"; text: string; picks?: string[]; chef?: string };
  const [chat, setChat] = useState<Msg[]>([{ from: "host", text: "Good evening, I'm Aira, tonight's host. Ask me about a dish, or tell me what you want and I will put it on the table." }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timer = useRef<number>(0);
  const chatEnd = useRef<HTMLDivElement>(null);

  const say = (t: string) => {
    setToast(t);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(""), 1700);
  };

  const add = (id: string, o: { qty?: number; note?: string; who?: string; quiet?: boolean } = {}) => {
    const who = o.who ?? "You";
    const qty = o.qty ?? 1;
    setCart((c) => {
      const hit = c.find((l) => l.id === id && l.who === who && l.note === o.note);
      return hit ? c.map((l) => (l === hit ? { ...l, qty: l.qty + qty } : l)) : [...c, { uid: UID++, id, who, qty, note: o.note }];
    });
    setSent(false);
    if (!o.quiet) say(`${BY_ID[id].name} added to the table`);
  };
  const setQty = (uid: number, d: number) => setCart((c) => c.map((l) => (l.uid === uid ? { ...l, qty: Math.max(1, l.qty + d) } : l)));
  const setNote = (uid: number, note?: string) => setCart((c) => c.map((l) => (l.uid === uid ? { ...l, note } : l)));
  const removeLine = (uid: number) => setCart((c) => c.filter((l) => l.uid !== uid));

  const subtotal = useMemo(() => cart.reduce((s, l) => s + BY_ID[l.id].price * l.qty, 0), [cart]);
  const sweets = cart.filter((l) => BY_ID[l.id].cat === "Sweet");
  const perk = sweets.length ? Math.min(...sweets.map((l) => BY_ID[l.id].price)) : 0;
  const total = subtotal - perk;
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const sendOrder = () => {
    const c = cartRef.current;
    if (!c.length) return;
    const sub = c.reduce((s, l) => s + BY_ID[l.id].price * l.qty, 0);
    const sw = c.filter((l) => BY_ID[l.id].cat === "Sweet");
    const pk = sw.length ? Math.min(...sw.map((l) => BY_ID[l.id].price)) : 0;
    setSent(true);
    onOrder?.(c.map((l) => ({ name: BY_ID[l.id].name, who: l.who, price: BY_ID[l.id].price, qty: l.qty, note: l.note })), sub - pk);
  };
  const service = (k: ServiceKind) => { say(SERVICES.find((s) => s.k === k)!.done); onCall?.(k); };
  const toggleInterest = () => { if (!interested) { setInterested(true); onEvent?.(); say("Noted. We will save you a spot near the stage"); } };

  // ---- the host
  const reply = (raw: string): Omit<Msg, "from"> => {
    const t = raw.trim();
    const l = t.toLowerCase();
    const lang = langOf(t);
    const dish = findDish(t);
    const name = dish ? BY_ID[dish.id].name : "";

    if (confirming) {
      setConfirming(false);
      if (/\b(yes|yeah|yep|confirm|go ahead|send|ok|okay|sure)\b|అవును|हाँ|haan/i.test(l)) { sendOrder(); return { text: "Sent. The kitchen has it, about 18 minutes. I will keep an eye on it." }; }
      return { text: "No problem, I have not sent anything. Tell me what to change." };
    }
    const svc = /\b(water)\b/.test(l) ? "water" : /\b(napkin|napkins|tissue|tissues)\b/.test(l) ? "napkins" : /\b(cutlery|spoon|fork|knife)\b/.test(l) ? "cutlery" : /\b(bill|check)\b/.test(l) ? "bill" : /\b(waiter|server|someone)\b/.test(l) ? "waiter" : null;
    if (svc && /(bring|send|get|need|can i|could i|please|want|call|ask|\bbill\b)/.test(l)) { service(svc); return { text: `Done. ${SERVICES.find((s) => s.k === svc)!.done.replace(/^./, (c) => c.toUpperCase())}.` }; }
    if (/place (my|the) order|send (it|my order)|that'?s (all|everything)|order now/.test(l)) {
      const c = cartRef.current;
      if (!c.length) return { text: "The table's empty right now. What shall I add?" };
      const recap = c.map((x) => `${x.qty}× ${BY_ID[x.id].name}${x.note ? ` (${x.note.toLowerCase()})` : ""}`).join(", ");
      setConfirming(true);
      return { text: `Here is what I have: ${recap}. That comes to ${inr(total)}. Shall I send it to the kitchen?` };
    }
    if (dish && /\b(remove|cancel|take off|delete|drop)\b/.test(l)) {
      const c = cartRef.current.filter((x) => x.id === dish.id);
      if (!c.length) return { text: `The ${name} is not on the table, so there is nothing to remove.` };
      setCart((cur) => cur.filter((x) => x.id !== dish.id));
      return { text: `Removed the ${name}.` };
    }
    const noteM = /(less spic|mild|not (so )?spicy|extra spic|more spic|no onion)/.exec(l);
    if (noteM && !/\b(add|order|get me|i'?ll have)\b/.test(l.replace(/\b(less|extra|more)\b/, ""))) {
      const note = /no onion/.test(noteM[0]) ? "No onion" : /extra|more/.test(noteM[0]) ? "Extra spicy" : "Less spicy";
      const target = dish ? cartRef.current.find((x) => x.id === dish.id) : cartRef.current[cartRef.current.length - 1];
      if (!target) return { text: "Put the dish on the table first and I will pass the note to the kitchen." };
      setCart((cur) => cur.map((x) => (x.uid === target.uid ? { ...x, note } : x)));
      return { text: `Noted: ${note.toLowerCase()} on the ${BY_ID[target.id].name}.` };
    }
    if (dish && /\b(add|order|get me|i'?ll have|i will have|give me|want)\b/.test(l)) {
      const q = qtyOf(dish.rest);
      const note = /less spic|mild/.test(l) ? "Less spicy" : /extra spic/.test(l) ? "Extra spicy" : undefined;
      add(dish.id, { qty: q, note, quiet: true });
      return { text: `Added ${q > 1 ? `${q} ` : ""}${name}${q > 1 ? "s" : ""}${note ? `, ${note.toLowerCase()}` : ""}. Anything to go with it?`, picks: [BY_ID[dish.id].pair] };
    }
    if (/music|event|live|tonight|band|gig/.test(l) && !dish) {
      if (/(interested|count me|sign me|rsvp|in\b)/.test(l)) { toggleInterest(); return { text: "Done, you are on the list for tonight's live set." }; }
      return { text: "Coastal Strings play live at 9 pm tonight. Want me to put your table on the list?" };
    }
    if (/(count me in|i'?m interested|sign me up)/.test(l)) { toggleInterest(); return { text: "Done, you are on the list for tonight's live set." }; }
    if (dish) {
      const d = BY_ID[dish.id];
      const pair = BY_ID[d.pair];
      return { text: `${d.how} It is ${inr(d.price)}. ${pair ? `I would pair it with the ${pair.name}.` : ""}`, picks: [d.id], chef: `Chef's note · hero ingredient: ${d.hero}` };
    }
    const k = /spic|hot|fiery|kharam|కార|तीखा|teekha/.test(l) ? "spicy" : /veg|paneer/.test(l) && !/non/.test(l) || /శాక|शाक/.test(l) ? "veg" : /sweet|dessert|తీపి|मीठ/.test(l) ? "sweet" : /popular|best|recommend|good|famous|చాలా|ज़्यादा/.test(l) ? "pop" : null;
    if (k) return { text: INTENT_TEXT[k][lang], picks: INTENT_PICKS[k] };
    if (lang !== "en") return { text: lang === "te" ? "తప్పకుండా. ఏం కావాలో చెప్పండి: కారంగా, శాకాహారం, లేదా తీపి?" : "ज़रूर। बताइए, तीखा, शाकाहारी या कुछ मीठा?" };
    return { text: "I can only speak for what we serve tonight. Ask me about a dish, say what you are in the mood for, or tell me to add something." };
  };

  const ask = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setChat((m) => [...m, { from: "me", text: t }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      const r = reply(t);
      setTyping(false);
      setChat((m) => [...m, { from: "host", ...r }]);
    }, 700);
  };
  useEffect(() => { chatEnd.current?.scrollIntoView({ block: "end" }); }, [chat, typing]);
  const askAbout = (id: string) => { setOpen(null); go("host"); window.setTimeout(() => ask(`Tell me about the ${BY_ID[id].name}`), 150); };

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
    <button type="button" onClick={() => go(s)} className="av-press flex flex-col items-center gap-1 py-2 px-3 relative min-w-[64px]" aria-current={screen === s} aria-label={label}>
      <Icon d={d} active={screen === s} />
      <span className="text-[11px] tracking-wide" style={{ color: screen === s ? AV.turmeric : AV.muted }}>{label}</span>
      {s === "cart" && count > 0 && (
        <span key={count} className="av-pop absolute top-0.5 right-2 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-semibold grid place-items-center" style={{ background: AV.ember, color: "#fff" }}>{count}</span>
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
              <p className="mt-3 text-[11px] tracking-[0.2em] uppercase" style={{ color: AV.muted }}>coastal kitchen and bar</p>
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
              <div className="px-5 pb-2 grid gap-2">
                <button type="button" onClick={() => setOpen("prawn-pepper")} className="rounded-2xl px-4 py-2.5 flex items-center gap-3 text-left" style={{ background: `linear-gradient(120deg, ${AV.surfaceHi}, #2a1c12)`, border: `1px solid ${AV.line}` }}>
                  <DishArt id="prawn-pepper" size={46} radius={12} />
                  <div><div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: AV.turmeric }}>Tonight's special</div><div className="font-display text-[16px] leading-tight">Prawn pepper fry</div></div>
                </button>
                <div className="rounded-2xl px-4 py-2 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                  <div className="flex-1 min-w-0"><div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: AV.turmeric }}>Live tonight · 9 pm</div><div className="text-[13px] leading-tight mt-0.5">Coastal Strings on the terrace</div></div>
                  <button type="button" onClick={toggleInterest} aria-pressed={interested} className="px-3 py-1.5 rounded-full text-[11.5px] font-semibold shrink-0" style={{ background: interested ? "transparent" : AV.turmeric, color: interested ? AV.turmeric : AV.ink, border: `1px solid ${AV.turmeric}` }}>{interested ? "You're on the list" : "I'm interested"}</button>
                </div>
              </div>
              <div className="px-5 pb-3 pt-1 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }} role="tablist">
                <button type="button" onClick={() => setVegOnly((v) => !v)} aria-pressed={vegOnly} className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap inline-flex items-center gap-1.5" style={{ background: vegOnly ? "#2f4a2b" : AV.surface, color: vegOnly ? "#bfe3b6" : AV.muted, border: `1px solid ${vegOnly ? "#5fa05a" : AV.line}` }}><Dot veg />Veg</button>
                {CATS.map((c) => (
                  <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className="px-3.5 py-1.5 rounded-full text-[12px] whitespace-nowrap" style={{ background: cat === c ? AV.turmeric : AV.surface, color: cat === c ? AV.ink : AV.muted, border: `1px solid ${cat === c ? AV.turmeric : AV.line}` }}>{c}</button>
                ))}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 flex flex-col gap-2.5">
                {shown.length === 0 && <p className="text-center text-[13px] py-8" style={{ color: AV.muted }}>Nothing here for that filter.</p>}
                {shown.map((d) => (
                  <div key={d.id} className="rounded-2xl p-2.5 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                    <button type="button" onClick={() => { setChefOpen(false); setOpen(d.id); }} aria-label={`Details for ${d.name}`} className="shrink-0"><DishArt id={d.id} size={84} /></button>
                    <div className="min-w-0 flex-1 cursor-pointer" onClick={() => { setChefOpen(false); setOpen(d.id); }}>
                      <div className="flex items-center gap-2"><Dot veg={d.veg} />{d.tag && <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: AV.turmeric }}>{d.tag}</span>}</div>
                      <div className="font-display text-[16px] leading-tight mt-1">{d.name}</div>
                      <div className="text-[11.5px] leading-snug mt-0.5" style={{ color: AV.muted }}>{d.line}</div>
                      <div className="text-[13px] mt-1.5 font-medium">{inr(d.price)}</div>
                    </div>
                    <button type="button" onClick={() => add(d.id)} aria-label={`Add ${d.name}`} className="av-press w-9 h-9 rounded-full text-[20px] leading-none grid place-items-center shrink-0" style={{ background: AV.turmeric, color: AV.ink }}>+</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- HOST */}
          {screen === "host" && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="px-5 pt-2 pb-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center font-display text-[18px]" style={{ background: AV.surfaceHi, color: AV.turmeric, border: `1px solid ${AV.line}` }}>A</div>
                <div><div className="font-display text-[18px] leading-none">Aira</div><div className="text-[11px] mt-1" style={{ color: AV.muted }}>Host and chef's voice · speaks your language</div></div>
              </div>
              <p className="px-5 pb-2 text-[10.5px] leading-snug" style={{ color: AV.dim }}>Demo host with scripted replies. The real one runs on Claude, grounded in the live menu.</p>
              <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-3 flex flex-col gap-3">
                {chat.map((m, i) => (
                  <div key={i} className={`av-rise ${m.from === "me" ? "self-end max-w-[80%]" : "self-start max-w-[90%]"}`}>
                    <div className="rounded-2xl px-4 py-2.5 text-[13.5px] leading-snug" style={{ background: m.from === "me" ? AV.turmeric : AV.surface, color: m.from === "me" ? AV.ink : AV.cream, border: m.from === "me" ? "none" : `1px solid ${AV.line}` }}>{m.text}</div>
                    {m.chef && <div className="mt-1 text-[10.5px] tracking-wide" style={{ color: AV.turmeric }}>{m.chef}</div>}
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
                <div ref={chatEnd} />
              </div>
              <div className="px-5 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {["Something spicy", "Vegetarian", "Tell me about the biryani", "Add two lime sodas", "Make it less spicy", "కారంగా ఏముంది?", "Bring water", "Place my order"].map((c) => (
                  <button key={c} type="button" onClick={() => ask(c)} className="px-3.5 py-2 rounded-full text-[12px] whitespace-nowrap" style={{ background: AV.surface, border: `1px solid ${AV.line}`, color: AV.cream }}>{c}</button>
                ))}
              </div>
              <form className="px-5 pb-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(draft); }}>
                <input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Message Aira" placeholder="Ask about a dish, or what you want" className="flex-1 rounded-full px-4 py-2.5 text-[13px] outline-none" style={{ background: AV.surface, border: `1px solid ${AV.line}`, color: AV.cream }} />
                <button type="submit" disabled={!draft.trim() || typing} className="px-4 rounded-full text-[13px] font-semibold disabled:opacity-40" style={{ background: AV.turmeric, color: AV.ink }}>Send</button>
              </form>
            </div>
          )}

          {/* ---------------------------------------------------------------- CART */}
          {screen === "cart" && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="px-5 pt-2 pb-2">
                <div className="font-display text-[22px] leading-none">The table's order</div>
                <div className="mt-2 flex items-center gap-2">
                  {Object.entries(GUESTS).map(([n, c]) => <span key={n} className="inline-flex items-center gap-1.5 text-[11px] rounded-full pl-1 pr-2.5 py-1" style={{ background: AV.surface, border: `1px solid ${AV.line}`, color: AV.muted }}><i className="w-4 h-4 rounded-full grid place-items-center text-[9px] not-italic font-bold" style={{ background: c, color: AV.ink }}>{n[0]}</i>{n}</span>)}
                </div>
              </div>
              <div className="px-5 pb-2 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }} aria-label="Ask for something at the table">
                {SERVICES.map((s) => <button key={s.k} type="button" onClick={() => service(s.k)} className="av-press px-3 py-1.5 rounded-full text-[11.5px] whitespace-nowrap" style={{ border: `1px solid ${AV.line}`, color: AV.cream, background: AV.surface }}>{s.label}</button>)}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-5 flex flex-col gap-2.5 pb-3">
                {cart.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-[13px]" style={{ color: AV.muted }}>The table is empty.</p>
                    <button type="button" onClick={() => go("menu")} className="mt-4 px-5 py-2.5 rounded-full text-[13px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Browse the menu</button>
                  </div>
                )}
                {cart.map((l) => <div key={l.uid}><CartRow l={l} locked={sent} onQty={(d) => setQty(l.uid, d)} onNote={(n) => setNote(l.uid, n)} onRemove={() => removeLine(l.uid)} /></div>)}
              </div>
              <div className="px-5 pb-3 pt-2" style={{ borderTop: `1px solid ${AV.line}` }}>
                {sent ? (
                  <div className="rounded-2xl p-4" style={{ background: AV.surfaceHi, border: `1px solid ${AV.turmeric}55` }} role="status">
                    <div className="font-display text-[19px]" style={{ color: AV.turmeric }}>{!status || status === "new" ? "Sent to the kitchen" : status === "cooking" ? "The kitchen is on it" : status === "ready" ? "Ready, on its way" : "Enjoy your meal"}</div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {["Sent", "Cooking", "Ready", "Served"].map((t, i) => {
                        const at = ["new", "cooking", "ready", "served"].indexOf(status ?? "new");
                        return <div key={t} className="flex-1"><div className="h-1.5 rounded-full" style={{ background: i <= at ? AV.turmeric : AV.line }} /><div className="mt-1 text-[10px] text-center" style={{ color: i <= at ? AV.cream : AV.muted }}>{t}</div></div>;
                      })}
                    </div>
                    <button type="button" onClick={() => { setSent(false); setCart([]); }} className="mt-4 w-full text-[12px] underline underline-offset-4" style={{ color: AV.muted }}>Order another round</button>
                  </div>
                ) : (
                  <>
                    <dl className="text-[13px] grid gap-1">
                      <div className="flex justify-between"><dt style={{ color: AV.muted }}>Subtotal · {count} item{count === 1 ? "" : "s"}</dt><dd>{inr(subtotal)}</dd></div>
                      {perk > 0 ? <div className="av-rise flex justify-between" style={{ color: "#9ccf8f" }}><dt>Meera's birthday dessert, on us</dt><dd>−{inr(perk)}</dd></div> : <div className="flex justify-between text-[12px]" style={{ color: AV.muted }}><dt>Add a dessert and Meera's is on us</dt><dd>−</dd></div>}
                      <div className="flex justify-between pt-1.5 mt-1 font-semibold text-[16px]" style={{ borderTop: `1px solid ${AV.line}` }}><dt>Total</dt><dd>{inr(total)}</dd></div>
                      <p className="text-[11px]" style={{ color: AV.dim }}>Taxes are shown on the final bill. One offer applies, never two.</p>
                    </dl>
                    <button type="button" onClick={sendOrder} disabled={!cart.length} className="mt-3 w-full rounded-full py-3.5 text-[14px] font-semibold disabled:opacity-40" style={{ background: AV.turmeric, color: AV.ink }}>Send to the kitchen</button>
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
                <div className="font-display text-[22px] leading-tight mt-2 max-w-[200px]">A dessert is on us tonight</div>
                <p className="text-[12.5px] mt-2 max-w-[210px]" style={{ color: AV.muted }}>Applied automatically. We always apply the single best perk, so offers never stack.</p>
                <div className="absolute -right-3 -bottom-3"><DishArt id="payasam" size={104} radius={52} /></div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                <div className="flex items-center justify-between text-[12px]" style={{ color: AV.muted }}><span>Your tier</span><span style={{ color: AV.turmeric }}>Insider</span></div>
                <div className="mt-3 flex items-center gap-1.5">
                  {["Guest", "Regular", "Insider", "House"].map((t, i) => <div key={t} className="flex-1"><div className="h-1.5 rounded-full" style={{ background: i <= 2 ? AV.turmeric : AV.line }} /><div className="mt-1.5 text-[10.5px] text-center" style={{ color: i <= 2 ? AV.cream : AV.muted }}>{t}</div></div>)}
                </div>
                <p className="mt-3 text-[12px]" style={{ color: AV.muted }}>Four more visits to reach House: a reserved table on busy nights.</p>
              </div>
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                <DishArt id="biryani" size={52} />
                <div className="flex-1"><div className="text-[10px] tracking-[0.16em] uppercase" style={{ color: AV.muted }}>Your usual</div><div className="font-display text-[16px] leading-tight">Avakai chicken biryani</div></div>
                <button type="button" onClick={() => add("biryani", { who: "Meera" })} className="px-3.5 py-2 rounded-full text-[11.5px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add again</button>
              </div>
              <button type="button" onClick={() => go("feedback")} className="rounded-2xl p-4 text-left flex items-center justify-between" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                <span><span className="block font-display text-[16px]">How was tonight?</span><span className="block text-[12px] mt-0.5" style={{ color: AV.muted }}>Ten seconds, and a code for next time</span></span>
                <span aria-hidden style={{ color: AV.turmeric }}>→</span>
              </button>
            </div>
          )}

          {/* ---------------------------------------------------------------- FEEDBACK */}
          {screen === "feedback" && (
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-4 flex flex-col items-center text-center">
              {done ? (
                <div className="mt-6 w-full" role="status">
                  <div className="font-display text-[26px] leading-tight">Thank you, that helps.</div>
                  <p className="mt-2 text-[13px]" style={{ color: AV.muted }}>{stars <= 2 ? "We are sorry it fell short. The manager has your note and will reach out." : "Here is something for next time."}</p>
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
                        <svg viewBox="0 0 24 24" width="34" height="34"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z" fill={s <= stars ? AV.turmeric : "none"} stroke={s <= stars ? AV.turmeric : AV.muted} strokeWidth="1.5" strokeLinejoin="round" /></svg>
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
          {open && BY_ID[open] && (() => {
            const d = BY_ID[open];
            const pair = BY_ID[d.pair];
            return (
              <div className="av-fade absolute inset-0 z-20 flex flex-col justify-end" role="dialog" aria-label={d.name} style={{ background: "rgba(5,4,4,.62)" }} onClick={() => setOpen(null)}>
                <div className="av-sheet rounded-t-[28px] overflow-hidden max-h-[88%] overflow-y-auto" style={{ background: AV.surface, borderTop: `1px solid ${AV.line}` }} onClick={(e) => e.stopPropagation()}>
                  <div className="relative">
                    <img src={`/case/aavira/dishes/${open}.webp`} alt={d.name} className="w-full h-[210px] object-cover" />
                    <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center text-[18px]" style={{ background: "rgba(14,12,11,.75)", color: AV.cream }}>×</button>
                  </div>
                  <div className="px-5 pt-4 pb-6">
                    <div className="flex items-center gap-2"><Dot veg={d.veg} />{d.tag && <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: AV.turmeric }}>{d.tag}</span>}<span className="ml-auto flex items-center gap-1.5 text-[11px]" style={{ color: AV.muted }}>Spice <Chilis n={d.spice} /></span></div>
                    <div className="font-display text-[24px] leading-tight mt-1.5">{d.name}</div>
                    <p className="text-[13px] leading-snug mt-1.5" style={{ color: AV.muted }}>{d.line}.</p>
                    <button type="button" onClick={() => setChefOpen((v) => !v)} aria-expanded={chefOpen} className="mt-3 w-full rounded-2xl px-4 py-2.5 text-left flex items-center justify-between text-[13px]" style={{ background: AV.surfaceHi, border: `1px solid ${AV.line}` }}>
                      <span><span style={{ color: AV.turmeric }}>Ask the chef</span> · how it is made</span><span aria-hidden>{chefOpen ? "−" : "+"}</span>
                    </button>
                    {chefOpen && (
                      <div className="mt-2 rounded-2xl p-4 text-[12.5px] leading-relaxed" style={{ background: AV.ink, border: `1px solid ${AV.line}`, color: AV.muted }}>
                        <p>{d.how}</p>
                        <p className="mt-2"><span style={{ color: AV.cream }}>Hero ingredient:</span> {d.hero}</p>
                        {pair && <p className="mt-1"><span style={{ color: AV.cream }}>Pairs with:</span> {pair.name} <button type="button" onClick={() => add(pair.id)} className="ml-1 underline underline-offset-4" style={{ color: AV.turmeric }}>add it</button></p>}
                        <button type="button" onClick={() => askAbout(d.id)} className="mt-3 text-[12px] underline underline-offset-4" style={{ color: AV.turmeric }}>Ask Aira more</button>
                      </div>
                    )}
                    <button type="button" onClick={() => { add(open); setOpen(null); }} className="mt-4 w-full rounded-full py-3.5 text-[14px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add to the table · {inr(d.price)}</button>
                  </div>
                </div>
              </div>
            );
          })()}

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
