// Poster gallery + sensory data — extracted from App.tsx (no behavior change)

export const SENSORY_COLORS = [
  {
    name: "Imperial Crest Gold",
    hex: "#D4AF37",
    rgb: "212, 175, 55",
    description: "Traditional hot-deboss foil standard",
    cmyk: "C18, M30, Y88, K0"
  },
  {
    name: "Maharaja Burgundy",
    hex: "#6B1D2F",
    rgb: "107, 29, 47",
    description: "Deep confectionery archival tint",
    cmyk: "C30, M95, Y75, K45"
  },
  {
    name: "Sacred Basil Emerald",
    hex: "#0A5C36",
    rgb: "10, 92, 54",
    description: "Organic hand-pressed vector tone",
    cmyk: "C85, M30, Y90, K20"
  },
  {
    name: "Nizami Indigo Blue",
    hex: "#1D3557",
    rgb: "29, 53, 87",
    description: "Celestial midnight spot ink",
    cmyk: "C90, M75, Y40, K25"
  },
  {
    name: "Marigold Warm Amber",
    hex: "#E65C17",
    rgb: "230, 92, 23",
    description: "Festive twilight marketing ink",
    cmyk: "C0, M75, Y100, K5"
  }
];

export const INITIAL_POSTERS = [
  {
    id: "regal-mysore-pak",
    title: "Regal Mysore Pak",
    client: "Mithai Maharaja",
    category: "Classic Indian Collection",
    imageUrl: "/images/thumb_1778155198_f88efc2a-69f8-4b24-b07b-26e8a339b684.jpg",
    rotate: -4,
    rotateY: 10,
    rotateX: -3,
    left: 8,
    top: 15,
    aspect: "aspect-[3/4]"
  },
  {
    id: "luxurious-motichoor-ladoo",
    title: "Luxurious Motichoor Ladoo",
    client: "Mithai Maharaja",
    category: "Classic Indian Collection",
    imageUrl: "/images/thumb_1778155199_66623271-b901-493b-b77e-f1548ccec2db.jpg",
    rotate: 8,
    rotateY: 18,
    rotateX: -10,
    left: 28,
    top: 18,
    aspect: "aspect-[3/4]"
  },
  {
    id: "heritage-karnataka-combo",
    title: "Heritage Karnataka Combo",
    client: "Mithai Maharaja",
    category: "Regional Heritage Series",
    imageUrl: "/images/thumb_1778155198_f1263c86-cf94-41dc-bb29-da83c011d7b6.jpg",
    rotate: -5,
    rotateY: 24,
    rotateX: -4,
    left: 12,
    top: 52,
    aspect: "aspect-[4/5]"
  },
  {
    id: "royal-kaju-katli",
    title: "Royal Kaju Katli",
    client: "Mithai Maharaja",
    category: "Royal Celebration Collection",
    imageUrl: "/images/thumb_1778155199_93669484-0552-4a3e-971e-ed4287cc1b19.jpg",
    rotate: 6,
    rotateY: 15,
    rotateX: 14,
    left: 31,
    top: 56,
    aspect: "aspect-[4/5]"
  },
  {
    id: "classic-indian-combo",
    title: "Classic Indian Combo",
    client: "Mithai Maharaja",
    category: "Festive Gifting Collection",
    imageUrl: "/images/thumb_1778155198_d6485acc-4e88-48aa-a22b-8d5a9f185de4.jpg",
    rotate: -10,
    rotateY: -18,
    rotateX: 8,
    left: 14,
    top: 82,
    aspect: "aspect-[3/4]"
  },
  {
    id: "raksha-bandhan-special",
    title: "Raksha Bandhan Special",
    client: "Mithai Maharaja",
    category: "Festive Moments Series",
    imageUrl: "/images/thumb_1778155198_5a1176cd-03b6-4b67-b3e6-6b72e3eee9b9.jpg",
    rotate: 12,
    rotateY: -28,
    rotateX: -12,
    left: 32,
    top: 84,
    aspect: "aspect-[3/4]"
  },
  {
    id: "your-vehicle-your-price",
    title: "Your Vehicle, Your Price",
    client: "Innovolt",
    category: "Commercial EV Marketplace Campaigns",
    imageUrl: "/images/thumb_1778155197_df465d6a-3526-4832-ac34-b4b106136167.jpg",
    rotate: -2,
    rotateY: 8,
    rotateX: -4,
    left: 45,
    top: 45,
    aspect: "aspect-[3/4]"
  },
  {
    id: "drive-your-own-vehicle",
    title: "Drive Your Own Vehicle",
    client: "Innovolt",
    category: "Commercial EV Marketplace Campaigns",
    imageUrl: "/images/thumb_1778155197_5282b9e6-8891-4dc4-a7a9-3de5a83c9cb4.jpg",
    rotate: 3,
    rotateY: -15,
    rotateX: -6,
    left: 49,
    top: 15,
    aspect: "aspect-[3/4]"
  },
  {
    id: "euler-hiload-performance",
    title: "Euler Hiload Performance",
    client: "Innovolt",
    category: "Commercial EV Marketplace Campaigns",
    imageUrl: "/images/Inv'08.png",
    rotate: -8,
    rotateY: 20,
    rotateX: 10,
    left: 48,
    top: 80,
    aspect: "aspect-[4/3]"
  },
  {
    id: "hyderabad-regional-ev",
    title: "Hyderabad Regional EV",
    client: "Innovolt",
    category: "Regional Market Expansion Series",
    imageUrl: "/images/Hyd'Tel.png",
    rotate: 12,
    rotateY: -20,
    rotateX: -10,
    left: 64,
    top: 16,
    aspect: "aspect-[4/3]"
  },
  {
    id: "hyderabad-commercial-ev",
    title: "Hyderabad Commercial EV",
    client: "Innovolt",
    category: "Regional Market Expansion Series",
    imageUrl: "/images/Hyd'Eng.png",
    rotate: 6,
    rotateY: 14,
    rotateX: -8,
    left: 66,
    top: 48,
    aspect: "aspect-[3/4]"
  },
  {
    id: "bengaluru-fleet-solutions",
    title: "Bengaluru Fleet Solutions",
    client: "Innovolt",
    category: "Regional Market Expansion Series",
    imageUrl: "/images/Blr'Eng.png",
    rotate: -10,
    rotateY: -14,
    rotateX: 8,
    left: 65,
    top: 78,
    aspect: "aspect-[3/4]"
  },
  {
    id: "choose-your-speed",
    title: "Choose Your Speed",
    client: "Telyport",
    category: "Hyperlocal Logistics Campaigns",
    imageUrl: "/images/Poster.png",
    rotate: -14,
    rotateY: -22,
    rotateX: 8,
    left: 78,
    top: 18,
    aspect: "aspect-[4/5]"
  },
  {
    id: "business-identity-card",
    title: "Business Identity Card",
    client: "Telyport",
    category: "Brand Communication Assets",
    imageUrl: "/images/Visiting Card'Front.png",
    rotate: 8,
    rotateY: -26,
    rotateX: 12,
    left: 92,
    top: 22,
    aspect: "aspect-[4/5]"
  },
  {
    id: "delivery-experience-overview",
    title: "Delivery Experience Overview",
    client: "Telyport",
    category: "Brand Communication Assets",
    imageUrl: "/images/Visiting Card'Back.png",
    rotate: 6,
    rotateY: -15,
    rotateX: -12,
    left: 79,
    top: 52,
    aspect: "aspect-[4/5]"
  },
  {
    id: "snap-photography-contest",
    title: "SNAP!! Photography Contest",
    client: "Mr. Snapper International",
    category: "Photography Community Campaigns",
    imageUrl: "/images/thumb_1778155200_4280e3e7-9a35-4d1a-a280-3db86515ec94.jpg",
    rotate: -12,
    rotateY: 18,
    rotateX: -14,
    left: 93,
    top: 54,
    aspect: "aspect-[4/5]"
  },
  {
    id: "world-photography-day",
    title: "World Photography Day",
    client: "Mr. Snapper International",
    category: "Photography Community Campaigns",
    imageUrl: "/images/thumb_1778155200_46f09457-5dbd-4f95-a838-77e7918923f4.jpg",
    rotate: -5,
    rotateY: -12,
    rotateX: -14,
    left: 80,
    top: 82,
    aspect: "aspect-[3/4]"
  },
  {
    id: "wildlife-week-challenge",
    title: "Wildlife Week Challenge",
    client: "Mr. Snapper International",
    category: "Photography Community Campaigns",
    imageUrl: "/images/thumb_1778155199_ee680b4c-92de-4b17-8af6-974477635a53.jpg",
    rotate: 14,
    rotateY: -18,
    rotateX: 6,
    left: 92,
    top: 80,
    aspect: "aspect-[3/4]"
  },
  {
    id: "and-its-360",
    title: "And It's 360",
    client: "Mr. Snapper International",
    category: "Photography Community Campaigns",
    imageUrl: "/images/thumb_1778155200_6afdf38e-3a5d-4ce5-bb0a-ffcda61d68d6.jpg",
    rotate: -3,
    rotateY: 12,
    rotateX: -10,
    left: 45,
    top: 80,
    aspect: "aspect-[3/4]"
  }
];

