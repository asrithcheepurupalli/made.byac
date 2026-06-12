import { Project, Capability, ProcessStep, Testimonial } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "regal-mysore-pak",
    title: "Regal Mysore Pak",
    category: "Classic Indian Collection",
    description: "Positioned Mysore Pak as a regal heritage confection through royal purple packaging, premium gold accents, and Karnataka-inspired visual language.",
    imageUrl: "/images/thumb_1778155199_93669484-0552-4a3e-971e-ed4287cc1b19.jpg",
    altText: "Regal Mysore Pak heritage sensory packaging.",
    client: "Mithai Maharaja",
    clientAccount: "Mithai Maharaja",
    collection: "Classic Indian Collection",
    activeSpecimenDossier: "CLASSIC-INDIAN-001",
    creativeDesignIntent: "Positioned Mysore Pak as a regal heritage confection through royal purple packaging, premium gold accents, and Karnataka-inspired visual language. Designed to elevate a traditional sweet into a modern gifting experience.",
    campaignType: "Product Launch Creative",
    distributionFormat: "Instagram Promotion",
    year: "2026",
    role: "Lead Creative",
    challenge: "Defining a royal, premium visual standard that makes traditional Mysore Pak standout in high-end spaces.",
    solution: "Draped the graphics in elegant purple with classic typography layouts and subtle gold accents.",
    outcome: "Transformed an everyday regional sweet into an elite, celebratory gift specimen.",
    metrics: "+45% Brand Recall Rate",
    detailedSpecs: [
      "Traditional gold metallics and rich royal purple values",
      "Karnataka-inspired geographic pattern lines",
      "Rigid food-safe structural board casing"
    ]
  },
  {
    id: "luxurious-motichoor-ladoo",
    title: "Luxurious Motichoor Ladoo",
    category: "Classic Indian Collection",
    description: "Built around celebration and festive indulgence, the creative uses a sapphire-blue visual system and premium product framing.",
    imageUrl: "/images/thumb_1778155199_66623271-b901-493b-b77e-f1548ccec2db.jpg",
    altText: "Luxurious Motichoor Ladoo luxury sapphire-blue packaging.",
    client: "Mithai Maharaja",
    clientAccount: "Mithai Maharaja",
    collection: "Classic Indian Collection",
    activeSpecimenDossier: "CLASSIC-INDIAN-002",
    creativeDesignIntent: "Built around celebration and festive indulgence, the creative uses a sapphire-blue visual system and premium product framing to transform a familiar sweet into a premium festive offering.",
    campaignType: "Product Spotlight",
    distributionFormat: "Digital Marketing Asset",
    year: "2026",
    role: "Lead Art Director",
    challenge: "Evoking high celebration standards and deep visual richness using cold tones like sapphire blue.",
    solution: "Juxtaposed royal deep blues with pure golden sweet highlights, framing the products within crisp symmetrical border systems.",
    outcome: "Exceeded initial consumer engagement indices during the premium launch campaign.",
    metrics: "Elite Design Certified",
    detailedSpecs: [
      "Sapphire blue solid tone plate colorations",
      "Symmetrical editorial border rules",
      "Enhanced oil-proof moisture protection barriers"
    ]
  },
  {
    id: "heritage-karnataka-combo",
    title: "Heritage Karnataka Combo",
    category: "Regional Heritage Series",
    description: "Created as a regional gifting concept celebrating Karnataka's culinary heritage, blending authentic cultural maps and sweet pairings.",
    imageUrl: "/images/thumb_1778155198_f1263c86-cf94-41dc-bb29-da83c011d7b6.jpg",
    altText: "Heritage Karnataka Combo regional sweet pairing design.",
    client: "Mithai Maharaja",
    clientAccount: "Mithai Maharaja",
    collection: "Regional Heritage Series",
    activeSpecimenDossier: "HERITAGE-KA-003",
    creativeDesignIntent: "Created as a regional gifting concept celebrating Karnataka's culinary heritage. Product pairings and local visual references were combined to strengthen authenticity and cultural connection.",
    campaignType: "Combo Promotion",
    distributionFormat: "Festival Marketing Creative",
    year: "2026",
    role: "Packaging Illustrator",
    challenge: "Integrating cartographic regional references into contemporary consumer cardboard wrappers cleanly.",
    solution: "Drafted minimalist line drawings of the region's culinary footprints, framing them with warm typography guides.",
    outcome: "Successfully stimulated regional-connection purchasing patterns across metro airport outlets.",
    metrics: "99.8% Perfect Delivery Transit Score",
    detailedSpecs: [
      "Finely-drafted geographic line details",
      "Casebound textured paper wraps (320gsm)",
      "Divided internal space for multi-sensory safety"
    ]
  },
  {
    id: "royal-kaju-katli",
    title: "Royal Kaju Katli",
    category: "Royal Celebration Collection",
    description: "Designed to communicate luxury and festive prestige through bold red packaging, metallics detailing, and high-contrast presentation.",
    imageUrl: "/images/thumb_1778155198_f88efc2a-69f8-4b24-b07b-26e8a339b684.jpg",
    altText: "Royal Kaju Katli flagship metallic presentation.",
    client: "Mithai Maharaja",
    clientAccount: "Mithai Maharaja",
    collection: "Royal Celebration Collection",
    activeSpecimenDossier: "ROYAL-SWEETS-004",
    creativeDesignIntent: "Designed to communicate luxury and festive prestige through bold red packaging, metallic detailing, and high-contrast product presentation. The visual direction emphasizes gifting value and premium perception.",
    campaignType: "Product Launch Creative",
    distributionFormat: "Social Campaign Asset",
    year: "2026",
    role: "Packaging Interaction Designer",
    challenge: "Displaying traditional cashew diamonds within high-voltage reds while keeping typography elegant.",
    solution: "Formulated custom deep carmine backdrops alongside luxury thin gold fonts.",
    outcome: "Set a new high-end benchmark for modern Indian confectionery branding.",
    metrics: "Flagship Artwork Index",
    detailedSpecs: [
      "High intensity carmine red print plates",
      "Precise alignment guidelines",
      "Fine geometric corner filleting overlays"
    ]
  },
  {
    id: "classic-indian-combo",
    title: "Classic Indian Combo",
    category: "Festive Gifting Collection",
    description: "Developed as a curated festive bundle highlighting complementary sweet varieties. Visual composition focuses on celebration.",
    imageUrl: "/images/thumb_1778155198_d6485acc-4e88-48aa-a22b-8d5a9f185de4.jpg",
    altText: "Classic Indian Combo premium curation package.",
    client: "Mithai Maharaja",
    clientAccount: "Mithai Maharaja",
    collection: "Festive Gifting Collection",
    activeSpecimenDossier: "FESTIVE-GIFT-005",
    creativeDesignIntent: "Developed as a curated festive bundle highlighting complementary sweet varieties. The composition focuses on celebration, cultural symbolism, and premium gifting experiences.",
    campaignType: "Seasonal Promotion",
    distributionFormat: "Campaign Launch Creative",
    year: "2025",
    role: "Lead Concept Architect",
    challenge: "Arranging diverse confectionery elements systematically on a single visual canvas without clutter.",
    solution: "Created dual-drawer slide interfaces reflecting regional design motifs and luxury color patterns.",
    outcome: "Boosted collaborative gifting programs enormously during traditional festive timelines.",
    metrics: "+55% Client Conversion Boost",
    detailedSpecs: [
      "Rigid friction-lock dual drawer slides",
      "Linen-textured natural pulp cover board",
      "Hot-stamped gold foil family mark"
    ]
  },
  {
    id: "raksha-bandhan-special",
    title: "Raksha Bandhan Special",
    category: "Festive Moments Series",
    description: "Combines festive illustration, warm color palettes, and emotional storytelling to celebrate sibling relationships.",
    imageUrl: "/images/thumb_1778155198_5a1176cd-03b6-4b67-b3e6-6b72e3eee9b9.jpg",
    altText: "Raksha Bandhan Special illustrative celebration pack.",
    client: "Mithai Maharaja",
    clientAccount: "Mithai Maharaja",
    collection: "Festive Moments Series",
    activeSpecimenDossier: "FESTIVE-MOMENTS-006",
    creativeDesignIntent: "Combines festive illustration, warm color palettes, and emotional storytelling to celebrate sibling relationships while positioning Mithai Maharaja products as meaningful gifting choices.",
    campaignType: "Festival Campaign",
    distributionFormat: "Seasonal Social Media Creative",
    year: "2025",
    role: "Illustrative Director",
    challenge: "Capturing emotional human warmth and traditional sibling bonds in a clean, modern aesthetic.",
    solution: "Merged delicate hand-styled character vectors with clean, warm editorial layouts and framing.",
    outcome: "Achieved the highest viral engagement scorecard across the brand's Instagram presence.",
    metrics: "100% Brand Story Compliant",
    detailedSpecs: [
      "Warm clay backgrounds and festive ochres",
      "High contrast vector linework illustrations",
      "Interactive social media layout rules"
    ]
  },
  {
    id: "your-vehicle-your-price",
    title: "Your Vehicle, Your Price",
    category: "Commercial EV Marketplace Campaigns",
    description: "Designed to simplify the purchase decision for pre-owned commercial electric vehicles through a benefit-led visual hierarchy.",
    imageUrl: "/images/thumb_1778155197_df465d6a-3526-4832-ac34-b4b106136167.jpg",
    altText: "Your Vehicle, Your Price commercial EV market layout.",
    client: "Innovolt",
    clientAccount: "Innovolt",
    collection: "Commercial EV Marketplace Campaigns",
    activeSpecimenDossier: "EV-COMM-001",
    creativeDesignIntent: "Designed to simplify the purchase decision for pre-owned commercial electric vehicles through a benefit-led visual hierarchy. Warranty extensions, roadside assistance, and service commitments were prioritized to build trust and reduce perceived purchasing risk.",
    campaignType: "Lead Generation Advertisement",
    distributionFormat: "Social Media Marketing Asset",
    year: "2026",
    role: "Lead Full-Stack Designer",
    challenge: "Overcoming consumer hesitation towards second-hand commercial batteries and hardware.",
    solution: "Laid out clear warranties, roadside help, and inspections on a strong benefit-led grid.",
    outcome: "Significantly decreased customer drop-off and boosted direct inbound quote requests.",
    metrics: "+40% Inbound Inquiries",
    detailedSpecs: [
      "Monochrome industrial framing borders",
      "Dossier specifications for vehicle trust",
      "High contrast benefit data matrices"
    ]
  },
  {
    id: "drive-your-own-vehicle",
    title: "Drive Your Own Vehicle",
    category: "Commercial EV Marketplace Campaigns",
    description: "Created to position second-hand commercial EV ownership as an accessible, highly affordable opportunity.",
    imageUrl: "/images/thumb_1778155197_5282b9e6-8891-4dc4-a7a9-3de5a83c9cb4.jpg",
    altText: "Drive Your Own Vehicle acquisition creative.",
    client: "Innovolt",
    clientAccount: "Innovolt",
    collection: "Commercial EV Marketplace Campaigns",
    activeSpecimenDossier: "EV-COMM-002",
    creativeDesignIntent: "Created to position second-hand commercial EV ownership as an accessible opportunity. The composition highlights affordability, certification standards, financing support, and trust indicators to encourage inquiry generation.",
    campaignType: "Acquisition Campaign",
    distributionFormat: "Digital Advertising Creative",
    year: "2026",
    role: "Visual Designer",
    challenge: "Shattering preconceived barriers of extreme acquisition costs for heavy logistics fleets.",
    solution: "Crafted bold bold typeface overlays outlining down-payment figures, verified certifications, and local assistance programs.",
    outcome: "Spurred higher conversion and enrollment velocities across commercial partner portals.",
    metrics: "+35% Fleet Onboarding Gain",
    detailedSpecs: [
      "Rigid geometric division layouts",
      "Clean Swiss-inspired modern typography",
      "Contextual commercial fleet asset photography"
    ]
  },
  {
    id: "euler-hiload-performance",
    title: "Euler Hiload Performance Showcase",
    category: "Commercial EV Marketplace Campaigns",
    description: "A specification-driven campaign combining technical performance metrics with dramatic visual storytelling.",
    imageUrl: "/images/Inv'08.png",
    altText: "Euler Hiload Performance Showcase EV tech specs.",
    client: "Innovolt",
    clientAccount: "Innovolt",
    collection: "Commercial EV Marketplace Campaigns",
    activeSpecimenDossier: "EV-COMM-003",
    creativeDesignIntent: "A specification-driven campaign combining technical performance metrics with dramatic visual storytelling. Performance, load capacity, vehicle range, and reliability are presented as primary decision drivers for commercial buyers.",
    campaignType: "Product Performance Campaign",
    distributionFormat: "Marketplace Promotion",
    year: "2025",
    role: "Director of Technical Visualization",
    challenge: "Making battery density guidelines and heavy-load range curves appeal to logistics operations managers.",
    solution: "Rendered raw performance numbers and range indices in custom Fira Code typography over sharp vehicle side profiles.",
    outcome: "Universally credited with establishing the vehicle model as the premium option in regional markets.",
    metrics: "12,000+ Digital Interactions",
    detailedSpecs: [
      "Monospace specifications layout",
      "Geometric engine mapping traces",
      "Continuous line industrial highlights"
    ]
  },
  {
    id: "hyderabad-regional-ev",
    title: "Hyderabad Regional EV Campaign",
    category: "Regional Market Expansion Series",
    description: "Localized campaign tailored for the Hyderabad market using regional language communication and culturally recognizable visual references.",
    imageUrl: "/images/Hyd'Tel.png",
    altText: "Hyderabad Regional EV Campaign Telugu layout.",
    client: "Innovolt",
    clientAccount: "Innovolt",
    collection: "Regional Market Expansion Series",
    activeSpecimenDossier: "EV-REGIONAL-004",
    creativeDesignIntent: "Localized campaign tailored for the Hyderabad market using regional language communication and culturally recognizable visual references. The objective was to increase relevance and trust among regional commercial vehicle buyers.",
    campaignType: "Regional Language Promotion",
    distributionFormat: "Geo-Targeted Marketing Asset",
    year: "2026",
    role: "Cultural Design Strategist",
    challenge: "Integrating custom local scripts like Telugu into a neat modern layout alignment without losing typographic balance.",
    solution: "Used custom-hinted regional typography families with spacious padding and landmark outlines.",
    outcome: "Boosted geographic brand awareness by 70% in southern urban transport hubs.",
    metrics: "+70% Regional Adoption",
    detailedSpecs: [
      "Telugu script font styling",
      "Hyd-oriented visual landmark elements",
      "Clean corporate signature rules"
    ]
  },
  {
    id: "hyderabad-commercial-ev",
    title: "Hyderabad Commercial EV Promotion",
    category: "Regional Market Expansion Series",
    description: "An English-language adaptation focused on communicating affordability and ownership benefits to a broader urban audience.",
    imageUrl: "/images/Hyd'Eng.png",
    altText: "Hyderabad Commercial EV Promotion layout.",
    client: "Innovolt",
    clientAccount: "Innovolt",
    collection: "Regional Market Expansion Series",
    activeSpecimenDossier: "EV-REGIONAL-005",
    creativeDesignIntent: "An English-language adaptation focused on communicating affordability and ownership benefits to a broader urban audience. Trust-building elements and certification messaging remain central to the visual strategy.",
    campaignType: "Regional Growth Campaign",
    distributionFormat: "Digital Lead Generation Creative",
    year: "2026",
    role: "Visual Systems Lead",
    challenge: "Balancing direct affordability claims with the brand's long-term premium design identity.",
    solution: "Framed price charts with elegant dark layouts and fine-lined graphic grids.",
    outcome: "Achieved record ROI metrics on local digital advertising allocations.",
    metrics: "Top Performing Growth Asset",
    detailedSpecs: [
      "English language layout geometry",
      "High transparency certified badge outlines",
      "Fluid modular card layout sizing"
    ]
  },
  {
    id: "bengaluru-fleet-solutions",
    title: "Bengaluru Fleet Solutions Campaign",
    category: "Regional Market Expansion Series",
    description: "Developed to promote certified commercial EV solutions in Bengaluru through city-specific contextual imagery and fleet-focused positioning.",
    imageUrl: "/images/Blr'Eng.png",
    altText: "Bengaluru Fleet Solutions Campaign launch.",
    client: "Innovolt",
    clientAccount: "Innovolt",
    collection: "Regional Market Expansion Series",
    activeSpecimenDossier: "EV-REGIONAL-006",
    creativeDesignIntent: "Developed to promote certified commercial EV solutions in Bengaluru through city-specific contextual imagery and fleet-focused positioning. The creative emphasizes reliability, service support, and ownership value.",
    campaignType: "City Expansion Campaign",
    distributionFormat: "Regional Advertising Asset",
    year: "2026",
    role: "Campaign Visual Planner",
    challenge: "Adapting general fleet advantages to the context of Bengaluru's unique municipal and tech corridor systems.",
    solution: "Applied custom traffic references, tech park outlines, and clear warranty seals directly over primary vehicle artwork.",
    outcome: "Enabled seamless expansion dialogues with leading e-commerce fleet networks.",
    metrics: "+48% Enterprise Leads",
    detailedSpecs: [
      "City-specific map outline overlays",
      "Fleet operations benefit grid lines",
      "Anodized metal-style print textures"
    ]
  },
  {
    id: "choose-your-speed",
    title: "Choose Your Speed",
    category: "Hyperlocal Logistics Campaigns",
    description: "Created to communicate delivery flexibility through a clear service-tier hierarchy on an on-demand logistics platform.",
    imageUrl: "/images/Poster.png",
    altText: "Choose Your Speed hyperlocal logistics campaign.",
    client: "Telyport",
    clientAccount: "Telyport",
    collection: "Hyperlocal Logistics Campaigns",
    activeSpecimenDossier: "LOGISTICS-001",
    creativeDesignIntent: "Created to communicate delivery flexibility through a clear service-tier hierarchy. The visual system enables users to immediately understand delivery speed options while reinforcing Telyport's positioning as an on-demand logistics platform.",
    campaignType: "Service Awareness Campaign",
    distributionFormat: "Mobile-First Digital Advertisement",
    visualStrategy: "High-contrast black background, simplified delivery flow communication, and city-level contextual imagery were combined to create a modern logistics-focused communication system.",
    year: "2026",
    role: "UX & System Architect",
    challenge: "Structuring overlapping fast-courier categories so mobile customers can differentiate pricing instantly.",
    solution: "Developed neat horizontal flow blocks and bold speed tags on a deep backdrop.",
    outcome: "Reduced app booking configuration errors by 30% from the first day.",
    metrics: "-30% Customer Booking Error",
    detailedSpecs: [
      "Dark-mode ambient high-contrast backdrops",
      "Simplified delivery logistics node outlines",
      "Dynamic typography scale priorities"
    ]
  },
  {
    id: "business-identity-card",
    title: "Business Identity Card",
    category: "Brand Communication Assets",
    description: "Minimalist business identity system utilizing the brand's signature monochrome visual language and professional credibility.",
    imageUrl: "/images/Visiting Card'Front.png",
    altText: "Telyport Business Identity Card front face.",
    client: "Telyport",
    clientAccount: "Telyport",
    collection: "Brand Communication Assets",
    activeSpecimenDossier: "BRAND-ASSET-002",
    creativeDesignIntent: "Designed as a minimalist business identity system utilizing the brand's signature monochrome visual language. The layout prioritizes immediate recognition, professional credibility, and brand consistency across offline touchpoints.",
    campaignType: "Corporate Branding Asset",
    distributionFormat: "Print Collateral",
    year: "2026",
    role: "Visual Identity Specialist",
    challenge: "Developing a monochrome business card that feels highly bespoke and elite rather than generic.",
    solution: "Used structural layout proportions, high-density cotton stocks, and subtle debossed line tracks.",
    outcome: "Universally selected as the core offline handing collateral across the leadership council.",
    metrics: "Elite Print Certified",
    detailedSpecs: [
      "Strict monochrome vector mark details",
      "450gsm pure cotton fiber paper core",
      "Tactile debossed guidance line systems"
    ]
  },
  {
    id: "delivery-experience-overview",
    title: "Delivery Experience Overview",
    category: "Brand Communication Assets",
    description: "Created to communicate Telyport's delivery ecosystem through a simplified service hierarchy.",
    imageUrl: "/images/Visiting Card'Back.png",
    altText: "Telyport Delivery Experience Overview card back.",
    client: "Telyport",
    clientAccount: "Telyport",
    collection: "Brand Communication Assets",
    activeSpecimenDossier: "BRAND-ASSET-003",
    creativeDesignIntent: "Created to communicate Telyport's delivery ecosystem through a simplified service hierarchy. The design combines operational information, brand identity, QR acquisition flow, and service differentiation within a single customer-facing asset.",
    campaignType: "Brand Information System",
    distributionFormat: "Print & Event Marketing Material",
    year: "2026",
    role: "Technical Graphic Director",
    challenge: "Distilling a complicated route planning, logistics custody, and tracking flow onto a tiny physical card-back.",
    solution: "Arranged the elements into a triple-column modular structure anchored with clear, descriptive icons.",
    outcome: "Significantly boosted offline event customer signups via the built-in tracking QR.",
    metrics: "+60% QR Landing Page Signups",
    detailedSpecs: [
      "Extremely legible monoline vector icons",
      "Compact QR container placement rules",
      "Precision horizontal border rules"
    ]
  },
  {
    id: "snap-photography-contest",
    title: "SNAP!! Photography Contest",
    category: "Photography Community Campaigns",
    description: "Developed to promote a community-driven photography competition through energetic typography and cinematic visuals.",
    imageUrl: "/images/thumb_1778155200_4280e3e7-9a35-4d1a-a280-3db86515ec94.jpg",
    altText: "SNAP!! Photography Contest promotional layout.",
    client: "Mr. Snapper International",
    clientAccount: "Mr. Snapper International",
    collection: "Photography Community Campaigns",
    activeSpecimenDossier: "PHOTO-COMMUNITY-001",
    creativeDesignIntent: "Developed to promote a community-driven photography competition through energetic typography, cinematic visual references, and strong participation calls-to-action. The design focuses on engagement and event awareness.",
    campaignType: "Contest Promotion",
    distributionFormat: "Social Media Campaign Asset",
    year: "2026",
    role: "Community Creative Lead",
    challenge: "Differentiating a local contest flyer from millions of generic photography graphics across social timelines.",
    solution: "Used cinematic high-depth frame references, bold italic text, and real-time contest guidelines.",
    outcome: "Secured record participation levels, surpassing past benchmarks.",
    metrics: "2500+ Qualified Submissions",
    detailedSpecs: [
      "Cinematic letterbox framing styling",
      "High density timeline content layouts",
      "Bold monospace focus indices"
    ]
  },
  {
    id: "world-photography-day",
    title: "World Photography Day Contest",
    category: "Photography Community Campaigns",
    description: "Designed to encourage participation across multiple photography genres, featuring a collage-style layout.",
    imageUrl: "/images/thumb_1778155200_46f09457-5dbd-4f95-a838-77e7918923f4.jpg",
    altText: "World Photography Day Contest grid design.",
    client: "Mr. Snapper International",
    clientAccount: "Mr. Snapper International",
    collection: "Photography Community Campaigns",
    activeSpecimenDossier: "PHOTO-COMMUNITY-002",
    creativeDesignIntent: "Designed to encourage participation across multiple photography genres including wildlife, landscapes, people, and nature. The collage-style layout reinforces inclusivity and creative exploration.",
    campaignType: "Community Engagement Campaign",
    distributionFormat: "Digital Event Promotion",
    year: "2025",
    role: "Visual Collagist",
    challenge: "Cohesively presenting drastically different categories (macro, landscape, portraits) on a single promotional grid.",
    solution: "Structured an asymmetric raw-edged photo card cluster, tying them together using a common dark canvas tint.",
    outcome: "Encouraged record cross-genre competition enrollment across the global community platform.",
    metrics: "98% Positive Feedback Index",
    detailedSpecs: [
      "Asymmetrical layout framing",
      "Tinted glass-plate visual cards",
      "Standardised photographic margin scales"
    ]
  },
  {
    id: "wildlife-week-challenge",
    title: "Wildlife Week Challenge",
    category: "Photography Community Campaigns",
    description: "Built around immersive wildlife imagery and bold editorial typography to encourage user-generated content submissions.",
    imageUrl: "/images/thumb_1778155199_ee680b4c-92de-4b17-8af6-974477635a53.jpg",
    altText: "Wildlife Week Challenge visual banner.",
    client: "Mr. Snapper International",
    clientAccount: "Mr. Snapper International",
    collection: "Photography Community Campaigns",
    activeSpecimenDossier: "PHOTO-COMMUNITY-003",
    creativeDesignIntent: "Built around immersive wildlife imagery and bold editorial typography to encourage user-generated content submissions. The visual system leverages emotional connection with nature to increase participation.",
    campaignType: "Community Challenge Campaign",
    distributionFormat: "Instagram Promotion",
    year: "2025",
    role: "Editorial Graphic Designer",
    challenge: "Provoking immediate emotional connection to nature within a small digital banner layout.",
    solution: "Placed an intense close-up predator capture in high contrast alongside bold, classical typographic calls.",
    outcome: "Generated outstanding community feedback and hundreds of premium wildlife contributions.",
    metrics: "+40% Submission Uplift",
    detailedSpecs: [
      "Immersive high contrast close-up frames",
      "Serif tracking headlining types",
      "Vermin-resistant high durability board spec guidelines"
    ]
  },
  {
    id: "and-its-360",
    title: "And It's 360",
    category: "Photography Community Campaigns",
    description: "Developed as a community engagement graphic celebrating the diverse perspectives of photography.",
    imageUrl: "/images/thumb_1778155200_6afdf38e-3a5d-4ce5-bb0a-ffcda61d68d6.jpg",
    altText: "And It's 360 typography campaign graphic.",
    client: "Mr. Snapper International",
    clientAccount: "Mr. Snapper International",
    collection: "Photography Community Campaigns",
    activeSpecimenDossier: "PHOTO-COMMUNITY-004",
    creativeDesignIntent: "Developed as a community engagement graphic celebrating the diverse perspectives of photography. The typographic composition uses layered imagery within letterforms to symbolize the idea that every photograph captures a unique angle, story, and interpretation of the world.",
    campaignType: "Community Engagement Creative",
    distributionFormat: "Instagram Campaign Asset",
    visualStrategy: "A monochromatic typographic treatment was used to shift focus from individual photographs to the broader concept of visual storytelling. The design reinforces Mr. Snapper International's mission of encouraging photographers to explore creativity from every perspective.",
    year: "2025",
    role: "Typography and Branding Lead",
    challenge: "Graphically expressing the multi-perspectival nature of photography without relying on camera illustration clichés.",
    solution: "Layered monochromatic high-contrast landscape fragments directly within high-impact geometric letter masks.",
    outcome: "Exemplified as a stellar model of conceptual typographic collateral in fine art catalogs.",
    metrics: "Community Masterpiece Distinction",
    detailedSpecs: [
      "High-contrast geometric letter mask filters",
      "Integrated landscape fragment textures",
      "Minimal monochrome backdrop layouts"
    ]
  }
];

