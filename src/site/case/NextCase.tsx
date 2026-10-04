import { ArrowUpRight } from "lucide-react";
import { CAMPAIGN_CASES } from "./caseData";

// "Next case study": keeps a visitor moving through the client work instead of ending at a
// dead footer. The card holds an image, so in-app navigation morphs it into the next hero.
// The rotation is client work only: Ortho, Aavira (our flagship study), Innovolt, Mithai Maharaja, then back to Ortho.
const ROTATION = [
  { slug: "ramachandra-ortho", name: "Ramachandra Ortho Care", tag: "Clinic booking and WhatsApp", line: "A clinic where the visit starts before the call.", img: "/case/ortho/reception.webp" },
  { slug: "aavira", name: "Aavira", tag: "Flagship study · restaurant platform", line: "A guest platform that makes every waiter three times more effective.", img: "/case/aavira/hero.webp" },
  { slug: "innovolt", name: CAMPAIGN_CASES["innovolt"].client, tag: CAMPAIGN_CASES["innovolt"].sector, line: CAMPAIGN_CASES["innovolt"].tagline, img: CAMPAIGN_CASES["innovolt"].hero },
  { slug: "mithai-maharaja", name: CAMPAIGN_CASES["mithai-maharaja"].client, tag: CAMPAIGN_CASES["mithai-maharaja"].sector, line: CAMPAIGN_CASES["mithai-maharaja"].tagline, img: CAMPAIGN_CASES["mithai-maharaja"].hero },
];

export function NextCase({
  current,
  bg,
  text,
  muted,
  line,
  accent,
}: {
  current: string;
  bg: string;
  text: string;
  muted: string;
  line: string;
  accent: string;
}) {
  const i = ROTATION.findIndex((r) => r.slug === current);
  const next = ROTATION[(i + 1) % ROTATION.length]; // not in the rotation (i = -1) starts at the first
  return (
    <section style={{ background: bg, borderTop: `1px solid ${line}` }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
        <span className="label" style={{ color: accent }}>Next case study</span>
        <a
          href={`/work/${next.slug}`}
          data-cursor="Next"
          className="group mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          <div className="lg:col-span-7 overflow-hidden rounded-2xl" style={{ border: `1px solid ${line}` }}>
            <img
              src={next.img}
              alt={next.name}
              loading="lazy"
              className="w-full aspect-[16/9] object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </div>
          <div className="lg:col-span-5">
            <span className="label text-[10px]" style={{ color: muted }}>{next.tag}</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.98]" style={{ color: text }}>{next.name}</h2>
            <p className="mt-4 text-lg leading-snug max-w-md" style={{ color: muted }}>{next.line}</p>
            <span className="mt-8 inline-flex items-center gap-2 label text-[11px] pb-1 border-b transition-colors" style={{ color: text, borderColor: accent }}>
              Read the study <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
