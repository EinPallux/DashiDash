import type { Recipe } from "@/content/schema";
import { donburiRecipes } from "@/content/recipes/donburi";
import { nudelnRamenRecipes } from "@/content/recipes/nudeln-ramen";
import { warmRecipes } from "@/content/recipes/warm";
import { leichtRecipes } from "@/content/recipes/leicht";

/**
 * Recipe batch 1 (docs ROADMAP Phase 2): 20 recipes covering all 11 categories
 * (≥ 2 each). Batches 2 + 3 (→ 60) arrive in Phase 6.
 */
export const recipes: Recipe[] = [
  ...donburiRecipes,
  ...nudelnRamenRecipes,
  ...warmRecipes,
  ...leichtRecipes,
];
