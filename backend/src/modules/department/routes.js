const express = require("express");
const router = express.Router();
const controller = require("./controller");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { body } = require("express-validator");

//  Validator kiểm tra đầu vào khi tạo/cập nhật khoa
const departmentValidator = [
  body("tenKhoa")
    .isLength({ min: 3 })
    .withMessage("Tên khoa phải có ít nhất 3 ký tự"),
  body("moTa")
    .optional()
    .isString()
    .withMessage("Mô tả phải là chuỗi"),
];

/**
 * ROUTES
 * GET     /api/department/          → tất cả người dùng đều được xem
 * POST    /api/department/          → chỉ ADMIN được tạo
 * PUT     /api/department/:maKhoa   → chỉ ADMIN được sửa
 * DELETE  /api/department/:maKhoa   → chỉ ADMIN được xoá
 */

//  Xem danh sách khoa
router.get("/", verifyToken, controller.getAll);

// ➕ Thêm mới khoa phòng
router.post(
  "/",
  verifyToken,
  checkRole("ADMIN"),
  departmentValidator,
  controller.create
);

//  Cập nhật thông tin khoa
router.put(
  "/:maKhoa",
  verifyToken,
  checkRole("ADMIN"),
  departmentValidator,
  controller.update
);

//  Xóa khoa phòng
router.delete(
  "/:maKhoa",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
