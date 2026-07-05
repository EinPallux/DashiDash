/**
 * Content validation (docs/04 §10, docs/05 §4). Runs in CI and prebuild.
 * 1. Schema-validates every entity with Zod.
 * 2. Enforces cross-entity referential integrity.
 * 3. Enforces category rules (time caps, diet, difficulty, cost, 5-Zutaten …).
 *
 * Exits non-zero on any error, printing a grouped report.
 *
 * PHASE 6 (strict): per-category floor ≥ 5, catalog total must equal 60, and
 * every guide must be linked by ≥ 2 recipes (so the Lernen tab stays small but
 * integrated).
 */
import {
  Category,
  CategoryMeta,
  Guide,
  Ingredient,
  LexiconEntry,
  Recipe,
} from "../src/content/schema";
import { ingredients } from "../src/content/ingredients";
import { lexicon } from "../src/content/lexicon";
import { categories, CATEGORY_TIME_CAPS } from "../src/content/categories";
import { recipes } from "../src/content/recipes";
import { guides } from "../src/content/guides";
import { dishArtIds } from "../src/content/illustrations/registry";
import { costPerServing } from "../src/lib/costs";
import type { ZodType } from "zod";

const CATEGORY_FLOOR = 5; // Phase 6 strict floor (docs/05 §4).
const CATALOG_TARGET = 60;
const GUIDE_MIN_REFS = 2; // Every guide must be linked by ≥ 2 recipes.
const GUENSTIG_MAX_EUR = 2.5;
const SPICY_SOURCES = new Set([
  "gochujang",
  "doubanjiang",
  "sriracha",
  "shichimi",
  "chili-frisch",
  "curry-roux",
  "la-yu",
]);

const errors: string[] = [];
const notes: string[] = [];
const err = (msg: string) => errors.push(msg);

/* ------------------------------ 1. Schemas ----------------------------- */

function schemaCheck<T>(schema: ZodType<T>, items: unknown[], label: string) {
  items.forEach((item, i) => {
    const res = schema.safeParse(item);
    if (!res.success) {
      const id = (item as { id?: string })?.id ?? `#${i}`;
      const issues = res.error.issues
        .map((is) => `${is.path.join(".")}: ${is.message}`)
        .join("; ");
      err(`${label} „${id}“ – Schema: ${issues}`);
    }
  });
}

schemaCheck(Ingredient, ingredients, "Ingredient");
schemaCheck(LexiconEntry, lexicon, "Lexicon");
schemaCheck(CategoryMeta, categories, "Category");
schemaCheck(Recipe, recipes, "Recipe");
schemaCheck(Guide, guides, "Guide");

/* --------------------------- Lookup structures ------------------------- */

const ingredientsById = new Map(ingredients.map((i) => [i.id, i]));
const lexiconIds = new Set(lexicon.map((l) => l.id));
const guideIds = new Set(guides.map((g) => g.id));
const recipeIds = new Set(recipes.map((r) => r.id));

/* -------------------------- 2. Unique ids ------------------------------ */

function uniqueCheck(ids: string[], label: string) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) err(`${label}: doppelte id „${id}“`);
    seen.add(id);
  }
}
uniqueCheck(
  ingredients.map((i) => i.id),
  "Ingredient",
);
uniqueCheck(
  lexicon.map((l) => l.id),
  "Lexicon",
);
uniqueCheck(
  recipes.map((r) => r.id),
  "Recipe",
);
uniqueCheck(
  guides.map((g) => g.id),
  "Guide",
);
// A recipe id must not collide with an ingredient id (they are referenced in
// different contexts; a clash would be a real bug).
for (const r of recipes) {
  if (ingredientsById.has(r.id)) {
    err(`Recipe „${r.id}“ kollidiert mit einer Ingredient-id`);
  }
}

/* --------------------- 3. Ingredient referential ----------------------- */

for (const ing of ingredients) {
  // japanische-basics / asiaLaden items need a resolving lexiconId.
  if (ing.category === "japanische-basics" || ing.asiaLadenHint) {
    if (!ing.lexiconId) {
      err(`Ingredient „${ing.id}“: braucht eine lexiconId (Spezialzutat)`);
    }
  }
  if (ing.lexiconId && !lexiconIds.has(ing.lexiconId)) {
    err(`Ingredient „${ing.id}“: lexiconId „${ing.lexiconId}“ nicht gefunden`);
  }
  for (const sub of ing.substitutes) {
    if (sub.ingredientId && !ingredientsById.has(sub.ingredientId)) {
      err(
        `Ingredient „${ing.id}“: Substitut-ingredientId „${sub.ingredientId}“ nicht gefunden`,
      );
    }
  }
}

/* ------------------------ 4. Recipe referential ------------------------ */

for (const r of recipes) {
  const recipeIngredientIds = new Set(
    r.ingredients.map((ri) => ri.ingredientId),
  );

  for (const ri of r.ingredients) {
    if (!ingredientsById.has(ri.ingredientId)) {
      err(`Recipe „${r.id}“: Zutat „${ri.ingredientId}“ nicht gefunden`);
    }
  }
  for (const gid of r.guideIds) {
    if (!guideIds.has(gid)) {
      err(`Recipe „${r.id}“: guideId „${gid}“ nicht gefunden`);
    }
  }
  if (!dishArtIds.has(r.illustrationId)) {
    err(
      `Recipe „${r.id}“: illustrationId „${r.illustrationId}“ nicht im Dish-Art-Registry`,
    );
  }

  // Step {amount:id} tokens must reference an ingredient of THIS recipe.
  for (const step of r.steps) {
    const tokens = step.text.matchAll(/\{amount:([a-z0-9-]+)\}/g);
    for (const match of tokens) {
      const tokenId = match[1];
      if (tokenId && !recipeIngredientIds.has(tokenId)) {
        err(
          `Recipe „${r.id}“: Schritt-Token {amount:${tokenId}} ist keine Zutat des Rezepts`,
        );
      }
    }
  }
}

