import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── Teardown ───────────────────────────────────────────────────────────────────
// A free, self-serve landing-page audit: the eight things we check first when we tear
// a page down. The visitor scores their own page, gets the fixes that matter, and an
// offer to have us do it properly. Pure client-side (no API), and it doubles as our
// teardown framework, which is exactly what earns the right to mention us on Reddit.

type Crit = { key: string; q: string; good: string; fix: string };
const CRITERIA: Crit[] = [
  { key: "oneliner", q: "Can a stranger tell what you do, and who it is for, in five seconds?", good: "A plain promise above the fold, before any clever line.", fix: "Lead with the plain promise. Clever can come second." },
  { key: "action", q: "Is there one obvious next step?", good: "A single primary action. Everything else is quieter.", fix: "Pick the one action that matters and demote the rest. Five buttons is zero buttons." },
  { key: "proof", q: "Is there real proof, not just adjectives?", good: "Work, numbers, or names a visitor can actually check.", fix: "Show the work or the number. Claims are free; proof is what converts." },
  { key: "hierarchy", q: "Does the eye know where to land first?", good: "One thing is clearly the biggest. The rest recedes.", fix: "Make one element dominant and let the others step back. If it is all loud, none of it is." },
  { key: "craft", q: "Is the type and spacing considered, or default?", good: "A typeface with a point of view, and room to breathe.", fix: "Choose type on purpose and give it space. System fonts and cramped margins read as cheap." },
  { key: "firstsecond", q: "Does it look intentional in the first second, and load fast?", good: "Composed and quick before anyone scrolls.", fix: "Win the first second. A slow, stock-photo opener loses people before they read a word." },
  { key: "voice", q: "Does it sound like a human with a point of view?", good: "Copy with a spine, not generic template filler.", fix: "Write like you talk. Cut the hype and the filler; say the true thing plainly." },
  { key: "mobile", q: "Is it composed on a phone, not just shrunk?", good: "A phone layout designed on purpose.", fix: "Design the mobile view deliberately. Most of your visitors are there, not on a desktop." },
];

const SCORE = [
  { label: "Nope", v: 0, tone: "#c8102e" },
  { label: "Kinda", v: 1, tone: "#bd9b4e" },
  { label: "Nailed it", v: 2, tone: "#3aa655" },
];

const MAIL =
  `mailto:thebrain@made-by-ac.com?subject=${encodeURIComponent("Free teardown, please")}` +
  `&body=${encodeURIComponent("Hi made.,\n\nHere is my page: \n\nWhat I want it to do: \n\nTear it down honestly.\n\nThanks,\n")}`;

