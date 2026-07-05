import type { Diet, Ingredient, Recipe } from "@/content/schema";

/**
 * Smart combos (docs/04 §8): propose k-recipe sets that share (perishable)
 * ingredients so one shopping trip covers several meals with minimal waste.
 * Pure + deterministic (stable sort keys) so the screen never reshuffles.
 * Greedy beam search — trivial at 60 recipes.
 */

export type ComboConstraints = {
  maxTimePerMeal?: number;
  diet?: Diet;
  maxBudgetTotal?: number;
};

export type ComboSuggestion = {
  recipeIds: string[];
  sharedIngredients: string[];
  estCostTotal: number;
  estSavedEur: number;
  shoppingItemCount: number;
};

const SEED_PAIRS = 20;
const BEAM_WIDTH = 10;
const NEAR_DUP = 0.8;

function dietOk(constraint: Diet | undefined, diet: Diet): boolean {
  if (!constraint) return true;
  if (constraint === diet) return true;
  return constraint === "vegetarisch" && diet === "vegan";
}

export function suggestCombos(
  opts: {
    k: number;
    constraints?: ComboConstraints;
    pantrySet?: ReadonlySet<string>;
  },
  recipes: Recipe[],
  ingredientsById: Map<string, Ingredient>,
): ComboSuggestion[] {
  const { k, constraints = {}, pantrySet = new Set<string>() } = opts;
  const pool = recipes.filter(
    (r) =>
      (constraints.maxTimePerMeal == null ||
        r.timeMinutes <= constraints.maxTimePerMeal) &&
      dietOk(constraints.diet, r.diet),
  );
  if (pool.length < k) return [];

  const recipeById = new Map(pool.map((r) => [r.id, r]));
  const shoppable = (r: Recipe) =>
    new Set(
      r.ingredients
        .filter(
          (l) => !l.optional && !ingredientsById.get(l.ingredientId)?.isStaple,
        )
        .map((l) => l.ingredientId),
    );
  const ingSets = new Map(pool.map((r) => [r.id, shoppable(r)]));

  const weight = (id: string) => {
    const ing = ingredientsById.get(id);
    const pack = ing?.price.packEur ?? ing?.price.eur ?? 0;
    return pack * (ing?.perishable ? 1.5 : 0.5);
  };

  const setScore = (ids: string[]): number => {
    const usage = new Map<string, number>();
    for (const id of ids)
      for (const ing of ingSets.get(id)!)
        usage.set(ing, (usage.get(ing) ?? 0) + 1);

    let score = 0;
    for (const [ing, n] of usage) {
      if (n >= 2) score += weight(ing) * (pantrySet.has(ing) ? 1.2 : 1);
    }
    // Penalize near-duplicate pairs.
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = ingSets.get(ids[i]!)!;
        const b = ingSets.get(ids[j]!)!;
        const inter = [...a].filter((x) => b.has(x)).length;
        if (inter / Math.min(a.size, b.size) >= NEAR_DUP) score -= 100;
      }
    }
    // Reward diet variety.
    score += new Set(ids.map((id) => recipeById.get(id)!.diet)).size * 0.5;
    return score;
  };

  const keyOf = (ids: string[]) => [...ids].sort().join("|");

  // Seed beams with the top pairs by pairwise overlap.
  const pairs: { ids: string[]; score: number }[] = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      const ids = [pool[i]!.id, pool[j]!.id];
      pairs.push({ ids, score: setScore(ids) });
    }
  }
  pairs.sort(
    (a, b) => b.score - a.score || keyOf(a.ids).localeCompare(keyOf(b.ids)),
  );

  let beams = pairs.slice(0, SEED_PAIRS);

  // Grow each beam one recipe at a time up to k.
  for (let size = 2; size < k; size++) {
    const next = new Map<string, { ids: string[]; score: number }>();
    for (const beam of beams) {
      for (const r of pool) {
        if (beam.ids.includes(r.id)) continue;
        const ids = [...beam.ids, r.id];
        const key = keyOf(ids);
        if (next.has(key)) continue;
        next.set(key, { ids, score: setScore(ids) });
      }
    }
    beams = [...next.values()]
      .sort(
        (a, b) => b.score - a.score || keyOf(a.ids).localeCompare(keyOf(b.ids)),
      )
      .slice(0, BEAM_WIDTH);
    if (beams.length === 0) break;
  }

  // Materialize, dedupe, filter by budget, keep top 3.
  const seen = new Set<string>();
  const suggestions: (ComboSuggestion & { score: number })[] = [];
  for (const beam of beams) {
    if (beam.ids.length !== k) continue;
    const key = keyOf(beam.ids);
    if (seen.has(key)) continue;
    seen.add(key);

    const usage = new Map<string, number>();
    for (const id of beam.ids)
      for (const ing of ingSets.get(id)!)
        usage.set(ing, (usage.get(ing) ?? 0) + 1);

    const sharedIngredients = [...usage.entries()]
      .filter(([, n]) => n >= 2)
      .map(([ing]) => ing)
      .sort();

    const shoppingIds = [...usage.keys()].filter((id) => !pantrySet.has(id));
    const estCostTotal = round2(
      shoppingIds.reduce((s, id) => {
        const ing = ingredientsById.get(id);
        return s + (ing?.price.packEur ?? ing?.price.eur ?? 0);
      }, 0),
    );

    const estSavedEur = round2(
      sharedIngredients
        .filter((id) => !pantrySet.has(id))
        .reduce((s, id) => {
          const ing = ingredientsById.get(id);
          const pack = ing?.price.packEur ?? ing?.price.eur ?? 0;
          return s + pack * (ing?.perishable ? 0.6 : 0.3);
        }, 0),
    );

    if (
      constraints.maxBudgetTotal != null &&
      estCostTotal > constraints.maxBudgetTotal
    ) {
      continue;
    }

    suggestions.push({
      recipeIds: [...beam.ids].sort((a, b) =>
        recipeById.get(a)!.title.localeCompare(recipeById.get(b)!.title),
      ),
      sharedIngredients,
      estCostTotal,
      estSavedEur,
      shoppingItemCount: shoppingIds.length,
      score: beam.score,
    });
  }

  return suggestions
    .sort(
      (a, b) =>
        b.score - a.score ||
        keyOf(a.recipeIds).localeCompare(keyOf(b.recipeIds)),
    )
    .slice(0, 3)
    .map((s) => ({
      recipeIds: s.recipeIds,
      sharedIngredients: s.sharedIngredients,
      estCostTotal: s.estCostTotal,
      estSavedEur: s.estSavedEur,
      shoppingItemCount: s.shoppingItemCount,
    }));
}

const round2 = (n: number) => Math.round(n * 100) / 100;
