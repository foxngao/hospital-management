const express = require('express');
const router = express.Router();
const medicalRecordController = require('./controller');
const { authenticate, authorize } = require('../../middleware/auth');

router.post('/create', authenticate, authorize(['BACSI', 'NHANSU']), medicalRecordController.createMedicalRecord);
router.get('/all', authenticate, medicalRecordController.getMedicalRecord);

module.exports = router;