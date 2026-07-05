"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";

/**
 * ChunkyButton — the signature Duolingo-tactile button (docs/02 §4.1).
 * A 4px darker bottom edge fakes physical depth; on press the face drops 2px
 * and the edge shrinks to 2px (it "goes down"), then springs back on release.
 * Ghost has no edge and squashes instead. Min touch target 44px always.
 */

type Variant = "primary" | "secondary" | "success" | "ghost" | "danger";
type Size = "m" | "l";

/** Face colors per variant. */
const FACE: Record<Variant, string> = {
  primary: "bg-dashi text-paper",
  secondary: "bg-paper text-nori",
  success: "bg-matcha text-paper",
  danger: "bg-ume text-paper",
  ghost: "bg-dashi-soft text-dashi-deep",
};

/** Bottom-edge + border colors (token-derived; darker shades via color-mix). */
const EDGE: Record<Variant, { edge?: string; border?: string }> = {
  primary: { edge: "var(--color-dashi-deep)" },
  secondary: {
    edge: "color-mix(in srgb, var(--color-nori) 12%, var(--color-rice-warm))",
    border: "color-mix(in srgb, var(--color-nori) 12%, transparent)",
  },
  success: { edge: "color-mix(in srgb, var(--color-matcha), black 16%)" },
  danger: { edge: "color-mix(in srgb, var(--color-ume), black 16%)" },
  ghost: {},
};

export type ChunkyButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "children" | "ref">;

export function ChunkyButton({
  children,
  variant = "primary",
  size = "m",
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  disabled,
  type = "button",
  style,
  ...rest
}: ChunkyButtonProps) {
  const { transition } = useMotionSafe();
  const edged = variant !== "ghost";
  const { edge, border } = EDGE[variant];

  // Merge caller style with the edge/border CSS custom properties.
  const edgeStyle: CSSProperties = { ...(style as unknown as CSSProperties) };
  const vars = edgeStyle as Record<string, string>;
  if (edge) vars["--edge"] = edge;
  if (border) vars["--btn-border"] = border;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      style={edgeStyle}
      whileTap={disabled ? undefined : edged ? { y: 2 } : { scale: 0.96 }}
      transition={transition(springSnappy)}
      className={cn(
        "rounded-button font-display relative inline-flex touch-manipulation items-center justify-center gap-2 border-2 border-[color:var(--btn-border,transparent)] font-extrabold select-none",
        size === "l"
          ? "h-14 px-6 text-[1.0625rem]"
          : "h-11 px-5 text-[0.9375rem]",
        fullWidth && "w-full",
        edged &&
          "shadow-[0_4px_0_0_var(--edge)] transition-shadow duration-100 active:shadow-[0_2px_0_0_var(--edge)] motion-reduce:transition-none",
        FACE[variant],
        disabled && "cursor-not-allowed opacity-50 shadow-none",
        className,
      )}
      {...rest}
    >
      {leftIcon && (
        <span className="-ml-0.5 inline-flex shrink-0">{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className="-mr-0.5 inline-flex shrink-0">{rightIcon}</span>
      )}
    </motion.button>
  );
}
