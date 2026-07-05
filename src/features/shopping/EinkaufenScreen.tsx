"use client";

import { useState } from "react";
import { Mascot } from "@/content/illustrations/Mascot";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { JuicyCheckbox } from "@/components/ui/JuicyCheckbox";
import { ProgressBar } from "@/components/ui/Progress";
import { IconPlus } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { ingredientsById, recipeById } from "@/lib/content";
import { buildShoppingView, type ShoppingLine } from "@/lib/shopping";
import { useMatchInputs } from "@/features/pantry/data";
import {
  addManualItem,
  clearAllShopping,
  clearChecked,
  moveCheckedToPantry,
  setShoppingChecked,
  useShoppingItems,
} from "@/features/shopping/data";

const euro = (n: number) =>
  n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function EinkaufenScreen() {
  const items = useShoppingItems();
  const inputs = useMatchInputs();
  const [manual, setManual] = useState("");

  if (!items || !inputs) {
    return (
      <div className="px-gutter pt-safe pt-6">
        <div className="bg-rice-warm rounded-card h-24 animate-pulse" />
      </div>
    );
  }

  const view = buildShoppingView(items, {
    recipesById: recipeById,
    ingredientsById,
    pantrySet: inputs.pantrySet,
  });

  const isEmpty =
    view.groups.length === 0 &&
    view.checked.length === 0 &&
    view.have.length === 0;

  const submitManual = () => {
    addManualItem(manual);
    setManual("");
  };

  return (
    <div className="pb-10">
      {/* header */}
      <header className="px-gutter pt-safe pt-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-display text-nori font-extrabold">
              Einkaufsliste
            </h1>
            <p className="text-caption text-nori-60 mt-0.5">
              ≈ {euro(view.totalEur)} € · grobe Schätzung
            </p>
          </div>
          {view.progress.total > 0 && (
            <p className="text-heading text-nori tabular font-bold">
              {view.progress.done}/{view.progress.total}
            </p>
          )}
        </div>
        {view.progress.total > 0 && (
          <div className="mt-3">
            <ProgressBar value={view.progress.done / view.progress.total} />
          </div>
        )}
      </header>

      {/* manual add */}
      <div className="px-gutter mt-4">
        <div className="rounded-chip bg-paper border-hairline shadow-card flex h-11 items-center gap-2 border pr-1 pl-4">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitManual()}
            placeholder="Eigenes hinzufügen…"
            className="text-body text-nori placeholder:text-nori-60 h-full w-full bg-transparent outline-none"
            aria-label="Eigenen Artikel hinzufügen"
          />
          <button
            type="button"
            onClick={submitManual}
            aria-label="Hinzufügen"
            className="bg-dashi text-paper grid h-9 w-9 shrink-0 place-items-center rounded-full"
          >
            <IconPlus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isEmpty ? (
        <div className="px-gutter mt-8">
          <div className="rounded-card border-hairline bg-paper border p-8 text-center">
            <Mascot className="mx-auto h-24 w-24" />
            <p className="text-body text-nori mt-3 font-semibold">
              Deine Liste ist noch leer.
            </p>
            <p className="text-caption text-nori-60 mt-1">
              Füg Rezepte oder eine ganze Woche hinzu — oder tipp oben was ein.
            </p>
          </div>
        </div>
      ) : (
        <div className="px-gutter mt-6 space-y-6">
          {view.groups.map((group) => (
            <section key={group.section}>
              <h2 className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
                {group.label}
              </h2>
              <div className="rounded-card border-hairline bg-paper divide-hairline divide-y border">
                {group.lines.map((line) => (
                  <Row key={line.itemId} line={line} />
                ))}
              </div>
            </section>
          ))}

          {/* checked / done */}
          {view.checked.length > 0 && (
            <section>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-caption text-nori-60 font-bold tracking-wide uppercase">
                  Erledigt ({view.checked.length})
                </h2>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => moveCheckedToPantry()}
                    className="text-caption text-matcha font-bold"
                  >
                    In den Vorrat
                  </button>
                  <button
                    type="button"
                    onClick={() => clearChecked()}
                    className="text-caption text-nori-60 font-bold"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
              <div className="rounded-card border-hairline bg-paper divide-hairline divide-y border opacity-70">
                {view.checked.map((line) => (
                  <Row key={line.itemId} line={line} />
                ))}
              </div>
            </section>
          )}

          {/* already in pantry */}
          {view.have.length > 0 && (
            <section>
              <h2 className="text-caption text-nori-60 mb-2 font-bold tracking-wide uppercase">
                Hast du schon ✓
              </h2>
              <div className="rounded-card bg-matcha-soft/50 flex flex-wrap gap-2 p-3">
                {view.have.map((line) => (
                  <span
                    key={line.itemId}
                    className="text-caption text-nori-60 rounded-chip bg-paper px-2.5 py-1"
                  >
                    {line.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="pt-2">
            <ChunkyButton
              variant="secondary"
              fullWidth
              onClick={() => clearAllShopping()}
            >
              Liste leeren
            </ChunkyButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ line }: { line: ShoppingLine }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <JuicyCheckbox
        checked={line.checked}
        onChange={(v) => setShoppingChecked(line.itemId, v)}
        label={
          <span
            className={cn(
              "flex flex-col",
              line.checked && "text-nori-60 line-through",
            )}
          >
            <span className="text-body">
              {line.quantityText && (
                <span className="font-bold">{line.quantityText} </span>
              )}
              {line.name}
            </span>
            {(line.sourceLabel || line.asiaLadenHint) && (
              <span className="text-caption text-nori-60 no-underline">
                {line.asiaLadenHint && "🏮 Am besten im Asia-Laden"}
                {line.asiaLadenHint && line.sourceLabel && " · "}
                {line.sourceLabel}
              </span>
            )}
          </span>
        }
      />
    </div>
  );
}
