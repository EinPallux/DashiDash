import type { DishArtProps } from "@/content/illustrations/dishes";

/**
 * Dish-art archetypes (docs/02 §7). A family of on-style illustrations — one
 * per common dish shape (bowl, ramen, soup, noodles, katsu, onigiri, …) — that
 * every recipe maps to via the registry, tinted per dish. Same locked style as
 * the calibration trio: 2.5px nori outlines, palette-only fills, steam on hot
 * dishes, no faces on food.
 */

export type DishTint = "dashi" | "tamago" | "matcha" | "sora" | "ume";

const NORI = "#20312B";
const RICE = "#F2E9DA";
const EGG = "#F6C453";
const SALMON = "#D94F30";
const SOY = "#8C5A3A";
const GREEN = "#4C7A43";
const NORI_SHEET = "#2E2A26";
const UME = "#B03A48";
const BOWL = "#FFE8DC";
const CREAM = "#FBEFD8";

const TOPPING: Record<DishTint, string> = {
  dashi: SALMON,
  tamago: EGG,
  matcha: GREEN,
  sora: "#6FA0B4",
  ume: UME,
};

function Frame({
  title,
  className,
  children,
}: DishArtProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {children}
    </svg>
  );
}

function Shadow() {
  return <ellipse cx="80" cy="124" rx="52" ry="9" fill={NORI} opacity="0.07" />;
}

function Steam({ x = 66, x2 = 92 }: { x?: number; x2?: number }) {
  return (
    <g
      fill="none"
      stroke={NORI}
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.5"
    >
      <path d={`M${x} 46c-4-6 4-8 0-14`} />
      <path d={`M${x2} 44c-4-6 4-8 0-14`} />
    </g>
  );
}

/* ------------------------------- bowls --------------------------------- */

