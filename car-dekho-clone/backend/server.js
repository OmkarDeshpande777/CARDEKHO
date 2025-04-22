const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'OmTanaya', // Replace with your MySQL password
  database: 'WT' // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

// API to book a test drive
app.post('/api/book-test-drive', (req, res) => {
  const { name, phone_no, email, model_no, booking_date } = req.body;
  const query = 'INSERT INTO test_drive_bookings (name, phone_no, email, model_no, booking_date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, phone_no, email, model_no, booking_date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Test drive booked successfully', id: result.insertId });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});