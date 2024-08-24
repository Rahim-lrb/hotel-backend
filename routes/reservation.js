const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationControllers');

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getReservations);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
