import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open database (creates events.db automatically)
const db = await open({
  filename: "./events.db",
  driver: sqlite3.Database,
});

// Create table if it doesn't exist
await db.exec(`
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
`);

export default db;

