const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saumya123',
    database: 'charity_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to Charity Management System');
});
const cors = require('cors');
app.use(cors());


// CRUD Operations for Donors
app.post('/donors', (req, res) => {
    const { name, email, phone } = req.body;
    db.query('INSERT INTO donors (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Donor added successfully');
    });
});

app.get('/donors', (req, res) => {
    db.query('SELECT * FROM donors', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.put('/donors/:id', (req, res) => {
    const { name, email, phone } = req.body;
    db.query('UPDATE donors SET name = ?, email = ?, phone = ? WHERE donor_id = ?', [name, email, phone, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Donor updated successfully');
    });
});

app.delete('/donors/:id', (req, res) => {
    db.query('DELETE FROM donors WHERE donor_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Donor deleted successfully');
    });
});

// CRUD Operations for Donations
app.post('/donations', (req, res) => {
   const { donor_id, amount, donation_date } = req.body;
db.query('INSERT INTO donations (donor_id, amount, donation_date) VALUES (?, ?, ?)', [donor_id, amount, donation_date], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Donation recorded successfully');
    });
});

app.get('/donations', (req, res) => {
    db.query('SELECT * FROM donations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// CRUD Operations for Organizations
app.post('/organizations', (req, res) => {
    const { name, mission } = req.body;
    db.query('INSERT INTO organizations (name, mission) VALUES (?, ?)', [name, mission], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Organization added successfully');
    });
});

app.get('/organizations', (req, res) => {
    db.query('SELECT * FROM organizations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// CRUD Operations for Volunteers
app.post('/volunteers', (req, res) => {
    const { name, contact, availability } = req.body;
    db.query('INSERT INTO volunteers (name, contact, availability) VALUES (?, ?, ?)', [name, contact, availability], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Volunteer added successfully');
    });
});

app.get('/volunteers', (req, res) => {
    db.query('SELECT * FROM volunteers', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// CRUD Operations for Expenses
app.post('/expenses', (req, res) => {
    const { description, amount, date } = req.body;
    db.query('INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)', [description, amount, date], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Expense added successfully');
    });
});

app.get('/expenses', (req, res) => {
    db.query('SELECT * FROM expenses', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// CRUD Operations for Events
app.post('/events', (req, res) => {
    const { name, date, location } = req.body;
    db.query('INSERT INTO events (name, date, location) VALUES (?, ?, ?)', [name, date, location], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Event added successfully');
    });
});

app.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// CRUD Operations for Beneficiaries
app.post('/beneficiaries', (req, res) => {
    const { name, assistance_type } = req.body;
    db.query('INSERT INTO beneficiaries (name, assistance_type) VALUES (?, ?)', [name, assistance_type], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Beneficiary added successfully');
    });
});

app.get('/beneficiaries', (req, res) => {
    db.query('SELECT * FROM beneficiaries', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
