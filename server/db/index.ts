import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'topline.db');

// Initialize SQLite connection
export const sqliteDb = new DatabaseSync(DB_PATH);

// Initialize tables and safe column migrations
export function initDatabase(): void {
  const schemaPath = path.resolve(process.cwd(), 'server/db/schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    sqliteDb.exec(schemaSql);
  }

  // Safe migration for multi-image columns on existing tables
  try {
    sqliteDb.exec('ALTER TABLE products ADD COLUMN gallery_images_json TEXT;');
  } catch {
    // Column already exists, safe to ignore
  }

  try {
    sqliteDb.exec('ALTER TABLE collections ADD COLUMN gallery_images_json TEXT;');
  } catch {
    // Column already exists, safe to ignore
  }
}

export type DBParam = null | number | bigint | string | Uint8Array | boolean | undefined;

function normalizeParams(params: DBParam[]): (null | number | bigint | string | Uint8Array)[] {
  return params.map((p) => {
    if (p === undefined || p === null) return null;
    if (typeof p === 'boolean') return p ? 1 : 0;
    return p;
  });
}

// Database query abstraction layer (100% Parameterized Statements)
export const db = {
  all<T = Record<string, unknown>>(sql: string, params: DBParam[] = []): T[] {
    const stmt = sqliteDb.prepare(sql);
    const normalized = normalizeParams(params);
    const rows = stmt.all(...normalized);
    return rows as unknown as T[];
  },

  get<T = Record<string, unknown>>(sql: string, params: DBParam[] = []): T | null {
    const stmt = sqliteDb.prepare(sql);
    const normalized = normalizeParams(params);
    const rows = stmt.all(...normalized);
    return rows.length > 0 ? (rows[0] as unknown as T) : null;
  },

  run(sql: string, params: DBParam[] = []): { changes: number | bigint; lastInsertRowid: number | bigint } {
    const stmt = sqliteDb.prepare(sql);
    const normalized = normalizeParams(params);
    return stmt.run(...normalized);
  },

  exec(sql: string): void {
    sqliteDb.exec(sql);
  },
};
