const express = require('express');
const router = express.Router();
const pharmacyController = require('./controller');

router.post('/add', pharmacyController.addMedicine);

module.exports = router;