import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, useMotionValueEvent } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

// ---- Ramachandra Ortho Care's own world: bone, emerald, a single coral. ----
// This is the clinic's identity, not ours. The page borrows it the way the Somaa study borrows amber.
const C = {
  bg: "#f5f8f6",
  surface: "#ffffff",
  mint: "#e3f0ec",
  deep: "#0a1f1a",
  deepHi: "#10302a",
  line: "#d8e4df",
  lineDeep: "#1c3a33",
  text: "#0f1d19",
  muted: "#4b625c",
  dim: "#5f766e",
  onDeep: "#eaf4f0",
  onDeepMuted: "#9db8b0",
  emerald: "#0c7a68",
  emeraldHi: "#2bbfa5",
  coral: "#ef6f53",
};

const A = "/case/ortho";

function CountUp({ to, suffix = "", dur = 1500 }: { to: number; suffix?: string; dur?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN((1 - Math.pow(1 - p, 3)) * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, dur]);
  return <span ref={ref}>{Math.round(n)}{suffix}</span>;
}

// CSS scroll-driven fade-up where supported, plain visible elsewhere. Never gets stuck hidden.
const Reveal: FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`reveal-up ${className}`}>{children}</div>
);

const META = [
  { k: "Client", v: "Ramachandra Ortho Care & Clinics" },
  { k: "Location", v: "Chinnamushidiwada, Visakhapatnam" },
  { k: "Year", v: "2026" },
  { k: "Role", v: "Product · Brand · Full-stack build" },
  { k: "Stack", v: "Next.js · Supabase · WhatsApp Cloud API · Razorpay" },
  { k: "Status", v: "Live" },
];

// ---- The life of a booking: four ways an appointment can go, played out step by step. ----
const LIFECYCLE = [
  {
    id: "pays",
    tab: "Pays in time",
    out: "Confirmed, with a token and a WhatsApp message, seconds after the payment lands.",
    steps: [
      { t: "Picks a slot", d: "Only open times are offered." },
      { t: "Slot held for 15 minutes", d: "Nobody else can take it. No token yet." },
      { t: "Pays the consultation fee", d: "Razorpay link, on the site or in WhatsApp." },
      { t: "Confirmed", d: "The payment webhook turns the hold into a real appointment." },
    ],
  },
  {
    id: "lapses",
    tab: "Doesn't pay",
    out: "The slot goes back to the next patient, and the person who lapsed gets a gentle way back in.",
    steps: [
      { t: "Picks a slot", d: "Only open times are offered." },
      { t: "Slot held for 15 minutes", d: "The payment link expires with the hold." },
      { t: "Hold runs out", d: "A scheduled job releases the slot." },
      { t: "WhatsApp nudge", d: "Two buttons: a fresh payment link, or change the booking." },
    ],
  },
  {
    id: "cancels",
    tab: "Cancels after paying",
    out: "The refund is automatic and complete. Nobody at the desk has to remember to send it.",
    steps: [
      { t: "Opens My appointment", d: "Looked up by phone number." },
      { t: "Proves the number", d: "A one-time code arrives on WhatsApp." },
      { t: "Cancels", d: "The slot reopens straight away." },
      { t: "Full refund fires", d: "Razorpay is told to refund, and the desk sees a Refunded badge." },
    ],
  },
  {
    id: "misses",
    tab: "Misses the slot",
    out: "No rebooking, no awkward phone call. The appointment rolls forward on its own.",
    steps: [
      { t: "Confirmed and paid", d: "Token issued, reminder sent the evening before." },
      { t: "The day passes", d: "The patient doesn't make it in." },
      { t: "Rolls to the next working day", d: "An unseen appointment is moved forward automatically." },
      { t: "Keeps its payment", d: "Still confirmed, still paid, with a fresh token for the new day." },
    ],
  },
];

