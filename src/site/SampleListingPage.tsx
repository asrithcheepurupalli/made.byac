import { useMemo, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { waLink } from "../seo/contact";

// A sample listing, with made up details, so an agent or builder can see and use what we
// build. Nothing here is a real property or a real project, and the page says so.
type Status = "Available" | "On hold" | "Sold";
const STATUS_STYLE: Record<Status, string> = {
  Available: "bg-[#1fa855]/15 text-[#0f6b34] border-[#1fa855]/40",
  "On hold": "bg-[#bd9b4e]/20 text-[#7a5f1c] border-[#bd9b4e]/50",
  Sold: "bg-ink/10 text-ink/60 border-ink/20",
};

function Tone({ a, b }: { a: string; b: string }) {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      <rect width="160" height="100" fill={a} />
      <rect x="30" y="30" width="100" height="70" fill={b} opacity=".9" />
      <rect x="44" y="42" width="22" height="18" fill="#f6f3ee" opacity=".9" />
      <rect x="76" y="42" width="22" height="18" fill="#f6f3ee" opacity=".9" />
      <rect x="108" y="42" width="14" height="18" fill="#f6f3ee" opacity=".9" />
    </svg>
  );
}

function nextDays(n: number) {
  const out: string[] = [];
  const d = new Date();
  for (let i = 1; out.length < n; i++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    out.push(x.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }));
  }
  return out;
}
const SLOTS = ["10:00 am", "11:30 am", "4:00 pm", "5:30 pm"];

