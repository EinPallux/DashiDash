# 01 — Product Spec

## 1. Vision

**DashiDash** answers one question in under 30 seconds: *"Was koche ich jetzt — schnell, japanisch, lecker?"*

Primary user: a single, self-described lazy home cook in Germany who loves Japanese food and wants authentic-tasting results with minimal effort, minimal shopping friction, and minimal food waste. The app is opinionated: it always pushes toward *fast*, *few ingredients*, *cheap*, *doable tonight*.

Product principles, in priority order:
1. **Appetite first.** Opening the app should feel like opening a great food menu, not a database.
2. **Fewest taps to cooking.** Home → Recipe → "Los geht's" (cook mode) is the golden path.
3. **The pantry is the brain.** Everything (matching, shopping, planning, leftovers) revolves around what the user has at home.
4. **Explain, never intimidate.** Japanese ingredients and techniques are demystified inline, exactly where confusion happens.
5. **Playful, not childish.** Duolingo-grade delight: tactile, springy, rewarding — applied to cooking.

Out of scope for v1: accounts, social features, comments/ratings by others, recipe import, calorie tracking, notifications/push, more than one language.

## 2. Platform

- PWA, installable on iPhone home screen (standalone mode). Also works fine in desktop browsers, but every layout decision is mobile-first at 390×844.
- Fully offline after first load (all content bundled, user data in IndexedDB).
- Deployed on Vercel.

## 3. Navigation

Bottom tab bar (5 tabs, iOS-style, always visible except in cook mode):

| Tab | Icon idea | Route | Purpose |
|---|---|---|---|
| **Entdecken** | steaming bowl | `/` | Landing page, categories, appetite |
| **Vorrat** | cupboard/jar | `/vorrat` | Pantry + "X Rezepte möglich" + Reste-Retter |
| **Planen** | calendar | `/planen` | Weekly meal planner + smart combos |
| **Einkaufen** | shopping bag | `/einkaufen` | Smart shopping list |
| **Lernen** | graduation onigiri | `/lernen` | Mini-guides + Zutaten-Lexikon (small tab, no growth) |

Global elements: search is reached from a prominent search field/button on Entdecken (route `/suche`), not its own tab. Settings behind a small gear on Entdecken (`/einstellungen`).

## 4. Screens

### 4.1 Entdecken (Home / Landing) — `/`

The shop window. Structure top to bottom:

1. **Header**: greeting by time of day ("Guten Morgen! 🍳", "Was gibt's heute Abend?"), settings gear.
2. **Hero card — "Heute schnell"**: one rotating featured recipe (deterministic by date), big illustration, time badge, one-tap to recipe. Springs in on load.
3. **Pantry teaser** (only when pantry has items): "✨ 12 Rezepte mit deinem Vorrat möglich" → deep-links to Vorrat matches.
4. **Search field** (tap → `/suche` with keyboard open).
5. **Category rails** — horizontally scrollable rows of recipe cards, in this order:
   - ⚡ 15-Minuten-Gerichte
   - ⏱️ 20-Minuten-Gerichte
   - 🖐️ 5-Zutaten-Rezepte
   - 🌱 Für Anfänger
   - 🍱 Meal Prep
   - 🍜 Ramen-Upgrades
   - 🍚 Donburi & Reisschüsseln
   - 🍳 Japanisches Frühstück
   - 🥦 Vegetarisch
   - 💶 Günstig & gut
   - 🍙 Snacks
   Each rail: title + "Alle →" link to filtered grid (`/kategorie/[slug]`). A recipe may appear in multiple rails.
6. Footer flourish: small mascot + rotating food pun (see §11).

Category pages (`/kategorie/[slug]`): grid of recipe cards, filter bar on top (see 4.3 filters), sorted by time ascending by default.

### 4.2 Recipe Card (component, used everywhere)

Two sizes: **rail card** (compact, ~160px wide) and **grid/list card** (full width). Every card always shows:

