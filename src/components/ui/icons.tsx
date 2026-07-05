import type { SVGProps } from "react";

/**
 * Custom minimal line icons (docs/02 §8): 2px stroke, rounded caps, currentColor.
 * Tab icons take a `filled` prop — inactive renders as an outline, active fills
 * the silhouette (the tab bar recolors currentColor to `dashi`). Detail strokes
 * keep `fill="none"` so they stay crisp in both states.
 *
 * The non-tab icons (stats, equipment, store sections, actions) are always
 * outlines; they ignore `filled`. Emojis are for copy only — these are the
 * functional icons (§8).
 */
export type IconProps = SVGProps<SVGSVGElement> & {
  /** Fill the silhouette (used for the active tab state). */
  filled?: boolean;
};

function IconBase({ filled, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ------------------------------ Tab icons ------------------------------ */

/** Entdecken — a steaming bowl. */
export function TabEntdecken(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0z" />
      <path d="M9 3c-1 1.2 1 2.3 0 3.6" fill="none" />
      <path d="M14 2.5c-1 1.2 1 2.3 0 3.6" fill="none" />
    </IconBase>
  );
}

/** Vorrat — a storage jar. */
export function TabVorrat(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 3h10a1 1 0 0 1 1 1v1H6V4a1 1 0 0 1 1-1z" />
      <path d="M6 6h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
      <path d="M9 11h6" fill="none" />
    </IconBase>
  );
}

/** Planen — a calendar. */
export function TabPlanen(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 2.5v3" fill="none" />
      <path d="M16 2.5v3" fill="none" />
      <path d="M4 9h16" fill="none" />
    </IconBase>
  );
}

/** Einkaufen — a shopping bag. */
export function TabEinkaufen(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5.4 8h13.2l-.9 11.2A2 2 0 0 1 15.7 21H8.3a2 2 0 0 1-2-1.8z" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" fill="none" />
    </IconBase>
  );
}

/** Lernen — a graduation onigiri (rice triangle + nori band + cap). */
export function TabLernen(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 7c.9 0 1.6.5 2 1.3l4.4 8c.8 1.5-.2 3.2-1.9 3.2H7.5c-1.7 0-2.7-1.7-1.9-3.2l4.4-8C10.4 7.5 11.1 7 12 7z" />
      <path d="M9.3 17.5h5.4" fill="none" />
      <path d="M12 3l4 1.5-4 1.5-4-1.5z" />
      <path d="M16 4.5v2" fill="none" />
    </IconBase>
  );
}

/* ------------------------------ UI / actions --------------------------- */

/** Search / Suche. */
export function IconSearch(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" fill="none" />
      <path d="m20 20-3.5-3.5" fill="none" />
    </IconBase>
  );
}

/** Settings gear. */
export function IconSettings(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" fill="none" />
      <path
        d="M12 2.5a2 2 0 0 1 2 2 1 1 0 0 0 .6 1 2 2 0 0 1 2.7 2.7 1 1 0 0 0 0 1.2 2 2 0 0 1-2.7 2.7 1 1 0 0 0-1 .6 2 2 0 0 1-3.2 0 1 1 0 0 0-1-.6 2 2 0 0 1-2.7-2.7 1 1 0 0 0 0-1.2A2 2 0 0 1 8.4 5.5a1 1 0 0 0 .6-1 2 2 0 0 1 2-2z"
        fill="none"
      />
    </IconBase>
  );
}

/** Info ⓘ — lexicon links. */
export function IconInfo(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" fill="none" />
      <path d="M12 11v5" fill="none" />
      <path d="M12 8h.01" fill="none" />
    </IconBase>
  );
}

/** Check. */
export function IconCheck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" fill="none" />
    </IconBase>
  );
}

/** Chevron right — "Alle →" and list rows. */
export function IconChevronRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 5 7 7-7 7" fill="none" />
    </IconBase>
  );
}

/** Plus — add to list / pantry. */
export function IconPlus(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14M5 12h14" fill="none" />
    </IconBase>
  );
}

/** Minus — stepper decrement. */
export function IconMinus(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" fill="none" />
    </IconBase>
  );
}

