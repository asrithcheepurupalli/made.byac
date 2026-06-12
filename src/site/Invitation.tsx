import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useStudio } from "../StudioContext";

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
    <section id="say-hi" className="relative bg-ink text-paper py-28 md:py-44 overflow-hidden">
      {/* seam: blend down from the paper-dim studio above */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper-dim to-ink pointer-events-none" />
      {/* soft red glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] opacity-30"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(200,16,46,0.45), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* the warm message */}
        <div className="lg:col-span-7">
          <span className="label text-red">·005 / say hi</span>
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

          <a
            href="mailto:thebrain@made-by-ac.com"
            className="group mt-10 inline-flex items-center gap-3 font-display text-2xl md:text-3xl text-paper border-b border-gold/50 pb-1 hover:text-gold transition-colors"
          >
            thebrain@made-by-ac.com <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
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
