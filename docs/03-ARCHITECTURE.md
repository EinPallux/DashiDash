# 03 — Architecture

## 1. Stack (fixed)

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15+ (App Router, TS strict)** | Vercel-native; static prerendering for all content routes |
| Styling | **Tailwind CSS v4** | tokens via `@theme` from design system |
| Animation | **`motion`** | presets in `src/lib/motion.ts` |
| User data | **Dexie 4 + dexie-react-hooks** | IndexedDB; `useLiveQuery` for reactive reads |
| UI state | **Zustand** | ephemeral only (open sheets, active filters, cook session) |
| Content validation | **Zod** | schemas shared by app + `validate:content` script |
| PWA | **Serwist** (`@serwist/next`) | precache app shell + all content/illustrations |
| Search | tiny client-side fuzzy match (own util) | no dependency needed at this scale (60 recipes) |
| Tests | **Vitest** (+ Testing Library for tricky components) | algorithms are the priority |
| Package manager | **pnpm** | |

Explicitly rejected: any backend/DB service, next-pwa (unmaintained — Serwist is its successor), redux, styled-components, raster image pipelines, i18n frameworks (single locale).

## 2. High-level model

**Content is code, user data is local.**

- **Content** (recipes, ingredients, lexicon, guides, illustrations) = typed TS modules bundled at build time. Statically rendered pages. Changing content = git commit + redeploy.
- **User data** (pantry, meal plan, shopping list, settings) = IndexedDB via Dexie. Never leaves the device. Export/import as JSON from settings.
- Route pages are server components rendering static content; interactive islands (`"use client"`) handle pantry ticks, steppers, lists, cook mode. Pantry-dependent UI renders neutral placeholders server-side and hydrates from Dexie (guard hydration mismatch with mounted-gates on pantry-aware widgets).

## 3. Folder structure

```
src/
  app/
    layout.tsx                 # fonts, theme, TabBar, viewport/PWA meta
    page.tsx                   # Entdecken
    suche/page.tsx
    kategorie/[slug]/page.tsx  # generateStaticParams over categories
    rezept/[slug]/page.tsx     # generateStaticParams over recipes
    rezept/[slug]/kochen/page.tsx
    vorrat/page.tsx
    vorrat/reste/page.tsx
    planen/page.tsx
    planen/kombi/page.tsx
    einkaufen/page.tsx
    lernen/page.tsx
    lernen/guide/[slug]/page.tsx
    lernen/lexikon/[slug]/page.tsx
    einstellungen/page.tsx
    manifest.ts                # PWA manifest
    ~offline/page.tsx          # serwist fallback route
  components/
    ui/                        # design-system primitives (Button, Card, Chip, Sheet, TabBar, icons, …)
    recipe/                    # RecipeCard, StatPills, IngredientRow, StepView, LexiconSheet…
  features/
    pantry/                    # pantry list UI, match sections, reste-retter
    planner/                   # week strip, slots, kombi flow
    shopping/                  # list building UI, section groups
    cook-mode/                 # step screens, timers, wake lock, celebration
    search/                    # search + filter chips + results
  lib/
    db.ts                      # Dexie schema + versioning
    matching.ts                # pantry→recipe scoring          (pure, tested)
    combos.ts                  # overlap set suggestion          (pure, tested)
    scaling.ts                 # portion math + rounding rules   (pure, tested)
    shopping.ts                # list aggregation/merging        (pure, tested)
    search.ts                  # normalize + fuzzy match         (pure, tested)
    costs.ts                   # € estimates + formatting        (pure, tested)
    motion.ts                  # animation presets, useMotionSafe
    dates.ts                   # week helpers (ISO weeks, Mon start)
  content/
    schema.ts                  # all Zod schemas + inferred types
    ingredients.ts             # ~120 ingredients
    recipes/                   # one file per recipe, index.ts aggregates
    lexicon.ts                 # lexicon entries
    guides.ts                  # mini-guides
    categories.ts              # 11 landing categories (order, emoji, slug)
    illustrations/             # DishArt components + mascot poses
  stores/                      # zustand: ui.ts, cook-session.ts, filters.ts
scripts/
  validate-content.ts          # zod-parse everything, check referential integrity
public/
  icons/                       # PWA icons, apple-touch-icon, favicon
```

## 4. PWA / iOS specifics (critical — the user installs on iPhone)

