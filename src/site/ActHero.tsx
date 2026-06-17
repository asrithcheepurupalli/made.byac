import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useStudio } from "../StudioContext";

// ACT I — Editorial Brutalist hero. Type is the design: oversized Fraunces on a
// faint grid, one decisive red rule, a gold seal. Paper canvas.
export function ActHero() {
  const { currentTime } = useStudio();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Grid drifts down + the whole hero eases up a touch as you scroll past it.
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.35]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen w-full bg-paper text-ink overflow-hidden flex flex-col justify-between"
    >
      {/* faint architect grid (parallax) */}
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-paper-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper-line) 1px, transparent 1px)",
            backgroundSize: "clamp(48px, 7vw, 92px) clamp(48px, 7vw, 92px)",
            maskImage: "radial-gradient(120% 100% at 50% 40%, #000 55%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* top meta row */}
      <div className="relative z-10 pt-28 md:pt-32 px-6 md:px-10 mx-auto max-w-[1600px] w-full flex items-start justify-between label text-grey">
        <span>made.™ · design &amp; development studio</span>
        <span className="hidden sm:inline">{currentTime || "··"}</span>
      </div>

      {/* headline */}
      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 px-6 md:px-10 mx-auto max-w-[1600px] w-full">
        <div>
          <span className="rise label text-red block max-sm:tracking-[0.14em]" style={{ animationDelay: "0.05s" }}>·001 / a design practice from india, for the world</span>
          <h1 className="rise mt-6 font-display font-semibold uppercase leading-[0.9] sm:leading-[0.86] tracking-[-0.02em] text-[12.5vw] sm:text-[13vw] lg:text-[10.5rem]" style={{ animationDelay: "0.15s" }}>
            We make
            <br />
            brands{" "}
            <span className="group/imp relative inline-block italic lowercase font-normal align-baseline cursor-default">
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.08em] top-[0.16em] bottom-[0.12em] bg-red rounded-[3px] origin-left scale-x-0 group-hover/imp:scale-x-100 transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <span className="relative z-10 text-grey group-hover/imp:text-paper transition-colors duration-300 delay-[120ms]">impossible</span>
            </span>
            <br />
            to ignore<span className="text-red">.</span>
          </h1>
          <div className="draw-x mt-8 h-[5px] w-40 md:w-56 bg-red rounded-full" style={{ animationDelay: "0.32s" }} />
        </div>
      </motion.div>

      {/* bottom row: manifesto line + scroll cue + gold seal */}
      <div className="relative z-10 pb-12 md:pb-16 px-6 md:px-10 mx-auto max-w-[1600px] w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
        <p className="rise font-display text-xl md:text-2xl leading-relaxed max-w-xl text-ink/80" style={{ animationDelay: "0.45s" }}>
          We are <em className="text-red-deep">made.</em> A studio crafting brand systems,
          packaging, and digital experiences that people remember.
        </p>

        <div className="rise flex items-end gap-8" style={{ animationDelay: "0.55s" }}>
          <a href="#why" className="group label text-ink/70 hover:text-ink transition-colors flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink/50 transition-all duration-500 group-hover:w-16 group-hover:bg-ink" />
            scroll
          </a>
          <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold text-gold flex items-center justify-center text-center label text-[8px] leading-[1.6] transition-transform duration-[1.2s] ease-out hover:rotate-[24deg]">
            made.<br />est.<br />2026
          </div>
        </div>
      </div>
    </section>
  );
}
