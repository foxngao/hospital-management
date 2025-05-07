const express = require("express");
const router = express.Router();
const controller = require("./controller");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { body } = require("express-validator");

//  Kiểm tra dữ liệu khi thêm/sửa thông tin dược lý
const medicalInfoValidator = [
  body("maThuoc").notEmpty().withMessage("Mã thuốc là bắt buộc"),
  body("tacDungChinh").notEmpty().withMessage("Tác dụng chính là bắt buộc"),
  body("chiDinh").notEmpty().withMessage("Chỉ định không được để trống"),
  body("cachDung").notEmpty().withMessage("Cách dùng là bắt buộc"),
];

/**
 * ROUTES
 * GET     /api/medical-info/           → `BACSI`, `PHARMACIST`, `ADMIN` có thể xem
 * POST    /api/medical-info/           → chỉ `ADMIN` được thêm
 * PUT     /api/medical-info/:maTTDL    → chỉ `ADMIN` được cập nhật
 * DELETE  /api/medical-info/:maTTDL    → chỉ `ADMIN` được xóa
 */

//  Xem toàn bộ thông tin dược lý
router.get(
  "/",
  verifyToken,
  checkRole("ADMIN", "BACSI", "PHARMACIST"),
  controller.getAll
);

//  Tạo thông tin dược lý mới
router.post(
  "/",
  verifyToken,
  checkRole("ADMIN"),
  medicalInfoValidator,
  controller.create
);

//  Cập nhật thông tin dược lý
router.put(
  "/:maTTDL",
  verifyToken,
  checkRole("ADMIN"),
  medicalInfoValidator,
  controller.update
);

//  Xoá thông tin dược lý
router.delete(
  "/:maTTDL",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
