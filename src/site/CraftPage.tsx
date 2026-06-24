import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

// ── Craft ────────────────────────────────────────────────────────────────────
// A hub for the interactive pieces that show how we think and work, so they live in
// one place instead of crowding the nav. Each is a small, playable proof.

function PageHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/55 border-b border-ink-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors" data-cursor="Home">
          <ArrowLeft className="w-4 h-4" /> made<span className="text-red">.</span>
        </a>
        <span className="label text-[10px] text-grey-dim">craft</span>
      </div>
    </header>
  );
}

type Piece = { href: string; n: string; name: string; line: string; muscle: string; accent: string };
const PIECES: Piece[] = [
  { href: "/live", n: "01", name: "made. live", line: "Type a name and a vibe, watch it become a brand in a blink.", muscle: "the idea", accent: "#c8102e" },
  { href: "/laws", n: "02", name: "The laws we design by", line: "The UX laws we actually build on, each one you can feel for yourself.", muscle: "the principles", accent: "#bd9b4e" },
  { href: "/system", n: "03", name: "The living system", line: "Four colours, three fonts, one grid. Change a token, watch it all follow.", muscle: "the system", accent: "#3aa655" },
  { href: "/motion", n: "04", name: "The motion index", line: "The craft of movement, each move on its own and live, with the why.", muscle: "the feel", accent: "#2f6df0" },
  { href: "/worth", n: "05", name: "What design is worth", line: "Slide your numbers and watch what a better experience returns.", muscle: "the case", accent: "#e8702a" },
];

export function CraftPage() {
  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen overflow-clip">
      <PageHeader />
      <main>
        <section className="reveal-up px-6 md:px-10 pt-32 pb-10 md:pt-40 md:pb-14">
          <div className="mx-auto max-w-[1600px]">
            <span className="label text-red">·craft</span>
            <h1 className="mt-6 font-display text-[12vw] leading-[0.88] tracking-[-0.03em] sm:text-[8rem]">
              Proof,<br /><span className="italic font-normal text-gold">not claims.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-grey-dim leading-relaxed font-display">
              Anyone can say they are good. These are small, playable pieces that show how we think and build, the idea, the principles, the system, the feel, and the case for any of it. Have a play.
            </p>
          </div>
        </section>

        <section className="border-t border-ink-line">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            {PIECES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                data-cursor="Open"
                className="group flex flex-col gap-3 border-b border-ink-line py-9 transition-colors md:flex-row md:items-center md:gap-10 md:py-11"
              >
                <span className="font-mono text-sm" style={{ color: p.accent }}>·{p.n}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
                    <span className="label text-[9px] text-grey-dim">{p.muscle}</span>
                  </div>
                  <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight transition-colors md:text-5xl group-hover:text-gold">{p.name}</h2>
                  <p className="mt-2 max-w-xl text-grey-dim leading-relaxed">{p.line}</p>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-grey-dim transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-paper" />
              </a>
            ))}
          </div>
        </section>

        <section className="reveal-up py-24 md:py-32 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tight">Like how we think?<br /><span className="italic font-normal text-gold">Let's build something.</span></h2>
            <a href="/#say-hi" data-cursor="Hello" className="mt-9 inline-flex items-center gap-2 rounded-full bg-red px-7 py-4 text-paper transition-transform hover:-translate-y-0.5">
              <span className="label text-[11px]">Say hi</span><ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
