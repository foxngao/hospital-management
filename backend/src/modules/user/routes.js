const express = require('express');
const router = express.Router();
const userController = require('./controller');
const { authenticate, adminOnly } = require('../../middleware/auth');

router.post('/create', authenticate, adminOnly, userController.createUser);
router.get('/all', authenticate, userController.getAllUsers);

module.exports = router;