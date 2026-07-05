"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springSnappy, useMotionSafe } from "@/lib/motion";
import {
  DietBadge,
  DifficultyBadge,
  SpiceBadge,
  type Diet,
  type Difficulty,
  type SpiceLevel,
} from "@/components/ui/Badge";
import { StatPill } from "@/components/ui/StatPill";
import { IconBasket, IconClock, IconEuro } from "@/components/ui/icons";

/**
 * RecipeCard — the card used everywhere (docs/02 §4.2, docs/01 §4.2). Two
 * sizes: `rail` (compact ~160px) and `grid` (full-width). Illustration on a
 * `rice-warm` canvas, diet/spice badges top-right, title (+ optional Japanese
 * subtitle), and a stat strip of micro-pills. The whole card is pressable with
 * a squash-and-release; the illustration adds a tiny 2° tilt.
 *
 * `RecipeCardData` is the view-model the card renders — Phase 3 maps a full
 * `Recipe` (+ derived cost/count) onto it.
 */
export type RecipeCardData = {
  id: string;
  title: string;
  titleJp?: string;
  subtitle?: string;
  timeMinutes: number;
  difficulty: Difficulty;
  ingredientCount: number;
  costPerServing: number;
  diet: Diet;
  spicy: SpiceLevel;
  illustration: ReactNode;
};

export type RecipeCardProps = {
  data: RecipeCardData;
  size?: "rail" | "grid";
  href?: string;
  onClick?: () => void;
  className?: string;
};

const formatEuro = (n: number) =>
  `≈ ${n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;

const pressed = { pressed: { scale: 0.97 } };
const tilt = { pressed: { rotate: 2 } };

export function RecipeCard({
  data,
  size = "rail",
  href,
  onClick,
  className,
}: RecipeCardProps) {
  const { transition } = useMotionSafe();
  const isRail = size === "rail";

  const canvas = (
    <div className="relative">
      <motion.div
        variants={tilt}
        transition={transition(springSnappy)}
        className="bg-rice-warm grid aspect-square place-items-center overflow-hidden rounded-[16px]"
      >
        <div className="h-[86%] w-[86%]">{data.illustration}</div>
      </motion.div>
      <div className="absolute top-1.5 right-1.5 flex flex-col items-end gap-1">
        <DietBadge diet={data.diet} compact />
        <SpiceBadge level={data.spicy} compact />
      </div>
    </div>
  );

  const title = (
    <div className="min-w-0">
      <h3
        className={cn(
          "font-display text-nori font-bold",
          isRail
            ? "mt-2 line-clamp-2 text-[0.95rem] leading-tight"
            : "text-heading leading-tight",
        )}
      >
        {data.title}
      </h3>
      {data.titleJp && (
        <p className="text-caption text-nori-60 mt-0.5">{data.titleJp}</p>
      )}
      {!isRail && data.subtitle && (
        <p className="text-body text-nori-60 mt-1 line-clamp-2">
          {data.subtitle}
        </p>
      )}
    </div>
  );

  const stats = (
    <div className="mt-2 flex flex-wrap items-center gap-1">
      <StatPill
        icon={<IconClock />}
        aria-label={`Kochzeit ${data.timeMinutes} Minuten`}
      >
        {data.timeMinutes} Min
      </StatPill>
      <DifficultyBadge level={data.difficulty} showLabel={!isRail} />
      {!isRail && (
        <StatPill
          icon={<IconBasket />}
          aria-label={`${data.ingredientCount} Zutaten`}
        >
          {data.ingredientCount} Zutaten
        </StatPill>
      )}
      <StatPill
        icon={<IconEuro />}
        aria-label={`Kosten pro Portion ${formatEuro(data.costPerServing)}`}
      >
        {formatEuro(data.costPerServing)}
      </StatPill>
    </div>
  );

  const inner = isRail ? (
    <>
      {canvas}
      {title}
      {stats}
    </>
  ) : (
    <div className="flex gap-3.5">
      <div className="w-28 shrink-0">{canvas}</div>
      <div className="flex min-w-0 flex-1 flex-col">
        {title}
        {stats}
      </div>
    </div>
  );

  const shell = cn(
    "rounded-card bg-paper shadow-card block text-left",
    isRail ? "w-40 shrink-0 p-2.5" : "w-full p-3",
    className,
  );

  const motionProps = {
    variants: pressed,
    whileTap: "pressed" as const,
    transition: transition(springSnappy),
  };

  if (href) {
    return (
      <motion.div {...motionProps} className={shell}>
        <Link
          href={href}
          aria-label={data.title}
          className="block rounded-[inherit] outline-none"
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={data.title}
      {...motionProps}
      className={shell}
    >
      {inner}
    </motion.button>
  );
}
