const express = require("express");
const router = express.Router();
const controller = require("./controller");
const verifyToken = require("../../middleware/auth");

// Lấy tất cả thông báo của người dùng
router.get("/", verifyToken, controller.getAll);

// Tạo thông báo (dùng nội bộ hoặc admin)
router.post("/", verifyToken, controller.create);

//  Đánh dấu đã đọc
router.put("/:id/read", verifyToken, controller.markAsRead);

module.exports = router;
