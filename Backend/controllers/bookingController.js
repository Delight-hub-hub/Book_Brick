const pool = require("../database/db");

function isValidEmail(email) {
   return typeof email === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function isValidDateString(dateStr) {
  if (typeof dateStr !== 'string') return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { name, email, date, service } = req.body;

    // Basic server-side validation
    if (!name || !email || !service || !date) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    if (!isValidDateString(date)) {
      return res.status(400).json({ success: false, error: 'Invalid date format' });
    }

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (bookingDate < today) {
      return res.status(400).json({ success: false, error: 'Cannot book a past date' });
    }

     const insertQuery = `
      INSERT INTO bookings (name, email, service, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [name, email, service, date];
    const { rows } = await pool.query(insertQuery, values);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET ALL BOOKINGS
exports.getBookings = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    return res.status(200).json({
      success: true,
      message: "Fetch bookings successful",
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// DELETE BOOKING
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, error: 'Missing booking id' });
    const { rowCount } = await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ success: false, error: 'Booking not found' });
    return res.status(200).json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
