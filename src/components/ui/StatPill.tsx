"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";

/**
 * StatPill — rounded-full icon + value chip (docs/02 §4.3). `rice-warm` fill,
 * `nori` text. The micro-pill on recipe cards and the tappable stat on the
 * recipe detail (tap → equipment sheet etc.). Tappable variants get a hairline
 * border and a press squash.
 */
export type StatPillProps = {
  icon?: ReactNode;
  children: ReactNode;
  /** Renders as a button with press feedback + border. */
  onClick?: () => void;
  className?: string;
  /** Accessible label, e.g. "Kochzeit 15 Minuten" (§10). */
  "aria-label"?: string;
};

export function StatPill({
  icon,
  children,
  onClick,
  className,
  "aria-label": ariaLabel,
}: StatPillProps) {
  const { transition } = useMotionSafe();

  const content = (
    <>
      {icon && (
        <span className="text-nori-60 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="tabular">{children}</span>
    </>
  );

  const base =
    "rounded-chip bg-rice-warm text-nori text-caption inline-flex items-center gap-1 px-2.5 py-1 font-bold";

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.94 }}
        transition={transition(springSnappy)}
        className={cn(base, "border-hairline border", className)}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <span
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      className={cn(base, className)}
    >
      {content}
    </span>
  );
}
