# Release checklist — DashiDash v1.0.0

The build phases (ROADMAP 0–7) are complete. This is the launch checklist for
the items that need a real device, production hosting, or a person — the parts
CI can't certify. Gate for launch (ROADMAP Phase 7): **all three golden paths
flawless on an actual iPhone in airplane mode after install.**

## 1. Pre-flight — automated (all green in CI)

```bash
pnpm install
pnpm validate:content   # 86 Zutaten · 23 Lexikon · 60 Rezepte · 10 Guides
pnpm typecheck
pnpm lint
pnpm test               # 61 passing
pnpm build              # 180 static pages, 0 errors
```

Verified in this environment: derived cost per serving sane for all 60 recipes
(Günstig ≤ 2,50 €), Entdecken CLS ≈ 0.004, offline cold-start works after first
load, 0 interactive elements without an accessible name, reduced-motion honoured.

## 2. Deploy to Vercel

- [ ] Connect the repo to Vercel (framework preset: **Next.js**, no env vars —
      the app has no backend/secrets).
- [ ] Deploy the release commit to **Production**.
- [ ] Confirm the deployment serves over HTTPS (required for the service worker
      and "Add to Home Screen").

## 3. Install-on-iPhone smoke test

- [ ] Open the production URL in Safari on an iPhone (test target: iPhone
      12/13/14, 390×844).
- [ ] **Add to Home Screen** → launch from the icon (standalone display mode).
- [ ] Confirm the app icon and name (`DashiDash`) render correctly.

## 4. Golden paths in airplane mode (the launch gate)

Load the app once online so the service worker precaches, then enable
**airplane mode** and run each path end-to-end:

- [ ] **GP1 — Hungry → cooking:** Entdecken → a recipe → Kochmodus, step timers,
      finish celebration. ≤ 4 taps from home to cooking.
- [ ] **GP2 — Pantry → matches:** stock the Vorrat → ready/almost matches update
      live → "Fehlt nur: X" adds to the list. Reste-Retter returns sensible picks.
- [ ] **GP3 — Plan → shop → pantry:** Plane clever → Übernehmen → Einkaufsliste →
      check items → "In den Vorrat übernehmen" updates the pantry.

## 5. iOS / a11y sweep

- [ ] Safe-area insets correct on notch/home-indicator (header + tab bar).
- [ ] Touch targets ≥ 44 px; no hover-dependent interactions.
- [ ] Keyboard behaviour on the search + manual-item inputs (no layout jump).
- [ ] 120 % text zoom stays readable and unbroken.
- [ ] VoiceOver can traverse each golden path; focus states visible.
- [ ] Storage persists across relaunch; Einstellungen **export → import**
      round-trips pantry/plan/shopping data.

## 6. Performance

- [ ] Lighthouse (mobile) ≥ 90 performance; PWA "installable"; CLS < 0.1.
- [ ] Full offline cold-start from the home-screen icon in airplane mode.

## 7. Tag the release

Once the gate above is green on device:

```bash
git tag -a v1.0.0 -m "DashiDash v1.0.0"
git push origin v1.0.0
```

## Post-v1 backlog (not in scope)

Photo upload for cooked dishes · real dark theme · cloud sync/accounts · sharing
recipes as links/images · seasonal content drops · cooking streaks · English
locale · household sharing of the shopping list.
