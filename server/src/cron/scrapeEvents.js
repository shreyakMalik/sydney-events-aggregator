import db from "../../db.js";
import { scrapeEventbrite } from "../scrapers/eventbrite.js";
import { scrapeAllEvents } from "../scrapers/allevents.js";

export async function scrapeEvents() {
  console.log("⏰ Scrape started");
  const now = new Date().toISOString();

  const eventbriteEvents = await scrapeEventbrite("Sydney");
  const alleventsEvents = await scrapeAllEvents("Sydney");

  const events = [...eventbriteEvents, ...alleventsEvents];

  // 🔹 NORMAL INSERT FLOW
  for (const e of events) {
    const exists = await db.get(
      "SELECT id FROM events WHERE sourceUrl = ?",
      [e.sourceUrl]
    );

    if (!exists) {
      await db.run(
        `
        INSERT INTO events
        (title, date, venue, city, description, category, imageUrl, source, sourceUrl, status, lastScrapedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
        `,
        [
          e.title,
          e.date,
          e.venue,
          e.city,
          e.description,
          e.category,
          e.imageUrl,
          e.source,
          e.sourceUrl,
          now
        ]
      );
    }
  }

  // 🔹 SEED FALLBACK (IMPORTANT PART)
  if (events.length === 0) {
    console.log("⚠️ No live events found. Seeding demo data...");

    const seedEvents = [
      {
        title: "Sydney Tech Meetup (Demo)",
        city: "Sydney",
        description: "Sample seeded event for project demonstration.",
        source: "Demo",
        sourceUrl: "https://example.com/demo-tech"
      },
      {
        title: "Sydney Music Night (Demo)",
        city: "Sydney",
        description: "Sample seeded event for project demonstration.",
        source: "Demo",
        sourceUrl: "https://example.com/demo-music"
      }
    ];

    for (const e of seedEvents) {
      await db.run(
        `
        INSERT OR IGNORE INTO events
        (title, city, description, source, sourceUrl, status, lastScrapedAt)
        VALUES (?, ?, ?, ?, ?, 'demo', ?)
        `,
        [
          e.title,
          e.city,
          e.description,
          e.source,
          e.sourceUrl,
          now
        ]
      );
    }
  }

  console.log("✅ Scraping completed");
}
