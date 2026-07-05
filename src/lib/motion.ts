import type { Transition, Variants } from "motion/react";
import { useReducedMotion } from "motion/react";

/**
 * Motion presets — the single source of truth for animation feel.
 * Mirrors docs/02-DESIGN-SYSTEM.md §5. Everything springs; nothing just
 * appears. Consume these instead of hand-writing transitions so the whole
 * app moves as one system.
 */

/** presses, chips, checkboxes — quick and tactile. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

/** cards entering, sheets, the tab blob — softer settle. */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

/** reduced-motion replacement for any spring: a short, calm fade. */
export const reducedFade: Transition = { duration: 0.12, ease: "easeOut" };

/** badges, count changes, hero — scale up from 0.8 with a fade. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: springGentle },
};

/** parent of a rail/grid: stagger child entrances by 40ms. */
export const staggerRail: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

/** child card inside a `staggerRail` parent. */
export const railItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: springGentle },
};

/** cook-mode step transitions — direction-aware horizontal slide. */
export const slideStep: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -24 : 24,
    transition: { duration: 0.2, ease: "easeOut" },
  }),
};

/**
 * Pure: collapse any transition to a calm fade when the user prefers reduced
 * motion. Kept separate from the hook so it is trivially unit-testable.
 */
export function resolveTransition(
  reduced: boolean,
  transition: Transition,
): Transition {
  return reduced ? reducedFade : transition;
}

/**
 * Single entry point for motion-safety (docs/02 §5): honours
 * `prefers-reduced-motion` everywhere. Springs become 120ms fades; callers
 * should also skip confetti and make count-ups instant when `reduced` is true.
 */
export function useMotionSafe() {
  const reduced = useReducedMotion() ?? false;
  return {
    reduced,
    /** Wrap any spring/transition so it degrades gracefully. */
    transition: (transition: Transition) =>
      resolveTransition(reduced, transition),
  };
}
