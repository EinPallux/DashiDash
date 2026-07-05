import type { Recipe } from "@/content/schema";
import { donburiRecipes } from "@/content/recipes/donburi";
import { donburi2Recipes } from "@/content/recipes/donburi-2";
import { nudelnRamenRecipes } from "@/content/recipes/nudeln-ramen";
import { ramen2Recipes } from "@/content/recipes/ramen-2";
import { nudeln2Recipes } from "@/content/recipes/nudeln-2";
import { fruehstueckRecipes } from "@/content/recipes/fruehstueck";
import { warmRecipes } from "@/content/recipes/warm";
import { warm2Recipes } from "@/content/recipes/warm-2";
import { leichtRecipes } from "@/content/recipes/leicht";
import { vegetarischRecipes } from "@/content/recipes/vegetarisch";
import { snacksRecipes } from "@/content/recipes/snacks";
import { vorratRecipes } from "@/content/recipes/vorrat";

/**
 * The full launch catalog: 60 recipes across all 11 categories (docs/06).
 * Batch 1 (20, Phase 2) laid the calibration; batches 2 + 3 (Phase 6) complete
 * every rail. Order here is the stable authoring order; screens sort/filter as
 * needed. `validate:content` enforces the 60-recipe total and category floors.
 */
export const recipes: Recipe[] = [
  ...donburiRecipes,
  ...donburi2Recipes,
  ...nudelnRamenRecipes,
  ...ramen2Recipes,
  ...nudeln2Recipes,
  ...fruehstueckRecipes,
  ...warmRecipes,
  ...warm2Recipes,
  ...leichtRecipes,
  ...vegetarischRecipes,
  ...snacksRecipes,
  ...vorratRecipes,
];
