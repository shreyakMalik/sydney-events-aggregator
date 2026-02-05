import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAllEvents(city = "Sydney") {
  const url = `https://allevents.in/${city.toLowerCase()}/all`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);
  const events = [];

  $(".item.event-item").each((_, el) => {
    const title = $(el).find(".title").text().trim();
    const sourceUrl = $(el).find("a").attr("href");

    if (!title || !sourceUrl) return;

    events.push({
      title,
      date: null,
      venue: "",
      city,
      description: title,
      category: "Event",
      imageUrl: "",
      source: "AllEvents",
      sourceUrl: sourceUrl.startsWith("http")
        ? sourceUrl
        : `https://allevents.in${sourceUrl}`
    });
  });

  return events;
}
