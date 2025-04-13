const express = require('express');
const router = express.Router();
const billingController = require('./controller');
const { authenticate, authorize } = require('../../middleware/auth');

router.post('/create', authenticate, authorize(['NHANSU']), billingController.createBill);

module.exports = router;