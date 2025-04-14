const express = require('express');
const router = express.Router();
const appointmentController = require('./controller');
const { authenticate, authorize } = require('../../middleware/auth');

router.post('/create', appointmentController.createAppointment);
router.get('/all', appointmentController.getAppointments);
router.put('/update/:maLH', authenticate, authorize([ 'BACSI']), appointmentController.updateAppointment);
router.delete('/delete/:maLH', authenticate, authorize(['BACSI']), appointmentController.deleteAppointment);

module.exports = router;