import type { ReactElement } from "react";
import {
  OnigiriArt,
  OyakodonArt,
  YakiUdonArt,
  type DishArtProps,
} from "@/content/illustrations/dishes";
import {
  DishArtPlaceholder,
  type DishTint,
} from "@/content/illustrations/DishArtPlaceholder";

/**
 * Dish-art registry: `illustrationId` → component. The Phase 2 calibration trio
 * has real art; the rest of batch 1 uses tinted placeholders until Phase 6
 * batches the remaining dishes. `validate:content` checks every recipe's
 * `illustrationId` exists here (docs/04 §10).
 */
type DishComponent = (props: DishArtProps) => ReactElement;

const placeholder = (tint: DishTint): DishComponent =>
  function PlaceholderDish(props) {
    return <DishArtPlaceholder tint={tint} {...props} />;
  };

const REGISTRY: Record<string, DishComponent> = {
  // Calibration trio — real art.
  oyakodon: OyakodonArt,
  "yaki-udon": YakiUdonArt,
  onigiri: OnigiriArt,

  // Batch 1 — tinted placeholders (real art in Phase 6).
  gyudon: placeholder("dashi"),
  tamagodon: placeholder("tamago"),
  "tuna-mayo-don": placeholder("sora"),
  "miso-butter-mais-ramen": placeholder("tamago"),
  "gochujang-sesam-ramen": placeholder("dashi"),
  "tamago-kake-gohan": placeholder("tamago"),
  "misosuppe-klassisch": placeholder("matcha"),
  "kake-udon": placeholder("sora"),
  "chicken-teriyaki": placeholder("dashi"),
  "miso-lachs": placeholder("dashi"),
  chahan: placeholder("tamago"),
  "japanisches-curry": placeholder("dashi"),
  "mapo-tofu": placeholder("dashi"),
  "spinat-gomaae": placeholder("matcha"),
  hiyayakko: placeholder("sora"),
  "yaki-onigiri": placeholder("sora"),
  ajitama: placeholder("tamago"),
};

/** For the validator: the set of known illustration ids. */
export const dishArtIds: ReadonlySet<string> = new Set(Object.keys(REGISTRY));

export function hasDishArt(id: string): boolean {
  return id in REGISTRY;
}

const FALLBACK: DishComponent = placeholder("dashi");

/** Resolve a dish illustration; falls back to a neutral placeholder. */
export function getDishArt(id: string): DishComponent {
  return REGISTRY[id] ?? FALLBACK;
}
