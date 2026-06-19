import { ArrowUpRight, Clock, Scale, Sparkles } from "lucide-react";

const GOLD = "#bd9b4e";
// Links out to the live standalone product site (like the made. table / kitchen bands).
const PRODUCT_URL = "https://staff.made-by-ac.com";

// Homepage band for made. staff — chief-of-staff-as-a-service. Sits under the made.
// kitchen band (both ink, no seam) and links out to the standalone site.
export function StaffTease() {
  const steps = [
    { icon: Clock, k: "Off your plate", v: "The day-to-day, the tech and the admin — handled by your team on tap." },
    { icon: Scale, k: "Big-4 calibre", v: "The quality of the big consultants, at a fraction of the cost. No decks — just done." },
    { icon: Sparkles, k: "Kept done", v: "We automate the recurring work so it stays done, for good." },
  ];

  return (
    <section id="staff" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 right-0 w-[60vw] h-[50vh] opacity-20"
        style={{ background: `radial-gradient(50% 50% at 70% 30%, ${GOLD}, transparent 70%)` }}
      />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <span className="label" style={{ color: GOLD }}>·our own / made. staff</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              Your chief<br />of staff<span style={{ color: GOLD }}>.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-display text-xl md:text-2xl text-grey-dim leading-relaxed">
              The team a 1–10 person company can't afford to hire — we run the work you shouldn't be doing,
              then automate it. Your most important asset is time; we give it back.
            </p>
            <a href={PRODUCT_URL} target="_blank" rel="noreferrer" data-cursor="See it" className="group mt-5 inline-flex items-center gap-2 label" style={{ color: GOLD }}>
              Explore made. staff
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
                href={PRODUCT_URL}
                target="_blank"
                rel="noreferrer"
                className="reveal-up group rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-9 min-h-[200px] flex flex-col justify-between hover:border-grey transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-xl border border-ink-line flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6" style={{ color: GOLD }}>
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
