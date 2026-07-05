import type { Ingredient, Recipe, StoreSection, Unit } from "@/content/schema";
import type { ShoppingItem } from "@/lib/db";
import { formatAmount, scaleLine, servingFactor } from "@/lib/scaling";

/**
 * Shopping-list aggregation (docs/04 §9). Pure + tested. A ShoppingItem is one
 * row per ingredient carrying its provenance (`sources`); this module scales
 * each source, merges by unit family (g+kg, ml+l; EL/TL kept separate → "400 g
 * + 2 EL"), subtracts pantry items, groups by store section and estimates a
 * pack-aware total.
 */

export type MealRef = { recipeId: string; servings: number };

/* ------------------------------ unit merge ----------------------------- */

type Family =
  | "mass"
  | "vol"
  | "el"
  | "tl"
  | "stueck"
  | "zehe"
  | "bund"
  | "blatt"
  | "packung"
  | "dose"
  | null;

const FAMILY: Record<Unit, { family: Family; factor: number; unit: Unit }> = {
  g: { family: "mass", factor: 1, unit: "g" },
  kg: { family: "mass", factor: 1000, unit: "g" },
  ml: { family: "vol", factor: 1, unit: "ml" },
  l: { family: "vol", factor: 1000, unit: "ml" },
  el: { family: "el", factor: 1, unit: "el" },
  tl: { family: "tl", factor: 1, unit: "tl" },
  stueck: { family: "stueck", factor: 1, unit: "stueck" },
  zehe: { family: "zehe", factor: 1, unit: "zehe" },
  bund: { family: "bund", factor: 1, unit: "bund" },
  blatt: { family: "blatt", factor: 1, unit: "blatt" },
  packung: { family: "packung", factor: 1, unit: "packung" },
  dose: { family: "dose", factor: 1, unit: "dose" },
  prise: { family: null, factor: 0, unit: "prise" },
  "nach-geschmack": { family: null, factor: 0, unit: "nach-geschmack" },
};

const FAMILY_ORDER: Family[] = [
  "mass",
  "vol",
  "el",
  "tl",
  "stueck",
  "zehe",
  "bund",
  "blatt",
  "packung",
  "dose",
];

function renderFamily(family: Family, value: number): string {
  if (family === "mass")
    return value >= 1000
      ? formatAmount(Math.round((value / 1000) * 100) / 100, "kg")
      : formatAmount(value, "g");
  if (family === "vol")
    return value >= 1000
      ? formatAmount(Math.round((value / 1000) * 100) / 100, "l")
      : formatAmount(value, "ml");
  return formatAmount(value, family as Unit);
}

/**
 * Human quantity for one ingredient across its sources, e.g. "400 g", "6 EL",
 * "400 g + 2 EL". Empty string when nothing quantifiable (e.g. prise only).
 */
export function computeQuantity(
  sources: MealRef[],
  ingredientId: string,
  recipesById: Map<string, Recipe>,
): string {
  const sums = new Map<Family, number>();
  for (const src of sources) {
    const recipe = recipesById.get(src.recipeId);
    const line = recipe?.ingredients.find(
      (l) => l.ingredientId === ingredientId && !l.optional,
    );
    if (!recipe || !line) continue;
    const scaled = scaleLine(line, servingFactor(recipe, src.servings));
    if (scaled === null) continue;
    const { family, factor } = FAMILY[line.unit];
    if (!family) continue;
    sums.set(family, (sums.get(family) ?? 0) + scaled * factor);
  }
  return FAMILY_ORDER.filter((f) => sums.has(f))
    .map((f) => renderFamily(f, sums.get(f)!))
    .join(" + ");
}

/* --------------------------- building rows ----------------------------- */

/**
 * Ingredient → its meal sources for a set of planned meals (non-optional,
 * non-staple only). Used to create/merge ShoppingItem rows.
 */
export function ingredientSourcesForMeals(
  meals: MealRef[],
  recipesById: Map<string, Recipe>,
  ingredientsById: Map<string, Ingredient>,
): Map<string, MealRef[]> {
  const map = new Map<string, MealRef[]>();
  for (const meal of meals) {
    const recipe = recipesById.get(meal.recipeId);
    if (!recipe) continue;
    for (const line of recipe.ingredients) {
      if (line.optional) continue;
      if (ingredientsById.get(line.ingredientId)?.isStaple) continue;
      const arr = map.get(line.ingredientId) ?? [];
      arr.push({ recipeId: meal.recipeId, servings: meal.servings });
      map.set(line.ingredientId, arr);
    }
  }
  return map;
}

