import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AV, Wordmark, WordmarkDraw } from "./brand";
import { MENU } from "./Prototype";

// Aavira's own website: the restaurant a guest would find, not the study about it. A concept
// we designed to show a restaurant site that feels like the room. Fictional brand, licensed stock
// photography, no real address. The reservation form is a demo and sends nothing.

const SITE = "/case/aavira/site";
const BY = Object.fromEntries(MENU.map((d) => [d.id, d]));
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const KICK = "text-[0.7rem] uppercase tracking-[0.42em]";

// ---- small motion helpers -------------------------------------------------------------
function SplitReveal({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
          <motion.span className="inline-block" initial={reduce ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>{w}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

function Parallax({ children, speed = 0.15, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return <div ref={ref} className={`overflow-hidden ${className}`}><motion.div style={reduce ? undefined : { y }} className="h-[130%] -my-[15%]">{children}</motion.div></div>;
}

// ---- intro: the mark draws itself, holds, dissolves. Once per session, skippable ----------
function Intro() {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("aavira_intro")) return "gone";
    } catch { /* storage blocked: show it */ }
    return "show";
  });
  useEffect(() => {
    if (phase !== "show") return;
    document.body.style.overflow = "hidden";
    const a = window.setTimeout(() => finish(), 2900);
    const safety = window.setTimeout(() => finish(), 6000);
    function finish() { setPhase((p) => (p === "show" ? "fade" : p)); }
    return () => { window.clearTimeout(a); window.clearTimeout(safety); document.body.style.overflow = ""; };
  }, [phase]);
  useEffect(() => {
    if (phase !== "fade") return;
    try { sessionStorage.setItem("aavira_intro", "1"); } catch { /* ignore */ }
    const t = window.setTimeout(() => { setPhase("gone"); document.body.style.overflow = ""; }, 950);
    return () => window.clearTimeout(t);
  }, [phase]);
  if (phase === "gone") return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-[950ms]" style={{ background: AV.ink, opacity: phase === "fade" ? 0 : 1, pointerEvents: phase === "fade" ? "none" : "auto" }}>
      <div aria-hidden className="absolute rounded-full" style={{ width: "42vmin", height: "42vmin", background: `${AV.turmeric}1a`, filter: "blur(110px)" }} />
      <div className="relative transition-transform duration-[950ms]" style={{ transform: phase === "fade" ? "scale(1.04)" : "none" }}><WordmarkDraw height={84} className="max-w-[78vw] h-auto" /></div>
      <button type="button" onClick={() => setPhase("fade")} className="absolute bottom-7 right-7 text-[0.62rem] uppercase tracking-[0.3em]" style={{ color: AV.muted }}>Skip ↦</button>
    </div>
  );
}

// ---- header: Monte-style, menu left, wordmark centre, reserve right -----------------------
function Header({ solid, showMark }: { solid: boolean; showMark: boolean }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="text-center text-[11px] py-1.5 px-3" style={{ background: "#050404", color: AV.muted }}>
        A concept restaurant site by <a href="/" className="underline underline-offset-2" style={{ color: AV.cream }}>made.</a> · <a href="/work/aavira" className="underline underline-offset-2" style={{ color: AV.turmeric }}>read the study</a>
      </div>
      <nav aria-label="Aavira" className="transition-colors duration-500" style={{ background: solid ? "rgba(14,12,11,.86)" : "transparent", backdropFilter: solid ? "blur(12px)" : "none", borderBottom: `1px solid ${solid ? AV.line : "transparent"}` }}>
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 h-14 grid grid-cols-3 items-center">
          <div className="flex gap-6 text-[0.72rem] uppercase tracking-[0.22em]" style={{ color: AV.cream }}>
            <a href="#menu" className="hover:opacity-70 transition-opacity">Menu</a>
            <a href="#nights" className="hidden sm:inline hover:opacity-70 transition-opacity">Nights</a>
          </div>
          <a href="#top" aria-label="Aavira, back to top" className="justify-self-center transition-opacity duration-500" style={{ opacity: showMark ? 1 : 0, pointerEvents: showMark ? "auto" : "none" }}><Wordmark steam height={20} /></a>
          <a href="#reserve" className="justify-self-end text-[0.72rem] uppercase tracking-[0.22em] rounded-full px-4 py-2 transition-colors" style={{ border: `1px solid ${AV.turmeric}`, color: AV.turmeric }}>Reserve</a>
        </div>
      </nav>
    </header>
  );
}