- Illustration (dish art)
- Title (German name + optional Japanese subtitle, e.g. "Oyakodon · 親子丼")
- **Zeit** (e.g. "15 Min")
- **Schwierigkeit** (1–3, shown as filled chili-free icons: 🥢 "Easy" / 🥢🥢 / 🥢🥢🥢)
- **Zutatenanzahl** (e.g. "6 Zutaten")
- **Kosten** (per portion, German prices: "≈ 2,80 € / Portion")
- **Diät-Badge**: 🍗 Protein / 🥕 Vegetarisch / 🌱 Vegan
- **Schärfe**: 0–3 chilis (0 = no icon)
- **Equipment count/icons** on grid cards (pan, pot, rice cooker…); rail cards show it on the detail page only if space is tight — but never drop time/difficulty/cost.

Cards are pressable with a satisfying squash-and-release; whole card navigates.

### 4.3 Suche & Filter — `/suche`

- Instant fuzzy search over title, Japanese name, ingredients, tags (client-side, e.g. simple normalized substring + synonym map; no external service).
- **Filter chips** (multi-select, horizontally scrollable, active chips colored):
  - Zeit: ≤ 15 / ≤ 20 / ≤ 30 / ≤ 45 Min
  - Schwierigkeit: Easy / Mittel / Fortgeschritten
  - Ernährung: Vegetarisch / Vegan / Fisch / Fleisch
  - Schärfe: mild / mittel / scharf (filter = "maximal")
  - Zutaten: ≤ 5 / ≤ 8
  - Kosten: ≤ 2 € / ≤ 3,50 € / ≤ 5 € pro Portion
  - Equipment: "nur eine Pfanne", "ohne Reiskocher", "ohne Ofen"
  - Kategorie (the 11 landing categories)
- Result count updates live with a small count-up animation. Empty state: mascot + "Nichts gefunden — probier weniger Filter. Oder bestell Sushi. 😌"

### 4.4 Rezept-Detail — `/rezept/[slug]`

1. **Hero**: large illustration, title + Japanese name, category chips.
2. **Stat row**: the 7 card facts as tappable stat pills (time, difficulty, ingredient count, cost, diet, spice, equipment). Tapping equipment expands the full equipment list.
3. **Intro**: 1–2 sentences of appetite + context ("Das japanische Soulfood-Omelett über Reis — cremig, warm, in 15 Minuten.").
4. **Portionsrechner**: stepper `− 2 Portionen +` (1–8). All amounts everywhere rescale live with a smooth number-morph animation. Sensible rounding per unit rules (see 04-DATA-MODEL §7).
5. **Zutatenliste**: grouped (Hauptzutaten / Sauce / Topping). Each row: amount · unit · name.
   - Japanese specialty ingredients render with a dotted-underline + ⓘ; tap opens a **Lexikon bottom sheet** (what it is, tastes like, where to buy in Germany, substitute) without leaving the recipe.
   - Pantry-aware ticks: ✓ green "hast du" if in pantry, ○ neutral otherwise.
   - Button: **"Fehlendes auf die Einkaufsliste"** (adds only missing items, with count badge feedback flying to the Einkaufen tab).
   - Optional ingredients marked "(optional)" and excluded from the ingredient count shown on cards.
6. **Equipment**: icon list ("1 Pfanne, 1 kleiner Topf, Reiskocher oder Topf").
7. **Schritte (preview)**: numbered steps, short version.
8. Sticky bottom CTA: **"Los geht's 🔥"** → Kochmodus.
9. Footer: substitutions box ("Kein Mirin? → …"), linked mini-guide chips ("Reis richtig kochen"), "Passt dazu" (2–3 recipe cards sharing perishable ingredients — supports the save-money story).

### 4.5 Kochmodus — `/rezept/[slug]/kochen`

Full-screen, tab bar hidden, screen-wake-lock requested (with iOS fallback: just ask user to keep screen on if API unavailable).

- One step per screen, huge readable text, current-step progress bar ("Schritt 3 von 7") with the mascot walking along it.
- Swipe or big arrow buttons to navigate; steps can embed **inline timers** ("6 Min köcheln" → tap to start a ring-countdown with subtle tick animation; timer keeps running across steps; local sound/vibrate on finish where supported).
- Amounts inside step text are pre-scaled to selected portions.
- Step tips render as small callouts ("💡 Nicht rühren! Das Ei soll stocken, nicht Rührei werden.").
- Final screen: confetti burst 🎉, "Itadakimasu!", buttons: "Zutaten aus dem Vorrat abhaken" (decrements/unchecks used fresh ingredients — one tap, optional) and "Fertig".

