import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Plus,
  PenTool,
  Package,
  Globe,
  Code2,
  PhoneCall,
  Megaphone,
  CalendarCheck,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

type Offering = {
  id: string;
  no: string;
  title: string;
  line: string;
  accent: string;
  icon: typeof PenTool;
  body: string;
  deliverables: string[];
  badge?: string;
  featured?: boolean;
};

// What the studio actually offers — design heritage on the left of the dash,
// software + AI on the right. Honest scope, no invented metrics.
const OFFERINGS: Offering[] = [
  {
    id: "brand",
    no: "01",
    title: "Brand & Identity",
    line: "The name, the mark, the rules.",
    accent: "#bd9b4e",
    icon: PenTool,
    body:
      "We build the whole system, not just a logo. Identity, typography, colour, art direction and the guidelines that keep a brand holding together everywhere it shows up.",
    deliverables: ["Logo & wordmark", "Visual identity", "Typography system", "Art direction", "Brand guidelines"],
  },
  {
    id: "packaging",
    no: "02",
    title: "Packaging & Print",
    line: "Shelves worth winning, products worth gifting.",
    accent: "#c8102e",
    icon: Package,
    body:
      "Structure and surface designed together. Premium finishes, considered materials and print-ready production for products that earn a second look in the hand.",
    deliverables: ["Structural design", "Surface & label", "Premium finishes", "Print production", "Dielines"],
  },
  {
    id: "web",
    no: "03",
    title: "Websites & Experiences",
    line: "Sites that feel made, not assembled.",
    accent: "#2dd4bf",
    icon: Globe,
    body:
      "Editorial, fast and unmistakably yours. We design and build sites, landing pages and PWAs that move the way the brand sounds, then ship them ready to scale.",
    deliverables: ["Web design", "Front-end build", "Landing pages", "PWAs", "Motion & interaction"],
  },
  {
    id: "software",
    no: "04",
    title: "Software Products",
    line: "Real products, actually shipped.",
    accent: "#6d7bf4",
    icon: Code2,
    body:
      "We don't stop at the design file. Web apps, dashboards, ordering platforms and internal tools, built end to end and put in front of real users. The same studio that drew it, ships it.",
    deliverables: ["Web apps", "Dashboards", "QR / ordering platforms", "Internal tools", "Integrations"],
  },
  {
    id: "ai",
    no: "05",
    title: "AI Sales Agents",
    line: "An AI that picks up every call, and never sleeps.",
    accent: "#27d17c",
    icon: PhoneCall,
    badge: "New",
    featured: true,
    body:
      "Your front desk, multiplied. A voice AI answers every call in a natural voice, qualifies the lead, books the appointment straight into your calendar and logs the request, then sends your team a clean summary. Day or night, no missed calls, no hold music.",
    deliverables: [
      "Voice agent (inbound & outbound)",
      "Appointment booking",
      "Lead capture & qualification",
      "Calendar + CRM sync",
      "WhatsApp / SMS follow-up",
      "Call summaries & transcripts",
    ],
  },
  {
    id: "campaigns",
    no: "06",
    title: "Campaigns & Content",
    line: "Built to be seen, and to convert.",
    accent: "#e0903c",
    icon: Megaphone,
    body:
      "Launch moments and always-on content. Social systems, ad creative and campaign art direction that carries the brand into the feed without losing its voice.",
    deliverables: ["Social systems", "Ad creative", "Launch campaigns", "Content direction", "Templates"],
  },
];

// The little "what happens on a call" flow inside the AI offering.
const CALL_FLOW = [
  { icon: PhoneCall, label: "Call comes in", sub: "Any hour" },
  { icon: Sparkles, label: "AI answers & qualifies", sub: "Natural voice" },
  { icon: CalendarCheck, label: "Books the appointment", sub: "Into your calendar" },
  { icon: MessageSquareText, label: "Logs it & summarises", sub: "Straight to your team" },
];

