import { ScreenStub } from "@/components/ui/ScreenStub";

export const metadata = { title: "Kategorie" };

export default async function KategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ScreenStub
      title="Kategorie"
      subtitle="Alle Rezepte auf einen Blick."
      blurb="Hier erscheint das Rezept-Raster dieser Kategorie samt Filterleiste."
      phase="Kommt in Phase 3"
      meta={`Kategorie: ${slug}`}
    />
  );
}
