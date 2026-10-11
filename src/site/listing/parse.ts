// Turns a pasted WhatsApp style property message into structured fields. Pure heuristics that
// run in the browser: no server, no AI call. The user can edit every field afterwards.
export interface Listing {
  purpose: "sale" | "rent";
  type: string;
  bhk: string;
  title: string;
  location: string;
  price: string;
  area: string;
  floor: string;
  facing: string;
  possession: string;
  furnishing: string;
  parking: string;
  amenities: string[];
  description: string;
  rera: string;
  phone: string;
}

export const AMENITY_WORDS: [RegExp, string][] = [
  [/\blift|elevator\b/i, "Lift"],
  [/power\s*back\s*-?up|generator|dg\b/i, "Power backup"],
  [/\bgym\b/i, "Gym"],
  [/club\s*house/i, "Club house"],
  [/swimming|pool/i, "Swimming pool"],
  [/play\s*area|kids/i, "Play area"],
  [/security|guard/i, "24 hour security"],
  [/cctv/i, "CCTV"],
  [/gated/i, "Gated community"],
  [/\bpark\b|garden/i, "Park"],
  [/vastu/i, "Vastu compliant"],
  [/water/i, "Water supply"],
  [/corner/i, "Corner unit"],
  [/sea\s*view|beach/i, "Near the beach"],
];

const AREAS = ["Madhurawada", "Rushikonda", "MVP Colony", "Siripuram", "Beach Road", "Gajuwaka", "Dwaraka Nagar", "Seethammadhara", "Bheemili", "Anakapalle", "Pendurthi", "Kommadi", "Yendada", "Maharanipeta", "Akkayyapalem", "Gopalapatnam", "NAD", "Marripalem", "Hanumanthawaka", "Kurmannapalem", "Jagadamba", "Visakhapatnam", "Vizag"];

const cap = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

function money(text: string, rent: boolean): string {
  // Needs a currency marker or a lakh/crore unit, and a real digit. \b stops "floors" matching "rs".
  const m = text.match(/(?:₹|\brs\.?|\binr)\s*(\d[\d,]*(?:\.\d+)?)\s*(cr(?:ore)?s?|lakhs?|lacs?|l\b|k\b|thousand)?/i)
    || text.match(/\b(\d[\d,]*(?:\.\d+)?)\s*(cr(?:ore)?s?|lakhs?|lacs?)\b/i);
  if (!m) return "";
  const n = m[1].replace(/,$/, "");
  const u = (m[2] || "").toLowerCase();
  const unit = u.startsWith("cr") ? " crore" : u.startsWith("l") ? " lakh" : u.startsWith("k") || u === "thousand" ? "k" : "";
  const raw = Number(n.replace(/,/g, ""));
  const body = unit ? `${n}${unit}` : Number.isFinite(raw) ? raw.toLocaleString("en-IN") : n;
  return `₹ ${body}${rent ? " / month" : ""}`;
}

