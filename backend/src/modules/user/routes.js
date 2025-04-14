const express = require('express');
const router = express.Router();
const userController = require('./controller');
const { authenticate, adminOnly } = require('../../middleware/auth');

router.post('/create', authenticate, adminOnly, userController.createUser);
router.get('/all', authenticate, userController.getAllUsers);
router.put('/update/:maUser', authenticate, adminOnly, userController.updateUser); // Sửa
router.delete('/delete/:maUser', authenticate, adminOnly, userController.deleteUser); // Xóa

module.exports = router;