import { Suspense } from "react";
import { notFound } from "next/navigation";
import { recipes } from "@/content/recipes";
import { CookMode } from "@/features/cook-mode/CookMode";
import { getRecipe } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.id }));
}

export const metadata = { title: "Kochmodus" };

export default async function KochenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  return (
    <Suspense>
      <CookMode recipe={recipe} />
    </Suspense>
  );
}
