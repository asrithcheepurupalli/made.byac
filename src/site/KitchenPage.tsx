import {
  ArrowLeft,
  ArrowUpRight,
  Store,
  QrCode,
  Users,
  MessageSquareText,
  Gift,
  CalendarClock,
  Brain,
  Share2,
  Store as Shop,
  Ban,
  Check,
} from "lucide-react";

// made. kitchen — a growth + customer-ownership platform for cloud kitchens.
// The delivery-side sibling to made. table: acquire on the food-delivery apps, RETAIN on a
// direct channel you own. Studio brand (ink/paper/red/gold) with warm saffron +
// coral accents. Service-led — we run it for you first, then automate.
const SAFFRON = "#e8702a";
const CORAL = "#f0533f";

const PROBLEMS = [
  {
    n: "01",
    t: "You don't own your customers",
    d: "An order comes through a food-delivery app, and the platform keeps the customer data, the history, the notifications, the discovery. You just get the order.",
  },
  {
    n: "02",
    t: "Commissions eat the margin",
    d: "After ingredients, packaging, rent, staff and delivery commission, there's almost nothing left. Thin margins get thinner.",
  },
  {
    n: "03",
    t: "Growth is expensive",
    d: "Ads, influencers, platform promotions: most kitchens don't have the budget or the expertise to run them efficiently.",
  },
];

const MVP = [
  { icon: Store, t: "Branded ordering page", d: "Your own storefront (biryanibowl.app, ramenhouse.app) where customers order direct, no commission skim." },
  { icon: QrCode, t: "QR customer capture", d: "A QR card in every package. Scan → land on your page → earn points. Now you own the relationship." },
  { icon: Users, t: "Customer CRM", d: "See your repeat customers, top spenders, who's gone quiet, and which dishes actually pull." },
  { icon: MessageSquareText, t: "WhatsApp marketing", d: "Birthday offers, new-menu drops, festival specials and win-back nudges, all sent automatically." },
  { icon: Gift, t: "Loyalty program", d: "5 orders → free dessert · 10 → ₹200 off · 15 → VIP. Reasons to come back, built in." },
];

const PHASES = [
  { icon: CalendarClock, tag: "Phase 2", t: "Subscriptions", d: "Weekly meals, office lunches, fitness plans: predictable, recurring revenue beyond one-off orders." },
  { icon: Brain, tag: "Phase 2", t: "AI growth assistant", d: "“Repeat rate dropped 12%.” “Biryani buyers also order kebabs.” “Win back 30-day-inactive guests.”" },
  { icon: Share2, tag: "Phase 2", t: "Referral engine", d: "₹100 credit per successful referral, so happy customers become a growth loop." },
  { icon: Shop, tag: "Phase 3", t: "Curated marketplace", d: "A food-lover platform of only cloud kitchens, home chefs and specialty brands. No giants, no generic listings." },
];

