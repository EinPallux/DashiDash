# AGENTS.md — DashiDash

Guidance for AI agents (Claude Code / Opus and subagents) building DashiDash. `CLAUDE.md` holds the hard rules and stack; this file explains **how to work**.

## Ground rules for every agent

- Read `CLAUDE.md` first, then the doc(s) relevant to your task from `docs/`.
- The planning phase is complete. Do not redesign the data model, stack, navigation, or visual language — extend them.
- Never commit content that fails `pnpm validate:content`; never commit code that fails `pnpm build && pnpm typecheck && pnpm lint && pnpm test`.
- User-facing text: German, du-Form, warm and playful (tone guide in `docs/01-PRODUCT-SPEC.md` §11). Everything else in English.
- Verify visually: for UI work, run the dev server and screenshot at 390×844 before declaring done (Playwright + bundled Chromium is available in this environment).

## Work streams (parallelizable)

The build splits into four largely independent streams. When splitting across subagents or sessions, split along these lines — they touch disjoint files:

### 1. Engineering / App shell
Owns: `src/app`, `src/features`, `src/lib`, PWA config, service worker, Vercel config.
Key docs: `03-ARCHITECTURE.md`, `04-DATA-MODEL.md`.
Watch out for: iOS standalone quirks (safe areas, no `beforeinstallprompt`, 100dvh), Dexie schema versioning, keeping algorithms in `src/lib` pure and unit-tested.

### 2. Design system / Components
Owns: `src/components/ui`, Tailwind theme/tokens, motion presets, icons.
Key docs: `02-DESIGN-SYSTEM.md`.
Watch out for: consistency > creativity. Build the primitives (Button, Card, Chip, Sheet, TabBar, Badge, Stepper, Checkbox, ProgressRing) once, use everywhere. Every interactive element needs press/spring feedback.

### 3. Content (recipes, ingredients, lexicon, guides)
Owns: `src/content/**`.
Key docs: `05-CONTENT-GUIDE.md`, `06-RECIPE-CATALOG.md`, `04-DATA-MODEL.md` (schemas).
Watch out for: ingredient IDs must exist before recipes reference them (build `ingredients.ts` first), realistic German prices, honest cook times (test mentally: could a lazy beginner really do this in 15 min including prep?), steps written for someone who has never cooked Japanese food.

### 4. Illustrations
Owns: `src/content/illustrations/` (inline SVG components or optimized .svg assets).
Key docs: `02-DESIGN-SYSTEM.md` §7 (illustration style spec).
Watch out for: one consistent style across all ~70 artworks (60 dishes + ingredients/mascot/empty states). Follow the shared palette, stroke width, and composition rules exactly. Build 3 sample dishes first, confirm they match the spec side by side, then batch the rest.

## Suggested execution order (single agent)

Follow `ROADMAP.md` phases 0→7 sequentially. Within a phase, do design-system primitives before feature screens, and ingredients before recipes.

## Suggested execution order (multi-agent)

- Phase 0–1 (scaffold + design system) must land first, single agent.
- Then streams 3 (content) and 4 (illustrations) can run in parallel with stream 1 (features), because features are developed against schemas + a small fixture set of 5 recipes.
- Integration checkpoint at end of each roadmap phase: full content validation + visual review of every screen.

## Review checklist before pushing

- [ ] `pnpm build && pnpm typecheck && pnpm lint && pnpm test && pnpm validate:content` all green
- [ ] Screens verified at 390×844, standalone-mode safe areas respected
- [ ] New strings are German (du-Form), no lorem ipsum, no English leaks in UI
- [ ] Animations present on primary interactions; `prefers-reduced-motion` respected
- [ ] No new dependencies beyond the fixed stack without strong justification noted in the commit body
