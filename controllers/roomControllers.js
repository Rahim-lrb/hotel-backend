const Room = require('../models/Room');
const cloudinary = require('cloudinary').v2;  // Assuming cloudinary is being used

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};


exports.createRoom = async (req, res) => {
  const { name, description, pricePerNight, roomNumber, roomType, capacity, floorNumber, isSmokingAllowed, rating, roomSize } = req.body;

  // Ensure required fields are present
  if (!name || !description || !pricePerNight || !roomNumber || !roomType || !capacity) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    let image;
    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }

    // Create new room with all provided fields
    const room = new Room({
      name,
      description,
      pricePerNight,
      roomNumber,
      roomType,
      capacity,
      floorNumber,
      isSmokingAllowed,
      rating,
      roomSize,
      imageURL: image,
    });

    await room.save();
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};






exports.deleteRoom = async (req, res) => {
  const { roomNumber } = req.params; 
  console.log(roomNumber);
  try {
    const room = await Room.findOneAndDelete({ roomNumber });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};

exports.updateRoom = async (req, res) => {
  const { roomNumber } = req.params; // Room number to update
  const updates = req.body; // Data to update

  try {
    // Validate the room number if necessary (e.g., ensure it's a valid format)
    const room = await Room.findOneAndUpdate({ roomNumber }, updates, { new: true, runValidators: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};

exports.getRoomByRoomNumber = async (req, res) => {
  console.log("get room by roomNumber")
  const { roomNumber } = req.params; // Room number to retrieve
  console.log(roomNumber)

  try {
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};