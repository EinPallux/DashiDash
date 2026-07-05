"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { useMotionSafe } from "@/lib/motion";

/**
 * CountUpNumber — a number that springs to its new value instead of jumping
 * (docs/02 §4.10, "Numbers never jump"). Tabular figures. Used for pantry match
 * counts, search result counts, savings amounts. Instant under reduced motion.
 */
export type CountUpNumberProps = {
  value: number;
  /** Render a spring frame (fractional) to a string; default = German integer. */
  format?: (n: number) => string;
  className?: string;
};

const defaultFormat = (n: number) => Math.round(n).toLocaleString("de-DE");

export function CountUpNumber({
  value,
  format = defaultFormat,
  className,
}: CountUpNumberProps) {
  const { reduced } = useMotionSafe();
  // springGentle feel (260/24); the initial value renders settled (no 0→n on mount).
  const spring = useSpring(value, { stiffness: 260, damping: 24 });
  const text = useTransform(spring, (v) => format(v));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular", className)}>
      {reduced ? format(value) : text}
    </motion.span>
  );
}