function Lifecycle() {
  const [i, setI] = useState(0);
  const s = LIFECYCLE[i];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: C.deep, border: `1px solid ${C.lineDeep}` }}>
      <div role="tablist" aria-label="Ways a booking can go" className="flex flex-wrap gap-2 p-4 md:p-5" style={{ borderBottom: `1px solid ${C.lineDeep}` }}>
        {LIFECYCLE.map((l, idx) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={i === idx}
            onClick={() => setI(idx)}
            className="label text-[10px] rounded-full px-4 py-2.5 transition-colors active:scale-[0.97]"
            style={{
              background: i === idx ? C.emeraldHi : "transparent",
              color: i === idx ? C.deep : C.onDeepMuted,
              border: `1px solid ${i === idx ? C.emeraldHi : C.lineDeep}`,
            }}
          >
            {l.tab}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-8">
        <AnimatePresence mode="wait">
          <motion.ol
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
            style={{ background: C.lineDeep }}
          >
            {s.steps.map((st, idx) => (
              <li key={st.t} className="p-5 md:p-6" style={{ background: C.deepHi }}>
                <span className="font-mono text-xs" style={{ color: idx === s.steps.length - 1 ? C.coral : C.emeraldHi }}>0{idx + 1}</span>
                <h4 className="mt-3 font-display text-xl leading-snug" style={{ color: C.onDeep }}>{st.t}</h4>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: C.onDeepMuted }}>{st.d}</p>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
        <p className="mt-6 font-display text-xl md:text-2xl leading-snug max-w-3xl" style={{ color: C.onDeep }}>
          <span style={{ color: C.emeraldHi }}>Outcome. </span>{s.out}
        </p>
      </div>
    </div>
  );
}

// The WhatsApp assistant, recreated from the live bot's own wording (English pack).
// It is an illustration of the conversation, not a screenshot of a patient's chat.
function WaScreen() {
  const bubble = "rounded-xl px-3 py-2 text-[11.5px] leading-snug max-w-[86%] shadow-sm";
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#ece5dd" }}>
      <div className="flex items-center gap-2.5 px-3 pt-7 pb-2.5" style={{ background: "#075e54", color: "#fff" }}>
        <img src={`${A}/mark.webp`} alt="" className="w-8 h-8 rounded-full object-contain p-0.5" style={{ background: "#f5f8f6" }} />
        <div className="leading-tight">
          <div className="text-[12px] font-medium">Ramachandra Ortho Care</div>
          <div className="text-[9.5px] opacity-75">Business account</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-3 overflow-hidden">
        <div className={`${bubble} self-start`} style={{ background: "#fff", color: "#111" }}>
          Namaste 🙏 I'm the assistant for Ramachandra Ortho Care. How can I help you today?
        </div>
        <div className={`${bubble} self-end`} style={{ background: "#d9fdd3", color: "#111" }}>Book appointment</div>
        <div className={`${bubble} self-start`} style={{ background: "#fff", color: "#111" }}>
          <b>✅ Slot held for 15 minutes!</b> Tue 6 Oct · 10:15 AM<br />
          Complete the payment now to confirm your appointment. Your token number is generated right after payment.
        </div>
        <div className={`${bubble} self-start`} style={{ background: "#fff", color: "#111" }}>
          To confirm your slot, please complete the consultation fee payment now. Tap <b>Pay now</b> to pay online.
        </div>
        <div className="self-start mt-0.5 rounded-full px-4 py-1.5 text-[11px] font-medium" style={{ background: "#fff", color: "#0a7f6d", border: "1px solid #cfe5df" }}>Pay now</div>
      </div>
    </div>
  );
}

