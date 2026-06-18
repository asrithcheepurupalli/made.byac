import { ArrowUpRight, Eye, Gavel, Send } from "lucide-react";

const ACCENT = "#27d17c";

// Homepage tease for the AI Automations page. Ink band that previews the
// flagship agent — watch · score · close — and sends people to /ai.
export function AiTease() {
  const steps = [
    { icon: Eye, k: "Watches", v: "every scroll, hover and pause becomes a signal." },
    { icon: Gavel, k: "Scores", v: "a judge rates the buying intent in real time." },
    { icon: Send, k: "Closes", v: "a personal WhatsApp nudge when intent is hot." },
  ];

  return (
    <section id="ai" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      {/* sits directly under the ink gallery (#work) — no seam needed */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-20"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${ACCENT}, transparent 70%)` }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <span className="label" style={{ color: ACCENT }}>·new / ai automations</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              Agents that<br />work the room<span style={{ color: ACCENT }}>.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-display text-xl md:text-2xl text-grey-dim leading-relaxed">
              The studio that designs the brand now builds the AI behind it — watching, deciding and closing the sale on its own.
            </p>
            <a href="/ai" data-cursor="See it" className="group mt-5 inline-flex items-center gap-2 label" style={{ color: ACCENT }}>
              See it work
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={s.k}
                href="/ai"
                className="reveal-up group rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-9 min-h-[200px] flex flex-col justify-between hover:border-grey transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-xl border border-ink-line flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6" style={{ color: ACCENT }}>
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-sm text-grey">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{s.k}</h3>
                  <p className="mt-2 text-grey-dim text-[14px] leading-relaxed">{s.v}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
