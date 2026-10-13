import { useEffect, useMemo, useRef, useState } from "react";
import { Download, ImagePlus, Trash2 } from "lucide-react";
import { AMENITY_WORDS, parseListing, SAMPLE_TEXT, type Listing } from "./parse";
import { renderListingHtml, type Brand } from "./render";
import { trackEvent } from "../track";

// one "started" event per visit, not one per keystroke
let parsedOnce = false;

// Paste a messy WhatsApp listing, add photos, get one clean branded page as a single HTML file.
// Everything runs in the browser: the text and photos are never uploaded anywhere.
const EMPTY: Listing = parseListing("");
const ALL_AMENITIES = AMENITY_WORDS.map(([, l]) => l);
const ACCENTS = ["#2f7d6b", "#c8102e", "#1f4e9c", "#8a6d2f", "#0b0b0c"];

async function shrink(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k);
  c.height = Math.round(bmp.height * k);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.82);
}

const field = "mt-1 w-full rounded-xl border border-ink/20 bg-white px-3 py-2.5 text-[15px] focus:border-ink focus:outline-none";
function F({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="label text-[10px] text-ink/60">{label}</span>
      <input className={field} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function ListingTool({ previewHeight = 720 }: { previewHeight?: number }) {
  const [text, setText] = useState("");
  const [l, setL] = useState<Listing>(EMPTY);
  const [photos, setPhotos] = useState<string[]>([]);
  const [brand, setBrand] = useState<Brand>({ name: "", agent: "", phone: "", accent: ACCENTS[0], showCredit: true });
  const [device, setDevice] = useState<"phone" | "desktop">("phone");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof Listing>(k: K, v: Listing[K]) => setL((p) => ({ ...p, [k]: v }));

  // Re-read the pasted text, then keep whatever the user edits afterwards.
  const read = (value: string) => {
    setText(value);
    const parsed = parseListing(value);
    if (!parsedOnce && value.trim().length > 20) { parsedOnce = true; trackEvent("listing_parsed", { used_example: value === SAMPLE_TEXT }); }
    setL(parsed);
    if (parsed.phone && !brand.phone) setBrand((b) => ({ ...b, phone: parsed.phone }));
  };

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const out: string[] = [];
    for (const f of Array.from(files).slice(0, 12 - photos.length)) {
      try { out.push(await shrink(f)); } catch { /* skip unreadable file */ }
    }
    setPhotos((p) => [...p, ...out]);
    setBusy(false);
  };

  const html = useMemo(() => renderListingHtml(l, brand, photos), [l, brand, photos]);
  const [src, setSrc] = useState(html);
  useEffect(() => { const t = setTimeout(() => setSrc(html), 250); return () => clearTimeout(t); }, [html]);

  const download = () => {
    trackEvent("listing_download", { photos: photos.length, has_brand: Boolean(brand.name) });
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(l.title || "listing").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  return (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* inputs */}
    <div className="lg:col-span-5 min-w-0 space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl">1. Paste the listing</h3>
          <button onClick={() => read(SAMPLE_TEXT)} className="text-sm underline underline-offset-4 decoration-red">Use an example</button>
        </div>
        <textarea
          value={text}
          onChange={(e) => read(e.target.value)}
          rows={7}
          placeholder="Paste the message here: 2BHK, 1050 sqft, Madhurawada, 68 lakh..."
          className={`${field} font-mono text-[13px]`}
        />
      </div>

      <div>
        <h3 className="font-display text-2xl">2. Add photos</h3>
        <p className="mt-1 text-sm text-ink/60">The first one is the cover. Up to 12. Photos are resized on your device.</p>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
        <button onClick={() => fileRef.current?.click()} className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2.5 text-sm font-medium hover:border-ink transition-colors">
          <ImagePlus size={16} aria-hidden /> {busy ? "Adding..." : "Add photos"}
        </button>
        {photos.length > 0 && (
          <ul className="mt-3 grid grid-cols-4 gap-2">
            {photos.map((p, i) => (
              <li key={i} className="relative aspect-square overflow-hidden rounded-lg border border-ink/15">
                <img src={p} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                <button onClick={() => setPhotos((x) => x.filter((_, j) => j !== i))} aria-label={`Remove photo ${i + 1}`} className="absolute right-1 top-1 rounded-full bg-ink/80 p-1 text-paper"><Trash2 size={12} /></button>
                {i === 0 && <span className="absolute bottom-1 left-1 rounded bg-ink/80 px-1.5 text-[10px] text-paper">Cover</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-display text-2xl">3. Check the details</h3>
        <p className="mt-1 text-sm text-ink/60">We read what we could. Fix anything that is wrong.</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="col-span-2"><F label="Title" value={l.title} onChange={(v) => set("title", v)} /></div>
          <F label="Price" value={l.price} onChange={(v) => set("price", v)} placeholder="₹ 68 lakh" />
          <F label="Location" value={l.location} onChange={(v) => set("location", v)} />
          <F label="Area" value={l.area} onChange={(v) => set("area", v)} />
          <F label="Floor" value={l.floor} onChange={(v) => set("floor", v)} />
          <F label="Facing" value={l.facing} onChange={(v) => set("facing", v)} />
          <F label="Possession" value={l.possession} onChange={(v) => set("possession", v)} />
          <F label="Furnishing" value={l.furnishing} onChange={(v) => set("furnishing", v)} />
          <F label="Parking" value={l.parking} onChange={(v) => set("parking", v)} />
          <div className="col-span-2"><F label="RERA number, if you have one" value={l.rera} onChange={(v) => set("rera", v)} /></div>
          <label className="col-span-2 block">
            <span className="label text-[10px] text-ink/60">Description</span>
            <textarea className={field} rows={3} value={l.description} onChange={(e) => set("description", e.target.value)} />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALL_AMENITIES.map((a) => {
            const on = l.amenities.includes(a);
            return (
              <button key={a} onClick={() => set("amenities", on ? l.amenities.filter((x) => x !== a) : [...l.amenities, a])} className={`rounded-full border px-3 py-1 text-[13px] transition-colors ${on ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}>{a}</button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl">4. Put your name on it</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <F label="Your brand or agency" value={brand.name} onChange={(v) => setBrand({ ...brand, name: v })} />
          <F label="Your name" value={brand.agent} onChange={(v) => setBrand({ ...brand, agent: v })} />
          <div className="col-span-2"><F label="WhatsApp number, with country code" value={brand.phone} onChange={(v) => setBrand({ ...brand, phone: v })} placeholder="919876543210" /></div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="label text-[10px] text-ink/60">Colour</span>
          {ACCENTS.map((c) => (
            <button key={c} onClick={() => setBrand({ ...brand, accent: c })} aria-label={`Colour ${c}`} className={`h-7 w-7 rounded-full border-2 ${brand.accent === c ? "border-ink" : "border-transparent"}`} style={{ background: c }} />
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" checked={brand.showCredit} onChange={(e) => setBrand({ ...brand, showCredit: e.target.checked })} />
          Show "Page made with made. by ac" at the bottom
        </label>
      </div>
    </div>

    {/* preview */}
    <div className="lg:col-span-7 min-w-0">
      <div className="lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-full border border-ink/20 p-1" role="tablist" aria-label="Preview size">
            {(["phone", "desktop"] as const).map((d) => (
              <button key={d} role="tab" aria-selected={device === d} onClick={() => setDevice(d)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${device === d ? "bg-ink text-paper" : "text-ink/70"}`}>{d === "phone" ? "Phone" : "Desktop"}</button>
            ))}
          </div>
          <button onClick={download} className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-paper hover:brightness-110 transition">
            <Download size={16} aria-hidden /> Download the page
          </button>
        </div>
        <div className="mt-4 flex justify-center rounded-3xl border border-ink/12 bg-paper-dim p-4">
          <iframe title="Listing preview" srcDoc={src} className="rounded-2xl border border-ink/15 bg-white" style={{ width: device === "phone" ? 390 : "100%", maxWidth: "100%", height: previewHeight }} />
        </div>
        <p className="mt-3 text-[13px] text-ink/60">The download is one HTML file with your photos inside. Send it on WhatsApp or upload it to any host.</p>
      </div>
    </div>
  </div>
  );
}
