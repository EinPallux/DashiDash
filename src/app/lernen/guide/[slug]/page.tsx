import { ScreenStub } from "@/components/ui/ScreenStub";

export const metadata = { title: "Guide" };

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ScreenStub
      title="Guide"
      subtitle="In wenigen Schritten erklärt."
      blurb="Kurze, illustrierte Anleitungen für die Basics — mit passenden Rezepten verlinkt."
      phase="Kommt in Phase 6"
      meta={`Guide: ${slug}`}
    />
  );
}
