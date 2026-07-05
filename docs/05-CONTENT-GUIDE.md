# 05 — Content Guide

Rules for authoring all seed content: 60 recipes, ~120 ingredients, 12+ lexicon entries, 10 mini-guides. Content quality is the product — a beautiful app with vague recipes fails the user.

## 1. Recipe authoring rules

### Authenticity & pragmatism
- Real Japanese dishes and flavor logic (dashi/shoyu/mirin/miso backbone), adapted honestly to German availability. Where an adaptation is made, say so ("Klassisch mit Mitsuba — Frühlingszwiebel funktioniert super").
- No fusion inventions labeled as authentic; "Ramen-Upgrades" and similar hacks are openly framed as hacks.
- Every specialty ingredient must exist in the lexicon and offer a substitute entry (or an honest "kein Ersatz").

### Time honesty (the trust anchor of the whole app)
- `timeMinutes` = realistic total for a slowish beginner, including prep, from standing in the kitchen to eating. Rice from a rice cooker/pot that runs in parallel counts only for its hands-on minutes if the recipe says "Reis zuerst aufsetzen" as step 1.
- Mentally test: could a lazy beginner really hit this? If unsure, round up. A "15-Minuten" label that takes 25 destroys trust.
- `activeMinutes` = hands-on time (Meal-Prep dishes may be 40/15).

### Amounts & servings
- Author for `servingsBase: 2` (default household), metric units, German package reality (a 400-g-Packung Tofu, not 397 g).
- Sauces in EL/TL where cooks actually measure that way; weights for proteins/veg.
- "nach Geschmack" only for garnish/heat, never for structural ingredients.

### Steps (the lazy-beginner contract)
Every step:
1. **One action per step**, max ~2 sentences, imperative du-Form: "Schneide die Frühlingszwiebeln in feine Ringe."
2. **Sensory checkpoints** wherever timing matters: "bis die Zwiebeln glasig sind (ca. 2 Min)", "bis es nussig duftet".
3. **Explicit heat**: "mittlere Hitze (Stufe 6 von 9)" style on first heat mention, then "mittlere Hitze".
4. Explain any technique on first use inline or via `tip` ("Das Ei nur *stocken* lassen heißt: nicht rühren!").
5. `timerSeconds` on every step with a wait ≥ 60 s.
6. First step of any rice dish: "Reis aufsetzen" (linking guide `reis-richtig-kochen`) so it runs in parallel.
7. Amount tokens `{amount:ingredientId}` in step text wherever an amount is repeated, so the portion calculator scales steps too.

### Costs (Germany, 2026)
- Estimate per common German prices: Standard-Supermarkt (Rewe/Edeka price level) for normal items; Asia-Laden/online prices for specialty items. Author `price` on the ingredient once; recipes derive cost.
- Reference anchors (calibrate all prices against these): Reis 10 kg ≈ 22 € (≈ 0,22 €/100 g) · Sojasauce 500 ml ≈ 3,50 € · Mirin 400 ml ≈ 4 € · Miso 500 g ≈ 5 € · Eier ≈ 0,35 €/Stück · Hähnchenschenkel entbeint ≈ 9 €/kg · Tofu 400 g ≈ 2,20 € · Frühlingszwiebeln Bund ≈ 1,10 € · Instant-Ramen ≈ 1,20 €/Packung · Lachsfilet ≈ 25 €/kg.
- Cost badge = derived cost per serving rounded to 10 ct, always "≈".

### Substitutions
- `substitutionNotes` answers the top question a German cook will have for this dish ("Kein Sake? Trockener Weißwein oder einfach weglassen und 1 EL Wasser mehr.").
- Substitute quality is honest: `gleichwertig` / `okay` / `notloesung` — the UI phrases these differently.

## 2. Ingredient list construction (~120 items)