const WALK: { n: string; t: string; d: string; img?: string; node?: ReactNode }[] = [
  { n: "01", t: "Pick a day and a time.", d: "Only real open slots show, read from the same schedule the doctor edits. A few taps and the patient is holding a slot.", img: "book-slot-m" },
  { n: "02", t: "In the patient's own language.", d: "Telugu, English and Hindi, one tap to switch, and the choice follows the patient from page to page. The Telugu is written the way Vizag actually talks, not translated word for word.", img: "book-te-m" },
  { n: "03", t: "Ask RC.", d: "The clinic assistant answers what the front desk gets asked all day: is the doctor in, timings and fees, where to find us. Quick-reply chips mean there's nothing to type.", img: "rc-chat-m" },
  { n: "04", t: "Or just use WhatsApp.", d: "The same assistant lives on the clinic's own WhatsApp number. It books straight into the queue and asks for payment before it ever says confirmed.", node: <WaScreen /> },
  { n: "05", t: "The front desk sees it live.", d: "New bookings, payments and cancellations land in the queue on their own. No refresh, no phone tag, no notebook.", img: "admin-m" },
];

const SYSTEMS = [
  { t: "One availability engine", d: "The schedule the doctor edits is the single source the website, the assistant and WhatsApp all read. Change a holiday once and every surface agrees.", tag: "Source of truth" },
  { t: "WhatsApp, direct", d: "Built on Meta's own Cloud API with no middleman platform. Confirmations, cancellations, reminders, clinic notices and the verification code each have an approved template.", tag: "WhatsApp Cloud API" },
  { t: "Pay to confirm", d: "Razorpay payment links on a 15-minute hold, confirmed by webhook, with an automatic refund when a paid appointment is cancelled.", tag: "Razorpay" },
  { t: "A live front desk", d: "Realtime token queue, walk-ins, calendar, patient list and a broadcast tool for telling the day's patients the doctor is running late.", tag: "Supabase Realtime" },
  { t: "Guardrails in the database", d: "Duplicate holds and double bookings are blocked by unique indexes, not just app code. Public lookups are rate limited. Cancelling needs a code sent to the patient's own WhatsApp.", tag: "Postgres · RLS" },
  { t: "It runs itself", d: "Nine scheduled jobs: reminders the evening before, payment timeouts, review nudges, daily digests for the doctor and desk, and nightly backups.", tag: "Scheduled jobs" },
];

const HARD = [
  { t: "The second booking that was charged the wrong fee.", d: "A phone number with an unpaid hold could book again, and the system treated the second visit as a returning one. The fix is one hold per number, enforced in the database so two taps at the same instant can't slip past it." },
  { t: "Confirmations that never arrived.", d: "WhatsApp only lets a business start a conversation with a pre-approved template. One missing setting meant confirmations quietly never sent. Every send now reports real success or failure, and Meta's delivery verdict is logged." },
  { t: "A verification code Meta wouldn't take.", d: "Our one-time-code wording was rejected as a utility message, because Meta treats codes as authentication. We rebuilt it in the authentication category, and cancelling or paying from the self-service page now needs that code." },
  { t: "A scheduler that ran hours late.", d: "The free scheduled-job runner on our host fired late, which matters when a payment hold is 15 minutes. An external scheduler is now the primary trigger, with the original kept as an idempotent backup." },
];

const STATS = [
  { to: 3, suffix: "", label: "languages, written to be spoken" },
  { to: 9, suffix: "", label: "scheduled jobs keeping it running" },
  { to: 49, suffix: "", label: "automated tests guarding the hard parts" },
  { to: 18, suffix: "", label: "database migrations, each one applied on purpose" },
];

const Browser: FC<{ src: string; alt: string; url: string }> = ({ src, alt, url }) => (
  <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
    <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: C.mint, borderBottom: `1px solid ${C.line}` }}>
      <span className="flex gap-1.5">{[0, 1, 2].map((d) => <i key={d} className="block w-2.5 h-2.5 rounded-full" style={{ background: C.line }} />)}</span>
      <span className="mx-auto label text-[9px]" style={{ color: C.dim }}>{url}</span>
    </div>
    <img src={src} alt={alt} loading="lazy" className="w-full block" />
  </div>
);

