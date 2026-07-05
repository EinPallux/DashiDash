"use client";

import Link from "next/link";
import { recipes } from "@/content/recipes";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { IconChevronRight } from "@/components/ui/icons";
import { ingredientsById } from "@/lib/content";
import { matchAll, readyRecipes } from "@/lib/matching";
import { useMatchInputs } from "@/features/pantry/data";

/**
 * Entdecken pantry teaser (docs/01 §4.4, Phase 4): a live "X Rezepte aus deinem
 * Vorrat" shortcut. Hidden until the pantry has enough to make something, and
 * neutral (nothing) until Dexie resolves — so it never flashes on first paint.
 */
export function PantryTeaser() {
  const inputs = useMatchInputs();
  if (!inputs) return null;

  const ready = readyRecipes(
    matchAll(recipes, inputs.pantrySet, inputs.staplesSet, ingredientsById),
    ingredientsById,
  );
  if (ready.length === 0) return null;

  return (
    <div className="px-gutter mt-4">
      <Link
        href="/vorrat"
        className="rounded-card bg-matcha-soft flex items-center gap-3 p-4"
      >
        <span className="text-xl">🥢</span>
        <p className="text-body text-nori flex-1 font-semibold">
          <CountUpNumber
            value={ready.length}
            className="text-matcha font-bold"
          />{" "}
          {ready.length === 1 ? "Rezept" : "Rezepte"} aus deinem Vorrat
        </p>
        <IconChevronRight className="text-nori-60 h-5 w-5" />
      </Link>
    </div>
  );
}
