import { useLiveQuery } from "dexie-react-hooks";
import type { Recipe } from "@/content/schema";
import { db, type ShoppingItem } from "@/lib/db";
import { ingredientsById, recipeById } from "@/lib/content";
import { ingredientSourcesForMeals, type MealRef } from "@/lib/shopping";

/**
 * Shopping-list repository (docs/04 §5, §9). Rows are one per ingredient,
 * carrying provenance (`sources`); amounts are derived at display time by
 * `buildShoppingView`. Manual items are free-text rows. Writes only here.
 */

async function upsertSource(
  ingredientId: string,
  source: MealRef,
): Promise<boolean> {
  const existing = await db.shopping
    .where("ingredientId")
    .equals(ingredientId)
    .filter((it) => !it.checked)
    .first();

  if (existing?.id != null) {
    const dup = existing.sources.some(
      (s) => s.recipeId === source.recipeId && s.servings === source.servings,
    );
    if (!dup) {
      await db.shopping.update(existing.id, {
        sources: [...existing.sources, source],
      });
    }
    return false;
  }

  await db.shopping.add({
    ingredientId,
    amount: null,
    unit: null,
    sources: [source],
    checked: false,
    addedAt: Date.now(),
  });
  return true;
}

/** Queue every non-optional, non-staple ingredient of the given meals. */
export async function addMealsToShopping(meals: MealRef[]): Promise<void> {
  const sources = ingredientSourcesForMeals(meals, recipeById, ingredientsById);
  for (const [ingredientId, list] of sources) {
    for (const source of list) await upsertSource(ingredientId, source);
  }
}

export async function addRecipeToShopping(recipe: Recipe, servings: number) {
  await addMealsToShopping([{ recipeId: recipe.id, servings }]);
}

/** Add only specific (missing) ingredient ids for one recipe. */
export async function addMissingToShopping(
  recipe: Recipe,
  missingIds: string[],
  servings: number,
): Promise<number> {
  let added = 0;
  for (const id of missingIds) {
    if (await upsertSource(id, { recipeId: recipe.id, servings })) added++;
  }
  return added;
}

export async function addManualItem(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;
  await db.shopping.add({
    ingredientId: null,
    freeText: trimmed,
    amount: null,
    unit: null,
    sources: [],
    checked: false,
    addedAt: Date.now(),
  });
}

export async function setShoppingChecked(itemId: number, checked: boolean) {
  await db.shopping.update(itemId, { checked });
}

export async function clearChecked() {
  const items = await db.shopping.toArray();
  await db.shopping.bulkDelete(
    items.filter((i) => i.checked && i.id != null).map((i) => i.id!),
  );
}

export async function clearAllShopping() {
  await db.shopping.clear();
}

/** Bulk "In den Vorrat übernehmen": checked items → pantry, then off the list. */
export async function moveCheckedToPantry(): Promise<number> {
  const items = await db.shopping.toArray();
  const checked = items.filter((i) => i.checked && i.ingredientId);
  const now = Date.now();
  await db.pantry.bulkPut(
    checked.map((i) => ({ ingredientId: i.ingredientId!, addedAt: now })),
  );
  await db.shopping.bulkDelete(
    checked.filter((i) => i.id != null).map((i) => i.id!),
  );
  return checked.length;
}

export function useShoppingItems(): ShoppingItem[] | undefined {
  return useLiveQuery(() => db.shopping.toArray());
}
