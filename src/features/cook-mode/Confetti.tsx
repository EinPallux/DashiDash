"use client";

import { motion } from "motion/react";

const COLORS = ["#FF7A45", "#FFC53D", "#7BA05B", "#4E8DA6", "#E05252"];

/**
 * A one-shot confetti burst for the cook-finish celebration (docs/01 §4.5).
 * Deterministic by index (SSR-safe, no Math.random at module scope). The caller
 * skips it under reduced motion.
 */
export function Confetti({ count = 20 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const dist = 130 + (i % 5) * 26;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30,
      rot: (i * 53) % 360,
      color: COLORS[i % COLORS.length]!,
    };
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: p.y,
            rotate: p.rot,
            scale: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: (i % 6) * 0.02 }}
          className="absolute h-2.5 w-2.5 rounded-[3px]"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}
