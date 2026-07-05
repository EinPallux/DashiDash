"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";

/**
 * Card — the paper surface primitive (docs/02 §3 elevation, §4.2).
 * `20px` radius, warm `card` shadow. `bordered` adds the hairline for cards
 * that sit on a tinted (`rice-warm`) background. `interactive` gives it the
 * squash-and-release press used by pressable cards.
 */
export type CardProps = {
  bordered?: boolean;
  interactive?: boolean;
} & HTMLMotionProps<"div">;

export function Card({
  bordered,
  interactive,
  className,
  children,
  ...rest
}: CardProps) {
  const { transition } = useMotionSafe();

  return (
    <motion.div
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={transition(springSnappy)}
      className={cn(
        "rounded-card bg-paper shadow-card",
        bordered && "border-hairline border",
        interactive && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
