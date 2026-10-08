import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Mascot, type Reaction } from "./Mascot";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { EMAIL, waLink } from "../seo/contact";

// The founder story. The mascot is a drawn stand-in for the founder until a real photo
// replaces it: it narrates, and reacts as each chapter arrives. Every claim here comes from
// work we can point to. No invented dates, numbers or clients. Team voice, sentence case.
const SHEETS = {
  directions: "/mascots/founder-directions.webp",
  reactions: "/mascots/founder-reactions.webp",
};

type Shot = { src: string; w: number; h: number; alt: string };

const Frame = ({ s, className = "" }: { s: Shot; className?: string }) => (
  <img
    src={s.src}
    width={s.w}
    height={s.h}
    alt={s.alt}
    loading="lazy"
    decoding="async"
    className={`rounded-xl border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,.35)] bg-paper ${className}`}
  />
);

const ink = (href: string, label: string) => (
  <a href={href} className="inline-flex items-center gap-2 u-link text-red font-medium">
    {label} <ArrowUpRight size={18} />
  </a>
);

const OWN_PRIVATE = [
  { name: "Airlock", note: "Strips personal data on your device before a prompt reaches an AI.", href: "https://airlock.made-by-ac.com" },
  { name: "Stash", note: "Saves your AI chats and the pages you read to a private archive on your machine.", href: "https://stash.made-by-ac.com" },
  { name: "Pingless", note: "An Android app that reads your notifications on the phone and clears the noise. No internet permission.", href: "https://pingless.made-by-ac.com" },
  { name: "supermind.", note: "A second brain that stays on your device, with optional encryption and no server.", href: "https://supermind.ink" },
  { name: "hindsight.", note: "A live mirror for video calls that runs in the browser and records nothing.", href: "https://hindsight.made-by-ac.com" },
];
const OWN_LIFE = [
  { name: "NADIR", note: "Point a phone out of a plane window and it names the ground below, offline.", href: "https://nadir.made-by-ac.com" },
  { name: "Percentyle", note: "Focused CAT preparation with real past year questions and mock tests.", href: "https://percentyle.in" },
  { name: "Must Try", note: "Community voted ratings for India's most iconic dishes, dish by dish.", href: "https://musttry.made-by-ac.com" },
  { name: "Houselights", note: "Low cost ticketing for comedy shows, with one honest fee.", href: "https://houselights-eta.vercel.app" },
];

const LABELS = [
  { t: "Client build", d: "Someone paid us to make it." },
  { t: "Our own product", d: "We made it and we run it." },
  { t: "Concept study", d: "An idea we explored in the open. Not a client." },
  { t: "Pitch demo", d: "Made for a business we hoped to work with." },
];

type Chapter = { no: string; title: string; say: string; react: Reaction; body: string; extra: ReactNode };

