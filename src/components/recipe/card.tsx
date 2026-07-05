import type { Recipe } from "@/content/schema";
import type { RecipeCardData } from "@/components/ui/RecipeCard";
import { getDishArt } from "@/content/illustrations/registry";
import { ingredientsById } from "@/lib/content";
import { toRecipeCardData } from "@/lib/recipe-card";

/**
 * Build the RecipeCard view-model for a recipe, resolving its dish art from the
 * registry. Server-usable (the art components are plain SVG) — screens render
 * <RecipeCard data={buildCard(r)} />.
 */
export function buildCard(recipe: Recipe): RecipeCardData {
  const Art = getDishArt(recipe.illustrationId);
  return toRecipeCardData(
    recipe,
    ingredientsById,
    <Art title={recipe.title} />,
  );
}
