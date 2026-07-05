# CLAUDE.md — DashiDash

DashiDash is a **German-language, local-first PWA for quick, authentic Japanese cooking**, optimized for iPhone (installed to home screen). Built for a lazy cook: minimum friction from "I'm hungry" to "food on table". Deployed on Vercel.

This file is the entry point for any AI agent or developer working in this repo. **Read the docs below before writing code** — they are the source of truth and were produced in a dedicated planning phase. Do not re-plan; execute.

## Read these, in this order

| Doc | What it defines |
|---|---|
| `ROADMAP.md` | Build phases, milestones, definition of done per phase |
| `docs/01-PRODUCT-SPEC.md` | Every feature, screen, flow, and German UI copy rules |
| `docs/02-DESIGN-SYSTEM.md` | Colors, type, spacing, motion, components, illustration style |
| `docs/03-ARCHITECTURE.md` | Stack, folder layout, PWA/iOS specifics, state, algorithms |
| `docs/04-DATA-MODEL.md` | TypeScript/Zod schemas, IndexedDB tables, matching & scaling logic |
| `docs/05-CONTENT-GUIDE.md` | How to author recipes, prices (Germany), lexicon, guides |
| `docs/06-RECIPE-CATALOG.md` | The 60 launch recipes with metadata, mapped to categories |
| `AGENTS.md` | How to split work across agents/sessions |

## Hard rules

1. **No backend, no accounts, no external APIs at runtime.** All user data lives in IndexedDB (Dexie). All content (recipes, ingredients, lexicon, guides) is bundled, statically typed seed data. The app must work fully offline after first load.
2. **German UI only.** All user-facing strings in German (du-Form, warm, playful — see 01-PRODUCT-SPEC §Tone). Code, comments, commit messages in English.
3. **Design is a feature.** Never ship default-looking UI. Every screen follows `docs/02-DESIGN-SYSTEM.md` (tokens, chunky tactile buttons, spring motion, illustrated food art). If a component isn't specified there, extend the system consistently — don't improvise one-off styles.
4. **Content is data, validated.** Every recipe/ingredient/lexicon entry must pass its Zod schema (`pnpm validate:content`). Never hand-wave amounts, prices, or steps — follow `docs/05-CONTENT-GUIDE.md`.
5. **iPhone PWA first.** Test every screen at 390×844 (iPhone 12/13/14) with safe-area insets, standalone display mode, no hover-dependent interactions, touch targets ≥ 44px.
6. **Learn tab stays small.** It is deliberately a side feature — never let it grow navigation weight or complexity.

## Stack (fixed — do not substitute)

- **Next.js 15+ (App Router, TypeScript strict)** on Vercel
- **Tailwind CSS v4** with design tokens from the design system
- **Motion** (`motion` package, successor of Framer Motion) for animations
- **Dexie** + `dexie-react-hooks` for IndexedDB user data (`useLiveQuery`)
- **Zustand** for ephemeral UI state only (sheets, filters, cook-mode session)
- **Zod** for content schemas + validation script
- **Serwist** (`@serwist/next`) for the service worker / PWA
- **pnpm** as package manager

## Commands (once scaffolded)

```bash
pnpm dev              # dev server
pnpm build            # production build (must pass with zero errors)
pnpm lint             # eslint + prettier check
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest unit tests (algorithms, scaling, schemas)
pnpm validate:content # zod-validate all seed content
```

CI expectation: `build`, `lint`, `typecheck`, `test`, `validate:content` all green before any push is considered done.

## Conventions

- Path alias `@/*` → `src/*`. Feature-first folders under `src/features/` (see 03-ARCHITECTURE).
- Components: PascalCase files, one component per file, server components by default, `"use client"` only where interaction demands it.
- Content lives in `src/content/` as typed TS modules (not JSON) so the compiler catches broken ingredient references.
- IDs: kebab-case slugs (`oyakodon`, `miso-paste-hell`). Never rename a published ID — user pantry/plans reference them.
- All amounts metric; currency EUR with German formatting (`2,80 €`).
- Commit style: `feat(scope): …`, `fix(scope): …`, `content: …`, `design: …`, `chore: …`.

## Definition of "done" for any feature

1. Works offline, in standalone PWA mode, at iPhone viewport.
2. Animated per the motion spec (no unanimated state changes on primary flows).
3. Zod-valid content, unit tests for any algorithm touched.
4. No layout shift, no unstyled flash, Lighthouse PWA installable.
