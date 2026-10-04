// Plain-English privacy policy and terms for made-by-ac.com. Written to describe what the site
// actually does today; update it whenever that changes. Have a lawyer review before relying on it.

export interface LegalSection { h: string; p: string[]; bullets?: string[] }
export interface LegalPageData {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const EMAIL = "thebrain@made-by-ac.com";

export const LEGAL: LegalPageData[] = [
  {
    slug: "privacy",
    path: "/privacy",
    title: "Privacy policy · made. by ac",
    description: "What made. by ac collects through this website, why, who processes it, how long we keep it and how to ask us to change or delete it.",
    h1: "Privacy policy",
    updated: "4 October 2026",
    intro: "made. by ac is a design and development studio in Visakhapatnam, India. This page explains, in plain words, what this website collects about you and what we do with it. We collect very little.",
    sections: [
      {
        h: "What we collect",
        p: ["We only collect what you choose to give us, plus basic visit statistics."],
        bullets: [
          "Contact form: the name, email address, WhatsApp or phone number and message you type in. The email and phone number are optional, but we need at least one to reply.",
          "WhatsApp, email and phone: if you message or call us, we receive whatever you send and your number or address. Those services have their own privacy terms.",
          "Visit statistics: we use Vercel Web Analytics to count page views. It does not use cookies and does not follow you across other websites. It records things like the page visited, referring site, device type, browser and country.",
        ],
      },
      {
        h: "What we do not do",
        p: [
          "We do not use advertising trackers, we do not build profiles of visitors and we do not sell or rent your details. The fonts on this site are served from our own address, so no font provider sees your visit.",
        ],
      },
      {
        h: "What the site stores in your browser",
        p: ["No tracking cookies. The site keeps a few small settings so it behaves nicely, and they never leave your device:"],
        bullets: [
          "made-temp: your choice of light (amber, paper or slate) on the studio section.",
          "made-intro-seen: remembers, for this visit only, that you have already seen the opening animation.",
          "made-scroll: remembers, for this visit only, where you were on a page so Back returns you there.",
        ],
      },
      {
        h: "Why we use your details",
        p: [
          "To reply to your message, to talk with you about a project and, if you become a client, to run it. That is the only purpose. We will not use your enquiry to add you to a mailing list unless you ask us to.",
        ],
      },
      {
        h: "Who handles it for us",
        p: ["A few providers process data so the site works. They act on our instructions:"],
        bullets: [
          "Vercel hosts the website and provides the analytics. Its servers can be outside India.",
          "Resend delivers the contact form to our inbox as an email. It processes your name, contact details and message while delivering them, and its servers can be outside India.",
          "Our email provider holds the messages we receive in the studio mailbox.",
        ],
      },
      {
        h: "How long we keep it",
        p: [
          "Enquiries stay in our mailbox for as long as we need them to reply, to run a project and to keep a record of the conversation. If you want yours removed sooner, ask and we will delete it. The website itself does not store form submissions in any database.",
        ],
      },
      {
        h: "Your choices",
        p: [
          "You can ask us what we hold about you, ask us to correct it or ask us to delete it. We will do it unless the law requires us to keep it. If you have a complaint about how we have handled your data, write to us first and we will respond; you may also contact the relevant authority under Indian data protection law.",
        ],
      },
      {
        h: "Children",
        p: ["This website is for businesses and adults. It is not aimed at children, and we do not knowingly collect their information."],
      },
      {
        h: "Links to other sites",
        p: ["We link to client sites, our own products and other services. Their privacy practices are their own, so check them when you arrive."],
      },
      {
        h: "Changes",
        p: ["If what this site collects changes, we will update this page and the date at the top."],
      },
      {
        h: "Contact",
        p: [`Questions, requests and complaints about your data go to ${EMAIL}. We read every message ourselves.`],
      },
      { h: "Version history", p: ["4 October 2026: first published."] },
    ],
  },
  {
    slug: "terms",
    path: "/terms",
    title: "Terms of use · made. by ac",
    description: "The terms for using made-by-ac.com: what the site is for, how to treat the work shown, the demos on it and how we handle enquiries.",
    h1: "Terms of use",
    updated: "4 October 2026",
    intro: "These terms cover your use of made-by-ac.com. They are not a contract to hire us; projects are agreed separately, in writing.",
    sections: [
      {
        h: "Using the site",
        p: [
          "You may browse the site and contact us through it. Please do not misuse it: no scraping at a scale that affects the site, no attempts to break or probe it and no sending spam through the contact form.",
        ],
      },
      {
        h: "Our work and content",
        p: [
          "The designs, copy, code and images on this site belong to made. by ac or to the clients and people we have worked with. Client work is shown to describe what we did. Please do not copy, republish or present it as your own without asking first.",
        ],
      },
      {
        h: "Demos and examples",
        p: [
          "Several pages contain interactive demos, simulations and illustrations, such as the booking demo, the table-ordering demo, the scripted AI agent preview and the template-versus-brand comparison. They show how something could work. They are not live systems, do not take real bookings or orders and are not a promise of specific results.",
          "Where a figure is a projection or a model, the page says so. Treat it as an illustration, not a guarantee.",
        ],
      },
      {
        h: "Working with us",
        p: [
          "Sending an enquiry does not create a contract. If we work together, scope, price, timeline and ownership are set out in a written agreement before work begins. Quotes are given after a conversation, not on the site.",
        ],
      },
      {
        h: "Accuracy",
        p: [
          "We try to keep the site accurate and current, but it is provided as it is. Things change, so confirm anything that matters to you with us directly.",
        ],
      },
      {
        h: "Liability",
        p: [
          "To the extent the law allows, we are not responsible for losses that come from relying on this website or from the site being unavailable. Nothing here limits any right you have under law that cannot be limited.",
        ],
      },
      {
        h: "Links to other sites",
        p: ["We link to other websites, including client sites and our own products. We do not control them and are not responsible for what is on them."],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by the laws of India, and disputes are subject to the courts at Visakhapatnam, Andhra Pradesh."],
      },
      {
        h: "Changes and contact",
        p: [`We may update these terms, and the date at the top will change when we do. Questions go to ${EMAIL}.`],
      },
      { h: "Version history", p: ["4 October 2026: first published."] },
    ],
  },
];

export const LEGAL_BY_PATH: Record<string, LegalPageData> = Object.fromEntries(LEGAL.map((l) => [l.path, l]));
