import { describe, expect, it } from "vitest";
import { ingredients } from "@/content/ingredients";
import { recipes } from "@/content/recipes";
import { suggestCombos } from "./combos";

const ingredientsById = new Map(ingredients.map((i) => [i.id, i]));

const shoppableIds = (recipeId: string) =>
  new Set(
    recipes
      .find((r) => r.id === recipeId)!
      .ingredients.filter(
        (l) => !l.optional && !ingredientsById.get(l.ingredientId)?.isStaple,
      )
      .map((l) => l.ingredientId),
  );

describe("suggestCombos", () => {
  it("respects k (every set has exactly k recipes)", () => {
    for (const k of [2, 3, 4]) {
      const res = suggestCombos({ k }, recipes, ingredientsById);
      expect(res.length).toBeGreaterThan(0);
      expect(res.every((s) => s.recipeIds.length === k)).toBe(true);
    }
  });

  it("shared ingredients are actually shared by ≥ 2 recipes in the set", () => {
    const res = suggestCombos({ k: 3 }, recipes, ingredientsById);
    for (const s of res) {
      const sets = s.recipeIds.map(shoppableIds);
      for (const ing of s.sharedIngredients) {
        const usedBy = sets.filter((set) => set.has(ing)).length;
        expect(usedBy).toBeGreaterThanOrEqual(2);
      }
      // a good combo actually shares something
      expect(s.sharedIngredients.length).toBeGreaterThan(0);
    }
  });

  it("respects the time constraint", () => {
    const res = suggestCombos(
      { k: 3, constraints: { maxTimePerMeal: 15 } },
      recipes,
      ingredientsById,
    );
    const byId = new Map(recipes.map((r) => [r.id, r]));
    for (const s of res) {
      for (const id of s.recipeIds) {
        expect(byId.get(id)!.timeMinutes).toBeLessThanOrEqual(15);
      }
    }
  });

  it("respects the diet constraint (vegetarisch includes vegan)", () => {
    const res = suggestCombos(
      { k: 2, constraints: { diet: "vegetarisch" } },
      recipes,
      ingredientsById,
    );
    const byId = new Map(recipes.map((r) => [r.id, r]));
    for (const s of res) {
      for (const id of s.recipeIds) {
        expect(["vegetarisch", "vegan"]).toContain(byId.get(id)!.diet);
      }
    }
  });

  it("respects the budget constraint", () => {
    const budget = 10;
    const res = suggestCombos(
      { k: 3, constraints: { maxBudgetTotal: budget } },
      recipes,
      ingredientsById,
    );
    expect(res.every((s) => s.estCostTotal <= budget)).toBe(true);
  });

  it("is deterministic", () => {
    const a = suggestCombos({ k: 3 }, recipes, ingredientsById);
    const b = suggestCombos({ k: 3 }, recipes, ingredientsById);
    expect(a).toEqual(b);
  });

  it("returns at most 3 suggestions", () => {
    expect(
      suggestCombos({ k: 2 }, recipes, ingredientsById).length,
    ).toBeLessThanOrEqual(3);
  });
});