const CHAPTERS: Chapter[] = [
  {
    no: "01",
    title: "We started by making things look right",
    say: "Looks first.",
    react: "sparkle",
    body: "Brand identities, packaging and campaigns came first. A commercial EV marketplace needed fleet buyers to trust second hand batteries. A sweets brand needed boxes that felt like a gift. Design was the job, and we still treat it as the part that decides whether anything else gets used.",
    extra: (
      <div className="mt-8">
        <div className="flex items-end gap-4">
          <Frame s={{ src: "/images/Inv'08.webp", w: 1272, h: 1800, alt: "Campaign poster for Innovolt, a commercial electric vehicle marketplace" }} className="w-40 sm:w-52 -rotate-2" />
          <Frame s={{ src: "/images/thumb_1778155199_93669484-0552-4a3e-971e-ed4287cc1b19.webp", w: 600, h: 600, alt: "Luxury sweets packaging for Mithai Maharaja" }} className="w-40 sm:w-52 rotate-2" />
        </div>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {ink("/work/innovolt", "Innovolt campaign")}
          {ink("/work/mithai-maharaja", "Mithai Maharaja packaging")}
        </p>
      </div>
    ),
  },
  {
    no: "02",
    title: "Then a clinic needed more than a nice page",
    say: "Then it had to work.",
    react: "surprised",
    body: "An orthopaedic clinic in Visakhapatnam needed patients to book without calling, pay a deposit, and have the front desk see the day's queue live. We built the booking system, a WhatsApp assistant and the admin desk. A slot is never marked as booked until the payment really clears, and we keep that rule even when it is slower to build.",
    extra: (
      <div className="mt-8">
        <div className="flex items-end gap-4">
          <Frame s={{ src: "/case/ortho/hero-d.webp", w: 1600, h: 1000, alt: "The clinic booking website we built" }} className="w-[62%]" />
          <Frame s={{ src: "/case/ortho/rc-chat-m.webp", w: 780, h: 1688, alt: "The clinic's WhatsApp style assistant" }} className="w-[26%]" />
        </div>
        <p className="mt-6">{ink("/work/ramachandra-ortho", "Read the clinic case study")}</p>
      </div>
    ),
  },
  {
    no: "03",
    title: "So we started building our own",
    say: "Then our own ideas.",
    react: "heart",
    body: "Client work shows you what people put up with. So we build products that stop putting up with it. A lot of them share one idea: your data stays on your device unless you decide otherwise.",
    extra: (
      <div className="mt-8 space-y-10">
        <div className="grid grid-cols-3 gap-3">
          <Frame s={{ src: "/labs/pingless/home.webp", w: 1600, h: 1023, alt: "Pingless landing page" }} />
          <Frame s={{ src: "/case/percentyle/home.webp", w: 1440, h: 900, alt: "Percentyle exam preparation app" }} />
          <Frame s={{ src: "/labs/vane/home.webp", w: 1600, h: 1000, alt: "VANE concept study, a feather inspired alternative to the zip" }} />
        </div>
        <div>
          <p className="label text-ink/55">Software that keeps your data with you</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {OWN_PRIVATE.map((p) => <ProductCard key={p.name} {...p} />)}
          </ul>
        </div>
        <div>
          <p className="label text-ink/55">Made for how people actually live</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {OWN_LIFE.map((p) => <ProductCard key={p.name} {...p} />)}
          </ul>
        </div>
      </div>
    ),
  },
  {
    no: "04",
    title: "How we keep ourselves honest",
    say: "Labels matter.",
    react: "wink",
    body: "Studios blur the line between what clients paid for and what they made for fun. We do not. Every piece of work on this site carries one of four labels, and we do not publish a number we have not measured.",
    extra: (
      <ul className="mt-8 grid sm:grid-cols-2 gap-3">
        {LABELS.map((l) => (
          <li key={l.t} className="rounded-2xl border border-ink/15 bg-paper p-5">
            <span className="font-display text-xl">{l.t}</span>
            <span className="mt-1 block text-sm leading-relaxed text-ink/65">{l.d}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    no: "05",
    title: "Who you will talk to",
    say: "Your turn. What is broken?",
    react: "delighted",
    body: "You talk to the people building it, not a sales layer. We tell you early when something is not a fit for us. We would rather ship a small real thing than make a big promise.",
    extra: null,
  },
];

function ProductCard({ name, note, href }: { name: string; note: string; href: string; key?: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className="group block h-full rounded-2xl border border-ink/15 bg-paper p-5 hover:border-ink transition-colors">
        <span className="flex items-center justify-between font-display text-xl">
          {name}
          <ArrowUpRight size={18} className="text-ink/40 group-hover:text-red transition-colors" />
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-ink/65">{note}</span>
      </a>
    </li>
  );
}

function useActiveChapter(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-35% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return { refs, active };
}

export function AboutPage() {
  const { refs, active } = useActiveChapter(CHAPTERS.length);
  const line = active < 0 ? "Hi! Move your mouse. I follow it." : CHAPTERS[active].say;
  const react = active < 0 ? undefined : CHAPTERS[active].react;
  const cue = active < 0 ? undefined : active;

  return (
    <div className="bg-paper text-ink font-sans antialiased overflow-x-clip">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-14 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="label text-red">The founder story</p>
          <h1 className="mt-5 font-display font-medium tracking-tight leading-[0.98] text-5xl sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            A design studio that <em className="text-red">learned to ship.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-ink/75">
            made. by ac is run from Visakhapatnam by Asrith Cheepurupalli. We started with brands, packaging and campaigns. Then clients needed things that worked, so we learned to build them. Now we make products of our own too.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-xl border-t border-ink/15 pt-6">
            {[
              ["12+", "live products"],
              ["4", "concept studies"],
              ["1", "clinic system for a real clinic"],
            ].map(([n, t]) => (
              <div key={t}>
                <dt className="font-display text-3xl md:text-4xl">{n}</dt>
                <dd className="mt-1 text-sm text-ink/60">{t}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-ink text-paper px-5 py-2 text-sm md:text-base shadow-[0_12px_30px_-12px_rgba(0,0,0,.5)]" aria-live="polite">
              {line}
              <span className="absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 bg-ink" aria-hidden />
            </div>
            <Mascot {...SHEETS} size={300} cue={cue} cueReaction={react} label="Cartoon portrait of the founder. It follows your cursor, and reacts when you click it." />
          </div>
          <p className="label text-ink/50 mt-4 lg:mr-6">Asrith Cheepurupalli, founder</p>
        </div>
      </section>

      {/* Chapters */}
      <section className="border-t border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-ink text-paper px-5 py-2 text-sm shadow-[0_12px_30px_-12px_rgba(0,0,0,.5)]">
                  {line}
                  <span className="absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 bg-ink" aria-hidden />
                </div>
                <Mascot {...SHEETS} size={220} cue={cue} cueReaction={react} label="The founder, drawn" />
              </div>
              <div className="mt-8 flex gap-2" aria-hidden>
                {CHAPTERS.map((c, i) => (
                  <span key={c.no} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-red" : "w-4 bg-ink/20"}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-24 md:space-y-40 min-w-0">
            {CHAPTERS.map((c, i) => (
              <article key={c.no} data-i={i} ref={(el) => { refs.current[i] = el; }} className="reveal-up max-w-2xl">
                <span className="label text-red">{c.no}</span>
                <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight leading-[1.02]">{c.title}</h2>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink/75">{c.body}</p>
                {c.extra}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section data-nav-dark className="bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <p className="label text-gold">Say hello</p>
            <h2 className="mt-5 font-display font-medium tracking-tight leading-[0.98] text-5xl md:text-7xl">
              Tell us what is <em className="text-red">broken.</em> We will tell you honestly if we can fix it.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={waLink("Hi, I read your story and want to talk about a project.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-red px-8 py-4 font-semibold text-paper hover:brightness-110 transition">
                <MessageCircle size={20} /> Message us on WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="u-link text-paper/80 hover:text-paper">{EMAIL}</a>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Mascot {...SHEETS} size={200} label="The founder, drawn" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
