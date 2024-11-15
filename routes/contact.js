const express = require('express');
const router = express.Router();
const { open } = require('sqlite');
const path = require('path');
const bodyParser = require('body-parser');

//database configuration
const dbPath = path.join(__dirname, '..', 'database', 'festival.db');

//middleware to parse form data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//route for displaying contact form
router.get('/', (req, res) => {
    res.render('contact', { festivalDate: "JUNE 20, 2024" });
});

//initialize the database
const initializeDatabase = async () => {
    const db = await open({ filename: dbPath, driver: require('sqlite3').Database });

    //create the contact_form table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS contact_form (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phonenumber TEXT,
            subject TEXT
        );
    `);

    await db.close();
};

//initialize the database when the server starts
initializeDatabase();

//route for handling form submission
router.post('/submit', async (req, res) => {
    try {
        console.log(req.body);
        const { name, phonenumber, subject } = req.body;

        const db = await open({ filename: dbPath, driver: require('sqlite3').Database });

        await db.run('INSERT INTO contact_form (name, phonenumber, subject) VALUES (?, ?, ?)', [name, phonenumber, subject]);

        await db.close();

         res.json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
