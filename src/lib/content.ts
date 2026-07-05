import type { Category, Recipe } from "@/content/schema";
import { categories } from "@/content/categories";
import { ingredients } from "@/content/ingredients";
import { lexicon } from "@/content/lexicon";
import { recipes } from "@/content/recipes";

/**
 * Content selectors — the read layer over the bundled seed data. All content
 * is static, so these maps are built once at module load (no runtime cost per
 * render). Screens import from here rather than reaching into `content/*`.
 */

export const ingredientsById = new Map(ingredients.map((i) => [i.id, i]));
export const recipeById = new Map(recipes.map((r) => [r.id, r]));
export const lexiconById = new Map(lexicon.map((l) => [l.id, l]));
export const categoryById = new Map(categories.map((c) => [c.id, c]));

export const getRecipe = (slug: string) => recipeById.get(slug);
export const getIngredient = (id: string) => ingredientsById.get(id);
export const getLexicon = (id: string) => lexiconById.get(id);

export const recipesInCategory = (cat: Category): Recipe[] =>
  recipes.filter((r) => r.categories.includes(cat));

/** Categories in rail order (docs/06). */
export const categoriesInOrder = [...categories].sort(
  (a, b) => a.order - b.order,
);

/**
 * "Heute schnell" — a rotating featured recipe, deterministic by day so it is
 * stable within a day and reproducible (docs/01 §4.1). Picks from the quick
 * (≤ 20 min) recipes. `daySeed` = whole days since epoch.
 */
export function heroRecipe(daySeed: number): Recipe {
  const pool = recipes.filter((r) => r.timeMinutes <= 20);
  const source = pool.length > 0 ? pool : recipes;
  const idx = ((daySeed % source.length) + source.length) % source.length;
  return source[idx]!;
}

/** Recipes sharing at least one perishable ingredient (for "Passt dazu"). */
export function relatedRecipes(recipe: Recipe, limit = 3): Recipe[] {
  const perishables = new Set(
    recipe.ingredients
      .map((l) => ingredientsById.get(l.ingredientId))
      .filter((ing) => ing?.perishable)
      .map((ing) => ing!.id),
  );
  return recipes
    .filter(
      (r) =>
        r.id !== recipe.id &&
        r.ingredients.some((l) => perishables.has(l.ingredientId)),
    )
    .slice(0, limit);
}
