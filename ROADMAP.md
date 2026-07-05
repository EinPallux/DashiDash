# ROADMAP.md — DashiDash Build Plan

Phases are sequential; each ends with a hard gate (all checks green + visual QA at 390×844). Content and illustration work can run in parallel from Phase 2 onward (see `AGENTS.md`). No phase is "done" until its gate passes — do not start the next phase on a broken gate.

## Phase 0 — Scaffold & Foundations

- Next.js 15 (App Router, TS strict, pnpm), Tailwind v4, ESLint/Prettier, Vitest.
- Design tokens as Tailwind `@theme` (all colors/type/radius/shadows from `docs/02`), `next/font` setup (Baloo 2, Nunito).
- PWA: manifest, icons (incl. maskable + apple-touch-icon), Serwist service worker, offline fallback route, `viewport-fit=cover`.
- App shell: root layout, floating TabBar (5 tabs, animated active blob), route stubs for all pages, safe-area handling.
- `src/lib/motion.ts` presets + `useMotionSafe`.
- Vercel project connected; preview deploys working.

**Gate:** installable on iPhone (manifest valid, SW active), tab navigation springs between 5 styled stub screens, Lighthouse PWA pass, CI (build/lint/typecheck/test) green.

## Phase 1 — Design System Primitives

- `components/ui`: ChunkyButton (all variants), Card, StatPill, Badge (diet/spice/difficulty), FilterChip, BottomSheet, JuicyCheckbox, Stepper, CountUpNumber, ProgressBar/Ring, Skeleton, icon set.
- RecipeCard (rail + grid sizes) against fixture data.
- A hidden `/styleguide` route rendering every primitive in every state — the visual regression reference.

**Gate:** styleguide screen review — everything matches `docs/02`, presses/springs feel right on a real iPhone, reduced-motion verified.

## Phase 2 — Content Foundation + Calibration

- `content/schema.ts` (all Zod schemas), `scripts/validate-content.ts` wired into CI + prebuild.
- `ingredients.ts` complete (~120 items, prices, sections, substitutes, staples, perishables).
- `lexicon.ts` complete (12 core + all specialty items).
- `categories.ts`.
- **Recipes batch 1**: 20 recipes covering all 11 categories (≥ 2 each), fully authored per `docs/05`.
- Illustration calibration trio (oyakodon, yaki-udon, onigiri) + style lock; mascot base pose.

**Gate:** `validate:content` green with batch-1 category floor relaxed to ≥ 2 (flip to ≥ 5 in Phase 6); manual review of 5 random recipes against the per-recipe checklist; calibration illustrations approved side-by-side.

## Phase 3 — Discover, Recipe, Cook (Golden Path 1)

- Entdecken: header, hero "Heute schnell", search field, 11 category rails, category grid pages, footer mascot.
- Suche: fuzzy search + full filter chips + live count (`lib/search.ts` tested).
- Rezept-Detail: hero, stat pills, portion stepper with live scaling (`lib/scaling.ts` tested), grouped ingredients with lexicon ⓘ bottom sheets, equipment, steps preview, substitutions, sticky CTA.
- Kochmodus: step screens, swipe nav, inline timers, wake lock, amount tokens, finish celebration + "Vorrat abhaken" hook (no-op until Phase 4 wiring).
- Onboarding (3 screens) + Einstellungen (defaults, install hint, export/import stub).

**Gate:** Golden Path 1 (hungry → cooking) in ≤ 4 taps, portion scaling correct at 1–8 servings incl. step tokens, timers survive screen lock/background, all with batch-1 content on a real iPhone.

## Phase 4 — Pantry & Matching (Golden Path 2)

- Dexie schema + repositories; export/import wired for real.
- Vorrat: grouped checklist, search-toggle, first-run staple quick-picks, animated "X Rezepte" count.
- `lib/matching.ts` (tested): ready/almost tiers, missing lists, substitute resolution.
- Match sections + "Fehlt nur: X" cards with add-to-list shortcut (queues until Phase 5 list exists — build ShoppingItem writes now, UI later).
- Reste-Retter flow (`/vorrat/reste`): perishable quick-picks + ranked results.
- Recipe detail becomes pantry-aware (✓ hast du / missing button); pantry teaser on Entdecken; cook-finish "abhaken" wired.

**Gate:** matching unit tests green incl. substitute/staple edge cases; toggling pantry items updates counts/cards live everywhere (`useLiveQuery`); Reste-Retter returns sensible ranked results for 3 test scenarios.

## Phase 5 — Planner, Shopping, Smart Combos (Golden Path 3)

- Planen: week strip, slots, recipe picker (with "aus Vorrat machbar" toggle), per-slot servings, drag/remove, week summary.
- `lib/combos.ts` (tested): Plane-clever flow with constraints, shared-ingredient visualization, savings estimate, "Übernehmen".
- `lib/shopping.ts` (tested): aggregation, pantry subtraction, unit merging, store-section grouping, pack-aware total.
- Einkaufen: grouped list, juicy check-off + done-group, progress, sources subtitles, Asia-Laden hints, manual items, "Hast du schon", bulk "In den Vorrat übernehmen", clear actions.

**Gate:** Golden Path 3 end-to-end (Plane clever → Übernehmen → Einkaufsliste → check items → pantry updated) in ≤ 5 taps to list; aggregation correct for a 4-recipe week incl. merged amounts and totals.

## Phase 6 — Full Content + Learn Tab

- Recipes batches 2 + 3 (→ 60 total); category floor check flipped to ≥ 5; all 60 dish illustrations; remaining mascot poses + empty states + ingredient chip art.
- `guides.ts`: all 10 mini-guides with spot illustrations; Lernen tab (guides + lexicon grid); guide/lexicon detail pages; recipe↔guide cross-links live.
- All empty states, all German copy passes (tone review against `docs/01` §11).

**Gate:** `validate:content` fully strict and green; every rail feels full; Lernen reviewed as "small but lovely"; zero placeholder art or copy anywhere.

## Phase 7 — Polish, Performance, Release

- Motion audit: every primary interaction animated per spec, 60fps on device, reduced-motion double-check.
- Performance: Lighthouse ≥ 90 mobile perf, JS budget check, CLS 0 on Entdecken, SW precache audit (full offline cold-start test in airplane mode).
- iOS QA sweep: standalone install, safe areas everywhere, keyboard behavior on inputs, 120 % text zoom, storage persistence + export/import roundtrip.
- Accessibility pass: VoiceOver on golden paths, contrast, focus states.
- Cross-check all 60 recipes' derived costs against price anchors; fix outliers.
- Production deploy on Vercel + install-on-iPhone smoke test. Tag `v1.0.0`.

**Gate (= launch):** all three golden paths flawless on an actual iPhone in airplane mode after install. 🎉

## Post-v1 backlog (do not build now)

Photo upload for cooked dishes (hybrid imagery) · real dark theme · cloud sync/accounts · sharing recipes as links/images · seasonal content drops · cooking streaks (Duolingo-style, carefully) · English locale · household sharing of shopping list.
