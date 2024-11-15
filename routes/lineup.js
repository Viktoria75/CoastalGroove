const express = require('express');
const router = express.Router();
const { open } = require('sqlite');
const path = require('path');

//database configuration
const dbPath = path.join(__dirname, '..', 'database', 'festival.db');

//route for displaying lineup
router.get('/', async (req, res) => {
    try {
        const db = await open({ filename: dbPath, driver: require('sqlite3').Database });

        //fetch lineup data from the database
        const lineupData = await db.all('SELECT * FROM lineup ORDER BY stage');

        //render the lineup page and pass data
        res.render('lineup', { lineup: lineupData ,  festivalDate: "JUNE 20, 2024" });
    } catch (error) {
        console.error('Error fetching lineup data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

