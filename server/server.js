import express from "express";
import cors from "cors";
import db from "./db.js";
import { scrapeEvents } from "./src/cron/scrapeEvents.js";
import "./src/cron/cron.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// manual scrape
app.get("/scrape", async (req, res) => {
  await scrapeEvents();
  res.json({ message: "Scraping completed" });
});

// get events
app.get("/events", (req, res) => {
  const events = db
    .prepare("SELECT * FROM events ORDER BY lastScrapedAt DESC")
    .all();
  res.json(events);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
