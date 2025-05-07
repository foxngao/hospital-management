const express = require("express");
const router = express.Router();

const { getProfile, updateProfile } = require("./controller");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole.js");
const { body } = require("express-validator");

/**
 * Validator cập nhật thông tin cá nhân
 */
const updateValidator = [
  body("hoTen").optional().isLength({ min: 2 }).withMessage("Họ tên phải từ 2 ký tự"),
  body("email").optional().isEmail().withMessage("Email không hợp lệ"),
  body("soDienThoai").optional().isMobilePhone("vi-VN").withMessage("SĐT không hợp lệ"),
  body("diaChi").optional().isString(),
  body("ngaySinh").optional().isISO8601().toDate(),
];

/**
 * ROUTES
 * GET    /api/user/me      => lấy thông tin cá nhân hiện tại
 * PUT    /api/user/me      => cập nhật hồ sơ cá nhân
 */
router.get(
  "/me",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN", "NHANSU"),
  getProfile
);

router.put(
  "/me",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN", "NHANSU"),
  updateValidator,
  updateProfile
);

module.exports = router;
