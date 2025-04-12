const express = require('express');
const router = express.Router();
const labTestController = require('./controller');

router.post('/create', labTestController.createTest);

module.exports = router;