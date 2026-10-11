import { MessageCircle } from "lucide-react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { waLink } from "../seo/contact";
import { ListingTool } from "./listing/ListingTool";

// Paste a messy WhatsApp listing, add photos, get one clean branded page as a single HTML file.
// Everything runs in the browser: the text and photos are never uploaded anywhere.
export function ListingBuilderPage() {
  return (
    <div className="bg-paper text-ink font-sans antialiased overflow-x-clip">
      <SiteNav />
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-36 pb-20">
        <p className="label text-red">Free tool · for real estate agents and builders</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl tracking-tight leading-[1.02] max-w-4xl">
          Turn a messy WhatsApp listing into a <em className="text-red">clean page</em> you can send.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/70">
          Paste the message you usually forward, add your photos, put your name on it. You get one page where every photo, the price and the details are clear, with a WhatsApp button that opens your chat. It all happens in your browser, and nothing is uploaded.
        </p>

        <div className="mt-10"><ListingTool /></div>

        <div className="mt-16 rounded-3xl bg-ink p-8 md:p-12 text-paper">
          <p className="label text-gold">Want it on your own link</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">We can host every listing on your own website, with your brand and visit booking.</h2>
          <a href={waLink("Hi, I tried the listing page maker and want my listings on my own branded website.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-red px-7 py-3.5 font-semibold text-paper hover:brightness-110 transition">
            <MessageCircle size={18} aria-hidden /> Message us on WhatsApp
          </a>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
