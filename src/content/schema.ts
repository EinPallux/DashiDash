import { z } from "zod";

/**
 * Content schemas — the single source of truth (docs/04-DATA-MODEL). Every
 * content module (`ingredients.ts`, `lexicon.ts`, `recipes/*`, `guides.ts`)
 * is typed against these; `scripts/validate-content.ts` enforces the schemas
 * plus cross-entity referential integrity (docs/04 §10) in CI + prebuild.
 *
 * IDs are kebab-case slugs, stable forever — user pantry/plans reference them.
 */

/* -------------------------------- Enums -------------------------------- */

export const Category = z.enum([
  "15-minuten",
  "20-minuten",
  "5-zutaten",
  "anfaenger",
  "meal-prep",
  "ramen-upgrades",
  "donburi",
  "fruehstueck",
  "vegetarisch",
  "guenstig",
  "snacks",
]);
export type Category = z.infer<typeof Category>;

export const Diet = z.enum(["fleisch", "fisch", "vegetarisch", "vegan"]);
export type Diet = z.infer<typeof Diet>;

/** 1..3 for the chopstick icons on cards. */
export const Difficulty = z.enum(["easy", "mittel", "fortgeschritten"]);
export type Difficulty = z.infer<typeof Difficulty>;

export const Equipment = z.enum([
  "pfanne",
  "topf",
  "kleiner-topf",
  "reiskocher-oder-topf",
  "ofen",
  "schneidebrett",
  "schuessel",
  "sieb",
  "reibe",
  "stabmixer",
  "wasserkocher",
]);
export type Equipment = z.infer<typeof Equipment>;

export const StoreSection = z.enum([
  "obst-gemuese",
  "fleisch-fisch",
  "kuehlregal",
  "asia-regal",
  "trockenwaren",
  "tiefkuehl",
  "sonstiges",
]);
export type StoreSection = z.infer<typeof StoreSection>;

/** Pantry grouping (docs/04 §1). */
export const IngredientCategory = z.enum([
  "japanische-basics",
  "frische-zutaten",
  "vorratsschrank",
  "gewuerze-oele",
  "tiefkuehl",
]);
export type IngredientCategory = z.infer<typeof IngredientCategory>;

export const Unit = z.enum([
  "g",
  "kg",
  "ml",
  "l",
  "el",
  "tl",
  "stueck",
  "zehe",
  "bund",
  "blatt",
  "packung",
  "dose",
  "prise",
  "nach-geschmack",
]);
export type Unit = z.infer<typeof Unit>;

export const SubstituteQuality = z.enum(["gleichwertig", "okay", "notloesung"]);
export type SubstituteQuality = z.infer<typeof SubstituteQuality>;

/* ------------------------------ Ingredient ----------------------------- */

export const Substitute = z.object({
  /** Another ingredient… */
  ingredientId: z.string().optional(),
  /** …or free text: "1 EL Zucker + 1 EL Weißwein". */
  text: z.string(),
  quality: SubstituteQuality,
});
export type Substitute = z.infer<typeof Substitute>;

export const Price = z.object({
  /** Reference amount, e.g. 100 (per 100 g) or 1 (per Stück). */
  amount: z.number().positive(),
  unit: Unit,
  /** Price for the reference amount, EUR. */
  eur: z.number().nonnegative(),
  /** Typical pack price, for "was kostet der Einkauf". */
  packEur: z.number().nonnegative().optional(),
  /** "500-ml-Flasche". */
  packNote: z.string().optional(),
});
export type Price = z.infer<typeof Price>;

export const Ingredient = z.object({
  id: z.string(),
  name: z.string(),
  namePlural: z.string().optional(),
  /** For chips where no SVG exists yet. */
  emoji: z.string().optional(),
  category: IngredientCategory,
  section: StoreSection,
  /** "🏮 Am besten im Asia-Laden". */
  asiaLadenHint: z.boolean().default(false),
  /** Assumed available (Salz, Öl, Zucker, Pfeffer, Wasser). */
  isStaple: z.boolean().default(false),
  /** Drives combo-overlap + Reste-Retter quick picks. */
  perishable: z.boolean().default(false),
  /** Links to a LexiconEntry (required for specialty items — see validator). */
  lexiconId: z.string().optional(),
  /** Ordered by quality. */
  substitutes: z.array(Substitute).default([]),
  price: Price,
});
export type Ingredient = z.infer<typeof Ingredient>;

