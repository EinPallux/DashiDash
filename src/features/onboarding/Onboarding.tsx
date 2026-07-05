"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Mascot } from "@/content/illustrations/Mascot";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { cn } from "@/lib/cn";
import { slideStep, useMotionSafe } from "@/lib/motion";
import { useOnboardingDone, useStandalone } from "@/lib/prefs";

/**
 * First-launch onboarding (docs/01 §5): 3 mascot-led, skippable screens. Shown
 * as a full-screen overlay gated by a localStorage flag (Phase 4 moves the flag
 * to Dexie). The install screen is skipped when already running standalone.
 */
export function Onboarding() {
  const { reduced } = useMotionSafe();
  const [done, complete] = useOnboardingDone();
  const standalone = useStandalone();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  // Only render once we know onboarding hasn't been completed.
  if (done !== false) return null;

  const screens = [
    {
      title: "Schnelle japanische Küche — ohne Stress",
      body: "Von hungrig zu „Los geht’s“ in wenigen Taps. Authentisch, aber wirklich machbar — auch an faulen Tagen.",
    },
    {
      title: "Sag mir, was du zu Hause hast",
      body: "Im Vorrat-Tab hakst du ab, was da ist — dann zeigt dir DashiDash, was du sofort kochen kannst. (Kommt gleich dran.)",
    },
    standalone
      ? {
          title: "Schon installiert 🎉",
          body: "Perfekt — du hast DashiDash auf dem Home-Bildschirm. Es funktioniert jetzt auch komplett offline.",
        }
      : {
          title: "Als App installieren",
          body: "Tippe unten auf Teilen ⬆️ und „Zum Home-Bildschirm“. So startest du DashiDash wie eine echte App — offline und ohne Browser-Leiste.",
        },
  ];

  const isLast = step === screens.length - 1;
  const current = screens[step]!;

  const next = () => {
    if (isLast) {
      complete();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  return (
    <div className="bg-rice pt-safe pb-safe fixed inset-0 z-[200] flex flex-col">
      {/* skip */}
      <div className="px-gutter flex justify-end pt-4">
        <button
          type="button"
          onClick={complete}
          className="text-nori-60 text-caption font-bold"
        >
          Überspringen
        </button>
      </div>

      {/* screen */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={reduced ? undefined : slideStep}
            initial={reduced ? { opacity: 0 } : "enter"}
            animate={reduced ? { opacity: 1 } : "center"}
            exit={reduced ? { opacity: 0 } : "exit"}
            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
          >
            <Mascot className="h-40 w-40" />
            <h1 className="font-display text-display text-nori mt-6 leading-tight font-extrabold">
              {current.title}
            </h1>
            <p className="text-body text-nori-60 mt-3 max-w-sm">
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots + CTA */}
      <div className="px-gutter pb-6">
        <div className="mb-5 flex justify-center gap-2">
          {screens.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 rounded-full transition-all",
                i === step ? "bg-dashi w-6" : "bg-nori/15 w-2",
              )}
            />
          ))}
        </div>
        <ChunkyButton variant="primary" size="l" fullWidth onClick={next}>
          {isLast ? "Los geht’s 🍜" : "Weiter"}
        </ChunkyButton>
      </div>
    </div>
  );
}
