import type { FC, ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { NextCase } from "../NextCase";
import { waLink } from "../../../seo/data";
import { AV, Wordmark, Mark } from "./brand";
import { DISH_IDS, DISHES } from "./dishes";
import { AaviraPrototype, type Screen } from "./Prototype";
import { LiveFloor } from "./LiveFloor";

// Aavira is our own flagship platform study. It is not a client job and the page says so.
// Everything here is an original brand and a working front-end prototype.

const Reveal: FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`reveal-up ${className}`}>{children}</div>
);

const META = [
  { k: "Type", v: "Self-initiated flagship study" },
  { k: "Brand", v: "Aavira, a fictional coastal kitchen and bar" },
  { k: "Year", v: "2026" },
  { k: "Role", v: "Product · Brand · Prototype · Build" },
  { k: "Stack", v: "Next.js · Supabase · Realtime · AI host" },
  { k: "Status", v: "Platform built, prototype on this page" },
];

const STEPS: { screen: Screen; tab: string; t: string; d: string }[] = [
  { screen: "scan", tab: "Scan", t: "A code on the table is the front door", d: "No app, no download, no account. The code opens the menu in the browser, already knowing which table and how many guests." },
  { screen: "menu", tab: "Browse", t: "A menu that looks like the room feels", d: "Every dish leads with a real photo, a veg mark and one line, with a tonight's special, a veg filter and categories that fit a thumb." },
  { screen: "host", tab: "Ask", t: "A host that knows the menu", d: "Aira answers in plain language: something spicy, something vegetarian, what is popular. It only ever suggests dishes that are on the menu." },
  { screen: "cart", tab: "Order", t: "One order for the whole table", d: "Everyone adds from their own phone to the same list. One person sends it, and the kitchen gets a single clean ticket." },
  { screen: "remember", tab: "Return", t: "The room remembers you", d: "Birthday week, tier progress, your usual order. The best single perk applies automatically, so offers never stack by accident." },
  { screen: "feedback", tab: "Feedback", t: "Ten seconds, then a reason to come back", d: "A star rating and a tap or two, answered with a code for next time. Unhappy guests reach the manager before they reach a review site." },
];

const SYSTEMS = [
  { t: "Guest ordering", d: "Per-table QR, shared cart, phone OTP, live order status." },
  { t: "AI host", d: "Grounded in the live menu and stock. Declines what it does not know." },
  { t: "Kitchen and floor", d: "One ticket per table, a waiter view, and calls for the bill or help." },
  { t: "Loyalty and offers", d: "Tiers, birthdays and anniversaries, one best offer applied." },
  { t: "Feedback loop", d: "Ratings in the moment, low scores routed to the manager." },
  { t: "Owner dashboard", d: "Menu, stock, offers, tables and a plain-language weekly read." },
];

function Range({ label, value, set, min, max, step, fmt }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; fmt: (n: number) => string }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between text-sm" style={{ color: AV.muted }}><span>{label}</span><span className="font-display text-xl" style={{ color: AV.cream }}>{fmt(value)}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full" style={{ accentColor: AV.turmeric }} />
    </label>
  );
}

function Calculator() {
  const [covers, setCovers] = useState(90);
  const [bill, setBill] = useState(1100);
  const [attach, setAttach] = useState(8);
  const [repeat, setRepeat] = useState(4);
  const days = 26;
  const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
  const { upsell, back, total } = useMemo(() => {
    const monthly = covers * days * bill;
    const u = monthly * (attach / 100);
    const r = monthly * (repeat / 100);
    return { upsell: u, back: r, total: u + r };
  }, [covers, bill, attach, repeat]);
  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-6 flex flex-col gap-8">
        <Range label="Guests served on an average night" value={covers} set={setCovers} min={30} max={300} step={5} fmt={(n) => `${n}`} />
        <Range label="Average spend per guest" value={bill} set={setBill} min={300} max={3000} step={50} fmt={inr} />
        <Range label="Extra spend when the menu is shown well and a host suggests" value={attach} set={setAttach} min={0} max={20} step={1} fmt={(n) => `${n}%`} />
        <Range label="Extra spend from guests who return sooner" value={repeat} set={setRepeat} min={0} max={15} step={1} fmt={(n) => `${n}%`} />
      </div>
      <div className="lg:col-span-6 rounded-3xl p-7 md:p-9" style={{ background: AV.surface, border: `1px solid ${AV.line}` }} aria-live="polite">
        <div className="label text-[10px]" style={{ color: AV.turmeric }}>Modelled, from your own inputs</div>
        <div className="mt-4 font-display text-5xl md:text-6xl leading-none" style={{ color: AV.cream }}>{inr(total)}<span className="text-xl" style={{ color: AV.muted }}> a month</span></div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm" style={{ color: AV.muted }}>
          <div><div className="font-display text-2xl" style={{ color: AV.cream }}>{inr(upsell)}</div>from better suggestions</div>
          <div><div className="font-display text-2xl" style={{ color: AV.cream }}>{inr(back)}</div>from guests returning</div>
        </div>
        <p className="mt-7 text-sm leading-relaxed" style={{ color: AV.dim }}>
          These are not results. We have not measured Aavira in a live room, so every percentage above is yours to set. Move them to what you honestly believe and see whether the idea is worth building.
        </p>
      </div>
    </div>
  );
}

