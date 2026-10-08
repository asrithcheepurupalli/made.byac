// Tiny constants kept out of seo/data.ts so shell components do not pull the whole SEO dataset into the entry bundle.
export const SITE = "https://www.made-by-ac.com";
export const WHATSAPP = "919390852636";
export const EMAIL = "thebrain@made-by-ac.com";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
