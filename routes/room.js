const express = require('express');
const router = express.Router();
const roomControllers = require('../controllers/roomControllers');
const upload = require("../utils/multer")


router.route('/')
    .get(roomControllers.getRooms)
    .post(upload.single("file") ,roomControllers.createRoom)


router.route('/:roomNumber')
    .get(roomControllers.getRoomByRoomNumber)
    // .put(roomControllers.updateRoom)
    .delete(roomControllers.deleteRoom);

    
// router.route("/reserve")
    // .post(roomControllers.reserveRoom)
    

module.exports = router;