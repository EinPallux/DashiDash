# 02 — Design System

The brief: **modern, warm, playful, outstanding UI/UX. Duolingo-grade tactility and delight, but for Japanese quick cooking.** Not childish, not corporate, never default-Tailwind-looking.

Design keywords: *steaming bowl on a wooden counter* — warm light, bold shapes, ink accents, springy physicality.

## 1. Color

Tokens (Tailwind v4 `@theme`). Light mode only for v1 (warm palettes die in naive dark mode; a real dark theme is a v2 item — do **not** auto-invert).

### Core palette

| Token | Hex | Use |
|---|---|---|
| `--color-rice` | `#FFF9F0` | App background (warm off-white) |
| `--color-rice-warm` | `#FFF1DE` | Section tints, rail backgrounds |
| `--color-paper` | `#FFFFFF` | Cards, sheets |
| `--color-nori` | `#20312B` | Primary text (warm ink, never pure black) |
| `--color-nori-60` | `#5C6B65` | Secondary text |
| `--color-dashi` | `#FF7A45` | **Primary brand** — CTAs, active tab, highlights (warm salmon-orange) |
| `--color-dashi-deep` | `#E85D25` | Pressed/darker primary, button bottom-edge |
| `--color-dashi-soft` | `#FFE8DC` | Primary tint backgrounds, active chip fill |
| `--color-matcha` | `#7BA05B` | Success, "hast du"-ticks, vegan/veggie accents |
| `--color-matcha-soft` | `#EAF2E0` | Success tints |
| `--color-tamago` | `#FFC53D` | Playful accent, stars, hero details, timers |
| `--color-ume` | `#E05252` | Spice chilis, destructive, urgent |
| `--color-sora` | `#4E8DA6` | Info accents, lexicon links (dotted underline), water/fish notes |

Rules: backgrounds always warm (`rice`/`rice-warm`), never gray. Shadows are warm-tinted (`#3A2A1A` at low alpha), soft and layered — no harsh black drop shadows. Max 2 accent colors per screen besides brand.

### Semantic mapping

- Diet badges: Protein `tamago`-tinted 🍗, Vegetarisch `matcha`-soft 🥕, Vegan `matcha` 🌱.
- Difficulty: filled `dashi` chopstick icons on `rice-warm` pill.
- Spice: `ume` chili icons, count = level.
- Cost: `nori-60` text with `sora` euro icon.

## 2. Typography

- **Display/headers**: `Baloo 2` (self-hosted via `next/font`, weights 500–800). Round, chunky, friendly — the "Duolingo energy". Used for screen titles, big numbers, category names, buttons.
- **Body/UI**: `Nunito` (weights 400–700). Highly readable rounded sans for steps, ingredient lists, meta.
- Japanese glyphs (recipe subtitles like 親子丼): `"Hiragino Sans", "Yu Gothic", sans-serif` system fallback — do not bundle a JP webfont (weight!). JP text is decorative subtitle only.
- Scale (mobile): display 28/34 · title 22/28 · heading 17/24 · body 15/22 · caption 13/18 · stat-number 34/38. Numbers in stats use tabular figures.

## 3. Shape, spacing, elevation

- Radius scale: chips/badges `999px`; buttons `16px`; cards `20px`; sheets/modals `28px` top. Nothing sharp-cornered, ever.
- Spacing: 4px base grid; screen gutter 20px; rail card gap 12px; section gap 28px.
- Elevation: `card` = `0 2px 8px rgba(58,42,26,0.08)`; `raised` (sheets, sticky CTA) = `0 8px 24px rgba(58,42,26,0.16)`. Pressed elements lose elevation (they physically go down).
- Borders: hairline `rgba(32,49,43,0.08)` on cards over tinted backgrounds.

## 4. Signature components

Build these primitives in `src/components/ui` first; every screen composes them.

### 4.1 Chunky Button (the Duolingo button)
- Filled `dashi`, bold `Baloo 2` label, **4px darker bottom edge** (`dashi-deep`) simulating physical depth.
- On press: translateY(2px) + bottom edge shrinks to 2px (it "goes down"), spring release. Haptic-feeling even without haptics.
- Variants: `primary` (dashi), `secondary` (paper + nori border + `rice-warm` bottom edge), `success` (matcha), `ghost` (tint only), `danger` (ume). Sizes M (44px) / L (56px, sticky CTAs). Min touch target 44px always.

### 4.2 Recipe Card
- Paper card, illustration on `rice-warm` rounded canvas, title, then a **stat strip** of micro-pills (time · difficulty · ingredients · cost) + diet/spice badges top-right on the illustration.
- Press: scale 0.97 squash with spring back; illustration does a tiny 2° tilt.

### 4.3 Stat Pill / Badge
Rounded-full, icon + value, `rice-warm` fill, `nori` text. Tappable variants get a subtle border.

### 4.4 Filter Chip
Pill; inactive: paper + hairline; active: `dashi-soft` fill + `dashi` text + spring-in checkmark. Count badge morphs numbers.

### 4.5 Bottom Sheet
`28px` top radius, grabber handle, spring slide-up (see motion), scrims `nori` at 40 %. Used for: lexicon ⓘ, equipment details, recipe picker, filters on category pages.

### 4.6 Tab Bar
Floating style: inset 12px from edges, pill-shaped paper bar with `raised` shadow, safe-area aware. Active tab: icon fills with `dashi`, label appears, background blob slides between tabs (layout animation). Icons are custom line icons that "fill" when active.