Build `ingredients.ts` **before** any recipe. Buckets:
- **Japanische Basics** (~25): shoyu, mirin, kochsake, miso-hell, miso-rot, dashi-pulver, kombu, katsuobushi, reisessig, sesamöl, panko, nori, wakame, furikake, tonkatsu-sauce, okonomiyaki-sauce, kewpie-mayo, curry-roux, gochujang, sriracha, shichimi, sesam, udon, soba, ramen-instant, somen, sushi-reis…
- **Frische Zutaten** (~40): frühlingszwiebel, ingwer, knoblauch, ei, tofu, hähnchenschenkel, schweinebauch, hackfleisch, lachs, thunfisch-dose, pak-choi, spinat, chinakohl, karotte, zucchini, aubergine, shiitake, champignons, gurke, avocado, edamame-tk, mais, kartoffel, zwiebel, apfel…
- **Vorratsschrank / Gewürze & Öle / Tiefkühl**: reis, mehl, speisestärke, zucker, honig, öl-neutral, butter, milch, sahne, erdnussbutter, tk-gyoza…
- Staples (`isStaple`): salz, pfeffer, zucker, öl-neutral, wasser.
- Mark `perishable` correctly — it drives combos and Reste-Retter (frisches Gemüse, Fleisch/Fisch, Tofu, Kräuter: ja; Trockenes/Saucen: nein).

## 3. Lexicon entries

Written for someone who has *never* been in an Asia-Laden. Formula per entry: 
1 plain-German sentence what it physically is → taste comparison via familiar foods → concrete buying advice with price ("gibt's bei Edeka im Asia-Regal, ca. 4 €; größere Auswahl im Asia-Laden") → honest substitute.

Launch set (minimum): Mirin, Sake (zum Kochen), Miso (hell/rot im selben Eintrag erklärt), Dashi, Kombu, Katsuobushi, Shoyu (inkl. dunkel/hell, vs. deutsche "Sojasauce"), Gochujang (mit `compareWith`: "Gochujang vs. Miso"), Panko (vs. Semmelbrösel), Furikake, Wakame, Nori — plus every additional specialty ingredient any recipe uses (Reisessig, Sesamöl, Curry-Roux, Kewpie-Mayo, Shichimi, Tonkatsu-Sauce…).

Tone example (Mirin): *"Mirin ist süßer Reiswein zum Kochen — quasi der Zucker + Glanz-Booster der japanischen Küche. Schmeckt wie milder Sherry mit Honig. Gibt's im Asia-Regal (ca. 4 €, hält ewig). Ersatz: 1 EL Zucker in 2 EL Weißwein auflösen — okay, aber das Original lohnt sich."*

## 4. Category integrity

Every landing category needs ≥ 5 recipes (target 6–10, overlap encouraged). Category rules enforced by `validate:content` (see 04 §10): time caps for the minute categories, ≤ 5 ingredients for 5-Zutaten (excluding optional + staples), `easy` difficulty for Anfänger, `mealPrepNote` for Meal Prep, veg/vegan diet for Vegetarisch, ≤ 2,50 €/Portion for Günstig, snack-sized for Snacks.

## 5. Mini-guides (10, each ≤ 3 min read)

reis-richtig-kochen · dashi-in-5-minuten · ajitama-ramen-eier · teriyaki-sauce-selbst · miso-richtig-verwenden · udon-soba-ramen · donburi-verstehen · japanisches-curry-erklaert · bento-basics · umami-einfach-erklaert

Structure: hook teaser → 3–7 illustrated steps (each heading + ≤ 3 sentences) → "Wende es an" recipe links. Same beginner tone as steps. No videos, no external links. Guides are referenced from recipes via `guideIds` — every guide must be linked by ≥ 2 recipes so the tab stays integrated but small.

## 6. Illustration production

Per `02-DESIGN-SYSTEM.md` §7. Needed set: 60 dish artworks (1 per recipe) + ~8 mascot poses + ~10 guide/step spot illustrations + empty-state scenes (4) + ingredient chip art for the ~25 Japanese basics (others use emoji fallback). Calibration trio first (oyakodon, yaki-udon, onigiri), lock style, then batch.

## 7. Authoring workflow & review checklist

Order: ingredients.ts → lexicon.ts → recipes (batch 1: 20 covering all categories → batch 2: 20 → batch 3: 20) → guides. Run `pnpm validate:content` after every batch.

Per-recipe review checklist:
- [ ] Cookable from steps alone by a beginner (no implied knowledge)
- [ ] Time honest incl. prep; category time caps hold
- [ ] Amounts consistent between list and step tokens; scales sanely to 1 and 4 portions
- [ ] Cost per serving sane vs. anchors; specialty items have lexicon + substitute
- [ ] Card facts complete: time, difficulty, count, cost, diet, spicy, equipment
- [ ] Subtitle makes hungry; intro ≤ 2 sentences; German du-Form throughout
