"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Recipe } from "@/content/schema";
import { ChunkyButton } from "@/components/ui/ChunkyButton";
import { ProgressBar, ProgressRing } from "@/components/ui/Progress";
import { IconCheck, IconPlus, IconTimer } from "@/components/ui/icons";
import { Mascot } from "@/content/illustrations/Mascot";
import { slideStep, useMotionSafe } from "@/lib/motion";
import { fillAmountTokens, servingFactor } from "@/lib/scaling";
import { Confetti } from "@/features/cook-mode/Confetti";
import { consumePantry } from "@/features/pantry/data";

/* --------------------------- device helpers ---------------------------- */

type WakeLockNav = Navigator & {
  wakeLock?: { request(type: "screen"): Promise<{ release(): Promise<void> }> };
};

function mmss(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function chime() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Audio is best-effort.
  }
}

/* ------------------------------ Cook mode ------------------------------ */

export function CookMode({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const { reduced } = useMotionSafe();

  // Portions come from the detail CTA (?p=…); fall back to the recipe base.
  const searchParams = useSearchParams();
  const parsed = Number.parseInt(searchParams.get("p") ?? "", 10);
  const servings = Number.isFinite(parsed)
    ? Math.min(8, Math.max(1, parsed))
    : recipe.servingsBase;
  const factor = servingFactor(recipe, servings);
  const steps = recipe.steps;
  const total = steps.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const finished = index >= total;

  const go = (delta: number) => {
    setDirection(Math.sign(delta));
    setIndex((i) => Math.min(total, Math.max(0, i + delta)));
  };

  // Timestamp-based timers (robust against tab throttling), keyed by step. A
  // single ticker advances `now`; done/running are derived, and a ref ensures
  // the chime fires exactly once per timer.
  const [endsAt, setEndsAt] = useState<Record<number, number>>({});
  const [now, setNow] = useState(0);
  const firedRef = useRef<Set<number>>(new Set());
  const hasTimers = Object.keys(endsAt).length > 0;

  useEffect(() => {
    if (!hasTimers) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [hasTimers]);

  useEffect(() => {
    for (const [k, end] of Object.entries(endsAt)) {
      const i = Number(k);
      if (now >= end && !firedRef.current.has(i)) {
        firedRef.current.add(i);
        chime();
        if ("vibrate" in navigator) navigator.vibrate(200);
      }
    }
  }, [now, endsAt]);

  const startTimer = (i: number, seconds: number) => {
    firedRef.current.delete(i);
    setEndsAt((e) => ({ ...e, [i]: Date.now() + seconds * 1000 }));
    setNow(Date.now());
  };

  // Keep the screen awake while cooking (graceful no-op where unsupported).
  useEffect(() => {
    let lock: { release(): Promise<void> } | null = null;
    const request = async () => {
      try {
        lock =
          (await (navigator as WakeLockNav).wakeLock?.request("screen")) ??
          null;
      } catch {
        // ignore
      }
    };
    request();
    const onVis = () => {
      if (document.visibilityState === "visible") request();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      lock?.release().catch(() => {});
    };
  }, []);

  const exit = () => router.push(`/rezept/${recipe.id}`);

  if (finished) {
    return <FinishScreen recipe={recipe} onExit={exit} reduced={reduced} />;
  }

  const step = steps[index]!;
  const stepEnd = endsAt[index];
  const remaining = stepEnd != null ? (stepEnd - now) / 1000 : null;
  const timerDone = stepEnd != null && now >= stepEnd;
  const running = remaining != null && !timerDone;

  return (
    <div className="bg-rice flex min-h-dvh flex-col">
      {/* top bar + progress */}
      <div className="px-gutter pt-safe pt-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={exit}
            aria-label="Kochmodus verlassen"
            className="rounded-chip bg-paper border-hairline shadow-card text-nori flex h-10 w-10 items-center justify-center border text-lg"
          >
            ✕
          </button>
          <p className="text-caption text-nori-60 font-bold">
            Schritt {index + 1} von {total}
          </p>
          <div className="h-10 w-10" />
        </div>
        <div className="mt-4">
          <ProgressBar
            value={(index + 1) / total}
            showMascot
            aria-label={`Schritt ${index + 1} von ${total}`}
          />
        </div>
      </div>

      {/* step */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={reduced ? undefined : slideStep}
            initial={reduced ? { opacity: 0 } : "enter"}
            animate={reduced ? { opacity: 1 } : "center"}
            exit={reduced ? { opacity: 0 } : "exit"}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="px-gutter absolute inset-0 flex touch-pan-y flex-col justify-center"
          >
            <p className="font-display text-nori text-[1.6rem] leading-snug font-bold">
              {fillAmountTokens(step.text, recipe, factor)}
            </p>

            {step.attention && (
              <div className="rounded-card bg-ume/10 text-ume text-body mt-4 p-3 font-semibold">
                ⚠️ {step.attention}
              </div>
            )}
            {step.tip && (
              <div className="rounded-card bg-tamago/15 text-nori text-body mt-3 p-3">
                💡 {step.tip}
              </div>
            )}

            {step.timerSeconds && (
              <div className="mt-6">
                <StepTimer
                  seconds={step.timerSeconds}
                  remaining={remaining}
                  running={running}
                  done={timerDone}
                  onStart={() => startTimer(index, step.timerSeconds!)}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* nav */}
      <div className="px-gutter pb-safe flex gap-3 pt-2 pb-4">
        <ChunkyButton
          variant="secondary"
          size="l"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="flex-1"
        >
          Zurück
        </ChunkyButton>
        <ChunkyButton
          variant="primary"
          size="l"
          onClick={() => go(1)}
          className="flex-[2]"
        >
          {index === total - 1 ? "Fertig 🎉" : "Weiter"}
        </ChunkyButton>
      </div>
    </div>
  );
}

function StepTimer({
  seconds,
  remaining,
  running,
  done,
  onStart,
}: {
  seconds: number;
  remaining: number | null;
  running: boolean;
  done: boolean;
  onStart: () => void;
}) {
  if (done) {
    return (
      <div className="flex items-center gap-3">
        <ProgressRing progress={1} size={64} aria-label="Timer fertig">
          <IconCheck className="text-matcha h-7 w-7" />
        </ProgressRing>
        <span className="text-heading text-matcha font-bold">Fertig!</span>
      </div>
    );
  }

  if (running && remaining != null) {
    return (
      <div className="flex items-center gap-4">
        <ProgressRing
          progress={Math.max(0, remaining / seconds)}
          size={76}
          pulsing={remaining <= 10}
          aria-label={`Noch ${mmss(remaining)}`}
        >
          <span className="font-display text-heading text-nori tabular font-extrabold">
            {mmss(remaining)}
          </span>
        </ProgressRing>
        <span className="text-body text-nori-60">läuft…</span>
      </div>
    );
  }

  return (
    <ChunkyButton
      variant="secondary"
      leftIcon={<IconTimer className="h-5 w-5" />}
      onClick={onStart}
    >
      Timer starten · {mmss(seconds)}
    </ChunkyButton>
  );
}

function FinishScreen({
  recipe,
  onExit,
  reduced,
}: {
  recipe: Recipe;
  onExit: () => void;
  reduced: boolean;
}) {
  const [removed, setRemoved] = useState<number | null>(null);

  return (
    <div className="bg-rice pt-safe pb-safe relative flex min-h-dvh flex-col items-center justify-center px-8 text-center">
      {!reduced && <Confetti />}
      <Mascot title="Dashi feiert mit" className="h-32 w-32" />
      <h1 className="font-display text-display text-nori mt-4 font-extrabold">
        Itadakimasu! 🎉
      </h1>
      <p className="text-body text-nori-60 mt-2">
        Guten Appetit — du hast {recipe.title} gekocht.
      </p>

      <div className="mt-8 w-full max-w-xs space-y-3">
        <ChunkyButton
          variant="success"
          fullWidth
          leftIcon={
            removed === null ? <IconPlus className="h-5 w-5" /> : undefined
          }
          onClick={async () => setRemoved(await consumePantry(recipe))}
          disabled={removed !== null}
        >
          {removed === null
            ? "Zutaten aus dem Vorrat abhaken"
            : `✓ ${removed} abgehakt`}
        </ChunkyButton>
        {removed !== null && (
          <p className="text-caption text-nori-60">
            {removed > 0
              ? "Frische Zutaten aus dem Vorrat entfernt."
              : "Nichts Frisches im Vorrat — alles gut."}
          </p>
        )}
        <ChunkyButton variant="primary" fullWidth onClick={onExit}>
          Fertig
        </ChunkyButton>
      </div>
    </div>
  );
}
