import { useEffect, useState } from "react";

export type Temp = "amber" | "paper" | "slate";
const KEY = "made-temp";
const EVT = "made-temp-change";

export const TEMPS: { id: Temp; label: string; dot: string }[] = [
  { id: "amber", label: "Amber · 2700K", dot: "#d99547" },
  { id: "paper", label: "Paper · 4000K", dot: "#cabfa6" },
  { id: "slate", label: "Slate · 6000K", dot: "#90a8c6" },
];

export function getTemp(): Temp {
  if (typeof document === "undefined") return "paper";
  const v = document.documentElement.getAttribute("data-temp");
  return v === "amber" || v === "slate" || v === "paper" ? v : "paper";
}

// Shared across both controls (Studio toggle + floating pill) — they stay in sync.
export function useAmbient(): [Temp, (t: Temp) => void] {
  const [temp, setTemp] = useState<Temp>(getTemp);
  useEffect(() => {
    const on = () => setTemp(getTemp());
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);
  const set = (t: Temp) => {
    document.documentElement.setAttribute("data-temp", t);
    try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
    window.dispatchEvent(new Event(EVT));
  };
  return [temp, set];
}
