# 04 — Data Model & Algorithms

All schemas defined once in `src/content/schema.ts` with Zod; types inferred (`z.infer`). Content modules must `satisfies` these types so the compiler catches broken references at build time, and `pnpm validate:content` enforces cross-entity integrity.

## 1. Enums

```ts
const Category = z.enum([
  "15-minuten", "20-minuten", "5-zutaten", "anfaenger", "meal-prep",
  "ramen-upgrades", "donburi", "fruehstueck", "vegetarisch", "guenstig", "snacks",
]);
const Diet = z.enum(["fleisch", "fisch", "vegetarisch", "vegan"]);
const Difficulty = z.enum(["easy", "mittel", "fortgeschritten"]); // 1..3 for icons
const Equipment = z.enum([
  "pfanne", "topf", "kleiner-topf", "reiskocher-oder-topf", "ofen",
  "schneidebrett", "schuessel", "sieb", "reibe", "stabmixer", "wasserkocher",
]);
const StoreSection = z.enum([
  "obst-gemuese", "fleisch-fisch", "kuehlregal", "asia-regal",
  "trockenwaren", "tiefkuehl", "sonstiges",
]);
const IngredientCategory = z.enum([
  "japanische-basics", "frische-zutaten", "vorratsschrank",
  "gewuerze-oele", "tiefkuehl",
]); // pantry grouping
const Unit = z.enum([
  "g", "kg", "ml", "l", "el", "tl", "stueck", "zehe", "bund",
  "blatt", "packung", "dose", "prise", "nach-geschmack",
]);
```

## 2. Ingredient

```ts
const Ingredient = z.object({
  id: z.string(),                  // kebab-case, stable forever: "mirin", "fruehlingszwiebel"
  name: z.string(),                // "Mirin"
  namePlural: z.string().optional(),
  emoji: z.string().optional(),    // for chips where no SVG exists yet
  category: IngredientCategory,    // pantry grouping
  section: StoreSection,           // shopping list grouping
  asiaLadenHint: z.boolean().default(false), // "🏮 Am besten im Asia-Laden"
  isStaple: z.boolean().default(false),      // assumed available (Salz, Öl, Zucker, Pfeffer, Wasser)
  perishable: z.boolean().default(false),    // drives combo-overlap + Reste-Retter quick picks
  lexiconId: z.string().optional(),          // links to LexiconEntry (required for specialty items)
  substitutes: z.array(z.object({            // ordered by quality
    ingredientId: z.string().optional(),     // another ingredient…
    text: z.string(),                        // …or free text: "1 EL Zucker + 1 EL Weißwein"
    quality: z.enum(["gleichwertig", "okay", "notloesung"]),
  })).default([]),
  price: z.object({                          // German price estimation
    amount: z.number(),                      // e.g. 100
    unit: Unit,                              // per 100 g / per stueck …
    eur: z.number(),                         // 0.89
    packEur: z.number().optional(),          // typical pack price, for "was kostet der Einkauf"
    packNote: z.string().optional(),         // "500-ml-Flasche"
  }),
});
```

~120 ingredients expected. IDs referenced by recipes, pantry, shopping — never rename.

## 3. Recipe

