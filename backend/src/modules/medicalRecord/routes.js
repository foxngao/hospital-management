const express = require('express');
const router = express.Router();
const medicalRecordController = require('./controller');
const { authenticate, authorize } = require('../../middleware/auth');

router.post('/create', authenticate, authorize(['BACSI', 'NHANSU']), medicalRecordController.createMedicalRecord);
router.get('/all', authenticate, medicalRecordController.getMedicalRecord);
router.put('/update/:maHSBA', authenticate, authorize(['BACSI', 'NHANSU']), medicalRecordController.updateMedicalRecord);
router.delete('/delete/:maHSBA', authenticate, authorize(['BACSI', 'NHANSU']), medicalRecordController.deleteMedicalRecord);

module.exports = router;