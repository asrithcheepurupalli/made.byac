import { BY_ID, MENU, SERVICES, inr, type ServiceKind } from "./Prototype";

// Aira's reading of what a guest types, for the full order page. A keyword reader standing in for
// the real host (which runs on Claude and is grounded in the live menu). It never invents a dish:
// everything it says comes from MENU. It acts on the table only on a clear instruction, and it reads
// the order back and waits for a yes before it sends.

export type AiraLine = { uid: number; id: string; qty: number; note?: string; who: string };
export type AiraCtx = {
  lines: AiraLine[];
  total: number;
  confirming: boolean;
  setConfirming: (b: boolean) => void;
  add: (id: string, o: { qty?: number; note?: string }) => void;
  removeDish: (id: string) => void;
  setNote: (uid: number, note: string) => void;
  service: (k: ServiceKind) => void;
  interested: () => void;
  send: () => void;
};
export type AiraReply = { text: string; picks?: string[]; chef?: string };

type Lang = "en" | "te" | "hi";
const langOf = (t: string): Lang => (/[ఀ-౿]|telugu|cheppandi|kavali|baagundi/i.test(t) ? "te" : /[ऀ-ॿ]|hindi|chahiye|batao|bataiye|teekha/i.test(t) ? "hi" : "en");
const ALIASES = MENU.flatMap((d) => d.alias.map((a) => ({ a, id: d.id }))).sort((x, y) => y.a.length - x.a.length);
const findDish = (t: string): { id: string; rest: string } | null => {
  const l = t.toLowerCase();
  for (const { a, id } of ALIASES) if (l.includes(a)) return { id, rest: l.replace(a, " ") };
  return null;
};
const qtyOf = (t: string) => {
  const w: Record<string, number> = { one: 1, two: 2, three: 3, four: 4 };
  const m = /\b(\d+|one|two|three|four)\b/.exec(t);
  if (!m) return 1;
  return Math.min(6, Number.isNaN(Number(m[1])) ? w[m[1]] : Number(m[1]));
};

const SAY: Record<string, Record<Lang, string>> = {
  spicy: { en: "Start with the Chicken 65: crisp and red-hot. A fresh lime soda takes the edge off.", te: "కారంగా కావాలంటే చికెన్ 65 ట్రై చేయండి. కరకరలాడుతుంది, లైమ్ సోడాతో చాలా బాగుంటుంది.", hi: "तीखा चाहिए तो चिकन 65 लीजिए: कुरकुरा और लाल मिर्च वाला। साथ में फ्रेश लाइम सोडा।" },
  veg: { en: "Paneer tikka to share, then a ghee roast dosa for the table.", te: "శాకాహారం అయితే పనీర్ టిక్కా షేర్ చేసుకోండి, తర్వాత నెయ్యి రోస్ట్ దోశ.", hi: "शाकाहारी में पनीर टिक्का शेयर कीजिए, फिर घी रोस्ट डोसा।" },
  sweet: { en: "Two ways to end it: warm kaju payasam, or hot saffron jalebi if you like it sticky.", te: "తీపి కోసం వేడి జీడిపప్పు పాయసం లేదా జిలేబీ ప్రయత్నించండి.", hi: "मीठे में गरम काजू पायसम या जलेबी।" },
  pop: { en: "Most tables open with the Chicken 65 and the prawn pepper fry, then share a biryani.", te: "చాలా టేబుళ్లు చికెన్ 65, ప్రాన్ పెప్పర్ ఫ్రైతో మొదలుపెడతాయి, తర్వాత బిర్యానీ షేర్ చేస్తారు.", hi: "ज़्यादातर टेबल चिकन 65 और प्रॉन पेपर फ्राई से शुरू करते हैं, फिर बिरयानी शेयर करते हैं।" },
};
const PICKS: Record<string, string[]> = { spicy: ["chicken-65", "lime-soda"], veg: ["paneer-tikka", "dosa"], sweet: ["payasam", "gulab-jamun"], pop: ["chicken-65", "prawn-pepper", "biryani"] };

