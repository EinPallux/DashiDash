"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ingredients } from "@/content/ingredients";
import { recipes } from "@/content/recipes";
import { DishArt } from "@/content/illustrations/registry";
import { Mascot } from "@/content/illustrations/Mascot";
import { Card } from "@/components/ui/Card";
import { IconChevronRight } from "@/components/ui/icons";
import { getIngredient, ingredientsById } from "@/lib/content";
import { suggestForLeftovers, type MatchTier } from "@/lib/matching";
import { useMatchInputs } from "@/features/pantry/data";

const TIER_LABEL: Record<MatchTier, { text: string; cls: string }> = {
  ready: { text: "Sofort machbar", cls: "bg-matcha-soft text-matcha" },
  almost: { text: "Fast machbar", cls: "bg-tamago/20 text-nori" },
  far: { text: "Einkauf nötig", cls: "bg-rice-warm text-nori-60" },
};

export function ResteRetterScreen() {
  const router = useRouter();
  const inputs = useMatchInputs();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const perishables = [...ingredients.filter((i) => i.perishable)];
  if (inputs) {
    const { pantrySet } = inputs;
    perishables.sort(
      (a, b) => (pantrySet.has(b.id) ? 1 : 0) - (pantrySet.has(a.id) ? 1 : 0),
    );
  }

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 4) next.add(id);
      return next;
    });

  const results =
    inputs && selected.size > 0
      ? suggestForLeftovers(
          selected,
          recipes,
          inputs.pantrySet,
          inputs.staplesSet,
          ingredientsById,
        )
      : [];

  const selectedNames = [...selected]
    .map((id) => getIngredient(id)?.name ?? id)
    .join(", ");

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
        <h1 className="font-display text-title text-nori font-extrabold">
          Reste retten
        </h1>
      </div>

      <p className="px-gutter text-body text-nori-60 mt-3">
        {selected.size > 0
          ? `Rette dein${selected.size > 1 ? "e" : ""}: ${selectedNames}`
          : "Was muss weg? Wähl bis zu 4 Zutaten."}
      </p>

      {/* quick-pick grid */}
      <div className="no-scrollbar px-gutter mt-4 flex flex-wrap gap-2">
        {perishables.map((ing) => {
          const on = selected.has(ing.id);
          const disabled = !on && selected.size >= 4;
          return (
            <button
              key={ing.id}
              type="button"
              onClick={() => toggle(ing.id)}
              disabled={disabled}
              className={
                "rounded-chip text-caption border px-3 py-1.5 font-bold " +
                (on
                  ? "bg-dashi text-paper border-transparent"
                  : "bg-paper text-nori border-hairline") +
                (disabled ? " opacity-40" : "")
              }
            >
              {ing.emoji ? `${ing.emoji} ` : ""}
              {ing.name}
            </button>
          );
        })}
      </div>

      {/* results */}
      <div className="px-gutter mt-6">
        {selected.size === 0 ? (
          <div className="rounded-card border-hairline bg-paper border p-8 text-center">
            <Mascot className="mx-auto h-24 w-24" />
            <p className="text-body text-nori mt-3 font-semibold">
              Wähl oben, was gerettet werden muss.
            </p>
            <p className="text-caption text-nori-60 mt-1">
              Dann findest du hier passende Rezepte.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-card border-hairline bg-paper border p-8 text-center">
            <Mascot className="mx-auto h-24 w-24" />
            <p className="text-body text-nori mt-3 font-semibold">
              Dafür hab ich (noch) kein Rezept.
            </p>
            <p className="text-caption text-nori-60 mt-1">
              Probier eine andere Kombi. 🍜
            </p>
          </div>
        ) : (
          <>
            <p className="font-display text-heading text-nori mb-3 font-bold">
              {results.length} {results.length === 1 ? "Idee" : "Ideen"}:
            </p>
            <div className="space-y-3">
              {results.map(({ recipe, match, usedLeftovers }) => {
                const tier = TIER_LABEL[match.tier];
                const uses = usedLeftovers
                  .map((id) => getIngredient(id)?.name ?? id)
                  .join(", ");
                return (
                  <Link key={recipe.id} href={`/rezept/${recipe.id}`}>
                    <Card interactive className="flex items-center gap-3 p-3">
                      <div className="bg-rice-warm grid h-16 w-16 shrink-0 place-items-center rounded-[14px]">
                        <DishArt
                          id={recipe.illustrationId}
                          className="h-[86%] w-[86%]"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-heading text-nori font-bold">
                          {recipe.title}
                        </p>
                        <p className="text-caption text-nori-60 mt-0.5">
                          Nutzt:{" "}
                          <span className="text-nori font-semibold">
                            {uses}
                          </span>
                        </p>
                        <span
                          className={
                            "rounded-chip text-caption mt-1.5 inline-block px-2 py-0.5 font-bold " +
                            tier.cls
                          }
                        >
                          {tier.text} · {recipe.timeMinutes} Min
                        </span>
                      </div>
                      <IconChevronRight className="text-nori-60 h-5 w-5 shrink-0" />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
