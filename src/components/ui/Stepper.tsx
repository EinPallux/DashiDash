"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";
import { IconMinus, IconPlus } from "@/components/ui/icons";

/**
 * Stepper — the `− 2 +` portions pill (docs/02 §4.8). The number morphs
 * vertically (slot-machine) on change; the round buttons squash on press.
 * Generic min/max/step so it also serves other numeric inputs.
 */
export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Shown after the number, e.g. "Portionen". */
  unitLabel?: string;
  ariaLabel?: string;
  className?: string;
};

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 8,
  step = 1,
  unitLabel,
  ariaLabel = "Menge",
  className,
}: StepperProps) {
  const { reduced, transition } = useMotionSafe();
  const [dir, setDir] = useState(1);

  const set = (next: number, direction: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (clamped === value) return;
    setDir(direction);
    onChange(clamped);
  };

  const canDec = value > min;
  const canInc = value < max;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "rounded-chip bg-paper border-hairline inline-flex items-center gap-1 border p-1",
        className,
      )}
    >
      <StepButton
        label="weniger"
        disabled={!canDec}
        onClick={() => set(value - step, -1)}
        transition={transition(springSnappy)}
      >
        <IconMinus className="h-5 w-5" />
      </StepButton>

      <div
        aria-live="polite"
        className="font-display text-title text-nori flex items-baseline justify-center gap-1 px-1 font-extrabold"
      >
        <span className="relative inline-flex h-7 min-w-[1.5ch] items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout" custom={dir}>
            <motion.span
              key={value}
              custom={dir}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { y: dir > 0 ? "80%" : "-80%", opacity: 0 }
              }
              animate={{ y: 0, opacity: 1 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { y: dir > 0 ? "-80%" : "80%", opacity: 0 }
              }
              transition={transition(springSnappy)}
              className="tabular"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </span>
        {unitLabel && (
          <span className="text-heading text-nori-60 font-bold">
            {unitLabel}
          </span>
        )}
      </div>

      <StepButton
        label="mehr"
        disabled={!canInc}
        onClick={() => set(value + step, 1)}
        transition={transition(springSnappy)}
      >
        <IconPlus className="h-5 w-5" />
      </StepButton>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  transition,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  transition: ReturnType<ReturnType<typeof useMotionSafe>["transition"]>;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.88 }}
      transition={transition}
      className={cn(
        "text-nori flex h-10 w-10 items-center justify-center rounded-full",
        disabled ? "text-nori/25" : "bg-rice-warm active:bg-dashi-soft",
      )}
    >
      {children}
    </motion.button>
  );
}