/** Trash — remove / clear. */
export function IconTrash(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" fill="none" />
      <path
        d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
        fill="none"
      />
      <path d="M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7" fill="none" />
      <path d="M10 11v6M14 11v6" fill="none" />
    </IconBase>
  );
}

/** Timer — countdown / cook mode. */
export function IconTimer(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M10 3h4" fill="none" />
      <path d="M12 3v3" fill="none" />
      <circle cx="12" cy="13.5" r="7.5" fill="none" />
      <path d="M12 13.5V10" fill="none" />
    </IconBase>
  );
}

/** Share — iOS share sheet. */
export function IconShare(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5v11" fill="none" />
      <path d="M8 7.5 12 3.5l4 4" fill="none" />
      <path
        d="M7 11.5H6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-1"
        fill="none"
      />
    </IconBase>
  );
}

/** Drag handle — reorder rows. */
export function IconDrag(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01"
        fill="none"
      />
    </IconBase>
  );
}

/* ------------------------------ Stat icons ----------------------------- */

/** Clock — Kochzeit. */
export function IconClock(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" fill="none" />
      <path d="M12 7.5V12l3 2" fill="none" />
    </IconBase>
  );
}

/** A single chopstick — repeated to show difficulty (docs/02 semantic map). */
export function IconChopstick(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.5 18.5 17 6" fill="none" />
      <path d="M15.5 5.2 18 4l-1.2 2.5" fill="none" />
    </IconBase>
  );
}

/** Chili — Schärfe. Body is filled so a row of them reads as a heat meter. */
export function IconChili(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14.5 5c0 2-1.2 3.2-3 3.4" fill="none" />
      <path
        d="M11.5 8.4c-3 0-5.5 2.4-5.5 5.4C6 17.2 8.4 20 11.6 20c4 0 6.9-3.4 6.9-7.6 0-1.6-.5-2.9-1.3-3.6-.6 1.6-2 2.2-3.4 2.2-1 0-1.6-.4-2.3-.6z"
        fill="currentColor"
        stroke="none"
      />
    </IconBase>
  );
}

/** Basket — Zutatenanzahl / Einkauf. */
export function IconBasket(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M4 9h16l-1.1 8.6A2 2 0 0 1 16.9 19.4H7.1A2 2 0 0 1 5.1 17.6z"
        fill="none"
      />
      <path d="M8.5 9 11 4M15.5 9 13 4" fill="none" />
      <path d="M10 12.5v3M14 12.5v3" fill="none" />
    </IconBase>
  );
}

/** Euro — Kosten. */
export function IconEuro(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M16.5 7.2A5.6 5.6 0 0 0 8 10.2c-.9 2.3-.4 5 1.4 6.6a5.6 5.6 0 0 0 7.1.6"
        fill="none"
      />
      <path d="M6 11h7M6 13.6h6" fill="none" />
    </IconBase>
  );
}

/* ------------------------------ Equipment ------------------------------ */

/** Pfanne — frying pan (top-down). */
export function IconPan(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9.5" cy="12" r="5.5" fill="none" />
      <path d="M15 12h6" fill="none" />
    </IconBase>
  );
}

/** Topf — pot with two handles + lid. */
export function IconPot(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 10h14v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" fill="none" />
      <path d="M5 12.5H2.5M19 12.5h2.5" fill="none" />
      <path d="M4.5 10h15" fill="none" />
      <path d="M11 7h2" fill="none" />
    </IconBase>
  );
}

/** Kleiner Topf — saucepan with a long handle. */
export function IconSaucepan(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 11h10v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="none" />
      <path d="M14 12.5h7" fill="none" />
    </IconBase>
  );
}

/** Reiskocher oder Topf — rice cooker appliance. */
export function IconRiceCooker(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M4 12a8 4.5 0 0 1 16 0v3.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
        fill="none"
      />
      <path d="M4.5 10.5h15" fill="none" />
      <path d="M9 14.5h6" fill="none" />
    </IconBase>
  );
}

/** Ofen — oven with a handle bar. */
export function IconOven(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
        fill="none"
      />
      <path d="M4 9.5h16" fill="none" />
      <path d="M7 7.4h.01M11 7.4h.01" fill="none" />
      <path d="M7.5 13h9" fill="none" />
    </IconBase>
  );
}

