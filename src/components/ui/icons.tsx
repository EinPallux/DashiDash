import type { SVGProps } from "react";

/**
 * Custom minimal line icons (docs/02 §8): 2px stroke, rounded caps, currentColor.
 * Tab icons take a `filled` prop — inactive renders as an outline, active fills
 * the silhouette (the tab bar recolors currentColor to `dashi`). Detail strokes
 * keep `fill="none"` so they stay crisp in both states.
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

/* ------------------------------ UI icons ------------------------------- */

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
