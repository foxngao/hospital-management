const express = require('express');
const router = express.Router();
const notificationController = require('./controller');

router.post('/send', notificationController.sendNotification);

module.exports = router;