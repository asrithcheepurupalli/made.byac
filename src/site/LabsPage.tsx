import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── made. labs ──────────────────────────────────────────────────────────────
// The studio's self-initiated concept studies — proof, not pitch. This is the
// single home for the lab; /work and the homepage only *point* here. Intended
// for labs.made-by-ac.com. Each world keeps its own accent over the made. frame.

type Lab = {
  id: string;
  name: string;
  italic: string; // first part of wordmark, set in italic
  rest: string;
  tagline: string;
  what: string;
  blurb: string;
  accent: string;
  year: string;
  discipline: string;
  shots: string[];
  tags: string[];
  caseStudy?: string;
  live?: string; // omitted until deployed
  getApp?: string; // for shipped apps — APK / store link
  shipped?: boolean; // real, shipped product (not just a concept demo)
};

const LABS: Lab[] = [
  {
    id: "meanwhile",
    name: "Meanwhile",
    italic: "Mean",
    rest: "while",
    tagline: "Half rent. Full opportunity.",
    what: "A marketplace for temporary commercial occupancy",
    blurb:
      "Vacant shops earn nothing while businesses can't afford the door. Meanwhile names a third state between occupied and empty, so owners can monetise the in-between while growing brands take premium addresses at a fraction of the rent.",
    accent: "#ff5a1f",
    year: "2026",
    discipline: "Marketplace · brand · interactive demo",
    shots: ["/labs/meanwhile/home.png", "/labs/meanwhile/third.png", "/labs/meanwhile/browse.png"],
    tags: ["Architectural negative-space", "Generated floor-plans", "Interactive rent-splitter", "GSAP · Lenis"],
    caseStudy: "/labs/docs/Meanwhile-Case-Study.pdf",
    live: "https://meanwhile.made-by-ac.com",
  },
  {
    id: "karu",
    name: "Karu",
    italic: "Kar",
    rest: "u",
    tagline: "Made by the last masters of the craft.",
    what: "A gallery that sells India's master artisans, direct",
    blurb:
      "The people who make India's finest crafts sell them for a fraction of their worth. Karu collapses the distance to a single line, maker to collector, and pays the majority of every sale to the hand that made it, with live auctions and one-of-one provenance.",
    accent: "#c2683f",
    year: "2026",
    discipline: "Marketplace · brand · story-first demo",
    shots: ["/labs/karu/cover.png", "/labs/karu/product.png", "/labs/karu/collection.png"],
    tags: ["Warm earthen direction", "Live auction + revenue split", "Full-bleed scroll gallery", "Next.js 16 · React 19"],
    caseStudy: "/labs/docs/Karu-Case-Study.pdf",
    live: "https://karu.made-by-ac.com",
  },
  {
    id: "tideline",
    name: "Tideline",
    italic: "Tide",
    rest: "line",
    tagline: "Off the boat. Onto your table.",
    what: "The marketplace for the day's catch",
    blurb:
      "Five hands and three days stand between a net and a plate. Tideline lets you book a seat on a working boat or claim a share of the landing, direct from the skipper at the dock price, with a generative tide chart drawn for every boat.",
    accent: "#16b9a8",
    year: "2026",
    discipline: "Marketplace · brand · interactive demo",
    shots: ["/labs/tideline/home.png", "/labs/tideline/catch.png", "/labs/tideline/boat.png"],
    tags: ["Tidal data-as-poetry", "Generative tide charts", "Seat-or-share booking", "GSAP · Lenis"],
    caseStudy: "/labs/docs/Tideline-Case-Study.pdf",
    live: "https://tideline.made-by-ac.com",
  },
  {
    id: "pingless",
    name: "Pingless",
    italic: "ping",
    rest: "less",
    tagline: "Your phone, finally quiet.",
    what: "A privacy-first AI notification gateway",
    blurb:
      "Notifications never stop. Pingless sits between your apps and you — reading every alert on-device, delivering the ones that matter and quietly holding the rest, with no cloud, no account, and zero bytes ever leaving your phone. The concept that left the lab and shipped to real phones.",
    accent: "#c8102e",
    year: "2026",
    discipline: "Product · native Android · brand",
    shots: ["/labs/pingless/home.png", "/labs/pingless/demo.png", "/labs/pingless/privacy.png"],
    tags: ["On-device, no internet permission", "3-layer on-device classifier", "Jetpack Compose · Kotlin", "Real, shipped"],
    live: "https://pingless.made-by-ac.com",
    getApp: "https://pingless.made-by-ac.com/pingless.apk",
    shipped: true,
  },
];

// one-click, pre-written contact — same zero-effort pattern as the homepage
const LABS_MAIL =
  `mailto:thebrain@made-by-ac.com?subject=${encodeURIComponent("Hi made., about the Labs")}` +
  `&body=${encodeURIComponent(
    "Hi made. team,\n\nI saw made. labs and I'd love to talk about building something with you.\n\nWhat I have in mind:\n\n\nThanks,\n"
  )}`;