export function airaReply(raw: string, c: AiraCtx): AiraReply {
  const t = raw.trim();
  const l = t.toLowerCase();
  const lang = langOf(t);
  const dish = findDish(t);
  const name = dish ? BY_ID[dish.id].name : "";

  if (c.confirming) {
    c.setConfirming(false);
    if (/\b(yes|yeah|yep|confirm|go ahead|send|ok|okay|sure)\b|అవును|हाँ|haan/i.test(l)) { c.send(); return { text: "Sent. The kitchen has it, about 18 minutes. You can watch it in the Your table tab." }; }
    return { text: "No problem, I have not sent anything. Tell me what to change." };
  }
  const svc: ServiceKind | null = /\bwater\b/.test(l) ? "water" : /\b(napkin|napkins|tissue|tissues)\b/.test(l) ? "napkins" : /\b(cutlery|spoon|fork|knife)\b/.test(l) ? "cutlery" : /\b(bill|check)\b/.test(l) ? "bill" : /\b(waiter|server|someone)\b/.test(l) ? "waiter" : null;
  if (svc && /(bring|send|get|need|can i|could i|please|want|call|ask|\bbill\b)/.test(l)) { c.service(svc); return { text: `Done. ${SERVICES.find((s) => s.k === svc)!.done}.` }; }
  if (/place (my|the) order|send (it|my order)|that'?s (all|everything)|order now|checkout|check out/.test(l)) {
    if (!c.lines.length) return { text: "The table is empty right now. What shall I add?" };
    const recap = c.lines.map((x) => `${x.qty}× ${BY_ID[x.id].name}${x.note ? ` (${x.note.toLowerCase()})` : ""}`).join(", ");
    c.setConfirming(true);
    return { text: `Here is what I have: ${recap}. That comes to ${inr(c.total)}. Shall I send it to the kitchen?` };
  }
  if (dish && /\b(remove|cancel|take off|delete|drop)\b/.test(l)) {
    if (!c.lines.some((x) => x.id === dish.id)) return { text: `The ${name} is not on the table, so there is nothing to remove.` };
    c.removeDish(dish.id);
    return { text: `Removed the ${name}.` };
  }
  const noteM = /(less spic|mild|not (so )?spicy|extra spic|more spic|no onion)/.exec(l);
  if (noteM && !/\b(add|order|get me|i'?ll have)\b/.test(l.replace(/\b(less|extra|more)\b/, ""))) {
    const note = /no onion/.test(noteM[0]) ? "No onion" : /extra|more/.test(noteM[0]) ? "Extra spicy" : "Less spicy";
    const target = dish ? c.lines.find((x) => x.id === dish.id) : c.lines[c.lines.length - 1];
    if (!target) return { text: "Put the dish on the table first and I will pass the note to the kitchen." };
    c.setNote(target.uid, note);
    return { text: `Noted: ${note.toLowerCase()} on the ${BY_ID[target.id].name}.` };
  }
  if (dish && /\b(add|order|get me|i'?ll have|i will have|give me|want)\b/.test(l)) {
    const q = qtyOf(dish.rest);
    const note = /less spic|mild/.test(l) ? "Less spicy" : /extra spic/.test(l) ? "Extra spicy" : undefined;
    c.add(dish.id, { qty: q, note });
    return { text: `Added ${q > 1 ? `${q} ` : ""}${name}${q > 1 ? "s" : ""}${note ? `, ${note.toLowerCase()}` : ""}. Anything to go with it?`, picks: [BY_ID[dish.id].pair] };
  }
  if (/(count me in|i'?m interested|sign me up)/.test(l) || (/music|event|live|band|gig/.test(l) && /(interested|count me|sign me|rsvp)/.test(l))) { c.interested(); return { text: "Done, you are on the list for tonight's live set." }; }
  if (/music|event|live|tonight|band|gig/.test(l) && !dish) return { text: "Coastal Strings play live at 9 pm tonight. Say \"count me in\" and I will put your table on the list." };
  if (dish) {
    const d = BY_ID[dish.id];
    const pair = BY_ID[d.pair];
    return { text: `${d.how} It is ${inr(d.price)}. ${pair ? `I would pair it with the ${pair.name}.` : ""}`, picks: [d.id], chef: `Chef's note · hero ingredient: ${d.hero}` };
  }
  const k = /spic|hot|fiery|kharam|కార|तीखा|teekha/.test(l) ? "spicy" : (/veg|paneer/.test(l) && !/non/.test(l)) || /శాక|शाक/.test(l) ? "veg" : /sweet|dessert|తీపి|मीठ/.test(l) ? "sweet" : /popular|best|recommend|good|famous|చాలా|ज़्यादा/.test(l) ? "pop" : null;
  if (k) return { text: SAY[k][lang], picks: PICKS[k] };
  if (lang !== "en") return { text: lang === "te" ? "తప్పకుండా. ఏం కావాలో చెప్పండి: కారంగా, శాకాహారం, లేదా తీపి?" : "ज़रूर। बताइए, तीखा, शाकाहारी या कुछ मीठा?" };
  return { text: "I can only speak for what we serve tonight. Ask me about a dish, say what you are in the mood for, or tell me to add something." };
}
