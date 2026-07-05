import { cn } from "@/lib/cn";

/**
 * Skeleton — warm-tinted shimmer placeholder that matches the final layout
 * exactly (docs/02 §9: no spinners on content). Compose several to mirror a
 * card/list. The shimmer sweep is a `transform` animation (60fps) defined in
 * globals.css and disabled under reduced motion.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-card bg-rice-warm relative overflow-hidden",
        className,
      )}
    >
      <div className="dd-shimmer absolute inset-0" />
    </div>
  );
}

/**
 * RecipeCardSkeleton — the placeholder for a loading recipe card (rail size),
 * so rails never pop in from a spinner.
 */
export function RecipeCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-card bg-paper shadow-card w-40 shrink-0 p-2.5",
        className,
      )}
    >
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="mt-2.5 h-4 w-11/12 rounded-md" />
      <Skeleton className="mt-1.5 h-3 w-2/3 rounded-md" />
      <div className="mt-3 flex gap-1.5">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>
    </div>
  );
}
