# 🍜 DashiDash

**Schnelle, authentische japanische Küche — für faule Genießer.**

DashiDash is a German-language, local-first PWA for quick Japanese home cooking: honest 15/20-minute recipes, a pantry that tells you what you can cook right now, smart shopping lists that make ingredients overlap across meals, a leftovers rescuer, and a tiny Learn tab that demystifies mirin, dashi & friends — wrapped in a warm, playful, Duolingo-grade UI.

- 📱 Installable on iPhone (standalone PWA), fully offline after first load
- 🔒 No accounts, no backend, no tracking — all data stays on-device (IndexedDB)
- 🚀 Next.js on Vercel

## Status

**Phase 0 complete — scaffold & foundations.** The app now builds, installs as a PWA, and springs between five styled tab screens. Feature screens land phase by phase (see [`ROADMAP.md`](ROADMAP.md)).

The full planning package remains the source of truth:

| File | Purpose |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Entry point for agents/devs: hard rules, stack, conventions |
| [`AGENTS.md`](AGENTS.md) | How to split and execute the build |
| [`ROADMAP.md`](ROADMAP.md) | Phases 0–7 with hard gates |
| [`docs/01-PRODUCT-SPEC.md`](docs/01-PRODUCT-SPEC.md) | Features, screens, flows, tone |
| [`docs/02-DESIGN-SYSTEM.md`](docs/02-DESIGN-SYSTEM.md) | Colors, type, motion, components, illustration style |
| [`docs/03-ARCHITECTURE.md`](docs/03-ARCHITECTURE.md) | Stack, folders, PWA/iOS, quality gates |
| [`docs/04-DATA-MODEL.md`](docs/04-DATA-MODEL.md) | Schemas, IndexedDB, matching/scaling/combo algorithms |
| [`docs/05-CONTENT-GUIDE.md`](docs/05-CONTENT-GUIDE.md) | Recipe/lexicon/guide authoring rules, German pricing |
| [`docs/06-RECIPE-CATALOG.md`](docs/06-RECIPE-CATALOG.md) | The 60 launch recipes |

## Getting started

```bash
pnpm install
pnpm dev              # dev server → http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server (webpack — Serwist's SW plugin requires it) |
| `pnpm build` | Production build (bundles the service worker) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint + Prettier check |
| `pnpm typecheck` | `tsc` for the app **and** the service worker |
| `pnpm test` | Vitest unit tests |
| `pnpm validate:content` | Content validation (stub until Phase 2) |

> **Note:** the build pins the **webpack** compiler (`next build --webpack`) because `@serwist/next` doesn't yet support Turbopack, which is Next 16's default. Icons under `public/icons/` are generated from the mascot SVG.

### Deploy (Vercel)

Zero-config Next.js: import the GitHub repo in Vercel (framework preset **Next.js**, no env vars). HTTPS + per-branch preview deploys give the visual-review mechanism the roadmap expects.

To continue building: read `CLAUDE.md`, then execute the next phase in `ROADMAP.md`.
