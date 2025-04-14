const express = require('express');
const router = express.Router();
const billingController = require('./controller');
const { authenticate, authorize } = require('../../middleware/auth');

router.post('/create', authenticate, authorize(['NHANSU']), billingController.createBill);
router.put('/update/:maHD', authenticate, authorize(['NHANSU']), billingController.updateBill);
router.delete('/delete/:maHD', authenticate, authorize(['NHANSU']), billingController.deleteBill);

module.exports = router;