function VisitPicker({ what }: { what: string }) {
  const days = useMemo(() => nextDays(5), []);
  const [day, setDay] = useState(days[0]);
  const [slot, setSlot] = useState(SLOTS[1]);
  return (
    <div className="rounded-2xl border border-ink/12 bg-white p-5">
      <p className="label text-ink/60">Book a site visit</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {days.map((d) => (
          <button key={d} onClick={() => setDay(d)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${d === day ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{d}</button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {SLOTS.map((s) => (
          <button key={s} onClick={() => setSlot(s)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${s === slot ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{s}</button>
        ))}
      </div>
      <a
        href={waLink(`Hi, I tried the sample listing (${what}) and picked a visit on ${day} at ${slot}. I want something like this for my business.`)}
        target="_blank" rel="noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-red transition-colors"
      >
        Confirm {day}, {slot}
      </a>
      <p className="mt-2 text-[12px] text-ink/55">In your own page this goes to your calendar and your WhatsApp. Here it sends us a message.</p>
    </div>
  );
}

function AgentView() {
  const [status, setStatus] = useState<Status>("Available");
  const [shot, setShot] = useState(0);
  const tones: [string, string][] = [["#e8dfd0", "#2f7d6b"], ["#dfe9e4", "#0b0b0c"], ["#efe4cf", "#bd9b4e"], ["#e4e0ea", "#5b4bd6"]];
  const facts = [
    ["Area", "1,050 sq ft"], ["Floor", "3 of 8"], ["Facing", "East"],
    ["Parking", "1 covered"], ["Possession", "Ready to move"], ["Furnishing", "Semi furnished"],
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 min-w-0">
        <div className="overflow-hidden rounded-3xl border border-ink/12 bg-paper-dim">
          <img src="/sample/building.svg" width={1200} height={750} alt="Illustration of the sample building" className="w-full" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {tones.map(([a, b], i) => (
            <button key={i} onClick={() => setShot(i)} aria-label={`Photo ${i + 1}`} className={`aspect-[16/10] overflow-hidden rounded-xl border-2 ${shot === i ? "border-ink" : "border-transparent"}`}>
              <Tone a={a} b={b} />
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12px] text-ink/55">Your real photos go here, in order, with the best one first.</p>
      </div>

      <div className="lg:col-span-5 min-w-0">
        <div className="flex items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLE[status]}`}>{status}</span>
          <span className="label text-ink/55">Madhurawada, Visakhapatnam</span>
        </div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.02] tracking-tight">2 BHK apartment in a gated community</h2>
        <p className="mt-4 font-display text-3xl">₹ 68,00,000 <span className="text-base text-ink/50">sample price</span></p>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {facts.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-ink/12 bg-white p-3">
              <dt className="label text-[10px] text-ink/55">{k}</dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Lift", "Power backup", "Gym", "Play area", "24 hour security"].map((a) => (
            <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1 text-[13px]"><Check size={13} aria-hidden />{a}</span>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink/60">RERA no. P00000000000 (sample). Map link, floor plan and brochure sit here too.</p>

        <div className="mt-6 flex flex-col gap-3">
          <a href={waLink("Hi, I opened the sample listing for the 2 BHK apartment in Madhurawada. I want a page like this for my agency.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1fa855] px-6 py-3.5 font-semibold text-white hover:brightness-105 transition">
            <MessageCircle size={18} aria-hidden /> Enquire on WhatsApp
          </a>
          <VisitPicker what="2 BHK, Madhurawada" />
        </div>

        <div className="mt-6 rounded-2xl bg-paper-dim p-4">
          <p className="label text-ink/60">You control this in one place</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["Available", "On hold", "Sold"] as Status[]).map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${s === status ? "border-ink bg-ink text-paper" : "border-ink/20 bg-white hover:border-ink"}`}>{s}</button>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-ink/55">Change the status and the page changes. The link you already sent stays the same.</p>
        </div>
      </div>
    </div>
  );
}

type Unit = { id: string; type: string; size: string; from: string; status: Status };
const UNITS: Unit[] = [
  { id: "A-304", type: "2 BHK", size: "1,050 sq ft", from: "₹ 68 lakh", status: "Available" },
  { id: "A-402", type: "2 BHK", size: "1,050 sq ft", from: "₹ 70 lakh", status: "On hold" },
  { id: "A-503", type: "2 BHK", size: "1,090 sq ft", from: "₹ 72 lakh", status: "Available" },
  { id: "B-201", type: "3 BHK", size: "1,520 sq ft", from: "₹ 1.02 crore", status: "Sold" },
  { id: "B-602", type: "3 BHK", size: "1,560 sq ft", from: "₹ 1.08 crore", status: "Available" },
  { id: "B-803", type: "3 BHK", size: "1,600 sq ft", from: "₹ 1.14 crore", status: "On hold" },
];

function BuilderView() {
  const [only, setOnly] = useState(false);
  const [type, setType] = useState<"All" | "2 BHK" | "3 BHK">("All");
  const list = UNITS.filter((u) => (!only || u.status === "Available") && (type === "All" || u.type === type));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 min-w-0">
        <div className="overflow-hidden rounded-3xl border border-ink/12 bg-paper-dim">
          <img src="/sample/building.svg" width={1200} height={750} alt="Illustration of the sample project" className="w-full" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[["2", "towers"], ["2 and 3 BHK", "unit types"], ["Dec 2028", "possession (sample)"]].map(([n, t]) => (
            <div key={t} className="rounded-xl border border-ink/12 bg-white p-4">
              <p className="font-display text-xl md:text-2xl">{n}</p>
              <p className="mt-1 text-[12px] text-ink/60">{t}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-8 font-display text-2xl">Available units</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(["All", "2 BHK", "3 BHK"] as const).map((t) => (
            <button key={t} onClick={() => setType(t)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${t === type ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{t}</button>
          ))}
          <label className="ml-auto inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={only} onChange={(e) => setOnly(e.target.checked)} /> Available only</label>
        </div>
        <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/12 bg-white">
          {list.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
              <span className="font-medium w-16">{u.id}</span>
              <span className="text-sm text-ink/70 w-16">{u.type}</span>
              <span className="text-sm text-ink/70 flex-1 min-w-[6rem]">{u.size}</span>
              <span className="text-sm w-24">{u.from}</span>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[u.status]}`}>{u.status}</span>
            </li>
          ))}
          {list.length === 0 && <li className="px-4 py-6 text-sm text-ink/60">No units match. Your team marks units available, on hold or sold in one place.</li>}
        </ul>
      </div>

      <div className="lg:col-span-5 min-w-0">
        <span className="label text-ink/55">Madhurawada, Visakhapatnam</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.02] tracking-tight">Sample Heights, a residential project</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/70">A project page does what the brochure and the sales office do together: it shows the project, says what is available and lets a buyer book a visit.</p>
        <p className="mt-4 text-[13px] text-ink/60">RERA no. P00000000000 (sample). Approvals, brochure download and location map sit here.</p>
        <div className="mt-6 flex flex-col gap-3">
          <a href={waLink("Hi, I opened the sample project page for Sample Heights. I want a page like this for our project.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1fa855] px-6 py-3.5 font-semibold text-white hover:brightness-105 transition">
            <MessageCircle size={18} aria-hidden /> Enquire on WhatsApp
          </a>
          <VisitPicker what="Sample Heights" />
        </div>
      </div>
    </div>
  );
}

export function SampleListingPage() {
  const [tab, setTab] = useState<"agent" | "builder">("agent");
  return (
    <div className="bg-paper text-ink font-sans antialiased overflow-x-clip">
      <SiteNav />
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-36 pb-16">
        <p className="rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm">
          <b>This is a sample.</b> Every property, price and project here is made up, to show how a page like this works. Your pages carry your own brand and details.
        </p>
        <h1 className="mt-8 font-display text-4xl md:text-6xl tracking-tight leading-[1.02]">What your <em className="text-red">listing page</em> could look like</h1>
        <div className="mt-6 inline-flex rounded-full border border-ink/20 p-1" role="tablist" aria-label="Sample type">
          {([["agent", "For agents"], ["builder", "For builders"]] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === k ? "bg-ink text-paper" : "text-ink/70 hover:text-ink"}`}>{l}</button>
          ))}
        </div>
        <div className="mt-10">{tab === "agent" ? <AgentView /> : <BuilderView />}</div>

        <div className="mt-16 rounded-3xl bg-ink p-8 md:p-12 text-paper">
          <p className="label text-gold">Want one like this</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">Send us one real property and we will build your first page.</h2>
          <a href={waLink("Hi, I want a branded listing page like the sample. Here is a property to start with.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-red px-7 py-3.5 font-semibold text-paper hover:brightness-110 transition">
            <MessageCircle size={18} aria-hidden /> Message us on WhatsApp
          </a>
          <p className="mt-5 text-sm text-paper/70">Or try it yourself: <a href="/listing-builder" className="underline underline-offset-4 decoration-red text-paper">paste your own listing and make a page free</a>.</p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