export function OfferPage() {
  const [open, setOpen] = useState<string>("ai");

  return (
    <div className="bg-ink text-paper font-sans antialiased min-h-screen">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="label flex items-center gap-2 text-[10px] text-grey-dim hover:text-paper transition-colors">
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px] text-grey">What we offer</span>
          <a href="#say-hi" className="label text-[10px] rounded-full px-4 py-2 border border-red text-red hover:bg-red hover:text-white transition-colors">
            Start a project
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-36 md:pt-44 pb-10 md:pb-16">
        <span className="label text-red">· what we offer</span>
        <h1 className="mt-6 font-display text-6xl md:text-[8.5rem] leading-[0.88] tracking-[-0.02em]">
          Everything it<br />takes to be<br />
          <span className="italic font-normal text-gold">unignorable</span>
          <span className="text-red">.</span>
        </h1>
        <p className="mt-9 font-display text-xl md:text-2xl leading-snug max-w-2xl text-paper/80">
          Design heritage, software muscle. One studio that takes a brand from a sketch to a shipping
          product, and now, an AI that answers the phone.
        </p>
      </section>

      {/* the interactive offerings index */}
      <section className="border-y border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          {OFFERINGS.map((o) => {
            const isOpen = open === o.id;
            const Icon = o.icon;
            return (
              <div key={o.id} className="border-b border-ink-line last:border-b-0" style={{ ["--a" as string]: o.accent }}>
                {/* row header */}
                <button
                  onClick={() => setOpen(isOpen ? "" : o.id)}
                  className="group w-full flex items-center gap-5 md:gap-8 py-7 md:py-9 text-left"
                >
                  <span className="font-mono text-xs md:text-sm shrink-0 w-8 transition-colors" style={{ color: isOpen ? o.accent : undefined }}>
                    {o.no}
                  </span>
                  <span
                    className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center transition-colors"
                    style={{
                      borderColor: isOpen ? o.accent : "var(--color-ink-line)",
                      color: isOpen ? o.accent : "var(--color-grey)",
                    }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>

                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-3 flex-wrap">
                      <span
                        className="font-display text-3xl md:text-5xl lg:text-6xl leading-none tracking-[-0.01em] transition-colors duration-300"
                        style={{ color: isOpen ? o.accent : undefined }}
                      >
                        {o.title}
                      </span>
                      {o.badge && (
                        <span
                          className="label text-[9px] rounded-full px-2.5 py-1 leading-none"
                          style={{ background: o.accent, color: "#0b0b0c" }}
                        >
                          {o.badge}
                        </span>
                      )}
                    </span>
                    <span className="mt-2 hidden md:block text-grey-dim text-[15px]">{o.line}</span>
                  </span>

                  <span
                    className="shrink-0 w-9 h-9 rounded-full border border-ink-line flex items-center justify-center transition-all duration-500 group-hover:border-grey"
                    style={{ transform: isOpen ? "rotate(135deg)" : "rotate(0deg)", borderColor: isOpen ? o.accent : undefined, color: isOpen ? o.accent : "var(--color-grey)" }}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                {/* expanding panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pb-14 pl-0 md:pl-[5.5rem] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <div className="lg:col-span-6">
                          <p className="font-display text-xl md:text-2xl leading-relaxed text-paper/90 max-w-xl">{o.body}</p>
                          <a
                            href="#say-hi"
                            className="group mt-7 inline-flex items-center gap-2 label text-[11px]"
                            style={{ color: o.accent }}
                          >
                            Talk to us about this
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </div>

                        <div className="lg:col-span-6">
                          <span className="label text-grey-dim">What you get</span>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {o.deliverables.map((d) => (
                              <span
                                key={d}
                                className="text-[13px] rounded-full px-3.5 py-2 border bg-ink-soft/60"
                                style={{ borderColor: "var(--color-ink-line)" }}
                              >
                                {d}
                              </span>
                            ))}
                          </div>

                          {/* featured AI call-flow */}
                          {o.featured && (
                            <div className="mt-8 rounded-2xl border p-5 md:p-6" style={{ borderColor: o.accent + "55", background: o.accent + "0d" }}>
                              <span className="label text-[10px]" style={{ color: o.accent }}>On every call</span>
                              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {CALL_FLOW.map((s, i) => {
                                  const S = s.icon;
                                  return (
                                    <div key={i} className="relative">
                                      <div className="rounded-xl bg-ink p-3.5 h-full">
                                        <div className="flex items-center gap-2">
                                          <span className="relative flex w-2 h-2">
                                            <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: o.accent }} />
                                            <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: o.accent }} />
                                          </span>
                                          <S className="w-4 h-4" style={{ color: o.accent }} strokeWidth={1.7} />
                                        </div>
                                        <div className="mt-3 text-[13px] font-display leading-tight text-paper">{s.label}</div>
                                        <div className="mt-1 label text-[8px] text-grey">{s.sub}</div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* how we engage */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <span className="label text-red">· how we work with you</span>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { k: "Project", v: "A defined scope, a fixed outcome.", d: "A rebrand, a site, a product, an AI agent. We scope it, price it and ship it." },
            { k: "Studio on call", v: "An ongoing creative + build partner.", d: "Monthly retainer for brands that keep moving. Design and code, on tap." },
            { k: "Pilot", v: "Try the AI agent, low commitment.", d: "A short pilot of the sales agent on your real calls before you scale it up." },
          ].map((e) => (
            <div key={e.k} className="rounded-2xl border border-ink-line bg-ink-soft/40 p-7 md:p-8 hover:border-grey transition-colors">
              <span className="label text-gold">{e.k}</span>
              <h3 className="mt-5 font-display text-2xl leading-tight">{e.v}</h3>
              <p className="mt-3 text-grey-dim text-[14px] leading-relaxed">{e.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink-line">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-25" style={{ background: "radial-gradient(50% 50% at 50% 50%, #c8102e, transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="label text-red">Next</span>
          <h2 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">
            Not sure which of these you need? That's our favourite conversation.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="#say-hi" className="group label rounded-full px-7 py-4 flex items-center gap-2 bg-red text-white hover:bg-red-deep hover:-translate-y-0.5 transition-all duration-300">
              Start a project <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#" className="label rounded-full px-7 py-4 border border-ink-line text-paper hover:border-grey transition-colors">Back to made.</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label text-grey">
          <a href="#" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>made. by ac · what we offer</span>
        </div>
      </footer>
    </div>
  );
}