export const getPosterSpecs = (posterId: string) => {
  const specs: Record<string, { paper: string; process: string; bio: string }> = {
    "regal-mysore-pak": {
      paper: "Warm Archival Ivory Kraft (280gsm)",
      process: "Hot-Foil Embossing with gloss highlight layers and Karnataka-inspired lines",
      bio: "Designed Mysore Pak as a regal heritage confection with rich royal purple tones and fine gold accents to raise regional confectionery to elite gifting status."
    },
    "luxurious-motichoor-ladoo": {
      paper: "Refined Food Grade Bleached Kraft (290gsm)",
      process: "Solids offset screenprinting in sapphire-blue with crisp symmetric borders",
      bio: "Festive spotlight edition highlighting luxurious Motichoor Ladoos nestled inside sapphire framing with organic moisture protective seals."
    },
    "heritage-karnataka-combo": {
      paper: "Casebound custom pure wood cardboards (320gsm)",
      process: "Fine silk screen foil mapping with multilayer continuous overlays",
      bio: "Karnataka state map vector line drawings integrated with traditional motifs, creating a deeply local and memorable gifting concept."
    },
    "royal-kaju-katli": {
      paper: "Deep pigment velvet heavy board (300gsm)",
      process: "Traditional Carmine Red solid ink block screening with gold embossing",
      bio: "Designed to represent premium Casimir diamond geometry within elegant high-contrast red packaging and metallic details."
    },
    "classic-indian-combo": {
      paper: "Linen-Textured Archival Kraft (310gsm)",
      process: "Dual-drawer precision layout offsets with gold foil spot coatings",
      bio: "A curated double-drawer sweet presentation arrangement engineered to isolate distinct sweet aroma notes securely during cargo shipment."
    },
    "raksha-bandhan-special": {
      paper: "Deckle-Edge Cotton Gifting Board (210gsm)",
      process: "Multi-color Screenprint with subtle gold speckling & fine vector artwork",
      bio: "Celebrates traditional fraternal sibling relationships with festive illustration lines, warm clay palettes, and emotional storytelling themes."
    },
    "your-vehicle-your-price": {
      paper: "Smooth Offset Heavy Art Coated Paper (240gsm)",
      process: "Crisp black commercial framing layout and digital grid screening",
      bio: "Benefit-driven lead flyer for certified electric vehicles, structuring warranties, inspections, and price details to reduce buyer barriers."
    },
    "drive-your-own-vehicle": {
      paper: "Smooth Offset Heavy Art Coated Paper (240gsm)",
      process: "High contrast technical data overlay grids with Swiss typography scale",
      bio: "Designed to present certified second-hand EV options as an reachable investment through downpayment numbers and financing details."
    },
    "euler-hiload-performance": {
      paper: "Opaque Synthetic Hard Stock (280gsm)",
      process: "Geometric engine mapping traces over heavy monochrome vehicle frames",
      bio: "Specification-driven product performance sheet listing battery range stats and load capacities to logistics fleet directors."
    },
    "hyderabad-regional-ev": {
      paper: "Coated Premium Ivory Media (250gsm)",
      process: "Custom geometric Telugu script lithograph paired with city landmark vectors",
      bio: "Localized regional EV campaign targeting southern logistics hubs with high-relevance regional characters and landmark artwork."
    },
    "hyderabad-commercial-ev": {
      paper: "Coated Premium Ivory Media (250gsm)",
      process: "Fine line multi-grid English typography with absolute baseline rules",
      bio: "English adaptation of Hyderabad regional EV growth guidelines, emphasizing verified badges, pricing matrices, and fleet warranties."
    },
    "bengaluru-fleet-solutions": {
      paper: "Grained Silver Foil Coated Board (260gsm)",
      process: "Metallic-textured print layers with city Municipal boundaries tracing",
      bio: "Fleet solutions campaign customized with city Municipal expansion routes, warranty logos, and enterprise logistics support specs."
    },
    "choose-your-speed": {
      paper: "Stark Dark-Coated Matte Poly-Stock (230gsm)",
      process: "Monoline route nodes and speed indicators on high-impact black background",
      bio: "Hyperlocal on-demand logistics banner communicating service speeds and tier options using modern, high-contrast layouts."
    },
    "business-identity-card": {
      paper: "Custom 450gsm Pure Linen-textured Pulp Board",
      process: "Premium hot stamp with metallic gold foil lamination",
      bio: "Modern, minimalist monochrome business card showcasing core professional credibility details and brand guidelines."
    },
    "delivery-experience-overview": {
      paper: "Custom 450gsm Pure Linen-textured Pulp Board",
      process: "High density carbon black litho and interactive QR matrix overlays",
      bio: "Delivery overview card organizing operational routes, brand identity tags, and a tracking QR code for customer signups."
    },
    "snap-photography-contest": {
      paper: "High Gloss Baryta Photographic Paper (290gsm)",
      process: "Cinematic black letterbox printing and bold monospace italic headers",
      bio: "Photography competition campaign designed with active action prompts, cinematic shadows, and clean rules."
    },
    "world-photography-day": {
      paper: "Matt Coated Fine Art Paper (240gsm)",
      process: "Asymmetrical collage layering over a wspólny tinted dark canvas background",
      bio: "Combines landscapes, nature, and close-up portraits in an organic grid block to represent user-generated photography options."
    },
    "wildlife-week-challenge": {
      paper: "Fine Semi-Gloss Art Board (270gsm)",
      process: "High contrast wildlife predator closeup offsets with bold serif typography",
      bio: "Engaging event asset driving wildlife photography submissions by pairing high contrast predator shots with clean, traditional headings."
    },
    "and-its-360": {
      paper: "Dense Monochromatic Archival Paper (300gsm)",
      process: "High contrast letter masking filters embedded into heavy geometric glyphs",
      bio: "Celebratory typographical content showing diverse creative angles through continuous raw-landscape masking blocks."
    }
  };

  return specs[posterId] || {
    paper: "Premium Editorial Archival Paper (240gsm)",
    process: "Fine Art Pigment Print with Satin Finish",
    bio: "Curated design element showcasing professional branding and package layout."
  };
};

export const CLUSTER_PROJECTS = [
  { id: "regal-mysore-pak", title: "Regal Mysore Pak", x: -140, y: -180, rotate: -3 },
  { id: "luxurious-motichoor-ladoo", title: "Motichoor Ladoo", x: 170, y: -130, rotate: 5 },
  { id: "royal-kaju-katli", title: "Royal Kaju Katli", x: 220, y: 15, rotate: -4 },
  { id: "heritage-karnataka-combo", title: "Karnataka Combo", x: -220, y: -60, rotate: 6 },
  { id: "choose-your-speed", title: "Choose Your Speed", x: -210, y: 100, rotate: -5 },
  { id: "your-vehicle-your-price", title: "Your Vehicle, Your Price", x: 160, y: 120, rotate: 4 },
  { id: "business-identity-card", title: "Identity Card", x: -10, y: 200, rotate: -2 },
  { id: "snap-photography-contest", title: "Photo Contest", x: 10, y: -210, rotate: 3 }
];
