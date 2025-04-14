const express = require('express');
const router = express.Router();
const authController = require('./controller');
const { authenticate, adminOnly, authorize } = require('../../middleware/auth');

router.post('/register-patient', authController.registerPatient); // Bệnh nhân tự đăng ký
router.post('/register-patient-by-staff', authenticate, authorize(['NHANSU']), authController.registerPatientByStaff); // Nhân sự tạo
router.post('/register-staff', authenticate, adminOnly, authController.registerStaff); // Admin tạo nhân viên
router.post('/login', authController.login);

module.exports = router;