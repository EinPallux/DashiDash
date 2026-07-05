"use client";

import Link from "next/link";
import { useState } from "react";
import type { Ingredient, IngredientCategory } from "@/content/schema";
import { ingredients } from "@/content/ingredients";
import { DishArt } from "@/content/illustrations/registry";
import { Mascot } from "@/content/illustrations/Mascot";
import { Card } from "@/components/ui/Card";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { JuicyCheckbox } from "@/components/ui/JuicyCheckbox";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { IconChevronRight, IconSearch } from "@/components/ui/icons";
import { buildCard } from "@/components/recipe/card";
import { getIngredient, ingredientsById } from "@/lib/content";
import { recipes } from "@/content/recipes";
import {
  almostRecipes,
  matchAll,
  missingPackCost,
  readyRecipes,
  type RankedMatch,
} from "@/lib/matching";
import { normalize } from "@/lib/search";
import { DEFAULT_SERVINGS } from "@/lib/prefs";
import { addMissingToShopping } from "@/features/shopping/data";
import {
  dismissPantryFirstRun,
  setPantry,
  setStapleDisabled,
  usePantryFirstRunDone,
  useMatchInputs,
} from "@/features/pantry/data";

const CATEGORY_ORDER: IngredientCategory[] = [
  "japanische-basics",
  "frische-zutaten",
  "vorratsschrank",
  "gewuerze-oele",
  "tiefkuehl",
];
const CATEGORY_LABEL: Record<IngredientCategory, string> = {
  "japanische-basics": "Japanische Basics",
  "frische-zutaten": "Frische Zutaten",
  vorratsschrank: "Vorratsschrank",
  "gewuerze-oele": "Gewürze & Öle",
  tiefkuehl: "Tiefkühl",
};

// A handful of common items for the first-run "Was hast du zu Hause?" flow.
const QUICK_PICKS = [
  "shoyu",
  "mirin",
  "reis",
  "ei",
  "fruehlingszwiebel",
  "knoblauch",
  "ingwer",
  "tofu",
  "sesamoel",
  "miso-hell",
  "dashi-pulver",
  "nori",
];

