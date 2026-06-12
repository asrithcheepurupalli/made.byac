import { Sun } from "lucide-react";
import { useAmbient, TEMPS } from "./useAmbient";

// Floating ambient-light control — the alternative placement to the Studio toggle.
// Both share the same state, so whichever you keep, they stay in sync.
export function AmbientPill() {
  const [temp, setTemp] = useAmbient();
  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 pl-3.5 pr-2.5 py-2 rounded-full border border-black/10 bg-paper/85 backdrop-blur-md shadow-xl">
      <Sun className="w-3.5 h-3.5 text-grey" strokeWidth={1.75} />
      <div className="flex items-center gap-2">
        {TEMPS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemp(t.id)}
            title={t.label}
            aria-label={t.label}
            aria-pressed={temp === t.id}
            className="w-4 h-4 rounded-full transition-transform duration-200 hover:scale-110"
            style={{ background: t.dot, outline: temp === t.id ? "2px solid #0b0b0c" : "none", outlineOffset: "2px" }}
          />
        ))}
      </div>
    </div>
  );
}