export function OrthoCaseStudy() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Walkthrough: the phone shows whichever step is nearest the viewport centre.
  const walkRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress: walkP } = useScroll({ target: walkRef, offset: ["start start", "end end"] });
  useMotionValueEvent(walkP, "change", () => {
    const mid = window.innerHeight / 2;
    let best = active;
    let bestDist = Infinity;
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  });

  return (
    <div style={{ background: C.bg, color: C.text }} className="font-sans antialiased selection:bg-[#0c7a68] selection:text-white">
      {/* back nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(10,31,26,0.94)", borderBottom: `1px solid ${C.lineDeep}`, paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="label flex items-center gap-2 text-[10px]" style={{ color: C.onDeepMuted }}>
            <ArrowLeft className="w-4 h-4" /> made.
          </a>
          <span className="label text-[10px] hidden sm:block" style={{ color: C.onDeepMuted }}>Case study · 04</span>
          <a href="#say-hi" className="label text-[10px] rounded-full px-4 py-2 transition-colors" style={{ border: `1px solid ${C.emeraldHi}`, color: C.emeraldHi }}>
            Start a project
          </a>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end" style={{ background: C.deep }}>
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <img src={`${A}/reception.webp`} alt="The clinic reception" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a1f1a 6%, rgba(10,31,26,0.55) 48%, rgba(10,31,26,0.7) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-16 md:pb-24">
          <span className="label" style={{ color: C.emeraldHi }}>·04 · case study · healthcare</span>
          <h1 className="mt-8 font-display text-5xl md:text-8xl leading-[0.92] tracking-[-0.02em]" style={{ color: C.onDeep }}>
            Ramachandra<br />Ortho <span className="italic font-normal" style={{ color: C.emeraldHi }}>Care</span><span style={{ color: C.coral }}>.</span>
          </h1>
          <p className="mt-8 font-display text-2xl md:text-4xl leading-snug max-w-2xl" style={{ color: C.onDeep }}>
            An orthopaedic clinic in Vizag, and the booking, WhatsApp and payments system we
            designed and built so a visit starts before anyone picks up the phone.
          </p>
          <div className="mt-10 flex items-center gap-3 label" style={{ color: C.onDeepMuted }}>
            <span className="inline-block w-10 h-px" style={{ background: C.emeraldHi }} /> scroll
          </div>
        </motion.div>
      </section>

      {/* marquee */}
      <div className="overflow-hidden py-5 border-y" style={{ borderColor: C.line, background: C.mint }}>
        <div className="whitespace-nowrap font-display text-xl md:text-2xl" style={{ color: C.muted }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-6">
              Bones, joints and mobility, in careful hands <span style={{ color: C.coral }}>·</span> in Telugu, English and Hindi.
            </span>
          ))}
        </div>
      </div>

      {/* OVERVIEW meta */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: C.line, border: `1px solid ${C.line}` }}>
          {META.map((m) => (
            <div key={m.k} className="p-6 md:p-8" style={{ background: C.surface }}>
              <div className="label" style={{ color: C.emerald }}>{m.k}</div>
              <div className="mt-3 text-[15px] md:text-base" style={{ color: C.text }}>{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THE BRIEF */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="label" style={{ color: C.emerald }}>The brief</span>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-[2.9rem] leading-[1.12]">
              One doctor, a full waiting room, and a booking process that lived in{" "}
              <span style={{ color: C.emerald }}>phone calls.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: C.muted }}>
              Booking meant a call or a WhatsApp message that someone had to answer, place in a
              slot and remember. Patients mostly think and message in Telugu. A generic booking
              widget would have worked, and felt like it belonged to somebody else. The clinic
              wanted something that sounded like Vizag, worked on the phones people already use,
              and made sure the slot a patient took was one they'd actually turn up for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE BIGGER IDEA */}
      <section style={{ background: C.deep }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
          <Reveal>
            <span className="label" style={{ color: C.emeraldHi }}>The bigger idea</span>
            <h2 className="mt-6 font-display text-3xl md:text-[3.4rem] leading-[1.06] max-w-4xl" style={{ color: C.onDeep }}>
              An appointment isn't real until it's <span style={{ color: C.emeraldHi }}>paid for.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-lg leading-relaxed max-w-2xl" style={{ color: C.onDeepMuted }}>
              Free booking is easy to make and easy to forget. So a slot is held for fifteen minutes,
              and only becomes an appointment, with a token and a confirmation, once the consultation
              fee lands. Miss the window and the slot goes back to the next patient. Cancel after
              paying and the refund fires on its own. Pick a story below and watch what happens.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <Lifecycle />
          </Reveal>
          <Reveal>
            <p className="mt-14 font-display text-2xl md:text-3xl leading-snug max-w-3xl" style={{ color: C.onDeep }}>
              Nothing says <span style={{ color: C.onDeepMuted }}>“confirmed”</span> until the money
              has moved. That one rule is held in every place a booking can start: the site, the
              chat assistant, and WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STICKY WALKTHROUGH */}
      <section ref={walkRef} className="border-b" style={{ borderColor: C.line, background: C.mint }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-0 lg:h-[100svh] flex items-center justify-center py-16 lg:py-0">
            <div className="relative">
              <div className="relative rounded-[2.2rem] p-2.5 shadow-2xl" style={{ background: "#0b1512", border: `1px solid ${C.lineDeep}` }}>
                <div className="relative w-[256px] md:w-[300px] aspect-[390/844] rounded-[1.7rem] overflow-hidden" style={{ background: C.bg }}>
                  {WALK.map((s, i) => (
                    <div key={s.n} className="absolute inset-0 transition-opacity duration-500 ease-out" style={{ opacity: active === i ? 1 : 0 }} aria-hidden={active !== i}>
                      {s.img ? (
                        <img src={`${A}/${s.img}.webp`} alt={s.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                      ) : (
                        s.node
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
                {WALK.map((s, i) => (
                  <span key={s.n} className="w-1.5 rounded-full transition-all duration-300" style={{ height: active === i ? 22 : 8, background: active === i ? C.emerald : C.line }} />
                ))}
              </div>
              <div className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-50" style={{ background: "radial-gradient(circle, rgba(12,122,104,0.35), transparent 70%)" }} />
            </div>
          </div>

          <div className="flex flex-col gap-14 py-12 lg:gap-[26vh] lg:py-[32vh]">
            {WALK.map((s, i) => (
              <div key={s.n} ref={(el) => { stepRefs.current[i] = el; }} className="walk-step" data-active={active === i}>
                <span className="font-mono text-sm" style={{ color: C.emerald }}>{s.n}</span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight">{s.t}</h3>
                <p className="mt-4 text-lg leading-relaxed max-w-md" style={{ color: C.muted }}>{s.d}</p>
                {s.n === "04" && (
                  <p className="mt-3 text-[12px] leading-relaxed max-w-md" style={{ color: C.dim }}>
                    Conversation recreated from the live assistant's own wording.
                  </p>
                )}
                {s.n === "05" && (
                  <p className="mt-3 text-[12px] leading-relaxed max-w-md" style={{ color: C.dim }}>
                    Shown with demo patients.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO SIDES, desktop */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
        <Reveal>
          <span className="label" style={{ color: C.emerald }}>Two sides, one system</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.98] max-w-3xl">
            What the patient sees, and what the desk runs on.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <Browser src={`${A}/hero-d.webp`} alt="The patient website with live doctor availability" url="ramachandraorthocare.com" />
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: C.muted }}>
              A live “Today at the clinic” card answers the first question every patient has: is the
              doctor in?
            </p>
          </Reveal>
          <Reveal>
            <Browser src={`${A}/admin-d.webp`} alt="The clinic admin dashboard with the live queue" url="admin · demo patients" />
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: C.muted }}>
              The desk's day on one screen: the live queue, walk-ins, collections, and a switch to
              tell the whole system the doctor is in, running late or away.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="border-y" style={{ borderColor: C.line, background: C.surface }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
          <Reveal>
            <span className="label" style={{ color: C.emerald }}>Under the hood</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95]">Six systems, one calm experience.</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEMS.map((s) => (
              <Reveal key={s.t}>
                <div className="h-full rounded-2xl p-7 md:p-8" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                  <span className="label text-[9px]" style={{ color: C.dim }}>{s.tag}</span>
                  <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: C.muted }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE IT GOT REAL */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32">
        <Reveal>
          <span className="label" style={{ color: C.emerald }}>Where it got real</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">
            Four things that broke, and what we learned.
          </h2>
          <p className="mt-7 text-lg leading-relaxed max-w-2xl" style={{ color: C.muted }}>
            A booking system that handles money and messages has to survive real patients on real
            phones. These are the problems that came up in use, and how each one was closed.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {HARD.map((h, i) => (
            <Reveal key={h.t}>
              <div className="h-full rounded-2xl p-7 md:p-9" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                <span className="font-mono text-xs" style={{ color: C.coral }}>0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl md:text-[1.7rem] leading-snug">{h.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: C.muted }}>{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.deep }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: C.emeraldHi }}>By the numbers</span>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-6xl md:text-7xl tracking-tight" style={{ color: C.onDeep }}>
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-sm leading-relaxed max-w-[24ch]" style={{ color: C.onDeepMuted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5">
          <span className="label" style={{ color: C.emerald }}>The craft</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05]">Calm enough for a clinic. Warm enough for Vizag.</h2>
          <p className="mt-7 text-lg leading-relaxed" style={{ color: C.muted }}>
            This is the clinic's identity, not ours. One confident sans, a clinical emerald for care,
            a bone-white ground, and coral only where something needs attention. On a phone, Book and
            WhatsApp stay under the thumb in a sticky bar, because that's where most patients are.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {[C.deep, C.emerald, C.bg, C.coral].map((c) => (
              <div key={c} className="w-12 h-12 rounded-lg" style={{ background: c, border: `1px solid ${C.line}` }} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-start justify-center gap-4 md:gap-6">
              {["hero-m", "hero-te-m", "book-slot-m"].map((s, i) => (
                <div key={s} className="w-[31%] rounded-[1.4rem] p-1.5 shadow-xl" style={{ background: "#0b1512", marginTop: i === 1 ? 28 : 0 }}>
                  <img src={`${A}/${s}.webp`} alt="" loading="lazy" className="w-full rounded-[1.1rem] block" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOME / CTA */}
      <section className="relative overflow-hidden" style={{ background: C.deep }}>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] opacity-30" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(43,191,165,0.5), transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center">
          <span className="label" style={{ color: C.emeraldHi }}>The outcome</span>
          <h2 className="mt-8 font-display text-4xl md:text-7xl leading-[1.0] max-w-4xl mx-auto" style={{ color: C.onDeep }}>
            A patient can book, pay and hold a token before anyone at the desk picks up the phone.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a href="https://ramachandraorthocare.com" target="_blank" rel="noreferrer" className="group label rounded-full px-7 py-4 flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5" style={{ background: C.emeraldHi, color: C.deep }}>
              Visit the clinic site <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#say-hi" className="label rounded-full px-7 py-4 transition-transform duration-300 hover:-translate-y-0.5" style={{ border: `1px solid ${C.lineDeep}`, color: C.onDeep }}>
              Want one like this? →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: C.lineDeep, background: C.deep }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between gap-3 label" style={{ color: C.onDeepMuted }}>
          <a href="#" className="hover:opacity-80 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> back to made.</a>
          <span>Ramachandra Ortho Care · made. by ac · 2026</span>
        </div>
      </footer>
    </div>
  );
}
