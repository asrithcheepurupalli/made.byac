import { useState } from "react";
import { Plus } from "lucide-react";
import { waLink } from "../seo/data";

// Questions a prospect asks before writing in. Answers use only what the studio already says
// elsewhere on the site, so nothing here promises a price, a date or a policy that is not stated.
const TOPICS = [
  {
    t: "Working with us",
    qs: [
      ["What do you actually make?", "Brands and campaigns, websites, software products, and WhatsApp and AI agents. Our clinic and restaurant platforms are the clearest examples: you can see both in the work."],
      ["Who will I work with?", "One team that designs and codes, so what you approve is what goes live. There is no hand-off between a design agency and a separate developer."],
      ["Do you work with clients outside India?", "Yes. We are based in Visakhapatnam, in person here and over video everywhere else."],
      ["What happens first?", "A short conversation about how your day runs and what is not working. We scope from that, and show real screens early."],
    ],
  },
  {
    t: "Cost and timing",
    qs: [
      ["How do you price a project?", "A project has a defined scope and outcome, and we price it once it is scoped. If you want an ongoing partner instead, Studio on call is a monthly retainer. The AI agent starts as a pilot."],
      ["How long will it take?", "It depends on the scope. You get the timeline together with the quote, before any work starts."],
      ["Can I try before I commit?", "Yes. The AI agent starts as a short pilot on your real calls, and we do a free teardown of your current site."],
    ],
  },
  {
    t: "Build and after",
    qs: [
      ["What do you build with?", "Real code on a real stack: React and Next.js, Supabase, WhatsApp's official Business API and Razorpay for payments, checked on real devices."],
      ["Do you stay on after launch?", "Yes. We stay on after go-live, not just until the invoice."],
    ],
  },
] as const;

export function FaqSection({ dark = false }: { dark?: boolean }) {
  const [topic, setTopic] = useState(0);
  const fg = dark ? "text-paper" : "text-ink";
  const muted = dark ? "text-grey-dim" : "text-ink/65";
  const rule = dark ? "border-ink-line" : "border-ink/15";
  return (
    <section id="faq" data-nav-dark={dark ? "" : undefined} className={`${dark ? "bg-ink" : "bg-paper"} ${fg}`} aria-labelledby="faq-h">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-24 md:py-32">
        <span className="label text-red reveal-up">· questions</span>
        <h2 id="faq-h" className="reveal-up mt-6 font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">Questions, <span className="italic font-normal">answered</span><span className="text-red">.</span></h2>
        <div className="reveal-up mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Topics">
          {TOPICS.map((x, i) => (
            <button key={x.t} type="button" role="tab" aria-selected={topic === i} onClick={() => setTopic(i)} className={`label text-[11px] rounded-full px-5 py-2.5 border transition-colors ${topic === i ? "bg-red text-white border-red" : `${rule} ${muted} hover:border-red`}`}>{x.t}</button>
          ))}
        </div>
        <div className={`mt-8 border-t ${rule}`} role="tabpanel">
          {TOPICS[topic].qs.map(([q, a]) => (
            <details key={q} className={`group border-b ${rule} py-5`}>
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-display text-xl md:text-2xl leading-snug">
                <span>{q}</span>
                <Plus className="w-5 h-5 shrink-0 text-red transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className={`mt-3 max-w-2xl leading-relaxed ${muted}`}>{a}</p>
            </details>
          ))}
        </div>
        <p className={`mt-10 text-lg ${muted}`}>
          Still not sure? <a href={waLink("Hi, I have a question about working with made. by ac.")} className={`underline underline-offset-4 decoration-red ${fg}`}>Message us on WhatsApp</a> or write to <a href="mailto:thebrain@made-by-ac.com" className={`underline underline-offset-4 decoration-red ${fg}`}>thebrain@made-by-ac.com</a>.
        </p>
      </div>
    </section>
  );
}
