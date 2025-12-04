require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database/db");   // ✔️ PostgreSQL
const bookingRoutes = require("./routes/bookingRoutes");

app.use(express.json());
app.use(cors());

// Ensure bookings table exists
const ensureBookingsTable = async () => {
	const createTableQuery = `
		CREATE TABLE IF NOT EXISTS bookings (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			service TEXT NOT NULL,
			date DATE NOT NULL,
			time TEXT,
			created_at TIMESTAMP DEFAULT NOW()
		);
	`;

	try {
		await pool.query(createTableQuery);
		console.log('Bookings table is ready');
	} catch (err) {
		console.error('Failed to ensure bookings table exists:', err);
	}
};

ensureBookingsTable();

// Routes
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
