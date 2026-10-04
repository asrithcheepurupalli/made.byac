import { Suspense, useEffect, useRef, useState, type ComponentType } from "react";

// Below-the-fold homepage sections load as separate chunks: they mount when the visitor
// nears them, or in the browser's idle time shortly after first paint (staggered), so the
// first screen only pays for the hero. The placeholder carries the section's id and nav tone
// so anchor links and the nav colour work before the real section arrives.
export function Defer({
  Component,
  id,
  dark,
  bg,
  minHeight,
  delay = 2000,
}: {
  Component: ComponentType;
  id?: string;
  dark?: boolean;
  bg: string;
  minHeight: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (on) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { rootMargin: "1100px 0px" }
    );
    io.observe(el);
    // warm up in idle time so later scrolling never waits on a chunk
    const w = window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (n: number) => void };
    let idleId = 0;
    const t = window.setTimeout(() => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setOn(true), { timeout: 3000 });
      else setOn(true);
    }, delay);
    return () => { io.disconnect(); window.clearTimeout(t); if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId); };
  }, [on, delay]);

  const ph = (
    <div ref={ref} id={id} {...(dark ? { "data-nav-dark": "" } : {})} className={bg} style={{ minHeight }} aria-hidden />
  );
  return on ? <Suspense fallback={ph}><Component /></Suspense> : ph;
}
