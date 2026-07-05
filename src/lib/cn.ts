/**
 * Tiny className joiner — filters out falsy values so components can write
 * conditional classes without pulling in a dependency. Keeps the design-system
 * primitives readable (see the `clsx`-style usage across `components/ui`).
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
