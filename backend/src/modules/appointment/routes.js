const express = require('express');
const router = express.Router();
const appointmentController = require('./controller');

router.post('/create', appointmentController.createAppointment);
router.get('/all', appointmentController.getAppointments);

module.exports = router;