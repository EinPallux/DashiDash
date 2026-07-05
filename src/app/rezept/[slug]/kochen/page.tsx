import { ScreenStub } from "@/components/ui/ScreenStub";

export const metadata = { title: "Kochmodus" };

export default async function KochenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ScreenStub
      title="Kochmodus"
      subtitle="Schritt für Schritt, ohne Ablenkung."
      blurb="Große Schritte, eingebaute Timer, Bildschirm bleibt an — und am Ende: Itadakimasu!"
      phase="Kommt in Phase 3"
      meta={`Rezept: ${slug}`}
    />
  );
}
