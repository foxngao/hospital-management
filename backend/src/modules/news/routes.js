const express = require("express");
const router = express.Router();
const controller = require("./controller");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { body } = require("express-validator");

// Validator khi tạo/sửa bài viết
const newsValidator = [
  body("tieuDe").notEmpty().withMessage("Tiêu đề là bắt buộc"),
  body("noiDung").notEmpty().withMessage("Nội dung là bắt buộc"),
];

/**
 * ROUTES
 * GET     /api/news/           → Xem tất cả bài viết (filter được)
 * POST    /api/news/           → `BACSI`, `PHARMACIST`, `ADMIN` có thể đăng
 * PUT     /api/news/:maTin     → Tác giả hoặc `ADMIN` được sửa
 * DELETE  /api/news/:maTin     → Chỉ `ADMIN` được xóa
 */

//  Xem tin tức (filter theo ngày, tiêu đề, người đăng)
router.get("/", verifyToken, controller.getAll);

//  Đăng bài viết mới
router.post(
  "/",
  verifyToken,
  checkRole("BACSI", "PHARMACIST", "ADMIN"),
  newsValidator,
  controller.create
);

//  Cập nhật bài viết
router.put(
  "/:maTin",
  verifyToken,
  checkRole("BACSI", "PHARMACIST", "ADMIN"),
  newsValidator,
  controller.update
);

//  Xoá bài viết
router.delete(
  "/:maTin",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