### 4.7 Juicy Checkbox (shopping list / pantry)
Circle → on check: fills `matcha`, checkmark draws in (SVG path animation), row briefly highlights then (shopping list) slides down to the done-group.

### 4.8 Stepper (portions)
`− 2 +` pill; number morphs vertically on change (slot-machine style, 150ms).

### 4.9 Progress
- Cook mode: top bar fills `dashi`, mascot sits at the leading edge.
- Timers: ring countdown, `tamago` stroke, remaining time centered, gentle pulse in final 10s.

### 4.10 Count-up Number
Reusable animated number (pantry match count, result counts, savings amounts). Springs, tabular figures.

## 5. Motion

Library: `motion` (Framer Motion successor). **Everything springs; nothing just appears.**

Presets (define once in `src/lib/motion.ts`):

| Preset | Spec | Use |
|---|---|---|
| `spring-snappy` | spring, stiffness 500, damping 30 | presses, chips, checkboxes |
| `spring-gentle` | spring, stiffness 260, damping 24 | cards entering, sheets, tab blob |
| `pop-in` | scale 0.8→1 + fade, spring-gentle | badges, count changes, hero |
| `stagger-rail` | children stagger 40ms | rail/grid card entrances |
| `slide-step` | x ±24 + fade, 200ms ease-out | cook-mode step transitions |

Rules:
- Screen transitions: subtle — fade+4px rise on route content; tab switches must feel instant (<200ms).
- Celebrations: cook-mode finish = confetti (tamago/dashi/matcha particles, 1.2s, once); shopping list complete = small burst. Never celebrate trivial actions.
- Numbers never jump — always morph/count.
- `prefers-reduced-motion`: springs → 120ms fades, confetti off, count-ups instant. Wrap via a single `useMotionSafe` helper.
- 60fps rule: animate only `transform`/`opacity`; no layout-thrashing animations on lists > 20 items.

## 6. Mascot

**„Dashi"** — a small, round dashi pot (donabe) character with steam-swirl "hair", two dot eyes, tiny arms. Sparse and purposeful: onboarding, empty states, cook-mode progress edge, celebration screens, one footer cameo. Max one mascot appearance per screen. 6–8 poses needed (happy, hungry, cheering, sleeping/empty, thinking, walking, chef-hat, shrugging). Same SVG style as food illustrations.

## 7. Illustration style spec (all ~75 assets)

One consistent, ownable style — this is the app's face. Spec for every dish/ingredient/mascot artwork:

- **Format**: hand-authored SVG (viewBox `0 0 160 160` dishes, `0 0 64 64` ingredient chips). Optimized (SVGO), no raster, no gradients except one optional soft radial for steam/glow.
- **Style**: flat "warm kawaii-deli": bold simple shapes, 2.5px `nori`-colored outlines on main silhouettes, no outlines on tiny details; slightly squashed/rounded proportions (bowls look huggable); 15° top-down tilt so food faces the viewer.
- **Palette**: only design-system colors + a fixed food-supplement set: `#F6C453` (egg/fried), `#D94F30` (salmon/tuna), `#8C5A3A` (soy/brown sauces), `#4C7A43` (greens), `#F2E9DA` (rice — never pure white), `#B03A48` (pickles/ume), `#2E2A26` (nori sheets). No colors outside this set.
- **Composition**: dish centered on a `rice-warm` circle/squircle plate-shadow; steam = 2–3 wavy strokes for hot dishes; chopsticks may lean on bowl; a tiny sparkle ✦ allowed on hero variants only.
- **Faces on food: no.** (Mascot only — keeps it playful, not silly.)
- **Process**: build `oyakodon`, `yaki-udon`, `onigiri` first as the style calibration set; review side by side; lock; then batch-produce. Every asset gets a React component in `src/content/illustrations/` exporting typed `<DishArt id="oyakodon" />` usage.

## 8. Iconography

Custom minimal line icons (2px stroke, rounded caps, `nori`) for: tabs (5), stats (clock, chopsticks-difficulty, basket, euro, chili, pan), equipment set (pan, pot, rice cooker, oven, knife, bowl, whisk, blender), store sections (7), actions (plus, check, trash, drag, timer, search, settings, share, info). Single sprite/component set in `src/components/ui/icons.tsx`. Emojis allowed in *copy* (sparingly), never as functional icons.

## 9. Layout patterns

- Mobile-first 390px; max content width 640px centered on larger screens (the app stays a phone-shaped experience on desktop — with a soft `rice-warm` page background outside the column).
- Safe areas: `env(safe-area-inset-*)` padding on tab bar, sticky CTAs, cook mode; `viewport-fit=cover`.
- Sticky bottom CTAs float above tab bar with gradient-fade backdrop.
- Skeletons: warm-tinted shimmer placeholders matching final layout exactly (no spinners on content).

## 10. Accessibility

- Contrast: all text ≥ 4.5:1 on its background (check `dashi` on `rice` for large text only; body text always `nori`).
- Never color-only meaning: spice/diet/difficulty always icon + count/text.
- Focus-visible rings (`sora`, 2px offset) on all interactive elements; VoiceOver labels for stat pills ("Kochzeit 15 Minuten"), timers announce completion.
- Dynamic type: layout survives 120 % text zoom without truncating steps or amounts.
