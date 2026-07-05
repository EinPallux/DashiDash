import { useLiveQuery } from "dexie-react-hooks";
import type { Recipe } from "@/content/schema";
import { ingredients } from "@/content/ingredients";
import { db } from "@/lib/db";
import { ingredientsById } from "@/lib/content";

/**
 * Pantry repository + reactive hooks (docs/03 §5). Components read via the
 * hooks (`useLiveQuery`, reactive) and write via these functions — never raw
 * `db.*`. Staples are available by default and tracked as an "off-list" of
 * disabled ids, so an empty pantry still assumes Salz/Öl/… on hand (docs/04 §6).
 */

export const STAPLE_IDS = ingredients
  .filter((i) => i.isStaple)
  .map((i) => i.id);

const DISABLED_STAPLES_KEY = "disabledStaples";
const FIRST_RUN_KEY = "pantryFirstRunDone";

/* -------------------------------- writes ------------------------------- */

export async function setPantry(ingredientId: string, present: boolean) {
  if (present) await db.pantry.put({ ingredientId, addedAt: Date.now() });
  else await db.pantry.delete(ingredientId);
}

export async function setStapleDisabled(
  ingredientId: string,
  disabled: boolean,
) {
  const row = await db.settings.get(DISABLED_STAPLES_KEY);
  const current = new Set<string>(
    Array.isArray(row?.value) ? (row.value as string[]) : [],
  );
  if (disabled) current.add(ingredientId);
  else current.delete(ingredientId);
  await db.settings.put({ key: DISABLED_STAPLES_KEY, value: [...current] });
}

/** After cooking: drop the fresh (perishable, non-staple) ingredients used. */
export async function consumePantry(recipe: Recipe): Promise<number> {
  const toRemove = recipe.ingredients
    .filter((l) => !l.optional)
    .map((l) => ingredientsById.get(l.ingredientId))
    .filter((ing) => ing && ing.perishable && !ing.isStaple)
    .map((ing) => ing!.id);
  const present = await db.pantry.bulkGet(toRemove);
  const actuallyThere = toRemove.filter((_, i) => present[i]);
  await db.pantry.bulkDelete(actuallyThere);
  return actuallyThere.length;
}

export async function dismissPantryFirstRun() {
  await db.settings.put({ key: FIRST_RUN_KEY, value: true });
}

/* -------------------------------- reads -------------------------------- */

/** Set of stocked ingredient ids; `undefined` while loading. */
export function usePantrySet(): Set<string> | undefined {
  const items = useLiveQuery(() => db.pantry.toArray());
  return items ? new Set(items.map((i) => i.ingredientId)) : undefined;
}

/** Set of disabled staple ids; `undefined` while loading. */
export function useDisabledStaples(): Set<string> | undefined {
  const value = useLiveQuery(() =>
    db.settings
      .get(DISABLED_STAPLES_KEY)
      .then((r) => (Array.isArray(r?.value) ? (r.value as string[]) : [])),
  );
  return value ? new Set(value) : undefined;
}

export function usePantryFirstRunDone(): boolean | undefined {
  return useLiveQuery(() =>
    db.settings.get(FIRST_RUN_KEY).then((r) => Boolean(r?.value)),
  );
}

/** Combined matching inputs; `undefined` until both live queries resolve. */
export function useMatchInputs():
  { pantrySet: Set<string>; staplesSet: Set<string> } | undefined {
  const pantrySet = usePantrySet();
  const disabled = useDisabledStaples();
  if (!pantrySet || !disabled) return undefined;
  const staplesSet = new Set(STAPLE_IDS.filter((id) => !disabled.has(id)));
  return { pantrySet, staplesSet };
}
