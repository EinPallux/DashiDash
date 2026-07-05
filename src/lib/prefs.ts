"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Lightweight user preferences (Phase 3 stopgap). Persisted in localStorage —
 * Phase 4 moves these into the Dexie `settings` table. Reads go through
 * `useSyncExternalStore` so they are SSR-safe and update across the tab.
 */

const DEFAULT_SERVINGS_KEY = "dd.defaultServings";
const ONBOARDING_KEY = "dd.onboardingDone";

export const DEFAULT_SERVINGS = 2;

/** Subscribe to any preference change (same-tab custom event + cross-tab storage). */
function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("dd-prefs", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("dd-prefs", cb);
  };
}

function writePref(key: string, value: string) {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event("dd-prefs"));
}

/** Default portions, reactive to changes in this tab. */
export function useDefaultServings(): [number, (n: number) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      const raw = window.localStorage.getItem(DEFAULT_SERVINGS_KEY);
      const n = raw ? Number.parseInt(raw, 10) : NaN;
      return Number.isFinite(n) ? n : DEFAULT_SERVINGS;
    },
    () => DEFAULT_SERVINGS,
  );

  const set = (n: number) =>
    writePref(DEFAULT_SERVINGS_KEY, String(Math.min(8, Math.max(1, n))));

  return [value, set];
}

/** True when running as an installed standalone PWA. */
export function useStandalone(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(display-mode: standalone)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => {
      const nav = window.navigator as Navigator & { standalone?: boolean };
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        nav.standalone === true
      );
    },
    () => false,
  );
}

/**
 * True once the user has seen onboarding. `null` while still resolving so the
 * overlay never flashes for returning users (needs the mount-time read, hence
 * the local disable).
 */
export function useOnboardingDone(): [boolean | null, () => void] {
  const [done, setDone] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(window.localStorage.getItem(ONBOARDING_KEY) === "1");
  }, []);

  const complete = () => {
    setDone(true);
    writePref(ONBOARDING_KEY, "1");
  };

  return [done, complete];
}
