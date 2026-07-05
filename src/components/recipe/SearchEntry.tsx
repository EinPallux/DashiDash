import Link from "next/link";
import { IconSearch } from "@/components/ui/icons";

/** The tap-to-search field on Entdecken — a link styled as an input. */
export function SearchEntry() {
  return (
    <Link
      href="/suche"
      className="rounded-chip bg-paper border-hairline text-nori-60 shadow-card flex h-12 items-center gap-2.5 border px-4"
    >
      <IconSearch className="h-5 w-5" />
      <span className="text-body">Wonach ist dir heute?</span>
    </Link>
  );
}
