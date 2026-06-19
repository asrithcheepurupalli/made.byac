import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Sparkles, RotateCcw } from "lucide-react";

// "Type your business → watch us design a world for it." The studio's actual magic,
// in action — a teaser of the made. table compose engine. Scripted (keyword →
// archetype), so it always works with no backend. The point: they SEE us make
// something bespoke for THEM in seconds.

type World = {
  key: string;
  match: string[];
  mood: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  palette: string[];
  type: string;
  tagline: string;
  chips: string[];
};

const WORLDS: World[] = [
  {
    key: "midnight",
    match: ["ramen", "izakaya", "sushi", "noodle", "asian", "thai", "korean", "dumpling", "wok", "bao"],
    mood: "Late-night izakaya",
    bg: "#0e0d12", surface: "#171622", text: "#f3eede", muted: "#9b95a8", accent: "#ff5a3c",
    palette: ["#0e0d12", "#ff5a3c", "#f3eede", "#3a3550"],
    type: "Fraunces × Space Mono",
    tagline: "Where the night gets loud.",
    chips: ["order", "ramen bar", "ask the host"],
  },
  {
    key: "daybreak",
    match: ["cafe", "café", "bakery", "coffee", "brunch", "patisserie", "tea", "bread", "croissant"],
    mood: "Sunlit corner café",
    bg: "#f7f1e6", surface: "#fffaf1", text: "#2b2520", muted: "#8a7f70", accent: "#c2632f",
    palette: ["#f7f1e6", "#c2632f", "#5e7d52", "#2b2520"],
    type: "Fraunces × Hanken",
    tagline: "Slow mornings, good crumb.",
    chips: ["menu", "today's bake", "loyalty"],
  },
  {
    key: "bloom",
    match: ["salon", "spa", "beauty", "nails", "hair", "skin", "studio", "wellness", "lash"],
    mood: "Quiet luxe studio",
    bg: "#f7eef0", surface: "#fff7f8", text: "#2a2026", muted: "#9a8893", accent: "#b3457e",
    palette: ["#f7eef0", "#b3457e", "#7a5e8c", "#2a2026"],
    type: "Fraunces × Hanken",
    tagline: "Booked, remembered, glowing.",
    chips: ["book", "members", "rebook nudge"],
  },
  {
    key: "charge",
    match: ["gym", "fitness", "yoga", "crossfit", "pilates", "training", "fit", "strength"],
    mood: "High-energy box",
    bg: "#0c0d0b", surface: "#16170f", text: "#f1f3ea", muted: "#9a9b8c", accent: "#c6ff3a",
    palette: ["#0c0d0b", "#c6ff3a", "#f1f3ea", "#33361f"],
    type: "Fraunces × Space Mono",
    tagline: "Show up. Get charged.",
    chips: ["join", "classes", "streak"],
  },
  {
    key: "editorial",
    match: [],
    mood: "Editorial signature",
    bg: "#f6f3ee", surface: "#fffefb", text: "#0b0b0c", muted: "#7c7770", accent: "#c8102e",
    palette: ["#f6f3ee", "#c8102e", "#bd9b4e", "#0b0b0c"],
    type: "Fraunces × Hanken × Space Mono",
    tagline: "Impossible to ignore.",
    chips: ["explore", "our story", "say hi"],
  },
];

const STAGES = ["reading the vibe…", "choosing a palette…", "setting the type…", "composing the world…"];

function pickWorld(input: string): World {
  const q = input.toLowerCase();
  for (const w of WORLDS) if (w.match.some((m) => q.includes(m))) return w;
  // no keyword: vary the default-ish worlds by input length so it's not always the same
  const fallbacks = WORLDS.filter((w) => w.key === "editorial" || w.key === "daybreak" || w.key === "bloom");
  return fallbacks[input.trim().length % fallbacks.length] || WORLDS[WORLDS.length - 1];
}

function titleCase(s: string) {
  return s.trim().replace(/\s+/g, " ").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Your Place";
}

