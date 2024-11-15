const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const app = express();

//view engine and views directory
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//database configuration
const dbPath = path.join(__dirname, "database", "festival.db");

//initialize the database
(async () => {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  //create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS lineup (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artist_name TEXT NOT NULL,
      genre TEXT,
      stage TEXT,
      time TEXT
    );

    CREATE TABLE IF NOT EXISTS stages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stage_name TEXT NOT NULL,
      description TEXT
    );
  `);

  //insert sample data if tables are empty
  const lineupCount = await db.get('SELECT COUNT(*) as count FROM lineup');
  const stagesCount = await db.get('SELECT COUNT(*) as count FROM stages');

  if (lineupCount.count === 0) {
    await db.exec(`
      INSERT INTO lineup (artist_name, genre, stage, time)
      VALUES
      ('Billie Eilish', 'Pop, R&B', 'Main Stage', '6:00 PM'),
      ('Calvin Harris', 'Electronic, Dance', 'Main Stage', '7:00 PM'),
      ('Lana Del Rey', 'R&B, Pop', 'Main Stage', '8:00 PM'),
      ('Kendrick Lamar', 'Hip Hop, Rap', 'Main Stage','9:00 PM'),
      ('Bruno Mars', 'R&B, Funk', 'Main Stage', '10:00 PM'),
      ('Ed Sheeran', 'Pop, Acoustic', 'Acoustic Cove Lounge', '6:00 PM'),
      ('Norah Jones', 'Jazz, Blues', 'Acoustic Cove Lounge', '7:00 PM'),
      ('Ben Howard', 'Folk, Acoustic', 'Acoustic Cove Lounge', '8:00 PM'),
      ('John Mayer', 'Blues, Pop', 'Acoustic Cove Lounge', '9:00 PM'),
      ('Jack Johnson', 'Acoustic, Soft Rock', 'Acoustic Cove Lounge', '10:00 PM'),
      ('Martin Garrix', 'Electronic, Progressive House', 'Electro Tide Arena', '6:00 PM'),
      ('Zedd', 'Electronic, Dance', 'Electro Tide Arena', '7:00 PM'),
      ('Alison Wonderland', 'Trap, Future Bass', 'Electro Tide Arena', '8:00 PM'),
      ('Disclosure', 'House, UK Garage', 'Electro Tide Arena', '9:00 PM'),
      ('Flume', 'Electronic, Experimental', 'Electro Tide Arena', '10:00 PM');
    `);
  }

  if (stagesCount.count === 0) {
    const insertQuery = await db.prepare(`
        INSERT INTO stages (stage_name, description) VALUES (?, ?), (?, ?), (?, ?);
    `);

    await insertQuery.run(
        'Main Stage: Sunset Horizon Pavilion',
        'The Sunset Horizon Pavilion is the heart of Coastal Groove Fest, positioned strategically to provide breathtaking views of the Florida sunset. The stage is adorned with vibrant LED screens and dynamic lighting fixtures, creating a mesmerizing atmosphere as the sun sets over the coastal waters. The sprawling amphitheater allows for a massive audience, and the stage is equipped with state-of-the-art sound systems to deliver an unforgettable audiovisual experience. The main stage hosts the festival\'s headlining acts and performances that will resonate through the picturesque surroundings.',
        'Acoustic Cove Lounge',
        'The Acoustic Cove Lounge offers an intimate and relaxed setting right by the water\'s edge. With the sandy beach as its floor, this acoustic lounge provides a contrast to the main stage\'s energy. Surrounded by swaying palm trees and the gentle lapping of the waves, this stage features a cozy setup with hammocks, bean bags, and beach blankets for festival-goers to unwind and enjoy acoustic performances. The artists at this stage showcase a diverse range of genres, from indie folk to mellow acoustic tunes, creating a tranquil atmosphere against the coastal backdrop.',
        'Electro Tide Arena',
        'For those seeking an electrifying experience, the Electro Tide Arena is the go-to destination. Positioned near the water\'s edge, this stage boasts a cutting-edge design with futuristic lighting installations and a dance floor that seems to merge seamlessly with the coastal surroundings. The lineup on this stage focuses on electronic dance music (EDM) and features renowned DJs and electronic artists. The stage area extends into a waterfront dance zone, creating an immersive experience where festival-goers can dance under the stars with the ocean breeze enhancing the beats'
    );

    await insertQuery.finalize();
}


})();


//routes
const indexRoute = require("./routes/index");
const lineupRoute = require("./routes/lineup");
const stagesRoute = require("./routes/stages");
const faqRoute = require("./routes/faq");
const contactRoute = require("./routes/contact");
const activityRoute = require("./routes/activity"); //added for activity (B grade)


app.use("/", indexRoute);
app.use("/lineup", lineupRoute);
app.use("/stages", stagesRoute);
app.use("/faq", faqRoute);
app.use("/contact", contactRoute);
app.use("/activity", activityRoute); //added for activity (B grade)

app.listen(5000);