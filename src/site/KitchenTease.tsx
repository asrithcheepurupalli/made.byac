import { ArrowUpRight, Megaphone, UserCheck, TrendingUp } from "lucide-react";

const SAFFRON = "#e8702a";
// Links out to the live standalone product site (like the made. table band).
const PRODUCT_URL = "https://kitchen.made-by-ac.com";

// Homepage band for made. kitchen — the studio's growth platform for cloud kitchens.
// Sits under the made. table band (both ink, no seam) and links out to the live site.
export function KitchenTease() {
  const steps = [
    { icon: Megaphone, k: "Acquire", v: "The food-delivery apps bring the first order — they're the channel, not the enemy." },
    { icon: UserCheck, k: "Own", v: "A QR in every package turns that order into a customer you actually keep." },
    { icon: TrendingUp, k: "Grow", v: "CRM, WhatsApp and loyalty turn one delivery into a regular." },
  ];

  return (
    <section id="kitchen" className="relative bg-ink text-paper py-28 md:py-40 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-20"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${SAFFRON}, transparent 70%)` }}
      />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <span className="label" style={{ color: SAFFRON }}>·our own / made. kitchen</span>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
              Growth for<br />cloud kitchens<span style={{ color: SAFFRON }}>.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-display text-xl md:text-2xl text-grey-dim leading-relaxed">
              A platform that helps cloud kitchens own their customers and grow beyond the delivery apps —
              we run it as a service first, then automate.
            </p>
            <a href={PRODUCT_URL} target="_blank" rel="noreferrer" data-cursor="See it" className="group mt-5 inline-flex items-center gap-2 label" style={{ color: SAFFRON }}>
              Explore made. kitchen
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
                  <span className="w-11 h-11 rounded-xl border border-ink-line flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6" style={{ color: SAFFRON }}>
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
