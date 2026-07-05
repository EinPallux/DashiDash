import type { RecipeIngredient, Unit } from "@/content/schema";

/**
 * Recipe-ingredient constructor — fills the `group`/`optional`/`scalable`
 * defaults so recipe files read like a shopping list while the emitted data
 * stays complete (docs/04 §3). Amount is `null` for "nach Geschmack".
 */
export function ri(
  ingredientId: string,
  amount: number | null,
  unit: Unit,
  opts: Partial<
    Pick<RecipeIngredient, "note" | "group" | "optional" | "scalable">
  > = {},
): RecipeIngredient {
  return {
    ingredientId,
    amount,
    unit,
    group: "Hauptzutaten",
    optional: false,
    scalable: true,
    ...opts,
  };
}
