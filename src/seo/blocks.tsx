import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import type { Cluster, Content } from "./content-types";
import { waLink, WHATSAPP } from "./data";

// Shared, SSR-safe building blocks for the search-facing pages. They render real content
// on the server, then become interactive in the browser. Nothing here invents a metric.

/* ───────────────────────────── count-up (final value is the SSR value) */
export function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already on screen at load: keep the real number
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ───────────────────────────── trust strip */
const TRUST: Record<Cluster, { k: string; n?: number; s?: string; v: string }[]> = {
  clinic: [
    { k: "Running live", v: "A Vizag orthopaedic clinic books and runs its day on it" },
    { k: "Languages", n: 3, v: "Telugu, English and Hindi, written the way people talk" },
    { k: "Slot hold", n: 15, s: " min", v: "A slot waits for payment, then goes back to the pool" },
    { k: "One team", v: "We design it, build it, train your desk and stay on" },
  ],
  web: [
    { k: "Shipped", v: "Clinic booking, restaurant ordering and brand campaigns, all live" },
    { k: "One team", v: "Design and code from the same people, no hand-off gap" },
    { k: "Search-ready", v: "Clean URLs, schema and fast pages from day one" },
    { k: "Based in Vizag", v: "In person here, over video everywhere else" },
  ],
  restaurant: [
    { k: "A working platform", v: "Scan, order together and pay, built and shown end to end in our Aavira study" },
    { k: "No app", v: "Guests scan a code and the menu opens in the browser" },
    { k: "Your kitchen", v: "Orders can flow into the point-of-sale you already run" },
    { k: "The waiter stays", v: "It takes the order, not the hospitality" },
  ],
  content: [
    { k: "One brief", v: "You tell us once. We write to it every month" },
    { k: "Edited by a person", v: "Every piece is rewritten and signed off before you see it" },
    { k: "Flat monthly fee", v: "Agreed up front, with the writing included" },
    { k: "You approve", v: "Nothing is published without your yes" },
  ],
  guide: [
    { k: "From the desk", v: "Written by the people who build and run these systems" },
    { k: "No invented numbers", v: "We only quote what we have actually measured" },
    { k: "Plain language", v: "Written so you can act on it today" },
    { k: "Ask us", v: "A real person answers on WhatsApp" },
  ],
};