/** Rice bowl with a domed topping — the donburi workhorse. */
export function DonburiBowl({
  tint = "dashi",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const t = TOPPING[tint];
  return (
    <Frame {...p}>
      <Shadow />
      <Steam />
      <path
        d="M34 80c0 26 18 42 46 42s46-16 46-42z"
        fill={SOY}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="80" cy="79" rx="43" ry="11" fill={RICE} />
      <path
        d="M46 76c6-9 20-11 34-8 10-2 20 0 26 6-6 6-20 9-34 9-13 0-30-2-26-7z"
        fill={t}
      />
      <circle cx="70" cy="72" r="3" fill={EGG} />
      <circle cx="88" cy="74" r="2.6" fill={GREEN} />
      <ellipse
        cx="80"
        cy="79"
        rx="46"
        ry="12"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
    </Frame>
  );
}

/** Ramen: noodle soup with a soft-egg half and nori. */
export function RamenBowl({
  tint = "tamago",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const broth =
    tint === "matcha" ? "#EAF2E0" : tint === "ume" ? "#F6DAD2" : "#FBE7C8";
  return (
    <Frame {...p}>
      <Shadow />
      <Steam />
      <path
        d="M30 78c0 26 20 44 50 44s50-18 50-44z"
        fill={BOWL}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="80" cy="78" rx="48" ry="12" fill={broth} />
      <g
        fill="none"
        stroke={EGG}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      >
        <path d="M44 76c14 5 30 5 44 1s22-4 28 0" />
        <path d="M50 82c16 4 34 3 46-2" />
      </g>
      <path d="M58 74a10 8 0 0 1 20 0z" fill="#FFF6E8" />
      <circle cx="68" cy="74" r="4" fill={EGG} />
      <rect x="92" y="66" width="14" height="14" rx="1.5" fill={NORI_SHEET} />
      <circle cx="84" cy="82" r="2.4" fill={GREEN} />
      <ellipse
        cx="80"
        cy="78"
        rx="50"
        ry="12.5"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
    </Frame>
  );
}

/** Clear soup with tofu cubes + wakame (miso soup family). */
export function SoupBowl({
  tint = "matcha",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const broth = tint === "sora" ? "#E7EEF1" : "#EDD9B4";
  return (
    <Frame {...p}>
      <Shadow />
      <Steam x={64} x2={94} />
      <path
        d="M36 82c0 24 18 40 44 40s44-16 44-40z"
        fill={SOY}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="80" cy="81" rx="42" ry="10.5" fill={broth} />
      <rect
        x="62"
        y="76"
        width="9"
        height="9"
        rx="1.5"
        fill="#FFF6E8"
        transform="rotate(8 66 80)"
      />
      <rect
        x="86"
        y="78"
        width="8"
        height="8"
        rx="1.5"
        fill="#FFF6E8"
        transform="rotate(-6 90 82)"
      />
      <path d="M74 79c3-2 6 0 5 3-2-1-4 0-5-3z" fill={GREEN} />
      <circle cx="82" cy="84" r="2" fill={GREEN} />
      <ellipse
        cx="80"
        cy="81"
        rx="44"
        ry="11"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
    </Frame>
  );
}

/** Small side bowl of greens/salad (gomaae, sunomono, kinpira, potato salad). */
export function VegBowl({
  tint = "matcha",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const t = TOPPING[tint];
  return (
    <Frame {...p}>
      <Shadow />
      <path
        d="M42 84c0 20 16 34 38 34s38-14 38-34z"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="80"
        cy="83"
        rx="36"
        ry="9"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
      <path
        d="M56 80c6-8 16-8 22-4 5-3 14-3 20 3-5 5-16 7-24 7s-24-1-18-6z"
        fill={t}
      />
      <circle cx="70" cy="78" r="1.6" fill={NORI} />
      <circle cx="86" cy="80" r="1.6" fill={NORI} />
      <circle cx="78" cy="82" r="1.6" fill={NORI} />
    </Frame>
  );
}

/* ------------------------------ noodles -------------------------------- */

/** Fried-noodle tangle on a wide plate (yakisoba, wafu pasta, udon-stir). */
export function NoodlePlate({
  tint = "dashi",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const t = TOPPING[tint];
  return (
    <Frame {...p}>
      <Shadow />
      <Steam x={62} x2={98} />
      <path
        d="M26 90c0 12 24 20 54 20s54-8 54-20z"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="80"
        cy="88"
        rx="54"
        ry="14"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <ellipse cx="80" cy="86" rx="46" ry="11" fill={RICE} />
      <g
        fill="none"
        stroke={SOY}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M40 84c16 7 34 7 50 2s22-6 30-1" />
        <path d="M46 90c18 5 38 4 50-2" />
        <path d="M54 80c14 4 30 4 44 1" />
      </g>
      <path d="M64 82l12-3" stroke={t} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="94" cy="84" rx="6" ry="4" fill={GREEN} />
      <circle cx="80" cy="84" r="1.5" fill={NORI} />
    </Frame>
  );
}

/** Cold soba on a slatted tray with a dip cup (zaru soba). */
export function ColdNoodles({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <rect
        x="30"
        y="70"
        width="76"
        height="44"
        rx="8"
        fill={SOY}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <g stroke={NORI} strokeWidth="1.4" opacity="0.4">
        <path d="M44 70v44M60 70v44M76 70v44M92 70v44" />
      </g>
      <ellipse cx="68" cy="84" rx="30" ry="12" fill={RICE} />
      <g fill="none" stroke="#C9B48A" strokeWidth="2" strokeLinecap="round">
        <path d="M46 82c12 5 28 5 40 0M50 88c12 3 26 2 36-2" />
      </g>
      <rect x="60" y="70" width="16" height="12" rx="1.5" fill={NORI_SHEET} />
      <path
        d="M112 92a12 10 0 0 0 24 0z"
        fill={BOWL}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse cx="124" cy="92" rx="12" ry="4" fill="#6B4A2E" />
    </Frame>
  );
}

/* ------------------------------- fried --------------------------------- */

/** Breaded, sliced cutlet on a plate (tonkatsu). */
export function KatsuPlate({
  tint = "dashi",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <ellipse
        cx="80"
        cy="92"
        rx="54"
        ry="14"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <g stroke={NORI} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M52 74l10-6 10 8-4 20-14 2z" fill="#D9A24B" />
        <path d="M70 76l12-6 12 8-3 20-16 2z" fill="#D9A24B" />
        <path d="M92 78l12-5 8 8-2 18-14 2z" fill="#D9A24B" />
      </g>
      <g fill={NORI} opacity="0.5">
        <circle cx="60" cy="78" r="1" />
        <circle cx="66" cy="84" r="1" />
        <circle cx="82" cy="80" r="1" />
        <circle cx="88" cy="86" r="1" />
        <circle cx="102" cy="82" r="1" />
      </g>
      <path
        d="M104 90c8 0 14 4 14 8h-16z"
        fill={TOPPING[tint]}
        opacity="0.85"
      />
    </Frame>
  );
}

/** Pile of fried nuggets (karaage) or crisp dumplings. */
export function FriedPile({
  tint = "dashi",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <ellipse
        cx="80"
        cy="96"
        rx="52"
        ry="13"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <g fill="#CF9A4A" stroke={NORI} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M52 82c-2-8 6-14 14-12s10 12 4 18-16 2-18-6z" />
        <path d="M78 76c0-8 10-12 18-8s6 14-2 18-16 0-16-10z" />
        <path d="M64 92c-1-7 8-12 15-9s7 12 0 16-14 0-15-7z" />
        <path d="M92 90c-1-7 7-11 13-8s6 11-1 15-11 0-12-7z" />
      </g>
      <circle cx="112" cy="90" r="6" fill={TOPPING[tint]} />
      <path
        d="M108 88a6 6 0 0 1 8 0"
        fill="none"
        stroke={NORI}
        strokeWidth="1.5"
        opacity="0.4"
      />
    </Frame>
  );
}

/* -------------------------- eggs & sandwiches -------------------------- */

/** Rolled/folded omelette (tamagoyaki, omurice, dashi-egg). */
export function OmeletteArt({
  tint = "tamago",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <ellipse
        cx="80"
        cy="96"
        rx="52"
        ry="12"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <path
        d="M44 92c0-16 16-26 36-26s36 10 36 26z"
        fill={EGG}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g stroke={NORI} strokeWidth="1.6" opacity="0.35">
        <path d="M60 68v22M78 66v26M96 68v22" />
      </g>
      {tint === "dashi" && (
        <path
          d="M62 80c8 6 28 6 36 0"
          fill="none"
          stroke={SALMON}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </Frame>
  );
}

/** Triangle sandwich, fluffy filling (tamago sando, onigirazu). */
export function SandwichArt({
  tint = "tamago",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const fill = tint === "sora" ? "#F0C9A0" : EGG;
  return (
    <Frame {...p}>
      <Shadow />
      <path
        d="M40 108l30-64c2-4 6-4 8 0l30 64c2 4-1 8-6 8H46c-5 0-8-4-6-8z"
        fill="#FBEFD8"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M52 96l22-46 22 46z" fill={fill} />
      <path d="M50 84h60" stroke={NORI} strokeWidth="1.6" opacity="0.3" />
      {tint === "sora" && (
        <rect
          x="66"
          y="62"
          width="16"
          height="10"
          rx="1"
          fill={NORI_SHEET}
          opacity="0.85"
        />
      )}
    </Frame>
  );
}

/* ------------------------------ specials ------------------------------- */

/** Rice + curry pool on a plate. */
export function CurryPlate({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <Steam x={100} x2={116} />
      <ellipse
        cx="80"
        cy="90"
        rx="56"
        ry="15"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <path
        d="M40 88c0-10 16-16 30-16 8 0 8 8 8 12 0 6-14 10-24 10s-14-2-14-6z"
        fill={RICE}
        stroke={NORI}
        strokeWidth="1.6"
        opacity="0.9"
      />
      <path
        d="M78 82c4-8 20-12 34-8 10 3 8 16-4 20-14 5-36 0-30-12z"
        fill="#9B5A2B"
      />
      <circle cx="96" cy="86" r="4" fill="#C97A3C" />
      <circle cx="108" cy="82" r="3.5" fill="#C97A3C" />
    </Frame>
  );
}

/** Tofu block with a topping (hiyayakko, agedashi). */
export function TofuBlock({
  tint = "sora",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const sauce = tint === "dashi" ? "#7A4A24" : "#B98C4E";
  return (
    <Frame {...p}>
      <Shadow />
      <ellipse
        cx="80"
        cy="100"
        rx="48"
        ry="11"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <path
        d="M52 72l28-8 28 8v20l-28 8-28-8z"
        fill="#FFF7EC"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M52 72l28 8 28-8M80 80v20"
        fill="none"
        stroke={NORI}
        strokeWidth="1.6"
        opacity="0.4"
      />
      <path
        d="M66 70c10 4 24 4 30 0"
        fill="none"
        stroke={sauce}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="80" cy="66" r="3" fill={GREEN} />
      <circle cx="72" cy="68" r="2" fill={GREEN} />
    </Frame>
  );
}

/** Miso-glazed aubergine halves (nasu dengaku). */
export function AubergineArt({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <ellipse
        cx="80"
        cy="100"
        rx="50"
        ry="11"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <g stroke={NORI} strokeWidth="2.5" strokeLinejoin="round">
        <path
          d="M40 84c0-8 12-14 26-14s26 6 26 14-12 12-26 12-26-4-26-12z"
          fill="#7A4E8C"
          transform="rotate(-8 66 82)"
        />
      </g>
      <path
        d="M46 80c12-6 34-6 44 0-10 6-32 6-44 0z"
        fill="#C9A24B"
        transform="rotate(-8 68 80)"
      />
      <circle cx="66" cy="76" r="1.6" fill={NORI} />
      <circle cx="76" cy="78" r="1.6" fill={NORI} />
    </Frame>
  );
}

/** A pile of edamame pods. */
export function EdamameArt({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <path
        d="M40 92c0 16 18 26 40 26s40-10 40-26z"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="80"
        cy="90"
        rx="40"
        ry="10"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
      <g fill={GREEN} stroke={NORI} strokeWidth="2" strokeLinejoin="round">
        <path d="M52 84c8-6 18-4 20 2s-8 10-16 8-10-6-4-10z" />
        <path d="M78 80c9-5 19-2 20 4s-9 9-17 7-11-7-3-11z" />
        <path d="M66 92c9-4 18-1 18 5s-10 8-17 5-9-7-1-10z" />
      </g>
      <g fill="#8FB56B">
        <circle cx="58" cy="86" r="1.6" />
        <circle cx="86" cy="84" r="1.6" />
        <circle cx="74" cy="94" r="1.6" />
      </g>
    </Frame>
  );
}

/** Glazed fish fillet (miso-lachs, sake-don). */
export function FishFillet({
  tint = "dashi",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <Steam x={64} x2={96} />
      <ellipse
        cx="80"
        cy="96"
        rx="52"
        ry="12"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <path
        d="M44 88c4-14 20-24 40-22 16 2 30 12 32 22-10 6-28 8-40 8-14 0-36-2-32-8z"
        fill={SALMON}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g stroke="#F2B7A0" strokeWidth="2" opacity="0.7">
        <path d="M56 82c14-4 34-4 46 0M60 88c12-3 28-3 40 0" />
      </g>
      <path
        d="M46 90c24 4 44 4 68 0"
        fill="none"
        stroke={SOY}
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="86" cy="82" r="2" fill={TOPPING[tint]} />
    </Frame>
  );
}

/** Round savoury pancake with sauce lines (okonomiyaki). */
export function PancakeArt({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <Steam x={66} x2={94} />
      <circle
        cx="80"
        cy="86"
        r="44"
        fill="#D9A24B"
        stroke={NORI}
        strokeWidth="2.5"
      />
      <g stroke="#6B4A2E" strokeWidth="2.5" fill="none" opacity="0.8">
        <path d="M52 74c10 4 46 4 56 0M50 84c14 4 46 4 60 0M54 94c12 3 40 3 52 0" />
      </g>
      <g stroke={EGG} strokeWidth="2" fill="none" opacity="0.9">
        <path d="M58 78c8 2 38 2 46 0M60 88c10 2 34 2 44 0" />
      </g>
      <path
        d="M96 70c-4 4 2 6 0 10"
        fill="none"
        stroke={NORI}
        strokeWidth="1.5"
        opacity="0.5"
      />
    </Frame>
  );
}

/** A stew pot (nikujaga). */
export function StewPot({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <Steam />
      <path
        d="M34 78h92v14c0 16-16 30-46 30s-46-14-46-30z"
        fill={SOY}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 78h-6M128 78h6"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="80" cy="80" rx="44" ry="10" fill="#C99A5B" />
      <circle cx="66" cy="78" r="6" fill="#E8C070" />
      <circle cx="86" cy="80" r="5" fill="#C97A3C" />
      <circle cx="96" cy="76" r="4" fill={GREEN} />
      <ellipse
        cx="80"
        cy="80"
        rx="46"
        ry="11"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
    </Frame>
  );
}

/** A patty with sauce (hambagu). */
export function PattyPlate({ ...p }: DishArtProps & { tint?: DishTint }) {
  return (
    <Frame {...p}>
      <Shadow />
      <Steam x={64} x2={96} />
      <ellipse
        cx="80"
        cy="94"
        rx="54"
        ry="13"
        fill={CREAM}
        stroke={NORI}
        strokeWidth="2.5"
      />
      <ellipse
        cx="80"
        cy="84"
        rx="34"
        ry="18"
        fill="#7A4A2C"
        stroke={NORI}
        strokeWidth="2.5"
      />
      <path
        d="M50 82c10 8 50 8 60 0-2 8-14 14-30 14s-28-6-30-14z"
        fill="#5E3620"
      />
      <path
        d="M52 78c8-6 48-6 56 0"
        fill="none"
        stroke="#9B5A2B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/** A pantry bottle/jar (sauce & dashi vorrat, furikake, miso-dama). */
export function SauceBottle({
  tint = "dashi",
  ...p
}: DishArtProps & { tint?: DishTint }) {
  const liquid =
    tint === "matcha" ? "#7B8F4A" : tint === "tamago" ? "#C98A3C" : "#5E3620";
  return (
    <Frame {...p}>
      <Shadow />
      <rect x="66" y="26" width="12" height="12" rx="2" fill={NORI} />
      <path
        d="M60 40h24l4 12c4 6 6 12 6 20v34c0 6-4 10-10 10H60c-6 0-10-4-10-10V72c0-8 2-14 6-20z"
        fill={BOWL}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M52 84h40v28c0 4-3 6-6 6H58c-3 0-6-2-6-6z" fill={liquid} />
      <rect
        x="58"
        y="94"
        width="28"
        height="16"
        rx="2"
        fill={CREAM}
        opacity="0.9"
      />
      <path
        d="M62 98h20M62 103h16"
        stroke={NORI}
        strokeWidth="1.4"
        opacity="0.4"
      />
    </Frame>
  );
}
