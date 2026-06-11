import { SiteNav } from "./SiteNav";
import { ActHero } from "./ActHero";

// The made. studio site — one immersive scroll, three acts:
//   I. Editorial Brutalist hero (paper)
//   II. Cinematic Dark Gallery (ink)  [coming next]
//   III. Kinetic Grid Lab + Invitation [coming next]
export function Site() {
  return (
    <div className="bg-paper text-ink font-sans antialiased">
      <SiteNav />
      <main>
        <ActHero />
      </main>
    </div>
  );
}