const LABS_WA =
  `https://wa.me/919390852636?text=${encodeURIComponent(
    "Hi made. by ac — I saw made. labs and I'd love to talk about building something with you."
  )}`;

export function LabsPage() {
  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh] overflow-clip">
      <LabsHeader />
      <LabsHero />
      <LabsManifesto />
      <LabsIndex />
      <main>
        {LABS.map((lab, i) => (
          <Fragment key={lab.id}>
            <LabBlock lab={lab} i={i} />
          </Fragment>
        ))}
      </main>
      <LabsCapabilities />
      <LabsInvitation />
      <SiteFooter />
      <style>{`
        @keyframes labs-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes labs-marquee { to { transform: translateX(-50%); } }
        .labs-tile { transition: transform .6s cubic-bezier(0.16,1,0.3,1); }
        @media (prefers-reduced-motion: reduce){
          .labs-marquee-track{ animation:none !important; }
          .labs-float{ animation:none !important; }
        }
      `}</style>
    </div>
  );
}

// ── fixed back-nav (labs has its own, like /work) ───────────────────────────
function LabsHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey">made. labs · concept studies</span>
        <a href="/work" className="label text-[10px] text-grey-dim hover:text-paper transition-colors">Client work →</a>
      </div>
    </header>
  );
}

// ── hero: kinetic statement + three cursor-reactive specimen tiles ──────────
function LabsHero() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.querySelectorAll<HTMLElement>("[data-depth]").forEach((t) => {
          const d = Number(t.dataset.depth);
          t.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
        });
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={wrap} className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 overflow-hidden">
      {/* blueprint field */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.5]" aria-hidden
        style={{
          backgroundImage: "linear-gradient(var(--color-ink-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 80% at 50% 35%, #000 45%, transparent 100%)",
        }} />
      <div className="relative mx-auto max-w-[1600px] w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="rise label text-red block" style={{ animationDelay: ".05s" }}>· made. labs · concept studies</span>
          <h1 className="rise mt-6 font-display text-[15vw] leading-[0.84] tracking-[-0.03em] sm:text-[12vw] lg:text-[7.5rem]" style={{ animationDelay: ".13s" }}>
            The work<br />nobody<br /><span className="italic font-normal text-gold">asked for<span className="text-red">.</span></span>
          </h1>
          <p className="rise mt-8 font-display text-xl md:text-2xl leading-snug max-w-xl text-paper/80" style={{ animationDelay: ".3s" }}>
            Self-initiated concept studies, where the studio answers its own brief and
            builds the future of an industry before a client does.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-x-10 gap-y-5" style={{ animationDelay: ".42s" }}>
            <div><div className="font-display text-4xl text-paper">04</div><div className="mt-1 label text-[9px] text-grey">Built whole · 1 shipped</div></div>
            <div><div className="font-display text-4xl text-paper">100%</div><div className="mt-1 label text-[9px] text-grey">Self-initiated</div></div>
            <div><div className="font-display text-4xl text-paper">2026</div><div className="mt-1 label text-[9px] text-grey">The lab, so far</div></div>
          </div>
        </div>

        {/* cursor-reactive specimen stack */}
        <div className="relative h-[360px] sm:h-[440px] hidden md:block">
          {LABS.map((lab, i) => {
            const pos = [
              "left-0 top-2 rotate-[-5deg]",
              "right-0 top-16 rotate-[4deg]",
              "left-10 bottom-16 rotate-[-2deg]",
              "right-6 bottom-0 rotate-[3deg]",
            ][i];
            const depth = [24, 38, 14, 30][i];
            return (
              <a key={lab.id} href={`#${lab.id}`} data-cursor="View" data-depth={depth}
                className={`labs-tile absolute ${pos} w-[55%] max-w-[300px] rounded-xl overflow-hidden border border-ink-line bg-ink-soft shadow-2xl hover:!rotate-0 hover:scale-[1.03] hover:z-20`}
                style={{ boxShadow: `0 24px 60px -24px ${lab.accent}55` }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={lab.shots[0]} alt={lab.name} loading="lazy" className="w-full h-full object-cover object-top" />
                  <span className="absolute top-3 left-3 h-2 w-2 rounded-full" style={{ background: lab.accent }} />
                  {lab.shipped && (
                    <span className="absolute top-2.5 right-2.5 label text-[7px] rounded-full bg-[#27d17c] text-ink px-2 py-0.5">Shipped</span>
                  )}
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-display text-lg">{lab.name}</span>
                  <span className="label text-[8px] text-grey">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <a href="#meanwhile" className="absolute bottom-7 left-1/2 -translate-x-1/2 label text-[9px] text-grey-dim flex flex-col items-center gap-2" data-cursor="Scroll">
        Enter the lab
        <span className="block h-7 w-px bg-grey-dim/50" />
      </a>
    </section>
  );
}

function LabsManifesto() {
  return (
    <section data-nav-dark className="bg-paper text-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <span className="reveal-up label text-red block">· why a lab</span>
        <p className="reveal-up mt-8 font-display text-3xl md:text-[3.4rem] leading-[1.08] tracking-[-0.01em] max-w-[20ch]">
          Most studios show you what a client paid for. We show you what we'd build if the
          only client were <span className="italic text-gold">the idea.</span>
        </p>
        <p className="reveal-up mt-8 text-grey text-lg max-w-2xl leading-relaxed">
          Each of these is a whole product (brand, interface, motion and a working demo) taken
          from a blank page to something you can use. No brief, no committee. Just proof that we can
          build the thing you haven't asked for yet.
        </p>
      </div>
    </section>
  );
}

// vertical scroll index that highlights the active world (desktop)
function LabsIndex() {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    // active world (centre band)
    const ioActive = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = LABS.findIndex((l) => l.id === e.target.id);
          if (i >= 0) setActive(i);
        }
      }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    // only show the rail while any world is on screen (hides over hero/footer)
    const visible = new Set<string>();
    const ioShow = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
        setShow(visible.size > 0);
      },
      { rootMargin: "-10% 0px -10% 0px" }
    );
    LABS.forEach((l) => { const el = document.getElementById(l.id); if (el) { ioActive.observe(el); ioShow.observe(el); } });
    return () => { ioActive.disconnect(); ioShow.disconnect(); };
  }, []);
  return (
    <div className={`hidden xl:flex flex-col gap-5 fixed right-8 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {LABS.map((l, i) => (
        <a key={l.id} href={`#${l.id}`} className="group flex items-center gap-3 justify-end" data-cursor="Go">
          <span className={`label text-[9px] transition-colors ${active === i ? "text-paper" : "text-grey-dim/50 group-hover:text-grey"}`}>{l.name}</span>
          <span className="h-2 w-2 rounded-full transition-all duration-500"
            style={{ background: active === i ? l.accent : "var(--color-ink-line)", transform: active === i ? "scale(1.4)" : "scale(1)" }} />
        </a>
      ))}
    </div>
  );
}

