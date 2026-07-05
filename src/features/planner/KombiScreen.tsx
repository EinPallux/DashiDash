"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Diet } from "@/content/schema";
import { recipes } from "@/content/recipes";
import { DishArt } from "@/content/illustrations/registry";
import { Mascot } from "@/content/illustrations/Mascot";
import { Card } from "@/components/ui/Card";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { FilterChip } from "@/components/ui/FilterChip";
import { Stepper } from "@/components/ui/Stepper";
import { IconChevronRight } from "@/components/ui/icons";
import { getIngredient, ingredientsById, recipeById } from "@/lib/content";
import { suggestCombos, type ComboSuggestion } from "@/lib/combos";
import { addDays, isoDate } from "@/lib/dates";
import { addPlannedMeal } from "@/features/planner/data";
import { addMealsToShopping } from "@/features/shopping/data";
import { useMatchInputs } from "@/features/pantry/data";

const COMBO_SERVINGS = 2;

const TIME_OPTIONS = [20, 30, 45];
const DIET_OPTIONS: { value: Diet; label: string }[] = [
  { value: "vegetarisch", label: "Vegetarisch" },
  { value: "vegan", label: "Vegan" },
];
const BUDGET_OPTIONS = [15, 25];

const euro = (n: number) =>
  n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function KombiScreen() {
  const router = useRouter();
  const inputs = useMatchInputs();
  const [k, setK] = useState(3);
  const [maxTime, setMaxTime] = useState<number | null>(null);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [maxBudget, setMaxBudget] = useState<number | null>(null);

  const suggestions = useMemo(
    () =>
      suggestCombos(
        {
          k,
          constraints: {
            maxTimePerMeal: maxTime ?? undefined,
            diet: diet ?? undefined,
            maxBudgetTotal: maxBudget ?? undefined,
          },
          pantrySet: inputs?.pantrySet ?? new Set(),
        },
        recipes,
        ingredientsById,
      ),
    [k, maxTime, diet, maxBudget, inputs],
  );

  const apply = async (combo: ComboSuggestion) => {
    const today = new Date();
    const meals = combo.recipeIds.map((recipeId) => ({
      recipeId,
      servings: COMBO_SERVINGS,
    }));
    await Promise.all(
      combo.recipeIds.map((recipeId, i) =>
        addPlannedMeal({
          date: isoDate(addDays(today, i)),
          slot: "abend",
          recipeId,
          servings: COMBO_SERVINGS,
        }),
      ),
    );
    await addMealsToShopping(meals);
    router.push("/einkaufen");
  };

  return (
    <div className="pb-10">
      {/* top bar */}
      <div className="px-gutter pt-safe flex items-center gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Zurück"
          className="rounded-chip bg-paper border-hairline shadow-card text-nori flex h-10 w-10 rotate-180 items-center justify-center border"
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-title text-nori font-extrabold">
            ✨ Plane clever
          </h1>
        </div>
      </div>
      <p className="px-gutter text-body text-nori-60 mt-2">
        Gerichte, die sich Zutaten teilen — ein Einkauf, nichts fliegt weg.
      </p>

      {/* constraints */}
      <section className="px-gutter mt-5 space-y-4">
        <div className="rounded-card border-hairline bg-paper flex items-center justify-between gap-3 border p-4">
          <p className="text-body text-nori font-semibold">
            Wie viele Gerichte?
          </p>
          <Stepper
            value={k}
            onChange={setK}
            min={2}
            max={5}
            ariaLabel="Anzahl Gerichte"
          />
        </div>

        <div>
          <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
            Zeit pro Gericht
          </p>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((t) => (
              <FilterChip
                key={t}
                active={maxTime === t}
                onClick={() => setMaxTime((v) => (v === t ? null : t))}
              >
                ≤ {t} Min
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
            Ernährung
          </p>
          <div className="flex flex-wrap gap-2">
            {DIET_OPTIONS.map((o) => (
              <FilterChip
                key={o.value}
                active={diet === o.value}
                onClick={() => setDiet((v) => (v === o.value ? null : o.value))}
              >
                {o.label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
            Budget gesamt
          </p>
          <div className="flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map((b) => (
              <FilterChip
                key={b}
                active={maxBudget === b}
                onClick={() => setMaxBudget((v) => (v === b ? null : b))}
              >
                ≤ {b} €
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      {/* suggestions */}
      <section className="px-gutter mt-8">
        {suggestions.length === 0 ? (
          <div className="rounded-card border-hairline bg-paper border p-8 text-center">
            <Mascot className="mx-auto h-24 w-24" />
            <p className="text-body text-nori mt-3 font-semibold">
              Keine passende Kombi gefunden.
            </p>
            <p className="text-caption text-nori-60 mt-1">
              Lockere die Filter ein bisschen. 🍜
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((combo) => (
              <ComboCard
                key={combo.recipeIds.join("|")}
                combo={combo}
                onApply={apply}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ComboCard({
  combo,
  onApply,
}: {
  combo: ComboSuggestion;
  onApply: (c: ComboSuggestion) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        {combo.recipeIds.map((id) => (
          <div
            key={id}
            className="bg-rice-warm grid h-16 w-16 shrink-0 place-items-center rounded-[14px]"
          >
            <DishArt
              id={recipeById.get(id)!.illustrationId}
              className="h-[86%] w-[86%]"
            />
          </div>
        ))}
      </div>

      <p className="font-display text-heading text-nori mt-3 font-bold">
        {combo.recipeIds.map((id) => recipeById.get(id)!.title).join(" · ")}
      </p>

      <p className="text-body text-nori-60 mt-1">
        Teilt {combo.sharedIngredients.length} Zutaten ·{" "}
        <span className="text-matcha font-bold">
          sparst ca. {euro(combo.estSavedEur)} €
        </span>
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {combo.sharedIngredients.slice(0, 6).map((id) => (
          <span
            key={id}
            className="rounded-chip bg-dashi-soft text-dashi-deep text-caption px-2.5 py-1 font-semibold"
          >
            {getIngredient(id)?.name ?? id}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-caption text-nori-60">
          {combo.shoppingItemCount} Zutaten · ≈ {euro(combo.estCostTotal)} €
        </p>
        <ChunkyButton variant="primary" onClick={() => onApply(combo)}>
          Übernehmen
        </ChunkyButton>
      </div>
    </Card>
  );
}
