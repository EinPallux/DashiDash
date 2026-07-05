"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { springGentle, useMotionSafe } from "@/lib/motion";

/**
 * BottomSheet — spring slide-up sheet with a grabber, `28px` top radius and a
 * `nori`/40% scrim (docs/02 §4.5). Drag down or tap the scrim / press Escape to
 * dismiss. Background scroll locks while open. Reduced motion → fade instead of
 * slide, no drag. Used for lexicon ⓘ, equipment, recipe picker, filters.
 */
export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}: BottomSheetProps) {
  const { reduced, transition } = useMotionSafe();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Schließen"
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-nori/40 absolute inset-0"
          />
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { y: "100%" }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: "100%" }}
            transition={transition(springGentle)}
            drag={reduced ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className={cn(
              "bg-paper shadow-raised absolute inset-x-0 bottom-0 mx-auto flex max-h-[85dvh] w-full max-w-[640px] flex-col rounded-t-[var(--radius-sheet)] outline-none",
              className,
            )}
          >
            <div className="flex shrink-0 justify-center pt-2.5 pb-1">
              <span className="bg-nori/15 h-1.5 w-10 rounded-full" />
            </div>
            {title && (
              <h2 className="text-title text-nori px-gutter pt-1 pb-2 font-bold">
                {title}
              </h2>
            )}
            <div className="px-gutter min-h-0 flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+20px)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
