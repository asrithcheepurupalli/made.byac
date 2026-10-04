import { useEffect, useState } from "react";

// Tiny self-contained clocks. Each keeps its own state, so a tick re-renders one <span>
// instead of every component that reads the studio context (the old setup rebuilt the
// whole app's context value once a second).

function useNow(ms: number) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), ms);
    return () => window.clearInterval(t);
  }, [ms]);
  return now;
}

export function UtcClock() {
  const now = useNow(1000);
  return <>{now ? `${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })} UTC` : "··"}</>;
}

export function VizagClock() {
  const now = useNow(15000);
  if (!now) return <>··</>;
  try {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
    const h = p.find((x) => x.type === "hour")?.value ?? "";
    const m = p.find((x) => x.type === "minute")?.value ?? "";
    return <>{`${h} ${m} IST`}</>;
  } catch {
    return <>{`${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })} IST`}</>;
  }
}
