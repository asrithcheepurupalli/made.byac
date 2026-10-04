import { useEffect, useRef, useState } from "react";
import { AV } from "./brand";
import { AaviraPrototype, type OrderLine, type ServiceKind } from "./Prototype";

// The other side of the phone: what the kitchen, the waiter and the owner see when a guest sends
// an order. All local state, wired to the prototype's callbacks. Nothing leaves the page.

type Status = "new" | "cooking" | "ready" | "served";
type Ticket = { id: number; lines: OrderLine[]; total: number; status: Status; at: number };
type Alert = { id: number; kind: "order" | "ready" | ServiceKind | "event"; text: string; at: number; done: boolean };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const clock = (t: number) => new Date(t).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
const NEXT: Record<Status, Status | null> = { new: "cooking", cooking: "ready", ready: "served", served: null };
export const TABS = ["Kitchen", "Waiter", "Owner"] as const;
export type Tab = (typeof TABS)[number];

export function useFloor() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [interest, setInterest] = useState(0);
  const [justSent, setJustSent] = useState<number | null>(null);
  const seq = useRef(1);
  const tix = useRef(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => { window.clearInterval(t); timers.current.forEach(window.clearTimeout); };
  }, []);

  const pushAlert = (kind: Alert["kind"], text: string) =>
    setAlerts((a) => [{ id: seq.current++, kind, text, at: Date.now(), done: false }, ...a].slice(0, 8));

  const advance = (id: number, to?: Status) =>
    setTickets((ts) => ts.map((t) => {
      if (t.id !== id) return t;
      const nx = to ?? NEXT[t.status];
      if (!nx || nx === t.status) return t;
      if (nx === "ready") pushAlert("ready", `Table 7: order #${id} is ready to serve`);
      return { ...t, status: nx };
    }));

  const onOrder = (lines: OrderLine[], total: number) => {
    const id = tix.current++;
    setJustSent(id);
    setTickets((ts) => [{ id, lines, total, status: "new" as Status, at: Date.now() }, ...ts].slice(0, 6));
    pushAlert("order", `Table 7 sent order #${id}, ${lines.reduce((s, l) => s + l.qty, 0)} items`);
    // the kitchen picks it up and finishes it on its own if nobody taps, so the demo always moves
    timers.current.push(window.setTimeout(() => setTickets((ts) => ts.map((t) => {
      if (t.id !== id || t.status !== "new") return t;
      return { ...t, status: "cooking" as Status };
    })), 3000));
    timers.current.push(window.setTimeout(() => {
      setTickets((ts) => ts.map((t) => {
        if (t.id !== id || t.status !== "cooking") return t;
        pushAlert("ready", `Table 7: order #${id} is ready to serve`);
        return { ...t, status: "ready" as Status };
      }));
    }, 10000));
  };
  const CALLS: Record<ServiceKind, string> = { water: "Table 7 would like water", napkins: "Table 7 needs napkins", cutlery: "Table 7 needs cutlery", waiter: "Table 7 is calling for a server", bill: "Table 7 asked for the bill" };
  const onCall = (kind: ServiceKind) => pushAlert(kind, CALLS[kind]);
  const onEvent = () => { setInterest((n) => n + 1); pushAlert("event", "Table 7 is interested in tonight's live set"); };

  const latest = tickets[0]?.status ?? null;
  const open = tickets.filter((t) => t.status !== "served");
  const served = tickets.filter((t) => t.status === "served");
  const revenue = tickets.reduce((s, t) => s + t.total, 0);
  const mins = (t: number) => { const m = Math.floor((now - t) / 1000); return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`; };

  const STAT: Record<Status, { label: string; color: string; cta: string | null }> = {
    new: { label: "New", color: AV.ember, cta: "Start cooking" },
    cooking: { label: "Cooking", color: AV.turmeric, cta: "Mark ready" },
    ready: { label: "Ready", color: "#7aa14a", cta: "Mark served" },
    served: { label: "Served", color: AV.dim, cta: null },
  };

  const closeAlert = (a: Alert) => {
    setAlerts((x) => x.map((y) => (y.id === a.id ? { ...y, done: true } : y)));
    if (a.kind === "ready") { const id = Number(/#(\d+)/.exec(a.text)?.[1]); advance(id, "served"); }
  };
  return { tickets, alerts, interest, justSent, setJustSent, onOrder, onCall, onEvent, advance, closeAlert, latest, open, served, revenue, mins, STAT, lastId: () => tix.current - 1 };
}
export type Floor = ReturnType<typeof useFloor>;

export function StaffPanel({ f, tab }: { f: Floor; tab: Tab }) {
  const { tickets, alerts, interest, advance, closeAlert, open, served, revenue, mins, STAT } = f;
  return (
        <div className="rounded-3xl p-5 md:p-7 min-h-[430px]" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
          {tab === "Kitchen" && (
            <div>
              <div className="flex items-center justify-between">
                <div className="font-display text-2xl">Kitchen display</div>
                <span className="label text-[10px]" style={{ color: AV.dim }}>{open.length} open</span>
              </div>
              {tickets.length === 0 ? (
                <Empty text="No tickets yet. Place an order on the guest side and it lands here." />
              ) : (
                <div className="mt-5 grid md:grid-cols-2 gap-4">
                  {tickets.map((t) => (
                    <div key={t.id} className="rounded-2xl p-4" style={{ background: AV.ink, border: `1px solid ${t.status === "served" ? AV.line : STAT[t.status].color + "88"}`, opacity: t.status === "served" ? 0.55 : 1 }}>
                      <div className="flex items-center justify-between">
                        <div className="font-display text-xl">#{t.id} · Table 7</div>
                        <span className="label text-[10px] rounded-full px-2.5 py-1" style={{ background: STAT[t.status].color, color: AV.ink }}>{STAT[t.status].label}</span>
                      </div>
                      <div className="mt-1 text-xs" style={{ color: AV.dim }}>In at {clock(t.at)} · {mins(t.at)} ago</div>
                      <ul className="mt-3 flex flex-col gap-1.5 text-sm">
                        {t.lines.map((l, i) => <li key={i} className="flex justify-between gap-3"><span>{l.qty}× {l.name}{l.note ? <em className="not-italic" style={{ color: AV.turmeric }}> · {l.note.toLowerCase()}</em> : null}</span><span style={{ color: AV.dim }}>{l.who}</span></li>)}
                      </ul>
                      {STAT[t.status].cta && (
                        <button type="button" onClick={() => advance(t.id)} className="mt-4 w-full rounded-full py-2.5 text-[13px] font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>{STAT[t.status].cta}</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-5 text-xs" style={{ color: AV.dim }}>If nobody taps, the demo moves tickets on by itself so you can watch the phone update.</p>
            </div>
          )}

          {tab === "Waiter" && (
            <div>
              <div className="font-display text-2xl">Waiter view · Table 7</div>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-4" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}>
                  <div className="label text-[10px]" style={{ color: AV.turmeric }}>Who is at the table</div>
                  <ul className="mt-3 flex flex-col gap-2 text-sm">
                    <li><b>Meera</b> <span style={{ color: AV.muted }}>· Insider · birthday week, dessert is on the house</span></li>
                    <li><b>Ravi</b> <span style={{ color: AV.muted }}>· 2nd visit · likes it hot</span></li>
                    <li><b>Guest</b> <span style={{ color: AV.muted }}>· first visit · vegetarian</span></li>
                  </ul>
                </div>
                <div className="rounded-2xl p-4" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}>
                  <div className="label text-[10px]" style={{ color: AV.turmeric }}>Tell them</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: AV.muted }}>Open with the prawn pepper fry, it is tonight's special. Mention that the dessert for Meera is already applied.</p>
                </div>
              </div>
              <div className="label text-[10px] mt-6" style={{ color: AV.dim }}>Alerts</div>
              {alerts.length === 0 ? <Empty text="Quiet. Alerts show up here as the guest orders, or taps call the waiter." /> : (
                <ul className="mt-3 flex flex-col gap-2">
                  {alerts.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm" style={{ background: AV.ink, border: `1px solid ${a.done ? AV.line : AV.turmeric + "66"}`, opacity: a.done ? 0.5 : 1 }}>
                      <i className="w-2 h-2 rounded-full shrink-0" style={{ background: a.kind === "ready" ? "#7aa14a" : a.kind === "order" ? AV.ember : AV.turmeric }} />
                      <span className="flex-1">{a.text}</span>
                      <span className="text-xs" style={{ color: AV.dim }}>{clock(a.at)}</span>
                      {!a.done && <button type="button" onClick={() => closeAlert(a)} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>{a.kind === "ready" ? "Serve" : "Done"}</button>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {tab === "Owner" && (
            <div>
              <div className="font-display text-2xl">Tonight at Aavira</div>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[["Orders", String(tickets.length)], ["Served", String(served.length)], ["Sales", inr(revenue)], ["Live set interest", String(interest)]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl p-4" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}>
                    <div className="label text-[10px]" style={{ color: AV.dim }}>{k}</div>
                    <div className="mt-2 font-display text-3xl" style={{ color: AV.cream }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl p-4" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}>
                <div className="label text-[10px]" style={{ color: AV.turmeric }}>In plain language</div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: AV.muted }}>
                  {tickets.length === 0 ? "Nothing yet tonight. The first order will show up here." : `${tickets.length} order${tickets.length > 1 ? "s" : ""} so far from table 7, ${inr(revenue)} in sales. ${open.length ? `${open.length} still in the kitchen.` : "Everything has been served."}`}
                </p>
                <p className="mt-3 text-xs" style={{ color: AV.dim }}>Demo numbers from this page only. They are not data from a real restaurant.</p>
              </div>
            </div>
          )}
        </div>
  );
}

export function StaffTabs({ f, tab, setTab }: { f: Floor; tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="flex gap-2 mb-5" role="tablist">
      {TABS.map((t) => (
        <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="px-5 py-2.5 rounded-full text-sm" style={{ background: tab === t ? AV.turmeric : AV.surface, color: tab === t ? AV.ink : AV.muted, border: `1px solid ${tab === t ? AV.turmeric : AV.line}` }}>
          {t}{t === "Kitchen" && f.open.length > 0 ? ` · ${f.open.length}` : t === "Waiter" && f.alerts.some((a) => !a.done) ? ` · ${f.alerts.filter((a) => !a.done).length}` : ""}
        </button>
      ))}
    </div>
  );
}

export function LiveFloor() {
  const [tab, setTab] = useState<Tab>("Kitchen");
  const f = useFloor();
  const panelRef = useRef<HTMLDivElement>(null);
  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="lg:col-span-4 flex flex-col items-center">
        <div className="w-full max-w-[340px] rounded-[44px] p-2.5" style={{ background: "#050404", border: `1px solid ${AV.line}`, boxShadow: "0 40px 90px -30px rgba(0,0,0,.8)" }}>
          <AaviraPrototype className="rounded-[36px]" screen={undefined} onOrder={f.onOrder} onCall={f.onCall} onEvent={f.onEvent} status={f.latest} />
        </div>
        {f.justSent !== null && (
          <button type="button" onClick={() => { setTab("Kitchen"); panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); f.setJustSent(null); }} className="lg:hidden mt-4 w-full max-w-[340px] rounded-full py-3 text-sm font-semibold" style={{ background: AV.turmeric, color: AV.ink }}>Ticket #{f.justSent} is in the kitchen. See it ↓</button>
        )}
      </div>
      <div className="lg:col-span-8" ref={panelRef}>
        <StaffTabs f={f} tab={tab} setTab={setTab} />
        <StaffPanel f={f} tab={tab} />
      </div>
    </div>
  );
}

export const Empty = ({ text }: { text: string }) => (
  <div className="mt-5 rounded-2xl grid place-items-center text-center px-6 py-14 text-sm" style={{ border: `1px dashed ${AV.line}`, color: AV.dim }}>{text}</div>
);
