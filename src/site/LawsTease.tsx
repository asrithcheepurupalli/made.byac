import { ArrowUpRight } from "lucide-react";

// Homepage teaser for the /laws page. A small taste of Von Restorff (the one red),
// then a line and a link into the full interactive page.
export function LawsTease() {
  return (
    <section className="reveal-up bg-ink text-paper border-t border-ink-line py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="label text-red">·the fine print</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.98] tracking-tight">
            We design by laws,<br /><span className="italic font-normal text-gold">not just vibes.</span>
          </h2>
          <p className="mt-6 max-w-xl text-grey-dim leading-relaxed text-lg">
            Decades of research into how people see, decide and remember. We build on it. Seven laws you can feel for yourself, each with a note on where it lives on this very site.
          </p>
          <a href="/laws" data-cursor="Open" className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-4 text-paper transition-colors hover:border-gold">
            <span className="label text-[11px]">See the laws we design by</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        {/* a quiet taste of Von Restorff: your eye finds the one red */}
        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-2.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-10 rounded-full" style={{ width: i === 5 ? 96 : 70, background: i === 5 ? "var(--color-red)" : "var(--color-ink-line)" }} />
            ))}
          </div>
          <p className="mt-4 label text-[9px] text-grey-dim">your eye went straight to the red one. that is a law.</p>
        </div>
      </div>
    </section>
  );
}
