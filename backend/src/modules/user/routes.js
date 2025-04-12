const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.post('/create', userController.createUser);
router.get('/all', userController.getAllUsers);

module.exports = router;