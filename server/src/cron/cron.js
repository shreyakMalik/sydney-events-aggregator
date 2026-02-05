import cron from "node-cron";
import { scrapeEvents } from "./scrapeEvents.js";

cron.schedule("0 */6 * * *", async () => {
  console.log("⏰ Cron job started...");
  await scrapeEvents();
  console.log("✅ Cron job finished");
});