### 4.6 Vorrat (Pantry) — `/vorrat`

- **Header stat**: big animated number — "**14 Rezepte** kannst du jetzt kochen" (count of recipes with match score ≥ ready threshold, see 04-DATA-MODEL §6). Number counts up when it changes.
- **Checklist UI**, grouped by ingredient category (Japanische Basics / Frische Zutaten / Vorratsschrank / Gewürze & Öle / Tiefkühl). Each row: illustration chip + name + toggle. Search field on top to quickly find/toggle.
- First-run: a friendly setup flow "Was hast du zu Hause?" pre-highlighting the ~15 most common staples for one-tap adding.
- **Staples assumption**: Salz, Pfeffer, Zucker, Öl, Wasser are assumed always available (visible but pre-checked; can be unchecked).
- **Match sections** below the checklist:
  - 🟢 **"Sofort machbar"** — 100 % coverage (with substitutes allowed).
  - 🟡 **"Fast machbar — 1–2 Zutaten fehlen"** — cards show exactly what's missing ("Fehlt nur: Mirin") + one-tap add-to-shopping-list.
- **Reste-Retter** (leftovers planner) lives here as a prominent card/button: "🥕 Reste retten" → `/vorrat/reste`:
  - User picks 1–4 ingredients that must be used up (quick-pick grid of perishables from pantry + search for anything else).
  - Result: recipes ranked by (uses the selected leftovers) × (pantry coverage) × (speed). Header: "Rette deine Zucchini! 3 Ideen:".

### 4.7 Planen (Weekly Planner) — `/planen`

- **Week strip** (Mo–So, current week ± next week), each day has slots (default: Abendessen; user can add Mittag/Frühstück per day).
- Add recipe to a slot via "+" → recipe picker (search + filters + "aus Vorrat machbar" toggle). Per-slot portion override.
- Planned recipes appear as mini cards; drag to another day (long-press) or swipe to remove.
- **Smart Kombi-Planung** — the money/waste saver, one hero button: **"✨ Plane clever"** → `/planen/kombi`:
  - User picks: number of meals (2–5), constraints (max time, vegetarian, budget).
  - App proposes **ingredient-overlapping recipe sets** (see 04-DATA-MODEL §8): e.g. "Diese 3 Gerichte teilen sich 7 Zutaten — du sparst ca. 6,40 € und wirfst nichts weg."
  - Shows the set with shared-ingredient visualization (chips connecting the recipes) + total estimated cost + one tap **"Übernehmen"** → fills planner slots + offers shopping list generation.
- Bottom summary: "Diese Woche: 4 Gerichte · ≈ 15,20 € · Ø 19 Min".

### 4.8 Einkaufen (Shopping List) — `/einkaufen`

- Generated from: planner ("Woche einkaufen" button), individual recipes, missing-ingredient one-taps, and manual free-text items.
- **Pantry-aware**: anything already in pantry is excluded automatically (shown collapsed under "Hast du schon ✓" for transparency).
- **Aggregated**: same ingredient across recipes merges with summed amounts ("400 g Hähnchenschenkel — für Oyakodon + Teriyaki").
- **Grouped by store section**: Obst & Gemüse / Fleisch & Fisch / Kühlregal / Asia-Regal bzw. Asia-Laden / Trockenwaren / Tiefkühl / Sonstiges. The Asia-Laden group carries a hint when an item is rarely found in normal supermarkets ("🏮 Am besten im Asia-Laden").
- Check-off with a juicy checkbox animation; checked items slide to the bottom group. Progress bar "8 / 14". Completion: mini-celebration.
- Estimated total at top: "≈ 23,40 €" (sum of item price estimates; labeled "grobe Schätzung").
- List persists until cleared; "Erledigte entfernen" and "Liste leeren" actions. Checked shoppable items offer "In den Vorrat übernehmen" (bulk one-tap after shopping).

### 4.9 Lernen — `/lernen` (deliberately small)

Single scrollable page, two sections. No sub-navigation depth beyond detail pages, no progress tracking, no gamification levels — it must stay a light side feature.

