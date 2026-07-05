"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";
import { IconCheck } from "@/components/ui/icons";
import { CountUpNumber } from "@/components/ui/CountUpNumber";

/**
 * FilterChip — multi-select pill (docs/02 §4.4). Inactive: paper + hairline.
 * Active: `dashi-soft` fill + `dashi` text + a checkmark that springs in. An
 * optional count badge morphs its number instead of jumping.
 */
export type FilterChipProps = {
  active?: boolean;
  onClick?: () => void;
  count?: number;
  children: ReactNode;
  className?: string;
};

export function FilterChip({
  active = false,
  onClick,
  count,
  children,
  className,
}: FilterChipProps) {
  const { reduced, transition } = useMotionSafe();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.95 }}
      transition={transition(springSnappy)}
      className={cn(
        "rounded-chip text-caption inline-flex h-9 items-center gap-1.5 border px-3.5 font-bold whitespace-nowrap",
        active
          ? "bg-dashi-soft text-dashi-deep border-transparent"
          : "bg-paper text-nori-60 border-hairline",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            key="check"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            transition={transition(springSnappy)}
            className="inline-flex"
          >
            <IconCheck className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
      {typeof count === "number" && (
        <span
          className={cn(
            "rounded-chip -mr-1 min-w-5 px-1.5 py-0.5 text-center text-[0.6875rem] leading-none",
            active ? "bg-dashi text-paper" : "bg-rice-warm text-nori-60",
          )}
        >
          <CountUpNumber value={count} />
        </span>
      )}
    </motion.button>
  );
}
