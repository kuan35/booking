const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'booking2.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database opened successfully.');
    }
});

// Create a bookings table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lastName TEXT,
    firstName TEXT,
    email TEXT,
    phone TEXT,
    cardLastName TEXT,
    cardFirstName TEXT,
    cardNumber TEXT,
    expiryDate TEXT,
    cvv TEXT,
    roomType TEXT,
    checkinDate TEXT,
    checkoutDate TEXT,
    totalPrice REAL
)
`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating bookings table:', err);
    } else {
        console.log('Bookings table created successfully.');
    }
});

module.exports = db;
