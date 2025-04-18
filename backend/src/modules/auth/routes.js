const express = require('express');
const router = express.Router();
const authController = require('./controller');
const { authenticate, adminOnly, authorize } = require('../../middleware/auth');

// Public routes
router.post('/register-patient', authController.registerPatient);
router.post('/login', authController.login);
router.post('/init-admin', authController.registerAdmin); 

// Protected routes
router.post('/register-patient-by-staff', authenticate, authorize(['NHANSU']), authController.registerPatientByStaff);
router.post('/register-staff', authenticate, adminOnly, authController.registerStaff);

module.exports = router;