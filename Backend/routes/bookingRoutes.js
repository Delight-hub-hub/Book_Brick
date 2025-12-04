
const express = require("express");
const router = express.Router();
const { createBooking, getBookings, deleteBooking } = require("../controllers/bookingController");

// POST → Create booking
router.post("/", createBooking);

// GET → Get all bookings
router.get("/", getBookings);

// DELETE → Delete booking by id
router.delete("/:id", deleteBooking);

module.exports = router;
