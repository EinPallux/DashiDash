import type {
  Category,
  Diet,
  Difficulty,
  Ingredient,
  Recipe,
} from "@/content/schema";
import { costPerServing } from "@/lib/costs";

/**
 * Client-side search + filters (docs/03 §6.5, docs/01 §4.3). No dependency —
 * diacritic/case-normalized substring over title, Japanese name, tags and
 * ingredient names, plus a small synonym map to bridge everyday German/English
 * words to the canonical ingredients. 60 recipes → linear scan is plenty.
 */

/** Lowercase, strip diacritics, ß→ss, collapse to single-spaced a-z0-9. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** query token → extra terms it should also match. */
const SYNONYMS: Record<string, string[]> = {
  chicken: ["hahnchen", "huhn"],
  huhn: ["hahnchen"],
  egg: ["ei"],
  eggs: ["ei", "eier"],
  rice: ["reis"],
  noodles: ["nudeln", "udon", "ramen", "soba"],
  soy: ["soja", "sojasauce", "shoyu"],
  sojasosse: ["sojasauce", "shoyu"],
  beef: ["rind"],
  pork: ["schwein"],
  salmon: ["lachs"],
  spicy: ["scharf"],
  soup: ["suppe"],
};

/** Precomputed searchable text for a recipe. */
export function recipeHaystack(
  recipe: Recipe,
  ingredientsById: Map<string, Ingredient>,
): string {
  const names = recipe.ingredients
    .map((l) => ingredientsById.get(l.ingredientId)?.name ?? "")
    .join(" ");
  return normalize(
    [recipe.title, recipe.titleJp ?? "", recipe.tags.join(" "), names].join(
      " ",
    ),
  );
}

/** Every normalized query token (via synonyms) must appear in the haystack. */
export function matchesQuery(haystack: string, query: string): boolean {
  const tokens = normalize(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every((t) => {
    const variants = [t, ...(SYNONYMS[t] ?? [])];
    return variants.some((v) => haystack.includes(v));
  });
}

/* ------------------------------- Filters ------------------------------- */

export type EquipmentFilter = "nur-pfanne" | "ohne-reiskocher" | "ohne-ofen";

export type RecipeFilters = {
  maxTime: number | null;
  difficulty: Difficulty[];
  diet: Diet[];
  maxSpice: number | null;
  maxIngredients: number | null;
  maxCost: number | null;
  categories: Category[];
  equipment: EquipmentFilter[];
};

export const EMPTY_FILTERS: RecipeFilters = {
  maxTime: null,
  difficulty: [],
  diet: [],
  maxSpice: null,
  maxIngredients: null,
  maxCost: null,
  categories: [],
  equipment: [],
};

export function countActiveFilters(f: RecipeFilters): number {
  return (
    (f.maxTime !== null ? 1 : 0) +
    f.difficulty.length +
    f.diet.length +
    (f.maxSpice !== null ? 1 : 0) +
    (f.maxIngredients !== null ? 1 : 0) +
    (f.maxCost !== null ? 1 : 0) +
    f.categories.length +
    f.equipment.length
  );
}

export type RecipeMeta = { cost: number; ingredientCount: number };

/** Derived facts a card/filter needs (cost per serving, shopping-item count). */
export function recipeMeta(
  recipe: Recipe,
  ingredientsById: Map<string, Ingredient>,
): RecipeMeta {
  const ingredientCount = recipe.ingredients.filter((l) => {
    if (l.optional) return false;
    const ing = ingredientsById.get(l.ingredientId);
    return ing ? !ing.isStaple : true;
  }).length;
  const { eur } = costPerServing(recipe, ingredientsById);
  return { cost: eur, ingredientCount };
}

function dietMatches(selected: Diet[], diet: Diet): boolean {
  if (selected.length === 0) return true;
  if (selected.includes(diet)) return true;
  // "Vegetarisch" also surfaces vegan recipes (they're stricter).
  return selected.includes("vegetarisch") && diet === "vegan";
}

const NON_PAN = new Set([
  "topf",
  "kleiner-topf",
  "ofen",
  "reiskocher-oder-topf",
]);

function equipmentMatches(
  filters: EquipmentFilter[],
  equipment: Recipe["equipment"],
): boolean {
  return filters.every((f) => {
    switch (f) {
      case "nur-pfanne":
        return equipment.every((e) => !NON_PAN.has(e));
      case "ohne-reiskocher":
        return !equipment.includes("reiskocher-oder-topf");
      case "ohne-ofen":
        return !equipment.includes("ofen");
    }
  });
}

export function matchesFilters(
  recipe: Recipe,
  filters: RecipeFilters,
  meta: RecipeMeta,
): boolean {
  if (filters.maxTime !== null && recipe.timeMinutes > filters.maxTime)
    return false;
  if (
    filters.difficulty.length &&
    !filters.difficulty.includes(recipe.difficulty)
  )
    return false;
  if (!dietMatches(filters.diet, recipe.diet)) return false;
  if (filters.maxSpice !== null && recipe.spicy > filters.maxSpice)
    return false;
  if (
    filters.maxIngredients !== null &&
    meta.ingredientCount > filters.maxIngredients
  )
    return false;
  if (filters.maxCost !== null && meta.cost > filters.maxCost + 0.001)
    return false;
  if (
    filters.categories.length &&
    !recipe.categories.some((c) => filters.categories.includes(c))
  )
    return false;
  if (!equipmentMatches(filters.equipment, recipe.equipment)) return false;
  return true;
}

/**
 * Filter + search a recipe list. Results are sorted by time ascending, then
 * title (deterministic, no reshuffle on re-render).
 */
export function filterRecipes(
  recipes: Recipe[],
  opts: {
    query?: string;
    filters?: RecipeFilters;
    ingredientsById: Map<string, Ingredient>;
  },
): Recipe[] {
  const { query = "", filters = EMPTY_FILTERS, ingredientsById } = opts;

  return recipes
    .filter((r) => {
      if (!matchesFilters(r, filters, recipeMeta(r, ingredientsById)))
        return false;
      if (
        query.trim() &&
        !matchesQuery(recipeHaystack(r, ingredientsById), query)
      )
        return false;
      return true;
    })
    .sort(
      (a, b) => a.timeMinutes - b.timeMinutes || a.title.localeCompare(b.title),
    );
}
