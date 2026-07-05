import type { ReactNode } from "react";
import type { Ingredient, Recipe } from "@/content/schema";
import type { Difficulty, SpiceLevel } from "@/components/ui/Badge";
import type { RecipeCardData } from "@/components/ui/RecipeCard";
import { costBadgeEur, costPerServing } from "@/lib/costs";

const DIFFICULTY_LEVEL: Record<Recipe["difficulty"], Difficulty> = {
  easy: 1,
  mittel: 2,
  fortgeschritten: 3,
};

/**
 * Map a full `Recipe` (+ derived cost/count) onto the `RecipeCardData` the
 * RecipeCard renders. The count is the user-meaningful "how many things do I
 * need" — non-optional, non-staple ingredients. Cost is derived and badge-
 * rounded (docs/04 §3). The illustration is passed in so this stays pure.
 */
export function toRecipeCardData(
  recipe: Recipe,
  ingredientsById: Map<string, Ingredient>,
  illustration: ReactNode,
): RecipeCardData {
  const ingredientCount = recipe.ingredients.filter((ri) => {
    if (ri.optional) return false;
    const ing = ingredientsById.get(ri.ingredientId);
    return ing ? !ing.isStaple : true;
  }).length;

  const { eur } = costPerServing(recipe, ingredientsById);

  return {
    id: recipe.id,
    title: recipe.title,
    titleJp: recipe.titleJp,
    subtitle: recipe.subtitle,
    timeMinutes: recipe.timeMinutes,
    difficulty: DIFFICULTY_LEVEL[recipe.difficulty],
    ingredientCount,
    costPerServing: costBadgeEur(eur),
    diet: recipe.diet,
    spicy: recipe.spicy as SpiceLevel,
    illustration,
  };
}
