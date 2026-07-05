"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springGentle, useMotionSafe } from "@/lib/motion";
import { Mascot } from "@/content/illustrations/Mascot";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * ProgressBar — cook-mode top bar that fills `dashi`; the mascot can ride the
 * leading edge (docs/02 §4.9). Value is 0..1.
 */
export function ProgressBar({
  value,
  showMascot = false,
  className,
  "aria-label": ariaLabel,
}: {
  value: number;
  showMascot?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const { transition } = useMotionSafe();
  const pct = clamp01(value) * 100;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={ariaLabel}
      className={cn(
        "bg-rice-warm relative h-2.5 w-full rounded-full",
        className,
      )}
    >
      <motion.div
        className="bg-dashi h-full rounded-full"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={transition(springGentle)}
      />
      {showMascot && (
        <motion.div
          className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{ left: `${pct}%` }}
          transition={transition(springGentle)}
        >
          <Mascot className="h-8 w-8" />
        </motion.div>
      )}
    </div>
  );
}

/**
 * ProgressRing — timer countdown ring, `tamago` stroke on a faint track
 * (docs/02 §4.9). `progress` is 0..1 remaining; `pulsing` adds the gentle final
 * pulse. Center content (remaining time) goes in `children`.
 */
export function ProgressRing({
  progress,
  size = 72,
  stroke = 8,
  pulsing = false,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  pulsing?: boolean;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const { reduced, transition } = useMotionSafe();
  const p = clamp01(progress);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={pulsing && !reduced ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={
          pulsing && !reduced
            ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      >
        <g
          style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            className="text-nori/10"
            stroke="currentColor"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="text-tamago"
            stroke="currentColor"
            strokeDasharray={c}
            initial={false}
            animate={{ strokeDashoffset: c * (1 - p) }}
            transition={transition(springGentle)}
          />
        </g>
      </motion.svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
