import { motion } from "motion/react";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { useStudio } from "../StudioContext";

// Drop the real number here (with country code) to light up the Call + WhatsApp
// buttons. Same number powers both; until it's set, they stay hidden.
const PHONE = "+919390852636";
const HAS_PHONE = /^\+?\d[\d\s-]{7,}$/.test(PHONE) && !PHONE.toUpperCase().includes("X");
const PHONE_TEL = PHONE.replace(/[^\d+]/g, "");
const PHONE_WA = PHONE.replace(/[^\d]/g, "");

// One-click contact — the message is pre-written so reaching out takes zero effort.
const EMAIL = "thebrain@made-by-ac.com";
const MAIL_HREF =
  `mailto:${EMAIL}?subject=${encodeURIComponent("Hi made., a project idea")}` +
  `&body=${encodeURIComponent(
    "Hi made. team,\n\nI came across your work and I'd love to talk about a project.\n\n" +
      "What I'm imagining:\n\n\nA bit about me / us:\n\n\nThanks,\n"
  )}`;
const WA_HREF =
  `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
    "Hi made. by ac — I came across your work and I'd love to talk about a project."
  )}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

// The Invitation — kind, disarming, "nothing to lose." A warm close before the
// footer, with a quiet contact form. Ink canvas, gold + red warmth.
export function Invitation() {
  const {
    contactForm,
    setContactForm,
    handleContactSubmit,
    isSubmittingContact,
    submittedInquiry,
  } = useStudio();

  return (
    <section id="say-hi" data-nav-dark className="relative bg-ink text-paper py-28 md:py-44 overflow-hidden">
      {/* seam: blend down from the paper-dim studio above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper-dim to-ink pointer-events-none" />
      {/* soft red glow — kept well below the seam so it warms the body, not the
          paper-to-ink transition (the glow over the light edge read as muddy brown) */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[55vh] opacity-25"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(200,16,46,0.4), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* the warm message */}
        <div className="lg:col-span-7">
          <span className="label text-red">·008 / say hi</span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-display text-5xl md:text-7xl leading-[0.98] tracking-[-0.02em]"
          >
            Have an idea you're<br />
            not sure is even{" "}
            <span className="italic font-normal text-gold">possible?</span>
          </motion.h2>
          <p className="mt-8 text-lg md:text-xl text-grey-dim leading-relaxed max-w-xl font-display">
            That's our favourite kind. There's genuinely nothing to lose. Tell us what you're
            imagining, and we'll tell you honestly whether we can make it.
            <span className="text-paper"> Most of the time, we can.</span>
          </p>

          {/* one-click contact — pre-written message, zero effort to reach out */}
          <div className="mt-10">
            <span className="label text-grey-dim">One click, the message is already written for you</span>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {HAS_PHONE && (
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message us on WhatsApp (pre-filled)"
                  data-cursor="Chat"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-ink pl-5 pr-6 py-3.5 font-medium hover:-translate-y-0.5 transition-transform"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span className="label text-[10px] !tracking-[0.16em]">WhatsApp us</span>
                </a>
              )}
              <a
                href={MAIL_HREF}
                aria-label="Email us (pre-filled)"
                data-cursor="Email"
                className="group inline-flex items-center gap-2.5 rounded-full bg-red text-white pl-5 pr-6 py-3.5 hover:bg-red-deep hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-[18px] h-[18px]" strokeWidth={1.8} />
                <span className="label text-[10px] !tracking-[0.16em]">Email us</span>
              </a>
              {HAS_PHONE && (
                <a
                  href={`tel:${PHONE_TEL}`}
                  aria-label="Call us"
                  data-cursor="Call"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-ink-line pl-5 pr-6 py-3.5 text-paper/85 hover:text-gold hover:border-gold/60 transition-colors"
                >
                  <Phone className="w-[18px] h-[18px]" strokeWidth={1.7} />
                  <span className="label text-[10px] !tracking-[0.16em]">Call us</span>
                </a>
              )}
            </div>
            <a
              href={MAIL_HREF}
              data-cursor="Email"
              className="group mt-5 inline-flex items-center gap-2 text-grey-dim hover:text-gold transition-colors"
            >
              <span className="font-mono text-[13px]">{EMAIL}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* the quiet form */}
        <div className="lg:col-span-5">
          {submittedInquiry ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-ink-line bg-ink-soft p-8 md:p-10"
            >
              <span className="label text-gold">Received</span>
              <p className="mt-5 font-display text-2xl leading-snug">Thank you, {submittedInquiry.name.split(" ")[0]}.</p>
              <p className="mt-4 text-grey-dim leading-relaxed text-[15px]">{submittedInquiry.aiFeedback}</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              className="rounded-2xl border border-ink-line bg-ink-soft p-7 md:p-9 flex flex-col gap-5"
            >
              <span className="label text-grey-dim">Tell us a little</span>
              <input
                type="text"
                required
                placeholder="Your name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="bg-transparent border-b border-ink-line py-3 text-paper placeholder:text-grey focus:border-gold focus:outline-none transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="bg-transparent border-b border-ink-line py-3 text-paper placeholder:text-grey focus:border-gold focus:outline-none transition-colors"
              />
              <textarea
                required
                rows={3}
                placeholder="What are you imagining?"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="bg-transparent border-b border-ink-line py-3 text-paper placeholder:text-grey focus:border-gold focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={isSubmittingContact}
                data-cursor="Send"
                className="mt-2 self-start bg-red text-white label rounded-full px-7 py-3.5 hover:bg-red-deep hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:translate-y-0"
              >
                {isSubmittingContact ? "Sending…" : "Send it over"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