```ts
const RecipeIngredient = z.object({
  ingredientId: z.string(),
  amount: z.number().nullable(),   // null for "nach Geschmack"
  unit: Unit,
  note: z.string().optional(),     // "in feine Ringe"
  group: z.string().default("Hauptzutaten"),  // "Sauce", "Topping" …
  optional: z.boolean().default(false),
  scalable: z.boolean().default(true),        // false: doesn't scale linearly (e.g. Öl zum Braten)
});

const Step = z.object({
  text: z.string(),                // may contain {amount:ingredientId} tokens → live-scaled in UI
  tip: z.string().optional(),      // "💡" callout
  timerSeconds: z.number().optional(),
  attention: z.string().optional(),// "⚠️ Hitze runter!" style warning
});

const Recipe = z.object({
  id: z.string(),                  // slug: "oyakodon"
  title: z.string(),               // "Oyakodon"
  titleJp: z.string().optional(),  // "親子丼"
  subtitle: z.string(),            // appetite one-liner for cards
  intro: z.string(),               // 1–2 sentences on detail page
  categories: z.array(Category).min(1),
  tags: z.array(z.string()).default([]),      // search synonyms: ["reisschüssel", "hähnchen", "ei"]
  timeMinutes: z.number(),          // honest total incl. prep, excl. rice-cooker wait if parallel
  activeMinutes: z.number(),        // hands-on time (shown as "davon aktiv: X")
  difficulty: Difficulty,
  diet: Diet,
  spicy: z.number().min(0).max(3),
  servingsBase: z.number(),         // amounts are authored for this (usually 2)
  ingredients: z.array(RecipeIngredient).min(1),
  equipment: z.array(Equipment),
  steps: z.array(Step).min(1),
  substitutionNotes: z.string().optional(),   // footer box
  guideIds: z.array(z.string()).default([]),  // linked mini-guides
  illustrationId: z.string(),                 // DishArt id
  mealPrepNote: z.string().optional(),        // storage/reheat, required for meal-prep category
});
```

Derived (computed at build/runtime, never authored): `ingredientCount` (non-optional entries), `costPerServing` (Σ amount × ingredient price ÷ servingsBase — see `lib/costs.ts`; staples priced at 0), cost badge rounding to 10 ct with "≈".

## 4. Lexicon & Guides

```ts
const LexiconEntry = z.object({
  id: z.string(),                  // "mirin"
  term: z.string(),                // "Mirin"
  termJp: z.string().optional(),
  whatIsIt: z.string(),            // 1–2 sentences, zero jargon
  tastesLike: z.string(),          // "Süßer, milder Reiswein — wie ein Mix aus Sherry und Honig"
  whereToBuy: z.string(),          // Supermarkt vs. Asia-Laden vs. online + typical price
  substitute: z.string(),          // honest, or "Kein guter Ersatz — die 4 € lohnen sich."
  compareWith: z.string().optional(), // "Gochujang vs. Miso" style comparisons
});

const Guide = z.object({
  id: z.string(),                  // "reis-richtig-kochen"
  title: z.string(),
  emoji: z.string(),
  teaser: z.string(),              // card one-liner
  minutes: z.number(),             // reading time, keep ≤ 3
  steps: z.array(z.object({ heading: z.string(), text: z.string(), illustrationId: z.string().optional() })).min(3).max(7),
  recipeIds: z.array(z.string()).default([]), // "Wende es an:"
});
```

## 5. User data (Dexie tables)

```ts
PantryItem   { ingredientId: string; addedAt: number }
PlannedMeal  { id?: number; date: string /* YYYY-MM-DD */; slot: "fruehstueck"|"mittag"|"abend";
               recipeId: string; servings: number }
ShoppingItem { id?: number; ingredientId: string | null; freeText?: string;
               amount: number | null; unit: Unit | null;
               sources: { recipeId: string; servings: number }[];  // provenance for "für Oyakodon + …"
               checked: boolean; addedAt: number }
CookedEntry  { id?: number; recipeId: string; date: string; servings: number }
Setting      { key: string; value: unknown }   // defaultServings, staplesOverride, onboardingDone …
```

## 6. Pantry matching (`lib/matching.ts`)

```
matchRecipe(recipe, pantrySet, staplesSet) → {
  tier: "ready" | "almost" | "far",
  missing: MissingItem[],          // resolved after substitutes
  coverage: number,                // 0..1 over required ingredients
}
```

Rules:
1. Consider only non-`optional` recipe ingredients.
2. An ingredient counts as available if: in pantry, OR `isStaple` (and not user-disabled), OR any substitute with quality ≥ `okay` whose `ingredientId` is in pantry.
3. `ready` = 0 missing. `almost` = 1–2 missing. Else `far`.
4. Sort within tiers: fewest missing → cheapest missing (sum of pack prices) → shortest time.
5. Vorrat header count = number of `ready` recipes. "Fast machbar" cards show the missing items by name with pack price ("Fehlt nur: Mirin · ≈ 3,50 €") + add-to-list shortcut.
6. Substitute matches surface a hint on the recipe ("Du kannst Sake mit trockenem Weißwein ersetzen ✨").

