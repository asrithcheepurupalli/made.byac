import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Eye } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── Teardown ───────────────────────────────────────────────────────────────────
// Not a form. A live, interactive design critique: a believable bad landing page that
// we mark up with our redlines (clickable pins, real issues), then flip into the made.
// version. The experience IS the proof of how we see and build, which is exactly the
// first impression a new visitor from Reddit needs. Pure client-side, no API.

const AW = 980; // artboard is a fixed-size "screenshot" we scale to fit, so the pins
const AH = 620; // always stay aligned to what they point at, at any screen size.

type Issue = {
  n: number; x: number; y: number; w: number; h: number;
  tag: string; note: string; law: string; fix: string;
};
const ISSUES: Issue[] = [
  { n: 1, x: 40, y: 150, w: 600, h: 78, tag: "The headline", note: "I have read this twice and still cannot tell what you do.", law: "Clarity beats cleverness above the fold.", fix: "Lead with the plain promise, in the customer's words." },
  { n: 2, x: 372, y: 12, w: 584, h: 34, tag: "The nav", note: "Eight links is eight different ways to leave.", law: "Every extra choice is a chance to bounce.", fix: "Cut the nav to what earns a click. Hide the rest." },
  { n: 3, x: 40, y: 300, w: 470, h: 58, tag: "The buttons", note: "Five calls to action means I will pick none.", law: "One page, one job, one button.", fix: "Choose the single action that matters. Demote the rest." },
  { n: 4, x: 40, y: 236, w: 560, h: 52, tag: "The copy", note: "World-class, cutting-edge, synergy. This says nothing.", law: "Show the proof, do not claim the adjective.", fix: "Replace buzzwords with one true, specific sentence." },
  { n: 5, x: 642, y: 132, w: 300, h: 250, tag: "The image", note: "Stock photo number four thousand. We have all met her.", law: "Generic visuals read as a generic company.", fix: "Show the real product, the real work, the real room." },
  { n: 6, x: 40, y: 452, w: 900, h: 132, tag: "The hierarchy", note: "Everything is the same size, so my eye gives up.", law: "If it is all loud, none of it is heard.", fix: "Make one thing dominant. Let the rest recede." },
];

