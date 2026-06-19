# CLAUDE.md — made. by ac (studio portfolio)

The agency's own site. Read this before changing anything.

## What this is
made. by ac's design-&-development studio portfolio. One immersive scroll plus a
few real pages. Live at **made-by-ac.com** (www). It's the studio's own site, so it
speaks in **team voice** — "we / our studio", never "I".

## Run / build / verify
- **Dev:** `PORT=3100 npm run dev` — **use 3100**; port 3000 is the `made. table`
  dev server. (`server.ts` runs Vite in Express middleware mode.)
- **Typecheck:** `npm run lint` (`tsc --noEmit`). **Build:** `npm run build`.
- **Screenshots:** headless Chrome with `--force-prefers-reduced-motion` (the heroes
  are scroll-driven `vh` sections that balloon in fixed-height captures, and
  `reveal-up` content is hidden until in view unless reduced-motion forces it visible).

## Deploy
- **`main` auto-deploys to production via Vercel.** Branch for risky WIP. Commit/push
  only when asked or at a clear checkpoint.
- Commit identity **loksaiasrith123@gmail.com** (GitHub-verified, required by Vercel).
- **Never** add Co-Authored-By / any AI attribution to commits or PRs.

## Architecture
- The live site is **`src/site/`**, assembled by `src/site/Site.tsx` (a tiny hash +
  path router). `src/components/*` is the **retired** pre-redesign UI — unused, don't
  build on it.
- **Homepage scroll** (in `Site.tsx`): `ActHero → Manifesto (#why) → SelectedWork
  (#work) → AiTease (#ai) → MadeTableTease (#products) → GridLab (#studio) →
  Invitation (#say-hi) → SiteFooter`. Sections alternate ink/paper "acts" with a
  **seam** (top gradient blending from the section above); adjacent same-tone bands
  need no seam.
- **Real pages** (own URL + share preview): `/ai`, `/work`, `/offer`. Each has its own
  `*.html` at repo root (SEO/OG meta + JSON-LD on ai.html), a Vite MPA input in
  `vite.config.ts`, and a `vercel.json` rewrite. **Case studies are hash routes**
  (`#/work/somaa`, `#/work/<slug>`); `Site.tsx` checks these BEFORE the `/work` path.
- `/table` is a **redirect** to `table.made-by-ac.com` (made. table, the studio's SaaS),
  set in `vercel.json` `redirects`.
- Content data: `src/data.ts`. State/contact: `src/StudioContext.tsx` (`useStudio`).

## Design system (non-negotiable)
- Canonical kit: **`~/made-design-system`** (`BRAND.md` + tokens + React kit). This
  repo's `src/index.css` holds the same tokens via Tailwind v4 `@theme`.
- Palette **ink `#0b0b0c` · paper `#f6f3ee` · red `#c8102e` · gold `#bd9b4e`** (+ greys).
  Type **Fraunces (display) · Hanken Grotesk (sans) · Space Mono (mono `.label`)**.
- **Red = the single action** per view; **gold = warmth**, not actions. A page may add
  ONE extra accent (e.g. the AI green `#27d17c`); ink/paper/red/gold stay the frame.
- Signature easing `cubic-bezier(0.16,1,0.3,1)`. Utilities: `.label`, `.u-link`,
  `reveal-up` / `reveal-stagger` (gated by `html.js-reveal`), the made. cursor
  (`data-cursor`, `data-cursor-img`), `data-magnetic`, `.grain`, scroll-progress,
  intro curtain. **Everything must no-op under `prefers-reduced-motion`.**
- Wordmark: lowercase **made.** with an upright **red** dot.

## Gotchas
- **AI features are off** unless `GEMINI_API_KEY` is set: it's **not set in Vercel**
  (concierge + contact-AI in fallback in prod), and `server.ts` loads `.env` (not
  `.env.local`) so it's off locally too. The site renders fine without it.
- `package.json` name is `react-example` — intentional, leave it (the README jokes
  about it).
- Somaa is positioned as an **"AI-powered dining experience platform"** (not "QR
  ordering"); impact figures in its case study are **labelled projections**, not
  measured results — keep that framing honest.
