/**
 * DishArtPlaceholder — a generic warm bowl in the locked illustration style
 * (docs/02 §7: flat "warm kawaii-deli", 2.5px nori outlines, palette-only fills,
 * 15° top-down tilt, steam strokes). Stands in for real dish art until the
 * Phase 2 calibration trio (oyakodon, yaki-udon, onigiri) ships. The `tint`
 * only swaps the topping/accent so rails don't look repetitive.
 */
export type DishTint = "dashi" | "tamago" | "matcha" | "sora";

// Palette-locked food-supplement colors (§7). No colors outside this set.
const TOPPING: Record<DishTint, { fill: string; accent: string }> = {
  dashi: { fill: "#D94F30", accent: "#F6C453" }, // salmon + egg
  tamago: { fill: "#F6C453", accent: "#D94F30" }, // egg + salmon fleck
  matcha: { fill: "#4C7A43", accent: "#F6C453" }, // greens + egg
  sora: { fill: "#2E2A26", accent: "#D94F30" }, // nori + salmon
};

const NORI = "#20312B";
const RICE = "#F2E9DA";
const BOWL = "#FFE8DC"; // dashi-soft ceramic

export function DishArtPlaceholder({
  tint = "dashi",
  className,
  title,
}: {
  tint?: DishTint;
  className?: string;
  title?: string;
}) {
  const { fill, accent } = TOPPING[tint];

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* plate shadow — grounds the bowl on its canvas */}
      <ellipse cx="80" cy="123" rx="52" ry="10" fill={NORI} opacity="0.07" />

      {/* steam — 2 wavy strokes for a hot dish */}
      <g
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      >
        <path d="M66 44c-4-6 4-8 0-14" />
        <path d="M92 42c-4-6 4-8 0-14" />
      </g>

      {/* rice mound sitting in the bowl opening */}
      <path
        d="M42 78c0-10 17-16 38-16s38 6 38 16v2c0 6-17 10-38 10s-38-4-38-10z"
        fill={RICE}
      />
      {/* topping blobs (no outline — tiny details) */}
      <ellipse cx="66" cy="72" rx="12" ry="8" fill={fill} />
      <ellipse cx="92" cy="70" rx="11" ry="8" fill={fill} />
      <circle cx="80" cy="76" r="5" fill={accent} />

      {/* bowl body */}
      <path
        d="M38 79c0 25 18 41 42 41s42-16 42-41z"
        fill={BOWL}
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* rim */}
      <ellipse
        cx="80"
        cy="79"
        rx="42"
        ry="11"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
      />
      {/* foot ring */}
      <path
        d="M64 118c0 4 7 6 16 6s16-2 16-6"
        fill="none"
        stroke={NORI}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* chopsticks leaning on the bowl */}
      <g stroke="#8C5A3A" strokeWidth="4" strokeLinecap="round">
        <path d="M112 52 96 92" />
        <path d="M120 56 104 96" />
      </g>
    </svg>
  );
}
