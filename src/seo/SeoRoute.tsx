import { SERVICE_BY_SLUG, HUB } from "./data";
import { CONTENT_BY_PATH, INDEX_BY_PATH } from "./registry";
import { ServicePage } from "./ServicePage";
import { ServicesHub } from "./ServicesHub";
import { ContentPage } from "./ContentPage";
import { IndexPage } from "./IndexPage";
import { NotFoundPage } from "./NotFoundPage";
import { LegalPage } from "./LegalPage";
import { LEGAL_BY_PATH } from "./legal";

// Client-side resolver for every search-facing path. Unknown paths get the 404 page.
export function SeoRoute({ path }: { path: string }) {
  if (path === HUB.path) return <ServicesHub />;
  const svc = SERVICE_BY_SLUG[path.slice(1)];
  if (svc) return <ServicePage slug={svc.slug} />;
  const c = CONTENT_BY_PATH[path];
  if (c) return <ContentPage c={c} />;
  const lg = LEGAL_BY_PATH[path];
  if (lg) return <LegalPage page={lg} />;
  const i = INDEX_BY_PATH[path];
  if (i) return <IndexPage i={i} />;
  return <NotFoundPage />;
}
