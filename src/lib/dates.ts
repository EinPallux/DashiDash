/**
 * Week helpers (docs/03 §6, Mon-start ISO weeks). Pure; the planner passes in
 * "today" so rendering stays deterministic and testable.
 */

const WEEKDAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;

const pad = (n: number) => String(n).padStart(2, "0");

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** Monday 00:00 of the week containing `d`. */
export function startOfWeek(d: Date): Date {
  const x = new Date(d);
  const mondayOffset = (x.getDay() + 6) % 7; // Sun=0 → 6, Mon=1 → 0
  x.setDate(x.getDate() - mondayOffset);
  x.setHours(0, 0, 0, 0);
  return x;
}

export type WeekDay = {
  iso: string;
  weekdayShort: string;
  dayNum: number;
  isToday: boolean;
};

/** `count` days starting from Monday of `anchor`'s week (default 14 = 2 weeks). */
export function weekDays(
  anchor: Date,
  todayIso: string,
  count = 14,
): WeekDay[] {
  const start = startOfWeek(anchor);
  return Array.from({ length: count }, (_, i) => {
    const d = addDays(start, i);
    const iso = isoDate(d);
    return {
      iso,
      weekdayShort: WEEKDAYS_SHORT[(d.getDay() + 6) % 7]!,
      dayNum: d.getDate(),
      isToday: iso === todayIso,
    };
  });
}

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

/** "Mo, 6. Juli" from an ISO date. */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y!, m! - 1, d!);
  return `${WEEKDAYS_SHORT[(date.getDay() + 6) % 7]}, ${d}. ${MONTHS[m! - 1]}`;
}