/* ------------------------------ the view ------------------------------- */

export const SECTION_ORDER: StoreSection[] = [
  "obst-gemuese",
  "fleisch-fisch",
  "kuehlregal",
  "asia-regal",
  "trockenwaren",
  "tiefkuehl",
  "sonstiges",
];

export const SECTION_LABEL: Record<StoreSection, string> = {
  "obst-gemuese": "Obst & Gemüse",
  "fleisch-fisch": "Fleisch & Fisch",
  kuehlregal: "Kühlregal",
  "asia-regal": "Asia-Regal",
  trockenwaren: "Trockenwaren",
  tiefkuehl: "Tiefkühl",
  sonstiges: "Sonstiges",
};

export type ShoppingLine = {
  itemId: number;
  ingredientId: string | null;
  name: string;
  section: StoreSection;
  quantityText: string;
  sourceLabel: string;
  asiaLadenHint: boolean;
  packEur: number;
  checked: boolean;
};

export type ShoppingView = {
  groups: { section: StoreSection; label: string; lines: ShoppingLine[] }[];
  have: ShoppingLine[];
  checked: ShoppingLine[];
  totalEur: number;
  progress: { done: number; total: number };
};

function sourceLabel(
  sources: MealRef[],
  recipesById: Map<string, Recipe>,
): string {
  const titles = [
    ...new Set(
      sources
        .map((s) => recipesById.get(s.recipeId)?.title)
        .filter((t): t is string => Boolean(t)),
    ),
  ];
  return titles.length ? `für ${titles.join(" + ")}` : "";
}

function toLine(
  item: ShoppingItem,
  ctx: {
    recipesById: Map<string, Recipe>;
    ingredientsById: Map<string, Ingredient>;
  },
): ShoppingLine | null {
  if (item.id == null) return null;

  if (item.ingredientId === null) {
    return {
      itemId: item.id,
      ingredientId: null,
      name: item.freeText ?? "—",
      section: "sonstiges",
      quantityText: "",
      sourceLabel: "",
      asiaLadenHint: false,
      packEur: 0,
      checked: item.checked,
    };
  }

  const ing = ctx.ingredientsById.get(item.ingredientId);
  if (!ing || ing.isStaple) return null;

  return {
    itemId: item.id,
    ingredientId: item.ingredientId,
    name: ing.name,
    section: ing.section,
    quantityText: computeQuantity(
      item.sources,
      item.ingredientId,
      ctx.recipesById,
    ),
    sourceLabel: sourceLabel(item.sources, ctx.recipesById),
    asiaLadenHint: ing.asiaLadenHint,
    packEur: ing.price.packEur ?? ing.price.eur,
    checked: item.checked,
  };
}

/**
 * Build the grouped, pantry-aware shopping view. Pantry items are pulled out
 * under `have`; everything else is grouped by section (checked items go to
 * `checked`). The total is pack-aware (one pack per ingredient).
 */
export function buildShoppingView(
  items: ShoppingItem[],
  ctx: {
    recipesById: Map<string, Recipe>;
    ingredientsById: Map<string, Ingredient>;
    pantrySet: ReadonlySet<string>;
  },
): ShoppingView {
  const have: ShoppingLine[] = [];
  const checked: ShoppingLine[] = [];
  const bySection = new Map<StoreSection, ShoppingLine[]>();
  let totalEur = 0;
  let done = 0;
  let total = 0;

  for (const item of items) {
    const line = toLine(item, ctx);
    if (!line) continue;

    if (line.ingredientId && ctx.pantrySet.has(line.ingredientId)) {
      have.push(line);
      continue;
    }

    total += 1;
    totalEur += line.packEur;
    if (line.checked) {
      done += 1;
      checked.push(line);
      continue;
    }
    const arr = bySection.get(line.section) ?? [];
    arr.push(line);
    bySection.set(line.section, arr);
  }

  const groups = SECTION_ORDER.filter((s) => bySection.get(s)?.length).map(
    (section) => ({
      section,
      label: SECTION_LABEL[section],
      lines: bySection
        .get(section)!
        .sort((a, b) => a.name.localeCompare(b.name)),
    }),
  );

  return {
    groups,
    have: have.sort((a, b) => a.name.localeCompare(b.name)),
    checked: checked.sort((a, b) => a.name.localeCompare(b.name)),
    totalEur: Math.round(totalEur * 100) / 100,
    progress: { done, total },
  };
}
