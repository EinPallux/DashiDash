import { notFound } from "next/navigation";
import type { Category } from "@/content/schema";
import { categories } from "@/content/categories";
import { categoryById } from "@/lib/content";
import { SearchView } from "@/features/search/SearchView";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: categoryById.get(slug as Category)?.title ?? "Kategorie" };
}

export default async function KategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryById.get(slug as Category);
  if (!category) notFound();

  return (
    <SearchView
      lockedCategory={category.id}
      title={category.title}
      subtitle={category.tagline}
    />
  );
}
