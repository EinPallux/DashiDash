type MascotProps = {
  className?: string;
  /** Accessible label; when omitted the mascot is decorative. */
  title?: string;
};

/**
 * „Dashi" — the mascot: a small round donabe pot with steam-swirl hair, two
 * dot eyes and tiny arms (docs/02 §6). Base happy pose. Flat "warm kawaii-deli"
 * style: bold shapes, 2.5px nori outlines, palette-locked fills (§7).
 * Full pose set arrives in Phase 6.
 */
export function Mascot({ className, title }: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* steam-swirl "hair" */}
      <g
        fill="none"
        stroke="#20312B"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.85}
      >
        <path d="M50 28C46 22 54 20 50 14C47 10 52 8 50 4" />
        <path d="M60 26C56 20 64 18 60 12C57 8 62 6 60 2" />
        <path d="M70 28C66 22 74 20 70 14C67 10 72 8 70 4" />
      </g>

      {/* pot body */}
      <path
        d="M24 60C24 49 39 43 60 43C81 43 96 49 96 60L96 68C96 84 81 95 60 95C39 95 24 84 24 68Z"
        fill="#8C5A3A"
        stroke="#20312B"
        strokeWidth={2.5}
      />
      {/* side handles */}
      <path
        d="M24 62H18a5 5 0 0 0 0 10h6Z"
        fill="#8C5A3A"
        stroke="#20312B"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path
        d="M96 62h6a5 5 0 0 1 0 10h-6Z"
        fill="#8C5A3A"
        stroke="#20312B"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* tiny arms */}
      <g fill="none" stroke="#20312B" strokeWidth={3} strokeLinecap="round">
        <path d="M27 80C21 83 19 87 19 91" />
        <path d="M93 80C99 83 101 87 101 91" />
      </g>

      {/* lid */}
      <path
        d="M30 46C30 38 43 33 60 33C77 33 90 38 90 46C90 49 78 51 60 51C42 51 30 49 30 46Z"
        fill="#FF7A45"
        stroke="#20312B"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {/* knob */}
      <circle
        cx="60"
        cy="31"
        r="4.5"
        fill="#FFC53D"
        stroke="#20312B"
        strokeWidth={2.5}
      />

      {/* face */}
      <circle cx="46" cy="72" r="3.5" fill="#FFE8DC" />
      <circle cx="74" cy="72" r="3.5" fill="#FFE8DC" />
      <circle cx="52" cy="66" r="3" fill="#20312B" />
      <circle cx="68" cy="66" r="3" fill="#20312B" />
      <path
        d="M53 73C56 78 64 78 67 73"
        fill="none"
        stroke="#20312B"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
