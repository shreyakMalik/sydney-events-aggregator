🌉 Sydney Events Aggregator

A full-stack web application that automatically scrapes and displays Sydney-based events from multiple public event websites. The application periodically updates event data, stores it in a database, and presents it through a clean, minimal web interface.

✨ Key Highlights

🔍 Scrapes real Sydney events from multiple public sources

⏰ Automatically updates data using a scheduled cron job

🗄️ Stores events persistently using SQLite

🌐 Displays events in a user-friendly web interface

🏷️ Clearly labels each event by its source

🧩 Supported Event Sources

Eventbrite

AllEvents

Each event card in the UI shows a source badge to indicate where the data originated.

🛠️ Tech Stack

Backend: Node.js, Express.js

Web Scraping: Axios, Cheerio

Database: SQLite

Scheduler: node-cron

Frontend: HTML, CSS, Vanilla JavaScript

📁 Project Structure
server/
├── server.js              # Express server entry point
├── db.js                  # SQLite database configuration
├── events.db              # SQLite database (auto-generated)
├── public/
│   └── index.html         # Frontend UI
└── src/
    ├── scrapers/
    │   ├── eventbrite.js  # Eventbrite scraper
    │   └── allevents.js   # AllEvents scraper
    └── cron/
        ├── cron.js        # Cron scheduler
        └── scrapeEvents.js# Aggregated scraping logic

🚀 Getting Started
1️⃣ Clone the repository
git clone <repository-url>
cd server

2️⃣ Install dependencies
npm install

3️⃣ Start the server
npm start


The application will be available at:

http://localhost:5000

🌐 Available Routes
Route	Description
/	Web UI displaying Sydney events
/events	Fetch all stored events as JSON
/scrape	Manually trigger event scraping
⏰ Automated Scraping (Cron Job)

The application uses node-cron to automatically scrape event data.

The cron job is configured to run every 6 hours.

This ensures that event listings stay updated without manual intervention.