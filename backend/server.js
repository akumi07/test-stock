const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', stockRoutes);

app.get("/api/setup-db", (req, res) => {
    const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS portfolio";
    const useDatabaseQuery = "USE portfolio";
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS stocks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        ticker VARCHAR(10) NOT NULL,
        buy_price DECIMAL(10, 2) NOT NULL,
        quantity INT DEFAULT 1
    )`;

    // Create the database
    db.query(createDatabaseQuery, (err) => {
        if (err) return res.status(500).json({ error: "Error creating database", details: err.message });

        // Use the created database
        db.query(useDatabaseQuery, (err) => {
            if (err) return res.status(500).json({ error: "Error selecting database", details: err.message });

            // Create the table
            db.query(createTableQuery, (err) => {
                if (err) return res.status(500).json({ error: "Error creating table", details: err.message });

                res.json({ message: "Database setup complete" });
            });
        });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