export function LiveCompose() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "composing" | "done">("idle");
  const [stage, setStage] = useState(0);
  const [world, setWorld] = useState<World>(WORLDS[WORLDS.length - 1]);
  const [name, setName] = useState("Your Place");
  const runRef = useRef(0);

  const run = (text: string) => {
    const value = text.trim() || "Midnight Ramen, Vizag";
    const id = ++runRef.current;
    setName(titleCase(value.split(",")[0]));
    setWorld(pickWorld(value));
    setPhase("composing");
    setStage(0);
    let i = 0;
    const step = () => {
      if (runRef.current !== id) return;
      i += 1;
      if (i < STAGES.length) {
        setStage(i);
        setTimeout(step, 480);
      } else {
        setTimeout(() => runRef.current === id && setPhase("done"), 420);
      }
    };
    setTimeout(step, 480);
  };

  useEffect(() => () => { runRef.current = -1; }, []);

  return (
    <section id="make" data-ambient="dim" className="relative bg-paper-dim text-ink py-28 md:py-40 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-paper-dim pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up max-w-3xl">
          <span className="label text-red">·003 / see it, don't read it</span>
          <h2 className="mt-6 font-display text-5xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
            Watch us make you<br />something<span className="text-red">.</span>
          </h2>
          <p className="mt-6 text-grey text-[15px] md:text-lg leading-relaxed">
            Type your business and a word or two of vibe. We'll compose a bespoke world for it — right here,
            in seconds. (It's a taste of what we build for real.)
          </p>
        </div>

        {/* the composer */}
        <div className="reveal-up mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* input side */}
          <div className="lg:col-span-5">
            <form
              onSubmit={(e) => { e.preventDefault(); run(input); }}
              className="rounded-2xl border border-paper-line bg-paper p-5 md:p-6"
            >
              <label className="label text-grey text-[9px]">your business · a hint of vibe</label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="midnight ramen, vizag"
                className="mt-3 w-full bg-transparent border-b border-paper-line py-3 font-display text-2xl md:text-3xl text-ink placeholder:text-grey/50 focus:border-red focus:outline-none transition-colors"
              />
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={phase === "composing"}
                  data-cursor="Make"
                  className="group inline-flex items-center gap-2 label text-[11px] rounded-full px-6 py-3.5 bg-red text-white hover:bg-red-deep hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
                >
                  {phase === "composing" ? "composing…" : phase === "done" ? <><RotateCcw className="w-4 h-4" /> make another</> : <><Sparkles className="w-4 h-4" /> make it</>}
                </button>
                <span className="label text-[9px] text-grey">try: salon · café · gym</span>
              </div>
            </form>
            <p className="mt-4 text-[12px] leading-relaxed text-grey max-w-sm">
              No two come out alike — the look is composed from the story, never picked from a template. The
              real thing ships as a live site.
            </p>
          </div>

          {/* preview side */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-paper-line overflow-hidden min-h-[420px]">
              {/* idle */}
              {phase === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-paper">
                  <Sparkles className="w-7 h-7 text-grey" strokeWidth={1.4} />
                  <p className="mt-5 font-display text-2xl md:text-3xl text-ink/80 max-w-md leading-snug">
                    Your world appears here. Type a business and hit <span className="text-red">make it</span>.
                  </p>
                </div>
              )}

              {/* composing */}
              {phase === "composing" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink text-paper">
                  <span className="relative flex w-3 h-3">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping bg-gold" />
                    <span className="relative inline-flex rounded-full w-3 h-3 bg-gold" />
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={stage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-2xl md:text-3xl"
                    >
                      {STAGES[stage]}
                    </motion.span>
                  </AnimatePresence>
                  <div className="flex gap-1.5">
                    {STAGES.map((_, i) => (
                      <span key={i} className="h-1 w-8 rounded-full transition-colors duration-300" style={{ background: i <= stage ? "var(--color-gold)" : "var(--color-ink-line)" }} />
                    ))}
                  </div>
                </div>
              )}

              {/* done — the composed world */}
              <AnimatePresence>
                {phase === "done" && (
                  <motion.div
                    key={world.key + name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative p-7 md:p-10 min-h-[420px] flex flex-col justify-between"
                    style={{ background: world.bg, color: world.text }}
                  >
                    <div>
                      <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="label text-[10px]" style={{ color: world.accent }}>
                        {world.mood} · composed live
                      </motion.span>
                      <motion.h3 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-4 font-display text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">
                        {name}<span style={{ color: world.accent }}>.</span>
                      </motion.h3>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="mt-4 font-display text-xl md:text-2xl italic" style={{ color: world.muted }}>
                        {world.tagline}
                      </motion.p>
                    </div>

                    <div className="mt-8">
                      {/* palette */}
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3">
                        {world.palette.map((c, i) => (
                          <motion.span
                            key={c + i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.32 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            className="h-10 w-10 rounded-lg origin-bottom"
                            style={{ background: c, border: `1px solid ${world.muted}33` }}
                          />
                        ))}
                        <span className="ml-2 label text-[9px]" style={{ color: world.muted }}>{world.type}</span>
                      </motion.div>
                      {/* mock chips */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 flex flex-wrap gap-2">
                        {world.chips.map((c) => (
                          <span key={c} className="label text-[9px] rounded-full px-3.5 py-2" style={{ background: world.accent, color: world.bg }}>{c}</span>
                        ))}
                        <span className="label text-[9px] rounded-full px-3.5 py-2 border" style={{ borderColor: world.muted + "55", color: world.muted }}>built by made.</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA under the preview, only once they've made one */}
            {phase === "done" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-5 flex flex-wrap items-center gap-4">
                <a href="#say-hi" data-cursor="Build it" className="group inline-flex items-center gap-2 label text-[11px] rounded-full px-6 py-3.5 bg-ink text-paper hover:-translate-y-0.5 transition-transform duration-300">
                  Build this for real <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="https://table.made-by-ac.com" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 label text-[10px] text-grey hover:text-ink transition-colors">
                  this engine is made. table <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