1. **Mini-Guides** (10 at launch, see 05-CONTENT-GUIDE §5): compact illustrated cards → guide page with short intro + 3–7 illustrated steps + linked recipes. The launch set:
   Reis richtig kochen · Dashi in 5 Minuten · Perfekte Ramen-Eier (Ajitama) · Teriyaki-Sauce selbst machen · Miso richtig verwenden · Udon vs. Soba vs. Ramen · Donburi verstehen · Japanisches Curry erklärt · Bento-Basics · Umami einfach erklärt
2. **Zutaten-Lexikon**: alphabetical chip grid of Japanese ingredients (min. 12 launch entries: Mirin, Sake (zum Kochen), Miso, Dashi, Kombu, Katsuobushi, Shoyu, Gochujang (inkl. "Gochujang vs. Miso"), Panko, Furikake, Wakame, Nori — plus every specialty ingredient used by any recipe). Each entry (also used by the recipe ⓘ sheets):
   - Was ist das? (1–2 sentences, zero jargon)
   - Schmeckt wie… (relatable comparison)
   - Wo kaufen? (Supermarkt vs. Asia-Laden vs. online, typical price)
   - Ersatz: honest substitute or "kein guter Ersatz — lohnt sich zu kaufen"
   - "Rezepte damit" links

### 4.10 Einstellungen — `/einstellungen`

Minimal: default portions (used as initial value everywhere), Haushalts-Staples edit, data export/import (JSON file download/upload of all IndexedDB data — the local-first safety net), "App installieren" instructions for iOS (since iOS has no install prompt), reset options, about/credits.

## 5. Onboarding (first launch only)

3 quick screens, skippable, mascot-led: (1) "Schnelle japanische Küche, ohne Stress" (2) "Sag mir, was du zu Hause hast" → optional express pantry setup (staple quick-picks) (3) "Als App installieren" iOS add-to-home-screen hint. Then straight to Entdecken.

## 6. The golden paths (optimize these relentlessly)

1. **Hungry now**: Entdecken → 15-Min rail → recipe → Los geht's. ≤ 4 taps.
2. **What can I make?**: Vorrat → Sofort machbar → recipe → cook. ≤ 4 taps.
3. **Shopping trip**: Planen → Plane clever → Übernehmen → Einkaufsliste → shop. ≤ 5 taps.
4. **Confused by ingredient**: any recipe → tap ⓘ on Mirin → understand in 10 seconds → back (sheet dismiss, context preserved).

## 7. Recipe content requirements (summary — full rules in 05-CONTENT-GUIDE)

- 60 recipes at launch per `06-RECIPE-CATALOG.md`; every landing category has ≥ 5 entries (overlap allowed and encouraged).
- Authentic but pragmatic: real Japanese dishes and flavor logic, adapted to German supermarket availability; substitutions always offered for hard-to-find items.
- Steps written for absolute beginners: what to see/smell/hear ("bis es nussig duftet"), explicit heat levels, explicit pan sizes, no unexplained technique words.

## 8. Non-functional requirements

- Lighthouse: PWA installable, Performance ≥ 90 mobile, no CLS on Entdecken.
- First load JS budget: keep initial route lean (rails virtualized/lazy where sensible); illustrations as optimized inline SVG or static assets, not raster.
- All interactions respond < 100 ms with visual feedback; `prefers-reduced-motion` honored globally.
- Works with JS storage limits of iOS Safari (IndexedDB persists; warn in settings that clearing Safari data wipes the app, export exists).

## 9. Empty & edge states (never ship a blank div)

Every list screen has a designed empty state with mascot + one-line German joke + primary action. Examples: empty pantry ("Dein Vorrat ist so leer wie mein Magen. Leg los!"), empty planner, empty shopping list, no search results, offline-first-visit fallback.

## 10. Analytics / tracking

None. No cookies, no third-party scripts. (Vercel's default request logs only.)

## 11. Tone of voice (German UI copy)

- **Du-Form**, immer. Kurz, warm, mit Augenzwinkern. Nie belehrend.
- Food-Puns erlaubt, aber max. einer pro Screen ("Miso happy dich zu sehen" — sparsam dosieren).
- Fachbegriffe japanisch nennen, sofort übersetzen: "Ajitama (marinierte Ramen-Eier)".
- Fehler/Leerzustände: humorvoll, nie technisch ("Ups, da ist der Reis angebrannt. Versuch's nochmal.").
- CTA-Verben konkret: "Los geht's", "Rette deine Reste", "Plane clever", "Ab auf die Liste".