export function parseListing(text: string): Listing {
  const t = text.replace(/ /g, " ");
  const lower = t.toLowerCase();
  const purpose: "sale" | "rent" = /\b(for rent|rent|lease|per month|\/\s*month|pm\b)\b/i.test(t) && !/for sale/i.test(t) ? "rent" : "sale";

  const bhkM = t.match(/(\d)\s*-?\s*bhk/i);
  const typeM = lower.match(/\b(apartment|flat|villa|independent house|house|plot|land|office|shop|penthouse|studio)\b/);
  const type = typeM ? cap(typeM[1] === "flat" ? "apartment" : typeM[1]) : "Property";
  const bhk = bhkM ? `${bhkM[1]} BHK` : "";

  const areaM = t.match(/([\d,]+(?:\.\d+)?)\s*(sq\.?\s?ft|sqft|sft|sq\.?\s?yards?|sq\.?\s?yd|sqyd|gaj|sq\.?\s?m)/i);
  const area = areaM ? `${areaM[1]} ${/ft|sft/i.test(areaM[2]) ? "sq ft" : /y/i.test(areaM[2]) || /gaj/i.test(areaM[2]) ? "sq yd" : "sq m"}` : "";

  const floorM = t.match(/(\d+)\s*(?:st|nd|rd|th)?\s*floor/i) || t.match(/floor\s*(?:no\.?)?\s*[:\-]?\s*(\d+)/i);
  const totalM = t.match(/(?:out of|of|\/)\s*(\d+)\s*(?:floors|storeys|storey)/i);
  const floor = floorM ? (totalM ? `${floorM[1]} of ${totalM[1]}` : floorM[1]) : "";

  const faceM = lower.match(/(east|west|north|south)(?:\s|-)?(?:facing|face)/);
  const facing = faceM ? cap(faceM[1]) : "";

  let possession = "";
  if (/ready\s*to\s*(?:move|occupy)|rtm|immediate/i.test(t)) possession = "Ready to move";
  else if (/under\s*construction|ongoing|new launch/i.test(t)) possession = "Under construction";

  let furnishing = "";
  if (/semi\s*-?\s*furnished/i.test(t)) furnishing = "Semi furnished";
  else if (/fully\s*furnished/i.test(t)) furnishing = "Fully furnished";
  else if (/unfurnished/i.test(t)) furnishing = "Unfurnished";

  const parkM = t.match(/(\d)\s*(?:car\s*)?(?:covered\s*)?parking/i);
  const parking = parkM ? `${parkM[1]} covered` : /parking/i.test(t) ? "Available" : "";

  const area0 = AREAS.find((a) => new RegExp(`\\b${a}\\b`, "i").test(t));
  let location = area0 || "";
  if (!location) {
    const m = t.match(/\b(?:at|in|near|@)\s+([A-Z][A-Za-z ]{2,28})/);
    if (m) location = m[1].trim();
  }
  if (location && !/visakhapatnam|vizag/i.test(location) && /visakhapatnam|vizag/i.test(t)) location += ", Visakhapatnam";

  const amenities = AMENITY_WORDS.filter(([re]) => re.test(t)).map(([, l]) => l);
  const reraM = t.match(/rera\s*(?:no\.?|number|reg\.?)?\s*[:\-]?\s*([A-Z0-9/\-]{6,})/i);
  const phoneM = t.match(/(?:\+?91[\s-]?)?([6-9]\d{4}[\s-]?\d{5})/);
  const phone = phoneM ? `91${phoneM[1].replace(/\D/g, "")}` : "";

  const cleaned = t
    .replace(/(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/g, "")
    .replace(/call\s*(?:for|us for)\s*price/gi, "")
    .replace(/[^\S\r\n]+/g, " ")
    .split(/\n+/)
    .map((l) => l.replace(/^[\s•*\-✅✔️👉📍🏠🔥⭐]+/u, "").trim())
    .filter((l) => l.length > 3)
    // price, RERA and contact lines are shown as their own fields, so keep them out of the prose
    .filter((l) => !/^(price|rate|rera|call|contact|whatsapp|wa\b|cost|rent\b)/i.test(l));
  const description = cleaned.join(". ").replace(/\.\s*\./g, ".").slice(0, 420);

  const place = location.split(",")[0];
  const title = [bhk, type !== "Property" ? type.toLowerCase() : "property", purpose === "rent" ? "for rent" : "for sale", place ? `in ${place}` : ""].filter(Boolean).join(" ").replace(/^./, (c) => c.toUpperCase());

  return {
    purpose, type, bhk, title, location, price: money(t, purpose === "rent"), area, floor, facing, possession, furnishing, parking,
    amenities, description, rera: reraM ? reraM[1] : "", phone,
  };
}

export const SAMPLE_TEXT = `🔥 2BHK flat for sale at Madhurawada
3rd floor out of 8 floors, east facing
1050 sqft, semi furnished, ready to move
Lift, power backup, gym, 24 hour security, gated community
1 covered parking
Price Rs 68 lakh, call for price negotiation
RERA P00000000000
Call 98765 43210`;
