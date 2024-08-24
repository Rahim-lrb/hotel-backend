const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  roomNumber: { type: String, required: true, unique: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true },
  imageURL: { type: String },
  floorNumber: { type: Number },
  isSmokingAllowed: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 5 },
  roomSize: { type: Number },
  reserved: { type: Boolean, default: false },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