// The believable template everyone has seen. Arial, stock blue, clutter, shouting.
function BadPage() {
  const T = { position: "absolute" as const, fontFamily: "Arial, Helvetica, sans-serif" };
  return (
    <div style={{ width: AW, height: AH, background: "#ffffff", color: "#1b1b1b", position: "absolute", inset: 0 }}>
      {/* nav */}
      <div style={{ ...T, top: 0, left: 0, width: AW, height: 46, borderBottom: "1px solid #e3e3e3", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: 24, fontWeight: 800, fontSize: 18 }}>ACME</span>
        <span style={{ position: "absolute", right: 24, fontSize: 12, color: "#0a52cc", fontWeight: 700, letterSpacing: 0.3 }}>Home   Features   Pricing   About   Blog   Docs   Contact   Login   Sign&nbsp;Up</span>
      </div>
      {/* headline */}
      <div style={{ ...T, left: 40, top: 150, width: 590, fontWeight: 800, fontSize: 38, lineHeight: 1.05 }}>The Best All-In-One Platform for Modern Teams</div>
      {/* subhead */}
      <div style={{ ...T, left: 40, top: 238, width: 560, fontSize: 15, color: "#555", lineHeight: 1.45 }}>We deliver world-class, cutting-edge solutions that empower your business to achieve seamless synergy at scale.</div>
      {/* buttons */}
      <div style={{ ...T, left: 40, top: 300, display: "flex", gap: 10 }}>
        {[["Sign Up Free", "#0a52cc", "#fff"], ["Book a Demo", "#fff", "#0a52cc"], ["Learn More", "#fff", "#444"], ["Contact Sales", "#fff", "#444"]].map(([t, bg, c], i) => (
          <span key={i} style={{ background: bg, color: c, border: "1px solid #0a52cc", borderRadius: 4, padding: "9px 14px", fontSize: 12, fontWeight: 700 }}>{t}</span>
        ))}
      </div>
      {/* rating clutter */}
      <div style={{ ...T, left: 40, top: 360, fontSize: 12, color: "#f5a623" }}>★★★★★ <span style={{ color: "#888" }}>Trusted by thousands of companies worldwide!!</span></div>
      {/* stock image */}
      <div style={{ ...T, left: 642, top: 132, width: 300, height: 250, background: "#e6e6e6", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#aeaeae", fontSize: 13 }}>STOCK PHOTO</div>
      {/* feature wall */}
      <div style={{ ...T, left: 40, top: 452, width: 900, display: "flex", gap: 14 }}>
        {["Fast", "Secure", "Scalable", "Flexible"].map((f) => (
          <div key={f} style={{ flex: 1, border: "1px solid #e3e3e3", borderRadius: 6, padding: 16 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: "#dbe6ff", marginBottom: 10 }} />
            <div style={{ fontWeight: 700, fontSize: 14 }}>{f}</div>
            <div style={{ fontSize: 11, color: "#777", marginTop: 4, lineHeight: 1.4 }}>Lorem ipsum dolor sit amet consectetur adipiscing.</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// The same page, made. One promise, one action, real proof, room to breathe.
function MadePage() {
  return (
    <div style={{ width: AW, height: AH, background: "#f6f3ee", color: "#0b0b0c", position: "absolute", inset: 0, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", right: -120, top: -120, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,132,47,0.16), transparent 70%)" }} />
      {/* nav */}
      <div style={{ position: "absolute", top: 0, left: 0, width: AW, height: 56, display: "flex", alignItems: "center" }}>
        <span className="font-display" style={{ position: "absolute", left: 40, top: 16, fontSize: 22, fontStyle: "italic", fontWeight: 600 }}>Acme<span style={{ color: "#c8102e", fontStyle: "normal" }}>.</span></span>
        <span style={{ position: "absolute", right: 170, top: 21, fontFamily: "monospace", fontSize: 11, letterSpacing: 1.5, color: "#6f6a62", textTransform: "uppercase" }}>Product · Pricing · Docs</span>
        <span style={{ position: "absolute", right: 40, top: 13, background: "#c8102e", color: "#fff", borderRadius: 999, padding: "8px 18px", fontSize: 11, fontWeight: 600 }}>Start free</span>
      </div>
      {/* eyebrow */}
      <div style={{ position: "absolute", left: 40, top: 132, fontFamily: "monospace", fontSize: 11, letterSpacing: 2, color: "#a8842f", textTransform: "uppercase" }}>Docs that keep themselves current</div>
      {/* headline */}
      <div className="font-display" style={{ position: "absolute", left: 40, top: 162, width: 600, fontSize: 60, lineHeight: 0.98, letterSpacing: "-0.02em" }}>Ship docs in <span style={{ fontStyle: "italic", color: "#a8842f" }}>half the time.</span></div>
      {/* subhead */}
      <div style={{ position: "absolute", left: 42, top: 320, width: 460, fontSize: 16, color: "#56514a", lineHeight: 1.5 }}>Acme turns your codebase into living documentation your team actually reads. One source, always in sync.</div>
      {/* one action + quiet secondary */}
      <div style={{ position: "absolute", left: 42, top: 408, display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ background: "#c8102e", color: "#fff", borderRadius: 999, padding: "12px 24px", fontSize: 13, fontWeight: 600 }}>Start free →</span>
        <span style={{ fontSize: 13, color: "#6f6a62", borderBottom: "1px solid #c9bfa8", paddingBottom: 2 }}>See how it works</span>
      </div>
      {/* proof */}
      <div style={{ position: "absolute", left: 42, top: 486, fontFamily: "monospace", fontSize: 11, letterSpacing: 1, color: "#6f6a62" }}>200+ engineering teams · 4.9 average · SOC 2</div>
      {/* calm product specimen */}
      <div style={{ position: "absolute", right: 40, top: 150, width: 320, height: 300, background: "#0b0b0c", borderRadius: 12, padding: 18, display: "flex", flexDirection: "column", gap: 9 }}>
        <span className="font-display" style={{ color: "#f6f3ee", fontSize: 14, fontStyle: "italic" }}>acme<span style={{ color: "#c8102e" }}>.</span> / docs</span>
        <span style={{ height: 8, width: "70%", borderRadius: 3, background: "#c8102e" }} />
        <span style={{ height: 6, width: "92%", borderRadius: 3, background: "rgba(255,255,255,0.18)" }} />
        <span style={{ height: 6, width: "84%", borderRadius: 3, background: "rgba(255,255,255,0.14)" }} />
        <span style={{ height: 6, width: "88%", borderRadius: 3, background: "rgba(255,255,255,0.14)" }} />
        <span style={{ marginTop: "auto", height: 26, width: 96, borderRadius: 999, background: "#a8842f" }} />
      </div>
    </div>
  );
}

export function TeardownPage() {
  const [active, setActive] = useState<number>(1);
  const [fixed, setFixed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const set = () => setScale(el.clientWidth / AW);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cur = ISSUES.find((i) => i.n === active)!;

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh] overflow-clip">
      <style>{`@keyframes td-pin{0%{transform:scale(0);opacity:0}60%{transform:scale(1.25)}100%{transform:scale(1);opacity:1}}@keyframes td-ping{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.2);opacity:0}}@media(prefers-reduced-motion:reduce){.td-pin,.td-ping{animation:none!important}}`}</style>

      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
            <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
          </a>
          <span className="label text-[10px] text-grey-dim">live teardown</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* hero */}
        <section className="reveal-up pt-28 pb-8 md:pt-36 md:pb-12 max-w-3xl">
          <span className="label text-red">·teardown</span>
          <h1 className="mt-6 font-display text-[12vw] leading-[0.9] tracking-[-0.03em] sm:text-7xl md:text-[5.5rem]">
            Watch us tear a<br /><span className="italic font-normal text-gold">page apart.</span>
          </h1>
          <p className="mt-7 text-lg text-grey-dim leading-relaxed font-display">
            This is the same landing page every founder ends up with. Tap a red mark to hear what we see, then flip it into the version we would build. This is exactly what we do, free, when you send us your real one.
          </p>
        </section>

        {/* the stage */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* artboard */}
          <div className="lg:col-span-8">
            <div className="reveal-up relative rounded-2xl border border-ink-line overflow-hidden shadow-2xl bg-white" ref={wrapRef} style={{ height: AH * scale }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: AW, height: AH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                {fixed ? (
                  <MadePage />
                ) : (
                  <>
                    <BadPage />
                    {/* the redline overlay */}
                    {ISSUES.map((it) => {
                      const on = it.n === active;
                      return (
                        <button
                          key={it.n}
                          type="button"
                          onClick={() => setActive(it.n)}
                          aria-label={it.tag}
                          style={{ position: "absolute", left: it.x, top: it.y, width: it.w, height: it.h }}
                          className="group"
                        >
                          {/* highlight box */}
                          <span
                            className="absolute inset-0 rounded-md transition-all duration-300"
                            style={{ border: on ? "2px dashed #c8102e" : "2px dashed transparent", background: on ? "rgba(200,16,46,0.07)" : "transparent" }}
                          />
                          {/* pin */}
                          <span
                            className="td-pin absolute -top-3 -left-3 flex items-center justify-center rounded-full font-bold text-white"
                            style={{ width: 30, height: 30, fontSize: 14, background: "#c8102e", boxShadow: "0 2px 8px rgba(0,0,0,0.35)", animationDelay: `${it.n * 0.1}s`, transform: on ? "scale(1.15)" : "scale(1)" }}
                          >
                            {it.n}
                            {on && <span className="td-ping absolute inset-0 rounded-full" style={{ border: "2px solid #c8102e" }} />}
                          </span>
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            {/* toggle */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setFixed((f) => !f)}
                data-cursor={fixed ? "Back" : "Fix it"}
                className="inline-flex items-center gap-2 rounded-full bg-paper text-ink label px-6 py-3.5 hover:bg-gold transition-colors active:scale-[0.98]"
              >
                <Eye className="w-4 h-4" /> {fixed ? "Back to the teardown" : "Now see the made. version"}
              </button>
              <span className="label text-[9px] text-grey-dim">{fixed ? "same content. one promise, one action, room to breathe." : `${ISSUES.length} problems on one page`}</span>
            </div>
          </div>

          {/* the reader */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            {!fixed ? (
              <div className="rounded-2xl border border-ink-line overflow-hidden">
                <div className="p-7 bg-ink-soft/40 border-b border-ink-line">
                  <div className="flex items-center justify-between">
                    <span className="label text-red">the verdict</span>
                    <span className="font-display text-4xl leading-none">3<span className="text-grey-dim text-xl"> / 10</span></span>
                  </div>
                  <p className="mt-3 text-grey-dim text-[14px] leading-relaxed">Decent product, probably. The page is hiding it. Tap each mark.</p>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red text-white text-xs font-bold">{cur.n}</span>
                    <span className="label text-gold">{cur.tag}</span>
                  </div>
                  <p className="mt-4 font-display text-2xl leading-snug">"{cur.note}"</p>
                  <p className="mt-4 text-[14px] text-grey-dim leading-relaxed"><span className="text-paper">The law:</span> {cur.law}</p>
                  <p className="mt-2 text-[14px] text-grey-dim leading-relaxed"><span className="text-paper">The fix:</span> {cur.fix}</p>
                </div>
                <div className="px-7 pb-7 flex flex-wrap gap-1.5">
                  {ISSUES.map((it) => (
                    <button
                      key={it.n}
                      type="button"
                      onClick={() => setActive(it.n)}
                      className="w-8 h-8 rounded-full text-xs font-bold transition-colors active:scale-[0.95]"
                      style={it.n === active ? { background: "#c8102e", color: "#fff" } : { background: "var(--color-ink-soft)", color: "var(--color-grey-dim)" }}
                    >
                      {it.n}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-ink-line p-7">
                <span className="label text-gold">made.</span>
                <p className="mt-4 font-display text-3xl leading-tight">From six problems to one clear page.</p>
                <ul className="mt-6 flex flex-col gap-3 text-[14px] text-grey-dim">
                  {["One promise a stranger gets instantly", "One action, impossible to miss", "Real proof, not adjectives", "A typeface and space with intent", "Built for the phone too"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />{t}</li>
                  ))}
                </ul>
                <p className="mt-6 text-[14px] text-grey-dim leading-relaxed">Same content. The difference is the craft, and that is the whole job.</p>
              </div>
            )}
          </div>
        </section>

        {/* the offer */}
        <section className="reveal-up py-16 md:py-24">
          <div className="rounded-3xl border border-ink-line p-8 md:p-14 text-center bg-ink-soft/30">
            <span className="label text-red">your turn</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">Send us your real page.</h2>
            <p className="mt-5 text-grey-dim leading-relaxed max-w-xl mx-auto">We will reply with this, on your actual landing page. What is working, the three things we would change first, and why. Free, and no pitch attached.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:thebrain@made-by-ac.com?subject=${encodeURIComponent("Tear my page down")}&body=${encodeURIComponent("Hi made.,\n\nHere is my page: \n\nWhat I want it to do: \n\nBe honest.\n\nThanks,\n")}`}
                data-cursor="Email"
                className="inline-flex items-center gap-2 rounded-full bg-red text-white label px-7 py-4 hover:bg-red-deep transition-colors active:scale-[0.98]"
              >
                Send your link <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="/#say-hi" data-cursor="Hello" className="inline-flex items-center gap-2 rounded-full border border-ink-line label px-7 py-4 text-paper/85 hover:text-gold hover:border-gold/50 transition-colors">
                Or just say hi
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