export function TrustStrip({ cluster }: { cluster: Cluster }) {
  return (
    <section aria-label="Why trust us" className="border-y border-paper-line bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper-line">
        {TRUST[cluster].map((t) => (
          <div key={t.k} className="bg-white p-6 md:p-8">
            <div className="label text-[10px] text-[#8a6d2f]">{t.k}</div>
            {t.n ? (
              <div className="mt-3 font-display text-4xl md:text-5xl leading-none">
                <Count to={t.n} suffix={t.s} />
              </div>
            ) : null}
            <p className={`${t.n ? "mt-3" : "mt-4"} text-[14px] leading-relaxed text-ink/75`}>{t.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────── honest fit */
const FIT: Record<Cluster, { yes: string[]; no: string[] }> = {
  clinic: {
    yes: [
      "You run a clinic or small practice and want patients to book without phoning",
      "You are happy for patients to book on WhatsApp and in Telugu",
      "You want someone who sits with your front desk, not someone who emails a login",
      "You like the idea of a slot being real only once it is paid for",
      "You want booking first, with records, prescriptions or billing as the next phase",
    ],
    no: [
      "You want a ready-made tool you can switch on today with no setup",
      "You want it live in two days",
      "Price is the only thing you are comparing",
      "You want booking to stay on paper",
    ],
  },
  web: {
    yes: [
      "You want design and code from one team",
      "You care how it looks and how fast it loads on a mid-range phone",
      "You want it set up for search from day one",
      "You would like us around after launch",
    ],
    no: [
      "You want a template site by tomorrow",
      "You need a team of fifty developers",
      "You are choosing on the lowest quote alone",
      "You want a guaranteed first-page ranking, which nobody honest can sell",
    ],
  },
  restaurant: {
    yes: [
      "You want ordering that feels like your room, not a generic menu",
      "You are happy to pilot on a few tables first",
      "You see your waiters as the heart of service",
    ],
    no: [
      "You want to cut floor staff with a QR code",
      "You want a generic menu in an afternoon",
      "Your kitchen cannot receive digital orders and you will not change that",
    ],
  },
  content: {
    yes: [
      "You know content matters but nobody has the time to write it",
      "You want a steady blog and newsletter without managing writers",
      "You are happy to give one clear brief and review the pieces",
      "You would rather pay a flat monthly fee than per word",
    ],
    no: [
      "You want hundreds of cheap posts a week",
      "You want a ranking guarantee, which nobody honest can sell",
      "You want deep expert interviews for every single piece",
      "You want to publish without reading anything first",
    ],
  },
  guide: { yes: [], no: [] },
};

export function FitBlock({ cluster }: { cluster: Cluster }) {
  const f = FIT[cluster];
  if (!f.yes.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <span className="label text-[#8a6d2f]">Straight talk</span>
      <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl text-balance">We are not for everyone, and that is fine.</h2>
      <div className="reveal-up mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-paper-line bg-white p-7 md:p-9">
          <h3 className="label text-[10px] text-ink">A good fit if</h3>
          <ul className="mt-5 space-y-3.5">
            {f.yes.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                <Check className="mt-1 w-4 h-4 shrink-0 text-[#0c7a68]" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-paper-line p-7 md:p-9">
          <h3 className="label text-[10px] text-ink/60">Probably not if</h3>
          <ul className="mt-5 space-y-3.5">
            {f.no.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-ink/65">
                <span aria-hidden className="mt-2.5 block w-3 h-px shrink-0 bg-ink/40" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── what happens next + what to send */
const SEND: Record<Cluster, string[]> = {
  clinic: ["What kind of clinic you run, and in which city", "How patients reach you today: calls, WhatsApp, walk-ins", "The one thing at the front desk you would fix first"],
  web: ["What your business does, and who you sell to", "What the website or software needs to do", "Any site or product you admire, and any deadline"],
  restaurant: ["Your venue, your city and how many tables", "Whether your kitchen uses a point-of-sale system", "What slows down service on a busy night"],
  content: ["What your business does and who you write for", "The topics you want to be known for, and how you want to sound", "Posts or pages of yours that already sound like you"],
  guide: ["What you run and where", "What you are trying to decide", "Anything you would like a second opinion on"],
};

export function NextSteps({ href, label, cluster = "web" }: { href: string; label: string; cluster?: Cluster }) {
  const steps = [
    { t: "You message us", d: "A few lines is plenty. Tell us about your business and what is not working." },
    { t: "We ask the right questions", d: "How your day runs, who your customers are, and what you have tried." },
    { t: "You get a written plan", d: "Scope, what is included, what is not, and a quote against it." },
    { t: "We start small", d: "A pilot or first milestone, so you see it working before you commit further." },
  ];
  return (
    <section className="border-t border-paper-line bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <span className="label text-[#8a6d2f]">What happens when you message us</span>
        <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl text-balance">Four steps, and you are in control of each one.</h2>
        <ol className="reveal-stagger mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-paper-line bg-paper p-7">
              <span className="font-mono text-sm text-red">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl leading-tight">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-2xl border border-paper-line bg-paper-dim p-7 md:p-9">
            <h3 className="font-display text-2xl">Not sure what to write? Send us these three lines.</h3>
            <ol className="mt-5 space-y-3">
              {SEND[cluster].map((t, i) => (
                <li key={t} className="flex gap-4 text-[16px] leading-relaxed text-ink/85">
                  <span className="mt-0.5 font-mono text-sm text-red">{i + 1}</span> {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 rounded-2xl bg-ink text-paper p-7 md:p-9 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-3xl leading-tight">Ready when you are.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/70">We read every message ourselves. No sales script, no pressure.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-red text-white label rounded-full px-7 py-4 hover:bg-red-deep transition-colors">
                {label} <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
              <a href={`tel:+${WHATSAPP}`} className="text-center text-paper/75 hover:text-paper transition-colors text-sm underline underline-offset-4 decoration-paper/30">or call +91 93908 52636</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── what you will have on launch day */
const GETS: Record<Cluster, { t: string; d: string }[]> = {
  clinic: [
    { t: "A booking page on your own web address", d: "Your schedule, visit types and fees, in Telugu, English and Hindi, designed to look like your clinic." },
    { t: "A WhatsApp assistant on your clinic number", d: "It books, reschedules, cancels and answers timings and fees, with quick-reply buttons." },
    { t: "Pay to confirm, with refunds built in", d: "UPI and cards. A slot waits fifteen minutes for payment, and paid cancellations refund automatically." },
    { t: "A front desk screen your reception will use", d: "A live token queue, walk-ins, collections, and a switch for the doctor being in, late or away." },
    { t: "Reminders and notices that send themselves", d: "An evening-before reminder, a nudge when a hold lapses, and a broadcast for running-late days." },
    { t: "Training and a printed handbook", d: "An illustrated guide for your reception and a walkthrough on the day you go live." },
  ],
  web: [
    { t: "A site designed for your business", d: "Custom design and type at phone and desktop width, not a template with your logo on it." },
    { t: "A build ready for search", d: "Clean addresses, page titles, descriptions, structured data and fast loading from day one." },
    { t: "Your language, properly", d: "Telugu, Hindi and English that read well and render well." },
    { t: "The tools your customers already use", d: "WhatsApp, UPI payments, booking or ordering, wired in where they help." },
    { t: "Analytics and Search Console", d: "Set up at launch, so you can see who arrives and what they search for." },
    { t: "Clear ownership and support", d: "Who owns the code, domain and accounts is agreed in writing, and we stay on after launch." },
  ],
  restaurant: [
    { t: "A QR code for every table", d: "One scan, no app. It opens in the phone's browser." },
    { t: "A menu that looks like your room", d: "Photography, prices, veg and bar flags, bestsellers and daily specials, in your brand." },
    { t: "Group ordering", d: "One shared cart for the whole table, with one host sending the order." },
    { t: "An AI host that knows your menu", d: "It suggests pairings, specials and the second round in your voice." },
    { t: "Loyalty and occasions", d: "Birthday and anniversary perks, and a rating that earns a coupon for next time." },
    { t: "A line to your kitchen", d: "Orders can flow into the point-of-sale system you already run." },
  ],
  content: [
    { t: "A written brief", d: "Your audience, tone, topics, words to use and words to avoid, in one page we both agree on." },
    { t: "A plan for the first month", d: "Titles and angles for approval before anyone writes a word." },
    { t: "A sample piece", d: "One piece on a topic you choose, so you can judge the quality before you commit." },
    { t: "Blog posts and newsletters", d: "Edited, formatted and ready to publish or paste into the email tool you already use." },
    { t: "A simple approval routine", d: "You read, you ask for changes, you approve. Nothing goes out without your yes." },
    { t: "A person to ask", d: "One contact for questions, changes to the brief and anything that is not working." },
  ],
  guide: [],
};

export function Deliverables({ cluster, accent }: { cluster: Cluster; accent: string }) {
  const items = GETS[cluster];
  if (!items.length) return null;
  return (
    <section className="bg-white border-y border-paper-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <span className="label" style={{ color: accent }}>What you will have on launch day</span>
        <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl text-balance">Not a login and a promise. Working things you can use.</h2>
        <ul className="reveal-stagger mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g, i) => (
            <li key={g.t} className="rounded-2xl border border-paper-line bg-paper p-7">
              <span className="font-mono text-sm" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-2xl leading-tight">{g.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{g.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────────── what it looks like (real screens) */
const SHOTS: Record<Cluster, { src: string; cap: string; kind: "phone" | "wide"; alt: string }[]> = {
  clinic: [
    { src: "/case/ortho/hero-m.webp", cap: "Patients book on their phone, in their language", kind: "phone", alt: "Clinic website on a phone" },
    { src: "/case/ortho/rc-chat-m.webp", cap: "An assistant answers and books, with one-tap replies", kind: "phone", alt: "Clinic assistant chat" },
    { src: "/case/ortho/admin-d.webp", cap: "The front desk runs the day from one live queue", kind: "wide", alt: "Front desk queue dashboard" },
  ],
  restaurant: [
    { src: "/case/aavira/hero.webp", cap: "The Aavira study: brand and guest ordering", kind: "wide", alt: "Aavira restaurant study hero" },
  ],
  web: [
    { src: "/case/ortho/hero-d.webp", cap: "A clinic's booking site, live", kind: "wide", alt: "Clinic booking website" },
    { src: "/case/ortho/admin-d.webp", cap: "A front desk dashboard, live", kind: "wide", alt: "Front desk queue dashboard" },
    { src: "/images/Hyd'Tel.webp", cap: "Regional campaign creative, in Telugu", kind: "wide", alt: "Telugu campaign creative" },
  ],
  content: [],
  guide: [],
};
const SHOT_NOTE: Record<Cluster, string> = {
  clinic: "Real screens from a live clinic. The front desk view is shown with demo patients.",
  restaurant: "Our flagship study, not a client project. The prototype is on the case page.",
  web: "Real work: a clinic booking site and dashboard, and a regional campaign.",
  content: "",
  guide: "",
};

export function Gallery({ cluster, accent }: { cluster: Cluster; accent: string }) {
  const shots = SHOTS[cluster];
  if (!shots.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <span className="label" style={{ color: accent }}>What it looks like</span>
      <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] max-w-3xl text-balance">See it before you talk to us.</h2>
      <div className="reveal-stagger mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        {shots.map((s) => (
          <figure key={s.src} className="rounded-2xl border border-paper-line bg-white p-5">
            <div className={`${s.kind === "phone" ? "mx-auto w-[190px] rounded-[1.6rem] bg-black p-1.5" : "overflow-hidden rounded-lg border border-paper-line"}`}>
              <img src={s.src} alt={s.alt} loading="lazy" className={`${s.kind === "phone" ? "rounded-[1.25rem] aspect-[390/844] object-cover object-top" : "aspect-[16/10] object-cover object-top"} w-full block`} />
            </div>
            <figcaption className="mt-4 text-[14px] leading-snug text-ink/70 text-center">{s.cap}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-[12px] text-ink/55">{SHOT_NOTE[cluster]}</p>
    </section>
  );
}

/* ───────────────────────────── how pricing works (no invented numbers) */
const PRICE: Record<Cluster, string[]> = {
  clinic: ["The number of doctors and locations", "Which payment, WhatsApp and records integrations you need", "How much training and on-site support you want"],
  web: ["How many pages, and whether it needs a database or logins", "How custom the design is", "Integrations such as payments, WhatsApp and booking"],
  restaurant: ["The number of tables and outlets", "Whether it connects to your point-of-sale", "How custom the menu and brand design are"],
  content: ["How many blog posts and newsletters you want each month", "How much interviewing or review you want to do", "Whether you also want help publishing and scheduling"],
  guide: [],
};

export function PricingNote({ cluster }: { cluster: Cluster }) {
  const items = PRICE[cluster];
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
      <div className="rounded-3xl border border-paper-line bg-paper-dim p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <span className="label text-[#8a6d2f]">How pricing works</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08] text-balance">We quote against a written plan, not a guess.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/70">A flat price list would be wrong for most of the people reading this. After a short walkthrough you get scope, what is included, what is not, and a number you can hold us to.</p>
        </div>
        <div className="lg:col-span-7">
          <h3 className="label text-[10px] text-ink/60">What moves the price most</h3>
          <ul className="mt-4 space-y-3">
            {items.map((t) => (
              <li key={t} className="flex gap-3 rounded-xl bg-white border border-paper-line px-5 py-4 text-[15px] text-ink/85">
                <span aria-hidden className="mt-2 block w-1.5 h-1.5 shrink-0 rounded-full bg-red" /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-ink/60">If a project does not need a custom build, we will say so.</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── sticky WhatsApp bar (appears after the hero) */
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden px-4 pt-3 bg-gradient-to-t from-paper via-paper/95 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      aria-hidden={!show}
    >
      <a href={href} target="_blank" rel="noreferrer" tabIndex={show ? 0 : -1} className="flex items-center justify-center gap-2 bg-red text-white label rounded-full px-6 py-4 shadow-2xl">
        {label} <ArrowUpRight className="w-4 h-4" aria-hidden />
      </a>
    </div>
  );
}

/* ───────────────────────────── checkable list (interactive) */
export function CheckList({ items, id }: { items: string[]; id: string }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const count = Object.values(done).filter(Boolean).length;
  return (
    <div className="mt-6 rounded-2xl border border-paper-line bg-paper-dim p-5 md:p-7 not-prose">
      <ul className="space-y-1">
        {items.map((t, i) => (
          <li key={t}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-paper transition-colors">
              <input type="checkbox" className="peer sr-only" checked={!!done[i]} onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))} aria-describedby={`${id}-p`} />
              <span aria-hidden className="mt-0.5 grid w-5 h-5 shrink-0 place-items-center rounded-md border border-ink/30 bg-paper text-transparent transition-colors peer-checked:bg-red peer-checked:border-red peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className={`text-[15px] leading-relaxed transition-colors ${done[i] ? "text-ink/45 line-through decoration-ink/25" : "text-ink/85"}`}>{t}</span>
            </label>
          </li>
        ))}
      </ul>
      <div id={`${id}-p`} className="mt-4 flex items-center gap-3" aria-live="polite">
        <div className="h-1.5 flex-1 rounded-full bg-paper-line overflow-hidden">
          <div className="h-full rounded-full bg-red transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: `${(count / items.length) * 100}%` }} />
        </div>
        <span className="font-mono text-[11px] text-ink/60 tabular-nums">{count}/{items.length}{count === items.length ? " · nice" : ""}</span>
      </div>
    </div>
  );
}

/* ───────────────────────────── moment 1: try the booking (clinics) */
const DAYS = ["Tomorrow", "Day after", "Friday"];
const TIMES = ["10:15 AM", "10:30 AM", "11:00 AM", "6:15 PM", "6:45 PM", "7:15 PM"];

export function BookingSim() {
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [stage, setStage] = useState<"pick" | "hold" | "paid" | "lapsed">("pick");
  const [secs, setSecs] = useState(900);
  useEffect(() => {
    if (stage !== "hold") return;
    const id = setInterval(() => setSecs((s) => (s <= 1 ? (setStage("lapsed"), 0) : s - 1)), 1000);
    return () => clearInterval(id);
  }, [stage]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const reset = () => { setStage("pick"); setTime(null); setSecs(900); };
  const chip = (on: boolean) => `rounded-xl border px-3 py-2.5 text-[13px] transition-colors active:scale-[0.97] ${on ? "bg-[#0c7a68] border-[#0c7a68] text-white font-medium" : "border-paper-line bg-white text-ink/85 hover:border-ink/40"}`;
  return (
    <div className="rounded-3xl border border-paper-line bg-white p-5 md:p-8 shadow-[0_20px_60px_-30px_rgba(11,11,12,0.25)]">
      <div className="flex items-center justify-between">
        <span className="label text-[10px] text-[#0c7a68]">Try it · a booking, the way a patient sees it</span>
        <span className="label text-[9px] text-ink/55">demo</span>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          {stage === "pick" && (
            <div>
              <h3 className="font-display text-2xl">Pick a day and a time</h3>
              <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Day">
                {DAYS.map((d, i) => <button key={d} type="button" onClick={() => setDay(i)} aria-pressed={day === i} className={chip(day === i)}>{d}</button>)}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Time">
                {TIMES.map((t) => <button key={t} type="button" onClick={() => setTime(t)} aria-pressed={time === t} className={chip(time === t)}>{t}</button>)}
              </div>
              <button type="button" disabled={!time} onClick={() => { setStage("hold"); setSecs(900); }} className="mt-5 w-full rounded-full bg-red px-6 py-3.5 label text-[11px] text-white transition-opacity disabled:opacity-35">
                Hold this slot
              </button>
            </div>
          )}
          {stage === "hold" && (
            <div>
              <h3 className="font-display text-2xl">Slot held for you</h3>
              <p className="mt-2 text-sm text-ink/65">{DAYS[day]} · {time}. Nobody else can take it while you pay.</p>
              <div className="mt-5 font-display text-6xl tabular-nums text-ink" aria-live="off">{mm}:{ss}</div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => setStage("paid")} className="rounded-full bg-red px-6 py-3.5 label text-[11px] text-white">Pay to confirm</button>
                <button type="button" onClick={() => { setSecs(0); setStage("lapsed"); }} className="rounded-full border border-paper-line px-6 py-3.5 label text-[11px] text-ink/80 hover:border-ink/40">Let it lapse</button>
              </div>
            </div>
          )}
          {stage === "paid" && (
            <div>
              <h3 className="font-display text-2xl">Confirmed. Token 7.</h3>
              <p className="mt-2 text-sm text-ink/65">Payment landed, so the hold became a real appointment. A reminder will go out the evening before.</p>
              <button type="button" onClick={reset} className="mt-5 rounded-full border border-paper-line px-6 py-3 label text-[11px] text-ink/80 hover:border-ink/40">Book another</button>
            </div>
          )}
          {stage === "lapsed" && (
            <div>
              <h3 className="font-display text-2xl">The slot went back</h3>
              <p className="mt-2 text-sm text-ink/65">Unpaid holds return to the pool for the next patient, and the patient gets a nudge with a fresh link. That is how empty slots get filled.</p>
              <button type="button" onClick={reset} className="mt-5 rounded-full border border-paper-line px-6 py-3 label text-[11px] text-ink/80 hover:border-ink/40">Try again</button>
            </div>
          )}
        </div>

        {/* the other side: what the front desk sees */}
        <div className="rounded-2xl border border-paper-line bg-paper-dim p-5">
          <div className="label text-[9px] text-ink/55">Front desk · live queue</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5"><span>#5 · Seen</span><span className="text-grey-dim text-[12px]">Paid online</span></li>
            <li className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5"><span>#6 · In consult</span><span className="text-grey-dim text-[12px]">Paid online</span></li>
            <li className={`flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-500 ${stage === "paid" ? "bg-[#0c7a68]/10 border border-[#0c7a68]/50" : stage === "hold" ? "border border-dashed border-[#8a6d2f]/60" : "border border-transparent opacity-40"}`}>
              <span>{stage === "paid" ? "#7 · You" : stage === "hold" ? "Held · you" : "Open slot"}</span>
              <span className="text-[12px] text-ink/60">{stage === "paid" ? "Paid online" : stage === "hold" ? `Waiting for payment` : stage === "lapsed" ? "Released" : "Free"}</span>
            </li>
          </ul>
          <p className="mt-4 text-[12px] leading-relaxed text-ink/60">The desk never types the booking in. It appears here the moment it is real.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── moment 2: scan the table (restaurants) */
const DISHES = ["Gongura chicken", "Prawn pepper fry", "Paneer tikka", "Kaju payasam"];

export function TableSim() {
  const [stage, setStage] = useState<"scan" | "menu" | "sent">("scan");
  const [cart, setCart] = useState<string[]>([]);
  const add = (d: string) => setCart((c) => [...c, d]);
  return (
    <div className="rounded-3xl border border-paper-line bg-white p-5 md:p-8 shadow-[0_20px_60px_-30px_rgba(11,11,12,0.25)]">
      <div className="flex items-center justify-between">
        <span className="label text-[10px] text-[#a8651c]">Try it · scan a table, order together</span>
        <span className="label text-[9px] text-ink/55">demo menu</span>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          {stage === "scan" && (
            <button type="button" onClick={() => setStage("menu")} className="group flex w-full items-center gap-5 rounded-2xl border border-paper-line p-5 text-left hover:border-[#a8651c]/70 transition-colors">
              <svg viewBox="0 0 7 7" className="w-20 h-20 shrink-0 rounded-lg bg-paper p-1.5 text-ink" aria-hidden>
                {[[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],[4,0],[5,0],[6,0],[4,1],[6,1],[4,2],[5,2],[6,2],[0,4],[1,4],[2,4],[0,5],[2,5],[0,6],[1,6],[2,6],[4,4],[6,4],[5,5],[4,6],[6,6],[3,3],[3,1],[1,3],[5,3]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />)}
              </svg>
              <span>
                <span className="block font-display text-2xl">Table 7</span>
                <span className="mt-1 block text-sm text-ink/65 group-hover:text-paper transition-colors">Tap to scan. No app, no download.</span>
              </span>
            </button>
          )}
          {stage === "menu" && (
            <div>
              <h3 className="font-display text-2xl">Add to the table's cart</h3>
              <ul className="mt-4 space-y-2">
                {DISHES.map((d) => (
                  <li key={d} className="flex items-center justify-between rounded-xl border border-paper-line px-4 py-3">
                    <span className="text-[15px]">{d}</span>
                    <button type="button" onClick={() => add(d)} className="rounded-full border border-paper-line px-4 py-1.5 label text-[10px] hover:border-[#a8651c] hover:text-[#a8651c] transition-colors active:scale-95">Add</button>
                  </li>
                ))}
              </ul>
              <button type="button" disabled={!cart.length} onClick={() => setStage("sent")} className="mt-5 w-full rounded-full bg-red px-6 py-3.5 label text-[11px] text-white transition-opacity disabled:opacity-35">
                Send to the kitchen
              </button>
            </div>
          )}
          {stage === "sent" && (
            <div>
              <h3 className="font-display text-2xl">Sent. Your waiter is free to pour the wine.</h3>
              <p className="mt-2 text-sm text-ink/65">The order is with the kitchen, and nobody had to wave anyone down. That is the point: the technology takes the order, and the person takes care of the guest.</p>
              <button type="button" onClick={() => { setCart([]); setStage("scan"); }} className="mt-5 rounded-full border border-paper-line px-6 py-3 label text-[11px] text-ink/80 hover:border-ink/40">Start over</button>
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-paper-line bg-paper-dim p-5">
          <div className="label text-[9px] text-ink/55">Table 7 · shared cart</div>
          <ul className="mt-4 space-y-2 text-sm min-h-[7rem]">
            {cart.length === 0 && <li className="text-ink/65">Nothing yet. Everyone at the table adds to the same cart.</li>}
            {cart.map((d, i) => (
              <li key={`${d}${i}`} className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5">
                <span>{d}</span>
                <span className="text-[12px] text-ink/60">{i % 2 ? "Guest B" : "Guest A"}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] leading-relaxed text-ink/60">One host sends the order. No more shouting dishes across the table.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── moment 3: see it on a phone (web) */
const SHOWS = [
  { k: "ortho", name: "A clinic's booking site", desktop: "/case/ortho/hero-d.webp", phone: "/case/ortho/hero-m.webp", alt: "Clinic booking site" },
  { k: "ortho-desk", name: "A front desk dashboard", desktop: "/case/ortho/admin-d.webp", phone: "/case/ortho/admin-m.webp", alt: "Front desk dashboard" },
];

export function DeviceSwitch() {
  const [show, setShow] = useState(0);
  const [phone, setPhone] = useState(true);
  const s = SHOWS[show];
  const tab = (on: boolean) => `rounded-full border px-4 py-2 label text-[10px] transition-colors ${on ? "bg-ink text-paper border-ink" : "border-paper-line text-ink/80 hover:border-ink/40"}`;
  return (
    <div className="rounded-3xl border border-paper-line bg-white p-5 md:p-8 shadow-[0_20px_60px_-30px_rgba(11,11,12,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="label text-[10px] text-[#8a6d2f]">Try it · phone first, then desktop</span>
        <div className="flex gap-2">
          <button type="button" className={tab(phone)} aria-pressed={phone} onClick={() => setPhone(true)}>Phone</button>
          <button type="button" className={tab(!phone)} aria-pressed={!phone} onClick={() => setPhone(false)}>Desktop</button>
        </div>
      </div>
      <div className="mt-5 flex gap-2" role="group" aria-label="Example">
        {SHOWS.map((x, i) => <button key={x.k} type="button" className={tab(show === i)} aria-pressed={show === i} onClick={() => setShow(i)}>{x.name}</button>)}
      </div>
      <div className="mt-8 grid place-items-center min-h-[22rem] md:min-h-[26rem]">
        {phone ? (
          <div className="rounded-[2rem] p-2 bg-black border border-paper-line shadow-2xl w-[220px] md:w-[250px]">
            <img src={s.phone} alt={`${s.alt} on a phone`} className="w-full rounded-[1.5rem] aspect-[390/844] object-cover object-top" loading="lazy" />
          </div>
        ) : (
          <div className="w-full max-w-[640px] rounded-xl overflow-hidden border border-paper-line shadow-2xl">
            <div className="h-6 bg-paper-dim flex items-center gap-1.5 px-3">{[0, 1, 2].map((d) => <i key={d} className="block w-2 h-2 rounded-full bg-ink/25" />)}</div>
            <img src={s.desktop} alt={`${s.alt} on a desktop`} className="w-full block" loading="lazy" />
          </div>
        )}
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-ink/65 text-center">Real screens from live work. We design at phone width first, because that is where most of your visitors are.</p>
    </div>
  );
}

/* ───────────────────────────── content retainer: from one brief to a month */
const FLOW = [
  { k: "Brief", you: "Tell us once: who you write for, how you sound, what to cover and what is off limits.", we: "We capture it in a one-page brief we both agree on, and keep it up to date as your business changes." },
  { k: "Plan", you: "Look at the proposed titles and angles for the month. Swap, cut or add.", we: "We propose the month's pieces ahead of time, tied to what your customers search for and ask." },
  { k: "Draft and edit", you: "Nothing. This is the part you never touch.", we: "AI helps with the first draft. A person rewrites every piece for voice, accuracy and clarity, and signs it off." },
  { k: "Approve", you: "Read in your own time, ask for changes, approve.", we: "We revise, deliver in a publish-ready format, and start planning next month." },
];
export function ContentFlow() {
  const [i, setI] = useState(0);
  const f = FLOW[i];
  const tab = (on: boolean) => `rounded-full border px-4 py-2 label text-[10px] transition-colors ${on ? "bg-ink text-paper border-ink" : "border-paper-line text-ink/70 hover:border-ink"}`;
  return (
    <div className="rounded-3xl border border-paper-line bg-white p-5 md:p-8 shadow-[0_20px_60px_-30px_rgba(11,11,12,0.25)]">
      <span className="label text-[10px] text-[#5b4bd6]">Try it · from one brief to a month of content</span>
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Steps">
        {FLOW.map((x, k) => <button key={x.k} type="button" role="tab" aria-selected={i === k} className={tab(i === k)} onClick={() => setI(k)}>{k + 1} · {x.k}</button>)}
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-4" key={i}>
        <div className="reveal-up rounded-2xl border border-paper-line bg-paper p-6">
          <div className="label text-[10px] text-ink/55">What you do</div>
          <p className="mt-3 font-display text-2xl leading-snug">{f.you}</p>
        </div>
        <div className="reveal-up rounded-2xl border border-paper-line p-6" style={{ background: "#efecff" }}>
          <div className="label text-[10px] text-[#5b4bd6]">What we do</div>
          <p className="mt-3 font-display text-2xl leading-snug">{f.we}</p>
        </div>
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-ink/65 text-center">An illustration of the process. Your own plan, number of pieces and schedule are agreed with you.</p>
    </div>
  );
}

export function Moment({ cluster }: { cluster: Cluster }) {
  if (cluster === "clinic") return <BookingSim />;
  if (cluster === "restaurant") return <TableSim />;
  if (cluster === "web") return <DeviceSwitch />;
  if (cluster === "content") return <ContentFlow />;
  return null;
}

/* ───────────────────────────── related links */
export function RelatedLinks({ items, heading = "Keep reading" }: { items: { path: string; label: string; hint?: string }[]; heading?: string }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
      <span className="label text-ink/60">{heading}</span>
      <ul className="reveal-stagger mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((r) => (
          <li key={r.path}>
            <a href={r.path} className="group block h-full rounded-2xl border border-paper-line bg-white p-6 hover:border-[#8a6d2f]/60 transition-colors">
              <h3 className="font-display text-xl leading-tight group-hover:text-[#8a6d2f] transition-colors">{r.label}</h3>
              {r.hint && <p className="mt-2 text-[13px] leading-relaxed text-ink/65">{r.hint}</p>}
              <span className="mt-4 inline-flex items-center gap-1.5 label text-[10px] text-ink/80">Read more <ArrowUpRight className="w-3.5 h-3.5" aria-hidden /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const waFor = (c: Pick<Content, "ctaMessage">) => waLink(c.ctaMessage);