export function AaviraCaseStudy() {
  const [screen, setScreen] = useState<Screen>("scan");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const walkRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress: walkP } = useScroll({ target: walkRef, offset: ["start start", "end end"] });
  useMotionValueEvent(walkP, "change", () => {
    if (window.innerWidth < 1024) return;
    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDist = Infinity;
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setScreen(STEPS[best].screen);
  });

  return (
    <div style={{ background: AV.ink, color: AV.cream }} className="font-sans antialiased selection:bg-[#e9a23b] selection:text-black">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(14,12,11,0.92)", borderBottom: `1px solid ${AV.line}`, paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px]" style={{ color: AV.muted }}><ArrowLeft className="w-4 h-4" /> made.</a>
          <span className="label text-[10px] hidden sm:block" style={{ color: AV.muted }}>Flagship study</span>
          <a href="/#say-hi" className="label text-[10px] rounded-full px-4 py-2" style={{ border: `1px solid ${AV.turmeric}`, color: AV.turmeric }}>Start a project</a>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] w-full overflow-hidden flex flex-col" style={{ background: AV.ink }}>
        <motion.div style={{ y: artY }} className="absolute inset-0 z-0" aria-hidden>
          <img data-vt-hero src="/case/aavira/hero-bg.webp" alt="" fetchPriority="high" className="absolute inset-0 w-full h-[112%] object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(55% 40% at 50% 46%, rgba(14,12,11,0.5), rgba(14,12,11,0) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[55%]" style={{ background: `linear-gradient(to top, ${AV.ink} 4%, rgba(14,12,11,0.7) 45%, rgba(14,12,11,0) 100%)` }} />
        </motion.div>
        <motion.div style={{ opacity: fade }} className="relative z-10 flex-1 flex items-center justify-center px-6 pt-24">
          <h1 style={{ filter: "drop-shadow(0 6px 30px rgba(0,0,0,.55))" }}><span className="sr-only">Aavira</span><Wordmark height={150} className="w-[78vw] max-w-[620px] h-auto" /></h1>
        </motion.div>
        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-14 md:pb-20">
          <span className="label" style={{ color: "#ffc467", textShadow: "0 1px 14px rgba(0,0,0,.9)" }}>flagship study · restaurant platform</span>
          <p className="mt-5 font-display text-2xl md:text-4xl leading-snug max-w-3xl" style={{ color: AV.cream }}>
            A coastal kitchen and bar, and the guest platform we designed to make every waiter three times more effective.
          </p>
          <p className="mt-4 text-base max-w-xl" style={{ color: AV.muted }}>Our own study, not a client project. The brand and the prototype below are ours; the photography is licensed stock.</p>
        </motion.div>
      </section>

      {/* META */}
      <section style={{ borderTop: `1px solid ${AV.line}`, borderBottom: `1px solid ${AV.line}` }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
          {META.map((m) => <div key={m.k}><div className="label text-[10px]" style={{ color: AV.dim }}>{m.k}</div><div className="mt-2 text-[15px] leading-snug">{m.v}</div></div>)}
        </div>
      </section>

            {/* THE FOOD: real photography */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24 md:pt-32">
        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          <figure className="md:col-span-7 md:row-span-2 relative overflow-hidden rounded-3xl" style={{ border: `1px solid ${AV.line}` }}>
            <img src="/case/aavira/p-leaf.webp" alt="A coastal feast served on a banana leaf" loading="lazy" className="w-full h-full object-cover aspect-[4/3] md:aspect-auto" />
          </figure>
          <figure className="md:col-span-5 relative overflow-hidden rounded-3xl" style={{ border: `1px solid ${AV.line}` }}>
            <img src="/case/aavira/p-chilli.webp" alt="Dry-roasted chilli and curry leaf on a black plate" loading="lazy" className="w-full object-cover aspect-[4/3]" />
          </figure>
          <figure className="md:col-span-5 relative overflow-hidden rounded-3xl" style={{ border: `1px solid ${AV.line}` }}>
            <img src="/case/aavira/p-prawn.webp" alt="Pepper prawns with onion" loading="lazy" className="w-full object-cover aspect-[4/3]" />
          </figure>
        </div>
        <p className="mt-5 text-[12px]" style={{ color: AV.dim }}>Mood photography is licensed stock from Unsplash, used to set the tone of the study. The platform, brand and prototype are ours.</p>
      </section>

      {/* BRIEF */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-36 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-4"><span className="label" style={{ color: AV.turmeric }}>The problem</span></Reveal>
        <Reveal className="lg:col-span-8">
          <p className="font-display text-3xl md:text-5xl leading-[1.08]">Restaurant tech is built for the owner's spreadsheet. The guest at the table gets a PDF menu and a long wait.</p>
          <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: AV.muted }}>
            A busy room runs on a few people doing too much. The waiter takes the order, answers what is good tonight, remembers who is celebrating, and chases the bill. We asked what happens if the guest's own phone takes the repeat work, so the waiter can spend the time on the part that is human.
          </p>
        </Reveal>
      </section>

      {/* BIG IDEA */}
      <section style={{ background: AV.surface, borderTop: `1px solid ${AV.line}`, borderBottom: `1px solid ${AV.line}` }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-6">
            <span className="label" style={{ color: AV.turmeric }}>The idea</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1] tracking-[-0.01em]">The waiter stays the hero.</h2>
            <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: AV.muted }}>
              Most QR menus try to remove the waiter. We did the opposite. The phone handles browsing, shared ordering and the small questions, so the waiter arrives knowing the table, the allergies and the occasion, and can host instead of hurry.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[["Browse", "the guest, on their phone"], ["Ask", "a grounded AI host"], ["Welcome", "the waiter, with context"]].map(([a, b]) => (
                <div key={a} className="rounded-2xl p-5 md:p-6" style={{ background: AV.ink, border: `1px solid ${AV.line}` }}>
                  <div className="font-display text-2xl md:text-3xl" style={{ color: AV.turmeric }}>{a}</div>
                  <div className="mt-2 text-sm leading-snug" style={{ color: AV.muted }}>{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BRAND */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-36">
        <Reveal><span className="label" style={{ color: AV.turmeric }}>The brand</span></Reveal>
        <Reveal><h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1] max-w-3xl">A name that smells like the kitchen.</h2></Reveal>
        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl grid place-items-center py-16 md:py-24" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
            <Wordmark height={64} className="max-w-[80%] h-auto" />
            <p className="mt-8 text-sm text-center max-w-sm px-6" style={{ color: AV.muted }}>Monoline letters with round ends. The "I" is a wisp of steam rising off a plate.</p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            <div className="rounded-3xl grid place-items-center py-10" style={{ background: AV.turmeric }}><Mark size={96} fg={AV.ink} bg={AV.turmeric} /></div>
            <div className="rounded-3xl grid place-items-center py-10" style={{ background: AV.cream }}><Wordmark height={26} color={AV.ink} /></div>
            <div className="col-span-2 rounded-3xl p-6 flex flex-col justify-between" style={{ background: AV.surface, border: `1px solid ${AV.line}` }}>
              <div className="label text-[10px]" style={{ color: AV.dim }}>Palette</div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {[["Charcoal", AV.ink], ["Surface", AV.surfaceHi], ["Cream", AV.cream], ["Turmeric", AV.turmeric], ["Ember", AV.ember]].map(([n, c]) => (
                  <div key={n}><div className="h-14 rounded-xl" style={{ background: c, border: `1px solid ${AV.line}` }} /><div className="mt-2 text-[11px]" style={{ color: AV.muted }}>{n}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Reveal className="mt-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div><span className="label" style={{ color: AV.turmeric }}>The menu</span><h3 className="mt-4 font-display text-3xl md:text-4xl">Photograph first, then read.</h3></div>
            <p className="text-sm max-w-sm" style={{ color: AV.muted }}>Every dish leads with a real photo, a veg mark and one line. Tap any dish in the prototype for the full sheet.</p>
          </div>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {DISH_IDS.map((id) => (
              <figure key={id} className="relative overflow-hidden rounded-2xl aspect-square" style={{ border: `1px solid ${AV.line}` }}>
                <img src={`/case/aavira/dishes/${id}.webp`} alt={DISHES[id].name} loading="lazy" className="w-full h-full object-cover" />
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* WALKTHROUGH */}
      <section ref={walkRef} style={{ background: AV.surface, borderTop: `1px solid ${AV.line}` }} aria-labelledby="walk-h">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24 md:pt-32">
          <span className="label" style={{ color: AV.turmeric }}>The guest flow</span>
          <h2 id="walk-h" className="mt-6 font-display text-4xl md:text-6xl leading-[1] max-w-3xl">From the table to the next visit.</h2>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-16 mt-12">
          <div className="lg:col-span-6 order-2 lg:order-1">
            {STEPS.map((s, i) => (
              <div key={s.screen} ref={(el) => { stepRefs.current[i] = el; }} className="lg:min-h-[70vh] flex items-center py-8 lg:py-0">
                <div style={{ opacity: screen === s.screen ? 1 : undefined }} className="transition-opacity duration-500 lg:opacity-40" data-active={screen === s.screen}>
                  <div className="label text-[10px]" style={{ color: AV.turmeric }}>0{i + 1} · {s.tab}</div>
                  <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight">{s.t}</h3>
                  <p className="mt-4 text-lg leading-relaxed max-w-md" style={{ color: AV.muted }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start flex justify-center">
            <div className="w-full max-w-[340px] rounded-[44px] p-2.5" style={{ background: "#050404", border: `1px solid ${AV.line}`, boxShadow: "0 40px 90px -30px rgba(0,0,0,.8)" }}>
              <AaviraPrototype screen={screen} onScreen={setScreen} className="rounded-[36px]" />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE FLOOR */}
      <section style={{ borderTop: `1px solid ${AV.line}` }} aria-labelledby="floor-h">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: AV.turmeric }}>Try it, both sides</span>
          <h2 id="floor-h" className="mt-6 font-display text-4xl md:text-6xl leading-[1] max-w-3xl">Place an order. Watch the room react.</h2>
          <p className="mt-5 text-lg max-w-2xl" style={{ color: AV.muted }}>Add dishes, open Table and send. A ticket lands in the kitchen, the waiter gets an alert and the owner's numbers move. Tap Cook or Serve to push it along and the phone updates. It is a prototype: nothing here is saved or sent.</p>
          <div className="mt-14"><LiveFloor /></div>
        </div>
      </section>

      {/* SYSTEMS */}
      <section style={{ borderTop: `1px solid ${AV.line}` }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <span className="label" style={{ color: AV.turmeric }}>Behind the phone</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1] max-w-3xl">Six systems, one platform.</h2>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden" style={{ background: AV.line, border: `1px solid ${AV.line}` }}>
            {SYSTEMS.map((s, i) => (
              <div key={s.t} className="p-7 md:p-9" style={{ background: AV.ink }}>
                <div className="label text-[10px]" style={{ color: AV.dim }}>0{i + 1}</div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl">{s.t}</h3>
                <p className="mt-3 leading-relaxed" style={{ color: AV.muted }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ background: AV.surface, borderTop: `1px solid ${AV.line}`, borderBottom: `1px solid ${AV.line}` }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <span className="label" style={{ color: AV.turmeric }}>Is it worth it</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1] max-w-3xl">Set your own numbers.</h2>
          <p className="mt-5 text-lg max-w-xl" style={{ color: AV.muted }}>We will not quote you a lift we have not measured. Use your own room and your own honest guess.</p>
          <div className="mt-14"><Calculator /></div>
        </div>
      </section>

      {/* HOW WE'D BUILD YOURS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-36 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-4"><span className="label" style={{ color: AV.turmeric }}>For your restaurant</span></Reveal>
        <Reveal className="lg:col-span-8">
          <h2 className="font-display text-4xl md:text-6xl leading-[1]">We would build yours, in your own brand.</h2>
          <ol className="mt-10 grid gap-6 max-w-2xl">
            {[["Week one", "We learn the room: your menu, your tables, how your waiters work."], ["Week two", "We design your brand layer and shoot or style your signature dishes."], ["Week three", "A working pilot on your tables, with your staff trained and your menu loaded."]].map(([a, b]) => (
              <li key={a} className="grid grid-cols-[110px_1fr] gap-4 pb-6" style={{ borderBottom: `1px solid ${AV.line}` }}>
                <span className="label text-[11px]" style={{ color: AV.turmeric }}>{a}</span><span className="text-lg" style={{ color: AV.muted }}>{b}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: AV.turmeric, color: AV.ink }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="font-display text-4xl md:text-7xl leading-[0.98] max-w-3xl">Want this for your restaurant?</h2>
          <div className="flex flex-wrap gap-3">
            <a href={waLink("Hi, I saw the Aavira study and want something like it for my restaurant.")} className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold" style={{ background: AV.ink, color: AV.cream }}>Message us on WhatsApp <ArrowUpRight className="w-4 h-4" /></a>
            <a href="/#say-hi" className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold" style={{ border: `1px solid ${AV.ink}` }}>Send a note</a>
          </div>
        </div>
      </section>

      <NextCase current="aavira" bg={AV.ink} text={AV.cream} muted={AV.muted} line={AV.line} accent={AV.turmeric} />
    </div>
  );
}
