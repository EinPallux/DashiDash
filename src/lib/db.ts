import Dexie, { type Table } from "dexie";
import type { Unit } from "@/content/schema";

/**
 * Local-first user data (docs/03 §5, docs/04 §5). Everything lives in
 * IndexedDB via Dexie and never leaves the device. Reads happen through
 * `useLiveQuery` (reactive); writes go through the repository functions in
 * each feature's data module — never raw `db.*` inside components. Schema
 * changes must be additive (`.version(n)`) so user data survives every deploy.
 */

export interface PantryItem {
  ingredientId: string;
  addedAt: number;
}

export interface PlannedMeal {
  id?: number;
  date: string; // YYYY-MM-DD
  slot: "fruehstueck" | "mittag" | "abend";
  recipeId: string;
  servings: number;
}

export interface ShoppingItem {
  id?: number;
  ingredientId: string | null;
  freeText?: string;
  amount: number | null;
  unit: Unit | null;
  /** Provenance for "für Oyakodon + …". */
  sources: { recipeId: string; servings: number }[];
  checked: boolean;
  addedAt: number;
}

export interface CookedEntry {
  id?: number;
  recipeId: string;
  date: string;
  servings: number;
}

export interface Setting {
  key: string;
  value: unknown;
}

class DashiDatabase extends Dexie {
  pantry!: Table<PantryItem, string>;
  planned!: Table<PlannedMeal, number>;
  shopping!: Table<ShoppingItem, number>;
  cooked!: Table<CookedEntry, number>;
  settings!: Table<Setting, string>;

  constructor() {
    super("dashidash");
    this.version(1).stores({
      pantry: "ingredientId",
      planned: "++id, date",
      shopping: "++id, ingredientId",
      cooked: "++id, recipeId, date",
      settings: "key",
    });
  }
}

export const db = new DashiDatabase();

/** Table names, for export/import (settings backup). */
export const DB_TABLES = [
  "pantry",
  "planned",
  "shopping",
  "cooked",
  "settings",
] as const;
