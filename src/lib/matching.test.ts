import { describe, expect, it } from "vitest";
import type { Ingredient, Recipe, RecipeIngredient } from "@/content/schema";
import { ingredients as realIngredients } from "@/content/ingredients";
import { recipes as realRecipes } from "@/content/recipes";
import {
  almostRecipes,
  matchAll,
  matchRecipe,
  readyRecipes,
  suggestForLeftovers,
} from "./matching";

/* --------------------------- synthetic fixtures ------------------------ */

const ing = (over: Partial<Ingredient> & { id: string }): Ingredient => ({
  name: over.id,
  category: "frische-zutaten",
  section: "obst-gemuese",
  asiaLadenHint: false,
  isStaple: false,
  perishable: false,
  substitutes: [],
  price: { amount: 1, unit: "stueck", eur: 1 },
  ...over,
});

const line = (ingredientId: string, optional = false): RecipeIngredient => ({
  ingredientId,
  amount: 1,
  unit: "stueck",
  group: "Hauptzutaten",
  optional,
  scalable: true,
});

const recipe = (
  id: string,
  ingredientIds: [string, boolean?][],
  timeMinutes = 15,
): Recipe =>
  ({
    id,
    title: id,
    subtitle: "",
    intro: "",
    categories: ["15-minuten"],
    tags: [],
    timeMinutes,
    activeMinutes: timeMinutes,
    difficulty: "easy",
    diet: "vegan",
    spicy: 0,
    servingsBase: 2,
    ingredients: ingredientIds.map(([id, opt]) => line(id, opt)),
    equipment: [],
    steps: [{ text: "x" }],
    guideIds: [],
    illustrationId: "x",
  }) as Recipe;

const byId = new Map<string, Ingredient>(
  [
    ing({ id: "a" }),
    ing({ id: "e" }),
    ing({ id: "opt" }),
    ing({ id: "salz", isStaple: true }),
    ing({
      id: "c",
      substitutes: [{ ingredientId: "a", text: "", quality: "okay" }],
    }),
    ing({
      id: "d",
      substitutes: [{ ingredientId: "a", text: "", quality: "notloesung" }],
    }),
  ].map((i) => [i.id, i]),
);

const set = (...ids: string[]) => new Set(ids);

describe("matchRecipe", () => {
  it("is ready when everything is covered (pantry + staple + substitute)", () => {
    const r = recipe("r", [["a"], ["salz"], ["c"], ["opt", true]]);
    const m = matchRecipe(r, set("a"), set("salz"), byId);
    expect(m.tier).toBe("ready");
    expect(m.missing).toEqual([]);
    expect(m.coverage).toBe(1);
    expect(m.substitutions).toEqual([{ ingredientId: "c", viaId: "a" }]);
  });

  it("ignores optional ingredients", () => {
    const r = recipe("r", [["a"], ["e", true]]);
    expect(matchRecipe(r, set("a"), set(), byId).tier).toBe("ready");
  });

  it("treats a disabled staple as missing", () => {
    const r = recipe("r", [["salz"]]);
    expect(matchRecipe(r, set(), set("salz"), byId).tier).toBe("ready");
    expect(matchRecipe(r, set(), set(), byId).missing).toEqual(["salz"]);
  });

  it("does not accept a notloesung substitute", () => {
    const r = recipe("r", [["d"]]);
    expect(matchRecipe(r, set("a"), set(), byId).missing).toEqual(["d"]);
  });

  it("classifies almost (1–2 missing) and far (3+)", () => {
    // empty pantry: both a and e are missing → 2 missing → almost
    const almost = recipe("almost", [["a"], ["e"]]);
    expect(matchRecipe(almost, set(), set(), byId).tier).toBe("almost");

    // a, e missing; c's substitute needs 'a' (not stocked); d is notloesung
    // → 4 missing → far
    const far = recipe("far", [["a"], ["e"], ["c"], ["d"]]);
    expect(matchRecipe(far, set(), set(), byId).tier).toBe("far");
  });

  it("computes coverage over required ingredients", () => {
    const r = recipe("r", [["a"], ["e"], ["opt", true]]);
    expect(matchRecipe(r, set("a"), set(), byId).coverage).toBe(0.5);
  });
});

describe("ranking", () => {
  it("orders ready by time then almost by missing count", () => {
    const list = [
      recipe("slow", [["a"]], 30),
      recipe("fast", [["a"]], 10),
      recipe("miss2", [["a"], ["e"], ["c"]]),
      recipe("miss1", [["a"], ["e"]]),
    ];
    const matches = matchAll(list, set("a"), set(), byId);
    const ready = readyRecipes(matches, byId).map((m) => m.recipe.id);
    expect(ready).toEqual(["fast", "slow"]);
    const almost = almostRecipes(matches, byId).map((m) => m.recipe.id);
    expect(almost).toEqual(["miss1", "miss2"]);
  });
});

/* ----------------------- real-content integration ---------------------- */

const realById = new Map(realIngredients.map((i) => [i.id, i]));
const allStaples = new Set(
  realIngredients.filter((i) => i.isStaple).map((i) => i.id),
);

describe("real content", () => {
  it("marks a recipe ready when its non-staple ingredients are stocked", () => {
    const oyakodon = realRecipes.find((r) => r.id === "oyakodon")!;
    const needed = oyakodon.ingredients
      .filter((l) => !l.optional && !realById.get(l.ingredientId)?.isStaple)
      .map((l) => l.ingredientId);
    const m = matchRecipe(oyakodon, new Set(needed), allStaples, realById);
    expect(m.tier).toBe("ready");
  });

  it("empty pantry (staples on) leaves most recipes not-ready", () => {
    const matches = matchAll(realRecipes, new Set(), allStaples, realById);
    const ready = readyRecipes(matches, realById);
    expect(ready.length).toBeLessThan(realRecipes.length);
  });
});

describe("suggestForLeftovers", () => {
  const inputs = (leftovers: string[]) =>
    suggestForLeftovers(
      new Set(leftovers),
      realRecipes,
      new Set(),
      allStaples,
      realById,
    );

  it("scenario 1 — Tofu: only tofu recipes, all actually use tofu", () => {
    const res = inputs(["tofu"]);
    expect(res.length).toBeGreaterThan(0);
    expect(
      res.every((r) =>
        r.recipe.ingredients.some((l) => l.ingredientId === "tofu"),
      ),
    ).toBe(true);
    expect(res.map((r) => r.recipe.id)).toContain("misosuppe-klassisch");
  });

  it("scenario 2 — Lachs: returns salmon dishes", () => {
    const res = inputs(["lachs"]).map((r) => r.recipe.id);
    expect(res).toContain("miso-lachs");
    expect(res).toContain("onigiri-drei-fuellungen");
  });

  it("scenario 3 — multiple leftovers rank by how many are used", () => {
    const res = inputs(["ei", "fruehlingszwiebel"]);
    // every result uses at least one; the list is sorted by used-count desc
    for (let i = 1; i < res.length; i++) {
      expect(res[i - 1]!.usedLeftovers.length).toBeGreaterThanOrEqual(
        res[i]!.usedLeftovers.length,
      );
    }
    expect(res[0]!.usedLeftovers.length).toBe(2);
  });
});
