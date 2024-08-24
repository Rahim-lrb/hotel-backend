const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const User = require('../models/userModel');
const errorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");

exports.createReservation = async (req, res) => {
  const { user, roomNumber, checkInDate, totalPrice } = req.body;

  if (!user || !roomNumber || !checkInDate || !totalPrice) {
    return res.status(400).json({ message: "User, roomNumber, checkInDate, and totalPrice are required." });
  }

  try {
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const reservation = new Reservation({
      user,
      room: room._id,
      checkInDate,
      totalPrice
    });
    await reservation.save();

    await User.findByIdAndUpdate(user, { $push: { reservations: reservation._id } });

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};




exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: 'room', // The field to populate
        select: 'roomNumber name description pricePerNight imageUrl' // Fields from the Room model to include
      })
      .populate('user'); // Populate user details if needed

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};

exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    const room = await Room.findById(reservation.room);
    if (room) {
      room.reserved = false;  // Release the room reservation
      await room.save();
    }

    res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};
