const express = require('express');
const router = express.Router();
const medicalRecordController = require('./controller');

router.post('/create', medicalRecordController.createMedicalRecord);

module.exports = router;