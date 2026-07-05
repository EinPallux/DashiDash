"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Recipe, RecipeIngredient } from "@/content/schema";
import { DishArt } from "@/content/illustrations/registry";
import {
  DietBadge,
  DifficultyBadge,
  SpiceBadge,
  type Difficulty as DiffLevel,
  type SpiceLevel,
} from "@/components/ui/Badge";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { StatPill } from "@/components/ui/StatPill";
import { Stepper } from "@/components/ui/Stepper";
import {
  IconBasket,
  IconChevronRight,
  IconClock,
  IconEuro,
  IconInfo,
} from "@/components/ui/icons";
import { buildCard } from "@/components/recipe/card";
import { EQUIPMENT_META } from "@/components/recipe/equipment";
import { LexiconSheet } from "@/components/recipe/LexiconSheet";
import {
  categoryById,
  getGuide,
  getIngredient,
  relatedRecipes,
} from "@/lib/content";
import { costBadgeEur } from "@/lib/costs";
import { useDefaultServings } from "@/lib/prefs";
import { recipeMeta } from "@/lib/search";
import { matchRecipe } from "@/lib/matching";
import {
  fillAmountTokens,
  formatAmount,
  scaleLine,
  servingFactor,
} from "@/lib/scaling";
import { ingredientsById } from "@/lib/content";
import { useMatchInputs } from "@/features/pantry/data";
import { addMissingToShopping } from "@/features/shopping/data";
import { IconCheck } from "@/components/ui/icons";

type PantryStatus = "have" | "sub" | "missing" | null;

