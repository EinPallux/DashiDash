/**
 * Calibration trio (docs/02 §7, docs/05 §6): oyakodon, yaki-udon, onigiri.
 * These lock the illustration style before the remaining 57 dishes are batched
 * in Phase 6. Hand-authored SVG, viewBox 0 0 160 160, 2.5px nori outlines on
 * main silhouettes, palette-locked fills only, a 15° top-down feel, steam
 * strokes on hot dishes. No faces on food.
 */

export type DishArtProps = {
  className?: string;
  /** Accessible label; omit for decorative use. */
  title?: string;
};

const NORI = "#20312B";
const RICE = "#F2E9DA";
const EGG = "#F6C453";
const SALMON = "#D94F30";
const SOY = "#8C5A3A";
const GREEN = "#4C7A43";
const NORI_SHEET = "#2E2A26";
const UME = "#B03A48";

function Frame({
  title,
  children,
  className,
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

/** Oyakodon — chicken & egg over rice in a brown donburi bowl. */
export function OyakodonArt({ className, title }: DishArtProps) {
  return (
    <Frame className={className} title={title}>
      <ellipse cx="80" cy="124" rx="50" ry="9" fill={NORI} opacity="0.07" />
      <g
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      >
        <path d="M66 46c-4-6 4-8 0-14" />
        <path d="M92 44c-4-6 4-8 0-14" />
      </g>
      {/* bowl */}
      <path
        d="M34 80c0 26 18 42 46 42s46-16 46-42z"
        fill={SOY}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* rice base */}
      <ellipse cx="80" cy="79" rx="43" ry="11" fill={RICE} />
      {/* egg blanket */}
      <path
        d="M40 76c8-11 22-9 30-6 7-4 20-5 30 1 6 3 10 6 10 8-8 8-30 10-52 8-16-1-26-6-18-11z"
        fill={EGG}
      />
      {/* chicken pieces peeking through the egg */}
      <ellipse cx="64" cy="73" rx="7" ry="4.5" fill={SOY} />
      <ellipse cx="92" cy="75" rx="6" ry="4" fill={SOY} />
      {/* spring-onion rings */}
      <circle cx="76" cy="70" r="2.4" fill={GREEN} />
      <circle cx="86" cy="72" r="2.2" fill={GREEN} />
      <circle cx="70" cy="78" r="2.2" fill={GREEN} />
      {/* rim */}
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

/** Yaki-Udon — thick fried noodles with cabbage & carrot in a wide bowl. */
export function YakiUdonArt({ className, title }: DishArtProps) {
  return (
    <Frame className={className} title={title}>
      <ellipse cx="80" cy="120" rx="54" ry="9" fill={NORI} opacity="0.07" />
      <g
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      >
        <path d="M62 44c-4-6 4-8 0-14" />
        <path d="M98 44c-4-6 4-8 0-14" />
      </g>
      {/* wide shallow bowl */}
      <path
        d="M28 84c0 18 22 32 52 32s52-14 52-32z"
        fill="#FFE8DC"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* noodle mound */}
      <ellipse cx="80" cy="82" rx="49" ry="12" fill={RICE} />
      {/* noodle strands + sauce sheen */}
      <g
        fill="none"
        stroke={SOY}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M40 80c14 6 30 6 44 2s24-6 34-1" />
        <path d="M44 86c16 5 34 4 46-1" />
        <path d="M52 76c12 4 26 4 40 1" />
      </g>
      {/* carrot sticks */}
      <path
        d="M62 78l12-3"
        stroke={SALMON}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M92 82l12-2"
        stroke={SALMON}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* cabbage */}
      <ellipse cx="72" cy="84" rx="6" ry="4" fill={GREEN} />
      <ellipse cx="98" cy="80" rx="6" ry="4" fill={GREEN} />
      {/* sesame */}
      <circle cx="80" cy="80" r="1.4" fill={NORI} />
      <circle cx="88" cy="85" r="1.4" fill={NORI} />
      {/* rim */}
      <ellipse
        cx="80"
        cy="84"
        rx="52"
        ry="12"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
    </Frame>
  );
}

/** Onigiri — a rounded rice triangle with a nori band and umeboshi centre. */
export function OnigiriArt({ className, title }: DishArtProps) {
  return (
    <Frame className={className} title={title}>
      <ellipse cx="80" cy="122" rx="44" ry="8" fill={NORI} opacity="0.07" />
      {/* rice triangle */}
      <path
        d="M80 34c4 0 7 2 9 6l32 60c3 6-1 12-8 12H47c-7 0-11-6-8-12l32-60c2-4 5-6 9-6z"
        fill={RICE}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* nori band */}
      <path
        d="M50 92h60v14c0 4-3 6-7 6H57c-4 0-7-2-7-6z"
        fill={NORI_SHEET}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* umeboshi centre */}
      <circle cx="80" cy="66" r="6" fill={UME} />
      <circle cx="78" cy="64" r="1.6" fill={RICE} opacity="0.7" />
      {/* sesame flecks */}
      <circle cx="66" cy="74" r="1.5" fill={NORI} />
      <circle cx="94" cy="72" r="1.5" fill={NORI} />
      <circle cx="88" cy="82" r="1.5" fill={NORI} />
    </Frame>
  );
}
