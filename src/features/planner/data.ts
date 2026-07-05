import { useLiveQuery } from "dexie-react-hooks";
import { db, type PlannedMeal } from "@/lib/db";

/**
 * Planner repository (docs/04 §5). One row per planned meal (date + slot +
 * recipe + servings). Reads reactive via useLiveQuery.
 */

export function usePlannedMeals(): PlannedMeal[] | undefined {
  return useLiveQuery(() => db.planned.toArray());
}

export async function addPlannedMeal(meal: Omit<PlannedMeal, "id">) {
  await db.planned.add(meal);
}

export async function removePlannedMeal(id: number) {
  await db.planned.delete(id);
}

export async function setPlannedServings(id: number, servings: number) {
  await db.planned.update(id, { servings: Math.min(8, Math.max(1, servings)) });
}