// ── one world ───────────────────────────────────────────────────────────────
function LabBlock({ lab, i }: { lab: Lab; i: number }) {
  const big = useRef<HTMLDivElement>(null);
  // light scroll parallax on the lead shot
  useEffect(() => {
    const el = big.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0..1
        el.style.transform = `translateY(${(p - 0.5) * -36}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const flip = i % 2 === 1;
  return (
    <section id={lab.id} className="relative border-t border-ink-line py-24 md:py-36 scroll-mt-16">
      {/* accent wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden
        style={{ background: `radial-gradient(80% 60% at ${flip ? "85%" : "15%"} 30%, ${lab.accent}1f, transparent 60%)` }} />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* copy */}
        <div className={flip ? "lg:order-2" : ""}>
          <div className="reveal-up flex items-center gap-4">
            <span className="font-display text-7xl md:text-8xl leading-none" style={{ color: lab.accent }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="h-px flex-1 max-w-[70px]" style={{ background: lab.accent }} />
            {lab.shipped && (
              <span className="label text-[8px] rounded-full bg-[#27d17c] text-ink px-2.5 py-1">● Shipped</span>
            )}
            <span className="label text-[9px] text-grey">{lab.year}</span>
          </div>
          <h2 className="reveal-up mt-7 font-display text-6xl md:text-7xl leading-[0.92] tracking-[-0.02em]">
            <span className="italic font-normal">{lab.italic}</span>{lab.rest}
            <span style={{ color: lab.accent }}>.</span>
          </h2>
          <p className="reveal-up mt-4 font-display text-xl md:text-2xl text-paper/85">{lab.tagline}</p>
          <p className="reveal-up mt-2 label text-[10px] text-grey">{lab.what}</p>
          <p className="reveal-up mt-7 text-grey-dim text-base md:text-lg leading-relaxed max-w-xl">{lab.blurb}</p>

          <div className="reveal-up mt-7 flex flex-wrap gap-2">
            {lab.tags.map((t) => (
              <span key={t} className="label text-[9px] rounded-full border border-ink-line px-3 py-1.5 text-grey">{t}</span>
            ))}
          </div>

          <div className="reveal-up mt-9 flex flex-wrap items-center gap-3">
            {lab.live && (
              <a href={lab.live} target="_blank" rel="noreferrer" data-cursor="Visit"
                className="inline-flex items-center gap-2 label text-[10px] rounded-full px-5 py-3 text-ink transition-transform hover:-translate-y-0.5"
                style={{ background: lab.accent }}>
                {lab.shipped ? "Try it live" : "Live demo"} <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {lab.getApp && (
              <a href={lab.getApp} target="_blank" rel="noreferrer" data-cursor="Get"
                className="inline-flex items-center gap-2 label text-[10px] rounded-full px-5 py-3 border border-paper/30 hover:bg-paper hover:text-ink transition-colors">
                Get the app <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {lab.caseStudy && (
              <a href={lab.caseStudy} target="_blank" rel="noreferrer" data-cursor="Open"
                className="inline-flex items-center gap-2 label text-[10px] rounded-full px-5 py-3 border border-paper/30 hover:bg-paper hover:text-ink transition-colors">
                <FileText className="w-3.5 h-3.5" /> Case study
              </a>
            )}
            {!lab.live && !lab.caseStudy && (
              <span className="label text-[9px] text-grey-dim/70 px-2">Live demo soon</span>
            )}
          </div>
        </div>

        {/* visuals */}
        <div className={flip ? "lg:order-1" : ""}>
          <div ref={big} className="relative rounded-xl overflow-hidden border border-ink-line bg-ink-soft shadow-2xl will-change-transform"
            style={{ boxShadow: `0 30px 80px -40px ${lab.accent}66` }}>
            <div className="h-7 flex items-center gap-1.5 px-3 border-b border-ink-line bg-ink">
              <span className="w-2 h-2 rounded-full" style={{ background: lab.accent }} />
              <span className="w-2 h-2 rounded-full bg-ink-line" />
              <span className="w-2 h-2 rounded-full bg-ink-line" />
              <span className="ml-3 font-mono text-[9px] text-grey-dim">{lab.id}.made-by-ac.com</span>
            </div>
            <img src={lab.shots[0]} alt={`${lab.name} landing page`} loading="lazy" className="w-full block" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {lab.shots.slice(1, 3).map((s, k) => (
              <div key={s} className="rounded-lg overflow-hidden border border-ink-line bg-ink-soft group">
                <img src={s} alt={`${lab.name} screen ${k + 2}`} loading="lazy"
                  className="w-full block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── confidence band ─────────────────────────────────────────────────────────
const ROTATE = ["a marketplace", "a brand world", "an app", "a launch", "a category", "anything"];
function LabsCapabilities() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setN((x) => (x + 1) % ROTATE.length), 1900);
    return () => clearInterval(t);
  }, []);
  return (
    <section data-nav-dark className="bg-paper text-ink py-24 md:py-40 border-t border-paper-line">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 text-center">
        <span className="reveal-up label text-red">· what this proves</span>
        <h2 className="reveal-up mt-8 font-display text-4xl md:text-7xl leading-[1.02] tracking-[-0.02em]">
          If we can build these unasked,<br className="hidden md:block" /> imagine{" "}
          <span className="italic text-gold inline-block min-w-[6ch] text-left" style={{ color: LABS[n % LABS.length].accent }}>
            {ROTATE[n]}
          </span>{" "}
          for you.
        </h2>
        <p className="reveal-up mt-8 text-grey text-lg max-w-2xl mx-auto leading-relaxed">
          Every world here went from a blank page to a working product (brand, interface, motion and
          demo) by the same small team that would build yours.
        </p>
        <a href={LABS_MAIL} data-cursor="Hello" data-magnetic
          className="reveal-up mt-12 inline-flex items-center gap-2 bg-red text-white label rounded-full px-8 py-4 hover:bg-red-deep transition-colors">
          Bring us the thing nobody else will build <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

function LabsInvitation() {
  return (
    <section data-nav-dark className="bg-ink text-paper py-24 md:py-32 border-t border-ink-line">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <span className="reveal-up label text-gold block">· the lab is open</span>
          <h2 className="reveal-up mt-5 font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">
            Made by ac<span className="text-red">.</span>
          </h2>
        </div>
        <div className="reveal-up flex flex-wrap gap-3">
          <a href="/work" className="label text-[10px] rounded-full px-6 py-3.5 border border-paper/30 hover:bg-paper hover:text-ink transition-colors">See client work</a>
          <a href={LABS_WA} target="_blank" rel="noreferrer" data-cursor="Chat" className="label text-[10px] rounded-full px-6 py-3.5 bg-[#25D366] text-ink hover:-translate-y-0.5 transition-transform">WhatsApp us</a>
          <a href={LABS_MAIL} data-cursor="Hello" className="label text-[10px] rounded-full px-6 py-3.5 bg-red text-white hover:bg-red-deep transition-colors">Start a project</a>
        </div>
      </div>
    </section>
  );
}