- `manifest.ts`: `display: "standalone"`, `theme_color: #FFF9F0`, `background_color: #FFF9F0`, portrait orientation, maskable + regular icons (512/192), `start_url: "/"`.
- `<head>`: `apple-touch-icon` (180px, opaque rice background), `viewport-fit=cover`, `apple-mobile-web-app-capable`, status-bar style `default` (dark text on warm bg).
- **Serwist**: precache build assets + static routes; runtime cache-first for illustrations/fonts; navigation fallback to `~offline`. Because all content is bundled, the whole app works offline after install.
- iOS has **no install prompt** → dedicated "App installieren" instructions (Share → Zum Home-Bildschirm) in onboarding + settings, with detection of standalone mode (`window.navigator.standalone` / `display-mode: standalone`) to hide it once installed.
- Safe areas everywhere (tab bar, sticky CTAs, cook mode top bar). Use `100dvh`, never `100vh`.
- Wake lock in cook mode: `navigator.wakeLock` behind feature check (supported in modern iOS Safari; graceful no-op otherwise).
- Timers: `setInterval` + timestamp-diff (robust against tab throttling); completion feedback via short WebAudio chime + `navigator.vibrate` where available. No push notifications (not needed, avoids permission friction).
- Storage: request `navigator.storage.persist()`; settings page shows export/import (JSON) as the backup story.

## 5. Data layer

Dexie schema (details in 04-DATA-MODEL):

```ts
db.version(1).stores({
  pantry:   "ingredientId",          // presence = have it
  planned:  "++id, date",            // meal plan entries
  shopping: "++id, ingredientId",    // list items (+ manual items with null ingredientId)
  cooked:   "++id, recipeId, date",  // history (enables "zuletzt gekocht", future stats)
  settings: "key",
});
```

Rules: all reads in components via `useLiveQuery` (reactive, no manual cache invalidation). All writes through small repository functions in `features/*/data.ts` (no raw `db.*` calls inside components). Schema migrations only additive via Dexie `.version(n)` — user data must survive every deploy.

## 6. Algorithms (pure functions in `src/lib`, unit-tested first)

1. **Pantry matching** (`matching.ts`): recipe coverage score against pantry set with substitute resolution and assumed staples. Outputs tiers: ready (missing = 0), almost (missing ≤ 2 non-staple), plus the exact missing list. Spec: 04-DATA-MODEL §6.
2. **Smart combos** (`combos.ts`): propose k-recipe sets maximizing shared-perishable overlap under constraints (time/diet/budget). Greedy beam over 60 recipes — trivial scale. Spec: 04-DATA-MODEL §8.
3. **Portion scaling** (`scaling.ts`): unit-aware rounding (eggs → halves, ml → 5er, g → 5/10er, pieces → sensible fractions). Spec: 04-DATA-MODEL §7.
4. **Shopping aggregation** (`shopping.ts`): merge same-ingredient items across sources, convert to purchasable phrasing, subtract pantry, group by store section, sum cost estimate.
5. **Search** (`search.ts`): diacritic/case-normalized substring + synonym map (e.g. "sojasoße"→shoyu) over title/jp/tags/ingredients.

## 7. Performance budget

- Entdecken initial JS < 200 KB gzip; illustrations inline-SVG (tree-shaken per route) or `/public` SVGs cached by SW.
- All content routes `generateStaticParams` + `dynamic = "error"` (fully static, CDN-served).
- Rails render eagerly (11 × ~8 cards of SVG is fine), but keep DishArt components lightweight (< 6 KB each).
- Fonts: `next/font` self-hosted, `display: swap`, subset latin.

## 8. Quality gates

- Vitest: 100 % of `src/lib` algorithm branches meaningfully covered (these are the product's brain).
- `scripts/validate-content.ts` (run in CI + prebuild): Zod-parse all content; verify every recipe ingredient ID exists; every category has ≥ 5 recipes; every specialty ingredient has a lexicon entry; every equipment/section/unit value is a known enum; cost fields present; slugs unique.
- ESLint + Prettier; TS `strict`, `noUncheckedIndexedAccess`.
- Manual QA checklist per phase in ROADMAP.

## 9. Vercel deployment

- Standard Next.js project, zero env vars, no serverless functions needed (static output + SW). Framework preset: Next.js; `pnpm build`.
- HTTPS by default (required for SW/installability). Custom domain optional later.
- Preview deployments per branch are the visual review mechanism.
