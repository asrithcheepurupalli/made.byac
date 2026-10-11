import type { Content } from "./content-types";

// Real estate landing pages. Each answers a distinct search intent with details that are true
// and specific. We have not built a listing page for a broker yet and say so on the service page,
// so none of these claims a client, a number or a result.

const SAMPLE = {
  label: "A sample you can open",
  title: "A listing page and a project page, with made up details",
  text: "Open a sample for an agent and one for a builder, switch a property to sold, pick a visit slot and tap the WhatsApp button.",
  href: "/sample-listing",
  cta: "Open the sample",
  img: "/sample/building.svg",
  alt: "Illustration of a sample apartment building used in the sample listing",
};

const re = { proof: SAMPLE, kind: "landing" as const, cluster: "property" as const, ctaLabel: "Message us on WhatsApp", accent: "#2f7d6b" };

export const PROPERTY_LANDINGS: Content[] = [
  {
    ...re, slug: "property-listing-website-for-real-estate-agents-visakhapatnam",
    path: "/property-listing-website-for-real-estate-agents-visakhapatnam", navLabel: "Listing website for agents in Visakhapatnam",
    title: "Property listing website for agents in Visakhapatnam",
    description: "A branded listing website and one-link property pages for real estate agents and brokers in Visakhapatnam, with WhatsApp enquiries and local support.",
    eyebrow: "Visakhapatnam agents and brokers", h1: "A property listing website for real estate agents in Visakhapatnam",
    lede: "If you sell or rent property in Visakhapatnam, we can give you a branded listing website and a clean page for each property, with enquiries going straight to your WhatsApp. We are a Vizag studio, so we can meet you, look at how you present listings today and set it up around that.",
    sections: [
      { h: "Why a listing page beats a WhatsApp dump", p: [
        "Many Vizag listings travel as a stack of photos, a few lines of text and a price you have to ask for. Buyers lose track of which photo belongs to which flat, and you answer the same questions again and again.",
        "One page per property fixes that. Photos in order, the price and area stated, the location with a map link, and a button that opens your WhatsApp with the property already named.",
      ] },
      { h: "What goes on each page", p: ["Whatever buyers in your market ask first:"], bullets: [
        "A photo gallery, with a floor plan when you have one",
        "Price, area, floor, facing, parking and amenities",
        "A description in your own words, in English or Telugu",
        "Locality and a map link",
        "Your name, your brand, your RERA details where you have them",
        "An enquiry button with the property name filled in",
      ] },
      { h: "Where we work", p: ["We work with agents, brokers and builders across Visakhapatnam, whether you cover Beach Road and Rushikonda, MVP Colony and Siripuram, Madhurawada and Bheemili, or Gajuwaka and Anakapalle. We can also work with you over video if you prefer."] },
    ],
    faqs: [
      { q: "Do you bring me buyers?", a: "No. We make your own listings look good and carry your name, so the buyers you already reach take you seriously." },
      { q: "Can the pages be in Telugu?", a: "Yes. We can write and typeset pages in Telugu, English or both." },
      { q: "Do you have a broker client in Vizag already?", a: "Not yet, and we say so. We are taking our first real estate clients, so you get our full attention." },
      { q: "How much does it cost?", a: "A flat price after we see how many properties you list and whether you want your own website. You get the number before we begin." },
    ],
    related: ["/property-listing-pages-for-real-estate-agents", "/whatsapp-property-catalogue-for-real-estate-brokers", "/website-for-builders-and-real-estate-developers"],
    keywords: ["real estate agent website Visakhapatnam", "property listing website Vizag", "real estate broker website Vizag"],
    ctaMessage: "Hi, I sell property in Visakhapatnam and want a branded listing website.",
  },
  {
    ...re, slug: "whatsapp-property-catalogue-for-real-estate-brokers",
    path: "/whatsapp-property-catalogue-for-real-estate-brokers", navLabel: "WhatsApp property catalogue for brokers",
    title: "WhatsApp property catalogue for real estate brokers in India",
    description: "Replace photo dumps with a WhatsApp property catalogue: clean pages you share as one link, with enquiries that arrive with the property already named.",
    eyebrow: "WhatsApp for brokers", h1: "A WhatsApp property catalogue for real estate brokers",
    lede: "Most brokers already sell on WhatsApp. The problem is what gets sent: photos one by one, text that scrolls away and no way to tell which flat a buyer means. We turn your inventory into a catalogue of clean pages you share as one link each, and enquiries come back to your WhatsApp with the property named.",
    sections: [
      { h: "Keep WhatsApp, fix what you send", p: [
        "You do not need buyers to download anything or sign up anywhere. A link opens a page in the phone's browser. The enquiry button opens a chat with you.",
        "Because each page has its own address, you can send the right one to the right buyer, and update the price on it without sending a new message.",
      ] },
      { h: "A catalogue you can actually search", p: ["All your properties on one page of yours, grouped the way you sell:"], bullets: [
        "By locality, budget and type of property",
        "With available, on hold and sold shown clearly",
        "Each one linking to its own page with photos and details",
        "Sharable as a single link to a buyer who is still deciding",
      ] },
      { h: "If you want a WhatsApp assistant too", p: ["We also build WhatsApp assistants on the official business API. For a broker that can mean answering the first questions, collecting a buyer's budget and area, and booking a site visit, with you stepping in when it matters. We scope this with you separately, because not every broker needs it."] },
    ],
    faqs: [
      { q: "Is this the WhatsApp Business catalogue feature?", a: "No. That feature is small and limited. This is a set of full pages on your own link, with photos, details and an enquiry button, that you share on WhatsApp." },
      { q: "Do buyers need an account?", a: "No. They open the link and can message you straight away." },
      { q: "Can it book site visits?", a: "Yes, if you want it. We can reuse the same booking flow we run for a clinic, so a buyer picks a visit slot." },
    ],
    related: ["/property-listing-pages-for-real-estate-agents", "/whatsapp-business-automation", "/property-listing-website-for-real-estate-agents-visakhapatnam"],
    keywords: ["WhatsApp property catalogue", "WhatsApp catalogue for real estate brokers", "share property listings on WhatsApp"],
    ctaMessage: "Hi, I am a broker and want a cleaner way to share properties on WhatsApp.",
  },
  {
    ...re, slug: "website-for-builders-and-real-estate-developers",
    path: "/website-for-builders-and-real-estate-developers", navLabel: "Website for builders and developers",
    title: "Website for builders and real estate developers in India",
    description: "A project website for builders and developers: brochure details, available units, location, site visit booking and an enquiry button that reaches your team.",
    eyebrow: "Builders and developers", h1: "A website for builders and real estate developers",
    lede: "A project needs a page that does what the brochure and the sales office do together: show the project well, say what is available and let a buyer book a visit. We design and build project websites for builders and developers, with enquiries that reach your sales team on WhatsApp and a visit booking flow if you want one.",
    sections: [
      { h: "What a project page should do", p: ["A buyer opening your project link should find what they would ask a salesperson, laid out clearly:"], bullets: [
        "The project in a few honest, well designed screens",
        "Unit types, sizes and what is available",
        "Location, connectivity and what is nearby, with a map link",
        "Your RERA registration and approvals where they apply",
        "A brochure to download and an enquiry button that reaches your team",
      ] },
      { h: "Visits without the phone tag", p: ["If you run site visits, buyers can choose a time on the page and your team sees the day's visits in one place. It is the same booking flow we run for a clinic, set up for a sales office."] },
      { h: "Design and build from one team", p: ["We are a design studio first. The page is designed for your project and your brand, not poured into a template, and the same team builds it, so what you approve is what ships."] },
    ],
    faqs: [
      { q: "Can you update availability as units sell?", a: "Yes. We set up a simple way to mark units available, on hold or sold." },
      { q: "Can the site carry our brand and brochure?", a: "Yes. We work from your brand or build one with you, and use your brochure content." },
      { q: "Have you built a project site for a developer before?", a: "Not for a developer yet. We have built a clinic booking system and brand and packaging for consumer businesses, and we say so plainly. For a first project we give you our full attention." },
    ],
    related: ["/property-listing-pages-for-real-estate-agents", "/web-development-company-visakhapatnam", "/branding-and-packaging-design-visakhapatnam"],
    keywords: ["website for builders and developers", "real estate project website India", "builder website design"],
    ctaMessage: "Hi, we are a builder and want a website for our project.",
  },
  {
    ...re, slug: "real-estate-agent-website-design-india",
    path: "/real-estate-agent-website-design-india", navLabel: "Real estate agent website design",
    title: "Real estate agent website design for agents across India",
    description: "A personal-brand website for real estate agents in India: your listings, your story and a WhatsApp enquiry button, designed so buyers remember you.",
    eyebrow: "Agents across India", h1: "Real estate agent website design that makes buyers remember you",
    lede: "Portals show your listing next to everyone else's. Your own website shows you: your name, your areas, your listings and a way to message you. We design and build websites for real estate agents anywhere in India, working over video and WhatsApp from our studio in Visakhapatnam.",
    sections: [
      { h: "A website that is yours", p: [
        "On a portal, the buyer remembers the portal. On your own site, they remember you. It is the one place you control how you are presented, and the link you can put on a card, a board or a status.",
      ] },
      { h: "What it includes", p: [], bullets: [
        "A clear home page that says who you are and where you work",
        "Your listings, each with its own page and WhatsApp enquiry button",
        "An about page with your story and your photo",
        "Fast loading on phones, and search basics done properly",
        "Telugu, Hindi or English as you need",
      ] },
      { h: "Working with agents in any city", p: ["We are in Visakhapatnam and work with agents in Hyderabad, Bengaluru, Chennai, Mumbai and elsewhere over video and WhatsApp. If you are in Vizag we can meet in person."] },
    ],
    faqs: [
      { q: "Can I add listings myself?", a: "We set this up the way you prefer: you send us details, or you use a simple form to add them yourself." },
      { q: "Will it rank on Google?", a: "We build it to be fast, clear and findable, with clean pages for your listings. Nobody honest can promise a ranking." },
      { q: "Do you work outside Visakhapatnam?", a: "Yes. Most of what we do runs over video, WhatsApp and a shared document." },
    ],
    related: ["/property-listing-pages-for-real-estate-agents", "/web-development-company-visakhapatnam", "/property-listing-website-for-real-estate-agents-visakhapatnam"],
    keywords: ["real estate agent website design India", "website for real estate agents", "property agent personal website"],
    ctaMessage: "Hi, I am a real estate agent and want a website of my own.",
  },
];
