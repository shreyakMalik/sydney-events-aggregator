import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeEventbrite(city = "Sydney") {
  const url = `https://www.eventbrite.com/d/australia--${city.toLowerCase()}/events/`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const events = [];

  $('a[href*="/e/"]').each((_, el) => {
    const title = $(el).text().trim();
    const sourceUrl = $(el).attr("href");

    if (!title || !sourceUrl) return;

    events.push({
      title,
      date: null,
      venue: "",
      city,
      description: title,
      category: "Event",
      imageUrl: "",
      source: "Eventbrite",
      sourceUrl: sourceUrl.startsWith("http")
        ? sourceUrl
        : `https://www.eventbrite.com${sourceUrl}`,
    });
  });

  return events;
}
