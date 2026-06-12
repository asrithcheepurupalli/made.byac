// Design-led campaign case studies. Qualitative only — no invented metrics.
// The work gallery is pulled live from PROJECTS by `client`.
export interface CampaignCase {
  slug: string;
  index: string;
  client: string; // must match PROJECTS[].client
  sector: string;
  year: string;
  role: string;
  deliverables: string[];
  tagline: string;
  accent: string; // signature colour for this client's page
  hero: string; // framed hero image
  brief: string[];
  approach: string[];
}

export const CAMPAIGN_CASES: Record<string, CampaignCase> = {
  innovolt: {
    slug: "innovolt",
    index: "·02",
    client: "Innovolt",
    sector: "Commercial EV · Marketplace",
    year: "2025–26",
    role: "Campaign design · Regional creative · Art direction",
    deliverables: ["Lead-gen campaigns", "Regional-language creative", "Performance spec sheets", "City-expansion sets"],
    tagline: "Making a used electric truck feel like a safe bet.",
    accent: "#27d17c",
    hero: "/images/Inv'08.png",
    brief: [
      "Innovolt sells certified pre-owned commercial electric vehicles. The hard part was never the product — it was trust. Fleet buyers hesitate over second-hand batteries, warranty cover, financing and resale value.",
      "The campaigns had to make a used commercial EV feel as safe and aspirational as a new one — and do it convincingly across very different regional audiences, from Telugu-first Hyderabad to Bengaluru's tech-corridor fleets.",
    ],
    approach: [
      "A benefit-led visual system: warranties, inspections, financing and roadside support pushed to the front on a strict industrial grid, so the reassurance is the first thing you read.",
      "Regional adaptation done properly — custom Telugu typography for Hyderabad, an English set for broader urban reach, and city-specific landmarks and fleet contexts for each market. High-contrast, monochrome-leaning frames let the vehicle and the numbers do the talking.",
    ],
  },
  "mithai-maharaja": {
    slug: "mithai-maharaja",
    index: "·03",
    client: "Mithai Maharaja",
    sector: "FMCG · Luxury Packaging",
    year: "2025–26",
    role: "Packaging design · Illustration · Art direction",
    deliverables: ["Packaging systems", "Festive gifting collections", "Social launch creative", "Brand illustration"],
    tagline: "Dressing regional sweets like the heirloom gift they are.",
    accent: "#c8a24b",
    hero: "/images/thumb_1778155199_93669484-0552-4a3e-971e-ed4287cc1b19.jpg",
    brief: [
      "Traditional Indian sweets are sold in generic boxes that don't match what they mean to people. Mithai Maharaja wanted its mithai to feel like the heirloom gift it actually is — regal, regional, worth giving — without losing the warmth of a neighbourhood sweet shop.",
    ],
    approach: [
      "A packaging system that treats each sweet as a specimen worth dressing: royal colour fields, hot-stamped gold marks, and region-rooted pattern work — Karnataka cartography, festive ochres, classic editorial layouts.",
      "Rigid, food-safe structures with sliding drawers and debossed detail, plus a festive sub-system for Raksha Bandhan and seasonal gifting that stays on-brand while feeling specific to the occasion.",
    ],
  },
};