## 7. Portion scaling (`lib/scaling.ts`)

`scale(amount, unit, factor)` with unit-aware rounding:

| Unit | Rounding |
|---|---|
| g / ml | < 100 → nearest 5; ≥ 100 → nearest 10 |
| kg / l | 2 decimals |
| el / tl | nearest 0.5, rendered "1 ½ EL" |
| stueck (eggs etc.) | nearest 0.5, "2 ½ Eier"; if `scalable:false` keep base |
| zehe / bund / blatt / packung / dose | nearest 0.5, min 0.5 |
| prise / nach-geschmack | never scale, render as-is |

Fraction rendering: 0.5 → ½, 0.25 → ¼ (only halves/quarters allowed). Step-text `{amount:x}` tokens use the same function so steps always match the ingredient list. Property-based tests: scaling to base factor 1 is identity; monotonic in factor.

## 8. Smart combos (`lib/combos.ts`)

Goal: propose sets of k recipes (k = 2..5) that share perishable ingredients, so one shopping trip covers several meals with minimal waste.

```
suggestCombos({ k, constraints: { maxTimePerMeal?, diet?, maxBudgetTotal? }, pantrySet })
  → ComboSuggestion[]   // top 3
ComboSuggestion = { recipeIds, sharedIngredients: string[], estCostTotal,
                    estSavedEur, shoppingItemCount }
```

Algorithm (60 recipes — brute force is nearly viable; use greedy beam for headroom):
1. Filter recipe pool by constraints.
2. Overlap score for a set = Σ over ingredients used by ≥ 2 recipes of `weight(ingredient)`, where weight = pack price × (perishable ? 1.5 : 0.5). Perishables dominate on purpose (that's the waste story).
3. Beam search: seed with top-20 pairs by pairwise overlap, extend each beam by best-scoring next recipe, beam width 10, dedupe sets; penalize sets where 2 recipes are near-identical (≥ 80 % same ingredients) and reward diet/category variety.
4. Pantry-aware: ingredients already in pantry boost the score (shopping shrinks) but don't count toward `estSavedEur`.
5. `estSavedEur` = Σ over shared ingredients of (pack price − proportional use) — honest framing "sparst ca. X, weil nichts wegfliegt", labeled "grobe Schätzung".
6. Deterministic given same inputs (stable sort keys), so the screen doesn't reshuffle on re-render.

Unit tests with a fixture pool asserting: shared ingredients actually shared, constraints respected, determinism, k respected.

## 9. Shopping aggregation (`lib/shopping.ts`)

1. Inputs: planned meals (recipe × servings), single-recipe adds, "missing" quick-adds, manual free-text.
2. Scale each recipe's non-optional ingredients to servings; skip staples; skip pantry items (collect them under "Hast du schon ✓").
3. Merge by `ingredientId` with unit normalization (g+kg, ml+l; el/tl kept as-is — mixed-unit merges list both parts: "400 g + 2 EL").
4. Attach `sources` for the "für Oyakodon + Teriyaki" subtitle.
5. Group by `section`, order: obst-gemuese → fleisch-fisch → kuehlregal → asia-regal → trockenwaren → tiefkuehl → sonstiges.
6. Estimated total = Σ pack-aware estimates: if needed amount ≤ typical pack, count pack price once across the list (buying a Mirin bottle covers all recipes).

## 10. Referential integrity (validate:content checks)

- Every `RecipeIngredient.ingredientId`, `substitutes[].ingredientId`, `guideIds`, `lexiconId`, `illustrationId`, `Guide.recipeIds` resolves.
- Every ingredient with `asiaLadenHint` or category `japanische-basics` has a `lexiconId`.
- Every category has ≥ 5 recipes; catalog total = 60; slugs unique across entities.
- Every `meal-prep` recipe has `mealPrepNote`; every recipe with `spicy > 0` mentions the spice source in ingredients.
- Every recipe's `timeMinutes ≥ activeMinutes`; `15-minuten` recipes have `timeMinutes ≤ 15` (and `20-minuten` ≤ 20); `5-zutaten` recipes have ≤ 5 non-optional, non-staple ingredients.
