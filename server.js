const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    database: "Bloodbank",
    user: "root",
    password: "Pranit@2004",
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the Bloodbank database');
});

// POST endpoint for inserting donor data
app.post('/api/donors', (req, res) => {
    const { name, address, age, blood_type, contact_number, gender } = req.body;

    const query = `INSERT INTO Donor (name, address, age, blood_type, contact_number, gender)
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, address, age, blood_type, contact_number, gender], (err, results) => {
        if (err) {
            console.error('Error inserting donor data:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Donor added successfully!', id: results.insertId });
    });
});

// POST endpoint for inserting patient data
app.post('/api/patients', (req, res) => {
    const { name, address, age, blood_type, contact_number, gender } = req.body;

    const query = 'INSERT INTO Patient (name, address, age, blood_type, contact_number, gender) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [name, address, age, blood_type, contact_number, gender], (err, result) => {
        if (err) {
            console.error('Error inserting patient data:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Patient data saved successfully', id: result.insertId });
    });
});

// Fetch donors
app.get('/api/donors', (req, res) => {
    db.query('SELECT * FROM Donor', (error, results) => {
        if (error) {
            console.error('Error fetching donors:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Fetch patients
app.get('/api/patients', (req, res) => {
    db.query('SELECT * FROM Patient', (error, results) => {
        if (error) {
            console.error('Error fetching patients:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM Employee WHERE (user_name = ? OR user_name = ?) AND pass = ?`;

    db.query(query, [username, username, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Server error');
        }
        if (result.length > 0) {
            res.json({ message: 'Login Successful!' });
        } else {
            res.status(401).send('Invalid credentials, please try again.');
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