/* ------------------------- 5. Guide referential ------------------------ */

for (const g of guides) {
  for (const rid of g.recipeIds) {
    if (!recipeIds.has(rid)) {
      err(`Guide „${g.id}“: recipeId „${rid}“ nicht gefunden`);
    }
  }
}

// Every guide must be referenced by ≥ 2 recipes (via recipe.guideIds) so the
// Lernen tab stays integrated with the recipes rather than a lonely appendix.
const guideRefCount = new Map<string, number>();
for (const g of guides) guideRefCount.set(g.id, 0);
for (const r of recipes) {
  for (const gid of r.guideIds) {
    if (guideRefCount.has(gid)) {
      guideRefCount.set(gid, guideRefCount.get(gid)! + 1);
    }
  }
}
for (const [gid, count] of guideRefCount) {
  if (count < GUIDE_MIN_REFS) {
    err(
      `Guide „${gid}“: nur von ${count} Rezept(en) verlinkt, mindestens ${GUIDE_MIN_REFS} nötig`,
    );
  }
}

/* --------------------------- 6. Category rules ------------------------- */

const countByCategory = new Map<string, number>();
for (const cat of Category.options) countByCategory.set(cat, 0);
for (const r of recipes) {
  for (const cat of r.categories) {
    countByCategory.set(cat, (countByCategory.get(cat) ?? 0) + 1);
  }
}
for (const [cat, count] of countByCategory) {
  if (count < CATEGORY_FLOOR) {
    err(
      `Kategorie „${cat}“: nur ${count} Rezept(e), mindestens ${CATEGORY_FLOOR} nötig`,
    );
  }
}

// Every declared CategoryMeta id is a real Category and vice versa.
const metaIds = new Set(categories.map((c) => c.id));
for (const cat of Category.options) {
  if (!metaIds.has(cat)) err(`CategoryMeta fehlt für „${cat}“`);
}

/* --------------------------- 7. Recipe rules --------------------------- */

for (const r of recipes) {
  const cats = new Set(r.categories);

  if (r.timeMinutes < r.activeMinutes) {
    err(`Recipe „${r.id}“: timeMinutes < activeMinutes`);
  }

  for (const [cat, cap] of Object.entries(CATEGORY_TIME_CAPS)) {
    if (
      cats.has(cat as (typeof Category.options)[number]) &&
      r.timeMinutes > (cap as number)
    ) {
      err(`Recipe „${r.id}“: ${r.timeMinutes} Min > Cap ${cap} für „${cat}“`);
    }
  }

  if (cats.has("anfaenger") && r.difficulty !== "easy") {
    err(`Recipe „${r.id}“: Anfänger-Rezept muss „easy“ sein`);
  }

  if (
    cats.has("vegetarisch") &&
    !(r.diet === "vegetarisch" || r.diet === "vegan")
  ) {
    err(`Recipe „${r.id}“: in „vegetarisch“, aber diet=${r.diet}`);
  }

  if (cats.has("meal-prep") && !r.mealPrepNote) {
    err(`Recipe „${r.id}“: Meal-Prep-Rezept braucht mealPrepNote`);
  }

  if (cats.has("5-zutaten")) {
    const core = r.ingredients.filter((ri) => {
      if (ri.optional) return false;
      const ing = ingredientsById.get(ri.ingredientId);
      return ing ? !ing.isStaple : true;
    });
    if (core.length > 5) {
      err(`Recipe „${r.id}“: 5-Zutaten, aber ${core.length} Kernzutaten`);
    }
  }

  if (r.spicy > 0) {
    const hasSource = r.ingredients.some((ri) =>
      SPICY_SOURCES.has(ri.ingredientId),
    );
    if (!hasSource) {
      err(
        `Recipe „${r.id}“: spicy=${r.spicy}, aber keine Schärfe-Zutat gelistet`,
      );
    }
  }

  const { eur, unresolved } = costPerServing(r, ingredientsById);
  if (unresolved.length > 0) {
    err(
      `Recipe „${r.id}“: Kosten nicht berechenbar für [${unresolved.join(", ")}] (Einheit/Preis prüfen)`,
    );
  }
  if (cats.has("guenstig") && eur > GUENSTIG_MAX_EUR + 0.001) {
    err(
      `Recipe „${r.id}“: günstig, aber ${eur.toFixed(2)} €/Portion > ${GUENSTIG_MAX_EUR.toFixed(2)} €`,
    );
  }
}

/* ------------------------------ 8. Notes ------------------------------- */

if (recipes.length !== CATALOG_TARGET) {
  err(
    `Katalog: ${recipes.length} Rezepte, exakt ${CATALOG_TARGET} erwartet (Phase 6).`,
  );
}

/* ------------------------------ Report --------------------------------- */

console.log(
  `\nvalidate:content — ${ingredients.length} Zutaten · ${lexicon.length} Lexikon · ${recipes.length} Rezepte · ${guides.length} Guides`,
);
for (const n of notes) console.log(`  · ${n}`);

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} Fehler:`);
  for (const e of errors) console.error(`  – ${e}`);
  process.exit(1);
}

console.log("✅ Alle Content-Checks bestanden.\n");
