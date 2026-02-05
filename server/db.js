import Database from "better-sqlite3";

const db = new Database("events.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    venue TEXT,
    city TEXT,
    description TEXT,
    category TEXT,
    imageUrl TEXT,
    source TEXT,
    sourceUrl TEXT UNIQUE,
    status TEXT,
    lastScrapedAt TEXT,
    importedAt TEXT,
    importedBy TEXT
  )
`).run();

export default db;
