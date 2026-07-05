"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { springGentle, useMotionSafe } from "@/lib/motion";
import {
  TabEinkaufen,
  TabEntdecken,
  TabLernen,
  TabPlanen,
  TabVorrat,
  type IconProps,
} from "@/components/ui/icons";

type Tab = {
  href: string;
  label: string;
  Icon: (props: IconProps) => React.ReactElement;
  /** Path prefixes that keep this tab highlighted. */
  match: string[];
};

const TABS: Tab[] = [
  {
    href: "/",
    label: "Entdecken",
    Icon: TabEntdecken,
    match: ["/suche", "/kategorie", "/rezept"],
  },
  { href: "/vorrat", label: "Vorrat", Icon: TabVorrat, match: ["/vorrat"] },
  { href: "/planen", label: "Planen", Icon: TabPlanen, match: ["/planen"] },
  {
    href: "/einkaufen",
    label: "Einkaufen",
    Icon: TabEinkaufen,
    match: ["/einkaufen"],
  },
  { href: "/lernen", label: "Lernen", Icon: TabLernen, match: ["/lernen"] },
];

function isActive(pathname: string, tab: Tab): boolean {
  if (tab.href === "/") {
    return pathname === "/" || tab.match.some((p) => pathname.startsWith(p));
  }
  return tab.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function TabBar() {
  const pathname = usePathname();
  const { reduced } = useMotionSafe();

  // Cook mode is full-screen: hide the tab bar there.
  if (pathname.endsWith("/kochen")) return null;

  const blobTransition = reduced ? { duration: 0.12 } : springGentle;

  return (
    <nav
      aria-label="Hauptnavigation"
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+12px)] left-1/2 z-50 w-[calc(min(100%,640px)-24px)] -translate-x-1/2"
    >
      <ul className="rounded-chip border-hairline bg-paper shadow-raised flex items-stretch justify-around border p-1.5">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab);
          const { Icon } = tab;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
                className={`rounded-chip relative flex h-12 flex-col items-center justify-center gap-0.5 ${
                  active ? "text-dashi" : "text-nori-60"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-blob"
                    transition={blobTransition}
                    className="rounded-chip bg-dashi-soft absolute inset-0 -z-10"
                  />
                )}
                <Icon filled={active} className="h-6 w-6" />
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : 2 }}
                  transition={reduced ? { duration: 0.12 } : springGentle}
                  className="font-display text-[11px] leading-none font-bold"
                >
                  {tab.label}
                </motion.span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
