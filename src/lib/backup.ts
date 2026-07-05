import { db, DB_TABLES } from "@/lib/db";

/**
 * Local-first backup (docs/01 §4.10). Serializes every Dexie table plus the
 * `dd.*` localStorage prefs to a JSON blob the user can download and re-import.
 * The only safety net for data that never leaves the device.
 */

export type Backup = {
  app: "dashidash";
  version: 1;
  exportedAt: number;
  tables: Record<string, unknown[]>;
  prefs: Record<string, string>;
};

export async function exportAll(): Promise<Backup> {
  const tables: Record<string, unknown[]> = {};
  for (const name of DB_TABLES) tables[name] = await db.table(name).toArray();

  const prefs: Record<string, string> = {};
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key?.startsWith("dd.")) prefs[key] = window.localStorage.getItem(key)!;
  }

  return {
    app: "dashidash",
    version: 1,
    exportedAt: Date.now(),
    tables,
    prefs,
  };
}

export async function importAll(json: unknown): Promise<void> {
  const data = json as Partial<Backup>;
  if (data.tables) {
    await db.transaction(
      "rw",
      [db.pantry, db.planned, db.shopping, db.cooked, db.settings],
      async () => {
        for (const name of DB_TABLES) {
          const rows = data.tables?.[name];
          if (Array.isArray(rows)) {
            await db.table(name).clear();
            if (rows.length) await db.table(name).bulkAdd(rows);
          }
        }
      },
    );
  }
  if (data.prefs) {
    for (const [key, value] of Object.entries(data.prefs)) {
      if (key.startsWith("dd.")) window.localStorage.setItem(key, value);
    }
  }
}
