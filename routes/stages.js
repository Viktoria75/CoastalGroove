const express = require('express');
const router = express.Router();
const { open } = require('sqlite');
const path = require('path');

//database configuration
const dbPath = path.join(__dirname, '..', 'database', 'festival.db');

//route for displaying stages
router.get('/', async (req, res) => {
    try {
        const db = await open({ filename: dbPath, driver: require('sqlite3').Database });

        //fetch stages data from the database
        const stagesData = await db.all('SELECT * FROM stages');

        //render the stages.ejs page and pass stages data to it
        res.render('stages', { stages: stagesData, festivalDate: "JUNE 20, 2024" });
    } catch (error) {
        console.error('Error fetching stages data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

