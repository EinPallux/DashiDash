import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/content/guides";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { IconChevronRight } from "@/components/ui/icons";
import { buildCard } from "@/components/recipe/card";
import { getGuide, recipesForGuide } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return {
    title: guide ? `${guide.title} · Lernen` : "Guide",
    description: guide?.teaser,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const recipes = recipesForGuide(guide.id);

  return (
    <div className="pb-28">
      {/* top bar */}
      <div className="px-gutter pt-safe flex items-center pt-4">
        <Link
          href="/lernen"
          aria-label="Zurück zu Lernen"
          className="rounded-chip bg-paper border-hairline shadow-card text-nori flex h-10 w-10 rotate-180 items-center justify-center border"
        >
          <IconChevronRight className="h-5 w-5" />
        </Link>
      </div>

      {/* header */}
      <header className="px-gutter mt-3 flex flex-col items-center text-center">
        <span
          aria-hidden
          className="rounded-card bg-rice-warm grid h-24 w-24 place-items-center text-5xl"
        >
          {guide.emoji}
        </span>
        <p className="font-display text-caption text-dashi mt-4 font-bold tracking-wide uppercase">
          Kurz erklärt · {guide.minutes} Min
        </p>
        <h1 className="font-display text-display text-nori mt-1 leading-tight font-extrabold">
          {guide.title}
        </h1>
        <p className="text-body text-nori-60 mt-2 max-w-sm">{guide.teaser}</p>
      </header>

      {/* steps */}
      <ol className="px-gutter mt-6 space-y-4">
        {guide.steps.map((step, i) => (
          <li
            key={i}
            className="rounded-card border-hairline bg-paper shadow-card border p-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-dashi-soft text-dashi-deep font-display grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.85rem] font-extrabold">
                {i + 1}
              </span>
              <h2 className="font-display text-heading text-nori font-bold">
                {step.heading}
              </h2>
            </div>
            <p className="text-body text-nori mt-2">{step.text}</p>
          </li>
        ))}
      </ol>

      {/* apply it */}
      {recipes.length > 0 && (
        <section className="mt-8">
          <h2 className="px-gutter font-display text-title text-nori font-extrabold">
            Wende es an
          </h2>
          <p className="px-gutter text-caption text-nori-60 mt-0.5">
            Rezepte, in denen du das gleich ausprobierst.
          </p>
          <div className="no-scrollbar -mx-gutter px-gutter mt-3 flex gap-3 overflow-x-auto pb-1">
            {recipes.map((r) => (
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
    </div>
  );
}
