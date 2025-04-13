const express = require('express');
const router = express.Router();
const authController = require('./controller');
const { adminOnly } = require('../../middleware/auth');

router.post('/register', authController.register);
// Cho phép tất cả đăng nhập
router.post('/login', authController.login);

// Route chỉ cho Admin tạo tài khoản bác sĩ/nhân sự
router.post('/register-staff', adminOnly, authController.register);

module.exports = router;