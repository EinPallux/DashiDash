"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { getLexicon } from "@/lib/content";

/**
 * The ⓘ lexicon bottom sheet (docs/01 §4.4, golden path 4). Opened from an
 * ingredient row; dismissing returns to the recipe with context intact.
 */
export function LexiconSheet({
  lexiconId,
  onClose,
}: {
  lexiconId: string | null;
  onClose: () => void;
}) {
  const entry = lexiconId ? getLexicon(lexiconId) : undefined;

  return (
    <BottomSheet
      open={Boolean(entry)}
      onClose={onClose}
      title={
        entry ? (
          <span className="flex items-baseline gap-2">
            {entry.term}
            {entry.termJp && (
              <span className="text-nori-60 text-heading font-normal">
                {entry.termJp}
              </span>
            )}
          </span>
        ) : undefined
      }
    >
      {entry && (
        <div className="space-y-4 pb-2">
          <Field label="Was ist das?" text={entry.whatIsIt} />
          <Field label="Schmeckt wie" text={entry.tastesLike} />
          <Field label="Wo kaufen?" text={entry.whereToBuy} />
          <Field label="Ersatz" text={entry.substitute} />
          {entry.compareWith && (
            <Field label="Gut zu wissen" text={entry.compareWith} />
          )}
        </div>
      )}
    </BottomSheet>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-caption text-nori-60 font-bold tracking-wide uppercase">
        {label}
      </p>
      <p className="text-body text-nori mt-1">{text}</p>
    </div>
  );
}