// ---- the signature deck: Monte-style stacked cards on cream ------------------------------
const SIGNATURES = ["prawn-pepper", "biryani", "chicken-fry", "fish-curry", "chicken-65", "dosa"];
const SIG_COPY: Record<string, string> = {
  "prawn-pepper": "Tossed hot in a heavy kadai with crushed black pepper and curry leaf. The first thing most tables order.",
  biryani: "A raw mango pickle masala gives it a tang you will not find in a standard dum biryani. Sealed, then steamed with saffron rice.",
  "chicken-fry": "Dry-roasted slowly with whole red chillies and curry leaf. No gravy, so every piece is coated.",
  "fish-curry": "Simmered low in tamarind and coconut until the gravy turns glossy and the fish stays tender.",
  "chicken-65": "Marinated overnight and fried twice so the crust shatters. Curry leaf, chilli, and a squeeze of lime.",
  dosa: "Fermented batter spread paper thin and roasted with ghee until it shatters. Two chutneys, no fuss.",
};
function Deck() {
  const [i, setI] = useState(0);
  const n = SIGNATURES.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const sx = useRef<number | null>(null);
  const id = SIGNATURES[i];
  const dish = BY[id];
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      <div className="relative mx-auto w-full max-w-[440px] aspect-[4/5]" onPointerDown={(e) => { sx.current = e.clientX; }} onPointerUp={(e) => { if (sx.current !== null && Math.abs(e.clientX - sx.current) > 40) go(e.clientX < sx.current ? 1 : -1); sx.current = null; }} style={{ touchAction: "pan-y" }}>
        {[3, 2, 1, 0].map((o) => {
          const card = SIGNATURES[(i + o) % n];
          return (
            <div key={card} className="absolute inset-0 rounded-[22px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ transform: `translateX(${o * 22}px) rotate(${o * 2.4}deg) scale(${1 - o * 0.035})`, transformOrigin: "bottom left", zIndex: 10 - o, border: `1.5px solid ${AV.ember}`, background: AV.cream, opacity: o > 2 ? 0.6 : 1 }}>
              <img src={`${SITE}/${card}.webp`} alt={o === 0 ? BY[card].name : ""} loading="lazy" draggable={false} className="w-full h-full object-cover select-none" style={{ filter: o === 0 ? "none" : "saturate(.7) brightness(.85)" }} />
            </div>
          );
        })}
      </div>
      <div className="text-center lg:text-left" aria-live="polite">
        <div className={KICK} style={{ color: AV.ember }}>Signature {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</div>
        <h3 className="mt-5 font-display text-6xl md:text-7xl leading-[0.98]" style={{ color: AV.ink }}>{dish.name}</h3>
        <p className="mt-5 text-lg leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: "#4a3f35" }}>{SIG_COPY[id]}</p>
        <div className="mt-6 font-display text-3xl" style={{ color: AV.ember }}>{inr(dish.price)}</div>
        <div className="mt-8 flex gap-3 justify-center lg:justify-start">
          {[["Previous dish", -1, "←"], ["Next dish", 1, "→"]].map(([l, d, g]) => (
            <button key={l as string} type="button" onClick={() => go(d as number)} aria-label={l as string} className="w-12 h-12 rounded-full grid place-items-center text-lg transition-colors hover:bg-[#d9622b] hover:text-white" style={{ border: `1.5px solid ${AV.ember}`, color: AV.ember }}>{g}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- "what's cooking": a pinned horizontal reel, chapter by chapter (stacked on small screens)
const CHAPTERS = [
  { cat: "Starters", title: "Fire and curry leaf", text: "Everything here meets a very hot kadai first. Pepper, chilli, curry leaf, then straight to the table.", img: "prawn-pepper", tint: "#1b1310" },
  { cat: "Mains", title: "Slow and glossy", text: "Tamarind and coconut simmered low. Dry-roasted chicken with whole red chillies. Mutton cooked down until it clings.", img: "fish-curry", tint: "#14171a" },
  { cat: "Biryani", title: "Sealed, then steamed", text: "Rice, saffron and a raw mango pickle masala, sealed under dough so the steam stays in.", img: "biryani", tint: "#1c1710" },
  { cat: "Tiffin", title: "Crisp, soft, warm", text: "Ghee roast dosa that shatters. Idli that gives. Sambar built on drumstick and tamarind.", img: "dosa", tint: "#1a1411" },
  { cat: "Sweet", title: "A warm finish", text: "Cashew payasam, hot saffron jalebi, and a filter coffee poured from a height.", img: "payasam", tint: "#191214" },
];
function Reel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${-(CHAPTERS.length - 1) * 100}vw`]);
  const bg = useTransform(scrollYProgress, CHAPTERS.map((_, k) => k / (CHAPTERS.length - 1)), CHAPTERS.map((c) => c.tint));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const chapter = (c: (typeof CHAPTERS)[number], k: number, stacked: boolean) => (
    <div key={c.cat} className={stacked ? "px-6 py-14" : "w-screen shrink-0 h-full px-10 lg:px-24 flex items-center"}>
      <div className={`w-full max-w-[1300px] mx-auto grid ${stacked ? "gap-8" : "grid-cols-12 gap-14 items-center"}`}>
        <div className={stacked ? "" : "col-span-5"}>
          <div className="overflow-hidden rounded-[22px]" style={{ border: `1px solid ${AV.line}` }}><img src={`${SITE}/${c.img}.webp`} alt={c.title} loading="lazy" className={`w-full object-cover ${stacked ? "aspect-[4/3]" : "aspect-[4/5] max-h-[68vh]"}`} /></div>
        </div>
        <div className={stacked ? "" : "col-span-7"}>
          <div className={KICK} style={{ color: AV.turmeric }}>0{k + 1} · {c.cat}</div>
          <h3 className="mt-5 font-display text-6xl md:text-8xl leading-[0.98]" style={{ color: AV.cream }}>{c.title}</h3>
          <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: AV.muted }}>{c.text}</p>
          <ul className="mt-8 grid gap-2 max-w-md">
            {MENU.filter((d) => d.cat === c.cat).map((d) => (
              <li key={d.id} className="flex items-baseline gap-3 text-[15px]"><span style={{ color: AV.cream }}>{d.name}</span><span className="flex-1 border-b border-dotted translate-y-[-4px]" style={{ borderColor: AV.line }} /><span style={{ color: AV.turmeric }}>{inr(d.price)}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  if (reduce) return <div style={{ background: AV.ink }} className="md:hidden">{CHAPTERS.map((c, k) => chapter(c, k, true))}</div>;
  return (
    <>
      <div className="md:hidden" style={{ background: AV.ink }}>{CHAPTERS.map((c, k) => chapter(c, k, true))}</div>
      <section ref={ref} className="hidden md:block relative" style={{ height: `${CHAPTERS.length * 100}vh` }} aria-label="What is cooking">
        <motion.div style={{ backgroundColor: bg }} className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute top-24 left-10 lg:left-24 z-10 flex items-center gap-4"><span className={KICK} style={{ color: AV.muted }}>✦&nbsp;&nbsp;What's cooking</span></div>
          <motion.div style={{ x }} className="flex h-full pt-12 will-change-transform">{CHAPTERS.map((c, k) => chapter(c, k, false))}</motion.div>
          <div className="absolute bottom-8 left-10 right-10 lg:left-24 lg:right-24 h-px" style={{ background: AV.line }}><motion.div style={{ width: bar, background: AV.turmeric }} className="h-px" /></div>
        </motion.div>
      </section>
    </>
  );
}

// ---- nights ----------------------------------------------------------------------------------
const NIGHTS = [
  { when: "Friday · 9 pm", what: "Coastal Strings", note: "Folk and film songs on the terrace, until the kitchen closes." },
  { when: "Saturday · 8 pm", what: "Open mic", note: "Bring a song. The first round of lime sodas is on the house." },
  { when: "Sunday · 11 am", what: "Tiffin brunch", note: "Ghee roast dosas, idli sambar and strong filter coffee, no rush." },
];

// ---- Atlas-style immersive hero: full-bleed photos crossfade, a vertical dot rail, a caption -------
const SLIDES = [
  { src: "/case/aavira/hero-bg.webp", cap: "Pepper prawns, straight off the kadai" },
  { src: "/case/aavira/p-leaf.webp", cap: "A coastal feast on a banana leaf" },
  { src: "/case/aavira/p-chilli.webp", cap: "Chilli and curry leaf, dry-roasted" },
  { src: "/case/aavira/p-prawn.webp", cap: "Prawns and onion, hot from the pan" },
];

// ---- Savor-style strips: tall photo columns that open on hover ---------------------------------
const STRIPS = [["prawn-pepper", "Prawn pepper fry"], ["biryani", "Avakai biryani"], ["chicken-fry", "Andhra chicken fry"], ["dosa", "Ghee roast dosa"], ["fish-curry", "Coastal fish curry"], ["payasam", "Kaju payasam"]];
function Strips() {
  const [hot, setHot] = useState<number | null>(null);
  return (
    <div className="flex gap-2 md:gap-3 h-[64vh] md:h-[74vh] overflow-x-auto md:overflow-visible snap-x snap-mandatory px-6 md:px-0" style={{ scrollbarWidth: "none" }}>
      {STRIPS.map(([id, label], k) => (
        <figure key={id} onMouseEnter={() => setHot(k)} onMouseLeave={() => setHot(null)} className={`relative snap-center shrink-0 w-[62vw] md:w-auto md:shrink rounded-2xl overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hot === k ? "md:[flex:3_1_0%]" : "md:[flex:1_1_0%]"}`} style={{ border: `1px solid ${AV.line}` }}>
          <img src={`${SITE}/${id}.webp`} alt={label} loading="lazy" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,12,11,.75), transparent 45%)" }} />
          <figcaption className="absolute bottom-4 left-4 right-4 font-display text-xl md:text-2xl leading-tight" style={{ color: AV.cream, opacity: hot === null || hot === k ? 1 : 0.6 }}>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// ---- Savor-style drifting row of tall panels, with a floating reserve card ---------------------------
const PASS = [["chicken-65", "Chicken 65"], ["paneer-tikka", "Paneer tikka"], ["keema", "Mutton keema"], ["idli-sambar", "Idli sambar"], ["lime-soda", "Fresh lime soda"], ["filter-coffee", "Filter coffee"], ["gulab-jamun", "Saffron jalebi"]];
function Pass() {
  const reduce = useReducedMotion();
  const row = (k: number) => (
    <div key={k} className="flex shrink-0 gap-3 pr-3" aria-hidden={k === 1}>
      {PASS.map(([id, label], n) => (
        <figure key={id} className="relative shrink-0 w-[44vw] sm:w-[26vw] lg:w-[17vw] rounded-2xl overflow-hidden" style={{ height: n % 2 ? "52vh" : "62vh", alignSelf: n % 2 ? "flex-end" : "flex-start", border: `1px solid ${AV.line}` }}>
          <img src={`${SITE}/${id}.webp`} alt={k === 0 ? label : ""} loading="lazy" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
          <figcaption className="absolute bottom-3 left-3 text-[0.68rem] uppercase tracking-[0.2em] rounded-full px-3 py-1" style={{ background: "rgba(14,12,11,.7)", color: AV.cream }}>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
  return (
    <div className="relative group overflow-hidden" style={{ background: AV.cream }}>
      <div className="flex w-max py-10 md:py-14 group-hover:[animation-play-state:paused]" style={{ animation: reduce ? undefined : "av-marquee 70s linear infinite", overflowX: reduce ? "auto" : undefined }}>
        {[0, 1].map(row)}
      </div>
      <a href="#reserve" className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex items-center gap-4 rounded-2xl pl-4 pr-2 py-2 shadow-xl" style={{ background: "#fffaf1", border: `1px solid ${AV.ember}55`, color: AV.ink }}>
        <span className="text-sm leading-tight">Hungry already?<br /><span style={{ color: "#7a6c5e" }}>Hold a table for tonight</span></span>
        <span className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: AV.ember, color: "#fff" }}>Reserve</span>
      </a>
    </div>
  );
}

// ---- the page ------------------------------------------------------------------------------------
export function AaviraSite() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const markScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.82]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setSlide((v) => (v + 1) % SLIDES.length), 5600);
    return () => window.clearInterval(t);
  }, [reduce]);
  const [solid, setSolid] = useState(false);
  const [showMark, setShowMark] = useState(false);
  useEffect(() => {
    const on = () => { setSolid(window.scrollY > 40); setShowMark(window.scrollY > window.innerHeight * 0.55); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [interest, setInterest] = useState<string[]>([]);
  const [sent, setSent] = useState<null | { name: string; date: string; time: string; guests: number }>(null);
  const [guests, setGuests] = useState(2);
  const [err, setErr] = useState("");

  const board = [["Starters", "Mains"], ["Biryani", "Tiffin"], ["Sweet", "Drinks"]];

  return (
    <div id="top" style={{ background: AV.ink, color: AV.cream }} className="av-type font-sans antialiased selection:bg-[#e9a23b] selection:text-black overflow-x-clip">
      <style>{`@keyframes av-marquee{to{transform:translateX(-50%)}}@keyframes av-cue{0%,100%{opacity:.4;transform:scaleY(.6)}50%{opacity:1;transform:scaleY(1)}}`}</style>
      <Intro />
      <Header solid={solid} showMark={showMark} />

      {/* HERO */}
      <section ref={heroRef} className="relative isolate min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10" aria-hidden>
          {SLIDES.map((sl, k) => (
            <img key={sl.src} src={sl.src} alt="" fetchPriority={k === 0 ? "high" : "low"} loading={k === 0 ? "eager" : "lazy"} className="absolute inset-0 w-full h-[116%] object-cover transition-opacity duration-[1400ms] ease-in-out" style={{ opacity: slide === k ? 1 : 0 }} />
          ))}
          <div className="absolute inset-0" style={{ background: "rgba(14,12,11,.22)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(14,12,11,.35), transparent 40%, ${AV.ink})` }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 46%, rgba(8,6,4,.5), transparent 72%)" }} />
        </motion.div>
        <motion.div style={reduce ? undefined : { opacity: fade, scale: markScale }} className="relative flex flex-col items-center pt-24">
          <p className={KICK} style={{ color: "#ffc467", textShadow: "0 1px 14px rgba(0,0,0,.8)" }}>Coastal kitchen and bar</p>
          <h1 className="mt-7" style={{ filter: "drop-shadow(0 4px 26px rgba(0,0,0,.6))" }}><span className="sr-only">Aavira, coastal kitchen and bar</span><Wordmark steam height={190} className="w-[82vw] max-w-[760px] h-auto av-rise" /></h1>
          <p className="mt-8 max-w-md text-base sm:text-lg leading-relaxed" style={{ color: AV.cream, textShadow: "0 1px 16px rgba(0,0,0,.7)" }}>Curry leaf crackling in a hot kadai, tamarind simmered low, and music on the terrace. Come hungry.</p>
          <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
            <a href="#menu" className="av-sheen av-press rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide" style={{ background: AV.turmeric, color: AV.ink }}>View the menu</a>
            <a href="#reserve" className="rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide" style={{ border: `1px solid ${AV.cream}88`, color: AV.cream, background: "rgba(14,12,11,.35)" }}>Reserve a table</a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em]" style={{ color: AV.cream, textShadow: "0 1px 10px rgba(0,0,0,.8)" }}><span>Live music on weekends</span><i className="w-1 h-1 rounded-full" style={{ background: AV.turmeric }} /><span>Open till midnight</span></div>
        </motion.div>
        <div className="absolute z-20 flex flex-row gap-1 bottom-7 left-1/2 -translate-x-1/2 md:flex-col md:gap-3 md:bottom-auto md:left-auto md:translate-x-0 md:right-8 md:top-1/2 md:-translate-y-1/2" role="tablist" aria-label="Hero photos">
          {SLIDES.map((sl, k) => (
            <button key={sl.src} type="button" role="tab" aria-selected={slide === k} aria-label={sl.cap} onClick={() => setSlide(k)} className="w-6 h-6 grid place-items-center">
              <i className={`block rounded-full transition-all duration-500 ${slide === k ? "h-[7px] w-[22px] md:w-[7px] md:h-[22px]" : "h-[7px] w-[7px]"}`} style={{ background: slide === k ? AV.cream : `${AV.cream}66` }} />
            </button>
          ))}
        </div>
        <p className="absolute bottom-16 md:bottom-24 inset-x-0 text-center text-[0.7rem] uppercase tracking-[0.24em] px-6" style={{ color: AV.cream, textShadow: "0 1px 10px rgba(0,0,0,.85)" }} aria-live="polite">↳ {SLIDES[slide].cap}</p>
        <div className="absolute bottom-8 hidden md:flex flex-col items-center gap-2" style={{ color: AV.muted }}><span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span><span className="w-px h-9 origin-top" style={{ background: `linear-gradient(${AV.turmeric}, transparent)`, animation: reduce ? undefined : "av-cue 2.2s ease-in-out infinite" }} /></div>
      </section>

      {/* TONIGHT */}
      <section className="px-6 py-5 text-center text-[0.72rem] uppercase tracking-[0.26em]" style={{ borderTop: `1px solid ${AV.line}`, borderBottom: `1px solid ${AV.line}`, color: AV.muted }}>
        <span style={{ color: AV.turmeric }}>Tonight</span>&nbsp;&nbsp;·&nbsp;&nbsp;Prawn pepper fry is the special&nbsp;&nbsp;·&nbsp;&nbsp;Kitchen open till midnight
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-40 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6">
          <div className={KICK} style={{ color: AV.turmeric }}>Our kitchen</div>
          <SplitReveal text="The coast, on a plate." className="mt-6 font-display text-6xl md:text-8xl leading-[0.98]" />
          <div className="reveal-up">
            <p className="mt-8 text-lg md:text-xl leading-relaxed max-w-lg" style={{ color: AV.muted }}>Aavira cooks the way the coast eats. Fish bought at first light, curry leaf popped in hot oil, pickle masala that tastes like somebody's grandmother's kitchen. Nothing fancy, everything turned up.</p>
            <a href="#menu" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] pb-1" style={{ color: AV.cream, borderBottom: `1px solid ${AV.turmeric}` }}>See what is cooking <ArrowUpRight className="w-4 h-4" /></a>
          </div>
        </div>
        <div className="lg:col-span-6">
          <Parallax speed={0.1} className="rounded-[26px] aspect-[4/5] md:aspect-[5/6]"><img src="/case/aavira/p-leaf.webp" alt="A coastal feast served on a banana leaf" loading="lazy" className="w-full h-full object-cover" /></Parallax>
        </div>
      </section>

      {/* STRIPS (Savor) */}
      <section className="pb-24 md:pb-36" aria-labelledby="strips-h">
        <div className="mx-auto max-w-[1500px] md:px-10">
          <div className="px-6 md:px-0 mb-10 flex flex-wrap items-end justify-between gap-4">
            <SplitReveal text="The kitchen, up close." className="font-display text-5xl md:text-7xl leading-[1]" />
            <span id="strips-h" className={KICK} style={{ color: AV.muted }}>Hover a plate to open it</span>
          </div>
          <Strips />
        </div>
      </section>

      {/* MARQUEE */}
      <section aria-hidden className="group overflow-hidden py-6" style={{ borderTop: `1px solid ${AV.line}`, borderBottom: `1px solid ${AV.line}` }}>
        <div className="flex w-max group-hover:[animation-play-state:paused]" style={{ animation: reduce ? undefined : "av-marquee 38s linear infinite" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {["Coastal kitchen", "Curry leaf and tamarind", "Live music on weekends", "Slow-sealed biryani", "Open till midnight", "Scan, order, relax"].map((t) => (
                <span key={t} className="flex items-center"><span className="px-7 font-display text-3xl md:text-5xl uppercase tracking-[0.04em]" style={{ color: AV.muted }}>{t}</span><span style={{ color: AV.turmeric }}>✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURES (cream, like the Monte deck) */}
      <section style={{ background: AV.cream, color: AV.ink }} className="px-6 md:px-10 py-24 md:py-36" aria-labelledby="sig-h">
        <div className="mx-auto max-w-[1200px]">
          <div className={KICK} style={{ color: AV.ember }}>What to order</div>
          <SplitReveal text="Six dishes we are known for." className="mt-5 mb-14 md:mb-20 font-display text-5xl md:text-7xl leading-[1] max-w-2xl" />
          <span id="sig-h" className="sr-only">Signature dishes</span>
          <Deck />
        </div>
      </section>

      {/* WHAT'S COOKING reel */}
      <Reel />

      {/* FROM THE PASS (Savor) */}
      <section aria-labelledby="pass-h">
        <div className="px-6 md:px-10 py-14 md:py-20 text-center" style={{ background: AV.cream, color: AV.ink }}>
          <div className={KICK} style={{ color: AV.ember }}>From the pass</div>
          <SplitReveal text="Plated, then straight out." className="mt-4 font-display text-5xl md:text-7xl leading-[1]" />
          <span id="pass-h" className="sr-only">A drifting gallery of dishes</span>
        </div>
        <Pass />
      </section>

      {/* MENU BOARD */}
      <section id="menu" className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-36" aria-labelledby="menu-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><div className={KICK} style={{ color: AV.turmeric }}>The menu</div><SplitReveal text="Tonight's board." className="mt-5 font-display text-6xl md:text-8xl leading-[0.98]" /></div>
          <p className="max-w-sm text-[15px] leading-relaxed" style={{ color: AV.muted }}>Order from your table. Scan the code, browse with photos, ask the host anything, and send it to the kitchen. No app to download.</p>
        </div>
        <span id="menu-h" className="sr-only">Menu</span>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {board.map((cats, bi) => (
            <div key={bi} className="rounded-3xl p-6 md:p-8" style={{ background: `linear-gradient(180deg, ${AV.surfaceHi}, ${AV.surface})`, border: `1px solid ${AV.line}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,.04), 0 24px 50px -30px rgba(0,0,0,.7)" }}>
              {cats.map((cat, ci) => (
                <div key={cat} className={ci ? "mt-10" : ""}>
                  <h3 className="font-display text-3xl">{cat}</h3>
                  <div className="label mt-4 flex justify-between text-[10px] pb-2" style={{ color: AV.dim, borderBottom: `1px solid ${AV.line}` }}><span>Item</span><span>Price</span></div>
                  <ul>
                    {MENU.filter((d) => d.cat === cat).map((d) => (
                      <li key={d.id} className="py-3" style={{ borderBottom: `1px solid ${AV.line}` }}>
                        <div className="flex items-baseline justify-between gap-4"><span className="flex items-center gap-2" style={{ color: AV.cream }}><span className="inline-flex w-[11px] h-[11px] rounded-[2px] border items-center justify-center shrink-0" style={{ borderColor: d.veg ? "#5fa05a" : "#c0431f" }} aria-label={d.veg ? "Vegetarian" : "Non vegetarian"}><i className="w-[5px] h-[5px] rounded-full" style={{ background: d.veg ? "#5fa05a" : "#c0431f" }} /></span>{d.name}</span><span style={{ color: AV.turmeric }}>{inr(d.price)}</span></div>
                        <p className="text-[12.5px] mt-1 pl-[19px]" style={{ color: AV.muted }}>{d.line}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <a href="/work/aavira" className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] pb-1" style={{ color: AV.cream, borderBottom: `1px solid ${AV.turmeric}` }}>See how ordering from the table works <ArrowUpRight className="w-4 h-4" /></a>
      </section>

      {/* NIGHTS */}
      <section id="nights" style={{ background: AV.tide, borderTop: `1px solid #1d4a47`, borderBottom: `1px solid #1d4a47` }} className="px-6 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-[1300px]">
          <div className={KICK} style={{ color: AV.turmeric }}>Nights at Aavira</div>
          <SplitReveal text="Come for dinner, stay for the set." className="mt-5 font-display text-5xl md:text-7xl leading-[1] max-w-3xl" />
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {NIGHTS.map((n) => {
              const on = interest.includes(n.what);
              return (
                <article key={n.what} className="rounded-3xl p-7 flex flex-col" style={{ background: "#0c211f", border: `1px solid #1d4a47` }}>
                  <div className={KICK} style={{ color: AV.turmeric }}>{n.when}</div>
                  <h3 className="mt-5 font-display text-3xl md:text-4xl">{n.what}</h3>
                  <p className="mt-3 leading-relaxed" style={{ color: AV.muted }}>{n.note}</p>
                  <button type="button" aria-pressed={on} onClick={() => setInterest((x) => (on ? x.filter((y) => y !== n.what) : [...x, n.what]))} className="mt-8 self-start rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: on ? "transparent" : AV.turmeric, color: on ? AV.turmeric : AV.ink, border: `1px solid ${AV.turmeric}` }}>{on ? "You're on the list" : "I'm interested"}</button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESERVE (cream) */}
      <section id="reserve" style={{ background: AV.cream, color: AV.ink }} className="px-6 md:px-10 py-24 md:py-36" aria-labelledby="res-h">
        <div className="mx-auto max-w-[1100px] grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className={KICK} style={{ color: AV.ember }}>Reserve</div>
            <SplitReveal text="Save us a table." className="mt-5 font-display text-6xl md:text-7xl leading-[1]" />
            <p id="res-h" className="mt-6 text-lg leading-relaxed" style={{ color: "#4a3f35" }}>Tell us when and how many. We will hold the table for fifteen minutes past your time.</p>
            <p className="mt-6 text-sm" style={{ color: "#7a6c5e" }}>Demo form: this is a concept site, so nothing is sent or saved.</p>
          </div>
          <div className="lg:col-span-7">
            {sent ? (
              <div className="rounded-3xl p-8 md:p-10" style={{ background: AV.ink, color: AV.cream }} role="status">
                <div className={KICK} style={{ color: AV.turmeric }}>Request received</div>
                <h3 className="mt-4 font-display text-4xl">See you soon, {sent.name}.</h3>
                <p className="mt-4 text-lg" style={{ color: AV.muted }}>A table for {sent.guests} on {sent.date} at {sent.time}.</p>
                <button type="button" onClick={() => setSent(null)} className="mt-8 text-sm underline underline-offset-4" style={{ color: AV.cream }}>Change the booking</button>
              </div>
            ) : (
              <form noValidate className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const name = String(f.get("name") || "").trim(); const date = String(f.get("date") || ""); const time = String(f.get("time") || "");
                if (!name || !date) { setErr("Please add your name and a date."); return; }
                setErr(""); setSent({ name, date: new Date(date + "T00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }), time, guests });
              }}>
                {[["name", "Your name", "text"], ["date", "Date", "date"]].map(([n, l, t]) => (
                  <label key={n} className="block text-sm" style={{ color: "#4a3f35" }}><span className="block mb-2">{l}</span>
                    <input name={n} type={t} min={t === "date" ? new Date().toISOString().slice(0, 10) : undefined} className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2" style={{ background: "#fffaf1", border: `1.5px solid ${AV.ember}66`, color: AV.ink }} />
                  </label>
                ))}
                <label className="block text-sm" style={{ color: "#4a3f35" }}><span className="block mb-2">Time</span>
                  <select name="time" defaultValue="8:00 pm" className="w-full rounded-xl px-4 py-3.5 text-base outline-none focus:ring-2" style={{ background: "#fffaf1", border: `1.5px solid ${AV.ember}66`, color: AV.ink }}>
                    {["12:30 pm", "1:30 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <div className="text-sm" style={{ color: "#4a3f35" }}><span className="block mb-2">Guests</span>
                  <div className="inline-flex items-center rounded-xl" style={{ background: "#fffaf1", border: `1.5px solid ${AV.ember}66` }}>
                    <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-12 h-[52px] text-xl">−</button>
                    <span className="w-10 text-center text-base" aria-live="polite">{guests}</span>
                    <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(12, g + 1))} className="w-12 h-[52px] text-xl">+</button>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  {err && <p className="mb-3 text-sm" role="alert" style={{ color: "#a8341a" }}>{err}</p>}
                  <button type="submit" className="av-sheen av-press rounded-full px-8 py-4 text-sm font-semibold tracking-wide" style={{ background: AV.ember, color: "#fff" }}>Request this table</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-10 pt-20 pb-10 overflow-hidden" style={{ background: AV.ink }}>
        <div className="mx-auto max-w-[1300px] grid sm:grid-cols-3 gap-10 text-[15px]" style={{ color: AV.muted }}>
          <div><div className={KICK} style={{ color: AV.turmeric }}>Hours</div><p className="mt-4 leading-relaxed">Open daily, 12 pm to midnight.<br />The kitchen closes at midnight.</p></div>
          <div><div className={KICK} style={{ color: AV.turmeric }}>Find us</div><p className="mt-4 leading-relaxed">Aavira is a concept, so there is no address to find. The real thing would be right by the sea.</p></div>
          <div><div className={KICK} style={{ color: AV.turmeric }}>Elsewhere</div><p className="mt-4 leading-relaxed"><a href="/work/aavira" className="underline underline-offset-4" style={{ color: AV.cream }}>Read the case study</a><br /><a href="#menu" className="underline underline-offset-4" style={{ color: AV.cream }}>Order from your table</a></p></div>
        </div>
        <div className="mt-16 flex justify-center" aria-hidden><Wordmark height={170} color={`${AV.cream}26`} className="w-[92vw] max-w-[1200px] h-auto" /></div>
        <p className="mt-10 text-center text-xs tracking-wide" style={{ color: AV.dim }}>An Aavira concept, a made. product. Photography is licensed stock. <a href="/" className="underline underline-offset-4" style={{ color: AV.cream }}>made. by ac</a></p>
      </footer>
    </div>
  );
}
