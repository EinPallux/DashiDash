import Link from "next/link";
import type { CategoryMeta } from "@/content/schema";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { IconChevronRight } from "@/components/ui/icons";
import { buildCard } from "@/components/recipe/card";
import { recipesInCategory } from "@/lib/content";

/**
 * A horizontally-scrollable rail of recipe cards for one category (docs/01
 * §4.1). Title + "Alle →" to the filtered grid. Renders nothing if the
 * category has no recipes yet.
 */
export function CategoryRail({ category }: { category: CategoryMeta }) {
  const list = recipesInCategory(category.id).slice(0, 8);
  if (list.length === 0) return null;

  return (
    <section className="mt-section">
      <div className="px-gutter flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-title text-nori font-extrabold">
            {category.title}
          </h2>
          <p className="text-caption text-nori-60 mt-0.5">{category.tagline}</p>
        </div>
        <Link
          href={`/kategorie/${category.id}`}
          className="text-dashi text-caption inline-flex shrink-0 items-center gap-0.5 font-bold"
        >
          Alle
          <IconChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="no-scrollbar -mx-gutter px-gutter mt-3 flex gap-3 overflow-x-auto pb-1">
        {list.map((r) => (
          <RecipeCard
            key={r.id}
            data={buildCard(r)}
            size="rail"
            href={`/rezept/${r.id}`}
          />
        ))}
      </div>
    </section>
  );
}
