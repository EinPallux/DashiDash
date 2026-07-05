import type { Ingredient, Recipe, SubstituteQuality } from "@/content/schema";

/**
 * Pantry → recipe matching (docs/04 §6). Pure and unit-tested. A recipe is
 * `ready` when nothing required is missing, `almost` with 1–2 missing, else
 * `far`. An ingredient counts as available if it's in the pantry, is an
 * (enabled) staple, or has a good-enough substitute that IS in the pantry.
 */

export type MatchTier = "ready" | "almost" | "far";

export type RecipeMatch = {
  tier: MatchTier;
  /** Ingredient ids still missing after substitutes. */
  missing: string[];
  /** 0..1 over required (non-optional) ingredients. */
  coverage: number;
  /** "Du kannst X mit Y ersetzen ✨" hints. */
  substitutions: { ingredientId: string; viaId: string }[];
};

const QUALITY_RANK: Record<SubstituteQuality, number> = {
  notloesung: 1,
  okay: 2,
  gleichwertig: 3,
};

/** Match a single recipe against the pantry + enabled staples. */
export function matchRecipe(
  recipe: Recipe,
  pantrySet: ReadonlySet<string>,
  staplesSet: ReadonlySet<string>,
  ingredientsById: Map<string, Ingredient>,
): RecipeMatch {
  const required = recipe.ingredients.filter((l) => !l.optional);
  const missing: string[] = [];
  const substitutions: { ingredientId: string; viaId: string }[] = [];
  let have = 0;

  for (const line of required) {
    const id = line.ingredientId;

    if (pantrySet.has(id)) {
      have++;
      continue;
    }

    const ing = ingredientsById.get(id);
    if (ing?.isStaple && staplesSet.has(id)) {
      have++;
      continue;
    }

    // A substitute of quality ≥ okay whose ingredient is in the pantry.
    const sub = ing?.substitutes.find(
      (s) =>
        s.ingredientId != null &&
        QUALITY_RANK[s.quality] >= QUALITY_RANK.okay &&
        pantrySet.has(s.ingredientId),
    );
    if (sub?.ingredientId) {
      have++;
      substitutions.push({ ingredientId: id, viaId: sub.ingredientId });
      continue;
    }

    missing.push(id);
  }

  const coverage = required.length === 0 ? 1 : have / required.length;
  const tier: MatchTier =
    missing.length === 0 ? "ready" : missing.length <= 2 ? "almost" : "far";

  return { tier, missing, coverage, substitutions };
}

export type RankedMatch = { recipe: Recipe; match: RecipeMatch };

/** Sum of pack prices (fallback: unit price) for a set of ingredient ids. */
export function missingPackCost(
  ids: string[],
  ingredientsById: Map<string, Ingredient>,
): number {
  return ids.reduce((sum, id) => {
    const ing = ingredientsById.get(id);
    return sum + (ing?.price.packEur ?? ing?.price.eur ?? 0);
  }, 0);
}

/** Match every recipe; returns them unsorted with their match result. */
export function matchAll(
  recipes: Recipe[],
  pantrySet: ReadonlySet<string>,
  staplesSet: ReadonlySet<string>,
  ingredientsById: Map<string, Ingredient>,
): RankedMatch[] {
  return recipes.map((recipe) => ({
    recipe,
    match: matchRecipe(recipe, pantrySet, staplesSet, ingredientsById),
  }));
}

/**
 * Within-tier ordering (docs/04 §6.4): fewest missing → cheapest missing
 * (pack prices) → shortest time. Deterministic (title tie-break).
 */
export function compareMatches(
  a: RankedMatch,
  b: RankedMatch,
  ingredientsById: Map<string, Ingredient>,
): number {
  if (a.match.missing.length !== b.match.missing.length) {
    return a.match.missing.length - b.match.missing.length;
  }
  const costA = missingPackCost(a.match.missing, ingredientsById);
  const costB = missingPackCost(b.match.missing, ingredientsById);
  if (costA !== costB) return costA - costB;
  if (a.recipe.timeMinutes !== b.recipe.timeMinutes) {
    return a.recipe.timeMinutes - b.recipe.timeMinutes;
  }
  return a.recipe.title.localeCompare(b.recipe.title);
}

/** Ready recipes, sorted by time (then title). */
export function readyRecipes(
  matches: RankedMatch[],
  ingredientsById: Map<string, Ingredient>,
): RankedMatch[] {
  return matches
    .filter((m) => m.match.tier === "ready")
    .sort((a, b) => compareMatches(a, b, ingredientsById));
}

/** "Fast machbar" recipes (1–2 missing), best-ranked first. */
export function almostRecipes(
  matches: RankedMatch[],
  ingredientsById: Map<string, Ingredient>,
): RankedMatch[] {
  return matches
    .filter((m) => m.match.tier === "almost")
    .sort((a, b) => compareMatches(a, b, ingredientsById));
}

/**
 * Reste-Retter (docs/01 §4.6): rank recipes that use the selected leftover
 * ingredients, weighted by (# leftovers used) → pantry coverage → speed.
 * Only recipes using ≥ 1 selected leftover are returned.
 */
export function suggestForLeftovers(
  selected: ReadonlySet<string>,
  recipes: Recipe[],
  pantrySet: ReadonlySet<string>,
  staplesSet: ReadonlySet<string>,
  ingredientsById: Map<string, Ingredient>,
): { recipe: Recipe; match: RecipeMatch; usedLeftovers: string[] }[] {
  const scored = recipes
    .map((recipe) => {
      const usedLeftovers = recipe.ingredients
        .filter((l) => selected.has(l.ingredientId))
        .map((l) => l.ingredientId);
      const match = matchRecipe(recipe, pantrySet, staplesSet, ingredientsById);
      return { recipe, match, usedLeftovers };
    })
    .filter((r) => r.usedLeftovers.length > 0);

  return scored.sort((a, b) => {
    if (a.usedLeftovers.length !== b.usedLeftovers.length) {
      return b.usedLeftovers.length - a.usedLeftovers.length;
    }
    if (a.match.coverage !== b.match.coverage) {
      return b.match.coverage - a.match.coverage;
    }
    if (a.recipe.timeMinutes !== b.recipe.timeMinutes) {
      return a.recipe.timeMinutes - b.recipe.timeMinutes;
    }
    return a.recipe.title.localeCompare(b.recipe.title);
  });
}