export function PantryScreen() {
  const inputs = useMatchInputs();
  const firstRunDone = usePantryFirstRunDone();
  const [query, setQuery] = useState("");

  if (!inputs) {
    return (
      <div className="px-gutter pt-safe pt-6">
        <div className="bg-rice-warm rounded-card h-24 animate-pulse" />
      </div>
    );
  }

  const { pantrySet, staplesSet } = inputs;
  const isChecked = (ing: Ingredient) =>
    ing.isStaple ? staplesSet.has(ing.id) : pantrySet.has(ing.id);
  const toggle = (ing: Ingredient, value: boolean) =>
    ing.isStaple ? setStapleDisabled(ing.id, !value) : setPantry(ing.id, value);

  const matches = matchAll(recipes, pantrySet, staplesSet, ingredientsById);
  const ready = readyRecipes(matches, ingredientsById);
  const almost = almostRecipes(matches, ingredientsById);

  const q = normalize(query);
  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: ingredients.filter(
      (i) => i.category === cat && (q === "" || normalize(i.name).includes(q)),
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="pb-10">
      {/* header count */}
      <header className="px-gutter pt-safe pt-6">
        <p className="font-display text-caption text-dashi font-bold tracking-wide uppercase">
          Vorrat
        </p>
        <h1 className="text-display text-nori mt-1 leading-tight font-extrabold">
          <CountUpNumber value={ready.length} className="text-dashi" />{" "}
          {ready.length === 1 ? "Rezept" : "Rezepte"}
        </h1>
        <p className="text-body text-nori-60 mt-1">
          kannst du <strong className="text-nori">jetzt sofort</strong> kochen.
        </p>
      </header>

      {/* Reste-Retter */}
      <div className="px-gutter mt-4">
        <Link href="/vorrat/reste" className="block">
          <Card
            interactive
            className="bg-matcha-soft flex items-center gap-3 p-4"
          >
            <span className="text-2xl">🥕</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-heading text-nori font-bold">
                Reste retten
              </p>
              <p className="text-caption text-nori-60">
                Was muss weg? Finde passende Rezepte.
              </p>
            </div>
            <IconChevronRight className="text-nori-60 h-5 w-5" />
          </Card>
        </Link>
      </div>

      {/* first run */}
      {firstRunDone === false && (
        <FirstRun
          checkedIds={pantrySet}
          onToggle={(id, v) => setPantry(id, v)}
          onDone={dismissPantryFirstRun}
        />
      )}

      {/* match sections */}
      {ready.length > 0 && (
        <section className="mt-8">
          <h2 className="px-gutter font-display text-title text-nori font-extrabold">
            🟢 Sofort machbar
          </h2>
          <div className="no-scrollbar -mx-gutter px-gutter mt-3 flex gap-3 overflow-x-auto pb-1">
            {ready.slice(0, 12).map(({ recipe }) => (
              <RecipeCard
                key={recipe.id}
                data={buildCard(recipe)}
                size="rail"
                href={`/rezept/${recipe.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {almost.length > 0 && (
        <section className="px-gutter mt-8">
          <h2 className="font-display text-title text-nori font-extrabold">
            🟡 Fast machbar
          </h2>
          <p className="text-caption text-nori-60 mt-0.5">
            Nur 1–2 Zutaten fehlen.
          </p>
          <div className="mt-3 space-y-3">
            {almost.slice(0, 6).map((m) => (
              <AlmostCard key={m.recipe.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* checklist */}
      <section className="px-gutter mt-8">
        <h2 className="font-display text-title text-nori font-extrabold">
          Was hast du da?
        </h2>
        <div className="rounded-chip bg-paper border-hairline shadow-card mt-3 flex h-11 items-center gap-2.5 border px-4">
          <IconSearch className="text-nori-60 h-5 w-5 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zutat suchen…"
            className="text-body text-nori placeholder:text-nori-60 h-full w-full bg-transparent outline-none"
            aria-label="Zutat suchen"
          />
        </div>

        <div className="mt-4 space-y-5">
          {groups.map(({ cat, items }) => (
            <div key={cat}>
              <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
                {CATEGORY_LABEL[cat]}
              </p>
              <div className="rounded-card border-hairline bg-paper divide-hairline divide-y border">
                {items.map((ing) => (
                  <div key={ing.id} className="flex items-center px-4 py-2.5">
                    <JuicyCheckbox
                      checked={isChecked(ing)}
                      onChange={(v) => toggle(ing, v)}
                      label={
                        <span className="flex items-center gap-1.5">
                          {ing.emoji && <span>{ing.emoji}</span>}
                          {ing.name}
                          {ing.isStaple && (
                            <span className="text-nori-60 text-caption">
                              · Basis
                            </span>
                          )}
                        </span>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AlmostCard({ match }: { match: RankedMatch }) {
  const { recipe, match: result } = match;
  const [added, setAdded] = useState(false);
  const missingNames = result.missing
    .map((id) => getIngredient(id)?.name ?? id)
    .join(", ");
  const cost = missingPackCost(result.missing, ingredientsById).toLocaleString(
    "de-DE",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  );

  return (
    <Card className="p-3">
      <div className="flex gap-3">
        <Link
          href={`/rezept/${recipe.id}`}
          className="bg-rice-warm grid h-16 w-16 shrink-0 place-items-center rounded-[14px]"
        >
          <DishArt id={recipe.illustrationId} className="h-[86%] w-[86%]" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            href={`/rezept/${recipe.id}`}
            className="font-display text-heading text-nori font-bold"
          >
            {recipe.title}
          </Link>
          <p className="text-caption text-nori-60 mt-0.5">
            Fehlt nur:{" "}
            <span className="text-nori font-semibold">{missingNames}</span> · ≈{" "}
            {cost} €
          </p>
        </div>
      </div>
      <div className="mt-3">
        <ChunkyButton
          variant={added ? "success" : "secondary"}
          fullWidth
          disabled={added}
          onClick={async () => {
            await addMissingToShopping(
              recipe,
              result.missing,
              DEFAULT_SERVINGS,
            );
            setAdded(true);
          }}
        >
          {added ? "✓ Auf der Liste" : "Fehlendes auf die Liste"}
        </ChunkyButton>
      </div>
    </Card>
  );
}

function FirstRun({
  checkedIds,
  onToggle,
  onDone,
}: {
  checkedIds: Set<string>;
  onToggle: (id: string, v: boolean) => void;
  onDone: () => void;
}) {
  return (
    <section className="px-gutter mt-6">
      <Card className="bg-dashi-soft p-4">
        <div className="flex items-center gap-3">
          <Mascot className="h-14 w-14" />
          <div>
            <p className="font-display text-heading text-nori font-bold">
              Was hast du zu Hause?
            </p>
            <p className="text-caption text-nori-60">
              Tipp an, was da ist — den Rest kannst du unten ergänzen.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_PICKS.map((id) => {
            const ing = getIngredient(id);
            if (!ing) return null;
            const on = checkedIds.has(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggle(id, !on)}
                className={
                  "rounded-chip text-caption border px-3 py-1.5 font-bold " +
                  (on
                    ? "bg-dashi text-paper border-transparent"
                    : "bg-paper text-nori border-hairline")
                }
              >
                {ing.emoji ? `${ing.emoji} ` : ""}
                {ing.name}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <ChunkyButton variant="primary" fullWidth onClick={onDone}>
            Fertig
          </ChunkyButton>
        </div>
      </Card>
    </section>
  );
}
