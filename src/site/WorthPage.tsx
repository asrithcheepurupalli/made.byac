import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── What design is worth ─────────────────────────────────────────────────────
// A calm, honest calculator that reframes design from a cost to an investment.
// Slide your traffic, conversion and value; a conservative uplift shows what a
// better experience returns a month and a year. The point is the shape, not a
// promise: small lifts, large sums.

function PageHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey-dim">what design is worth</span>
      </div>
    </header>
  );
}

function inr(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
// short Indian format for the headline number
function inrShort(n: number): string {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(n >= 1e8 ? 0 : 1) + " Cr";
  if (n >= 1e5) return "₹" + (n / 1e5).toFixed(n >= 1e6 ? 0 : 1) + " L";
  return inr(n);
}

type Preset = { label: string; visitors: number; conv: number; value: number; lift: number };
const PRESETS: Preset[] = [
  { label: "Restaurant", visitors: 8000, conv: 4, value: 650, lift: 18 },
  { label: "Online store", visitors: 40000, conv: 1.8, value: 1800, lift: 20 },
  { label: "Service / agency", visitors: 3000, conv: 2, value: 120000, lift: 15 },
];

function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label text-[9px] text-grey-dim">{label}</span>
        <span className="font-mono text-sm text-paper">{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="mt-2 w-full" style={{ accentColor: "var(--color-red)" }} />
    </div>
  );
}

export function WorthPage() {
  const [visitors, setVisitors] = useState(8000);
  const [conv, setConv] = useState(4);
  const [value, setValue] = useState(650);
  const [lift, setLift] = useState(18);

  const now = visitors * (conv / 100) * value;
  const after = visitors * ((conv * (1 + lift / 100)) / 100) * value;
  const gainM = after - now;
  const gainY = gainM * 12;
  const extraConv = visitors * (conv / 100) * (lift / 100);
  const max = Math.max(after, 1);

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh] overflow-clip">
      <PageHeader />
      <main>
        {/* hero */}
        <section className="reveal-up px-6 md:px-10 pt-32 pb-12 md:pt-40">
          <div className="mx-auto max-w-[1600px]">
            <span className="label text-red">·what design is worth</span>
            <h1 className="mt-6 font-display text-[12vw] leading-[0.88] tracking-[-0.03em] sm:text-[7.5rem]">
              Design is not a cost.<br /><span className="italic font-normal text-gold">Here is the maths.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-grey-dim leading-relaxed font-display">
              A clearer funnel, a faster page, more trust. Each nudges the same lever, conversion. Move the sliders to your numbers and watch what a better experience returns. We keep the uplift conservative on purpose.
            </p>
          </div>
        </section>

        {/* calculator */}
        <section className="border-t border-ink-line py-14 md:py-20">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
            {/* inputs */}
            <div className="lg:col-span-5">
              <span className="label text-grey-dim text-[10px]">start with a shape</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => { setVisitors(p.visitors); setConv(p.conv); setValue(p.value); setLift(p.lift); }} className="label rounded-full border border-ink-line px-3 py-2 text-[9px] text-grey-dim transition-colors hover:text-paper hover:border-gold">{p.label}</button>
                ))}
              </div>
              <div className="mt-8 space-y-7 border-t border-ink-line pt-8">
                <Slider label="monthly visitors" value={visitors} min={500} max={200000} step={500} onChange={setVisitors} fmt={(v) => v.toLocaleString("en-IN")} />
                <Slider label="conversion rate now" value={conv} min={0.5} max={12} step={0.1} onChange={setConv} fmt={(v) => `${v.toFixed(1)}%`} />
                <Slider label="average value per conversion" value={value} min={100} max={200000} step={100} onChange={setValue} fmt={inr} />
                <Slider label="uplift a better experience buys" value={lift} min={5} max={40} step={1} onChange={setLift} fmt={(v) => `+${v}%`} />
              </div>
            </div>

            {/* result */}
            <div key={`${visitors}-${conv}-${value}-${lift}`} className="reveal-up lg:col-span-7">
              <div className="rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-10">
                <span className="label text-[9px] text-gold">what it returns, a year</span>
                <div className="mt-3 font-display text-6xl md:text-8xl leading-none tracking-tight text-paper">{inrShort(gainY)}</div>
                <p className="mt-3 text-grey-dim">{inr(gainM)} more a month, from {Math.round(extraConv).toLocaleString("en-IN")} extra conversions. Same traffic, a better experience.</p>

                {/* before / after */}
                <div className="mt-9 space-y-4 border-t border-ink-line pt-7">
                  <div>
                    <div className="flex items-center justify-between text-[13px]"><span className="text-grey-dim">today</span><span className="font-mono text-paper/80">{inr(now)}/mo</span></div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink"><div className="h-full rounded-full" style={{ width: `${(now / max) * 100}%`, background: "var(--color-grey)" }} /></div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[13px]"><span style={{ color: "var(--color-gold)" }}>with a better experience</span><span className="font-mono text-paper">{inr(after)}/mo</span></div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${(after / max) * 100}%`, background: "var(--color-red)" }} /></div>
                  </div>
                </div>
              </div>
              <p className="mt-3 label text-[9px] text-grey-dim">conservative numbers. the point is the shape, not a promise.</p>
            </div>
          </div>
        </section>

        {/* honest note */}
        <section data-nav-dark className="reveal-up bg-paper text-ink border-t border-paper-line py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <span className="label text-red">·the honest part</span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl leading-tight tracking-tight">Design does not invent demand.<br />It stops you leaking it.</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-3">
              {[["Clarity", "When the next step is obvious, more people take it. Most funnels leak at the moment of doubt."], ["Speed", "Every second of load sheds visitors. Fast is a feature you can feel before you read a word."], ["Trust", "Looking considered is the first proof you are. People decide before they test. We earn that decision."]].map(([t, d]) => (
                <div key={t} className="bg-paper p-7">
                  <h3 className="font-display text-2xl leading-tight">{t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-grey">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* cta */}
        <section className="reveal-up border-t border-ink-line py-24 md:py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight">Want that lift<br /><span className="italic font-normal text-gold">on your numbers?</span></h2>
            <p className="mt-5 text-grey-dim leading-relaxed">Tell us where you leak. We will show you, with a real audit and a plan, not a promise.</p>
            <a href="/#say-hi" data-cursor="Hello" className="mt-9 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-paper transition-transform hover:-translate-y-0.5">
              <span className="label text-[11px]">Get a design audit</span><ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
