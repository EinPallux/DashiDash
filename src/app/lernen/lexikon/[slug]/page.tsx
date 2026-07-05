import Link from "next/link";
import { notFound } from "next/navigation";
import { lexicon } from "@/content/lexicon";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { IconChevronRight } from "@/components/ui/icons";
import { buildCard } from "@/components/recipe/card";
import { getLexicon, recipesUsingLexicon } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return lexicon.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLexicon(slug);
  return {
    title: entry ? `${entry.term} · Lexikon` : "Lexikon",
    description: entry?.whatIsIt,
  };
}

export default async function LexikonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLexicon(slug);
  if (!entry) notFound();

  const recipes = recipesUsingLexicon(entry.id);

  const fields: { label: string; text: string }[] = [
    { label: "Was ist das?", text: entry.whatIsIt },
    { label: "Schmeckt wie", text: entry.tastesLike },
    { label: "Wo kaufen?", text: entry.whereToBuy },
    { label: "Ersatz", text: entry.substitute },
    ...(entry.compareWith
      ? [{ label: "Gut zu wissen", text: entry.compareWith }]
      : []),
  ];

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
      <header className="px-gutter mt-3">
        <p className="font-display text-caption text-dashi font-bold tracking-wide uppercase">
          Zutaten-Lexikon
        </p>
        <h1 className="font-display text-display text-nori mt-1 leading-tight font-extrabold">
          {entry.term}
        </h1>
        {entry.termJp && (
          <p className="text-heading text-nori-60 mt-0.5">{entry.termJp}</p>
        )}
      </header>

      {/* fields */}
      <div className="px-gutter mt-5 space-y-4">
        {fields.map((f) => (
          <div
            key={f.label}
            className="rounded-card border-hairline bg-paper shadow-card border p-4"
          >
            <p className="text-caption text-nori-60 font-bold tracking-wide uppercase">
              {f.label}
            </p>
            <p className="text-body text-nori mt-1">{f.text}</p>
          </div>
        ))}
      </div>

      {/* used in */}
      {recipes.length > 0 && (
        <section className="mt-8">
          <h2 className="px-gutter font-display text-title text-nori font-extrabold">
            Kommt vor in
          </h2>
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
