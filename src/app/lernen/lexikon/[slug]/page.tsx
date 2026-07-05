import { ScreenStub } from "@/components/ui/ScreenStub";

export const metadata = { title: "Lexikon" };

export default async function LexikonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ScreenStub
      title="Lexikon"
      subtitle="Zutat in 10 Sekunden verstanden."
      blurb="Was ist das, wonach schmeckt’s, wo gibt’s das — und der ehrlichste Ersatz."
      phase="Kommt in Phase 6"
      meta={`Zutat: ${slug}`}
    />
  );
}
