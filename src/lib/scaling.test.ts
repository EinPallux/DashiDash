import { describe, expect, it } from "vitest";
import type { Recipe, RecipeIngredient, Unit } from "@/content/schema";
import {
  fillAmountTokens,
  formatAmount,
  formatNumber,
  scale,
  scaleLine,
  servingFactor,
} from "./scaling";

const line = (over: Partial<RecipeIngredient>): RecipeIngredient => ({
  ingredientId: "x",
  amount: 100,
  unit: "g",
  group: "Hauptzutaten",
  optional: false,
  scalable: true,
  ...over,
});

describe("scale — rounding rules (docs/04 §7)", () => {
  it("g/ml: nearest 5 below 100, nearest 10 at/above 100", () => {
    expect(scale(150, "g", 0.5)).toBe(75); // 75 < 100 → 5er
    expect(scale(250, "g", 2)).toBe(500); // 500 ≥ 100 → 10er
    expect(scale(90, "ml", 1)).toBe(90);
    expect(scale(150, "g", 2)).toBe(300);
  });

  it("g/ml: never rounds a real amount down to 0", () => {
    expect(scale(10, "g", 0.1)).toBe(5);
  });

  it("kg/l: two decimals", () => {
    expect(scale(1, "kg", 0.25)).toBe(0.25);
    expect(scale(0.5, "l", 0.5)).toBe(0.25);
  });

  it("el/tl/stueck: nearest 0.5", () => {
    expect(scale(3, "el", 0.5)).toBe(1.5);
    expect(scale(4, "stueck", 0.5)).toBe(2);
    expect(scale(4, "stueck", 0.25)).toBe(1);
    expect(scale(1, "stueck", 1.5)).toBe(1.5);
  });

  it("zehe/bund/… : nearest 0.5 but at least 0.5", () => {
    expect(scale(1, "zehe", 0.25)).toBe(0.5);
    expect(scale(2, "packung", 0.1)).toBe(0.5);
  });

  it("prise/nach-geschmack never scale", () => {
    expect(scale(1, "prise", 4)).toBe(1);
    expect(scale(1, "nach-geschmack", 4)).toBe(1);
  });
});

describe("scale — properties", () => {
  const cases: { amount: number; unit: Unit }[] = [
    { amount: 160, unit: "g" },
    { amount: 3, unit: "el" },
    { amount: 4, unit: "stueck" },
    { amount: 2, unit: "packung" },
    { amount: 700, unit: "ml" },
  ];

  it("factor 1 is identity for on-grid authored amounts", () => {
    for (const c of cases) expect(scale(c.amount, c.unit, 1)).toBe(c.amount);
  });

  it("is monotonic non-decreasing in factor", () => {
    for (const c of cases) {
      let prev = -Infinity;
      for (const f of [0.25, 0.5, 1, 1.5, 2, 3, 4]) {
        const v = scale(c.amount, c.unit, f);
        expect(v).toBeGreaterThanOrEqual(prev);
        prev = v;
      }
    }
  });
});

describe("scaleLine", () => {
  it("passes through null (nach Geschmack)", () => {
    expect(scaleLine(line({ amount: null, unit: "prise" }), 2)).toBeNull();
  });

  it("ignores the factor when scalable is false", () => {
    expect(scaleLine(line({ amount: 1, unit: "el", scalable: false }), 4)).toBe(
      1,
    );
  });

  it("scales when scalable is true", () => {
    expect(scaleLine(line({ amount: 160, unit: "g" }), 2)).toBe(320);
  });
});

describe("formatNumber / formatAmount", () => {
  it("renders halves and quarters as glyphs", () => {
    expect(formatNumber(1.5)).toBe("1 ½");
    expect(formatNumber(0.5)).toBe("½");
    expect(formatNumber(0.25)).toBe("¼");
    expect(formatNumber(2)).toBe("2");
  });

  it("formats amount + unit as German text", () => {
    expect(formatAmount(1.5, "el")).toBe("1 ½ EL");
    expect(formatAmount(40, "g")).toBe("40 g");
    expect(formatAmount(0.25, "l")).toBe("0,25 l");
    expect(formatAmount(2.5, "stueck")).toBe("2 ½");
    expect(formatAmount(2, "zehe")).toBe("2 Zehen");
    expect(formatAmount(1, "zehe")).toBe("1 Zehe");
    expect(formatAmount(null, "nach-geschmack")).toBe("nach Geschmack");
    expect(formatAmount(1, "prise")).toBe("1 Prise");
  });
});

describe("fillAmountTokens", () => {
  const recipe = {
    id: "r",
    ingredients: [
      line({ ingredientId: "reis", amount: 160, unit: "g" }),
      line({ ingredientId: "ei", amount: 4, unit: "stueck" }),
      line({ ingredientId: "oel", amount: 1, unit: "el", scalable: false }),
    ],
  } as unknown as Recipe;

  it("replaces tokens with scaled amounts at factor 1", () => {
    expect(
      fillAmountTokens("{amount:reis} Reis, {amount:ei} Eier", recipe, 1),
    ).toBe("160 g Reis, 4 Eier");
  });

  it("scales tokens with the factor and respects scalable:false", () => {
    expect(
      fillAmountTokens(
        "{amount:reis}, {amount:ei}, {amount:oel} Öl",
        recipe,
        2,
      ),
    ).toBe("320 g, 8, 1 EL Öl");
  });

  it("drops unknown tokens", () => {
    expect(fillAmountTokens("{amount:unknown} X", recipe, 1)).toBe(" X");
  });
});

describe("servingFactor", () => {
  it("divides target by base servings", () => {
    expect(servingFactor({ servingsBase: 2 } as Recipe, 4)).toBe(2);
    expect(servingFactor({ servingsBase: 2 } as Recipe, 1)).toBe(0.5);
  });
});
