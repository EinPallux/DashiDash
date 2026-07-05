import type { Ingredient, Recipe, Unit } from "@/content/schema";

/**
 * Derived cost (docs/04 §3 "Derived"). Never authored — computed from the
 * ingredient `price` anchors. Staples are priced at 0. The result feeds the
 * "≈ X € / Portion" badge (rounded to 10 ct) and the Günstig category check.
 */

/**
 * Two cost bases: `amount` (mass/volume, with 1 ml ≈ 1 g and el/tl in ml — a
 * deliberate simplification, precise enough for a "≈ X €" badge) and `count`
 * (Stück, Zehe, Bund …). prise / nach-Geschmack contribute nothing.
 */
type Base = "amount" | "count" | null;

const UNIT_BASE: Record<Unit, Base> = {
  g: "amount",
  kg: "amount",
  ml: "amount",
  l: "amount",
  el: "amount",
  tl: "amount",
  stueck: "count",
  zehe: "count",
  bund: "count",
  blatt: "count",
  packung: "count",
  dose: "count",
  prise: null,
  "nach-geschmack": null,
};

/** Amount expressed in the base (g≈ml, or piece). kg/l and el/tl converted. */
function toBase(amount: number, unit: Unit): { base: Base; value: number } {
  switch (unit) {
    case "kg":
    case "l":
      return { base: "amount", value: amount * 1000 };
    case "el":
      return { base: "amount", value: amount * 15 };
    case "tl":
      return { base: "amount", value: amount * 5 };
    default:
      return { base: UNIT_BASE[unit], value: amount };
  }
}

/**
 * Cost of one recipe-ingredient line, EUR. Returns 0 for staples and for
 * "nach Geschmack"/prise amounts. Returns null when the recipe unit and the
 * price unit are in different families (can't convert) — surfaced by the
 * validator as an authoring warning rather than a silent wrong number.
 */
export function lineCost(
  recipeAmount: number | null,
  recipeUnit: Unit,
  ingredient: Ingredient,
): number | null {
  if (ingredient.isStaple) return 0;
  if (recipeAmount === null) return 0;
  if (recipeUnit === "prise" || recipeUnit === "nach-geschmack") return 0;

  const need = toBase(recipeAmount, recipeUnit);
  const per = toBase(ingredient.price.amount, ingredient.price.unit);
  if (need.base === null || per.base === null) return null;
  if (need.base !== per.base) return null;
  if (per.value === 0) return null;

  return (need.value / per.value) * ingredient.price.eur;
}

/**
 * Cost per serving. Sums non-optional lines, divides by servingsBase. Unknown
 * (unconvertible) lines are skipped and reported via `unresolved`.
 */
export function costPerServing(
  recipe: Recipe,
  ingredientsById: Map<string, Ingredient>,
): { eur: number; unresolved: string[] } {
  let total = 0;
  const unresolved: string[] = [];

  for (const ri of recipe.ingredients) {
    if (ri.optional) continue;
    const ing = ingredientsById.get(ri.ingredientId);
    if (!ing) {
      unresolved.push(ri.ingredientId);
      continue;
    }
    const c = lineCost(ri.amount, ri.unit, ing);
    if (c === null) {
      unresolved.push(ri.ingredientId);
      continue;
    }
    total += c;
  }

  return { eur: total / recipe.servingsBase, unresolved };
}

/** Cost badge value: rounded to 10 ct (docs/04 §3). */
export function costBadgeEur(eurPerServing: number): number {
  return Math.round(eurPerServing * 10) / 10;
}