export function KitchenPage() {
  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-[100svh]">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors">
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px] text-grey">made. kitchen</span>
          <a href="/#say-hi" className="label text-[10px] rounded-full px-4 py-2 border" style={{ borderColor: SAFFRON, color: SAFFRON }}>
            Run a pilot
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden mx-auto max-w-[1400px] px-6 md:px-10 pt-36 md:pt-44 pb-10 md:pb-16">
        <div className="pointer-events-none absolute -top-24 right-0 w-[60vw] h-[50vh] opacity-20" style={{ background: `radial-gradient(50% 50% at 70% 30%, ${SAFFRON}, transparent 70%)` }} />
        <span className="rise label block" style={{ color: SAFFRON, animationDelay: "0.05s" }}>· made. kitchen</span>
        <h1 className="rise mt-6 font-display text-6xl md:text-[8.5rem] leading-[0.88] tracking-[-0.02em]" style={{ animationDelay: "0.13s" }}>
          Own your<br />customers<span style={{ color: SAFFRON }}>.</span>
        </h1>
        <p className="rise mt-9 font-display text-xl md:text-2xl leading-snug max-w-2xl text-paper/80" style={{ animationDelay: "0.28s" }}>
          A growth and retention platform built only for cloud kitchens. Acquire on the food-delivery apps,
          then keep those customers on a channel you actually own. We run it as a service first, then automate.
        </p>
      </section>

      {/* the problem */}
      <section className="border-y border-ink-line bg-ink-soft/20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <div className="reveal-up max-w-2xl">
            <span className="label" style={{ color: CORAL }}>· the problem</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
              Great food. No<br />customer to call back.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {PROBLEMS.map((p) => (
              <div key={p.n} className="reveal-up rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-8">
                <span className="font-mono text-sm" style={{ color: CORAL }}>{p.n}</span>
                <h3 className="mt-5 font-display text-2xl leading-tight">{p.t}</h3>
                <p className="mt-3 text-grey-dim text-[14px] leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the insight */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
        <div className="reveal-up max-w-4xl">
          <span className="label" style={{ color: SAFFRON }}>· the insight</span>
          <h2 className="mt-6 font-display text-3xl md:text-[3.4rem] leading-[1.06]">
            The food-delivery apps aren't the enemy. They're your{" "}
            <span className="italic font-normal" style={{ color: SAFFRON }}>customer-acquisition channel.</span>
          </h2>
          <p className="mt-8 font-display text-xl md:text-2xl leading-snug max-w-3xl text-paper/80">
            Brands sell on Amazon and still build their own website. Cloud kitchens should do the same:
            acquire through the apps, then <span className="text-paper">retain through a direct channel you own.</span>
            That layer doesn't exist in a focused way today. That's the gap.
          </p>
        </div>
      </section>

      {/* the vision + are / aren't */}
      <section className="border-y border-ink-line bg-ink-soft/20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <div className="reveal-up text-center max-w-4xl mx-auto">
            <span className="label" style={{ color: SAFFRON }}>· the vision</span>
            <p className="mt-7 font-display text-3xl md:text-6xl leading-[1.02] tracking-[-0.01em]">
              <span style={{ color: SAFFRON }}>Shopify</span> + <span style={{ color: CORAL }}>HubSpot</span> + a loyalty engine,
              <br className="hidden md:block" /> built only for cloud kitchens.
            </p>
          </div>

          <div className="reveal-up mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="rounded-2xl border border-ink-line bg-ink p-8">
              <span className="label text-grey-dim">What we're not</span>
              <ul className="mt-5 flex flex-col gap-3">
                {["Another food-delivery app", "A delivery company", "A logistics company", "A race we can't win against giants"].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-grey-dim text-[15px]">
                    <Ban className="w-4 h-4 mt-1 shrink-0 text-grey" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-8" style={{ borderColor: SAFFRON + "55", background: SAFFRON + "0d" }}>
              <span className="label" style={{ color: SAFFRON }}>What we are</span>
              <ul className="mt-5 flex flex-col gap-3">
                {["A growth platform", "A customer-ownership platform", "A retention platform", "A revenue-expansion platform"].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-paper/90 text-[15px]">
                    <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: SAFFRON }} /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* what you get — the MVP */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="reveal-up max-w-2xl">
          <span className="label" style={{ color: SAFFRON }}>· what every kitchen gets</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
            Start simple.<br />Own the relationship.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {MVP.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.t} className="reveal-up group rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-8 hover:border-grey transition-colors">
                <span className="w-11 h-11 rounded-xl border border-ink-line flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6" style={{ color: SAFFRON }}>
                  <Icon className="w-5 h-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display text-2xl leading-tight">{m.t}</h3>
                <p className="mt-3 text-grey-dim text-[14px] leading-relaxed">{m.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* where it grows — phases */}
      <section className="border-y border-ink-line bg-ink-soft/20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <div className="reveal-up max-w-2xl">
            <span className="label" style={{ color: CORAL }}>· where it grows</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
              From retention<br />to recurring.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {PHASES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.t} className="reveal-up rounded-2xl border border-ink-line bg-ink p-7">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl border border-ink-line flex items-center justify-center" style={{ color: SAFFRON }}>
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </span>
                    <span className="label text-[9px] rounded-full px-2.5 py-1" style={{ background: CORAL + "1a", color: CORAL }}>{p.tag}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl leading-tight">{p.t}</h3>
                  <p className="mt-3 text-grey-dim text-[13px] leading-relaxed">{p.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* how we start — service first */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="reveal-up lg:col-span-7">
          <span className="label" style={{ color: SAFFRON }}>· how we start</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
            We run it for you<br />first. <span className="italic font-normal" style={{ color: SAFFRON }}>Then we automate.</span>
          </h2>
          <p className="mt-7 text-grey-dim text-[15px] md:text-lg leading-relaxed max-w-xl">
            The biggest risk in this space is building software nobody uses. So we don't start with an app.
            We start with a service. We set up your direct ordering, run your WhatsApp campaigns and build
            your loyalty program by hand. When it's making you more money, we automate it.
          </p>
        </div>
        <div className="reveal-up lg:col-span-5">
          <div className="rounded-3xl border p-8 md:p-10" style={{ borderColor: SAFFRON + "55", background: SAFFRON + "0d" }}>
            <span className="label" style={{ color: SAFFRON }}>The first pilot</span>
            <p className="mt-5 font-display text-2xl md:text-3xl leading-snug text-paper/90">
              10 cloud kitchens. One city, Vizag. One biryani, one healthy, one dessert, one pizza, one
              midnight-snacks brand. We solve their retention, and let the results do the selling.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink-line">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-25" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${SAFFRON}, transparent 70%)` }} />
        <div className="reveal-up relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="label" style={{ color: SAFFRON }}>Next</span>
          <h2 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">
            Run a cloud kitchen? Let's win your customers back.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="/#say-hi" className="group label rounded-full px-7 py-4 flex items-center gap-2 text-ink hover:-translate-y-0.5 transition-all duration-300" style={{ background: SAFFRON }}>
              Run a pilot with us <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/offer" className="label rounded-full px-7 py-4 border border-ink-line text-paper hover:border-grey transition-colors">Everything we offer</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <a href="/" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>made. by ac · made. kitchen</span>
        </div>
      </footer>
    </div>
  );
}
