const express = require('express');
const router = express.Router();
const appointmentController = require('./controller');
const { authenticate, authorize } = require('../../middleware/auth');

// Route tạo lịch hẹn
router.post('/create', authenticate, authorize(['BENHNHAN', 'BACSI']), appointmentController.createAppointment);

// Route lấy danh sách lịch hẹn
router.get('/all', authenticate, appointmentController.getAppointments);

// Route cập nhật lịch hẹn
router.put('/update/:maLH', authenticate, authorize(['BACSI']), appointmentController.updateAppointment);

// Route xóa lịch hẹn
router.delete('/delete/:maLH', authenticate, authorize(['BACSI']), appointmentController.deleteAppointment);

module.exports = router;