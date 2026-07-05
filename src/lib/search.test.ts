import { describe, expect, it } from "vitest";
import { ingredients } from "@/content/ingredients";
import { recipes } from "@/content/recipes";
import {
  EMPTY_FILTERS,
  countActiveFilters,
  filterRecipes,
  normalize,
  recipeMeta,
  type RecipeFilters,
} from "./search";

const ingredientsById = new Map(ingredients.map((i) => [i.id, i]));
const ids = (list: { id: string }[]) => list.map((r) => r.id);

const withFilters = (over: Partial<RecipeFilters>): RecipeFilters => ({
  ...EMPTY_FILTERS,
  ...over,
});

describe("normalize", () => {
  it("lowercases, strips diacritics and punctuation, maps ß", () => {
    expect(normalize("Süß & Scharf!")).toBe("suss scharf");
    expect(normalize("Ötzi's Gyūdon")).toBe("otzi s gyudon");
  });
});

describe("filterRecipes — search", () => {
  it("finds by German tag / title", () => {
    const r = ids(filterRecipes(recipes, { query: "tofu", ingredientsById }));
    expect(r).toContain("mapo-tofu");
    expect(r).toContain("hiyayakko");
    expect(r).toContain("misosuppe-klassisch");
  });

  it("finds by ingredient name", () => {
    const r = ids(
      filterRecipes(recipes, { query: "sojasauce", ingredientsById }),
    );
    expect(r).toContain("oyakodon");
  });

  it("supports english synonyms", () => {
    const r = ids(
      filterRecipes(recipes, { query: "chicken", ingredientsById }),
    );
    expect(r).toContain("chicken-teriyaki");
    expect(r).toContain("oyakodon");
  });

  it("requires all tokens (AND)", () => {
    const r = ids(
      filterRecipes(recipes, { query: "scharf tofu", ingredientsById }),
    );
    expect(r).toEqual(["mapo-tofu"]);
  });

  it("returns nothing for gibberish", () => {
    expect(filterRecipes(recipes, { query: "xyzzy", ingredientsById })).toEqual(
      [],
    );
  });
});

describe("filterRecipes — filters", () => {
  it("maxTime keeps only fast recipes", () => {
    const r = filterRecipes(recipes, {
      filters: withFilters({ maxTime: 15 }),
      ingredientsById,
    });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((x) => x.timeMinutes <= 15)).toBe(true);
  });

  it("diet vegetarisch also includes vegan", () => {
    const r = filterRecipes(recipes, {
      filters: withFilters({ diet: ["vegetarisch"] }),
      ingredientsById,
    });
    expect(r.every((x) => x.diet === "vegetarisch" || x.diet === "vegan")).toBe(
      true,
    );
    expect(ids(r)).toContain("misosuppe-klassisch"); // vegan
    expect(ids(r)).toContain("tamagodon"); // vegetarisch
  });

  it("maxCost caps price per serving", () => {
    const r = filterRecipes(recipes, {
      filters: withFilters({ maxCost: 2.5 }),
      ingredientsById,
    });
    expect(
      r.every((x) => recipeMeta(x, ingredientsById).cost <= 2.5 + 0.001),
    ).toBe(true);
  });

  it("equipment ohne-reiskocher excludes rice-cooker recipes", () => {
    const r = filterRecipes(recipes, {
      filters: withFilters({ equipment: ["ohne-reiskocher"] }),
      ingredientsById,
    });
    expect(r.every((x) => !x.equipment.includes("reiskocher-oder-topf"))).toBe(
      true,
    );
    expect(ids(r)).not.toContain("oyakodon");
  });

  it("combines query and filters", () => {
    const r = filterRecipes(recipes, {
      query: "reis",
      filters: withFilters({ maxSpice: 0, diet: ["vegetarisch"] }),
      ingredientsById,
    });
    expect(r.every((x) => x.spicy === 0)).toBe(true);
  });

  it("sorts by time ascending", () => {
    const r = filterRecipes(recipes, { ingredientsById });
    for (let i = 1; i < r.length; i++) {
      expect(r[i]!.timeMinutes).toBeGreaterThanOrEqual(r[i - 1]!.timeMinutes);
    }
  });
});

describe("countActiveFilters", () => {
  it("counts every active dimension", () => {
    expect(countActiveFilters(EMPTY_FILTERS)).toBe(0);
    expect(
      countActiveFilters(
        withFilters({ maxTime: 15, diet: ["vegan"], equipment: ["ohne-ofen"] }),
      ),
    ).toBe(3);
  });
});