export function TeardownPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const done = Object.keys(answers).length === CRITERIA.length;
  const total = useMemo(() => Object.values(answers).reduce((a, b) => a + b, 0), [answers]);
  const max = CRITERIA.length * 2;

  const band =
    total >= 13
      ? { t: "Sharp.", d: "You are in the top few percent. The gap now is the 2% nobody asks for, the craft that makes people remember you. That is the part we obsess over." }
      : total >= 8
        ? { t: "Good bones, leaking conversions.", d: "The foundation is there, but a handful of fixes would move the numbers. Start with the reds below." }
        : { t: "It is costing you customers.", d: "Right now the page is working against you. The good news: every one of these is fixable, fast. Start here." };

  // weakest first: the fixes that matter most
  const fixes = CRITERIA.map((c) => ({ ...c, v: answers[c.key] ?? 0 })).filter((c) => c.v < 2).sort((a, b) => a.v - b.v);

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh] overflow-clip">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
            <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
          </a>
          <span className="label text-[10px] text-grey-dim">free teardown</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 md:px-10">
        {/* hero */}
        <section className="reveal-up pt-32 pb-10 md:pt-40 md:pb-14">
          <span className="label text-red">·teardown</span>
          <h1 className="mt-6 font-display text-[12vw] leading-[0.9] tracking-[-0.03em] sm:text-7xl md:text-8xl">
            Score your landing<br /><span className="italic font-normal text-gold">page in 60 seconds.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-grey-dim leading-relaxed font-display">
            The eight things we check first when we tear a page down. Open your site in another tab, be honest, and tap a verdict for each. At the end: the fixes that will actually move the needle, and an offer to do it properly, free.
          </p>
        </section>

        {/* the audit */}
        <section className="pb-4">
          <ol className="flex flex-col gap-3">
            {CRITERIA.map((c, i) => {
              const picked = answers[c.key];
              return (
                <li key={c.key} className="reveal-up rounded-2xl border border-ink-line p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm text-gold pt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <h2 className="font-display text-xl md:text-2xl leading-snug">{c.q}</h2>
                      <p className="mt-2 text-[14px] text-grey-dim leading-relaxed">Good looks like: {c.good}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {SCORE.map((s) => {
                          const on = picked === s.v;
                          return (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => setAnswers((a) => ({ ...a, [c.key]: s.v }))}
                              aria-pressed={on}
                              className="label text-[10px] rounded-full px-4 py-2.5 border transition-colors active:scale-[0.97]"
                              style={on ? { background: s.tone, borderColor: s.tone, color: s.v === 1 ? "#0b0b0c" : "#fff" } : { borderColor: "var(--color-ink-line)", color: "var(--color-grey-dim)" }}
                            >
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* live progress / result */}
        <section className="reveal-up py-12 md:py-16">
          {!done ? (
            <div className="rounded-2xl border border-ink-line p-8 text-center">
              <div className="label text-grey-dim">{Object.keys(answers).length} of {CRITERIA.length} answered</div>
              <div className="mt-4 h-1.5 w-full max-w-md mx-auto rounded-full bg-ink-soft overflow-hidden">
                <div className="h-full bg-gold transition-[width] duration-500" style={{ width: `${(Object.keys(answers).length / CRITERIA.length) * 100}%` }} />
              </div>
              <p className="mt-4 text-grey-dim text-sm">Answer all eight to see your score and the fixes.</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-ink-line overflow-hidden">
              <div className="p-8 md:p-12 bg-ink-soft/40">
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <div>
                    <span className="label text-gold">your score</span>
                    <div className="mt-2 font-display text-7xl md:text-8xl leading-none tracking-tight">{total}<span className="text-3xl text-grey-dim"> / {max}</span></div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-md text-right ml-auto">{band.t}</h2>
                </div>
                <p className="mt-6 text-grey-dim leading-relaxed max-w-2xl">{band.d}</p>
              </div>

              {fixes.length > 0 && (
                <div className="p-8 md:p-12 border-t border-ink-line">
                  <span className="label text-grey-dim">Start here</span>
                  <ul className="mt-5 flex flex-col gap-5">
                    {fixes.map((f) => (
                      <li key={f.key} className="flex items-start gap-4">
                        <span className="mt-1.5 h-2.5 w-2.5 rounded-full shrink-0" style={{ background: f.v === 0 ? "#c8102e" : "#bd9b4e" }} />
                        <div>
                          <h3 className="font-display text-lg md:text-xl leading-snug">{f.q}</h3>
                          <p className="mt-1.5 text-[14px] text-grey-dim leading-relaxed">{f.fix}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {fixes.length === 0 && (
                <div className="p-8 md:p-12 border-t border-ink-line flex items-center gap-3 text-grey-dim">
                  <Check className="w-5 h-5 text-gold" /> Nothing red. You clearly sweat the details. So do we.
                </div>
              )}

              {/* the offer */}
              <div className="p-8 md:p-12 border-t border-ink-line bg-ink">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">Want us to tear it down for real?</h2>
                <p className="mt-4 text-grey-dim leading-relaxed max-w-xl">A self-score is a start. Send us the link and we will reply with a proper, honest teardown: what is working, the three things we would change first, and why. Free, no pitch attached.</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a href={MAIL} data-cursor="Email" className="inline-flex items-center gap-2 rounded-full bg-red text-white label px-6 py-3.5 hover:bg-red-deep transition-colors active:scale-[0.98]">
                    Send your link <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href="/#say-hi" data-cursor="Hello" className="inline-flex items-center gap-2 rounded-full border border-ink-line label px-6 py-3.5 text-paper/85 hover:text-gold hover:border-gold/50 transition-colors">
                    Or just say hi
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
