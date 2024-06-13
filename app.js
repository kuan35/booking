const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./bookingdb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Route to serve the booking page
app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bookingpage.html'));
});

// Route to handle booking form submission
app.post('/submit-booking', (req, res) => {
    const {
        lastName,
        firstName,
        email,
        phone,
        cardLastName,
        cardFirstName,
        cardNumber,
        expiryDate,
        cvv,
        roomType,
        checkinDate,
        checkoutDate,
        totalPrice
    } = req.body;

    const insertQuery = `
    INSERT INTO bookings (lastName, firstName, email, phone, cardLastName, cardFirstName, cardNumber, expiryDate, cvv, roomType, checkinDate, checkoutDate, totalPrice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [lastName, firstName, email, phone, cardLastName, cardFirstName, cardNumber, expiryDate, cvv, roomType, checkinDate, checkoutDate, totalPrice], function(err) {
        if (err) {
            console.error('Error saving booking:', err);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        } else {
            res.json({ success: true, message: 'Booking submitted successfully.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
