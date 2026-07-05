import type { ReactElement } from "react";
import {
  OnigiriArt,
  OyakodonArt,
  YakiUdonArt,
  type DishArtProps,
} from "@/content/illustrations/dishes";
import {
  AubergineArt,
  ColdNoodles,
  CurryPlate,
  DonburiBowl,
  EdamameArt,
  FishFillet,
  FriedPile,
  KatsuPlate,
  NoodlePlate,
  OmeletteArt,
  PancakeArt,
  PattyPlate,
  RamenBowl,
  SandwichArt,
  SauceBottle,
  SoupBowl,
  StewPot,
  TofuBlock,
  VegBowl,
  type DishTint,
} from "@/content/illustrations/archetypes";

/**
 * Dish-art registry: `illustrationId` → component. The calibration trio
 * (oyakodon, yaki-udon, onigiri) has bespoke art; every other recipe maps to a
 * tinted on-style archetype (docs/02 §7, docs/05 §6) — a bowl, ramen, soup,
 * plate, katsu, etc. — so all 60 dishes are illustrated with zero placeholders.
 * `validate:content` checks every recipe's `illustrationId` exists here.
 */
type DishComponent = (props: DishArtProps) => ReactElement;
type ArchetypeComponent = (
  props: DishArtProps & { tint?: DishTint },
) => ReactElement;

/** Bind an archetype to a tint at module load (a lookup, never render-created). */
const art = (Component: ArchetypeComponent, tint?: DishTint): DishComponent =>
  function DishArtwork(props) {
    return <Component tint={tint} {...props} />;
  };

const REGISTRY: Record<string, DishComponent> = {
  /* --- Calibration trio + grilled onigiri: bespoke art --- */
  oyakodon: OyakodonArt,
  "yaki-udon": YakiUdonArt,
  onigiri: OnigiriArt,
  "yaki-onigiri": OnigiriArt,

  /* --- Donburi & Reisschüsseln --- */
  gyudon: art(DonburiBowl, "dashi"),
  tamagodon: art(DonburiBowl, "tamago"),
  "soboro-don": art(DonburiBowl, "tamago"),
  "tuna-mayo-don": art(DonburiBowl, "sora"),
  "teriyaki-chicken-don": art(DonburiBowl, "dashi"),
  butadon: art(DonburiBowl, "dashi"),
  "sake-don": art(DonburiBowl, "ume"),
  "miso-butter-pilz-don": art(DonburiBowl, "matcha"),
  "tamago-kake-gohan": art(DonburiBowl, "tamago"),
  chahan: art(DonburiBowl, "tamago"),
  "mapo-tofu": art(DonburiBowl, "ume"),
  ajitama: art(DonburiBowl, "tamago"),

  /* --- Ramen-Upgrades --- */
  "miso-butter-mais-ramen": art(RamenBowl, "tamago"),
  "gochujang-sesam-ramen": art(RamenBowl, "ume"),
  "tantan-instant-ramen": art(RamenBowl, "ume"),
  "shoyu-ramen-upgrade": art(RamenBowl, "dashi"),
  mazemen: art(RamenBowl, "dashi"),
  "curry-ramen": art(RamenBowl, "tamago"),

  /* --- Frühstück --- */
  "misosuppe-klassisch": art(SoupBowl, "matcha"),
  tamagoyaki: art(OmeletteArt, "tamago"),
  "fruehstuecks-set": art(SoupBowl, "sora"),
  "dashi-ruehrei": art(OmeletteArt, "tamago"),
  ochazuke: art(SoupBowl, "sora"),

  /* --- Nudeln --- */
  "kake-udon": art(SoupBowl, "sora"),
  yakisoba: art(NoodlePlate, "dashi"),
  "kitsune-udon": art(SoupBowl, "tamago"),
  "zaru-soba": art(ColdNoodles),
  "sesam-erdnuss-udon": art(NoodlePlate, "tamago"),
  "wafu-pasta": art(NoodlePlate, "dashi"),
  "spicy-mayo-udon": art(NoodlePlate, "ume"),

  /* --- Hauptgerichte --- */
  "chicken-teriyaki": art(DonburiBowl, "dashi"),
  shogayaki: art(DonburiBowl, "dashi"),
  "miso-lachs": art(FishFillet, "dashi"),
  karaage: art(FriedPile, "dashi"),
  "japanisches-curry": art(CurryPlate),
  nikujaga: art(StewPot),
  hambagu: art(PattyPlate),
  "gyoza-knusprig": art(FriedPile, "matcha"),
  okonomiyaki: art(PancakeArt),
  tonkatsu: art(KatsuPlate, "dashi"),
  omurice: art(OmeletteArt, "dashi"),

  /* --- Vegetarisch & Vegan --- */
  "spinat-gomaae": art(VegBowl, "matcha"),
  hiyayakko: art(TofuBlock, "sora"),
  "nasu-dengaku": art(AubergineArt),
  "agedashi-tofu": art(TofuBlock, "dashi"),
  "kinpira-karotte": art(VegBowl, "dashi"),
  "tofu-teriyaki": art(DonburiBowl, "dashi"),
  sunomono: art(VegBowl, "sora"),
  "japanischer-kartoffelsalat": art(VegBowl, "tamago"),

  /* --- Snacks & Onigiri --- */
  "edamame-chili-salz": art(EdamameArt),
  "tamago-sando": art(SandwichArt, "tamago"),
  onigirazu: art(SandwichArt, "sora"),

  /* --- Meal-Prep-Basics --- */
  "teriyaki-sauce-vorrat": art(SauceBottle, "dashi"),
  "furikake-selbstgemacht": art(SauceBottle, "matcha"),
  "dashi-vorrat": art(SauceBottle, "tamago"),
  "miso-dama": art(SoupBowl, "matcha"),
};

/** For the validator: the set of known illustration ids. */
export const dishArtIds: ReadonlySet<string> = new Set(Object.keys(REGISTRY));

export function hasDishArt(id: string): boolean {
  return id in REGISTRY;
}

const FALLBACK: DishComponent = art(DonburiBowl, "dashi");

/** Resolve a dish illustration; falls back to a neutral bowl. */
export function getDishArt(id: string): DishComponent {
  return REGISTRY[id] ?? FALLBACK;
}

/**
 * Render a dish illustration by id. Prefer this at render sites over
 * `getDishArt` — the registry holds stable, module-level component references,
 * so this is a lookup, not a component-created-during-render.
 */
export function DishArt({ id, ...props }: DishArtProps & { id: string }) {
  const Component = REGISTRY[id] ?? FALLBACK;
  return <Component {...props} />;
}
