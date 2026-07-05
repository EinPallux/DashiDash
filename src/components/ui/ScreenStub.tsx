"use client";

import { motion } from "motion/react";
import { Mascot } from "@/content/illustrations/Mascot";
import { springGentle, useMotionSafe } from "@/lib/motion";

type ScreenStubProps = {
  /** Big screen title (Baloo 2). */
  title: string;
  /** One warm line under the title. */
  subtitle: string;
  /** What this screen will do once built. */
  blurb: string;
  /** e.g. "Kommt in Phase 3". */
  phase: string;
  /** Optional detail line, e.g. a dynamic route slug. */
  meta?: string;
};

/**
 * A designed placeholder screen used while features are built out phase by
 * phase. Demonstrates the design tokens + motion so navigation between the
 * five tabs already feels like the finished app. Springs in on mount and
 * honours `prefers-reduced-motion`.
 */
export function ScreenStub({
  title,
  subtitle,
  blurb,
  phase,
  meta,
}: ScreenStubProps) {
  const { reduced } = useMotionSafe();

  const enter = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { opacity: 0, scale: 0.94, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: springGentle,
      };

  return (
    <div className="px-gutter pt-safe">
      <header className="pt-6 pb-1">
        <p className="font-display text-caption text-dashi font-bold tracking-wide uppercase">
          DashiDash
        </p>
        <h1 className="text-display text-nori mt-1 font-extrabold">{title}</h1>
        <p className="text-body text-nori-60 mt-1">{subtitle}</p>
      </header>

      <motion.section
        {...enter}
        className="rounded-card border-hairline bg-paper shadow-card mt-5 border p-7 text-center"
      >
        <Mascot title="Dashi, das Maskottchen" className="mx-auto h-36 w-36" />
        <h2 className="text-title text-nori mt-2 font-bold">
          Bald am Start 🍜
        </h2>
        <p className="text-body text-nori-60 mx-auto mt-2 max-w-xs">{blurb}</p>
        {meta && (
          <p className="text-caption text-nori-60 mt-3 font-mono">{meta}</p>
        )}
        <span className="rounded-chip bg-rice-warm text-caption text-nori-60 mt-5 inline-flex items-center gap-1 px-3 py-1.5 font-semibold">
          {phase}
        </span>
      </motion.section>
    </div>
  );
}
