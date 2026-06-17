import { useEffect, useState } from "react";

// First-load branded entrance: a paper curtain with the made. wordmark + a red
// rule that sweeps, then the whole panel lifts to reveal the hero. Shows once per
// session; skipped entirely under reduced motion (and for returning visitors, the
// initial state resolves to "done" so there's no flash).
const KEY = "made-intro-seen";

type Stage = "show" | "lift" | "done";

export function Intro() {
  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window === "undefined") return "done";
    try {
      if (sessionStorage.getItem(KEY) === "1") return "done";
    } catch {
      /* ignore */
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return "show";
  });

  // Runs once on mount. (Deliberately not depending on `stage` — otherwise each
  // setStage would re-run cleanup and clear the pending "done" timer, leaving the
  // curtain lifted-but-mounted forever.)
  useEffect(() => {
    if (stage !== "show") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setStage("lift"), 1300);
    const t2 = window.setTimeout(() => {
      setStage("done");
      document.body.style.overflow = "";
    }, 2300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === "done") return null;

  return (
    <div className={`intro${stage === "lift" ? " lift" : ""}`} aria-hidden>
      <span className="intro-word">
        made<span className="dot">.</span>
      </span>
      <span className="intro-rule" />
    </div>
  );
}
