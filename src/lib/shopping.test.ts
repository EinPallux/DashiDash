import { describe, expect, it } from "vitest";
import { ingredients } from "@/content/ingredients";
import { recipes } from "@/content/recipes";
import type { ShoppingItem } from "@/lib/db";
import {
  buildShoppingView,
  computeQuantity,
  ingredientSourcesForMeals,
  type MealRef,
} from "./shopping";

const recipesById = new Map(recipes.map((r) => [r.id, r]));
const ingredientsById = new Map(ingredients.map((i) => [i.id, i]));

const WEEK: MealRef[] = [
  { recipeId: "oyakodon", servings: 2 },
  { recipeId: "chicken-teriyaki", servings: 2 },
  { recipeId: "gyudon", servings: 2 },
  { recipeId: "miso-lachs", servings: 2 },
];

function itemsFor(meals: MealRef[]): ShoppingItem[] {
  const sources = ingredientSourcesForMeals(
    meals,
    recipesById,
    ingredientsById,
  );
  let id = 1;
  return [...sources.entries()].map(([ingredientId, srcs]) => ({
    id: id++,
    ingredientId,
    amount: null,
    unit: null,
    sources: srcs,
    checked: false,
    addedAt: 0,
  }));
}

describe("computeQuantity — unit merge", () => {
  it("sums the same unit across recipes", () => {
    // mirin: 2 + 2 + 2 (EL) across oyakodon, teriyaki, gyudon = 6 EL
    const q = computeQuantity(
      [
        { recipeId: "oyakodon", servings: 2 },
        { recipeId: "chicken-teriyaki", servings: 2 },
        { recipeId: "gyudon", servings: 2 },
      ],
      "mirin",
      recipesById,
    );
    expect(q).toBe("6 EL");
  });

  it("keeps EL and TL separate (mixed-unit merge)", () => {
    // shoyu: 3+3+3 EL + 1 TL (miso-lachs)
    const q = computeQuantity(
      WEEK.map((m) => ({ recipeId: m.recipeId, servings: m.servings })),
      "shoyu",
      recipesById,
    );
    expect(q).toBe("9 EL + 1 TL");
  });

  it("scales with servings", () => {
    expect(
      computeQuantity(
        [{ recipeId: "oyakodon", servings: 4 }],
        "reis",
        recipesById,
      ),
    ).toBe("320 g");
  });
});

describe("ingredientSourcesForMeals", () => {
  it("skips staples and optional; groups sources per ingredient", () => {
    const map = ingredientSourcesForMeals(WEEK, recipesById, ingredientsById);
    expect(map.has("salz")).toBe(false); // staple
    expect(map.has("zucker")).toBe(false); // staple
    expect(map.get("shoyu")).toHaveLength(4); // all four use it
    expect(map.get("lachs")).toHaveLength(1);
  });
});

describe("buildShoppingView — 4-recipe week", () => {
  const items = itemsFor(WEEK);

  it("merges, groups by section and totals", () => {
    const view = buildShoppingView(items, {
      recipesById,
      ingredientsById,
      pantrySet: new Set(),
    });

    // shoyu is a single merged line in the asia-regal group
    const asia = view.groups.find((g) => g.section === "asia-regal");
    const shoyu = asia?.lines.find((l) => l.ingredientId === "shoyu");
    expect(shoyu?.quantityText).toBe("9 EL + 1 TL");
    expect(shoyu?.sourceLabel).toContain("für");

    // sections are in canonical order
    const order = view.groups.map((g) => g.section);
    const sorted = [...order].sort(
      (a, b) =>
        [
          "obst-gemuese",
          "fleisch-fisch",
          "kuehlregal",
          "asia-regal",
          "trockenwaren",
          "tiefkuehl",
          "sonstiges",
        ].indexOf(a) -
        [
          "obst-gemuese",
          "fleisch-fisch",
          "kuehlregal",
          "asia-regal",
          "trockenwaren",
          "tiefkuehl",
          "sonstiges",
        ].indexOf(b),
    );
    expect(order).toEqual(sorted);

    expect(view.totalEur).toBeGreaterThan(0);
    expect(view.progress.total).toBe(items.length);
    expect(view.progress.done).toBe(0);
  });

  it("pulls pantry items under `have` and out of the total", () => {
    const withLachs = buildShoppingView(items, {
      recipesById,
      ingredientsById,
      pantrySet: new Set(["lachs"]),
    });
    const without = buildShoppingView(items, {
      recipesById,
      ingredientsById,
      pantrySet: new Set(),
    });

    expect(withLachs.have.some((l) => l.ingredientId === "lachs")).toBe(true);
    expect(
      withLachs.groups.every((g) =>
        g.lines.every((l) => l.ingredientId !== "lachs"),
      ),
    ).toBe(true);
    expect(withLachs.totalEur).toBeLessThan(without.totalEur);
  });

  it("moves checked items into the checked group", () => {
    const [first, ...rest] = items;
    const view = buildShoppingView([{ ...first!, checked: true }, ...rest], {
      recipesById,
      ingredientsById,
      pantrySet: new Set(),
    });
    expect(view.checked).toHaveLength(1);
    expect(view.progress.done).toBe(1);
  });
});

describe("buildShoppingView — manual items", () => {
  it("puts free-text items in Sonstiges", () => {
    const manual: ShoppingItem = {
      id: 99,
      ingredientId: null,
      freeText: "Küchenrolle",
      amount: null,
      unit: null,
      sources: [],
      checked: false,
      addedAt: 0,
    };
    const view = buildShoppingView([manual], {
      recipesById,
      ingredientsById,
      pantrySet: new Set(),
    });
    const sonstiges = view.groups.find((g) => g.section === "sonstiges");
    expect(sonstiges?.lines[0]?.name).toBe("Küchenrolle");
  });
});
