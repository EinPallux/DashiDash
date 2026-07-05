"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { Category, Diet, Difficulty } from "@/content/schema";
import { recipes } from "@/content/recipes";
import { categories } from "@/content/categories";
import { Mascot } from "@/content/illustrations/Mascot";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { FilterChip } from "@/components/ui/FilterChip";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { IconSearch } from "@/components/ui/icons";
import { buildCard } from "@/components/recipe/card";
import { ingredientsById } from "@/lib/content";
import {
  EMPTY_FILTERS,
  countActiveFilters,
  filterRecipes,
  type EquipmentFilter,
  type RecipeFilters,
} from "@/lib/search";

const TIME_OPTIONS = [15, 20, 30, 45];
const DIET_OPTIONS: { value: Diet; label: string }[] = [
  { value: "vegetarisch", label: "Vegetarisch" },
  { value: "vegan", label: "Vegan" },
  { value: "fisch", label: "Fisch" },
  { value: "fleisch", label: "Fleisch" },
];
const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "mittel", label: "Mittel" },
  { value: "fortgeschritten", label: "Fortgeschritten" },
];
const SPICE_OPTIONS = [
  { value: 1, label: "Mild" },
  { value: 2, label: "Mittel" },
  { value: 3, label: "Scharf" },
];
const INGREDIENT_OPTIONS = [5, 8];
const COST_OPTIONS = [
  { value: 2, label: "≤ 2 €" },
  { value: 3.5, label: "≤ 3,50 €" },
  { value: 5, label: "≤ 5 €" },
];
const EQUIPMENT_OPTIONS: { value: EquipmentFilter; label: string }[] = [
  { value: "nur-pfanne", label: "Nur Pfanne" },
  { value: "ohne-reiskocher", label: "Ohne Reiskocher" },
  { value: "ohne-ofen", label: "Ohne Ofen" },
];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function SearchView({
  lockedCategory,
  autoFocus = false,
  title,
  subtitle,
}: {
  /** Preset + hide the category filter (used by /kategorie/[slug]). */
  lockedCategory?: Category;
  autoFocus?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<RecipeFilters>({
    ...EMPTY_FILTERS,
    categories: lockedCategory ? [lockedCategory] : [],
  });
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(
    () => filterRecipes(recipes, { query, filters, ingredientsById }),
    [query, filters],
  );

  const activeCount = countActiveFilters(filters) - (lockedCategory ? 1 : 0);

  const reset = () =>
    setFilters({
      ...EMPTY_FILTERS,
      categories: lockedCategory ? [lockedCategory] : [],
    });

  const hasHeader = Boolean(title || subtitle);

  return (
    <div className="pb-10">
      {hasHeader && (
        <header className="px-gutter pt-safe pt-6">
          {title && (
            <h1 className="text-display text-nori font-extrabold">{title}</h1>
          )}
          {subtitle && (
            <p className="text-body text-nori-60 mt-1">{subtitle}</p>
          )}
        </header>
      )}

      {/* search field */}
      <div className={cn("px-gutter", hasHeader ? "mt-4" : "pt-safe pt-4")}>
        <div className="rounded-chip bg-paper border-hairline shadow-card flex h-12 items-center gap-2.5 border px-4">
          <IconSearch className="text-nori-60 h-5 w-5 shrink-0" />
          <input
            type="search"
            inputMode="search"
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach Rezept, Zutat, …"
            className="text-body text-nori placeholder:text-nori-60 h-full w-full bg-transparent outline-none"
            aria-label="Rezepte suchen"
          />
        </div>
      </div>

      {/* controls: filter button + live count */}
      <div className="px-gutter mt-3 flex items-center justify-between gap-3">
        <FilterChip
          active={activeCount > 0}
          count={activeCount > 0 ? activeCount : undefined}
          onClick={() => setSheetOpen(true)}
        >
          Filter
        </FilterChip>
        <p className="text-heading text-nori font-bold">
          <CountUpNumber value={results.length} className="text-dashi" />{" "}
          {results.length === 1 ? "Rezept" : "Rezepte"}
        </p>
      </div>

      {/* results */}
      <div className="px-gutter mt-4">
        {results.length === 0 ? (
          <div className="rounded-card border-hairline bg-paper mt-6 border p-8 text-center">
            <Mascot className="mx-auto h-24 w-24" />
            <p className="text-body text-nori mt-3 font-semibold">
              Nichts gefunden — probier weniger Filter.
            </p>
            <p className="text-caption text-nori-60 mt-1">
              Oder bestell Sushi. 😌
            </p>
            <div className="mt-4 flex justify-center">
              <ChunkyButton variant="secondary" onClick={reset}>
                Filter zurücksetzen
              </ChunkyButton>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <RecipeCard
                key={r.id}
                data={buildCard(r)}
                size="grid"
                href={`/rezept/${r.id}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* filter sheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filter"
      >
        <Group label="Zeit">
          {TIME_OPTIONS.map((t) => (
            <FilterChip
              key={t}
              active={filters.maxTime === t}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  maxTime: f.maxTime === t ? null : t,
                }))
              }
            >
              ≤ {t} Min
            </FilterChip>
          ))}
        </Group>

        <Group label="Ernährung">
          {DIET_OPTIONS.map((o) => (
            <FilterChip
              key={o.value}
              active={filters.diet.includes(o.value)}
              onClick={() =>
                setFilters((f) => ({ ...f, diet: toggle(f.diet, o.value) }))
              }
            >
              {o.label}
            </FilterChip>
          ))}
        </Group>

        <Group label="Schwierigkeit">
          {DIFFICULTY_OPTIONS.map((o) => (
            <FilterChip
              key={o.value}
              active={filters.difficulty.includes(o.value)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  difficulty: toggle(f.difficulty, o.value),
                }))
              }
            >
              {o.label}
            </FilterChip>
          ))}
        </Group>

        <Group label="Schärfe (maximal)">
          {SPICE_OPTIONS.map((o) => (
            <FilterChip
              key={o.value}
              active={filters.maxSpice === o.value}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  maxSpice: f.maxSpice === o.value ? null : o.value,
                }))
              }
            >
              {o.label}
            </FilterChip>
          ))}
        </Group>

        <Group label="Zutaten">
          {INGREDIENT_OPTIONS.map((n) => (
            <FilterChip
              key={n}
              active={filters.maxIngredients === n}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  maxIngredients: f.maxIngredients === n ? null : n,
                }))
              }
            >
              ≤ {n} Zutaten
            </FilterChip>
          ))}
        </Group>

        <Group label="Kosten pro Portion">
          {COST_OPTIONS.map((o) => (
            <FilterChip
              key={o.value}
              active={filters.maxCost === o.value}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  maxCost: f.maxCost === o.value ? null : o.value,
                }))
              }
            >
              {o.label}
            </FilterChip>
          ))}
        </Group>

        <Group label="Equipment">
          {EQUIPMENT_OPTIONS.map((o) => (
            <FilterChip
              key={o.value}
              active={filters.equipment.includes(o.value)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  equipment: toggle(f.equipment, o.value),
                }))
              }
            >
              {o.label}
            </FilterChip>
          ))}
        </Group>

        {!lockedCategory && (
          <Group label="Kategorie">
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={filters.categories.includes(c.id)}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    categories: toggle(f.categories, c.id),
                  }))
                }
              >
                {c.title}
              </FilterChip>
            ))}
          </Group>
        )}

        <div className="mt-6 flex gap-3">
          <ChunkyButton variant="secondary" onClick={reset} className="flex-1">
            Zurücksetzen
          </ChunkyButton>
          <ChunkyButton
            variant="primary"
            onClick={() => setSheetOpen(false)}
            className="flex-1"
          >
            {results.length} anzeigen
          </ChunkyButton>
        </div>
      </BottomSheet>
    </div>
  );
}
