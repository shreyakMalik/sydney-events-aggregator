import db from "../../db.js";
import { scrapeEventbrite } from "../scrapers/eventbrite.js";
import { scrapeAllEvents } from "../scrapers/allevents.js";


export async function scrapeEvents() {
  console.log("⏰ Scrape started");
  const now = new Date().toISOString();

  const eventbriteEvents = await scrapeEventbrite("Sydney");
  const alleventsEvents = await scrapeAllEvents("Sydney");

  const events = [...eventbriteEvents, ...alleventsEvents];
  for (const e of events) {
    const exists = db
      .prepare("SELECT id FROM events WHERE sourceUrl = ?")
      .get(e.sourceUrl);

    if (!exists) {
      db.prepare(`
        INSERT INTO events
        (title, date, venue, city, description, category, imageUrl, source, sourceUrl, status, lastScrapedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
      `).run(
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
      );
    }
  }

  console.log(`✅ ${events.length} Eventbrite events processed`);
}
