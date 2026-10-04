// Single source of truth for everything search-facing: service pages, case-study
// shells, the sitemap, JSON-LD. Copy rules: team voice ("we"), sentence case, no dashes,
// no invented numbers, no real third-party brand names for competitors.

export const SITE = "https://made-by-ac.com";
export const WHATSAPP = "919390852636";
export const EMAIL = "thebrain@made-by-ac.com";

export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export interface Faq { q: string; a: string }
export interface Block { t: string; d: string }
export interface Proof { label: string; title: string; text: string; href: string; cta: string; img: string; alt: string; external?: boolean }

export interface Service {
  slug: string;
  path: string;
  navLabel: string;
  title: string;        // <title>, ~50-60 chars
  description: string;  // meta description, ~150-160 chars
  eyebrow: string;
  h1: string;
  lede: string;         // answer-first paragraph
  serviceType: string;  // schema.org Service.serviceType
  keywords: string[];   // primary first; documented in src/seo/KEYWORDS.md
  outcomes: Block[];
  includes: Block[];
  process: Block[];
  proof?: Proof;
  coverage: { h: string; p: string };
  faqs: Faq[];
  related: string[];
  ctaMessage: string;   // pre-filled WhatsApp text
  ctaLabel: string;
  accent: string;
}

export const SERVICES: Service[] = [
  {
    slug: "appointment-booking-software-for-clinics",
    path: "/appointment-booking-software-for-clinics",
    navLabel: "Clinic appointment booking",
    title: "Appointment booking software for clinics in Vizag & India",
    description: "Online and WhatsApp appointment booking with payments and a live token queue for clinics and hospitals in Visakhapatnam, Andhra Pradesh and across India.",
    eyebrow: "Clinics and hospitals",
    h1: "Appointment booking software for clinics and hospitals",
    lede: "We build appointment booking systems for clinics and hospitals in Visakhapatnam, across Andhra Pradesh and anywhere in India. Patients book on your website or on WhatsApp, pay to confirm, and get a token. Your front desk sees one live queue instead of a ringing phone, a notebook and a chat inbox.",
    serviceType: "Appointment booking software for clinics and hospitals",
    keywords: ["appointment booking software for clinics", "clinic appointment booking system", "hospital appointment booking Andhra Pradesh", "WhatsApp appointment booking for clinics", "clinic software Vizag"],
    outcomes: [
      { t: "Fewer empty slots", d: "A slot is held for fifteen minutes and only becomes an appointment once the consultation fee is paid. Unpaid holds go back to the next patient on their own." },
      { t: "A calmer front desk", d: "Website, WhatsApp and walk-ins all land in one live token queue. Nobody re-types a booking from a chat." },
      { t: "Patients in their own language", d: "Telugu, English and Hindi, written the way patients actually talk, on the site and in the WhatsApp assistant." },
      { t: "Money handled properly", d: "Online payment through UPI and cards, and an automatic full refund when a paid appointment is cancelled." },
    ],
    includes: [
      { t: "Online booking page", d: "Pick a day and a time from the doctor's real schedule. No app to install." },
      { t: "WhatsApp booking assistant", d: "The same booking flow on your clinic's own WhatsApp number, with confirmations, cancellations and reminders." },
      { t: "Pay to confirm", d: "Payment links with a timed hold, a webhook that confirms the booking, and refunds on cancellation." },
      { t: "Live token queue", d: "A front desk screen with the day's queue, walk-ins, collections and one switch for the doctor being in, running late or away." },
      { t: "Reminders and notices", d: "A reminder the evening before, a nudge when a payment hold lapses, and a broadcast tool for telling the day's patients you are running late." },
      { t: "Staff handbook and training", d: "A printed, illustrated guide for your reception, plus a walkthrough on the day you go live." },
    ],
    process: [
      { t: "Walk through your day", d: "We sit with your desk (in person in Vizag, on a call elsewhere) and map how bookings, walk-ins and payments really work today." },
      { t: "Set up your clinic", d: "Schedule, fees, languages, doctors and visit types, configured once and used everywhere." },
      { t: "Connect WhatsApp and payments", d: "We handle the Meta WhatsApp Business setup and the payment account with you, including template approvals." },
      { t: "Go live and look after it", d: "Staff training, a launch week we watch closely, and ongoing support after." },
    ],
    proof: {
      label: "Live in a real clinic",
      title: "Ramachandra Ortho Care, Visakhapatnam",
      text: "A single-doctor orthopaedic clinic books through the website and WhatsApp, in Telugu, English and Hindi, and runs its day from the live queue we built.",
      href: "/work/ramachandra-ortho",
      cta: "Read the case study",
      img: "/case/ortho/hero-d.webp",
      alt: "Ramachandra Ortho Care booking website showing live doctor availability",
    },
    coverage: {
      h: "Vizag first, then Andhra Pradesh and the rest of India",
      p: "We are based in Visakhapatnam, so clinics here can have us at the front desk on go-live day. For Vijayawada, Guntur, Tirupati, Rajahmundry and everywhere else in Andhra Pradesh, and for clinics and hospitals in any other Indian state, we work remotely with video walkthroughs and a written handbook.",
    },
    faqs: [
      { q: "Does this work for a small single-doctor clinic?", a: "Yes. That is exactly what our live build runs: one doctor, one front desk, a daily token queue. It does not need a hospital IT team." },
      { q: "What about hospitals with several doctors and departments?", a: "We scope those together before building. Doctors, departments, per-doctor schedules and fees are modelled up front rather than bolted on, so tell us how your departments run and we will say plainly what fits." },
      { q: "Do patients need to download an app?", a: "No. They book on a web page or on WhatsApp. Both work on any phone." },
      { q: "Can patients pay online?", a: "Yes. Payment links accept UPI and cards, and a booking is confirmed automatically when the payment lands. Paid cancellations are refunded automatically." },
      { q: "Does it support Telugu?", a: "Yes. Telugu, English and Hindi are built in across the website and the WhatsApp assistant, and the Telugu is written in everyday spoken style, not word for word from English." },
      { q: "What does WhatsApp cost?", a: "We build and connect it. Meta bills the clinic directly for business-started messages, and we help you set that up and keep it low." },
      { q: "How long does it take and what does it cost?", a: "For a single-doctor clinic, usually a few weeks from first call to going live. We quote after the walkthrough rather than publishing a number that would be wrong for your clinic." },
      { q: "Where is patient data kept?", a: "In a managed Postgres database with row-level access rules, plus nightly backups. Patient details are used to run the clinic, not shared or sold." },
    ],
    related: ["whatsapp-business-automation", "web-development-company-visakhapatnam"],
    ctaMessage: "Hi, we run a clinic and want to know about appointment booking software.",
    ctaLabel: "Talk to us on WhatsApp",
    accent: "#0c7a68",
  },
  {
    slug: "web-development-company-visakhapatnam",
    path: "/web-development-company-visakhapatnam",
    navLabel: "Web development in Vizag",
    title: "Web development company in Visakhapatnam (Vizag)",
    description: "A Vizag studio that designs and builds fast, search-ready websites and web apps for businesses in Visakhapatnam, Andhra Pradesh and across India.",
    eyebrow: "Web design and development",
    h1: "Web development company in Visakhapatnam",
    lede: "We are a design and development studio in Visakhapatnam. We build websites and web apps that load fast, work in more than one language, and are set up properly for search from day one. Design and code come from the same team, so what we draw is what ships.",
    serviceType: "Web design and development",
    keywords: ["web development company in Visakhapatnam", "website design Vizag", "web development agency Vizag", "website developers in Visakhapatnam", "web app development Andhra Pradesh"],
    outcomes: [
      { t: "A site that looks like you", d: "Custom design and type, not a template with your logo on it." },
      { t: "Found on Google", d: "Clean URLs, structured data, fast pages and real content structure so search engines understand every page." },
      { t: "Works on every phone", d: "Designed at phone width first, because most of your visitors arrive on one." },
      { t: "One team, start to finish", d: "Brand, interface and code in one place, with no hand-offs to lose the idea in." },
    ],
    includes: [
      { t: "Business and brand websites", d: "Editorial sites for studios, clinics, restaurants, schools and local businesses." },
      { t: "Web apps and dashboards", d: "Booking, ordering, admin panels and internal tools built on a real database." },
      { t: "Online stores", d: "Storefronts for handcrafted and premium products with payments set up." },
      { t: "Search foundations", d: "Titles, descriptions, schema, sitemaps and a fast build, so ranking work starts ahead." },
      { t: "Multilingual builds", d: "Telugu, Hindi and English done properly, including type that renders well." },
      { t: "WhatsApp and payment integrations", d: "Booking, order and payment flows connected to the tools your customers already use." },
    ],
    process: [
      { t: "Understand the business", d: "A short call about who you sell to and what a visit should turn into." },
      { t: "Design in the open", d: "You see real screens early, at phone and desktop width, and react to them." },
      { t: "Build and test", d: "Built on a modern stack, checked on real devices, with the search basics in from the start." },
      { t: "Launch and support", d: "We set up hosting, analytics and search console, and stay on for fixes and changes." },
    ],
    proof: {
      label: "Recent work",
      title: "Ramachandra Ortho Care, Visakhapatnam",
      text: "A clinic's booking, WhatsApp and payments system, designed and built end to end, in three languages.",
      href: "/work/ramachandra-ortho",
      cta: "Read the case study",
      img: "/case/ortho/hero-d.webp",
      alt: "Ramachandra Ortho Care booking website with live doctor availability",
    },
    coverage: {
      h: "Based in Vizag, building for India",
      p: "We work with businesses in Visakhapatnam in person and with clients across Andhra Pradesh, Telangana and the rest of India by video call. A studio in the city is useful for meeting your team, shooting on location and being around after launch.",
    },
    faqs: [
      { q: "How much does a website cost in Vizag?", a: "It depends on pages, integrations and whether it needs a database. We quote after a short call because a flat starting price would be wrong for most projects." },
      { q: "How long does a website take?", a: "A focused business site usually takes weeks, not months. Products with booking, payments or a dashboard take longer, and we give you a plan before we start." },
      { q: "Will my site rank on Google?", a: "We build the technical and on-page foundations properly, so nothing blocks you. Rankings still depend on your content and competition, and nobody honest can promise position one." },
      { q: "Do you work with businesses outside Vizag?", a: "Yes. Most of our process works well over video, and clients elsewhere in India work with us the same way." },
      { q: "Do you do design as well as development?", a: "Yes. We started as a design studio, and brand, packaging and interface work sit alongside the build." },
      { q: "Can you add Telugu or Hindi to my site?", a: "Yes, and we write it to be read, not machine translated." },
    ],
    related: ["appointment-booking-software-for-clinics", "branding-and-packaging-design-visakhapatnam"],
    ctaMessage: "Hi, we are looking for a web development partner in Vizag.",
    ctaLabel: "Message us on WhatsApp",
    accent: "#8a6d2f",
  },
  {
    slug: "restaurant-qr-ordering-system",
    path: "/restaurant-qr-ordering-system",
    navLabel: "Restaurant QR ordering",
    title: "Restaurant QR ordering system & digital menu in India",
    description: "Table QR ordering, a brand-matched digital menu, group ordering and loyalty for restaurants and bars in Vizag and across India. Guests download nothing.",
    eyebrow: "Restaurants, bars and cafes",
    h1: "Restaurant QR ordering system and digital menu",
    lede: "We build QR ordering for restaurants, bars and cafes in Visakhapatnam and across India. Each table has its own code. Guests scan, browse a menu that looks like your place, order together and pay, with no app to install. Your waiters stay on the floor doing the part only people do well.",
    serviceType: "Restaurant QR ordering system and digital menu",
    keywords: ["restaurant QR ordering system", "QR code menu for restaurants India", "digital menu Vizag", "table ordering system for bars", "restaurant software Visakhapatnam"],
    outcomes: [
      { t: "Faster tables", d: "Guests order without waiting to be noticed, and one shared table cart means no shouting dishes across the table." },
      { t: "Bigger bills", d: "An in-menu AI host suggests pairings, specials and the second round, at every table." },
      { t: "More repeat visits", d: "Birthday and anniversary perks and a feedback-for-reward loop turn one good night into the next." },
      { t: "Plugs into your kitchen", d: "Orders can forward straight to the point-of-sale system your kitchen already runs on." },
    ],
    includes: [
      { t: "Per-table QR codes", d: "One scan, no download. Works on any phone." },
      { t: "A menu in your brand", d: "Photography, prices, veg and bar flags, bestsellers and daily specials, styled to match the room." },
      { t: "Group ordering", d: "A shared cart for the whole table with one host placing the order." },
      { t: "AI dining host", d: "A host that knows your live menu and suggests dishes in your voice." },
      { t: "Loyalty and occasions", d: "Tiers, birthday and anniversary perks, applied automatically and never stacked." },
      { t: "Feedback to reward", d: "A quick rating after the meal earns a coupon by SMS for the next visit." },
    ],
    process: [
      { t: "Study the room", d: "We look at your menu, your floor and the way service really runs." },
      { t: "Dress it in your brand", d: "Menu, colours, voice and the host's personality, designed for you." },
      { t: "Connect the kitchen", d: "Point-of-sale and admin set up so orders flow where staff already look." },
      { t: "Pilot and tune", d: "We launch on a few tables, watch, and adjust before the whole floor." },
    ],
    coverage: {
      h: "For Vizag restaurants first, and India wide",
      p: "We are in Visakhapatnam, close to its restaurants, bars and cafes, and we build for venues in any Indian city. A pilot on a few tables is the usual start.",
    },
    faqs: [
      { q: "Do guests need to download an app?", a: "No. They scan the table's QR code and the menu opens in the phone's browser." },
      { q: "Will it work with my point-of-sale?", a: "Our ordering platform forwards orders to a restaurant point-of-sale system. Other systems are scoped case by case, and we will tell you if one is not a fit." },
      { q: "Does this replace my waiters?", a: "No, and that is deliberate. It takes order-taking off them so they can do hospitality, and helps each one sell more." },
      { q: "Can the menu match our branding?", a: "Yes. It is designed for your place, not a generic template." },
      { q: "How is this different from a plain QR menu?", a: "A plain QR menu is a PDF on a phone. This is ordering, group carts, an AI host, loyalty and feedback, working as one system." },
    ],
    related: ["whatsapp-business-automation", "web-development-company-visakhapatnam"],
    ctaMessage: "Hi, we run a restaurant and want to know about QR ordering.",
    ctaLabel: "Talk to us on WhatsApp",
    accent: "#a8651c",
  },
  {
    slug: "whatsapp-business-automation",
    path: "/whatsapp-business-automation",
    navLabel: "WhatsApp automation",
    title: "WhatsApp business automation & booking bots in India",
    description: "WhatsApp assistants on Meta's official API that take bookings, send reminders, collect payments and answer questions for clinics, restaurants and shops.",
    eyebrow: "WhatsApp for business",
    h1: "WhatsApp business automation for bookings and orders",
    lede: "We build WhatsApp assistants for Indian businesses on Meta's official WhatsApp Business Platform. They take bookings, answer the questions your team gets asked all day, send reminders and payment links, and hand over to a person when it matters. Customers do it all in the app they already open fifty times a day.",
    serviceType: "WhatsApp business automation and chatbot development",
    keywords: ["WhatsApp business automation India", "WhatsApp booking bot", "WhatsApp chatbot for clinics", "WhatsApp Business API setup India", "WhatsApp order and payment automation"],
    outcomes: [
      { t: "Booking where customers already are", d: "No app and no new habit. A message is enough to book, reschedule or cancel." },
      { t: "Fewer repetitive questions", d: "Timings, fees, location and availability answered instantly, in the customer's language." },
      { t: "Reminders that get read", d: "Approved reminder and confirmation messages sent at the right moment." },
      { t: "Payments inside the chat", d: "A payment link in the conversation, with the booking confirmed when it is paid." },
    ],
    includes: [
      { t: "Official API setup", d: "We connect your number to Meta's WhatsApp Business Platform directly, with no middleman platform charging per seat." },
      { t: "Message templates", d: "Confirmation, cancellation, reminder, notice and one-time-code templates written and submitted for approval." },
      { t: "Booking and order flows", d: "Button-led conversations that are quick on a phone and fall back to plain text gracefully." },
      { t: "Multilingual replies", d: "Telugu, Hindi and English, written the way your customers write." },
      { t: "Payment and refund links", d: "Online payment inside the chat, with refunds handled automatically where it makes sense." },
      { t: "Safeguards", d: "Rate limits, verification codes for sensitive actions and a log of delivery status for every message." },
    ],
    process: [
      { t: "Map the conversations", d: "We read what your customers actually ask and book, and design around that." },
      { t: "Set up the number and templates", d: "Business verification, number registration and template approvals, handled with you." },
      { t: "Build and test with your team", d: "You try the flows on your own phone before any customer does." },
      { t: "Launch and watch", d: "We monitor delivery and failures in the first weeks and tune the replies." },
    ],
    proof: {
      label: "Running in production",
      title: "Ramachandra Ortho Care's WhatsApp assistant",
      text: "Patients book, reschedule, cancel and pay on WhatsApp in three languages, and the clinic's queue updates by itself.",
      href: "/work/ramachandra-ortho",
      cta: "Read the case study",
      img: "/case/ortho/rc-chat-m.webp",
      alt: "Clinic assistant chat with quick reply buttons",
    },
    coverage: {
      h: "For businesses in Vizag, Andhra Pradesh and India",
      p: "WhatsApp is the front door for most Indian customers, so these assistants fit clinics, restaurants, salons, coaching centres and shops alike. We set it up in person in Vizag and remotely everywhere else.",
    },
    faqs: [
      { q: "Is this the official WhatsApp API?", a: "Yes. We use Meta's WhatsApp Business Platform directly, with your own business number and your own approved templates." },
      { q: "Will my number get banned?", a: "We build to Meta's rules: customers opt in by messaging first, business-started messages use approved templates, and nothing is bulk-blasted." },
      { q: "Can I keep using my current number?", a: "Usually yes, with some constraints about the app on that number. We check this at the start." },
      { q: "What does it cost to run?", a: "Meta bills your business directly for business-started conversations. We help you estimate it and design flows that keep it reasonable." },
      { q: "Can a human take over?", a: "Yes. The assistant handles the routine and your team handles the rest." },
    ],
    related: ["appointment-booking-software-for-clinics", "restaurant-qr-ordering-system"],
    ctaMessage: "Hi, we want to automate bookings on WhatsApp for our business.",
    ctaLabel: "Message us on WhatsApp",
    accent: "#128c4a",
  },
  {
    slug: "branding-and-packaging-design-visakhapatnam",
    path: "/branding-and-packaging-design-visakhapatnam",
    navLabel: "Branding & packaging design",
    title: "Brand identity & packaging design in Visakhapatnam",
    description: "Brand identity, packaging systems, festive collections and launch campaigns from a Vizag design studio, for food, consumer and service brands across India.",
    eyebrow: "Brand and packaging",
    h1: "Brand identity and packaging design in Visakhapatnam",
    lede: "We are a design studio in Visakhapatnam that builds brands people remember and packaging people keep. We start from what the brand is for, then draw the identity, the pack and the campaign so they feel like one thing on the shelf, on a phone and in the hand.",
    serviceType: "Brand identity and packaging design",
    keywords: ["brand identity design Visakhapatnam", "packaging design Vizag", "logo and branding agency Vizag", "luxury sweet box packaging India", "campaign design agency Andhra Pradesh"],
    outcomes: [
      { t: "A brand with one clear idea", d: "Identity, colour, type and voice that agree with each other." },
      { t: "Packaging that earns the shelf", d: "Structures, finishes and illustration chosen for the product and the occasion." },
      { t: "Gifting and festive systems", d: "Seasonal collections that stay on brand and still feel specific." },
      { t: "Campaigns in the right language", d: "Regional creative, including Telugu typography, done with care." },
    ],
    includes: [
      { t: "Brand identity", d: "Logo, colour, type, imagery and the rules for using them." },
      { t: "Packaging systems", d: "Rigid boxes, sliding drawers, foil and emboss detail, and the print-ready files." },
      { t: "Illustration", d: "Brand illustration rooted in the region and the product." },
      { t: "Campaign creative", d: "Social, performance and launch sets adapted for each market." },
      { t: "Regional adaptation", d: "City-specific and language-specific versions, with custom Telugu type where it helps." },
      { t: "Brand guidelines", d: "A usable guide so your printer, agency and team stay consistent." },
    ],
    process: [
      { t: "Discover", d: "Who you sell to, who you compete with and where the brand can honestly stand." },
      { t: "Explore directions", d: "A few distinct directions, narrowed together to one." },
      { t: "Design the system", d: "Identity and packaging worked out across real applications." },
      { t: "Produce and hand over", d: "Print-ready files, guidelines and support through production." },
    ],
    proof: {
      label: "Recent work",
      title: "Mithai Maharaja, luxury sweets packaging",
      text: "Regional sweets dressed as the heirloom gift they are, with hot-stamped foil, rigid structures and a festive gifting system.",
      href: "/work/mithai-maharaja",
      cta: "Read the case study",
      img: "/images/thumb_1778155198_f88efc2a-69f8-4b24-b07b-26e8a339b684.webp",
      alt: "Mithai Maharaja luxury sweets packaging",
    },
    coverage: {
      h: "A Vizag studio for brands across India",
      p: "We work with food, consumer and service brands in Visakhapatnam and around India. Being local means we can meet, visit your production and handle print vendors with you.",
    },
    faqs: [
      { q: "What is included in a brand identity project?", a: "Logo, colour, typography, imagery direction and a guideline document, plus the applications you need first, such as packaging or a website." },
      { q: "Do you design packaging end to end?", a: "Yes, from structure and artwork to print-ready files and supporting your printer." },
      { q: "Can you design in Telugu?", a: "Yes. We make custom Telugu typography for regional campaigns." },
      { q: "How long does a brand project take?", a: "Weeks for an identity, longer when packaging and production are included. We give you a schedule before starting." },
      { q: "Do you also build the website?", a: "Yes, and that is the point of working with one studio. Brand and build stay in step." },
    ],
    related: ["web-development-company-visakhapatnam", "restaurant-qr-ordering-system"],
    ctaMessage: "Hi, we want help with branding and packaging for our business.",
    ctaLabel: "Message us on WhatsApp",
    accent: "#8a6d2f",
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

// The /services hub copy.
export const HUB = {
  path: "/services",
  title: "Web, software & design services in Vizag · made. by ac",
  description: "Appointment booking for clinics, restaurant QR ordering, WhatsApp automation, websites and brand design from a Visakhapatnam studio serving Andhra Pradesh and India.",
  h1: "What we build, and who it is for",
  lede: "made. by ac is a Visakhapatnam studio that designs and builds software and brands. We work with clinics, restaurants, consumer brands and growing businesses in Vizag, across Andhra Pradesh and throughout India. Pick the problem you have.",
};

export interface CaseShell {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  summary: string[];
  img: string;
  datePublished: string;
}

export const CASES: CaseShell[] = [
  {
    slug: "ramachandra-ortho",
    path: "/work/ramachandra-ortho",
    title: "Clinic appointment booking case study · Ramachandra Ortho Care",
    description: "How we built online and WhatsApp appointment booking, pay-to-confirm and a live token queue for an orthopaedic clinic in Visakhapatnam.",
    h1: "Ramachandra Ortho Care: appointment booking, WhatsApp and payments for a Vizag clinic",
    summary: [
      "A single-doctor orthopaedic clinic in Chinnamushidiwada, Visakhapatnam, needed booking that sounded like its patients and worked on the phones they already use.",
      "We designed and built a booking site in Telugu, English and Hindi, a WhatsApp assistant on Meta's official API, pay-to-confirm with automatic refunds, and a live token queue for the front desk.",
    ],
    img: "/case/ortho/hero-d.webp",
    datePublished: "2026-10-04",
  },
  {
    slug: "innovolt",
    path: "/work/innovolt",
    title: "Regional campaign design case study · Innovolt",
    description: "How we designed lead-gen and regional-language campaigns, including Telugu typography, for a commercial electric vehicle marketplace.",
    h1: "Innovolt: making a used electric truck feel like a safe bet",
    summary: [
      "Innovolt sells certified pre-owned commercial electric vehicles. The challenge was trust, not product.",
      "We designed a benefit-led campaign system adapted for Hyderabad and Bengaluru, with custom Telugu typography and city-specific creative.",
    ],
    img: "/images/Inv'08.webp",
    datePublished: "2026-06-12",
  },
  {
    slug: "mithai-maharaja",
    path: "/work/mithai-maharaja",
    title: "Luxury sweets packaging design case study · Mithai Maharaja",
    description: "How we designed regal, regional packaging systems and festive gifting collections for an Indian sweets brand.",
    h1: "Mithai Maharaja: dressing regional sweets like the heirloom gift they are",
    summary: [
      "Traditional Indian sweets are often sold in generic boxes. Mithai Maharaja wanted its sweets to feel like the heirloom gift they are.",
      "We designed packaging systems with hot-stamped foil, rigid structures and a festive gifting sub-system, plus launch creative and illustration.",
    ],
    img: "/images/thumb_1778155198_f88efc2a-69f8-4b24-b07b-26e8a339b684.webp",
    datePublished: "2026-06-12",
  },
];

// Pages that already exist as their own .html. Used only for the generated sitemap.
export const EXISTING_PAGES = [
  { path: "/ai", priority: "0.8" },
  { path: "/work", priority: "0.8" },
  { path: "/offer", priority: "0.6" },
  { path: "/labs", priority: "0.6" },
  { path: "/craft", priority: "0.5" },
  { path: "/laws", priority: "0.4" },
  { path: "/live", priority: "0.4" },
  { path: "/system", priority: "0.4" },
  { path: "/worth", priority: "0.4" },
  { path: "/motion", priority: "0.4" },
  { path: "/teardown", priority: "0.4" },
];