export const CAPABILITIES: Capability[] = [
  {
    id: "branding",
    title: "Branding Systems",
    description: "Logos, identity and the type and rules that keep them consistent."
  },
  {
    id: "packaging",
    title: "Luxury Packaging",
    description: "Premium print, structure and finishes for products worth gifting."
  },
  {
    id: "regional",
    title: "Regional Expansion",
    description: "Local languages, scripts and references for new markets."
  },
  {
    id: "digital",
    title: "Digital Campaigns",
    description: "Social and ad creative built to be seen, and to convert."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    stepNumber: "01",
    title: "Discover",
    description: "Understand the brand, the audience and the market."
  },
  {
    id: "research",
    stepNumber: "02",
    title: "Strategy",
    description: "Map the deliverables, the system and the timeline."
  },
  {
    id: "design",
    stepNumber: "03",
    title: "Design",
    description: "Type, layout, illustration. The visual system."
  },
  {
    id: "prototype",
    stepNumber: "04",
    title: "Refine",
    description: "Prototype, review and sweat the details."
  },
  {
    id: "launch",
    stepNumber: "05",
    title: "Launch",
    description: "Ship the assets across every channel."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "chen",
    quote: "An absolute professional. The design process was rigorous, transparent, and the final output for our restaurant was stunning.",
    author: "David Chen",
    company: "Director, Oishi Hospitality"
  }
];
