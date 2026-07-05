import type { Recipe, RecipeIngredient, Unit } from "@/content/schema";

/**
 * Portion scaling (docs/04 §7). Pure + unit-aware: every unit has its own
 * rounding so scaled amounts stay cookable (no "37,5 g" or "2,3 Eier"). Only
 * halves and quarters are ever rendered as fractions. The same `scale`
 * function feeds both the ingredient list and the step-text {amount:id} tokens,
 * so steps always match the list.
 */

const roundToHalf = (n: number) => Math.round(n * 2) / 2;

/**
 * Scale a single amount for a given unit and factor. Returns a cookable number
 * (still numeric — formatting happens in `formatAmount`). prise / nach-Geschmack
 * never scale.
 */
export function scale(amount: number, unit: Unit, factor: number): number {
  if (unit === "prise" || unit === "nach-geschmack") return amount;

  const raw = amount * factor;

  switch (unit) {
    case "kg":
    case "l":
      // 2 decimals.
      return Math.round(raw * 100) / 100;
    case "g":
    case "ml": {
      const step = raw < 100 ? 5 : 10;
      const rounded = Math.round(raw / step) * step;
      // Never round a real amount down to nothing.
      return raw > 0 ? Math.max(step, rounded) : 0;
    }
    case "el":
    case "tl":
    case "stueck":
      // Nearest 0.5.
      return roundToHalf(raw);
    default:
      // zehe, bund, blatt, packung, dose → nearest 0.5, min 0.5.
      return Math.max(0.5, roundToHalf(raw));
  }
}

/** Factor from a target serving count and the recipe's authored base. */
export function servingFactor(recipe: Recipe, servings: number): number {
  return servings / recipe.servingsBase;
}

/**
 * Scale one recipe-ingredient line. Honors `scalable: false` (e.g. Öl zum
 * Braten stays put) and passes through `null` ("nach Geschmack").
 */
export function scaleLine(
  line: RecipeIngredient,
  factor: number,
): number | null {
  if (line.amount === null) return null;
  return scale(line.amount, line.unit, line.scalable ? factor : 1);
}

/* ------------------------------ Formatting ----------------------------- */

const FRACTION: Record<string, string> = {
  "0.25": "¼",
  "0.5": "½",
  "0.75": "¾",
};

/** Render a number with halves/quarters as glyphs: 1.5 → "1 ½", 0.5 → "½". */
export function formatNumber(n: number): string {
  const whole = Math.floor(n + 1e-9);
  const frac = Math.round((n - whole) * 100) / 100;
  const glyph = FRACTION[String(frac)];
  if (glyph) return whole > 0 ? `${whole} ${glyph}` : glyph;
  return String(whole);
}

const decimal = (n: number) =>
  n.toLocaleString("de-DE", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });

/**
 * Render a scaled amount + unit as German UI text: "1 ½ EL", "40 g", "0,25 l",
 * "2 ½" (Stück — the noun carries the plural), "nach Geschmack".
 */
export function formatAmount(amount: number | null, unit: Unit): string {
  if (amount === null || unit === "nach-geschmack") return "nach Geschmack";
  if (unit === "prise")
    return amount === 1 ? "1 Prise" : `${formatNumber(amount)} Prisen`;
  if (unit === "kg" || unit === "l") return `${decimal(amount)} ${unit}`;

  const num = formatNumber(amount);
  switch (unit) {
    case "g":
    case "ml":
      return `${num} ${unit}`;
    case "el":
      return `${num} EL`;
    case "tl":
      return `${num} TL`;
    case "stueck":
      return num;
    case "zehe":
      return `${num} ${amount <= 1 ? "Zehe" : "Zehen"}`;
    case "bund":
      return `${num} Bund`;
    case "blatt":
      return `${num} Blatt`;
    case "packung":
      return `${num} ${amount <= 1 ? "Packung" : "Packungen"}`;
    case "dose":
      return `${num} ${amount <= 1 ? "Dose" : "Dosen"}`;
    default:
      return num;
  }
}

/**
 * Replace {amount:ingredientId} tokens in a step text with the scaled amount
 * for the current factor (docs/05 §1). Unknown tokens are dropped to "".
 */
export function fillAmountTokens(
  text: string,
  recipe: Recipe,
  factor: number,
): string {
  const byId = new Map(recipe.ingredients.map((l) => [l.ingredientId, l]));
  return text.replace(/\{amount:([a-z0-9-]+)\}/g, (_, id: string) => {
    const line = byId.get(id);
    if (!line) return "";
    const scaled = scaleLine(line, factor);
    return scaled === null ? "" : formatAmount(scaled, line.unit);
  });
}
