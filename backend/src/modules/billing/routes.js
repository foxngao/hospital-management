const express = require('express');
const router = express.Router();
const billingController = require('./controller');

router.post('/create', billingController.createBill);

module.exports = router;