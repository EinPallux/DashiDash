"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PlannedMeal } from "@/lib/db";
import { recipes } from "@/content/recipes";
import { DishArt } from "@/content/illustrations/registry";
import { Mascot } from "@/content/illustrations/Mascot";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { FilterChip } from "@/components/ui/FilterChip";
import { IconPlus, IconSearch, IconTrash } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { ingredientsById, recipeById } from "@/lib/content";
import { costPerServing } from "@/lib/costs";
import { isoDate, weekDays } from "@/lib/dates";
import { matchRecipe } from "@/lib/matching";
import { filterRecipes } from "@/lib/search";
import { useDefaultServings } from "@/lib/prefs";
import { addMealsToShopping } from "@/features/shopping/data";
import { useMatchInputs } from "@/features/pantry/data";
import {
  addPlannedMeal,
  removePlannedMeal,
  setPlannedServings,
  usePlannedMeals,
} from "@/features/planner/data";

const SLOTS: { id: PlannedMeal["slot"]; label: string }[] = [
  { id: "fruehstueck", label: "Frühstück" },
  { id: "mittag", label: "Mittag" },
  { id: "abend", label: "Abend" },
];

const euro = (n: number) =>
  n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function PlanenScreen() {
  const router = useRouter();
  const meals = usePlannedMeals();
  const inputs = useMatchInputs();
  const [defaultServings] = useDefaultServings();
  const [selected, setSelected] = useState<string | null>(null);
  const [picker, setPicker] = useState<{
    date: string;
    slot: PlannedMeal["slot"];
  } | null>(null);

  if (!meals) {
    return (
      <div className="px-gutter pt-safe pt-6">
        <div className="bg-rice-warm rounded-card h-24 animate-pulse" />
      </div>
    );
  }

  const today = isoDate(new Date());
  const days = weekDays(new Date(), today);
  const selectedDate = selected ?? today;
  const dayMeals = meals.filter((m) => m.date === selectedDate);

  // week summary over all planned meals in the visible window
  const windowIso = new Set(days.map((d) => d.iso));
  const weekMeals = meals.filter((m) => windowIso.has(m.date));
  const weekCost = weekMeals.reduce((sum, m) => {
    const r = recipeById.get(m.recipeId);
    return r ? sum + costPerServing(r, ingredientsById).eur * m.servings : sum;
  }, 0);
  const avgTime = weekMeals.length
    ? Math.round(
        weekMeals.reduce(
          (s, m) => s + (recipeById.get(m.recipeId)?.timeMinutes ?? 0),
          0,
        ) / weekMeals.length,
      )
    : 0;

  const cookWholeWeek = async () => {
    await addMealsToShopping(
      weekMeals.map((m) => ({ recipeId: m.recipeId, servings: m.servings })),
    );
    router.push("/einkaufen");
  };

  return (
    <div className="pb-10">
      <header className="px-gutter pt-safe pt-6">
        <h1 className="text-display text-nori font-extrabold">Planen</h1>
      </header>

      {/* Plane clever hero */}
      <div className="px-gutter mt-4">
        <Link
          href="/planen/kombi"
          className="rounded-card bg-dashi-soft flex items-center gap-3 p-4"
        >
          <span className="text-2xl">✨</span>
          <div className="flex-1">
            <p className="font-display text-heading text-nori font-bold">
              Plane clever
            </p>
            <p className="text-caption text-nori-60">
              Gerichte, die sich Zutaten teilen — und Geld sparen.
            </p>
          </div>
        </Link>
      </div>

      {/* week strip */}
      <div className="no-scrollbar -mx-gutter px-gutter mt-5 flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => {
          const count = meals.filter((m) => m.date === d.iso).length;
          const active = d.iso === selectedDate;
          return (
            <button
              key={d.iso}
              type="button"
              onClick={() => setSelected(d.iso)}
              className={cn(
                "flex h-16 w-12 shrink-0 flex-col items-center justify-center rounded-[16px] border",
                active
                  ? "bg-dashi text-paper border-transparent"
                  : "bg-paper text-nori border-hairline",
              )}
            >
              <span className="text-caption font-bold">{d.weekdayShort}</span>
              <span className="font-display text-heading font-extrabold">
                {d.dayNum}
              </span>
              <span
                className={cn(
                  "mt-0.5 h-1.5 w-1.5 rounded-full",
                  count > 0
                    ? active
                      ? "bg-paper"
                      : "bg-dashi"
                    : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* slots for the selected day */}
      <div className="px-gutter mt-5 space-y-4">
        {SLOTS.map((slot) => {
          const slotMeals = dayMeals.filter((m) => m.slot === slot.id);
          if (slot.id !== "abend" && slotMeals.length === 0) return null;
          return (
            <section key={slot.id}>
              <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
                {slot.label}
              </p>
              <div className="space-y-2">
                {slotMeals.map((m) => (
                  <MealCard key={m.id} meal={m} />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setPicker({ date: selectedDate, slot: slot.id })
                  }
                  className="rounded-card border-hairline text-nori-60 flex w-full items-center justify-center gap-1.5 border border-dashed py-3 font-semibold"
                >
                  <IconPlus className="h-4 w-4" /> Rezept hinzufügen
                </button>
              </div>
            </section>
          );
        })}

        {/* add other slots */}
        <div className="flex gap-2">
          {SLOTS.filter(
            (s) => s.id !== "abend" && !dayMeals.some((m) => m.slot === s.id),
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPicker({ date: selectedDate, slot: s.id })}
              className="rounded-chip bg-paper border-hairline text-nori-60 text-caption border px-3 py-1.5 font-bold"
            >
              + {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* week summary + cook week */}
      {weekMeals.length > 0 && (
        <div className="px-gutter mt-8">
          <div className="rounded-card bg-nori text-paper p-4">
            <p className="text-caption text-paper/70 font-bold tracking-wide uppercase">
              Diese Woche
            </p>
            <p className="font-display text-heading mt-1 font-bold">
              {weekMeals.length}{" "}
              {weekMeals.length === 1 ? "Gericht" : "Gerichte"} · ≈{" "}
              {euro(weekCost)} € · Ø {avgTime} Min
            </p>
            <div className="mt-3">
              <ChunkyButton variant="primary" fullWidth onClick={cookWholeWeek}>
                Woche einkaufen 🛒
              </ChunkyButton>
            </div>
          </div>
        </div>
      )}

      {weekMeals.length === 0 && (
        <div className="px-gutter mt-8 text-center">
          <Mascot className="mx-auto h-24 w-24" />
          <p className="text-body text-nori mt-3 font-semibold">
            Noch nichts geplant.
          </p>
          <p className="text-caption text-nori-60 mt-1">
            Tipp auf „Plane clever“ oder füg unten Rezepte hinzu.
          </p>
        </div>
      )}

      {picker && (
        <PickerSheet
          onClose={() => setPicker(null)}
          onPick={async (recipeId) => {
            await addPlannedMeal({
              date: picker.date,
              slot: picker.slot,
              recipeId,
              servings: defaultServings,
            });
            setPicker(null);
          }}
          pantry={inputs}
        />
      )}
    </div>
  );
}

function MealCard({ meal }: { meal: PlannedMeal }) {
  const recipe = recipeById.get(meal.recipeId);
  if (!recipe) return null;
  return (
    <div className="rounded-card border-hairline bg-paper flex items-center gap-3 border p-2.5">
      <Link
        href={`/rezept/${recipe.id}`}
        className="bg-rice-warm grid h-14 w-14 shrink-0 place-items-center rounded-[12px]"
      >
        <DishArt id={recipe.illustrationId} className="h-[86%] w-[86%]" />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/rezept/${recipe.id}`}
          className="font-display text-body text-nori line-clamp-1 font-bold"
        >
          {recipe.title}
        </Link>
        <div className="mt-1 flex items-center gap-1">
          <button
            type="button"
            aria-label="weniger"
            onClick={() => setPlannedServings(meal.id!, meal.servings - 1)}
            className="bg-rice-warm text-nori grid h-6 w-6 place-items-center rounded-full text-sm font-bold"
          >
            −
          </button>
          <span className="text-caption text-nori-60 tabular w-16 text-center font-semibold">
            {meal.servings} Portion{meal.servings === 1 ? "" : "en"}
          </span>
          <button
            type="button"
            aria-label="mehr"
            onClick={() => setPlannedServings(meal.id!, meal.servings + 1)}
            className="bg-rice-warm text-nori grid h-6 w-6 place-items-center rounded-full text-sm font-bold"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label="Entfernen"
        onClick={() => removePlannedMeal(meal.id!)}
        className="text-nori-60 grid h-9 w-9 shrink-0 place-items-center"
      >
        <IconTrash className="h-5 w-5" />
      </button>
    </div>
  );
}

function PickerSheet({
  onClose,
  onPick,
  pantry,
}: {
  onClose: () => void;
  onPick: (recipeId: string) => void;
  pantry: { pantrySet: Set<string>; staplesSet: Set<string> } | undefined;
}) {
  const [query, setQuery] = useState("");
  const [onlyMakeable, setOnlyMakeable] = useState(false);

  const results = useMemo(() => {
    let list = filterRecipes(recipes, { query, ingredientsById });
    if (onlyMakeable && pantry) {
      list = list.filter(
        (r) =>
          matchRecipe(r, pantry.pantrySet, pantry.staplesSet, ingredientsById)
            .tier !== "far",
      );
    }
    return list;
  }, [query, onlyMakeable, pantry]);

  return (
    <BottomSheet open onClose={onClose} title="Rezept wählen">
      <div className="rounded-chip bg-rice-warm text-nori-60 mb-3 flex h-11 items-center gap-2.5 px-4">
        <IconSearch className="h-5 w-5 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche…"
          className="text-body text-nori placeholder:text-nori-60 h-full w-full bg-transparent outline-none"
          aria-label="Rezept suchen"
        />
      </div>
      {pantry && (
        <div className="mb-3">
          <FilterChip
            active={onlyMakeable}
            onClick={() => setOnlyMakeable((v) => !v)}
          >
            Aus Vorrat machbar
          </FilterChip>
        </div>
      )}
      <div className="space-y-2">
        {results.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onPick(r.id)}
            className="rounded-card border-hairline bg-paper flex w-full items-center gap-3 border p-2.5 text-left"
          >
            <div className="bg-rice-warm grid h-12 w-12 shrink-0 place-items-center rounded-[12px]">
              <DishArt id={r.illustrationId} className="h-[86%] w-[86%]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-body text-nori line-clamp-1 font-bold">
                {r.title}
              </p>
              <p className="text-caption text-nori-60">{r.timeMinutes} Min</p>
            </div>
            <IconPlus className="text-dashi h-5 w-5 shrink-0" />
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
