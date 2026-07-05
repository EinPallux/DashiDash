import { CategoryRail } from "@/components/recipe/CategoryRail";
import { HeroToday } from "@/components/recipe/HeroToday";
import { SearchEntry } from "@/components/recipe/SearchEntry";
import { Mascot } from "@/content/illustrations/Mascot";
import { categoriesInOrder } from "@/lib/content";

/**
 * Entdecken — the home screen (docs/01 §4.1). Header + tap-to-search, the
 * "Heute schnell" hero, then the category rails in order, and a footer mascot
 * flourish. Fully static content; the hero rotates client-side by day.
 */
export default function EntdeckenPage() {
  return (
    <div className="pb-10">
      <header className="px-gutter pt-safe pt-6">
        <p className="font-display text-caption text-dashi font-bold tracking-wide uppercase">
          DashiDash
        </p>
        <h1 className="text-display text-nori mt-1 font-extrabold">
          Was koche ich heute?
        </h1>
      </header>

      <div className="px-gutter mt-4">
        <SearchEntry />
      </div>

      <div className="px-gutter mt-5">
        <HeroToday />
      </div>

      {categoriesInOrder.map((category) => (
        <CategoryRail key={category.id} category={category} />
      ))}

      <footer className="px-gutter mt-section flex flex-col items-center text-center">
        <Mascot className="h-20 w-20" />
        <p className="text-caption text-nori-60 mt-2 font-semibold">
          Miso happy, dich zu sehen. Guten Appetit! 🍚
        </p>
      </footer>
    </div>
  );
}
