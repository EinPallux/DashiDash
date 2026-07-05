"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";

/**
 * JuicyCheckbox — circle that fills `matcha` with a check that draws itself in
 * (docs/02 §4.7). The whole control squashes on tap. Row-level behaviour
 * (highlight + slide to done-group) is composed by the shopping/pantry list.
 */
export type JuicyCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
  id?: string;
};

export function JuicyCheckbox({
  checked,
  onChange,
  label,
  className,
  id,
}: JuicyCheckboxProps) {
  const { reduced, transition } = useMotionSafe();

  return (
    <motion.button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      whileTap={{ scale: 0.92 }}
      transition={transition(springSnappy)}
      className={cn("inline-flex items-center gap-3 text-left", className)}
    >
      <span className="relative inline-flex h-7 w-7 shrink-0">
        <svg viewBox="0 0 28 28" className="h-7 w-7">
          {/* empty ring */}
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            strokeWidth="2"
            className="text-nori/20"
            stroke="currentColor"
          />
          {/* matcha fill grows from the centre on check */}
          <motion.circle
            cx="14"
            cy="14"
            r="13"
            className="fill-matcha"
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
            initial={false}
            animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={transition(springSnappy)}
          />
          {/* check draws itself in */}
          <motion.path
            d="M8.5 14.5l3.6 3.6L20 9.2"
            fill="none"
            className="text-paper"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{
              pathLength: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
            transition={
              reduced ? { duration: 0.12 } : { duration: 0.22, ease: "easeOut" }
            }
          />
        </svg>
      </span>
      {label && <span className="text-body text-nori">{label}</span>}
    </motion.button>
  );
}
