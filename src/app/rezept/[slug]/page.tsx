import { ScreenStub } from "@/components/ui/ScreenStub";

export const metadata = { title: "Rezept" };

export default async function RezeptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ScreenStub
      title="Rezept"
      subtitle="Von hungrig zu „Los geht’s“."
      blurb="Zutaten mit Portionsrechner, Equipment und Schritt-für-Schritt-Anleitung."
      phase="Kommt in Phase 3"
      meta={`Rezept: ${slug}`}
    />
  );
}