const DIFF_LEVEL: Record<Recipe["difficulty"], DiffLevel> = {
  easy: 1,
  mittel: 2,
  fortgeschritten: 3,
};

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const [defaultServings] = useDefaultServings();
  const [servings, setServings] = useState<number | null>(null);
  const activeServings = servings ?? defaultServings;
  const factor = servingFactor(recipe, activeServings);

  const [lexiconId, setLexiconId] = useState<string | null>(null);

  const meta = recipeMeta(recipe, ingredientsById);
  const cost = costBadgeEur(meta.cost).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const groups = useMemo(() => {
    const order: string[] = [];
    const byGroup = new Map<string, RecipeIngredient[]>();
    for (const line of recipe.ingredients) {
      if (!byGroup.has(line.group)) {
        byGroup.set(line.group, []);
        order.push(line.group);
      }
      byGroup.get(line.group)!.push(line);
    }
    return order.map((group) => ({ group, lines: byGroup.get(group)! }));
  }, [recipe]);

  const related = useMemo(() => relatedRecipes(recipe, 3), [recipe]);

  // Pantry awareness (docs/01 §4.4). Neutral until Dexie resolves.
  const inputs = useMatchInputs();
  const match = inputs
    ? matchRecipe(recipe, inputs.pantrySet, inputs.staplesSet, ingredientsById)
    : undefined;
  const [addedToList, setAddedToList] = useState(false);

  const statusFor = (line: RecipeIngredient): PantryStatus => {
    if (!inputs) return null;
    const id = line.ingredientId;
    if (inputs.pantrySet.has(id)) return "have";
    const ing = ingredientsById.get(id);
    if (ing?.isStaple && inputs.staplesSet.has(id)) return "have";
    if (match?.substitutions.some((s) => s.ingredientId === id)) return "sub";
    return "missing";
  };

  return (
    <div className="pb-36">
      {/* top bar */}
      <div className="px-gutter pt-safe flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Zurück"
          className="rounded-chip bg-paper border-hairline shadow-card text-nori flex h-10 w-10 rotate-180 items-center justify-center border"
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* hero */}
      <div className="px-gutter mt-2">
        <div className="rounded-card bg-rice-warm grid aspect-[4/3] place-items-center">
          <DishArt
            id={recipe.illustrationId}
            title={recipe.title}
            className="h-[78%] w-[78%]"
          />
        </div>
        <h1 className="font-display text-display text-nori mt-4 leading-tight font-extrabold">
          {recipe.title}
        </h1>
        {recipe.titleJp && (
          <p className="text-heading text-nori-60 mt-0.5">{recipe.titleJp}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.categories.map((c) => {
            const cat = categoryById.get(c);
            return (
              <Link
                key={c}
                href={`/kategorie/${c}`}
                className="rounded-chip bg-dashi-soft text-dashi-deep text-caption px-3 py-1 font-bold"
              >
                {cat?.title ?? c}
              </Link>
            );
          })}
        </div>
      </div>

      {/* stat row */}
      <div className="px-gutter mt-4 flex flex-wrap gap-2">
        <StatPill icon={<IconClock />}>{recipe.timeMinutes} Min</StatPill>
        <StatPill>davon aktiv: {recipe.activeMinutes} Min</StatPill>
        <DifficultyBadge level={DIFF_LEVEL[recipe.difficulty]} />
        <StatPill icon={<IconBasket />}>
          {meta.ingredientCount} Zutaten
        </StatPill>
        <StatPill icon={<IconEuro />}>≈ {cost} € / Portion</StatPill>
        <DietBadge diet={recipe.diet} />
        <SpiceBadge level={recipe.spicy as SpiceLevel} showZero />
      </div>

      {/* intro */}
      <p className="px-gutter text-body text-nori mt-4">{recipe.intro}</p>

      {/* portions */}
      <section className="px-gutter mt-6">
        <div className="rounded-card border-hairline bg-paper flex items-center justify-between gap-3 border p-4">
          <div>
            <p className="font-display text-heading text-nori font-bold">
              Portionen
            </p>
            <p className="text-caption text-nori-60">
              Alle Mengen rechnen mit.
            </p>
          </div>
          <Stepper
            value={activeServings}
            onChange={setServings}
            min={1}
            max={8}
            ariaLabel="Portionen"
          />
        </div>
      </section>

      {/* ingredients */}
      <section className="px-gutter mt-6">
        <h2 className="font-display text-title text-nori font-extrabold">
          Zutaten
        </h2>
        <div className="mt-3 space-y-5">
          {groups.map(({ group, lines }) => (
            <div key={group}>
              {groups.length > 1 && (
                <p className="text-caption text-nori-60 mb-1 font-bold tracking-wide uppercase">
                  {group}
                </p>
              )}
              <div className="rounded-card border-hairline bg-paper border px-4">
                {lines.map((line, i) => (
                  <IngredientRow
                    key={`${line.ingredientId}-${i}`}
                    line={line}
                    factor={factor}
                    status={statusFor(line)}
                    onLexicon={setLexiconId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {match && match.missing.length > 0 && (
          <div className="mt-4">
            <ChunkyButton
              variant={addedToList ? "success" : "primary"}
              fullWidth
              disabled={addedToList}
              onClick={async () => {
                await addMissingToShopping(
                  recipe,
                  match.missing,
                  activeServings,
                );
                setAddedToList(true);
              }}
            >
              {addedToList
                ? "✓ Auf der Einkaufsliste"
                : `Fehlendes auf die Liste (${match.missing.length})`}
            </ChunkyButton>
          </div>
        )}
      </section>

      {/* equipment */}
      <section className="px-gutter mt-6">
        <h2 className="font-display text-title text-nori font-extrabold">
          Das brauchst du
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.equipment.map((e) => {
            const { label, Icon } = EQUIPMENT_META[e];
            return (
              <span
                key={e}
                className="rounded-chip bg-rice-warm text-nori text-caption inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold"
              >
                <Icon className="text-nori-60 h-4 w-4" />
                {label}
              </span>
            );
          })}
        </div>
      </section>

      {/* steps preview */}
      <section className="px-gutter mt-6">
        <h2 className="font-display text-title text-nori font-extrabold">
          Schritte
        </h2>
        <ol className="mt-3 space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="bg-dashi-soft text-dashi-deep font-display grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.85rem] font-extrabold">
                {i + 1}
              </span>
              <p className="text-body text-nori pt-0.5">
                {fillAmountTokens(step.text, recipe, factor)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* substitutions */}
      {recipe.substitutionNotes && (
        <section className="px-gutter mt-6">
          <div className="rounded-card bg-matcha-soft p-4">
            <p className="font-display text-heading text-nori font-bold">
              Kein Original da? 🔄
            </p>
            <p className="text-body text-nori mt-1">
              {recipe.substitutionNotes}
            </p>
          </div>
        </section>
      )}

      {/* learn cross-links (docs/06 recipe↔guide) */}
      {recipe.guideIds.length > 0 && (
        <section className="px-gutter mt-6">
          <h2 className="font-display text-title text-nori font-extrabold">
            Mehr dazu lernen
          </h2>
          <div className="mt-3 space-y-2">
            {recipe.guideIds.map((gid) => {
              const guide = getGuide(gid);
              if (!guide) return null;
              return (
                <Link
                  key={gid}
                  href={`/lernen/guide/${gid}`}
                  className="rounded-card border-hairline bg-paper shadow-card flex items-center gap-3 border p-3 active:scale-[0.99]"
                >
                  <span
                    aria-hidden
                    className="rounded-chip bg-rice-warm grid h-11 w-11 shrink-0 place-items-center text-2xl"
                  >
                    {guide.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-heading text-nori font-bold">
                      {guide.title}
                    </p>
                    <p className="text-caption text-nori-60 line-clamp-1">
                      {guide.teaser}
                    </p>
                  </div>
                  <IconChevronRight className="text-nori-60 h-5 w-5 shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* related */}
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="px-gutter font-display text-title text-nori font-extrabold">
            Passt dazu
          </h2>
          <div className="no-scrollbar -mx-gutter px-gutter mt-3 flex gap-3 overflow-x-auto pb-1">
            {related.map((r) => (
              <RecipeCard
                key={r.id}
                data={buildCard(r)}
                size="rail"
                href={`/rezept/${r.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* sticky CTA — floats above the tab bar with a fade so content behind
          it never collides. Only the button is interactive. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+66px)] z-40">
        <div className="from-rice via-rice px-gutter mx-auto max-w-[640px] bg-gradient-to-t to-transparent pt-8 pb-2">
          <ChunkyButton
            variant="primary"
            size="l"
            fullWidth
            className="pointer-events-auto"
            onClick={() =>
              router.push(`/rezept/${recipe.id}/kochen?p=${activeServings}`)
            }
          >
            Los geht&apos;s 🔥
          </ChunkyButton>
        </div>
      </div>

      <LexiconSheet lexiconId={lexiconId} onClose={() => setLexiconId(null)} />
    </div>
  );
}

function StatusDot({ status }: { status: PantryStatus }) {
  if (status === null) return <span className="h-5 w-5 shrink-0" aria-hidden />;
  if (status === "have")
    return (
      <span
        className="bg-matcha text-paper grid h-5 w-5 shrink-0 place-items-center rounded-full"
        aria-label="hast du"
        title="hast du"
      >
        <IconCheck className="h-3.5 w-3.5" />
      </span>
    );
  if (status === "sub")
    return (
      <span
        className="bg-sora/15 text-sora grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.7rem]"
        aria-label="ersetzbar"
        title="ersetzbar"
      >
        ✨
      </span>
    );
  return (
    <span
      className="border-nori/20 h-5 w-5 shrink-0 rounded-full border-2"
      aria-label="fehlt"
      title="fehlt"
    />
  );
}

function IngredientRow({
  line,
  factor,
  status,
  onLexicon,
}: {
  line: RecipeIngredient;
  factor: number;
  status: PantryStatus;
  onLexicon: (lexiconId: string) => void;
}) {
  const ing = getIngredient(line.ingredientId);
  const amountText = formatAmount(scaleLine(line, factor), line.unit);
  const name = ing?.name ?? line.ingredientId;
  const lexiconId = ing?.lexiconId;

  return (
    <div className="border-hairline flex items-center gap-2.5 border-b py-2.5 last:border-0">
      <StatusDot status={status} />
      <div className="w-20 shrink-0 text-right">
        <motion.span
          key={amountText}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="text-body text-nori tabular font-bold"
        >
          {amountText}
        </motion.span>
      </div>
      <div className="min-w-0 flex-1">
        {lexiconId ? (
          <button
            type="button"
            onClick={() => onLexicon(lexiconId)}
            className="text-body text-nori decoration-sora inline text-left underline decoration-dotted underline-offset-2"
          >
            {name}
            <IconInfo className="text-sora ml-1 inline h-4 w-4 align-text-bottom" />
          </button>
        ) : (
          <span className="text-body text-nori">{name}</span>
        )}
        {line.optional && (
          <span className="text-nori-60 text-body"> (optional)</span>
        )}
        {line.note && (
          <span className="text-caption text-nori-60"> · {line.note}</span>
        )}
      </div>
    </div>
  );
}
