import type { Recipe } from "@/content/schema";
import { db } from "@/lib/db";
import { scaleLine, servingFactor } from "@/lib/scaling";

/**
 * Shopping-list writes (docs/04 §5, §9). Phase 4 only needs to *queue* missing
 * ingredients onto the list — the grouped list UI and full aggregation land in
 * Phase 5. Same-ingredient unchecked items merge their provenance so the list
 * can later say "für Oyakodon + Teriyaki".
 */
export async function addMissingToShopping(
  recipe: Recipe,
  missingIds: string[],
  servings: number,
): Promise<number> {
  const factor = servingFactor(recipe, servings);
  const byId = new Map(recipe.ingredients.map((l) => [l.ingredientId, l]));
  let added = 0;

  for (const id of missingIds) {
    const line = byId.get(id);
    if (!line) continue;
    const amount = line.amount === null ? null : scaleLine(line, factor);
    const source = { recipeId: recipe.id, servings };

    const existing = await db.shopping
      .where("ingredientId")
      .equals(id)
      .filter((it) => !it.checked)
      .first();

    if (existing?.id != null) {
      const already = existing.sources.some(
        (s) => s.recipeId === recipe.id && s.servings === servings,
      );
      if (!already) {
        await db.shopping.update(existing.id, {
          sources: [...existing.sources, source],
        });
      }
    } else {
      await db.shopping.add({
        ingredientId: id,
        amount,
        unit: line.unit,
        sources: [source],
        checked: false,
        addedAt: Date.now(),
      });
      added++;
    }
  }

  return added;
}
