const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const controller = require("./controller");

/**
 * Middleware kiểm tra đầu vào cho đăng ký
 */
const registerValidator = [
  body("tenDangNhap")
    .notEmpty()
    .withMessage("Tên đăng nhập là bắt buộc")
    .isLength({ min: 4 })
    .withMessage("Tên đăng nhập phải từ 4 ký tự trở lên"),
  body("matKhau")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("maNhom")
    .notEmpty()
    .withMessage("Nhóm quyền là bắt buộc"),
];

/**
 * Middleware kiểm tra đầu vào cho đăng nhập
 */
const loginValidator = [
  body("tenDangNhap")
    .notEmpty()
    .withMessage("Tên đăng nhập là bắt buộc"),
  body("matKhau")
    .notEmpty()
    .withMessage("Mật khẩu là bắt buộc"),
];

// Định tuyến
router.post("/register", registerValidator, controller.register);
router.post("/login", loginValidator, controller.login);





module.exports = router;
