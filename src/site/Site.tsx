import { SiteNav } from "./SiteNav";
import { ActHero } from "./ActHero";
import { Manifesto } from "./Manifesto";
import { SelectedWork } from "./SelectedWork";
import { GridLab } from "./GridLab";
import { Invitation } from "./Invitation";
import { SiteFooter } from "./SiteFooter";

// The made. studio site — one immersive scroll, three acts:
//   I.   Editorial Brutalist hero (paper) + manifesto
//   II.  Cinematic Dark Gallery — the work (ink)
//   III. Kinetic Grid Lab — the studio (paper-dim)
//   + the Invitation (ink) and footer
export function Site() {
  return (
    <div className="bg-paper text-ink font-sans antialiased">
      <SiteNav />
      <main>
        <ActHero />
        <Manifesto />
        <SelectedWork />
        <GridLab />
        <Invitation />
      </main>
      <SiteFooter />
    </div>
  );
}
