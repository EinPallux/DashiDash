import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconChili, IconChopstick } from "@/components/ui/icons";

/**
 * Badges — diet / difficulty / spice (docs/02 semantic mapping + §4.3).
 * Meaning is never colour-only (§10): every badge carries an icon + count or a
 * text label and an accessible label.
 */

const shell =
  "rounded-chip inline-flex items-center gap-1 px-2.5 py-1 text-caption font-bold leading-none";

/* -------------------------------- Diet --------------------------------- */

export type Diet = "fleisch" | "fisch" | "vegetarisch" | "vegan";

const DIET: Record<Diet, { label: string; emoji: string; cls: string }> = {
  // Protein group → tamago tint. Emoji here is sanctioned copy (§4.2), not a
  // functional icon; the German word carries the meaning.
  fleisch: { label: "Fleisch", emoji: "🍗", cls: "bg-tamago/25 text-nori" },
  fisch: { label: "Fisch", emoji: "🐟", cls: "bg-tamago/25 text-nori" },
  vegetarisch: {
    label: "Vegetarisch",
    emoji: "🥕",
    cls: "bg-matcha-soft text-nori",
  },
  vegan: { label: "Vegan", emoji: "🌱", cls: "bg-matcha text-paper" },
};

export function DietBadge({
  diet,
  compact = false,
  className,
}: {
  diet: Diet;
  /** Emoji-only chip on a paper background — for the illustration corner. */
  compact?: boolean;
  className?: string;
}) {
  const { label, emoji, cls } = DIET[diet];
  if (compact) {
    return (
      <span
        role="img"
        aria-label={label}
        className={cn(
          "rounded-chip bg-paper/90 shadow-card inline-flex items-center px-1.5 py-1 text-[0.8rem] leading-none backdrop-blur-sm",
          className,
        )}
      >
        <span aria-hidden="true">{emoji}</span>
      </span>
    );
  }
  return (
    <span className={cn(shell, cls, className)}>
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  );
}

/* ----------------------------- Difficulty ------------------------------ */

export type Difficulty = 1 | 2 | 3;

const DIFF_LABEL: Record<Difficulty, string> = {
  1: "Easy",
  2: "Mittel",
  3: "Schwer",
};

export function DifficultyBadge({
  level,
  showLabel = true,
  className,
}: {
  level: Difficulty;
  showLabel?: boolean;
  className?: string;
}) {
  const label = DIFF_LABEL[level];
  return (
    <span
      className={cn(shell, "bg-rice-warm text-nori", className)}
      role="img"
      aria-label={`Schwierigkeit: ${label}`}
    >
      <span aria-hidden="true" className="flex items-center gap-0.5">
        {[1, 2, 3].map((i) => (
          <IconChopstick
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i <= level ? "text-dashi" : "text-nori/20",
            )}
          />
        ))}
      </span>
      {showLabel && <span aria-hidden="true">{label}</span>}
    </span>
  );
}

/* -------------------------------- Spice -------------------------------- */

export type SpiceLevel = 0 | 1 | 2 | 3;

const SPICE_LABEL: Record<SpiceLevel, string> = {
  0: "Nicht scharf",
  1: "Mild",
  2: "Mittelscharf",
  3: "Scharf",
};

/**
 * Spice badge. Level 0 renders nothing by default (cards stay clean); pass
 * `showZero` for the styleguide / detail row.
 */
export function SpiceBadge({
  level,
  showZero = false,
  compact = false,
  className,
}: {
  level: SpiceLevel;
  showZero?: boolean;
  /** Chilis-only chip on a paper background — for the illustration corner. */
  compact?: boolean;
  className?: string;
}) {
  if (level === 0 && !showZero) return null;
  const label = SPICE_LABEL[level];
  if (compact && level > 0) {
    return (
      <span
        role="img"
        aria-label={`Schärfe: ${label}`}
        className={cn(
          "rounded-chip bg-paper/90 shadow-card inline-flex items-center gap-0.5 px-1.5 py-1 backdrop-blur-sm",
          className,
        )}
      >
        {Array.from({ length: level }, (_, i) => (
          <IconChili key={i} className="text-ume h-3.5 w-3.5" />
        ))}
      </span>
    );
  }
  return (
    <span
      className={cn(shell, "bg-rice-warm text-nori", className)}
      role="img"
      aria-label={`Schärfe: ${label}`}
    >
      {level === 0 ? (
        <span aria-hidden="true" className="text-nori-60">
          {label}
        </span>
      ) : (
        <span aria-hidden="true" className="flex items-center gap-0.5">
          {Array.from({ length: level }, (_, i) => (
            <IconChili key={i} className="text-ume h-3.5 w-3.5" />
          ))}
        </span>
      )}
    </span>
  );
}

/* --------------------------- Generic pill ------------------------------ */

/** A neutral labelled pill for category chips etc. */
export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(shell, "bg-rice-warm text-nori", className)}>
      {children}
    </span>
  );
}
