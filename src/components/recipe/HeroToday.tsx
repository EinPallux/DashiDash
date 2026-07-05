"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { DishArt } from "@/content/illustrations/registry";
import { StatPill } from "@/components/ui/StatPill";
import { IconClock } from "@/components/ui/icons";
import { heroRecipe } from "@/lib/content";
import { springGentle, useMotionSafe } from "@/lib/motion";

/**
 * "Heute schnell" hero (docs/01 §4.1) — a big pressable card for the day's
 * featured quick recipe. Springs in on load. The pick is deterministic by day;
 * we start from a stable seed (0) for SSR and swap to today's after mount to
 * avoid a hydration mismatch.
 */
export function HeroToday() {
  const { reduced, transition } = useMotionSafe();
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    // Deliberate post-mount date read → today's pick, no hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeed(Math.floor(Date.now() / 86_400_000));
  }, []);

  const recipe = heroRecipe(seed);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={transition(springGentle)}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={`/rezept/${recipe.id}`}
        aria-label={`Heute schnell: ${recipe.title}`}
        className="rounded-card bg-dashi-soft shadow-card block overflow-hidden p-5"
      >
        <p className="font-display text-caption text-dashi-deep font-bold tracking-wide uppercase">
          Heute schnell 🍜
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div className="bg-paper/60 grid h-28 w-28 shrink-0 place-items-center rounded-[18px]">
            <DishArt
              id={recipe.illustrationId}
              title={recipe.title}
              className="h-[86%] w-[86%]"
            />
          </div>
          <div className="min-w-0 flex-1">
            {/* Fixed line-boxes: the pick swaps client-side by day, so reserving
                2 lines each keeps the hero a constant height (no CLS on swap). */}
            <h2 className="font-display text-title text-nori line-clamp-2 min-h-[2.2em] leading-tight font-extrabold">
              {recipe.title}
            </h2>
            <p className="text-body text-nori-60 mt-1 line-clamp-2 min-h-[2.6em]">
              {recipe.subtitle}
            </p>
            <div className="mt-2">
              <StatPill icon={<IconClock />}>{recipe.timeMinutes} Min</StatPill>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