/* -------------------------------- Recipe ------------------------------- */

export const RecipeIngredient = z.object({
  ingredientId: z.string(),
  /** null for "nach Geschmack". */
  amount: z.number().nullable(),
  unit: Unit,
  /** "in feine Ringe". */
  note: z.string().optional(),
  group: z.string().default("Hauptzutaten"),
  optional: z.boolean().default(false),
  /** false: doesn't scale linearly (e.g. Öl zum Braten). */
  scalable: z.boolean().default(true),
});
export type RecipeIngredient = z.infer<typeof RecipeIngredient>;

export const Step = z.object({
  /** May contain {amount:ingredientId} tokens → live-scaled in the UI. */
  text: z.string(),
  /** "💡" callout. */
  tip: z.string().optional(),
  timerSeconds: z.number().int().positive().optional(),
  /** "⚠️ Hitze runter!" style warning. */
  attention: z.string().optional(),
});
export type Step = z.infer<typeof Step>;

export const Recipe = z.object({
  id: z.string(),
  title: z.string(),
  titleJp: z.string().optional(),
  /** Appetite one-liner for cards. */
  subtitle: z.string(),
  /** 1–2 sentences on the detail page. */
  intro: z.string(),
  categories: z.array(Category).min(1),
  /** Search synonyms: ["reisschüssel", "hähnchen", "ei"]. */
  tags: z.array(z.string()).default([]),
  /** Honest total incl. prep, excl. rice-cooker wait if parallel. */
  timeMinutes: z.number().int().positive(),
  /** Hands-on time (shown as "davon aktiv: X"). */
  activeMinutes: z.number().int().positive(),
  difficulty: Difficulty,
  diet: Diet,
  spicy: z.number().int().min(0).max(3),
  /** Amounts are authored for this (usually 2). */
  servingsBase: z.number().int().positive(),
  ingredients: z.array(RecipeIngredient).min(1),
  equipment: z.array(Equipment),
  steps: z.array(Step).min(1),
  /** Footer box. */
  substitutionNotes: z.string().optional(),
  /** Linked mini-guides. */
  guideIds: z.array(z.string()).default([]),
  /** DishArt id. */
  illustrationId: z.string(),
  /** Storage/reheat — required for meal-prep category (validator). */
  mealPrepNote: z.string().optional(),
});
export type Recipe = z.infer<typeof Recipe>;

/* --------------------------- Lexicon & Guides -------------------------- */

export const LexiconEntry = z.object({
  id: z.string(),
  term: z.string(),
  termJp: z.string().optional(),
  /** 1–2 sentences, zero jargon. */
  whatIsIt: z.string(),
  tastesLike: z.string(),
  /** Supermarkt vs. Asia-Laden vs. online + typical price. */
  whereToBuy: z.string(),
  /** Honest, or "Kein guter Ersatz — die 4 € lohnen sich." */
  substitute: z.string(),
  /** "Gochujang vs. Miso" style comparisons. */
  compareWith: z.string().optional(),
});
export type LexiconEntry = z.infer<typeof LexiconEntry>;

export const GuideStep = z.object({
  heading: z.string(),
  text: z.string(),
  illustrationId: z.string().optional(),
});
export type GuideStep = z.infer<typeof GuideStep>;

export const Guide = z.object({
  id: z.string(),
  title: z.string(),
  emoji: z.string(),
  /** Card one-liner. */
  teaser: z.string(),
  /** Reading time, keep ≤ 3. */
  minutes: z.number().int().positive(),
  steps: z.array(GuideStep).min(3).max(7),
  /** "Wende es an:". */
  recipeIds: z.array(z.string()).default([]),
});
export type Guide = z.infer<typeof Guide>;

/* ------------------------------ Category meta -------------------------- */

export const CategoryMeta = z.object({
  id: Category,
  title: z.string(),
  tagline: z.string(),
  emoji: z.string(),
  /** Rail order on Entdecken. */
  order: z.number().int(),
});
export type CategoryMeta = z.infer<typeof CategoryMeta>;