/** Schneidebrett — knife. */
export function IconKnife(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 15 15 4c1.8 1.4 2.2 3.8.9 5.7L9 16z" fill="none" />
      <path d="M9 16 4.5 20.5" fill="none" />
    </IconBase>
  );
}

/** Schüssel — mixing bowl. */
export function IconBowl(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0z" fill="none" />
      <path d="M3 11h18" fill="none" />
    </IconBase>
  );
}

/** Sieb — sieve / strainer. */
export function IconSieve(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 11h11a5.5 5.5 0 0 1-11 0z" fill="none" />
      <path d="M15 11.5 21 9" fill="none" />
      <path d="M7 13h.01M10 14h.01M12.5 13h.01" fill="none" />
    </IconBase>
  );
}

/** Reibe — grater. */
export function IconGrater(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 3h5l3 15a1 1 0 0 1-1 1.2H7A1 1 0 0 1 6 18z" fill="none" />
      <path
        d="M9.5 7h.01M12 7h.01M9 10h.01M11.5 10h.01M9.5 13h.01M12 13h.01"
        fill="none"
      />
    </IconBase>
  );
}

/** Stabmixer — immersion blender. */
export function IconBlender(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M10 3h4v6a2 2 0 0 1-4 0z" fill="none" />
      <path
        d="M9 11.5h6l-.6 6.5A2 2 0 0 1 12.4 20h-.8a2 2 0 0 1-2-1.9z"
        fill="none"
      />
    </IconBase>
  );
}

/** Wasserkocher — kettle. */
export function IconKettle(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M5 11a7 7 0 0 1 14 0v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
        fill="none"
      />
      <path d="M19 9l2-2" fill="none" />
      <path d="M9 7.5h6" fill="none" />
    </IconBase>
  );
}

/** Schneebesen — whisk. */
export function IconWhisk(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v5" fill="none" />
      <path
        d="M8.5 9c0 4 7 4 7 0 0-1.5-1.6-2-3.5-2S8.5 7.5 8.5 9z"
        fill="none"
      />
      <path d="M9.5 10.5 8 20M14.5 10.5 16 20M12 11v9" fill="none" />
    </IconBase>
  );
}

/* --------------------------- Store sections ---------------------------- */

/** Obst & Gemüse — a leaf. */
export function IconLeaf(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" fill="none" />
      <path d="M8.5 15.5 16 8" fill="none" />
    </IconBase>
  );
}

/** Fleisch & Fisch — a fish. */
export function IconFish(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M3 12c3.5-4.5 10-4.5 13.5 0-3.5 4.5-10 4.5-13.5 0z"
        fill="none"
      />
      <path d="M16.5 12 21 8.5v7z" fill="none" />
      <path d="M7 11.5h.01" fill="none" />
    </IconBase>
  );
}

/** Kühlregal — fridge. */
export function IconFridge(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        fill="none"
      />
      <path d="M5 10h14" fill="none" />
      <path d="M8 6v2M8 13v3" fill="none" />
    </IconBase>
  );
}

/** Asia-Regal — a paper lantern. */
export function IconLantern(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 4h6M9 20h6" fill="none" />
      <path d="M6 12c0-4 2.7-7 6-7s6 3 6 7-2.7 7-6 7-6-3-6-7z" fill="none" />
      <path d="M12 5v14" fill="none" />
    </IconBase>
  );
}

/** Trockenwaren — a box. */
export function IconBox(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5 4 7v10l8 3.5 8-3.5V7z" fill="none" />
      <path d="M4 7l8 3.5L20 7" fill="none" />
      <path d="M12 10.5V20.5" fill="none" />
    </IconBase>
  );
}

/** Tiefkühl — a snowflake. */
export function IconSnowflake(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" fill="none" />
      <path d="M9.5 4.5 12 6l2.5-1.5M9.5 19.5 12 18l2.5 1.5" fill="none" />
    </IconBase>
  );
}

/** Sonstiges — three dots. */
export function IconDots(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 12h.01M12 12h.01M18 12h.01" fill="none" />
    </IconBase>
  );
}
