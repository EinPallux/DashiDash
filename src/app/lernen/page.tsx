import Link from "next/link";
import { guides } from "@/content/guides";
import { lexicon } from "@/content/lexicon";
import { Mascot } from "@/content/illustrations/Mascot";
import { IconChevronRight } from "@/components/ui/icons";

export const metadata = {
  title: "Lernen",
  description: "Mini-Guides und ein Zutaten-Lexikon für die japanische Küche.",
};

/**
 * Lernen — the deliberately small „learn“ tab (docs/01 §6, CLAUDE.md rule 6):
 * a handful of ≤ 3-min mini-guides plus a plain-German ingredient lexicon.
 * Fully static. Never grows navigation weight — it's a side feature.
 */
export default function LernenPage() {
  return (
    <div className="pb-28">
      <header className="px-gutter pt-safe pt-6">
        <p className="font-display text-caption text-dashi font-bold tracking-wide uppercase">
          DashiDash
        </p>
        <h1 className="text-display text-nori mt-1 font-extrabold">Lernen</h1>
        <p className="text-body text-nori-60 mt-1">
          Japanische Küche, kurz erklärt — ohne Fachchinesisch.
        </p>
      </header>

      {/* Guides */}
      <section className="px-gutter mt-6">
        <h2 className="font-display text-title text-nori font-extrabold">
          Kurz erklärt
        </h2>
        <p className="text-caption text-nori-60 mt-0.5">
          {guides.length} Mini-Guides, jeder in unter 3 Minuten gelesen.
        </p>
        <div className="mt-3 space-y-3">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/lernen/guide/${guide.id}`}
              className="rounded-card border-hairline bg-paper shadow-card flex items-center gap-3 border p-3 active:scale-[0.99]"
            >
              <span
                aria-hidden
                className="rounded-chip bg-rice-warm grid h-14 w-14 shrink-0 place-items-center text-3xl"
              >
                {guide.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-heading text-nori font-bold">
                  {guide.title}
                </p>
                <p className="text-caption text-nori-60 mt-0.5 line-clamp-2">
                  {guide.teaser}
                </p>
                <span className="rounded-chip bg-matcha-soft text-nori text-caption mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 font-semibold">
                  ⏱ {guide.minutes} Min
                </span>
              </div>
              <IconChevronRight className="text-nori-60 h-5 w-5 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Lexicon */}
      <section className="px-gutter mt-8">
        <h2 className="font-display text-title text-nori font-extrabold">
          Zutaten-Lexikon
        </h2>
        <p className="text-caption text-nori-60 mt-0.5">
          Was ist das, wonach schmeckt’s, wo gibt’s das — und der ehrlichste
          Ersatz.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {lexicon.map((entry) => (
            <Link
              key={entry.id}
              href={`/lernen/lexikon/${entry.id}`}
              className="rounded-card border-hairline bg-paper shadow-card flex flex-col border p-3 active:scale-[0.99]"
            >
              <span className="font-display text-body text-nori font-bold">
                {entry.term}
              </span>
              {entry.termJp && (
                <span className="text-caption text-nori-60">
                  {entry.termJp}
                </span>
              )}
              <span className="text-caption text-nori-60 mt-1 line-clamp-3">
                {entry.whatIsIt}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="px-gutter mt-section flex flex-col items-center text-center">
        <Mascot className="h-16 w-16" />
        <p className="text-caption text-nori-60 mt-2 font-semibold">
          Neugier macht satt. 🍜
        </p>
      </footer>
    </div>
  );
}
