import { useEffect, useMemo, useRef, useState } from "react";
import { AV } from "./brand";
import { BY_ID, CATS, Chilis, Dot, MENU, NOTES, SERVICES, inr, type ServiceKind } from "./Prototype";
import { airaReply, type AiraLine } from "./aira";
import type { Floor } from "./LiveFloor";

// Aavira's order page, the way a guest meets it from the table: the menu with photos, add to the
// table, ask Aira, check out, watch the order move. It is wired to the same demo floor as the
// kitchen, waiter and owner screens, so placing an order here shows up there. Nothing is sent.

const SITE = "/case/aavira/site";
const KICK = "text-[0.7rem] uppercase tracking-[0.3em]";
const GUEST = { name: "Meera", tier: "Insider" };

type Msg = { from: "host" | "me"; text: string; picks?: string[]; chef?: string };
type Stage = "cart" | "checkout" | "placed";

const field = "w-full rounded-xl px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#e9a23b]";
const fieldStyle = { background: AV.ink, border: `1px solid ${AV.line}`, color: AV.cream } as const;

export function OrderPage({ floor, goStaff }: { floor: Floor; goStaff: (t: "Kitchen" | "Waiter" | "Owner") => void }) {
  // ---- menu browsing
  const [cat, setCat] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [q, setQ] = useState("");
  const [chef, setChef] = useState<string | null>(null);

  // ---- the shared table
  const [lines, setLines] = useState<AiraLine[]>([]);
  const uid = useRef(1);
  const [stage, setStage] = useState<Stage>("cart");
  const [form, setForm] = useState({ name: "", phone: "", note: "", pay: "table" as "table" | "upi" });
  const [placedId, setPlacedId] = useState<number | null>(null);
  const [placedLines, setPlacedLines] = useState<AiraLine[]>([]);
  const [interested, setInterested] = useState(false);

  // ---- the panel (desktop: sticky column; mobile: a sheet)
  const [panel, setPanel] = useState<"table" | "aira">("table");
  const [sheet, setSheet] = useState(false);

  // ---- Aira
  const [chat, setChat] = useState<Msg[]>([{ from: "host", text: "Good evening, I'm Aira, tonight's host. Ask me about a dish, or tell me what you want and I will put it on the table." }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  const [toast, setToast] = useState("");
  const toastT = useRef(0);
  const say = (t: string) => { setToast(t); window.clearTimeout(toastT.current); toastT.current = window.setTimeout(() => setToast(""), 1800); };

  const digits = form.phone.replace(/\D/g, "");
  const known = digits.length >= 10;
  const subtotal = useMemo(() => lines.reduce((s, l) => s + BY_ID[l.id].price * l.qty, 0), [lines]);
  const sweets = lines.filter((l) => BY_ID[l.id].cat === "Sweet");
  const perk = known && sweets.length ? Math.min(...sweets.map((l) => BY_ID[l.id].price)) : 0;
  const total = subtotal - perk;
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const add = (id: string, o: { qty?: number; note?: string } = {}) => {
    const who = form.name.trim() || "You";
    setLines((c) => {
      const hit = c.find((l) => l.id === id && l.note === o.note);
      return hit ? c.map((l) => (l === hit ? { ...l, qty: l.qty + (o.qty ?? 1) } : l)) : [...c, { uid: uid.current++, id, qty: o.qty ?? 1, note: o.note, who }];
    });
    if (stage === "placed") { setStage("cart"); }
  };
  const qtyOf = (id: string) => lines.filter((l) => l.id === id).reduce((s, l) => s + l.qty, 0);
  const bump = (id: string, d: number) => {
    const l = lines.find((x) => x.id === id);
    if (!l) { if (d > 0) { add(id); say(`${BY_ID[id].name} added`); } return; }
    setLines((c) => c.flatMap((x) => (x.uid !== l.uid ? [x] : x.qty + d <= 0 ? [] : [{ ...x, qty: x.qty + d }])));
  };
  const setNote = (u: number, note?: string) => setLines((c) => c.map((l) => (l.uid === u ? { ...l, note } : l)));
  const removeLine = (u: number) => setLines((c) => c.filter((l) => l.uid !== u));
  const service = (k: ServiceKind) => { floor.onCall(k); say(SERVICES.find((s) => s.k === k)!.done); };
  const toggleInterest = () => { if (!interested) { setInterested(true); floor.onEvent(); say("Noted. We will save you a spot near the stage"); } };

  const place = () => {
    if (!lines.length) return;
    const snap = lines;
    floor.onOrder(snap.map((l) => ({ name: BY_ID[l.id].name, who: form.name.trim() || l.who, price: BY_ID[l.id].price, qty: l.qty, note: l.note })), total);
    setPlacedId(floor.lastId());
    setPlacedLines(snap);
    setLines([]);
    setStage("placed");
    setPanel("table");
  };
  const placeRef = useRef(place);
  placeRef.current = place;

  const ask = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setChat((m) => [...m, { from: "me", text: t }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      const r = airaReply(t, {
        lines, total, confirming, setConfirming,
        add: (id, o) => add(id, o),
        removeDish: (id) => setLines((c) => c.filter((l) => l.id !== id)),
        setNote: (u, n) => setNote(u, n),
        service, interested: toggleInterest,
        send: () => placeRef.current(),
      });
      setTyping(false);
      setChat((m) => [...m, { from: "host", ...r }]);
    }, 650);
  };
  useEffect(() => { chatEnd.current?.scrollIntoView({ block: "end" }); }, [chat, typing]);

  const shown = MENU.filter((d) => (cat === "All" || d.cat === cat) && (!vegOnly || d.veg) && (!q.trim() || `${d.name} ${d.line}`.toLowerCase().includes(q.trim().toLowerCase())));
  const placedStatus = placedId !== null ? floor.tickets.find((t) => t.id === placedId)?.status ?? "new" : "new";

  // ------------------------------------------------------------------ the panel contents
  const tracker = (
    <div className="mt-4 flex items-center gap-1.5" aria-label="Order progress">
      {(["new", "cooking", "ready", "served"] as const).map((s, i) => {
        const at = ["new", "cooking", "ready", "served"].indexOf(placedStatus);
        return <div key={s} className="flex-1"><div className="h-1.5 rounded-full transition-colors duration-500" style={{ background: i <= at ? AV.turmeric : AV.line }} /><div className="mt-1.5 text-[10.5px] text-center" style={{ color: i <= at ? AV.cream : AV.muted }}>{["Sent", "Cooking", "Ready", "Served"][i]}</div></div>;
      })}
    </div>
  );

  const cartBody = (
    <>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {SERVICES.map((s) => <button key={s.k} type="button" onClick={() => service(s.k)} className="av-press px-3 py-1.5 rounded-full text-[12px]" style={{ border: `1px solid ${AV.line}`, color: AV.cream, background: AV.ink }}>{s.label}</button>)}
      </div>
      {lines.length === 0 ? (
        <div className="text-center py-10 text-[14px]" style={{ color: AV.muted }}>The table is empty. Add something from the menu, or ask Aira.</div>
      ) : (
        <ul className="grid gap-3">
          {lines.map((l) => (
            <li key={l.uid} className="rounded-2xl p-3" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}>
              <div className="flex items-center gap-3">
                <img src={`/case/aavira/dishes/${l.id}.webp`} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0"><div className="font-display text-lg leading-tight">{BY_ID[l.id].name}</div>{l.note && <div className="text-[12px] italic" style={{ color: AV.turmeric }}>{l.note}</div>}</div>
                <div className="text-right"><div className="text-[14px] font-medium">{inr(BY_ID[l.id].price * l.qty)}</div>
                  <div className="mt-1 inline-flex items-center rounded-full" style={{ border: `1px solid ${AV.line}` }}>
                    <button type="button" aria-label={`Fewer ${BY_ID[l.id].name}`} onClick={() => bump(l.id, -1)} className="w-8 h-8">−</button>
                    <span className="w-5 text-center text-[13px]" aria-live="polite">{l.qty}</span>
                    <button type="button" aria-label={`More ${BY_ID[l.id].name}`} onClick={() => bump(l.id, 1)} className="w-8 h-8">+</button>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-[60px]">
                {NOTES.map((n) => <button key={n} type="button" aria-pressed={l.note === n} onClick={() => setNote(l.uid, l.note === n ? undefined : n)} className="px-2.5 py-1 rounded-full text-[11px]" style={{ background: l.note === n ? AV.turmeric : "transparent", color: l.note === n ? AV.ink : AV.muted, border: `1px solid ${l.note === n ? AV.turmeric : AV.line}` }}>{n}</button>)}
                <button type="button" onClick={() => removeLine(l.uid)} className="ml-auto text-[11.5px] underline underline-offset-4" style={{ color: AV.muted }}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {lines.length > 0 && (
        <div className="mt-5">
          <dl className="text-[14px] grid gap-1.5">
            <div className="flex justify-between"><dt style={{ color: AV.muted }}>Subtotal · {count} item{count === 1 ? "" : "s"}</dt><dd>{inr(subtotal)}</dd></div>
            {perk > 0 && <div className="av-rise flex justify-between" style={{ color: "#9ccf8f" }}><dt>Birthday dessert, on us</dt><dd>−{inr(perk)}</dd></div>}
            <div className="flex justify-between pt-2 mt-1 font-semibold text-[17px]" style={{ borderTop: `1px solid ${AV.line}` }}><dt>Total</dt><dd>{inr(total)}</dd></div>
          </dl>
          <p className="mt-1.5 text-[12px]" style={{ color: AV.dim }}>Taxes are shown on the final bill.</p>
          <button type="button" data-cursor="Checkout" onClick={() => setStage("checkout")} className="av-sheen av-press mt-4 w-full rounded-full py-3.5 text-[15px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Checkout</button>
        </div>
      )}
    </>
  );

  const checkoutBody = (
    <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); place(); }}>
      <button type="button" onClick={() => setStage("cart")} className="text-left text-[13px] underline underline-offset-4" style={{ color: AV.muted }}>← Back to the table</button>
      <div className="text-[13px] px-4 py-2.5 rounded-xl" style={{ background: AV.ink, border: `1px solid ${AV.line}`, color: AV.muted }}>Table 7 · 2 guests · one order for the whole table</div>
      <label className="block text-[13px]" style={{ color: AV.muted }}><span className="block mb-1.5">Your name</span>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="given-name" placeholder="So the waiter can greet you" className={field} style={fieldStyle} />
      </label>
      <label className="block text-[13px]" style={{ color: AV.muted }}><span className="block mb-1.5">Phone (optional)</span>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="tel" autoComplete="tel" placeholder="Try any 10 digits" className={field} style={fieldStyle} />
        <span className="block mt-1.5 text-[12px]" style={{ color: AV.dim }}>Demo: any 10 digits and we will recognise you, the way we would a returning guest.</span>
      </label>
      {known && (
        <div className="av-rise rounded-xl px-4 py-3 text-[13.5px]" style={{ background: AV.surfaceHi, border: `1px solid ${AV.turmeric}55` }} role="status">
          <b style={{ color: AV.turmeric }}>Welcome back, {GUEST.name}.</b> {GUEST.tier} tier, and it is your birthday week: a dessert is on us. {sweets.length ? "Applied below." : "Add a dessert to use it."}
        </div>
      )}
      <label className="block text-[13px]" style={{ color: AV.muted }}><span className="block mb-1.5">Anything for the kitchen? (optional)</span>
        <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={2} placeholder="Allergies, how spicy, share plates" className={field} style={fieldStyle} />
      </label>
      <fieldset>
        <legend className="text-[13px] mb-2" style={{ color: AV.muted }}>How would you like to pay?</legend>
        <div className="grid gap-2">
          {[["table", "Pay at the table", "The waiter brings the bill when you ask."], ["upi", "Pay now with UPI", "Demo only: no payment is taken."]].map(([v, l, d]) => (
            <label key={v} className="flex items-start gap-3 rounded-xl px-4 py-3 cursor-pointer" style={{ background: AV.ink, border: `1px solid ${form.pay === v ? AV.turmeric : AV.line}` }}>
              <input type="radio" name="pay" checked={form.pay === v} onChange={() => setForm({ ...form, pay: v as "table" | "upi" })} className="mt-1" style={{ accentColor: AV.turmeric }} />
              <span><span className="block text-[14px]" style={{ color: AV.cream }}>{l}</span><span className="block text-[12px]" style={{ color: AV.muted }}>{d}</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      <dl className="text-[14px] grid gap-1.5 pt-1">
        <div className="flex justify-between"><dt style={{ color: AV.muted }}>{count} item{count === 1 ? "" : "s"}</dt><dd>{inr(subtotal)}</dd></div>
        {perk > 0 && <div className="flex justify-between" style={{ color: "#9ccf8f" }}><dt>Birthday dessert, on us</dt><dd>−{inr(perk)}</dd></div>}
        <div className="flex justify-between pt-2 mt-1 font-semibold text-[17px]" style={{ borderTop: `1px solid ${AV.line}` }}><dt>Total</dt><dd>{inr(total)}</dd></div>
      </dl>
      <button type="submit" disabled={!lines.length} data-cursor="Place" className="av-sheen av-press w-full rounded-full py-3.5 text-[15px] font-semibold disabled:opacity-40" style={{ background: AV.turmeric, color: AV.ink }}>{form.pay === "upi" ? `Pay ${inr(total)} and place order` : "Place order"}</button>
    </form>
  );

  const placedBody = (
    <div role="status">
      <svg viewBox="0 0 24 24" width="40" height="40" className="av-check" fill="none" stroke={AV.turmeric} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10.5" strokeWidth="1.2" opacity=".5" /><path d="M7 12.5l3.2 3.2L17 9" /></svg>
      <h3 className="mt-3 font-display text-3xl leading-tight">{placedStatus === "new" ? "Order sent to the kitchen" : placedStatus === "cooking" ? "The kitchen is on it" : placedStatus === "ready" ? "Ready, on its way" : "Enjoy your meal"}</h3>
      <p className="mt-1 text-[14px]" style={{ color: AV.muted }}>Order #{placedId} · Table 7 · about 18 minutes · {form.pay === "upi" ? "paid (demo)" : "pay at the table"}</p>
      {tracker}
      <ul className="mt-5 grid gap-1.5 text-[14px]">
        {placedLines.map((l) => <li key={l.uid} className="flex justify-between gap-3"><span>{l.qty}× {BY_ID[l.id].name}{l.note ? <em className="not-italic" style={{ color: AV.turmeric }}> · {l.note.toLowerCase()}</em> : null}</span><span style={{ color: AV.muted }}>{inr(BY_ID[l.id].price * l.qty)}</span></li>)}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {SERVICES.map((s) => <button key={s.k} type="button" onClick={() => service(s.k)} className="av-press px-3 py-1.5 rounded-full text-[12px]" style={{ border: `1px solid ${AV.line}`, color: AV.cream, background: AV.ink }}>{s.label}</button>)}
      </div>
      <div className="mt-6 grid gap-2">
        <button type="button" onClick={() => goStaff("Kitchen")} className="av-press rounded-full py-3 text-[14px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>See it in the kitchen</button>
        <button type="button" onClick={() => { setStage("cart"); setPlacedId(null); }} className="text-[13px] underline underline-offset-4" style={{ color: AV.muted }}>Order another round</button>
      </div>
    </div>
  );

  const airaBody = (
    <div className="flex flex-col h-full min-h-[360px]">
      <p className="text-[11.5px] leading-snug mb-3" style={{ color: AV.dim }}>Demo host with scripted replies. The real one runs on Claude, grounded in the live menu.</p>
      <div className="flex-1 min-h-[220px] overflow-y-auto grid gap-3 content-start pr-1" data-lenis-prevent>
        {chat.map((m, i) => (
          <div key={i} className={`av-rise ${m.from === "me" ? "justify-self-end max-w-[85%]" : "justify-self-start max-w-[92%]"}`}>
            <div className="rounded-2xl px-4 py-2.5 text-[14px] leading-snug" style={{ background: m.from === "me" ? AV.turmeric : AV.ink, color: m.from === "me" ? AV.ink : AV.cream, border: m.from === "me" ? "none" : `1px solid ${AV.line}` }}>{m.text}</div>
            {m.chef && <div className="mt-1 text-[11px]" style={{ color: AV.turmeric }}>{m.chef}</div>}
            {m.picks && (
              <div className="mt-2 grid gap-2">
                {m.picks.map((p) => (
                  <div key={p} className="rounded-xl p-2 flex items-center gap-2.5" style={{ background: AV.surfaceHi, border: `1px solid ${AV.line}` }}>
                    <img src={`/case/aavira/dishes/${p}.webp`} alt="" className="w-11 h-11 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0"><div className="font-display text-base leading-tight">{BY_ID[p].name}</div><div className="text-[12px]" style={{ color: AV.muted }}>{inr(BY_ID[p].price)}</div></div>
                    <button type="button" onClick={() => { add(p); say(`${BY_ID[p].name} added`); }} className="av-press px-3.5 py-1.5 rounded-full text-[12px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && <div className="justify-self-start rounded-2xl px-4 py-3" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}><span className="inline-flex gap-1">{[0, 1, 2].map((d) => <i key={d} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: AV.dim, animationDelay: `${d * 150}ms` }} />)}</span></div>}
        <div ref={chatEnd} />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {["Something spicy", "Vegetarian", "Tell me about the biryani", "Add two lime sodas", "కారంగా ఏముంది?", "Bring water", "Place my order"].map((c) => (
          <button key={c} type="button" onClick={() => ask(c)} className="av-press px-3.5 py-2 rounded-full text-[12.5px] whitespace-nowrap" style={{ background: AV.ink, border: `1px solid ${AV.line}`, color: AV.cream }}>{c}</button>
        ))}
      </div>
      <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(draft); }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Message Aira" placeholder="Ask about a dish, or what you want" className="flex-1 rounded-full px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#e9a23b]" style={fieldStyle} />
        <button type="submit" disabled={!draft.trim() || typing} className="av-press px-5 rounded-full text-[14px] font-semibold disabled:opacity-40" style={{ background: AV.turmeric, color: AV.ink }}>Send</button>
      </form>
    </div>
  );

  const panelEl = (
    <div className="rounded-3xl p-5" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
      <div className="flex gap-2 mb-5" role="tablist">
        {([["table", `Your table${count ? ` · ${count}` : ""}`], ["aira", "Ask Aira"]] as const).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={panel === k} onClick={() => setPanel(k)} className="px-4 py-2 rounded-full text-[13px]" style={{ background: panel === k ? AV.turmeric : AV.ink, color: panel === k ? AV.ink : AV.muted, border: `1px solid ${panel === k ? AV.turmeric : AV.line}` }}>{l}</button>
        ))}
      </div>
      {panel === "aira" ? airaBody : stage === "cart" ? cartBody : stage === "checkout" ? checkoutBody : placedBody}
    </div>
  );

  // ------------------------------------------------------------------ the menu
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start pb-28 lg:pb-0">
      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="rounded-full px-4 py-1.5 text-[12.5px]" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>Table 7 · 2 guests</span>
          <span className="text-[13px]" style={{ color: AV.muted }}>Opened from your table's code. No app, no download.</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          <button type="button" onClick={() => setChef("prawn-pepper")} className="av-lift rounded-2xl px-4 py-3 flex items-center gap-4 text-left" style={{ background: `linear-gradient(120deg, ${AV.surfaceHi}, #2a1c12)`, border: `1px solid ${AV.line}` }}>
            <img src="/case/aavira/dishes/prawn-pepper.webp" alt="" className="w-14 h-14 rounded-xl object-cover" />
            <span><span className={KICK} style={{ color: AV.turmeric }}>Tonight's special</span><span className="block font-display text-2xl leading-tight">Prawn pepper fry</span></span>
          </button>
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
            <span className="flex-1 min-w-0"><span className={KICK} style={{ color: AV.turmeric }}>Live tonight · 9 pm</span><span className="block text-[15px] mt-1">Coastal Strings on the terrace</span></span>
            <button type="button" aria-pressed={interested} onClick={toggleInterest} className={`av-press px-4 py-2 rounded-full text-[13px] font-semibold shrink-0 ${interested ? "av-pop" : ""}`} style={{ background: interested ? "transparent" : AV.turmeric, color: interested ? AV.turmeric : AV.ink, border: `1px solid ${AV.turmeric}` }}>{interested ? "You're on the list" : "I'm interested"}</button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist" aria-label="Menu sections">
          <button type="button" onClick={() => setVegOnly((v) => !v)} aria-pressed={vegOnly} className="px-4 py-2 rounded-full text-[13px] inline-flex items-center gap-2" style={{ background: vegOnly ? "#2f4a2b" : AV.surface, color: vegOnly ? "#bfe3b6" : AV.muted, border: `1px solid ${vegOnly ? "#5fa05a" : AV.line}` }}><Dot veg />Veg</button>
          {CATS.map((c) => <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className="px-4 py-2 rounded-full text-[13px]" style={{ background: cat === c ? AV.turmeric : AV.surface, color: cat === c ? AV.ink : AV.muted, border: `1px solid ${cat === c ? AV.turmeric : AV.line}` }}>{c}</button>)}
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the menu" placeholder="Search" className="ml-auto w-full sm:w-44 rounded-full px-4 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#e9a23b]" style={fieldStyle} />
        </div>

        {shown.length === 0 && <p className="py-16 text-center" style={{ color: AV.muted }}>Nothing matches that. Try another filter, or ask Aira.</p>}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {shown.map((d) => {
            const n = qtyOf(d.id);
            return (
              <article key={d.id} className="av-lift rounded-3xl overflow-hidden flex flex-col" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
                <button type="button" onClick={() => setChef(d.id)} data-cursor="Chef's note" aria-label={`Details for ${d.name}`} className="relative block overflow-hidden group">
                  <img src={`${SITE}/${d.id}.webp`} alt={d.name} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  {d.tag && <span className="absolute top-3 left-3 text-[10px] tracking-[0.14em] uppercase rounded-full px-2.5 py-1" style={{ background: "rgba(14,12,11,.78)", color: AV.turmeric }}>{d.tag}</span>}
                </button>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2"><Dot veg={d.veg} /><Chilis n={d.spice} /></div>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{d.name}</h3>
                  <p className="mt-1 text-[13.5px] leading-snug" style={{ color: AV.muted }}>{d.line}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                    <span className="text-[16px] font-medium">{inr(d.price)}</span>
                    {n === 0 ? (
                      <button type="button" onClick={() => { add(d.id); say(`${d.name} added to the table`); }} className="av-sheen av-press rounded-full px-5 py-2 text-[13.5px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add</button>
                    ) : (
                      <span className="inline-flex items-center rounded-full" style={{ border: `1px solid ${AV.turmeric}` }}>
                        <button type="button" aria-label={`Fewer ${d.name}`} onClick={() => bump(d.id, -1)} className="w-9 h-9 text-lg">−</button>
                        <span key={n} className="av-pop w-6 text-center text-[14px] font-semibold" aria-live="polite">{n}</span>
                        <button type="button" aria-label={`More ${d.name}`} onClick={() => bump(d.id, 1)} className="w-9 h-9 text-lg">+</button>
                      </span>
                    )}
                  </div>
                  <button type="button" onClick={() => setChef(d.id)} className="mt-3 text-left text-[12.5px] underline underline-offset-4" style={{ color: AV.muted }}>Ask the chef</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* desktop: the table and Aira stay beside the menu */}
      <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-4">{panelEl}</aside>

      {/* mobile: a bar at the bottom opens the same panel as a sheet */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[78] px-4 pb-4 pt-3 flex gap-2" style={{ background: "linear-gradient(to top, rgba(14,12,11,.96) 60%, transparent)" }}>
        <button type="button" onClick={() => { setPanel("aira"); setSheet(true); }} className="av-press rounded-full px-5 py-3.5 text-[14px] font-semibold" style={{ background: AV.surface, color: AV.cream, border: `1px solid ${AV.line}` }}>Ask Aira</button>
        <button type="button" onClick={() => { setPanel("table"); setSheet(true); }} className="av-press flex-1 rounded-full py-3.5 text-[14px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>{stage === "placed" && !count ? "Your order" : `Your table · ${count} · ${inr(total)}`}</button>
      </div>
      {sheet && (
        <div className="lg:hidden fixed inset-0 z-[79] flex flex-col justify-end av-fade" style={{ background: "rgba(5,4,4,.6)" }} onClick={() => setSheet(false)}>
          <div className="av-sheet rounded-t-[28px] max-h-[92%] overflow-y-auto p-3" data-lenis-prevent style={{ background: AV.ink, borderTop: `1px solid ${AV.line}` }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-2"><button type="button" onClick={() => setSheet(false)} className="av-press rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.2em]" style={{ border: `1px solid ${AV.line}`, color: AV.muted }}>Close</button></div>
            {panelEl}
          </div>
        </div>
      )}

      {/* the chef's note */}
      {chef && (() => {
        const d = BY_ID[chef];
        const pair = BY_ID[d.pair];
        return (
          <div className="av-fade fixed inset-0 z-[80] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={d.name} style={{ background: "rgba(5,4,4,.72)" }} onClick={() => setChef(null)}>
            <div className="av-rise w-full max-w-[860px] max-h-[92vh] overflow-y-auto rounded-3xl grid md:grid-cols-2" data-lenis-prevent style={{ background: AV.surface, border: `1px solid ${AV.line}` }} onClick={(e) => e.stopPropagation()}>
              <img src={`${SITE}/${chef}.webp`} alt={d.name} className="w-full h-full max-h-[420px] md:max-h-none object-cover" />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3"><Dot veg={d.veg} /><Chilis n={d.spice} />{d.tag && <span className="text-[10px] tracking-[0.14em] uppercase" style={{ color: AV.turmeric }}>{d.tag}</span>}</div>
                <h3 className="mt-3 font-display text-4xl leading-tight">{d.name}</h3>
                <p className="mt-2 text-[15px]" style={{ color: AV.muted }}>{d.line}.</p>
                <div className="mt-5 rounded-2xl p-4 text-[14px] leading-relaxed" style={{ background: AV.ink, border: `1px solid ${AV.line}`, color: AV.muted }}>
                  <div className={KICK} style={{ color: AV.turmeric }}>From the chef</div>
                  <p className="mt-2">{d.how}</p>
                  <p className="mt-2"><span style={{ color: AV.cream }}>Hero ingredient:</span> {d.hero}</p>
                  {pair && <p className="mt-1"><span style={{ color: AV.cream }}>Pairs with:</span> {pair.name} <button type="button" onClick={() => { add(pair.id); say(`${pair.name} added`); }} className="ml-1 underline underline-offset-4" style={{ color: AV.turmeric }}>add it</button></p>}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => { add(chef); say(`${d.name} added to the table`); setChef(null); }} className="av-sheen av-press rounded-full px-6 py-3 text-[14px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Add · {inr(d.price)}</button>
                  <button type="button" onClick={() => { const id = chef; setChef(null); setPanel("aira"); setSheet(true); ask(`Tell me about the ${BY_ID[id].name}`); }} className="av-press rounded-full px-6 py-3 text-[14px]" style={{ border: `1px solid ${AV.line}`, color: AV.cream }}>Ask Aira more</button>
                  <button type="button" onClick={() => setChef(null)} className="px-3 text-[14px] underline underline-offset-4" style={{ color: AV.muted }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="fixed inset-x-0 bottom-24 lg:bottom-8 z-[81] flex justify-center pointer-events-none transition-all duration-300" style={{ opacity: toast ? 1 : 0, transform: `translateY(${toast ? 0 : 8}px)` }} aria-live="polite">
        <span className="rounded-full px-5 py-2.5 text-[13px] shadow-xl max-w-[90vw] text-center" style={{ background: AV.cream, color: AV.ink }}>{toast}</span>
      </div>
    </div>
  );
}
